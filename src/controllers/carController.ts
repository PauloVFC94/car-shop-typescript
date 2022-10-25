import { Request, Response } from 'express';
import { IService } from '../interfaces/IService';
import { ICar } from '../interfaces/ICar';

export default class Car {
  constructor(private _service: IService<ICar>) { }

  public async create (
    req: Request,
    res: Response<ICar>,
  ) {
    const { model, year, color, buyValue, doorsQty, seatsQty } = req.body;
    const car = { model, year, color, buyValue, doorsQty, seatsQty };
    const result = await this._service.create(car);
    return res.status(201).json(result);
  }
}