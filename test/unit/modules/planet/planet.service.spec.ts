import { HttpStatus } from '@nestjs/common';
import { mock } from 'jest-mock-extended';
import ApiException from 'src/core/error/api-exception';
import { EErrorCode } from 'src/core/error/error-code.enum';
import PlanetApiClient from 'src/modules/planet/planet-api.client';
import PlanetService from 'src/modules/planet/planet.service';
import Planet from 'src/typings/planet/planet.entity';
import Constants from 'test/constants';
import { createPlanetInputMock } from 'test/mocks/modules/planet/create-planet.input.mock';
import { planetMock } from 'test/mocks/modules/planet/planet.mock';
import { Repository } from 'typeorm';

describe('Planet service', () => {
  const repository = mock<Repository<Planet>>();
  const apiClient = mock<PlanetApiClient>();
  const planetService = new PlanetService(repository, apiClient);
  describe('Find by id', () => {
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

  describe('Delete', () => {
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

  describe('List', () => {
    const maxRecordsPerPage = 5;
    it('list all from database', async () => {
      repository.find.mockResolvedValueOnce([planetMock]);
      const result = await planetService.list();
      expect(result).toStrictEqual({ page: 1, result: [planetMock] });
      expect(repository.find).toHaveBeenCalledWith({
        skip: 0,
        take: maxRecordsPerPage,
      });
    });

    it('list by name from database', async () => {
      repository.find.mockResolvedValueOnce([planetMock]);
      const result = await planetService.list(Constants.anyPlanetName, 1);
      expect(result).toStrictEqual({ page: 1, result: [planetMock] });
      expect(repository.find).toHaveBeenCalledWith({
        where: { name: Constants.anyPlanetName },
        skip: 0,
        take: maxRecordsPerPage,
      });
    });

    it('list by name from planets api', async () => {
      repository.find.mockResolvedValueOnce([]);
      apiClient.list.mockResolvedValueOnce([createPlanetInputMock]);
      repository.find.mockResolvedValueOnce([planetMock]);

      const result = await planetService.list(Constants.anyPlanetName, 1);
      expect(result).toStrictEqual({ page: 1, result: [planetMock] });
      expect(apiClient.list).toHaveBeenCalledWith(Constants.anyPlanetName);
      expect(repository.find).toHaveBeenCalledWith({
        where: { name: Constants.anyPlanetName },
        skip: 0,
        take: maxRecordsPerPage,
      });
    });
  });
});
