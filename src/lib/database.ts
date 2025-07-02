import { createClient } from '@supabase/supabase-js';

// Interface para o subscriber
export interface Subscriber {
  id?: number;
  email: string;
  subscribedAt: string;
  verified: boolean;
}

// Configuração do Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn('⚠️ Supabase credentials not found. Using fallback mode.');
}

// Cliente do Supabase (null se não configurado)
const supabase = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey)
  : null;

// Fallback para desenvolvimento/teste local
const FALLBACK_SUBSCRIBERS: Subscriber[] = [
  {
    id: 1,
    email: "bonatto@tutanota.com",
    subscribedAt: "2025-07-02T20:29:45.126Z",
    verified: true
  }
];

export class DatabaseService {
  static async getSubscribers(): Promise<Subscriber[]> {
    if (!supabase) {
      console.log('📂 Using fallback data (Supabase not configured)');
      return FALLBACK_SUBSCRIBERS;
    }

    try {
      console.log('🗄️ Fetching subscribers from database...');
      const { data, error } = await supabase
        .from('subscribers')
        .select('*')
        .order('subscribedAt', { ascending: false });

      if (error) {
        console.error('❌ Database error:', error);
        return FALLBACK_SUBSCRIBERS;
      }

      console.log('✅ Subscribers fetched successfully:', data?.length || 0);
      return data || [];
    } catch (error) {
      console.error('❌ Error fetching subscribers:', error);
      return FALLBACK_SUBSCRIBERS;
    }
  }

  static async addSubscriber(email: string): Promise<{ success: boolean; subscriber?: Subscriber; error?: string }> {
    if (!supabase) {
      console.log('📂 Using fallback mode - subscriber would be saved:', email);
      const newSubscriber: Subscriber = {
        id: Date.now(),
        email,
        subscribedAt: new Date().toISOString(),
        verified: true
      };
      FALLBACK_SUBSCRIBERS.push(newSubscriber);
      return { success: true, subscriber: newSubscriber };
    }

    try {
      console.log('💾 Adding subscriber to database...');

      // Verificar se já existe
      const { data: existing } = await supabase
        .from('subscribers')
        .select('email')
        .eq('email', email)
        .single();

      if (existing) {
        return { success: false, error: 'Email already subscribed' };
      }

      // Adicionar novo subscriber
      const newSubscriber = {
        email,
        subscribedAt: new Date().toISOString(),
        verified: true
      };

      const { data, error } = await supabase
        .from('subscribers')
        .insert([newSubscriber])
        .select()
        .single();

      if (error) {
        console.error('❌ Database insert error:', error);
        return { success: false, error: error.message };
      }

      console.log('✅ Subscriber added successfully:', data);
      return { success: true, subscriber: data };
    } catch (error) {
      console.error('❌ Error adding subscriber:', error);
      return { success: false, error: 'Database error' };
    }
  }

  static async checkSubscriberExists(email: string): Promise<boolean> {
    if (!supabase) {
      return FALLBACK_SUBSCRIBERS.some(sub => sub.email === email);
    }

    try {
      const { data } = await supabase
        .from('subscribers')
        .select('email')
        .eq('email', email)
        .single();

      return !!data;
    } catch {
      return false;
    }
  }

  static async getSubscriberCount(): Promise<number> {
    if (!supabase) {
      return FALLBACK_SUBSCRIBERS.length;
    }

    try {
      const { count, error } = await supabase
        .from('subscribers')
        .select('*', { count: 'exact', head: true });

      if (error) {
        console.error('❌ Error getting count:', error);
        return 0;
      }

      return count || 0;
    } catch (error) {
      console.error('❌ Error getting subscriber count:', error);
      return 0;
    }
  }
}

// SQL para criar a tabela no Supabase (para referência)
export const createTableSQL = `
-- Criar tabela de subscribers
CREATE TABLE IF NOT EXISTS subscribers (
  id BIGSERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  verified BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índice para performance
CREATE INDEX IF NOT EXISTS idx_subscribers_email ON subscribers(email);
CREATE INDEX IF NOT EXISTS idx_subscribers_subscribed_at ON subscribers(subscribed_at);

-- RLS (Row Level Security) - opcional
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

-- Política para permitir leitura/escrita (ajuste conforme necessário)
CREATE POLICY "Enable all operations for service role" ON subscribers
  FOR ALL USING (true);
`;
