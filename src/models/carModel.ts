import { model as mongooseCreateModel, Schema } from 'mongoose';
import { ICar } from '../interfaces/ICar';
import MongoModel from './MongoModel';

const carsMongoSchema = new Schema<ICar>({
  model: String,
  year: Number,
  color: String,
  buyValue: Number,
  doorsQty: Number,
  seatsQty: Number,
}, {
  versionKey: false,
});

class Car extends MongoModel<ICar> {
  constructor(model = mongooseCreateModel('Car', carsMongoSchema)) {
    super(model);
  }
}

export default Car;
