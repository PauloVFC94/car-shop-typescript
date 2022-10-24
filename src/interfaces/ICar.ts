import { IVehicle } from './IVehicle';
import { z } from 'zod';

const CarSchema = z.object({
  doorsQty: z.number().int().gte(2).lte(4),
  seatsQty: z.number().int().gte(2).lte(7),
});

type ICarZ = z.infer<typeof CarSchema>;

export interface ICar extends IVehicle, ICarZ {}
