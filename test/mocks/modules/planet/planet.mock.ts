import Planet from 'src/typings/planet/planet.entity';
import Constants from 'test/constants';

export const planetMock: Planet = {
  id: Constants.anyPlanetId,
  name: Constants.anyPlanetName,
  diameter: Number(Constants.anyPlanetDiameter),
  gravity: Constants.anyPlanetGravity,
  terrain: Constants.anyPlanetTerrain,
  createdAt: Constants.anyDate,
  updatedAt: Constants.anyDate,
};
