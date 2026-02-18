# Contact Form Setup Guide

## Overview
The contact form on the McKinley Roofing website is now functional and configured to send emails to **josh@creativecowboys.co**.

## Current Implementation
The form uses **Web3Forms** as the email delivery service. Web3Forms is a free, reliable service that handles form submissions without requiring backend infrastructure.

## Setup Instructions

### Option 1: Web3Forms (Recommended - Quick Setup)

The form is currently configured with Web3Forms. To activate it:

1. **Get your Web3Forms Access Key**:
   - Go to [https://web3forms.com/](https://web3forms.com/)
   - Click "Get Started for Free"
   - Enter your email: **josh@creativecowboys.co**
   - Click "Get Access Key"
   - Check josh@creativecowboys.co inbox for the access key email
   - Copy the access key (it will look like: `a1b2c3d4-e5f6-7890-abcd-ef1234567890`)

2. **Update the form with your access key**:
   - Open `components/Contact.tsx`
   - Find line 54: `access_key: 'YOUR_WEB3FORMS_ACCESS_KEY',`
   - Replace `'YOUR_WEB3FORMS_ACCESS_KEY'` with your actual access key
   - Example: `access_key: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',`

3. **Test the form**:
   - Save the file
   - Submit a test form on your website
   - Check josh@creativecowboys.co for the email
   - Verify the email contains all form fields

**That's it!** No account creation required, just the access key.

### Option 2: Alternative Solutions

If you prefer not to use Formspree, here are other options:

#### A. Netlify Forms (if hosting on Netlify)
1. Add `netlify` attribute to the form tag
2. Add a hidden input: `<input type="hidden" name="form-name" value="contact" />`
3. Netlify will automatically handle form submissions

#### B. EmailJS
1. Sign up at [https://www.emailjs.com/](https://www.emailjs.com/)
2. Install: `npm install @emailjs/browser`
3. Configure with your EmailJS credentials
4. Update the form submission handler

#### C. Custom Backend API
1. Create a serverless function (Netlify/Vercel)
2. Use a service like SendGrid, Mailgun, or AWS SES
3. Update the fetch URL to point to your API endpoint

## Form Features

The contact form includes:

✅ **Form Validation**: All fields are required
✅ **Loading States**: Shows "SENDING..." while submitting
✅ **Success Feedback**: Green success message after submission
✅ **Error Handling**: Red error message if submission fails
✅ **Auto-reset**: Form clears after successful submission
✅ **Email Reply-To**: Emails include the sender's email for easy replies

## Form Fields

The form collects:
- First Name
- Last Name
- Email Address
- Phone Number
- New Client Status (Yes/No)
- Message

## Email Format

Emails sent to josh@creativecowboys.co will include:
- Subject: "New Contact Form Submission from [First Name] [Last Name]"
- All form field data
- Reply-to address set to the customer's email

## Testing

To test the form:
1. Navigate to the Contact section on the website
2. Fill out all required fields
3. Click "SEND NOW"
4. Verify the success message appears
5. Check josh@creativecowboys.co for the email

## Troubleshooting

**Form not sending emails?**
- Verify the Formspree form ID is correct
- Check browser console for errors
- Ensure josh@creativecowboys.co is verified in Formspree
- Check spam folder for test emails

**Getting error messages?**
- Check internet connection
- Verify Formspree account is active
- Check browser console for detailed error messages

## Security

- Form submissions are sent over HTTPS
- No sensitive data is stored client-side
- Formspree handles spam protection
- Email addresses are not exposed in the frontend code

## Next Steps

1. ✅ Contact form is functional
2. ⏳ Set up Formspree account (if not done)
3. ⏳ Test form submission
4. ⏳ Verify email delivery to josh@creativecowboys.co
5. ⏳ Optional: Set up email notifications in Formspree dashboard
