import { Injectable } from '@nestjs/common';
import axios from 'axios';
import ApiException from 'src/core/error/api-exception';
import CreatePlanetInput from 'src/typings/planet/create-planet.input.dto';
import GetPlanetApiResponse from 'src/typings/planet/planet-api.client.response.dto';

@Injectable()
export default class PlanetApiClient {
  private get url(): string {
    return 'https://swapi.dev/api/planets';
  }

  public async list(name: string): Promise<CreatePlanetInput[]> {
    const result = (await axios.get(this.url, {
      params: { search: name },
    })) as { data: GetPlanetApiResponse };

    if (result.data.count === 0)
      throw ApiException.notFound('Planet not found');

    return this.buildListResponse(result.data);
  }

  private buildListResponse(
    apiResponse: GetPlanetApiResponse,
  ): CreatePlanetInput[] {
    return apiResponse.results.map((planet) => {
      return {
        diameter: Number(planet.diameter),
        name: planet.name,
        gravity: planet.gravity,
        terrain: planet.terrain,
      };
    });
  }
}
