# Digishield Application Form Update

## Overview
The organisation application form has been completely updated with comprehensive cybersecurity-focused questions and a resume/CV upload option.

## New Application Questions

### Personal Information
- Full Name
- Email Address  
- Phone Number
- Location (City, Country)
- Role Applied
- LinkedIn URL
- Portfolio/Website
- **NEW: Resume/CV File Upload**

### Professional Background
- **Education Level**: High School, Diploma/Certificate, Bachelor's Degree, Master's Degree or higher
- **Cybersecurity Certifications**: Yes/No with specification field
- **Work Experience**: Previous experience in cybersecurity, IT, or awareness programs

### Skills and Knowledge
- **Cybersecurity Knowledge Level**: Beginner, Intermediate, Advanced
- **Familiar Areas** (Multi-select):
  - Phishing and Social Engineering
  - Identity Theft Prevention
  - Network Security
  - Data Privacy and Protection
  - Cyberbullying Awareness
  - Online Fraud Detection
  - Other
- **Training Comfort**: Comfortable conducting training sessions for diverse audiences
- **Tools & Software**: Proficiency in relevant cybersecurity/IT tools

### Motivation and Fit
- **Why Join Digishield**: Motivation for working in cybersecurity awareness
- **Safety Example**: Situation where applicant helped with cybersecurity
- **Stay Updated**: How applicant keeps current with cybersecurity trends

### Availability and Logistics
- **Commitment**: Expected hours/week or duration
- **Travel Willingness**: Willing to travel or conduct in-person sessions
- **Internet Access**: Reliable internet and computer access for virtual training

### Additional Information
- **Additional Comments**: Any other relevant information

## Database Changes

### New Field Added
- `resume_url` VARCHAR(512) - URL to uploaded resume/CV file in Supabase Storage

### Updated Answers Structure
The `answers` JSONB field now contains structured responses to all the new questions instead of the previous generic fields.

## Files Updated

### Frontend
- `app/organisation/apply/page.tsx` - Complete form overhaul with new questions
- `app/admin/applications/page.tsx` - Admin dashboard updated to display new fields

### Backend
- `app/Api/organisation/apply/route.ts` - API route updated for new fields
- `pages/api/organisation/apply.ts` - Legacy API route updated

### Database
- `scripts/update-application-schema.sql` - SQL script to update database schema

## How to Apply Database Changes

1. **Setup Storage Bucket** - Run the storage setup script in your Supabase SQL editor:
   ```sql
   -- Copy and paste the contents of scripts/setup-file-storage.sql
   ```

2. **Add Resume URL Field** - Run the application schema update script:
   ```sql
   -- Copy and paste the contents of scripts/update-application-schema.sql
   ```

3. **Or manually add the column**:
   ```sql
   ALTER TABLE organisation_applications ADD COLUMN resume_url VARCHAR(512);
   ```

## Benefits of New Structure

1. **Comprehensive Assessment**: Better evaluation of cybersecurity knowledge and experience
2. **Structured Data**: Organized question categories for easier review
3. **File Upload System**: Direct file upload from user devices to Supabase Storage
4. **Better Filtering**: More specific criteria for candidate selection
5. **Professional Focus**: Cybersecurity-specific questions relevant to Digishield's mission

## File Upload Features

- **Supported Formats**: PDF, DOC, DOCX, TXT files
- **File Size Limit**: Maximum 5MB per file
- **Secure Storage**: Files stored in Supabase Storage with public read access
- **Unique Naming**: Files renamed with timestamp to prevent conflicts
- **Direct Download**: Admin can download files directly from the dashboard

## Admin Dashboard Features

- **Resume/CV Download**: Green "📄 Resume/CV" link with download capability for each application
- **Structured Answers**: Organized display of all application responses
- **Better Search**: Enhanced filtering capabilities
- **Professional Layout**: Clean, organized view of application details

## Testing

1. **Submit New Application**: Fill out the new form with all questions
2. **Admin Review**: Check admin dashboard for proper display of new fields
3. **Email Functions**: Verify all email buttons work with new application data
4. **Database**: Confirm new fields are properly stored and retrieved

## Notes

- Existing applications will show empty fields for new questions
- The form maintains backward compatibility
- All email templates include the new applicant information
- The admin interface gracefully handles missing data
