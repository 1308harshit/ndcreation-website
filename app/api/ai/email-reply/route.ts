import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { ollamaService } from '@/lib/ai/ollama-service';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { from, subject, message, name } = body;

    console.log('📧 Email received for AI reply:', { from, subject });

    // Check if AI email reply is enabled
    if (process.env.AI_EMAIL_ENABLED !== 'true' || process.env.AI_AUTO_REPLY !== 'true') {
      return NextResponse.json(
        { message: 'AI email reply is disabled' },
        { status: 200 }
      );
    }

    // Check if Ollama is available
    const isAvailable = await ollamaService.checkAvailability();
    if (!isAvailable) {
      console.error('❌ Ollama is not available');
      return NextResponse.json(
        { error: 'AI service is not available' },
        { status: 503 }
      );
    }

    // Generate AI response
    console.log('🤖 Generating AI response...');
    const aiResponse = await ollamaService.generateResponse({
      message: `Customer name: ${name || 'Customer'}
Email: ${from}
Subject: ${subject}
Message: ${message}`,
    });

    console.log('✅ AI response generated');

    // Send email response
    const emailResponse = await resend.emails.send({
      from: 'NDcreations <onboarding@resend.dev>',
      to: from,
      subject: `Re: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #B026FF, #FF006E); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">NDcreations</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Premium Tech Solutions</p>
          </div>
          
          <div style="padding: 30px; background: #f9f9f9;">
            <p style="color: #333; font-size: 16px; line-height: 1.6;">
              Hi ${name || 'there'},
            </p>
            
            <div style="color: #333; font-size: 16px; line-height: 1.8; white-space: pre-wrap;">
${aiResponse}
            </div>
            
            <div style="margin-top: 30px; padding: 20px; background: white; border-left: 4px solid #B026FF; border-radius: 4px;">
              <p style="margin: 0; color: #666; font-size: 14px;">
                <strong>Need more help?</strong><br>
                📧 Email: ${process.env.BUSINESS_EMAIL}<br>
                📱 WhatsApp: ${process.env.BUSINESS_WHATSAPP}<br>
                🌐 Website: ${process.env.BUSINESS_WEBSITE}
              </p>
            </div>
            
            <p style="color: #999; font-size: 12px; margin-top: 30px; text-align: center;">
              This is an automated response powered by AI. A human team member will follow up if needed.
            </p>
          </div>
          
          <div style="background: #1A1A2E; padding: 20px; text-align: center;">
            <p style="color: #888; font-size: 12px; margin: 0;">
              © ${new Date().getFullYear()} NDcreations. All rights reserved.
            </p>
          </div>
        </div>
      `,
    });

    console.log('✅ AI email response sent:', emailResponse.data?.id);

    return NextResponse.json({
      success: true,
      messageId: emailResponse.data?.id,
      aiResponse: aiResponse,
    });
  } catch (error: any) {
    console.error('❌ Error in AI email reply:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to process AI email reply' },
      { status: 500 }
    );
  }
}
