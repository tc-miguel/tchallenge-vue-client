import axios from "axios";
import axiosInstance from "../axiosInstance"
import type EmailRequest from "../models/email-request.ts";
import { EmailResponse } from '../models/email-response';


const urlBase = "http://localhost:8080";

export default class EmailService {

  getEmailData = (requestParamms: EmailRequest): Promise<EmailResponse> => {
    return axiosInstance.get(`${urlBase}/emails`, { params: requestParamms })
      .then(response => response.data)
      .catch(error => {
        return {
          total: 0,
          recordsCount: 0,
          data: []
        }
      });
  }
}


