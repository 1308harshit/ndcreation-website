# Tasks: AI Chatbot System Implementation

## Task 1: Setup API Keys and Accounts
**Description:** Set up all required API accounts and obtain API keys for Claude, WhatsApp, and database.

**Sub-tasks:**
1. Sign up for Anthropic Claude API account
2. Get Claude API key from console.anthropic.com
3. Sign up for Twilio account for WhatsApp Business API
4. Get Twilio credentials (Account SID, Auth Token, WhatsApp number)
5. Set up database (Supabase or PostgreSQL)
6. Add all API keys to `.env.local`

**Acceptance Criteria:**
- Anthropic API key obtained and working
- Twilio WhatsApp credentials obtained
- Database connection established
- All keys stored securely in `.env.local`
- Test API connections successful

**Files to create/modify:**
- `.env.local`

---

## Task 2: Create Database Schema
**Description:** Set up database tables for storing conversations, customers, and knowledge base.

**Sub-tasks:**
1. Create `conversations` table
2. Create `messages` table
3. Create `customers` table
4. Create `knowledge_base` table
5. Create `ai_logs` table for monitoring
6. Set up indexes for performance
7. Create database migration files

**Acceptance Criteria:**
- All tables created with proper schema
- Foreign keys and relationships set up
- Indexes created for common queries
- Migration files created
- Database can be reset and recreated

**Files to create:**
- `lib/db/schema.sql`
- `lib/db/migrations/001_initial_schema.sql`
- `lib/db/client.ts`

---

## Task 3: Implement Claude AI Service
**Description:** Create service to interact with Claude API and generate intelligent responses.

**Sub-tasks:**
1. Create `ClaudeService` class
2. Implement `generateResponse()` method
3. Create system prompt template with business knowledge
4. Implement conversation context management
5. Add error handling and retries
6. Add response validation
7. Create knowledge base data
8. Test with sample messages

**Acceptance Criteria:**
- Claude API integration working
- System prompt includes NDcreations business info
- Responses are professional and helpful
- Context is maintained across conversation
- Error handling works properly
- Knowledge base is comprehensive

**Files to create:**
- `lib/ai/claude-service.ts`
- `lib/ai/knowledge-base.ts`
- `lib/ai/system-prompt.ts`
- `lib/ai/types.ts`

---

## Task 4: Create Email Webhook Handler
**Description:** Implement webhook endpoint to receive and process incoming emails.

**Sub-tasks:**
1. Create `/api/webhook/email/route.ts` endpoint
2. Parse incoming email webhook from Resend
3. Extract sender info, subject, content
4. Validate webhook signature
5. Store email in database
6. Trigger AI processing
7. Add error handling and logging
8. Test with sample webhooks

**Acceptance Criteria:**
- Webhook endpoint receives emails successfully
- Email data is parsed correctly
- Emails are stored in database
- AI processing is triggered
- Errors are logged properly
- Webhook responds with 200 OK

**Files to create:**
- `app/api/webhook/email/route.ts`
- `lib/webhooks/email-handler.ts`

---

## Task 5: Create WhatsApp Webhook Handler
**Description:** Implement webhook endpoint to receive and process incoming WhatsApp messages.

**Sub-tasks:**
1. Create `/api/whatsapp/webhook/route.ts` endpoint
2. Parse incoming WhatsApp webhook from Twilio
3. Extract sender phone, message content
4. Verify webhook signature
5. Store message in database
6. Trigger AI processing
7. Add error handling and logging
8. Test with sample webhooks

**Acceptance Criteria:**
- Webhook endpoint receives WhatsApp messages
- Message data is parsed correctly
- Messages are stored in database
- AI processing is triggered
- Webhook signature verified
- Errors are logged properly

**Files to create:**
- `app/api/whatsapp/webhook/route.ts`
- `lib/webhooks/whatsapp-handler.ts`

---

## Task 6: Implement Response Service
**Description:** Create service to send AI responses via email and WhatsApp.

**Sub-tasks:**
1. Create `ResponseService` class
2. Implement `sendEmailResponse()` using Resend API
3. Implement `sendWhatsAppResponse()` using Twilio API
4. Add response formatting for each channel
5. Implement conversation logging
6. Add retry logic for failed sends
7. Add rate limiting
8. Test sending responses

**Acceptance Criteria:**
- Email responses sent successfully via Resend
- WhatsApp responses sent successfully via Twilio
- Responses are formatted appropriately for each channel
- Conversations are logged in database
- Failed sends are retried
- Rate limiting prevents spam

**Files to create:**
- `lib/messaging/response-service.ts`
- `lib/messaging/email-sender.ts`
- `lib/messaging/whatsapp-sender.ts`
- `lib/messaging/types.ts`

---

## Task 7: Create AI Processing Pipeline
**Description:** Implement the main processing pipeline that coordinates AI response generation.

**Sub-tasks:**
1. Create `AIProcessor` class
2. Implement message queue system
3. Implement `processMessage()` method
4. Get conversation context from database
5. Call Claude service to generate response
6. Call response service to send reply
7. Log conversation and AI response
8. Add error handling and monitoring
9. Test end-to-end flow

