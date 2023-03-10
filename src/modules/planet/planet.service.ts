import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import ApiException from 'src/core/error/api-exception';
import Pageable from 'src/typings/pageable.entity';
import CreatePlanetInput from 'src/typings/planet/create-planet.input.dto';
import Planet from 'src/typings/planet/planet.entity';
import { Repository } from 'typeorm';
import PlanetApiClient from './planet-api.client';

const maxRecordsPerPage = 5;

@Injectable()
export default class PlanetService {
  constructor(
    @InjectRepository(Planet) private readonly repository: Repository<Planet>,
    private readonly planetApiClient: PlanetApiClient,
  ) {}

  public async list(name?: string, page?: number): Promise<Pageable<Planet>> {
    if (name) {
      const planetsFromDb = await this.findByName(name, page);
      if (planetsFromDb.result.length) return planetsFromDb;
      const planetsFromApi = await this.planetApiClient.list(name);
      await this.createMany(planetsFromApi);
      return this.findByName(name, page);
    } else {
      return this.findAll(page);
    }
  }

  private async findByName(
    name: string,
    page?: number,
  ): Promise<Pageable<Planet>> {
    page = page ?? 1;
    const result = await this.repository.find({
      where: { name },
      skip: (page - 1) * maxRecordsPerPage,
      take: maxRecordsPerPage,
    });

    if (!result.length && page > 1) {
      return this.findByName(name, 1);
    }

    return { result, page };
  }

  private async findAll(page?: number): Promise<Pageable<Planet>> {
    page = page ?? 1;
    const result = await this.repository.find({
      skip: (page - 1) * maxRecordsPerPage,
      take: maxRecordsPerPage,
    });
    return { result, page };
  }

  private async createMany(planets: CreatePlanetInput[]): Promise<void> {
    await Promise.all(planets.map((planet) => this.repository.save(planet)));
  }

  public async findById(id: number): Promise<Planet> {
    const result = await this.repository.findOneBy({ id });
    if (!result) throw ApiException.notFound('Planet not found');
    return result;
  }

  public async delete(id: number): Promise<void> {
    const result = await this.repository.delete({ id });
    if (result.affected === 0) throw ApiException.notFound('Planet not found');
  }
}
