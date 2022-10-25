import { ICar } from '../../interfaces/ICar';

const carMock:ICar = {
  model: 'Relampago Marquinhos',
  year: 2006,
  color: 'red',
  buyValue: 20000,
  doorsQty: 2,
  seatsQty: 2,
}

const carMockWithId:ICar & {_id:string} = {
  model: 'Relampago Marquinhos',
  year: 2006,
  color: 'red',
  buyValue: 20000,
  doorsQty: 2,
  seatsQty: 2,
  _id: '62cf1fc6498565d94eba52cd',
}

const carMockUpdate:ICar = {
  model: 'Relampago McQueen',
  year: 2006,
  color: 'red',
  buyValue: 20000,
  doorsQty: 2,
  seatsQty: 2,
}

const carMockWithIdUpdate:ICar & {_id:string} = {
  model: 'Relampago McQueen',
  year: 2006,
  color: 'red',
  buyValue: 20000,
  doorsQty: 2,
  seatsQty: 2,
  _id: '62cf1fc6498565d94eba52cd',
}

export { carMock, carMockUpdate, carMockWithId, carMockWithIdUpdate };
