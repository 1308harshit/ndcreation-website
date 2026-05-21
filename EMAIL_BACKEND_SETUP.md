# Email Backend Setup Guide

## 🎯 Overview

Your NDcreations website now has a **professional email backend** that sends emails with the sender's email as the "From" address using **Resend** email service.

## ✅ What's Been Added

### 1. **Backend API Routes**
- `/api/send-contact` - Handles contact form submissions
- `/api/send-booking` - Handles service booking submissions

### 2. **Email Service Integration**
- Using **Resend** - Modern, reliable email API
- Professional HTML email templates
- Automatic reply-to configuration
- Beautiful branded emails with NDcreations styling

### 3. **Features**
- ✅ Sender's email appears in "From" field
- ✅ Reply-to automatically set to sender's email
- ✅ Professional HTML email design
- ✅ Clear branding with NDcreations colors
- ✅ One-click reply button
- ✅ Mobile-responsive email templates
- ✅ Fallback to WhatsApp if email fails

---

## 🚀 Setup Instructions

### Step 1: Create Resend Account

1. Go to [https://resend.com](https://resend.com)
2. Click "Sign Up" (it's FREE - 100 emails/day, 3,000/month)
3. Verify your email address

### Step 2: Get API Key

1. After logging in, go to [https://resend.com/api-keys](https://resend.com/api-keys)
2. Click "Create API Key"
3. Give it a name: "NDcreations Website"
4. Copy the API key (starts with `re_`)

### Step 3: Add API Key to Your Project

1. Create a file named `.env.local` in your project root:
   ```bash
   # In the ndcreations folder
   touch .env.local
   ```

2. Add your API key to `.env.local`:
   ```env
   RESEND_API_KEY=re_your_actual_api_key_here
   ```

3. **IMPORTANT**: Never commit `.env.local` to git (it's already in .gitignore)

### Step 4: Restart Development Server

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

### Step 5: Test the Email System

1. Go to http://localhost:3000/contact
2. Fill out the form with your test email
3. Click "Send Message"
4. Check your email at ndcreation139@gmail.com

---

## 📧 Email Features

### What You'll Receive:

**Subject Line:**
```
[NDcreations Website] New Contact: [Subject] - From [Name]
```

**From Address:**
```
NDcreations Website <onboarding@resend.dev>
```

**Reply-To Address:**
```
[Sender's Email]
```

**Email Content:**
- Professional HTML design
- NDcreations branding (blue gradient header)
- Clear sections for sender info, subject, message
- One-click "Reply to [Name]" button
- Timestamp and source information
- Mobile-responsive design

### Reply Functionality:

When you click "Reply" in Gmail/Outlook:
- ✅ Automatically addresses to the sender's email
- ✅ Includes original message context
- ✅ No need to copy-paste email addresses

---

## 🎨 Email Template Preview

```html
┌─────────────────────────────────────┐
│  🌐 New Message from NDcreations    │ ← Blue gradient header
│         Website                      │
├─────────────────────────────────────┤
│                                      │
│  👤 SENDER INFORMATION               │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  Name: John Doe                      │
│  Email: john@example.com             │
│  [Reply to John] ← Button            │
│                                      │
│  📋 SUBJECT                          │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  Website Development Inquiry         │
│                                      │
│  💬 MESSAGE                          │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  │ I would like to discuss...      │ ← Message box
│  │                                  │
│                                      │
│  ─────────────────────────────────  │
│  📅 Timestamp: 5/21/2026, 10:30 AM  │
│  🌐 Source: NDcreations Contact Form│
│  🔗 Website: [link]                 │
└─────────────────────────────────────┘
```

---

## 🔧 Advanced Configuration

### Using Your Own Domain (Optional)

Once you have a custom domain (e.g., ndcreations.com):

1. **Add Domain to Resend:**
   - Go to [https://resend.com/domains](https://resend.com/domains)
   - Click "Add Domain"
   - Enter your domain: `ndcreations.com`
   - Follow DNS setup instructions

2. **Update API Routes:**
   - Edit `app/api/send-contact/route.ts`
   - Change `from:` line to:
     ```typescript
     from: 'NDcreations <contact@ndcreations.com>',
     ```

3. **Benefits:**
   - Professional sender address
   - Better email deliverability
   - Custom branding

---

## 🧪 Testing

### Test Contact Form:
```bash
# 1. Start dev server
npm run dev

# 2. Open browser
http://localhost:3000/contact

# 3. Fill form with test data
Name: Test User
Email: your-test-email@gmail.com
Subject: Test Message
Message: This is a test

# 4. Click "Send Message"

# 5. Check:
- WhatsApp opens with message ✓
- Email sent to ndcreation139@gmail.com ✓
- Success message appears ✓
```

### Test Service Booking:
```bash
# Same process at:
http://localhost:3000/services

# Click any "Book Service" button
# Fill form and submit
```

---

## 📊 Email Limits

### Free Plan (Resend):
- **100 emails per day**
- **3,000 emails per month**
- Perfect for small business websites

### If You Need More:
- Upgrade to paid plan: $20/month for 50,000 emails
- Or use alternative: SendGrid, Mailgun, AWS SES

---

## 🐛 Troubleshooting

### Email Not Sending?

1. **Check API Key:**
   ```bash
   # Make sure .env.local exists and has correct key
   cat .env.local
   ```

2. **Check Server Logs:**
   ```bash
   # Look for errors in terminal where dev server is running
   # Should see: "Error sending email:" if something's wrong
   ```

3. **Verify Resend Account:**
   - Login to [https://resend.com](https://resend.com)
   - Check "Logs" section for delivery status
   - Verify API key is active

4. **Test API Directly:**
   ```bash
   # Use curl to test API
   curl -X POST http://localhost:3000/api/send-contact \
     -H "Content-Type: application/json" \
     -d '{"name":"Test","email":"test@test.com","subject":"Test","message":"Test"}'
   ```

### Common Issues:

**"Failed to send email" error:**
- API key not set in `.env.local`
- API key is invalid
- Resend account not verified

**Email goes to spam:**
- Use custom domain (see Advanced Configuration)
- Ask recipient to mark as "Not Spam"
- Verify SPF/DKIM records (with custom domain)

**WhatsApp opens but email doesn't send:**
- Check browser console for errors (F12)
- Verify API route is accessible
- Check network tab for failed requests

---

## 🔒 Security Notes

1. **Never commit `.env.local`** - It's in .gitignore
2. **Never share your API key** - Keep it secret
3. **Rotate API key** if accidentally exposed
4. **Use environment variables** in production (Vercel, etc.)

---

## 🚀 Deployment (Vercel)

When deploying to Vercel:

1. **Add Environment Variable:**
   - Go to Vercel Dashboard
   - Select your project
   - Go to Settings → Environment Variables
   - Add: `RESEND_API_KEY` = `re_your_key`

2. **Redeploy:**
   ```bash
   git push
   # Vercel auto-deploys
   ```

3. **Test Production:**
   - Visit your live site
   - Submit a test form
   - Verify email received

---

## 📈 Monitoring

### Check Email Delivery:

1. **Resend Dashboard:**
   - [https://resend.com/emails](https://resend.com/emails)
   - See all sent emails
   - Check delivery status
   - View bounce/complaint rates

2. **Admin Dashboard:**
   - Your website: `/nd-admin`
   - See all form submissions
   - Track conversion rates

---

## 🎉 Success!

Your email backend is now set up! You'll receive:

✅ Professional HTML emails
✅ Sender's email in "From" field
✅ One-click reply functionality
✅ WhatsApp notifications
✅ Beautiful branded design
✅ Mobile-responsive emails

**Next Steps:**
1. Get your Resend API key
2. Add it to `.env.local`
3. Restart dev server
4. Test the forms
5. Deploy to production

Need help? Check the troubleshooting section or contact Resend support!
