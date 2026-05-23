# 🤖 AI Chatbot System - Complete Setup Guide (100% FREE)

This guide will help you set up the AI chatbot system that automatically responds to emails and WhatsApp messages using **FREE and open-source AI** (Ollama).

---

## 📋 Prerequisites

Before starting, you'll need:
- Node.js 18+ installed
- Git installed
- **NO credit card required** - Everything is FREE!
- 8GB+ RAM recommended for running AI locally

---

## 🔑 Step 1: Install Ollama (Free Local AI)

### 1.1 Download and Install Ollama
1. Go to https://ollama.com/download
2. Download Ollama for Windows
3. Run the installer
4. Ollama will install and start automatically

### 1.2 Download AI Model (Free)
Open PowerShell or Command Prompt and run:

```bash
# Download Llama 3.2 (3B model - fast and efficient)
ollama pull llama3.2

# OR download Mistral (7B model - more powerful)
ollama pull mistral

# OR download Phi-3 (3.8B model - Microsoft's model)
ollama pull phi3
```

**Recommended**: Start with `llama3.2` (smaller, faster)

### 1.3 Test Ollama
```bash
# Test the AI
ollama run llama3.2

# Type a test message
> Hello, how are you?

# Press Ctrl+D to exit
```

### 1.4 Start Ollama Server
```bash
# Ollama runs automatically on Windows
# It listens on http://localhost:11434

# Test the API
curl http://localhost:11434/api/generate -d "{\"model\": \"llama3.2\", \"prompt\": \"Hello\"}"
```

**Cost**: 100% FREE - Runs on your computer!

---

## 📱 Step 2: Setup Free WhatsApp Integration

### Option A: WhatsApp Web.js (Recommended - 100% Free)

#### 2.1 Install whatsapp-web.js
This uses your personal WhatsApp account (no business API needed!)

```bash
cd c:\Users\ASUS\ndcreations
npm install whatsapp-web.js qrcode-terminal
```

#### 2.2 How It Works
- Uses WhatsApp Web protocol
- Scans QR code with your phone
- Completely free
- No API keys needed
- Works with personal WhatsApp

**Cost**: 100% FREE

### Option B: Baileys (Alternative - Also Free)

```bash
npm install @whiskeysockets/baileys
```

- More features
- Multi-device support
- Also 100% free

**We'll use Option A (whatsapp-web.js) as it's simpler**

---

## 🗄️ Step 3: Set Up Free Database (Supabase)

### 3.1 Create Supabase Account
1. Go to https://supabase.com/
2. Click "Start your project"
3. Sign up with GitHub or email (FREE)
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

**Cost**: 100% FREE
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

# NEW: Ollama (Free Local AI)
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama3.2

# NEW: WhatsApp (Free - using whatsapp-web.js)
WHATSAPP_SESSION_PATH=./.wwebjs_auth

# NEW: Database (Supabase - Free)
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.xxx.supabase.co:5432/postgres

# NEW: Feature Flags
AI_EMAIL_ENABLED=true
AI_WHATSAPP_ENABLED=true
AI_AUTO_REPLY=true
AI_REQUIRE_APPROVAL=false

# NEW: AI Configuration
AI_MAX_TOKENS=1024
AI_TEMPERATURE=0.7
AI_SYSTEM_PROMPT="You are a helpful AI assistant for NDcreations..."
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

# Install FREE AI and messaging packages
npm install ollama whatsapp-web.js qrcode-terminal @supabase/supabase-js

# Install additional utilities
npm install zod date-fns uuid

# Install dev dependencies
npm install -D @types/uuid
```

**All packages are FREE and open-source!**

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

### Issue: Ollama not responding
**Solution**:
1. Check if Ollama is running: `ollama list`
2. Restart Ollama service
3. Verify model is downloaded: `ollama pull llama3.2`
4. Test API: `curl http://localhost:11434/api/generate -d "{\"model\": \"llama3.2\", \"prompt\": \"test\"}"`

### Issue: WhatsApp not connecting
**Solution**:
1. Delete `.wwebjs_auth` folder
2. Restart the application
3. Scan QR code again with your phone
4. Make sure WhatsApp is active on your phone
5. Check internet connection

### Issue: AI responses are slow
**Solution**:
1. Use smaller model: `ollama pull llama3.2` (3B model)
2. Close other applications to free RAM
3. Upgrade RAM if possible (16GB recommended)
4. Consider using cloud-hosted Ollama

### Issue: Database connection errors
**Solution**:
1. Verify `DATABASE_URL` is correct
2. Check Supabase project is running
3. Verify database password is correct
4. Check network connectivity

---

## 💰 Cost Summary

### Monthly Costs (100% FREE!)

| Service | Cost | Notes |
|---------|------|-------|
| Ollama (Local AI) | $0 | Runs on your computer |
| WhatsApp Web.js | $0 | Uses your personal WhatsApp |
| Supabase Database | $0 | Free tier (500MB) |
| Vercel Hosting | $0 | Free tier (100GB bandwidth) |
| **Total** | **$0/month** | Completely FREE! |

### Requirements
- **Computer**: Must be running for AI to work (Ollama runs locally)
- **RAM**: 8GB+ recommended
- **Storage**: ~4GB for AI model
- **Internet**: For WhatsApp and database connection

### Advantages of Free Solution
✅ No monthly costs
✅ No API limits
✅ Complete privacy (AI runs locally)
✅ No credit card required
✅ Full control over data

### Disadvantages
❌ Computer must be running 24/7
❌ Slower than cloud AI (but still fast enough)
❌ Uses your personal WhatsApp (not business account)

**Solution for 24/7 Operation**: 
- Keep your computer running, OR
- Deploy Ollama to a free cloud service (Railway, Render)
- Use a cheap VPS ($5/month) if needed

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
2. Review logs in terminal/console
3. Check service status:
   - Ollama: `ollama list`
   - WhatsApp: Check QR code scan
   - Database: Check Supabase dashboard
4. Community support:
   - Ollama: https://github.com/ollama/ollama/issues
   - WhatsApp Web.js: https://github.com/pedroslopez/whatsapp-web.js
   - Supabase: https://supabase.com/support

---

**Congratulations! Your 100% FREE AI chatbot system is now set up and ready to automatically respond to customer inquiries 24/7!** 🎉

**Total Cost: $0/month** 💰
