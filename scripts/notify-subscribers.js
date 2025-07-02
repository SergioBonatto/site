#!/usr/bin/env node

/**
 * Script para notificar subscribers sobre novos posts
 * Para usar:
 *   - npm run notify:subscribers (para o último post)
 *   - npm run notify:subscribers -- post-slug (para um post específico)
 *
 * Este script chama a API /api/notify-subscribers que envia os emails
 */

const https = require('https');
const http = require('http');

const baseUrl = process.env.SITE_URL || 'http://localhost:3000';
const notifySecret = process.env.NOTIFY_SECRET || 'dev-secret';

async function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;

    const req = protocol.request(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve({ status: res.statusCode, data: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, data: { error: 'Invalid JSON response' } });
        }
      });
    });

    req.on('error', reject);

    if (options.body) {
      req.write(options.body);
    }

    req.end();
  });
}

async function notifySubscribers(postSlug = null) {
  const url = `${baseUrl}/api/notify-subscribers`;

  try {
    console.log('🔔 Iniciando notificação de subscribers...');

    // Primeiro, verificar informações
    const infoResponse = await makeRequest(url);

    if (infoResponse.status !== 200) {
      console.error('❌ Erro ao buscar informações:', infoResponse.data);
      return;
    }

    const { subscribersCount, latestPost } = infoResponse.data;

    console.log(`📊 Subscribers cadastrados: ${subscribersCount}`);
    console.log(`📝 Último post: ${latestPost ? latestPost.title : 'Nenhum'}`);

    if (subscribersCount === 0) {
      console.log('ℹ️  Nenhum subscriber para notificar.');
      return;
    }

    if (!latestPost && !postSlug) {
      console.log('ℹ️  Nenhum post encontrado para notificar.');
      return;
    }

    // Enviar notificações
    const body = postSlug ? JSON.stringify({ postSlug }) : JSON.stringify({});

    const notifyResponse = await makeRequest(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${notifySecret}`
      },
      body
    });

    if (notifyResponse.status === 200) {
      console.log('✅ Sucesso!', notifyResponse.data.message);
      console.log('📊 Estatísticas:', notifyResponse.data.stats);
      console.log('📝 Post notificado:', notifyResponse.data.post.title);
    } else {
      console.error('❌ Erro:', notifyResponse.data);
    }

  } catch (error) {
    console.error('❌ Erro ao executar notificação:', error.message);
  }
}

function main() {
  const postSlug = process.argv[2];

  if (postSlug) {
    console.log(`🎯 Notificando sobre o post específico: ${postSlug}`);
  } else {
    console.log('🎯 Notificando sobre o último post publicado');
  }

  notifySubscribers(postSlug);
}

if (require.main === module) {
  main();
}
