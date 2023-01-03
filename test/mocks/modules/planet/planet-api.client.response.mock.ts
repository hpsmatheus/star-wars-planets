import GetPlanetApiResponse from 'src/typings/planet/planet-api.client.response.dto';
import Constants from 'test/constants';

export const getPlanetApiResponseMock: GetPlanetApiResponse = {
  count: Constants.anyNumber,
  results: [
    {
      name: Constants.anyPlanetName,
      diameter: Constants.anyPlanetDiameter,
      gravity: Constants.anyPlanetGravity,
      terrain: Constants.anyPlanetTerrain,
    },
  ],
};
