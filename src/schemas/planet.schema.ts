import Planet from 'src/typings/planet/planet.entity';
import { EntitySchema } from 'typeorm';

const PlanetSchema = new EntitySchema<Planet>({
  name: 'Planet',
  target: Planet,
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    name: { type: String },
    diameter: { type: String },
    gravity: { type: String },
    terrain: { type: String },
    createdAt: {
      type: Date,
      createDate: true,
    },

    updatedAt: {
      type: Date,
      updateDate: true,
    },
  },
});

export default PlanetSchema;
