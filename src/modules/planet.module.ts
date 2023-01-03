import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import PlanetSchema from 'src/schemas/planet.schema';
import PlanetApiClient from './planet-api.client';
import PlanetController from './planet.controller';
import PlanetService from './planet.service';

@Module({
  imports: [TypeOrmModule.forFeature([PlanetSchema])],
  controllers: [PlanetController],
  providers: [PlanetService, PlanetApiClient],
})
export default class PlanetModule {}
