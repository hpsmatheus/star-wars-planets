import { IsOptional, IsString } from 'class-validator';
import PageableParams from '../pageable.params.dto';

export default class ListPlanetParams extends PageableParams {
  @IsString()
  @IsOptional()
  name?: string;
}
