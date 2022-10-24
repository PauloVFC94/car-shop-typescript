import { z } from 'zod';
import { VehicleSchema } from './IVehicle';

const CarSchema = z.intersection(VehicleSchema, z.object({
  doorsQty: z.number().int().gte(2).lte(4),
  seatsQty: z.number().int().gte(2).lte(7),
}));

type ICar = z.infer<typeof CarSchema>;

export { ICar, CarSchema }; 
