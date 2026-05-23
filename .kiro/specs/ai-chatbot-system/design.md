# AI Chatbot System - Design Document

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Customer Channels                        │
│  ┌──────────────┐              ┌──────────────┐            │
│  │    Email     │              │   WhatsApp   │            │
│  │ Contact Form │              │   Messages   │            │
│  └──────┬───────┘              └──────┬───────┘            │
└─────────┼──────────────────────────────┼──────────────────┘
          │                              │
          ▼                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Webhook Endpoints                         │
│  ┌──────────────┐              ┌──────────────┐            │
│  │ /api/webhook │              │ /api/whatsapp│            │
│  │   /email     │              │   /webhook   │            │
│  └──────┬───────┘              └──────┬───────┘            │
└─────────┼──────────────────────────────┼──────────────────┘
          │                              │
          └──────────────┬───────────────┘
                         ▼
          ┌──────────────────────────┐
          │   Message Queue          │
          │   (Process async)        │
          └──────────┬───────────────┘
                     ▼
          ┌──────────────────────────┐
          │   AI Processing Service  │
          │   - Parse message        │
          │   - Get context          │
          │   - Call Claude API      │
          │   - Generate response    │
          └──────────┬───────────────┘
                     ▼
          ┌──────────────────────────┐
          │   Response Service       │
          │   - Format response      │
          │   - Send via channel     │
          │   - Log conversation     │
          └──────────┬───────────────┘
                     ▼
          ┌──────────────────────────┐
          │   Database               │
          │   - Conversations        │
          │   - Logs                 │
          │   - Knowledge Base       │
          └──────────────────────────┘
```

## Component Design

### 1. Email Webhook Handler
**File**: `app/api/webhook/email/route.ts`

**Purpose**: Receive email notifications from Resend

**Flow**:
1. Receive webhook from Resend when email arrives
2. Extract email content, sender info
3. Add to message queue
4. Return 200 OK

**Data Structure**:
```typescript
interface EmailWebhook {
  from: string;
  to: string;
  subject: string;
  text: string;
  html: string;
  timestamp: string;
}
```

### 2. WhatsApp Webhook Handler
**File**: `app/api/whatsapp/webhook/route.ts`

**Purpose**: Receive WhatsApp messages from WhatsApp Business API

**Flow**:
1. Receive webhook from WhatsApp Business API
2. Verify webhook signature
3. Extract message content, sender info
4. Add to message queue
5. Return 200 OK

**Data Structure**:
```typescript
interface WhatsAppWebhook {
  from: string; // Phone number
  message: {
    type: 'text' | 'image' | 'document';
    text?: string;
    media?: string;
  };
  timestamp: string;
}
```

### 3. AI Processing Service
**File**: `lib/ai/claude-service.ts`

**Purpose**: Process messages with Claude AI

**Functions**:
```typescript
class ClaudeService {
  // Generate AI response
  async generateResponse(
    message: string,
    context: ConversationContext
  ): Promise<string>
  
  // Get conversation context
  async getContext(
    customerId: string
  ): Promise<ConversationContext>
  
  // Build system prompt with business knowledge
  buildSystemPrompt(): string
}
```

**System Prompt Template**:
```
You are an AI assistant for NDcreations, a premium tech company specializing in:
- AI Development & Machine Learning
- Mobile App Development (iOS & Android)
- Website & SaaS Development
- UI/UX Design
- Game Development
- Automation Systems

Your role:
1. Answer customer inquiries professionally and helpfully
2. Provide information about services, pricing, and capabilities
3. Help customers book consultations
4. Escalate complex technical questions to human team

Guidelines:
- Be professional yet friendly
- Keep responses concise (2-3 paragraphs max)
- Always offer to connect with human for final decisions
- Never commit to specific pricing or deadlines without approval
- Use customer's name if available

Contact Information:
- Email: ndcreation139@gmail.com
- WhatsApp: +917069984184
- Website: [your-domain]

Current conversation context:
{context}

Customer message:
{message}

Generate a helpful response:
```

### 4. Response Service
**File**: `lib/messaging/response-service.ts`

**Purpose**: Send AI responses via appropriate channel

**Functions**:
```typescript
class ResponseService {
  // Send email response
  async sendEmailResponse(
    to: string,
    subject: string,
    content: string
  ): Promise<void>
  
  // Send WhatsApp response
  async sendWhatsAppResponse(
    to: string,
    message: string
  ): Promise<void>
  
