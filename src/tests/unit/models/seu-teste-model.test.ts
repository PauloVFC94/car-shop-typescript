import * as sinon from 'sinon';
import chai from 'chai';
import Car from '../../../models/carModel';
import { Model } from 'mongoose';
import { carMock,
  carMockWithId,
  carMockUpdate,
  carMockWithIdUpdate } from '../../mocks/carMocks';
// import { ErrorTypes } from '../../../errors/typeErrors';

const { expect } = chai;

describe('Camada Model de Car', () => {
  const carModel = new Car();

  before(async () => {
    sinon.stub(Model, 'create').resolves(carMockWithId);
    sinon.stub(Model, 'find').resolves([carMockWithId]);
    sinon.stub(Model, 'findOne').resolves(carMockWithId);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(carMockWithIdUpdate);
    sinon.stub(Model, 'findByIdAndDelete').resolves(carMockWithIdUpdate);
  });

  after(()=>{
    sinon.restore();
  })

  it('Criar um novo carro', async () => {
    const car = await carModel.create(carMock);
    expect(car).to.be.deep.equal(carMockWithId);
  });

  it('Verifica todos os carros', async () => {
    const allCars = await carModel.read();
    expect(allCars).to.be.deep.equal([carMockWithId]);
  });

  it('Verifica um carro através de ID', async () => {
    const car = await carModel.readOne(carMockWithId._id);
    expect(car).to.be.deep.equal(carMockWithId);
  });

  it('Modifica um carro através do ID',async () => {
    const car = await carModel.update(carMockWithIdUpdate._id, carMockUpdate);
    expect(car).to.be.deep.equal(carMockWithIdUpdate);
  });

  it('Deleta um carro através do ID', async () => {
    const car = await carModel.delete(carMockWithIdUpdate._id);
    expect(car).to.be.deep.equal(carMockWithIdUpdate);
  });

});