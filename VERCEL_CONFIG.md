# Configuração de Variáveis de Ambiente no Vercel

## Problema Identificado

O erro "Internal server error" ao tentar cadastrar um e-mail é causado por dois problemas principais:

1. **Operações de sistema de arquivos**: O código estava tentando escrever/ler arquivos localmente no ambiente serverless do Vercel (não suportado)
2. **Variáveis de ambiente não configuradas**: Falta configuração das variáveis necessárias no Vercel

## Soluções Implementadas

### 1. Correção do Sistema de Arquivos
- ✅ Removido uso de `fs.writeFileSync` e `fs.readFileSync`
- ✅ Implementado sistema temporário com dados mock
- ✅ Adicionados logs detalhados para debugging

### 2. Configuração de Variáveis de Ambiente

Para resolver completamente o problema, configure as seguintes variáveis no Vercel:

#### No Painel do Vercel:
1. Acesse [vercel.com](https://vercel.com)
2. Vá para o seu projeto
3. Clique em **Settings** > **Environment Variables**
4. Adicione as seguintes variáveis:

```bash
# Obrigatório - Chave da API do Resend
RESEND_API_KEY=your-resend-api-key-here

# Opcional - URL do site (já configurado automaticamente pelo Vercel)
SITE_URL=https://bonatto.vercel.app

# Opcional - Chave secreta para notificações
NOTIFY_SECRET=your-secret-key-here
```

#### Como obter a RESEND_API_KEY:
1. Acesse [resend.com](https://resend.com)
2. Crie uma conta (gratuita)
3. Gere uma API key
4. Cole no campo RESEND_API_KEY no Vercel

### 3. Para Testar
Após configurar as variáveis:
1. Faça um novo deploy (ou ele será automático)
2. Tente cadastrar um e-mail novamente
3. Verifique os logs no Vercel para ver os detalhes do processo

### 4. Logs Melhorados
O código agora inclui logs detalhados que aparecerão no painel do Vercel, incluindo:
- Status de cada etapa do processo
- Verificação das variáveis de ambiente
- Detalhes de qualquer erro que ocorrer
- Confirmação do envio de e-mail

## Limitação Atual
Por enquanto, os e-mails cadastrados não serão persistidos permanentemente (devido à natureza serverless). Para uma solução completa, seria necessário:
- Implementar um banco de dados (como Supabase, PlanetScale, etc.)
- Ou usar um serviço de storage (como Vercel KV)

Mas o sistema de e-mail funcionará perfeitamente após a configuração das variáveis.
