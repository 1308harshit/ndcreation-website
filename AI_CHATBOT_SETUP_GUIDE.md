# 🤖 AI Chatbot System - Complete Setup Guide

This guide will help you set up the AI chatbot system that automatically responds to emails and WhatsApp messages using Claude AI.

---

## 📋 Prerequisites

Before starting, you'll need:
- Node.js 18+ installed
- Git installed
- A credit card for API services (most have free tiers)
- Access to your email (for verification)

---

## 🔑 Step 1: Get Anthropic Claude API Key

### 1.1 Create Anthropic Account
1. Go to https://console.anthropic.com/
2. Click "Sign Up"
3. Enter your email and create password
4. Verify your email address

### 1.2 Get API Key
1. Log in to https://console.anthropic.com/
2. Click on "API Keys" in the left sidebar
3. Click "Create Key"
4. Give it a name (e.g., "NDcreations Chatbot")
5. Copy the API key (starts with `sk-ant-`)
6. **IMPORTANT**: Save this key securely - you won't see it again!

### 1.3 Add Credits
1. Go to "Billing" in the console
2. Add payment method
3. Add initial credits ($5-10 recommended for testing)
4. Claude pricing: ~$3 per million input tokens, ~$15 per million output tokens

**Cost Estimate**: For 1000 customer conversations per month, expect $50-100/month

---

## 📱 Step 2: Get WhatsApp Business API (via Twilio)

### 2.1 Create Twilio Account
1. Go to https://www.twilio.com/try-twilio
2. Click "Sign up"
3. Fill in your details:
   - Email
   - Password
   - Phone number (for verification)
4. Verify your phone number with the code sent via SMS
5. Answer the onboarding questions

### 2.2 Get Twilio Credentials
1. Log in to https://console.twilio.com/
2. On the dashboard, you'll see:
   - **Account SID** (starts with `AC...`)
   - **Auth Token** (click to reveal)
3. Copy both and save them securely

### 2.3 Set Up WhatsApp Sandbox (for Testing)
1. In Twilio Console, go to "Messaging" → "Try it out" → "Send a WhatsApp message"
2. You'll see a WhatsApp number (e.g., `+1 415 523 8886`)
3. Follow instructions to join the sandbox:
   - Send a WhatsApp message to the Twilio number
   - Send the code shown (e.g., "join <code>")
4. Once joined, you can test WhatsApp messaging

### 2.4 Get Production WhatsApp Number (Optional - for Production)
1. Go to "Messaging" → "Services"
2. Create a new Messaging Service
3. Request a WhatsApp-enabled phone number
4. Complete WhatsApp Business verification (requires business documents)
5. **Note**: This process can take 1-2 weeks for approval

**Cost Estimate**: 
- Sandbox: Free for testing
- Production: $0.005 per message (~$10-20/month for 1000 messages)

---

## 🗄️ Step 3: Set Up Database (Supabase)

### 3.1 Create Supabase Account
1. Go to https://supabase.com/
2. Click "Start your project"
3. Sign up with GitHub or email
4. Verify your email

### 3.2 Create New Project
1. Click "New Project"
2. Choose organization (or create new)
3. Enter project details:
   - Name: "ndcreations-chatbot"
   - Database Password: (generate strong password)
   - Region: Choose closest to your users
4. Click "Create new project"
5. Wait 2-3 minutes for setup

### 3.3 Get Database Connection String
1. In your project, go to "Settings" → "Database"
2. Scroll to "Connection string"
3. Copy the "URI" connection string
4. Replace `[YOUR-PASSWORD]` with your database password
5. Save this connection string

**Cost**: Free tier includes:
- 500MB database
- 2GB bandwidth
- Unlimited API requests

---

## ⚙️ Step 4: Configure Environment Variables

### 4.1 Update .env.local
Open `c:\Users\ASUS\ndcreations\.env.local` and add:

```env
# Existing variables
RESEND_API_KEY=re_RczmPyZo_HJGMzVhxhpsHzvdKHccxyqkn

# NEW: Anthropic Claude API
ANTHROPIC_API_KEY=sk-ant-api03-your-key-here

# NEW: Twilio WhatsApp
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
TWILIO_WHATSAPP_TO=whatsapp:+917069984184

# NEW: Database (Supabase)
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.xxx.supabase.co:5432/postgres

# NEW: Feature Flags
AI_EMAIL_ENABLED=true
AI_WHATSAPP_ENABLED=true
AI_AUTO_REPLY=true
AI_REQUIRE_APPROVAL=false

# NEW: AI Configuration
AI_MODEL=claude-3-5-sonnet-20241022
AI_MAX_TOKENS=1024
AI_TEMPERATURE=0.7
```

