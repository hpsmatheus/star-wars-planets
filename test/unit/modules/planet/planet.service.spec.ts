import { HttpStatus } from '@nestjs/common';
import { mock } from 'jest-mock-extended';
import ApiException from 'src/core/error/api-exception';
import { EErrorCode } from 'src/core/error/error-code.enum';
import PlanetApiClient from 'src/modules/planet-api.client';
import PlanetService from 'src/modules/planet.service';
import Planet from 'src/typings/planet/planet.entity';
import Constants from 'test/constants';
import { Repository } from 'typeorm';

describe('Planet service', () => {
  const repository = mock<Repository<Planet>>();
  const apiClient = mock<PlanetApiClient>();
  const planetService = new PlanetService(repository, apiClient);
  describe('find by id', () => {
    it('should throw 404 to not found planets', async () => {
      repository.findOneBy.mockResolvedValueOnce(null);

      planetService.findById(Constants.anyNumber).catch((error) => {
        const expectedResult = (error as ApiException).getResponse();

        expect(expectedResult).toStrictEqual({
          errorCode: EErrorCode.NOT_FOUND,
          statusCode: HttpStatus.NOT_FOUND,
          message: `Planet not found`,
          data: {},
        });

        expect(repository.findOneBy).toHaveBeenCalledWith({
          id: Constants.anyNumber,
        });
      });
    });
  });

  describe('delete', () => {
    it('should throw 404 to not found planets', async () => {
      repository.delete.mockResolvedValueOnce({ affected: 0, raw: {} });

      planetService.delete(Constants.anyNumber).catch((error) => {
        const expectedResult = (error as ApiException).getResponse();

        expect(expectedResult).toStrictEqual({
          errorCode: EErrorCode.NOT_FOUND,
          statusCode: HttpStatus.NOT_FOUND,
          message: `Planet not found`,
          data: {},
        });

        expect(repository.delete).toHaveBeenCalledWith({
          id: Constants.anyNumber,
        });
      });
    });
  });
});
