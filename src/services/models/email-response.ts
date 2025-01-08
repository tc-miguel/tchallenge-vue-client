import { EmailItem } from './email-item';
export interface EmailResponse {
  total: number
  recordsCount: number
  data: EmailItem[]
}
