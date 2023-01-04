import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mock } from 'jest-mock-extended';
import { EErrorCode } from 'src/core/error/error-code.enum';
import PlanetApiClient from 'src/modules/planet-api.client';
import PlanetModule from 'src/modules/planet.module';
import PlanetSchema from 'src/schemas/planet.schema';
import ListPlanetParams from 'src/typings/planet/list-planet.params.dto';
import Planet from 'src/typings/planet/planet.entity';
import supertest from 'supertest';
import Constants from 'test/constants';
import AppBuilder from 'test/mocks/core/app.builder';
import { createPlanetInputMock } from 'test/mocks/modules/planet/create-planet.input.mock';
import { planetMock } from 'test/mocks/modules/planet/planet.mock';
import { Repository } from 'typeorm';

describe('Planet Integration Test', () => {
  let app: INestApplication;
  const repository = mock<Repository<Planet>>();
  const apiClient = mock<PlanetApiClient>();
  process.env.API_KEY = 'apikey';

  beforeAll(async () => {
    const testingModule = await Test.createTestingModule({
      imports: [PlanetModule],
    })
      .overrideProvider(getRepositoryToken(PlanetSchema))
      .useValue(repository)
      .overrideProvider(PlanetApiClient)
      .useValue(apiClient)
      .compile();

    app = await AppBuilder.build(testingModule);
  });

  describe('List planets', () => {
    const params: ListPlanetParams = {
      page: 1,
      name: Constants.anyPlanetName,
    };
    it('should GET/ planets', async () => {
      repository.find.mockResolvedValueOnce([]);
      apiClient.list.mockResolvedValueOnce([createPlanetInputMock]);
      repository.find.mockResolvedValueOnce([planetMock]);

      const result = await supertest(app.getHttpServer())
        .get('/planet')
        .query(params);

      expect(result.status).toBe(HttpStatus.OK);
      expect(JSON.stringify(result.body)).toStrictEqual(
        JSON.stringify({
          result: [planetMock],
          page: 1,
        }),
      );
    });

    it('should return formatted error object when error happens', async () => {
      repository.find.mockImplementation(() => {
        throw new Error('generic error');
      });
      const result = await supertest(app.getHttpServer())
        .get('/planet')
        .query(params);

      expect(result.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
      expect(result.body.statusCode).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
      expect(result.body.errorCode).toBe(EErrorCode.INTERNAL_SERVER_ERROR);
      expect(result.body.message).toStrictEqual('generic error');
      expect(result.body.data).toBeDefined();
    });
  });

  describe('Delete planet', () => {
    it('should return 401 to unauthenticated requests', async () => {
      const result = await supertest(app.getHttpServer()).delete('/planet/1');
      expect(result.status).toBe(HttpStatus.UNAUTHORIZED);
      expect(result.body.statusCode).toBe(HttpStatus.UNAUTHORIZED);
      expect(result.body.errorCode).toBe(EErrorCode.UNAUTHENTICATED);
      expect(result.body.message).toStrictEqual('user is not authenticated');
      expect(result.body.data).toBeDefined();
    });
  });

  describe('Find planet by id', () => {
    it('should return 401 to unauthenticated requests', async () => {
      const result = await supertest(app.getHttpServer()).get('/planet/1');
      expect(result.status).toBe(HttpStatus.UNAUTHORIZED);
      expect(result.body.statusCode).toBe(HttpStatus.UNAUTHORIZED);
      expect(result.body.errorCode).toBe(EErrorCode.UNAUTHENTICATED);
      expect(result.body.message).toStrictEqual('user is not authenticated');
      expect(result.body.data).toBeDefined();
    });
  });
});
