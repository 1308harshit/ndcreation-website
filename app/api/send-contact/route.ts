import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate input
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Send email using Resend
    const data = await resend.emails.send({
      from: 'NDcreations Website <onboarding@resend.dev>', // You'll update this with your domain
      to: ['ndcreation139@gmail.com'],
      replyTo: email, // This makes replies go to the sender
      subject: `[NDcreations Website] New Contact: ${subject} - From ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background: linear-gradient(135deg, #0066ff, #00d9ff);
                color: white;
                padding: 20px;
                border-radius: 10px 10px 0 0;
                text-align: center;
              }
              .content {
                background: #f9f9f9;
                padding: 30px;
                border: 1px solid #e0e0e0;
                border-radius: 0 0 10px 10px;
              }
              .section {
                margin-bottom: 25px;
              }
              .section-title {
                color: #0066ff;
                font-weight: bold;
                font-size: 14px;
                text-transform: uppercase;
                margin-bottom: 10px;
                border-bottom: 2px solid #0066ff;
                padding-bottom: 5px;
              }
              .info-row {
                margin: 8px 0;
              }
              .label {
                font-weight: bold;
                color: #555;
              }
              .message-box {
                background: white;
                padding: 15px;
                border-left: 4px solid #0066ff;
                border-radius: 5px;
                margin-top: 10px;
              }
              .footer {
                margin-top: 20px;
                padding-top: 20px;
                border-top: 1px solid #e0e0e0;
                font-size: 12px;
                color: #888;
              }
              .reply-button {
                display: inline-block;
                background: linear-gradient(135deg, #0066ff, #00d9ff);
                color: white;
                padding: 12px 30px;
                text-decoration: none;
                border-radius: 5px;
                margin-top: 15px;
                font-weight: bold;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1 style="margin: 0; font-size: 24px;">🌐 New Message from NDcreations Website</h1>
            </div>
            
            <div class="content">
              <div class="section">
                <div class="section-title">👤 Sender Information</div>
                <div class="info-row">
                  <span class="label">Name:</span> ${name}
                </div>
                <div class="info-row">
                  <span class="label">Email:</span> <a href="mailto:${email}">${email}</a>
                </div>
                <div class="info-row">
                  <span class="label">Reply To:</span> <a href="mailto:${email}" class="reply-button">Reply to ${name}</a>
                </div>
              </div>

              <div class="section">
                <div class="section-title">📋 Subject</div>
                <div>${subject}</div>
              </div>

              <div class="section">
                <div class="section-title">💬 Message</div>
                <div class="message-box">
                  ${message.replace(/\n/g, '<br>')}
                </div>
              </div>

              <div class="footer">
                <div><strong>📅 Timestamp:</strong> ${new Date().toLocaleString()}</div>
                <div><strong>🌐 Source:</strong> NDcreations Contact Form</div>
                <div><strong>🔗 Website:</strong> <a href="https://ndcreation-website.vercel.app">https://ndcreation-website.vercel.app</a></div>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
