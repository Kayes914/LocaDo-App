import logger from '../utils/logger';

interface EmailData {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

interface EmailResult {
  success: boolean;
  error?: string;
}

class EmailService {
  private isConfigured(): boolean {
    // Add email service configuration check here (SendGrid, Nodemailer, etc.)
    // For now, return false as email is not implemented
    return false;
  }

  async sendEmail(emailData: EmailData): Promise<EmailResult> {
    try {
      if (!this.isConfigured()) {
        logger.warn('Email service not configured, skipping email send', {
          to: emailData.to,
          subject: emailData.subject
        });
        
        return {
          success: false,
          error: 'Email service not configured'
        };
      }

      // TODO: Implement actual email sending logic here
      // This could use SendGrid, Nodemailer, or any other email service
      
      logger.info('Email would be sent (not implemented)', {
        to: emailData.to,
        subject: emailData.subject
      });

      return {
        success: true
      };
    } catch (error) {
      logger.error('Email sending failed', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown email error'
      };
    }
  }

  async sendWelcomeEmail(userEmail: string, userName: string): Promise<EmailResult> {
    return this.sendEmail({
      to: userEmail,
      subject: 'Welcome to Locado!',
      html: `
        <h1>Welcome to Locado, ${userName}!</h1>
        <p>Thank you for joining our local marketplace community.</p>
        <p>Start exploring items, services, and connect with people in your area.</p>
      `,
      text: `Welcome to Locado, ${userName}! Thank you for joining our local marketplace community.`
    });
  }

  async sendPasswordResetEmail(userEmail: string, resetToken: string): Promise<EmailResult> {
    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;
    
    return this.sendEmail({
      to: userEmail,
      subject: 'Password Reset - Locado',
      html: `
        <h1>Password Reset Request</h1>
        <p>You requested a password reset for your Locado account.</p>
        <p>Click the link below to reset your password:</p>
        <a href="${resetUrl}">Reset Password</a>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request this, please ignore this email.</p>
      `,
      text: `Password reset requested. Visit: ${resetUrl}`
    });
  }

  async sendExpertVerificationEmail(userEmail: string, userName: string): Promise<EmailResult> {
    return this.sendEmail({
      to: userEmail,
      subject: 'Expert Profile Verification - Locado',
      html: `
        <h1>Expert Profile Submitted, ${userName}!</h1>
        <p>Your expert profile has been submitted for verification.</p>
        <p>We'll review your information and get back to you within 2-3 business days.</p>
        <p>Once verified, you'll be able to offer your services on our platform.</p>
      `,
      text: `Expert profile submitted for verification. We'll review and get back to you within 2-3 business days.`
    });
  }
}

export default new EmailService(); 