import { Body, Controller, Get, NotFoundException, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from '../common/accesstoken.guard';
import { UserService } from '../user/user.service';
import { ReportDownloadDto, ReportDto } from './dto/report.dto';
import { ReportService } from './report.service';

@ApiTags('Report')
@Controller('Report')
export class ReportController {
  constructor(private readonly reportService: ReportService,
    private readonly userService: UserService) {}

    @UseGuards(AccessTokenGuard)
    @Get('SendEmailUserReport')
    async SendEmailUserReport(@Body() reportData: ReportDto) {
  
        await this.userService.findOne(reportData.id).then(async (result)=>{
  
          if(!result){
            return new NotFoundException(`User ${reportData.id} not found or not the exist type`);
          }
  
          let datetime = new Date()
          let data = {
            title:"Relatório de Usuário",
            date: datetime.toISOString(),
            name: result?.name,
            email: result?.email,
            isActive: result?.isActive ? "User is Active" : "User is not Active",
            role:{
              name: result?.role?.name,
              description: result?.role?.description,
              rolelevel: result?.role?.rolelevel,
            }
          } 
  
          return await this.reportService.sendEmailReport(data,'template-user.hbs',reportData, "Report User", `report_user_${datetime.toISOString()}`);
      });
    }

    @UseGuards(AccessTokenGuard)
    @Get('DownloadUserReport')
    async DownloadlUserReport(@Body() reportData: ReportDownloadDto,  @Res() res: Response) {
  
        await this.userService.findOne(reportData.id).then(async (result)=>{
  
          if(!result){
            return new NotFoundException(`User ${reportData.id} not found or not the exist type`);
          }
  
          let datetime = new Date()
          let data = {
            title:"Relatório de Usuário",
            date: datetime.toISOString(),
            name: result?.name,
            email: result?.email,
            isActive: result?.isActive ? "User is Active" : "User is not Active",
            role:{
              name: result?.role?.name,
              description: result?.role?.description,
              rolelevel: result?.role?.rolelevel,
            }
          } 

          const optionsReport = {
            format: 'A4',
            displayHeaderFooter: false,
            landscape: false,
        };

          const buffer = await this.reportService.createReport(data,optionsReport,'template-user.hbs')
          .then((buffer: Buffer)=>{
            res.set({
              "Content-Type": "application/pdf",
              "Content-Disposition": "attachment; filename=exemplo.pdf",
              "Content-Length":buffer.length
            })
        
            res.end(buffer);
          });
      });
    }
}
