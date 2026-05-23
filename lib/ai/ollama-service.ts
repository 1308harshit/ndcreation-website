import { Ollama } from 'ollama';

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface GenerateResponseOptions {
  message: string;
  conversationHistory?: ChatMessage[];
  systemPrompt?: string;
}

class OllamaService {
  private ollama: Ollama;
  private model: string;

  constructor() {
    const baseUrl = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';
    this.model = process.env.OLLAMA_MODEL || 'llama3.2';
    this.ollama = new Ollama({ host: baseUrl });
  }

  /**
   * Generate AI response using Ollama
   */
  async generateResponse(options: GenerateResponseOptions): Promise<string> {
    const { message, conversationHistory = [], systemPrompt } = options;

    try {
      // Build messages array
      const messages: ChatMessage[] = [];

      // Add system prompt
      if (systemPrompt) {
        messages.push({
          role: 'system',
          content: systemPrompt,
        });
      } else {
        messages.push({
          role: 'system',
          content: this.getDefaultSystemPrompt(),
        });
      }

      // Add conversation history
      messages.push(...conversationHistory);

      // Add current message
      messages.push({
        role: 'user',
        content: message,
      });

      // Generate response
      const response = await this.ollama.chat({
        model: this.model,
        messages: messages,
        options: {
          temperature: parseFloat(process.env.AI_TEMPERATURE || '0.7'),
          num_predict: parseInt(process.env.AI_MAX_TOKENS || '1024'),
        },
      });

      return response.message.content;
    } catch (error) {
      console.error('Ollama AI Error:', error);
      throw new Error('Failed to generate AI response');
    }
  }

  /**
   * Get default system prompt with business knowledge
   */
  private getDefaultSystemPrompt(): string {
    const businessName = process.env.BUSINESS_NAME || 'NDcreations';
    const businessEmail = process.env.BUSINESS_EMAIL || 'ndcreation139@gmail.com';
    const businessWhatsApp = process.env.BUSINESS_WHATSAPP || '+917069984184';

    return `You are an AI assistant for ${businessName}, a premium tech company specializing in:

**Services:**
- AI Development & Machine Learning
- Mobile App Development (iOS & Android)
- Website & SaaS Development
- UI/UX Design
- Game Development
- Automation Systems & AI Agents

**Your Role:**
1. Answer customer inquiries professionally and helpfully
2. Provide information about services, pricing, and capabilities
3. Help customers book consultations
4. Escalate complex technical questions to the human team

**Guidelines:**
- Be professional yet friendly and conversational
- Keep responses concise (2-3 paragraphs maximum)
- Always offer to connect with a human for final decisions
- Never commit to specific pricing or deadlines without approval
- Use the customer's name if available
- Be helpful and solution-oriented

**Contact Information:**
- Email: ${businessEmail}
- WhatsApp: ${businessWhatsApp}

**Common Questions:**

Q: What services do you offer?
A: We offer AI Development, Mobile App Development, Website & SaaS Development, UI/UX Design, Game Development, and Automation Systems.

Q: How much do your services cost?
A: Our pricing varies based on project scope and requirements. We offer free initial consultations to discuss your needs and provide a custom quote. Contact us for a detailed quote.

Q: How long does a project take?
A: Project timelines vary: Simple websites (2-4 weeks), Mobile apps (6-12 weeks), AI projects (4-16 weeks). We provide detailed timelines during consultation.

Q: How can I book a consultation?
A: You can book a free consultation by contacting us via email (${businessEmail}) or WhatsApp (${businessWhatsApp}). We'll schedule a call to discuss your project.

**Important:**
- If you don't know the answer, say so and offer to connect them with the team
- If the question is too technical or requires a quote, suggest booking a consultation
- Always be honest and transparent
- Maintain a professional tone while being friendly

Now, respond to the customer's message:`;
  }

  /**
   * Check if Ollama is available
   */
  async checkAvailability(): Promise<boolean> {
    try {
      await this.ollama.list();
      return true;
    } catch (error) {
      console.error('Ollama not available:', error);
      return false;
    }
  }

  /**
   * Get available models
   */
  async getAvailableModels(): Promise<string[]> {
    try {
      const response = await this.ollama.list();
      return response.models.map((model: any) => model.name);
    } catch (error) {
      console.error('Failed to get models:', error);
      return [];
    }
  }
}

// Export singleton instance
export const ollamaService = new OllamaService();
