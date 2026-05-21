# 🚀 Quick Start - Email Backend Setup

## ⚡ 5-Minute Setup

### Step 1: Get Resend API Key (2 minutes)

1. Go to: **https://resend.com/signup**
2. Sign up (FREE - no credit card needed)
3. Verify your email
4. Go to: **https://resend.com/api-keys**
5. Click "Create API Key"
6. Name it: "NDcreations"
7. **Copy the key** (starts with `re_`)

### Step 2: Add API Key to Project (1 minute)

1. Create file `.env.local` in your project root:
   ```bash
   # Windows Command Prompt:
   type nul > .env.local
   
   # Or just create it manually in VS Code
   ```

2. Open `.env.local` and add:
   ```env
   RESEND_API_KEY=re_paste_your_key_here
   ```

3. Save the file

### Step 3: Restart Server (1 minute)

```bash
# Stop current server (Ctrl+C in terminal)
# Then restart:
npm run dev
```

### Step 4: Test It! (1 minute)

1. Open: **http://localhost:3000/contact**
2. Fill out the form
3. Click "Send Message"
4. Check your email: **ndcreation139@gmail.com**

---

## ✅ What You'll Get

### Professional Emails:
- ✅ Beautiful HTML design with NDcreations branding
- ✅ Sender's email in "From" field
- ✅ One-click reply button
- ✅ Mobile-responsive
- ✅ Clear sender information

### Email Example:
```
From: NDcreations Website <onboarding@resend.dev>
Reply-To: customer@example.com
Subject: [NDcreations Website] New Contact: Website Inquiry - From John Doe

[Beautiful HTML email with blue gradient header]
👤 Sender: John Doe (customer@example.com)
📋 Subject: Website Inquiry
💬 Message: I would like to discuss...
[One-click Reply Button]
```

---

## 🎯 That's It!

Your email backend is now live! Every form submission will:
1. Send professional HTML email to ndcreation139@gmail.com
2. Open WhatsApp with message details
3. Save to admin dashboard

---

## 📝 Important Notes

- **Free Plan**: 100 emails/day, 3,000/month (perfect for your needs)
- **Never commit** `.env.local` to git (already protected)
- **For production**: Add API key to Vercel environment variables

---

## 🐛 Troubleshooting

**Email not sending?**
1. Check `.env.local` file exists
2. Verify API key is correct (starts with `re_`)
3. Restart dev server
4. Check terminal for errors

**Still not working?**
- Check Resend dashboard: https://resend.com/emails
- Look for error messages in browser console (F12)
- Verify account is verified

---

## 🚀 Deploy to Production

When ready to deploy:

1. **Vercel Dashboard:**
   - Go to your project settings
   - Add environment variable: `RESEND_API_KEY`
   - Paste your API key
   - Redeploy

2. **Done!** Your production site now has email backend

---

## 📚 Full Documentation

For detailed setup, customization, and advanced features:
- Read: `EMAIL_BACKEND_SETUP.md`

---

**Need Help?**
- Resend Docs: https://resend.com/docs
- Resend Support: support@resend.com
