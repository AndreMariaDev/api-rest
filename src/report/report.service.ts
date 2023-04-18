import { Injectable } from '@nestjs/common';
import { MailerService, ISendMailOptions } from '@nestjs-modules/mailer';
import { ReportDto } from './dto/report.dto';
import { createPdf } from '@saemhco/nestjs-html-pdf';
import * as path from 'path';
const fs = require('fs');
require('dotenv-flow').config();

@Injectable()
export class ReportService {
    constructor(
        private readonly mailerService: MailerService
    ) {}


    createReport(data, options, pathHtml) {

        let filePath = path.join(process.cwd(), 'src/template', pathHtml);
        if (!fs.existsSync(filePath)) {
            filePath = path.join(__dirname, 'template', pathHtml);
        }
        
        return createPdf(filePath, options, data);
    }

    async sendEmailReport(data,pathHtml:string, reportData: ReportDto, subjectEmail:string, reportName:string){
        const optionsReport = {
            format: 'A4',
            displayHeaderFooter: false,
            landscape: false,
        };
        const buffer = await this.createReport(data,optionsReport,pathHtml);
        const options : ISendMailOptions = {
            to: reportData.email, 
            from: process.env.EMAIL_HOST, 
            subject: subjectEmail, 
            attachments: [
                {  
                    filename: `${reportName}.pdf`,
                    content: buffer,
                    encoding: 'UTF-8'
                },
            ]
          }
        return await this.mailerService
        .sendMail(options)
        .then((result) => {
            console.log(result); 
            return result;
        })
        .catch((error) => {
            console.log(error);
        });
    }
}
