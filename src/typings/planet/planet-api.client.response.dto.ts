export default class GetPlanetApiResponse {
  count: number;

  results: [
    {
      name: string;

      diameter: string;

      gravity: string;

      terrain: string;
    },
  ];
}
