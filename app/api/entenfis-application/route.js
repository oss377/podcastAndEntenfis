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

// Email templates for Entenfis with Purple Brand Color
const getEntenfisEmailTemplate = (name, isAmharic = false) => {
  if (isAmharic) {
    return {
      subject: `እንኳን ወደ ${process.env.APP_NAME} እንተንፍስ ፕሮግራም በደህና መጡ!`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>የእንተንፍስ ማመልከቻ ማረጋገጫ</title>
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
              <h1>🎤 እንኳን ወደ ${process.env.APP_NAME} እንተንፍስ ፕሮግራም በደህና መጡ!</h1>
            </div>
            <div class="content">
              <h2>ሰላም ${name},</h2>
              <p>በእንተንፍስ ፕሮግራማችን ላይ እንግዳ ለመሆን ስላመለከቱ እናመሰግናለን! ታሪክዎን እና እውቀትዎን ለማጋራት ጓጉተናል።</p>
              
              <p>ማመልከቻዎ በተሳካ ሁኔታ <span class="highlight">ደርሶናል</span>። ቡድናችን መረጃዎን በመገምገም በቅርቡ ያገናኝዎታል።</p>
              
              <div class="stats">
                <div class="stat-item">
                  <div class="stat-value">100+</div>
                  <div class="stat-label">እንግዶች</div>
                </div>
                <div class="stat-item">
                  <div class="stat-value">100+</div>
                  <div class="stat-label">ክፍሎች</div>
                </div>
                <div class="stat-item">
                  <div class="stat-value">4.8</div>
                  <div class="stat-label">ደረጃ</div>
                </div>
              </div>
              
              <h3>ቀጥሎ ምን ይሆናል?</h3>
              <ul>
                <li>✅ ማመልከቻዎ በግምገማ ላይ ነው</li>
                <li>📧 ከቡድናችን በ3-5 ቀናት ውስጥ ኢሜይል ይደርስዎታል</li>
                <li>🎯 ስለ ርዕስዎ እና የፕሮግራም ዝርዝሮች እንነጋገራለን</li>
              </ul>
              
              <div style="text-align: center;">
                <a href="https://youtube.com/@manyazewaleshetu" class="button">የእንተንፍስ ክፍሎችን ይመልከቱ</a>
              </div>
              
              <div class="social-links">
                <a href="#" class="social-link">📱 YouTube</a>
                <a href="#" class="social-link">📘 Facebook</a>
                <a href="#" class="social-link">🐦 Twitter</a>
              </div>
              
              <p>በፕሮግራሙ ላይ ሊገናኙዎት በመጠባበቅ ላይ!</p>
              
              <p>ከሰላምታ ጋር፣<br>
              <strong>የ${process.env.APP_NAME} እንተንፍስ ቡድን</strong></p>
            </div>
            <div class="footer">
              <p>&copy; ${new Date().getFullYear()} ${process.env.APP_NAME}. መብቱ በህግ የተጠበቀ ነው።</p>
              <p>ይህ ኢሜይል የእንተንፍስ ፕሮግራም ማመልከቻዎን ለማረጋገጥ የተላከ ነው።</p>
            </div>
          </div>
        </body>
        </html>
      `
    };
  } else {
    return {
      subject: `Welcome to ${process.env.APP_NAME} Entenfis Program!`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Entenfis Application Confirmation</title>
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
              <h1>🎤 Welcome to ${process.env.APP_NAME} Entenfis Program!</h1>
            </div>
            <div class="content">
              <h2>Hello ${name},</h2>
              <p>Thank you for applying to be a guest on our Entenfis program! We're excited to have you share your story and expertise.</p>
              
              <p>Your application has been <span class="highlight">successfully received</span>. Our team will review your information and contact you soon.</p>
              
              <div class="stats">
                <div class="stat-item">
                  <div class="stat-value">50+</div>
                  <div class="stat-label">Guests</div>
                </div>
                <div class="stat-item">
                  <div class="stat-value">100+</div>
                  <div class="stat-label">Episodes</div>
                </div>
                <div class="stat-item">
                  <div class="stat-value">4.8</div>
                  <div class="stat-label">Rating</div>
                </div>
              </div>
              
              <h3>Application Summary:</h3>
              <ul>
                <li>✅ Application received and under review</li>
                <li>📧 You'll receive an email from our team within 3-5 business days</li>
                <li>🎯 We'll discuss your topic and program details</li>
              </ul>
              
              <h3>While you wait:</h3>
              <ul>
                <li>📺 Check out our previous Entenfis episodes</li>
                <li>📝 Prepare any materials you'd like to share</li>
                <li>📱 Connect with us on social media</li>
              </ul>
              
              <div style="text-align: center;">
                <a href="https://youtube.com/@manyazewaleshetu" class="button">Watch Entenfis Episodes</a>
              </div>
              
              <div class="social-links">
                <a href="#" class="social-link">📱 YouTube</a>
                <a href="#" class="social-link">📘 Facebook</a>
                <a href="#" class="social-link">🐦 Twitter</a>
              </div>
              
              <p>We look forward to having you on the show!</p>
              
              <p>Best regards,<br>
              <strong>The ${process.env.APP_NAME} Entenfis Team</strong></p>
            </div>
            <div class="footer">
              <p>&copy; ${new Date().getFullYear()} ${process.env.APP_NAME}. All rights reserved.</p>
              <p>This email confirms your Entenfis program application.</p>
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
    console.log('Received entenfis form data:', formData);
    
    // Check if user already registered with this email
    const existingUser = await db.collection('entenfisApplications').findOne({ 
      email: formData.email 
    });
    
    if (existingUser) {
      console.log('User already registered with email:', formData.email);
      return NextResponse.json(
        { 
          success: false, 
          message: 'You have already registered for the Entenfis program. Please check your email for confirmation.',
          alreadyRegistered: true
        },
        { status: 409 } // Conflict status code
      );
    }
    
    // Add timestamps
    const applicationData = {
      ...formData,
      achievements: formData.achievements || '',
      socialMediaLinks: formData.socialMediaLinks || '',
      programDate: formData.programDate || '',
      programTime: formData.programTime || '',
      specialRequirements: formData.specialRequirements || '',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    // Insert into database
    const result = await db.collection('entenfisApplications').insertOne(applicationData);
    
    console.log('Entenfis application saved successfully:', result.insertedId);
    
    // Send confirmation email
    let emailSent = false;
    let emailError = null;
    
    try {
      const template = getEntenfisEmailTemplate(
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
        message: 'Entenfis application submitted successfully',
        data: { ...applicationData, _id: result.insertedId },
        emailSent: emailSent,
        emailError: emailError
      },
      { status: 201 }
    );
    
  } catch (error) {
    console.error('Error saving entenfis application:', error);
    
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
      .collection('entenfisApplications')
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
    console.error('Error fetching entenfis applications:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error' 
      },
      { status: 500 }
    );
  }
}