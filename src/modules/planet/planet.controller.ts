import {
  Controller,
  Delete,
  Get,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiProperty,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import AuthGuard from 'src/core/auth.guard';
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

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiSecurity('x-api-key')
  @ApiResponse(SwaggerResponse.Ok(Planet))
  @ApiResponse(SwaggerResponse.NotFound)
  @ApiResponse(SwaggerResponse.InternalError)
  @ApiResponse(SwaggerResponse.Unauthenticated)
  public async findById(@Param('id') id: number): Promise<Planet> {
    return this.planetService.findById(id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiSecurity('x-api-key')
  @ApiResponse(SwaggerResponse.Ok())
  @ApiResponse(SwaggerResponse.NotFound)
  @ApiResponse(SwaggerResponse.InternalError)
  @ApiResponse(SwaggerResponse.Unauthenticated)
  public async delete(@Param('id') id: number): Promise<void> {
    await this.planetService.delete(id);
  }
}
