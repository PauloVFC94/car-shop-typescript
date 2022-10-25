import * as sinon from 'sinon';
import chai from 'chai';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/typeErrors';
import CarModel from '../../../models/carModel';
import CarService from '../../../services/carService';
import { carMock,
  carMockWithId,
  carMockUpdate,
  carMockWithIdUpdate } from '../../mocks/carMocks';

  const { expect } = chai;

describe('Camada Service de Car', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);

  before(async () => {
    sinon.stub(carModel, 'create').resolves(carMockWithId);
    sinon.stub(carModel, 'read').resolves([carMockWithId]);
    sinon.stub(carModel, 'readOne')
      .onCall(0).resolves(carMockWithId)
      .onCall(1).resolves(null);
  });

  after(()=>{
    sinon.restore();
  });

  describe('Cria um carro', () => {
    it('Em caso de Suceesso', async () => {
      const newCar = await carService.create(carMock);
      expect(newCar).to.be.deep.equal(carMockWithId);
    });

    it('Em caso de falha', async () => {
      let error;

      try {
        await carService.create({});
      } catch (err) {
        error = err;
      }

      expect(error).to.be.instanceOf(ZodError);
    });  
  });
  
  describe('ler todos os carros', () => {
    it('Em caso de Sucesso', async () => {
      const allCars = await carService.read();
      expect(allCars).to.be.deep.equal([carMockWithId]);
    });
  });

  describe('Lê um carro através de seu ID', () => {
    it('Em caso de sucesso', async () => {
      const car = await carService.readOne(carMockWithId._id);
      expect(car).to.be.deep.equal(carMockWithId);
    });

    it('Em caso de falha', async () => {
      let error;
      try {
        await carService.readOne(carMockWithId._id);
      } catch (err:any) {
        error = err;
      }
      expect(error?.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
    });  
  });

  describe('Atualiza um carro através do Id', () => {
    it('Em caso de sucesso', async () => {
      sinon.stub(carModel, 'update').resolves(carMockWithIdUpdate);
      const updatedCar = await carService.update(carMockWithIdUpdate._id, carMockUpdate);
      expect(updatedCar).to.be.deep.equal(carMockWithIdUpdate);

      sinon.restore();
    });

    it('Em caso de falha (Zod)', async () => {
      let error;

      try {
        await carService.update(carMockWithIdUpdate._id, { Objeto: 'Bugado' });
      } catch (err) {
        error = err;
      }
      expect(error).to.be.instanceOf(ZodError);
    });
    
    it('Em caso de Id não encontrado', async () => {
        sinon.stub(carModel, 'update').resolves(null);
        let error: any;
  
        try {
          await carService.update('any-id', carMock);
        } catch (err) {
          error = err;
        }
        expect(error?.message).to.be.equal(ErrorTypes.EntityNotFound);
        sinon.restore();
      });
  });

  describe('Deleta um carro através do ID', () => {
    it('Em caso de Sucesso', async () => {
      sinon.stub(carModel, 'delete').resolves(carMockWithId);
      const carDeleted = await carService.delete(carMockWithId._id);
      expect(carDeleted).to.be.deep.equal(carMockWithId);
      sinon.restore();
    });
    
    it('Em caso de Id não encontrado', async () => {
        sinon.stub(carModel, 'delete').resolves(null);
        let error: any;
  
        try {
          await carService.delete(carMockWithId._id);
        } catch (err) {
          error = err;
        }
        expect(error?.message).to.be.equal(ErrorTypes.EntityNotFound);
        sinon.restore();
      });
  });

});