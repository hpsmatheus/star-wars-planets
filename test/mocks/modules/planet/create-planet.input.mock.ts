import CreatePlanetInput from 'src/typings/planet/create-planet.input.dto';
import Constants from 'test/constants';

export const createPlanetInputMock: CreatePlanetInput = {
  name: Constants.anyPlanetName,
  diameter: Number(Constants.anyPlanetDiameter),
  gravity: Constants.anyPlanetGravity,
  terrain: Constants.anyPlanetTerrain,
};