**Acceptance Criteria:**
- Messages are processed asynchronously
- Conversation context is retrieved correctly
- AI generates appropriate responses
- Responses are sent via correct channel
- All steps are logged
- Errors are handled gracefully
- End-to-end flow works

**Files to create:**
- `lib/ai/processor.ts`
- `lib/queue/message-queue.ts`
- `lib/ai/context-manager.ts`

---

## Task 8: Create Admin Dashboard for Conversations
**Description:** Build admin interface to view and manage AI conversations.

**Sub-tasks:**
1. Create `/nd-admin/ai-conversations/page.tsx`
2. Create conversation list component
3. Create conversation detail view
4. Add filters (channel, status, date)
5. Add "Take Over" button to disable AI
6. Add "Mark for Review" functionality
7. Add conversation search
8. Style with gaming/sci-fi theme
9. Test all features

**Acceptance Criteria:**
- Admin can view all conversations
- Conversations can be filtered and searched
- Admin can view full conversation history
- Admin can take over conversation
- Admin can mark conversations for review
- UI matches site design theme
- All features work properly

**Files to create:**
- `app/nd-admin/ai-conversations/page.tsx`
- `components/admin/ConversationList.tsx`
- `components/admin/ConversationDetail.tsx`
- `components/admin/TakeOverButton.tsx`
- `lib/api/conversations.ts`

---

## Task 9: Configure Webhooks in External Services
**Description:** Set up webhooks in Resend and Twilio to point to our endpoints.

**Sub-tasks:**
1. Deploy application to get production URLs
2. Configure Resend webhook for incoming emails
3. Configure Twilio webhook for WhatsApp messages
4. Test webhooks with real messages
5. Verify webhook signatures
6. Monitor webhook logs
7. Document webhook setup process

**Acceptance Criteria:**
- Resend webhook configured and working
- Twilio webhook configured and working
- Webhooks receive real messages
- Signatures are verified
- Logs show successful webhook calls
- Documentation is complete

**Files to modify:**
- Update README with webhook setup instructions

---

## Task 10: Testing and Monitoring
**Description:** Comprehensive testing and set up monitoring for the AI chatbot system.

**Sub-tasks:**
1. Send test emails and verify AI responses
2. Send test WhatsApp messages and verify AI responses
3. Test conversation context across multiple messages
4. Test "take over" functionality
5. Test error scenarios (API failures, invalid data)
6. Set up logging and monitoring
7. Create test suite for critical paths
8. Load test with multiple concurrent messages
9. Document testing results

**Acceptance Criteria:**
- Email auto-reply works end-to-end
- WhatsApp auto-reply works end-to-end
- Conversation context is maintained
- Admin dashboard works properly
- Error handling works correctly
- Monitoring is in place
- Test suite passes
- System handles load well

**Files to create:**
- `tests/ai-chatbot.test.ts`
- `tests/webhooks.test.ts`
- `TESTING_GUIDE.md`

---

## Task 11: Documentation and Deployment
**Description:** Create comprehensive documentation and deploy the system.

**Sub-tasks:**
1. Write API setup guide (Anthropic, Twilio)
2. Write deployment guide
3. Write admin user guide
4. Create troubleshooting guide
5. Document environment variables
6. Deploy to production
7. Configure production webhooks
8. Monitor production for 24 hours
9. Create runbook for common issues

**Acceptance Criteria:**
- All documentation is complete and clear
- Setup guide allows anyone to configure system
- System is deployed to production
- Production webhooks are working
- Monitoring shows healthy system
- Runbook covers common scenarios

**Files to create:**
- `AI_CHATBOT_SETUP.md`
- `AI_CHATBOT_ADMIN_GUIDE.md`
- `AI_CHATBOT_TROUBLESHOOTING.md`
- `AI_CHATBOT_DEPLOYMENT.md`

---

## Dependencies

- Task 2 depends on Task 1 (need database connection)
- Task 3 depends on Task 1 (need Claude API key)
- Task 4, 5, 6 depend on Task 2 (need database schema)
- Task 7 depends on Tasks 3, 4, 5, 6 (needs all services)
- Task 8 depends on Task 7 (needs data to display)
- Task 9 depends on Task 7 (needs working endpoints)
- Task 10 depends on Task 9 (needs production webhooks)
- Task 11 depends on Task 10 (needs tested system)

## Estimated Timeline

- Task 1: 2 hours (API setup)
- Task 2: 3 hours (Database schema)
- Task 3: 4 hours (Claude service)
- Task 4: 3 hours (Email webhook)
- Task 5: 3 hours (WhatsApp webhook)
- Task 6: 4 hours (Response service)
- Task 7: 5 hours (AI processor)
- Task 8: 6 hours (Admin dashboard)
- Task 9: 2 hours (Webhook config)
- Task 10: 4 hours (Testing)
- Task 11: 3 hours (Documentation)

**Total: ~39 hours** (approximately 1 week of full-time work)
