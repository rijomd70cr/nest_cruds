import {
  Controller,
  Post,
  Body,
  Logger,
  HttpStatus,
  Res,
  Inject,
  Get,
  Query,
  Request,
  ParseIntPipe,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import { PublishService } from './publish.service';
import { createPublishDTO } from './publish.dto';

import { JwtAuthGuard } from '../auth/jwt-verify/jwt-auth.guard';
import { Helper } from '../common/helpers/env.helper';

@Controller('publish')
export class PublishController {
  constructor(private readonly publishService: PublishService) {}
  private readonly logger = new Logger(PublishController.name);

  @Inject(ConfigService)
  public config: ConfigService;

  @Get('publishList')
  async getPublishList(
    @Query('limit', ParseIntPipe) limit: number,
    @Query('page', ParseIntPipe) page: number,
    @Res() response: any,
  ) {
    try {
      let query = {
        limit: limit,
        page: page,
      };
      let data = await this.publishService.getPublishList(query);
      return response.status(HttpStatus.CREATED).json({
        message: this.config.get('SUCCES_MESSAGE'),
        result: data,
        status: HttpStatus.CREATED,
      });
    } catch (error) {
      this.logger.error(error);
      return response.status(HttpStatus.BAD_REQUEST).json({ error });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('creatpublish')
  async createPublish(
    @Body() publishData: createPublishDTO,
    @Res() response: any,
    @Request() req,
  ) {
    try {
      if (req.user) {
        let data = await this.publishService.createPublish(
          publishData,
          req.user,
        );
        return response.status(HttpStatus.CREATED).json({
          message: this.config.get('SUCCES_MESSAGE'),
          result: data,
          status: HttpStatus.CREATED,
        });
      }
    } catch (error) {
      this.logger.error(error);
      return response.status(HttpStatus.BAD_REQUEST).json({ error });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('updatepublish')
  async updatePublishDoccuments(
    @Body() body: any,
    @Res() response: any,
    @Request() req,
  ) {
    try {
      if (req.user) {
        let data = await this.publishService.updatePublishDoccuments(body);
        return response.status(HttpStatus.CREATED).json({
          message: this.config.get('SUCCES_MESSAGE'),
          result: data,
          status: HttpStatus.CREATED,
        });
      }
    } catch (error) {
      this.logger.error(error);
      return response.status(HttpStatus.BAD_REQUEST).json({ error });
    }
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: Helper.destinationPath,
        filename: Helper.customFileName,
      }),
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Res() response: any,
  ) {
    try {
      let extension = file.mimetype.split('/', 1).pop();
      const data = {
        path: file.path,
        filename: file.filename,
        extension: extension,
      };
      return response.status(HttpStatus.CREATED).json({
        message: this.config.get('FILE_UPLOAD'),
        result: data,
        status: HttpStatus.CREATED,
      });
    } catch (error) {
      this.logger.error(error);
      return response.status(HttpStatus.BAD_REQUEST).json({ error });
    }
  }

  @Get()
  display(@Res() res, @Query('files') files: string) {
    res.sendFile(files, {
      root: './images',
    });
  }

  // @Get()
  // display(@Res() res, @Query('files') files: string) {
  //   res.sendFile(files, {
  //     root: './images',
  //   });
  // }
}