  // Log conversation
  async logConversation(
    channel: 'email' | 'whatsapp',
    customerId: string,
    message: string,
    response: string
  ): Promise<void>
}
```

### 5. Database Schema

**Conversations Table**:
```typescript
interface Conversation {
  id: string;
  customerId: string;
  channel: 'email' | 'whatsapp';
  status: 'active' | 'closed' | 'needs_human';
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

interface Message {
  id: string;
  role: 'customer' | 'ai' | 'human';
  content: string;
  timestamp: Date;
  metadata?: any;
}
```

**Customers Table**:
```typescript
interface Customer {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  conversations: string[]; // Conversation IDs
  createdAt: Date;
}
```

**Knowledge Base Table**:
```typescript
interface KnowledgeBase {
  id: string;
  category: string;
  question: string;
  answer: string;
  keywords: string[];
}
```

### 6. Admin Dashboard
**File**: `app/nd-admin/ai-conversations/page.tsx`

**Features**:
- View all conversations
- Filter by channel, status, date
- View conversation history
- Take over conversation (disable AI)
- Mark for human review
- Provide feedback on AI responses

**UI Components**:
```tsx
<ConversationList />
<ConversationDetail />
<TakeOverButton />
<FeedbackForm />
```

## API Integrations

### 1. Anthropic Claude API
**Endpoint**: `https://api.anthropic.com/v1/messages`

**Request**:
```typescript
{
  model: "claude-3-5-sonnet-20241022",
  max_tokens: 1024,
  system: systemPrompt,
  messages: [
    { role: "user", content: customerMessage }
  ]
}
```

**Response**:
```typescript
{
  content: [
    { type: "text", text: aiResponse }
  ]
}
```

### 2. Resend API (Already Configured)
**Endpoint**: `https://api.resend.com/emails`

**For Receiving**: Set up webhook in Resend dashboard
**For Sending**: Use existing implementation

### 3. WhatsApp Business API
**Provider Options**:
1. **Twilio** (Recommended for ease of use)
2. **Meta WhatsApp Business API** (Official but complex)
3. **WhatsApp Business API via Cloud API**

**Twilio Example**:
```typescript
// Send message
await twilio.messages.create({
  from: 'whatsapp:+14155238886',
  to: 'whatsapp:+917069984184',
  body: aiResponse
});
```

## Configuration

### Environment Variables
```env
# Anthropic Claude API
ANTHROPIC_API_KEY=sk-ant-...

# WhatsApp (Twilio)
TWILIO_ACCOUNT_SID=AC...
TWILIO_AUTH_TOKEN=...
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886

# Database (Supabase or similar)
DATABASE_URL=postgresql://...

# Feature Flags
AI_EMAIL_ENABLED=true
AI_WHATSAPP_ENABLED=true
AI_AUTO_REPLY=true
```

### Knowledge Base Configuration
**File**: `lib/ai/knowledge-base.ts`

```typescript
export const knowledgeBase = {
  services: [
    {
      name: "AI Development",
      description: "Custom AI solutions, ML models, NLP",
      pricing: "Contact for quote",
      timeline: "4-12 weeks"
    },
    // ... more services
  ],
  
  commonQuestions: [
    {
      q: "What services do you offer?",
      a: "We offer AI Development, App Development, Website Development, UI/UX Design, Game Development, and Automation Systems."
    },
    // ... more Q&A
  ],
  
  pricing: {
    consultation: "Free initial consultation",
    hourly: "Contact for rates",
    project: "Custom quotes based on requirements"
  }
};
```

## Security Considerations

### 1. API Key Security
- Store in environment variables
- Never commit to git
- Use secret management service in production

### 2. Webhook Verification
- Verify webhook signatures
- Rate limiting
- IP whitelisting if possible

### 3. Data Privacy
- Encrypt conversation data
- GDPR compliance
- Data retention policies

### 4. AI Safety
- Content filtering
- Response validation
- Human oversight

## Deployment

### Development
```bash
npm run dev
# Webhooks: Use ngrok for local testing
ngrok http 3000
```

### Production
```bash
# Deploy to Vercel
vercel --prod

# Set environment variables in Vercel dashboard
# Configure webhooks with production URLs
```

## Testing Strategy

### 1. Unit Tests
- Test AI service functions
- Test response formatting
- Test webhook parsing

### 2. Integration Tests
- Test end-to-end flow
- Test with mock Claude API
- Test with mock WhatsApp API

### 3. Manual Testing
- Send test emails
- Send test WhatsApp messages
- Verify AI responses
- Test admin dashboard

## Monitoring & Logging

### Metrics to Track
- Response time
- Success rate
- Error rate
- Customer satisfaction
- AI vs human responses

### Logging
- All conversations
- API calls
- Errors and exceptions
- Performance metrics

## Cost Estimation

### Anthropic Claude API
- $3 per million input tokens
- $15 per million output tokens
- Estimated: $50-100/month for 1000 conversations

### WhatsApp Business API (Twilio)
- $0.005 per message
- Estimated: $10-20/month for 1000 messages

### Total Estimated Cost
- **$60-120/month** for moderate usage
