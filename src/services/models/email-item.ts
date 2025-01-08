export interface EmailItem {
  messageId: string,
  date: string,
  from: string,
  subject: string,
  mimeVersion: string,
  contentType: string,
  contentTransferEncoder: string,
  body: string,
  xFrom: string,
  xCc: string[]
  xBcc: string[]
  xFolder: string,
  xOrigin: string,
  xFilename: string,
  to: string[],
  xTo: string[],
  cc: string[],
  bcc: string[],
}
