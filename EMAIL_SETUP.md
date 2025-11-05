# Email Setup Guide

To receive emails when someone submits the contact form, you need to set up Gmail SMTP authentication.

## Step 1: Enable 2-Step Verification
1. Go to your Google Account settings: https://myaccount.google.com/
2. Navigate to Security
3. Enable 2-Step Verification if not already enabled

## Step 2: Generate App Password
1. In your Google Account settings, go to Security
2. Find "App passwords" (under 2-Step Verification)
3. Click "App passwords"
4. Select "Mail" as the app
5. Click "Generate"
6. Copy the 16-character password that appears

## Step 3: Create Environment File
1. Create a file named `.env.local` in your project root
2. Add the following content:

```env
GMAIL_USER=roshansahani535@gmail.com
GMAIL_APP_PASSWORD=your_16_character_app_password_here
```

Replace `your_16_character_app_password_here` with the password you generated in Step 2.

## Step 4: Test the Contact Form
1. Start your development server: `npm run dev`
2. Go to the contact section of your portfolio
3. Fill out and submit the contact form
4. Check your email (roshansahani535@gmail.com) for the message

## Alternative Email Services

If you prefer not to use Gmail, you can also use:

### Resend (Recommended for Production)
1. Sign up at https://resend.com
2. Get your API key
3. Replace the nodemailer code in `/src/app/api/contact/route.ts` with:

```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
await resend.emails.send({
  from: 'Portfolio Contact <noreply@yourdomain.com>',
  to: 'roshansahani535@gmail.com',
  subject: `Portfolio Contact: ${subject}`,
  html: emailContent,
});
```

### SendGrid
1. Sign up at https://sendgrid.com
2. Get your API key
3. Use SendGrid's Node.js library

## Security Notes
- Never commit your `.env.local` file to Git
- The `.env.local` file is already in `.gitignore`
- App passwords are more secure than using your regular Gmail password
- For production, consider using a dedicated email service like Resend or SendGrid

## Troubleshooting
- If emails aren't sending, check the browser console and server logs
- Make sure your Gmail account allows "less secure app access" or use App passwords
- Verify that your environment variables are correctly set
- Check that the recipient email address is correct 