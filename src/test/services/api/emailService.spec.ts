import { describe, it, expect } from 'vitest'
import EmailRequest from '../../../services/models/email-request';
import EmailService from '../../../services/api/emailService';



describe('Call Server endpoint for email data retriever', () => {
  it('renders properly', async () => {
    let e = new EmailService();
    let requestInfo: EmailRequest = {
      page: 0,
      size: 20,
      q: 'structure'
    }
    let response = await e.getEmailData(requestInfo);
    expect(response).not.null;
    expect(response.data).not.null;
    expect(response.total).lte(0);
    expect(response.recordsCount).lte(0);
    for (let emailData of response.data) {
      expect(emailData).not.null;
      expect(emailData.subject).not.null;
      expect(emailData.from).not.null;
      expect(emailData.to).not.null;
    }
  })
})
