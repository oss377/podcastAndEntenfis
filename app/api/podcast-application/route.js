import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import nodemailer from 'nodemailer';

// Create email transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_PORT === '465',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Email templates with Purple Brand Color
const getPodcastEmailTemplate = (name, isAmharic = false) => {
  if (isAmharic) {
    return {
      subject: `እንኳን ወደ ${process.env.APP_NAME} ፖድካስት በደህና መጡ!`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>የፖድካስት ማመልከቻ ማረጋገጫ</title>
          <style>
            body { font-family: 'Helvetica', 'Arial', sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; padding: 12px 24px; background: #8B5CF6; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; font-weight: bold; transition: background 0.3s; }
            .button:hover { background: #6D28D9; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
            .highlight { color: #8B5CF6; font-weight: bold; }
            .stats { display: flex; justify-content: space-around; margin: 30px 0; padding: 20px; background: white; border-radius: 10px; box-shadow: 0 2px 10px rgba(139, 92, 246, 0.1); }
            .stat-item { text-align: center; }
            .stat-value { font-size: 24px; font-weight: bold; color: #8B5CF6; }
            .stat-label { font-size: 12px; color: #666; }
            .social-links { display: flex; justify-content: center; gap: 15px; margin: 20px 0; }
            .social-link { color: #8B5CF6; text-decoration: none; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎙️ እንኳን ወደ ${process.env.APP_NAME} ፖድካስት በደህና መጡ!</h1>
            </div>
            <div class="content">
              <h2>ሰላም ${name},</h2>
              <p>በፖድካስታችን ላይ እንግዳ ለመሆን ስላመለከቱ እናመሰግናለን! ስለእርስዎ እና ታሪክዎ የበለጠ ለማወቅ ጓጉተናል።</p>
              
              <p>ማመልከቻዎ በተሳካ ሁኔታ <span class="highlight">ደርሶናል</span>። ቡድናችን መረጃዎን በመገምገም በ2-3 ቀናት ውስጥ ያገናኝዎታል።</p>
              
              <div class="stats">
                <div class="stat-item">
                  <div class="stat-value">100+</div>
                  <div class="stat-label">ክፍሎች</div>
                </div>
                <div class="stat-item">
                  <div class="stat-value">50K+</div>
                  <div class="stat-label">አድማጮች</div>
                </div>
                <div class="stat-item">
                  <div class="stat-value">4.9</div>
                  <div class="stat-label">ደረጃ</div>
                </div>
              </div>
              
              <h3>ቀጥሎ ምን ይሆናል?</h3>
              <ul>
                <li>✅ ቡድናችን ማመልከቻዎን ይገመግማል</li>
                <li>📧 ቃለ መጠይቅ ለማድረግ በኢሜይል እናገኝዎታለን</li>
                <li>🎙️ አስደሳች ውይይት ለማድረግ ይዘጋጁ!</li>
              </ul>
              
              <div style="text-align: center;">
                <a href="https://youtube.com/@manyazewaleshetu" class="button">ክፍሎችን ይመልከቱ</a>
              </div>
              
              <div class="social-links">
                <a href="#" class="social-link">📱 YouTube</a>
                <a href="#" class="social-link">📘 Facebook</a>
                <a href="#" class="social-link">🐦 Twitter</a>
              </div>
              
              <p>ከሰላምታ ጋር፣<br>
              <strong>የ${process.env.APP_NAME} ቡድን</strong></p>
            </div>
            <div class="footer">
              <p>&copy; ${new Date().getFullYear()} ${process.env.APP_NAME}. መብቱ በህግ የተጠበቀ ነው።</p>
              <p>ይህ ኢሜይል የፖድካስት ማመልከቻዎን ለማረጋገጥ የተላከ ነው።</p>
            </div>
          </div>
        </body>
        </html>
      `
    };
  } else {
    return {
      subject: `Welcome to ${process.env.APP_NAME} Podcast!`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Podcast Application Confirmation</title>
          <style>
            body { font-family: 'Helvetica', 'Arial', sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; padding: 12px 24px; background: #8B5CF6; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; font-weight: bold; transition: background 0.3s; }
            .button:hover { background: #6D28D9; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
            .highlight { color: #8B5CF6; font-weight: bold; }
            .stats { display: flex; justify-content: space-around; margin: 30px 0; padding: 20px; background: white; border-radius: 10px; box-shadow: 0 2px 10px rgba(139, 92, 246, 0.1); }
            .stat-item { text-align: center; }
            .stat-value { font-size: 24px; font-weight: bold; color: #8B5CF6; }
            .stat-label { font-size: 12px; color: #666; }
            .social-links { display: flex; justify-content: center; gap: 15px; margin: 20px 0; }
            .social-link { color: #8B5CF6; text-decoration: none; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎙️ Welcome to ${process.env.APP_NAME} Podcast!</h1>
            </div>
            <div class="content">
              <h2>Hello ${name},</h2>
              <p>Thank you for applying to be a guest on our podcast! We're excited to learn more about you and your story.</p>
              
              <p>Your application has been <span class="highlight">successfully received</span>. Our team will review your information and get back to you within 2-3 business days.</p>
              
              <div class="stats">
                <div class="stat-item">
                  <div class="stat-value">100+</div>
                  <div class="stat-label">Episodes</div>
                </div>
                <div class="stat-item">
                  <div class="stat-value">50K+</div>
                  <div class="stat-label">Listeners</div>
                </div>
                <div class="stat-item">
                  <div class="stat-value">4.9</div>
                  <div class="stat-label">Rating</div>
                </div>
              </div>
              
              <h3>What happens next?</h3>
              <ul>
                <li>✅ Our team reviews your application</li>
                <li>📧 We'll contact you via email to schedule an interview</li>
                <li>🎙️ Prepare for an amazing conversation!</li>
              </ul>
              
              <p>In the meantime, feel free to:</p>
              <ul>
                <li>📺 Watch our previous episodes on YouTube</li>
                <li>📱 Follow us on social media for updates</li>
                <li>💡 Prepare any topics you'd like to discuss</li>
              </ul>
              
              <div style="text-align: center;">
                <a href="https://youtube.com/@manyazewaleshetu" class="button">Watch Our Episodes</a>
              </div>
              
              <div class="social-links">
                <a href="#" class="social-link">📱 YouTube</a>
                <a href="#" class="social-link">📘 Facebook</a>
                <a href="#" class="social-link">🐦 Twitter</a>
              </div>
              
              <p>Best regards,<br>
              <strong>The ${process.env.APP_NAME} Team</strong></p>
            </div>
            <div class="footer">
              <p>&copy; ${new Date().getFullYear()} ${process.env.APP_NAME}. All rights reserved.</p>
              <p>This email was sent to confirm your podcast application.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };
  }
};

export async function POST(request) {
  try {
    // Get MongoDB client
    const client = await clientPromise;
    const db = client.db('podcast-app');
    
    // Get form data from request
    const formData = await request.json();
    console.log('Received podcast form data:', formData);
    
    // Check if user already registered with this email
    const existingUser = await db.collection('podcastApplications').findOne({ 
      email: formData.email 
    });
    
    if (existingUser) {
      console.log('User already registered with email:', formData.email);
      return NextResponse.json(
        { 
          success: false, 
          message: 'You have already registered for the podcast. Please check your email for confirmation.',
          alreadyRegistered: true
        },
        { status: 409 } // Conflict status code
      );
    }
    
    // Add timestamps
    const applicationData = {
      ...formData,
      audioLink: formData.audioLink || '',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    // Insert into database
    const result = await db.collection('podcastApplications').insertOne(applicationData);
    
    console.log('Podcast application saved successfully:', result.insertedId);
    
    // Send confirmation email
    let emailSent = false;
    let emailError = null;
    
    try {
      const template = getPodcastEmailTemplate(
        formData.fullName, 
        formData.language === 'am'
      );
      
      const mailOptions = {
        from: `"${process.env.APP_NAME}" <${process.env.SMTP_USER}>`,
        to: formData.email,
        subject: template.subject,
        html: template.html,
      };

      const emailInfo = await transporter.sendMail(mailOptions);
      console.log('Confirmation email sent successfully:', emailInfo.messageId);
      emailSent = true;
    } catch (emailErr) {
      console.error('Failed to send confirmation email:', emailErr);
      emailError = emailErr.message;
      // Don't throw - we still want to return success for the application
    }
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Podcast application submitted successfully',
        data: { ...applicationData, _id: result.insertedId },
        emailSent: emailSent,
        emailError: emailError
      },
      { status: 201 }
    );
    
  } catch (error) {
    console.error('Error saving podcast application:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error: ' + error.message 
      },
      { status: 500 }
    );
  }
}

// GET endpoint to fetch applications
export async function GET(request) {
  try {
    const client = await clientPromise;
    const db = client.db('podcast-app');
    
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    
    let query = {};
    if (email) {
      query.email = email;
    }
    
    const applications = await db
      .collection('podcastApplications')
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();
    
    return NextResponse.json(
      { 
        success: true, 
        data: applications 
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Error fetching podcast applications:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error' 
      },
      { status: 500 }
    );
  }
}