import { IsNotEmpty } from 'class-validator';
import { type } from 'os';

export class createPublishDTO {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  register_no: string;
}

export type listPublishDTO = {
  page: number;
  limit: number;
};
