import { HttpStatus } from '@nestjs/common';
import axios from 'axios';
import ApiException from 'src/core/error/api-exception';
import { EErrorCode } from 'src/core/error/error-code.enum';
import PlanetApiClient from 'src/modules/planet/planet-api.client';
import Constants from 'test/constants';
import { createPlanetInputMock } from 'test/mocks/modules/planet/create-planet.input.mock';
import { getPlanetApiResponseMock } from 'test/mocks/modules/planet/planet-api.client.response.mock';

describe('Planet Api Client', () => {
  const apiClient = new PlanetApiClient();
  process.env.PLANET_API = 'api';
  it('should call external api to find given planet', async () => {
    jest
      .spyOn(axios, 'get')
      .mockResolvedValueOnce({ data: getPlanetApiResponseMock });

    const result = await apiClient.list(Constants.anyPlanetName);
    expect(result).toStrictEqual([createPlanetInputMock]);
    expect(axios.get).toHaveBeenCalledWith('api', {
      params: { search: Constants.anyPlanetName },
    });
  });

  it('should return 404 exception if planet is not found', async () => {
    jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: { count: 0 } });

    apiClient.list(Constants.anyPlanetName).catch((error) => {
      const expectedResult = (error as ApiException).getResponse();
      expect(expectedResult).toStrictEqual({
        errorCode: EErrorCode.NOT_FOUND,
        statusCode: HttpStatus.NOT_FOUND,
        message: `Planet not found`,
        data: {},
      });
    });
  });
});
