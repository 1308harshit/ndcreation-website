/**
 * WhatsApp AI Bot - Standalone Script
 * 
 * This script runs independently and handles WhatsApp messages with AI responses.
 * 
 * To run:
 * 1. Make sure Ollama is installed and running
 * 2. Run: npx ts-node whatsapp-bot.ts
 * 3. Scan the QR code with your WhatsApp
 * 4. Bot will automatically respond to messages!
 */

import { baileysService } from './lib/whatsapp/baileys-service';

async function startWhatsAppBot() {
  console.log('🤖 Starting WhatsApp AI Bot...');
  console.log('📱 Make sure Ollama is running on http://localhost:11434');
  console.log('');

  try {
    // Initialize WhatsApp connection
    await baileysService.initialize();

    console.log('');
    console.log('✅ WhatsApp Bot is running!');
    console.log('📩 Waiting for messages...');
    console.log('');
    console.log('Press Ctrl+C to stop the bot');
  } catch (error) {
    console.error('❌ Failed to start WhatsApp bot:', error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n\n🛑 Shutting down WhatsApp bot...');
  await baileysService.disconnect();
  process.exit(0);
});

// Start the bot
startWhatsAppBot();
