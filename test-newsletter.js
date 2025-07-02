#!/usr/bin/env node

/**
 * Script para testar a funcionalidade de newsletter
 * Testa tanto com banco de dados quanto com fallback
 */

const testEmail = 'test-' + Date.now() + '@exemplo.com';

console.log('🧪 Testando Newsletter API...\n');

async function testNewsletter() {
  try {
    console.log('📧 Testando cadastro de email:', testEmail);

    const response = await fetch('http://localhost:3000/api/newsletter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: testEmail }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log('✅ Cadastro realizado com sucesso!');
      console.log('📝 Resposta:', data.message);
    } else {
      console.log('❌ Erro no cadastro:', data.error);
    }

    // Testar contagem
    console.log('\n📊 Verificando contagem de subscribers...');
    const countResponse = await fetch('http://localhost:3000/api/subscribers');
    const countData = await countResponse.json();

    if (countResponse.ok) {
      console.log('✅ Contagem obtida:', countData.message);
    } else {
      console.log('❌ Erro ao obter contagem:', countData.error);
    }

    // Testar duplicata
    console.log('\n🔄 Testando cadastro duplicado...');
    const duplicateResponse = await fetch('http://localhost:3000/api/newsletter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: testEmail }),
    });

    const duplicateData = await duplicateResponse.json();

    if (duplicateResponse.status === 409) {
      console.log('✅ Duplicata detectada corretamente:', duplicateData.error);
    } else {
      console.log('❌ Erro: duplicata não foi detectada');
    }

  } catch (error) {
    console.error('❌ Erro no teste:', error.message);
    console.log('\n💡 Certifique-se de que o servidor está rodando:');
    console.log('   npm run dev');
  }
}

// Executar apenas se chamado diretamente
if (require.main === module) {
  testNewsletter();
}

module.exports = { testNewsletter };
