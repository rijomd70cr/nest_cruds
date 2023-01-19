import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';

import { createPublishDTO, listPublishDTO } from './publish.dto';
import { PublishDocument } from '../schema/publishSchema';

@Injectable()
export class PublishService {
  constructor(
    @InjectModel('Publish') private publishModal: Model<PublishDocument>,
  ) {}
  private readonly logger = new Logger(PublishService.name);

  async findList(query: any) {
    const publishLists = await this.publishModal
      .find({
        sort: {
          _id: 1,
        },
        skip: (query.page - 1) * query.limit,
        limit: Number(query.limit),
      })
      .populate('created_by');
    const listData = {
      table: publishLists,
      total: query.count,
      // pageNo: query.count_page,
    };
    return listData;
  }

  async createPublish(
    publishData: createPublishDTO,
    loginedUser: any,
  ): Promise<any> {
    try {
      let query: any = {
        ...publishData,
        created_by: loginedUser._id,
      };
      const publish = new this.publishModal(query);
      await publish.save();
      const count = await this.publishModal.countDocuments({});
      const limit = 10;
      const count_page = (count / limit).toFixed();
      let newquery = {
        page: 0,
        limit: 10,
        count_page: count_page,
        count: count,
      };
      return await this.findList(newquery);
    } catch (error) {
      this.logger.error(error);
      throw new Error(error);
    }
  }
  async getPublishList(query: listPublishDTO): Promise<any> {
    try {
      const count = await this.publishModal.countDocuments({});
      const count_page = (count / query.limit).toFixed();
      let newquery = {
        page: query.page,
        limit: query.limit,
        count_page: count_page,
        count: count,
      };
      return await this.findList(newquery);
    } catch (error) {
      this.logger.error(error);
      throw new Error(error);
    }
  }
  async updatePublish(query: any): Promise<any> {
    try {
      let data = await this.publishModal.findByIdAndUpdate(query?._id, query);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updatePublishDoccuments(query: any): Promise<any> {
    try {
      let data = await this.publishModal.findById(query?.id);
      this.logger.log(data);
      delete query.id;
      query.dId = 'id' + new Date().getTime();

      let doccumentArray: {
        dId: String;
        doccumenttitle: string;
        file: string;
        description: string;
      }[] = [];

      if (data.doccuments?.length > 0) {
        data.doccuments.push(query);
        data.doccuments = data.doccuments;
      } else {
        doccumentArray.push(query);
        data.doccuments = doccumentArray;
      }

      let updataedData = await this.updatePublish(data);
      let newquery = { page: 1, limit: 19 };
      if (updataedData) {
        return await this.getPublishList(newquery);
      }
      this.logger.log(doccumentArray);
    } catch (error) {
      this.logger.error(error);
      throw new Error(error);
    }
  }
}
