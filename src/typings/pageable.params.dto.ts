import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

export default class PageableParams {
  @IsOptional()
  @Transform(({ value }) => Number(value), { toClassOnly: true })
  page?: number;
}