### 4.2 Verify Configuration
```bash
# Test that environment variables are loaded
npm run dev
# Check console for any missing variable warnings
```

---

## 📦 Step 5: Install Required Packages

```bash
cd c:\Users\ASUS\ndcreations

# Install AI and messaging packages
npm install @anthropic-ai/sdk twilio @supabase/supabase-js

# Install additional utilities
npm install zod date-fns uuid

# Install dev dependencies
npm install -D @types/uuid
```

---

## 🗃️ Step 6: Set Up Database Schema

### 6.1 Create Tables in Supabase
1. Go to your Supabase project
2. Click "SQL Editor" in the left sidebar
3. Click "New query"
4. Copy and paste this SQL:

```sql
-- Customers table
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT,
  email TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Conversations table
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES customers(id),
  channel TEXT NOT NULL CHECK (channel IN ('email', 'whatsapp')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'closed', 'needs_human')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Messages table
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES conversations(id),
  role TEXT NOT NULL CHECK (role IN ('customer', 'ai', 'human')),
  content TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AI logs table
CREATE TABLE ai_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES conversations(id),
  input_tokens INTEGER,
  output_tokens INTEGER,
  model TEXT,
  response_time_ms INTEGER,
  error TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Knowledge base table
CREATE TABLE knowledge_base (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  keywords TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_conversations_customer ON conversations(customer_id);
CREATE INDEX idx_conversations_status ON conversations(status);
CREATE INDEX idx_messages_conversation ON messages(conversation_id);
CREATE INDEX idx_messages_created ON messages(created_at DESC);
CREATE INDEX idx_customers_email ON customers(email);
CREATE INDEX idx_customers_phone ON customers(phone);
```

5. Click "Run" to execute the SQL
6. Verify tables are created in "Table Editor"

### 6.2 Populate Knowledge Base
Run this SQL to add initial knowledge:

```sql
INSERT INTO knowledge_base (category, question, answer, keywords) VALUES
('services', 'What services do you offer?', 'We offer AI Development, Mobile App Development, Website & SaaS Development, UI/UX Design, Game Development, and Automation Systems.', ARRAY['services', 'offerings', 'what do you do']),
('pricing', 'How much do your services cost?', 'Our pricing varies based on project scope and requirements. We offer free initial consultations to discuss your needs and provide a custom quote. Contact us at ndcreation139@gmail.com or WhatsApp +917069984184 for a quote.', ARRAY['pricing', 'cost', 'price', 'how much']),
('contact', 'How can I contact you?', 'You can reach us via email at ndcreation139@gmail.com or WhatsApp at +917069984184. We typically respond within 24 hours.', ARRAY['contact', 'reach', 'email', 'phone']),
('timeline', 'How long does a project take?', 'Project timelines vary based on complexity. Typical ranges: Simple websites (2-4 weeks), Mobile apps (6-12 weeks), AI projects (4-16 weeks). We provide detailed timelines during consultation.', ARRAY['timeline', 'duration', 'how long', 'time']),
('booking', 'How do I book a consultation?', 'You can book a free consultation by contacting us via email (ndcreation139@gmail.com) or WhatsApp (+917069984184). We will schedule a call to discuss your project requirements.', ARRAY['booking', 'consultation', 'meeting', 'schedule']);
```

---

## 🔗 Step 7: Configure Webhooks

### 7.1 Deploy Your Application First
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to Vercel
vercel --prod

# Note your production URL (e.g., https://ndcreations.vercel.app)
```

### 7.2 Configure Resend Webhook (Email)
1. Go to https://resend.com/domains
2. Click on your domain
3. Go to "Webhooks" tab
4. Click "Add Webhook"
5. Enter:
   - **Endpoint URL**: `https://your-domain.vercel.app/api/webhook/email`
   - **Events**: Select "email.received"
6. Click "Create Webhook"
7. Copy the webhook signing secret
8. Add to `.env.local`: `RESEND_WEBHOOK_SECRET=whsec_...`

### 7.3 Configure Twilio Webhook (WhatsApp)
1. Go to https://console.twilio.com/
2. Navigate to "Messaging" → "Services"
3. Select your messaging service
4. Go to "Sender Pool" and select your WhatsApp number
5. Scroll to "Webhooks"
6. Set "When a message comes in":
   - **URL**: `https://your-domain.vercel.app/api/whatsapp/webhook`
   - **Method**: POST
