import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import PlanetModule from './modules/planet.module';
import ormconfig from './ormconfig';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), PlanetModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
