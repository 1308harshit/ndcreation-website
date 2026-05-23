import makeWASocket, {
  DisconnectReason,
  useMultiFileAuthState,
  WASocket,
  proto,
  WAMessage,
} from '@whiskeysockets/baileys';
import { Boom } from '@hapi/boom';
import pino from 'pino';
import { ollamaService } from '../ai/ollama-service';

interface MessageHandler {
  (from: string, message: string, name?: string): Promise<void>;
}

class BaileysService {
  private sock: WASocket | null = null;
  private messageHandler: MessageHandler | null = null;
  private isConnected: boolean = false;

  /**
   * Initialize WhatsApp connection
   */
  async initialize(): Promise<void> {
    const sessionPath = process.env.WHATSAPP_SESSION_PATH || './baileys_auth';

    try {
      // Load auth state
      const { state, saveCreds } = await useMultiFileAuthState(sessionPath);

      // Create socket
      this.sock = makeWASocket({
        auth: state,
        printQRInTerminal: true, // Show QR code in terminal
        logger: pino({ level: 'silent' }), // Reduce logs
        browser: ['NDcreations Bot', 'Chrome', '1.0.0'],
      });

      // Handle connection updates
      this.sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect, qr } = update;

        if (qr) {
          console.log('📱 Scan this QR code with WhatsApp:');
          console.log(qr);
        }

        if (connection === 'close') {
          const shouldReconnect =
            (lastDisconnect?.error as Boom)?.output?.statusCode !==
            DisconnectReason.loggedOut;

          console.log(
            '❌ WhatsApp connection closed. Reconnecting:',
            shouldReconnect
          );

          if (shouldReconnect) {
            await this.initialize();
          }
          this.isConnected = false;
        } else if (connection === 'open') {
          console.log('✅ WhatsApp connected successfully!');
          this.isConnected = true;
        }
      });

      // Save credentials when updated
      this.sock.ev.on('creds.update', saveCreds);

      // Handle incoming messages
      this.sock.ev.on('messages.upsert', async ({ messages }) => {
        await this.handleIncomingMessages(messages);
      });
    } catch (error) {
      console.error('Failed to initialize WhatsApp:', error);
      throw error;
    }
  }

  /**
   * Handle incoming WhatsApp messages
   */
  private async handleIncomingMessages(messages: WAMessage[]): Promise<void> {
    for (const msg of messages) {
      // Ignore if not a text message or from self
      if (!msg.message || msg.key.fromMe) continue;

      const messageText =
        msg.message.conversation ||
        msg.message.extendedTextMessage?.text ||
        '';

      if (!messageText) continue;

      const from = msg.key.remoteJid || '';
      const name = msg.pushName || 'Customer';

      console.log(`📩 WhatsApp message from ${name} (${from}): ${messageText}`);

      // Check if AI auto-reply is enabled
      if (process.env.AI_WHATSAPP_ENABLED === 'true' && process.env.AI_AUTO_REPLY === 'true') {
        await this.handleAIResponse(from, messageText, name);
      }

      // Call custom message handler if set
      if (this.messageHandler) {
        await this.messageHandler(from, messageText, name);
      }
    }
  }

  /**
   * Generate and send AI response
   */
  private async handleAIResponse(
    to: string,
    message: string,
    name?: string
  ): Promise<void> {
    try {
      console.log('🤖 Generating AI response...');

      // Generate AI response
      const aiResponse = await ollamaService.generateResponse({
        message: `Customer name: ${name}\nMessage: ${message}`,
      });

      console.log('✅ AI response generated:', aiResponse);

      // Send response
      await this.sendMessage(to, aiResponse);

      console.log('📤 AI response sent successfully');
    } catch (error) {
      console.error('Failed to generate/send AI response:', error);
      
      // Send fallback message
      const fallbackMessage = `Hi ${name}! Thank you for your message. I'm having trouble processing your request right now. Please contact us directly at ${process.env.BUSINESS_EMAIL} or call ${process.env.BUSINESS_WHATSAPP}. We'll get back to you as soon as possible!`;
      
      await this.sendMessage(to, fallbackMessage);
    }
  }

  /**
   * Send WhatsApp message
   */
  async sendMessage(to: string, message: string): Promise<void> {
    if (!this.sock) {
      throw new Error('WhatsApp not initialized');
    }

    if (!this.isConnected) {
      throw new Error('WhatsApp not connected');
    }

    try {
      await this.sock.sendMessage(to, { text: message });
      console.log(`✅ Message sent to ${to}`);
    } catch (error) {
      console.error('Failed to send WhatsApp message:', error);
      throw error;
    }
  }

  /**
   * Set custom message handler
   */
  setMessageHandler(handler: MessageHandler): void {
    this.messageHandler = handler;
  }

  /**
   * Check if WhatsApp is connected
   */
  isWhatsAppConnected(): boolean {
    return this.isConnected;
  }

  /**
   * Disconnect WhatsApp
   */
  async disconnect(): Promise<void> {
    if (this.sock) {
      await this.sock.logout();
      this.sock = null;
      this.isConnected = false;
      console.log('WhatsApp disconnected');
    }
  }
}

// Export singleton instance
export const baileysService = new BaileysService();