7. Click "Save"

---

## ✅ Step 8: Test the System

### 8.1 Test Email Auto-Reply
1. Go to your website contact form
2. Fill in the form with a test question
3. Submit the form
4. Check your email - you should receive:
   - Confirmation email (existing)
   - AI-generated response (new!)
5. Check the admin dashboard to see the conversation

### 8.2 Test WhatsApp Auto-Reply
1. Send a WhatsApp message to your Twilio number
2. Send a test question (e.g., "What services do you offer?")
3. You should receive an AI-generated response within 5 seconds
4. Check the admin dashboard to see the conversation

### 8.3 Test Admin Dashboard
1. Go to `http://localhost:3000/nd-admin/ai-conversations`
2. Log in with admin credentials
3. You should see all AI conversations
4. Test "Take Over" button
5. Test filtering and search

---

## 🎯 Step 9: Customize AI Responses

### 9.1 Update Business Knowledge
Edit `lib/ai/knowledge-base.ts` to add your specific:
- Services and pricing
- Common questions and answers
- Company policies
- Contact information

### 9.2 Customize AI Personality
Edit `lib/ai/system-prompt.ts` to adjust:
- Tone (professional, friendly, casual)
- Response length
- When to escalate to human
- Brand voice

### 9.3 Test Customizations
1. Send test messages with different questions
2. Verify AI responses match your expectations
3. Adjust prompts as needed
4. Re-deploy after changes

---

## 📊 Step 10: Monitor and Optimize

### 10.1 Monitor Usage
- **Anthropic Console**: Check token usage and costs
- **Twilio Console**: Check message counts and costs
- **Supabase Dashboard**: Check database usage
- **Admin Dashboard**: Check conversation metrics

### 10.2 Optimize Costs
- Adjust `AI_MAX_TOKENS` to reduce response length
- Use caching for common questions
- Set up rate limiting to prevent abuse
- Review and optimize system prompts

### 10.3 Improve AI Responses
- Review conversations in admin dashboard
- Identify common questions
- Add to knowledge base
- Refine system prompts
- Collect customer feedback

---

## 🚨 Troubleshooting

### Issue: AI not responding to emails
**Solution**:
1. Check Resend webhook is configured correctly
2. Verify `ANTHROPIC_API_KEY` is set
3. Check logs in Vercel dashboard
4. Test webhook manually with curl

### Issue: WhatsApp messages not working
**Solution**:
1. Verify you've joined Twilio sandbox
2. Check Twilio webhook URL is correct
3. Verify `TWILIO_ACCOUNT_SID` and `TWILIO_AUTH_TOKEN`
4. Check Twilio logs for errors

### Issue: Database connection errors
**Solution**:
1. Verify `DATABASE_URL` is correct
2. Check Supabase project is running
3. Verify database password is correct
4. Check network connectivity

### Issue: AI responses are poor quality
**Solution**:
1. Review and improve system prompt
2. Add more context to knowledge base
3. Increase `AI_MAX_TOKENS` for longer responses
4. Adjust `AI_TEMPERATURE` (lower = more focused)

---

## 💰 Cost Summary

### Monthly Costs (Estimated for 1000 conversations/month)

| Service | Cost | Notes |
|---------|------|-------|
| Anthropic Claude API | $50-100 | Pay per token usage |
| Twilio WhatsApp | $10-20 | $0.005 per message |
| Supabase Database | $0 | Free tier sufficient |
| Vercel Hosting | $0 | Free tier sufficient |
| **Total** | **$60-120/month** | Scales with usage |

### Free Tiers
- **Anthropic**: $5 free credits for new accounts
- **Twilio**: $15 free credits for new accounts
- **Supabase**: 500MB database, 2GB bandwidth free
- **Vercel**: 100GB bandwidth free

---

## 📚 Next Steps

1. ✅ Complete this setup guide
2. ✅ Test the system thoroughly
3. ✅ Customize AI responses for your business
4. ✅ Monitor usage and costs
5. ✅ Collect feedback and improve
6. 🔄 Consider adding:
   - Live chat widget on website
   - Multi-language support
   - Advanced analytics
   - CRM integration

---

## 🆘 Need Help?

If you encounter issues:
1. Check the troubleshooting section above
2. Review logs in Vercel dashboard
3. Check API service status pages
4. Contact support:
   - Anthropic: support@anthropic.com
   - Twilio: https://support.twilio.com
   - Supabase: https://supabase.com/support

---

**Congratulations! Your AI chatbot system is now set up and ready to automatically respond to customer inquiries 24/7!** 🎉
