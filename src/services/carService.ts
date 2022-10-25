import { IService } from '../interfaces/IService';
import { ICar, CarSchema } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
// import { ErrorTypes } from '../errors/typeErrors';

class Car implements IService<ICar> {
  private _car:IModel<ICar>;
  constructor(model:IModel<ICar>) {
    this._car = model;
  }

  public async create(obj:unknown):Promise<ICar> {
    const parsed = CarSchema.safeParse(obj);

    if (!parsed.success) {
      throw parsed.error;
    }

    return this._car.create(parsed.data);
  }

  public async read():Promise<ICar[]> {
    const cars = await this._car.read();
    return cars;
  }
}

export default Car;