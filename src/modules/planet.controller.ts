import { Controller, Get, Query } from '@nestjs/common';
import { ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SwaggerResponse } from 'src/core/swagger-response';
import Pageable from 'src/typings/pageable.entity';
import ListPlanetParams from 'src/typings/planet/list-planet.params.dto';
import Planet from 'src/typings/planet/planet.entity';

import PlanetService from './planet.service';

class PageablePlanet extends Pageable<Planet> {
  @ApiProperty({ type: Planet })
  result: Planet[];
}

@Controller('planet')
@ApiTags('Planet')
export default class PlanetController {
  constructor(private readonly planetService: PlanetService) {}

  @Get()
  @ApiResponse(SwaggerResponse.Ok(PageablePlanet))
  @ApiResponse(SwaggerResponse.NotFound)
  @ApiResponse(SwaggerResponse.InternalError)
  public async list(
    @Query() params: ListPlanetParams,
  ): Promise<Pageable<Planet>> {
    return this.planetService.list(params.name, params.page);
  }
}
