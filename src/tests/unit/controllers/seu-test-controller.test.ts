import * as sinon from 'sinon';
import chai from 'chai';
import { Request, Response } from 'express';
import CarModel from '../../../models/carModel';
import CarService from '../../../services/carService';
import CarController from '../../../controllers/carController';
import { carMock,
  carMockWithId,
  carMockUpdate,
  carMockWithIdUpdate } from '../../mocks/carMocks';

const { expect } = chai;

describe('Testa a camada Controller de Car', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);
  const carController = new CarController(carService);
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(async () => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  after(()=>{
    sinon.restore();
  })

  describe('Cria um carro', () => {
    beforeEach(() => {
      sinon.stub(carService, 'create').resolves(carMock);
    });

    it('Em caso de Sucesso', async () => {
      req.body = carMock;
      await carController.create(req, res);

      const statusStub = res.status as sinon.SinonStub;
      expect(statusStub.calledWith(201)).to.be.true;

      const jsonStub = res.json as sinon.SinonStub;
      expect(jsonStub.calledWith(carMock)).to.be.true;
    });
  });

  describe('Lê todos os carros', () => {
    beforeEach(() => {
      sinon.stub(carService, 'read').resolves([carMockWithId]);
    });

    it('Em caso de sucesso', async () => {
      await carController.read(req, res);

      const statusStub = res.status as sinon.SinonStub;
      expect(statusStub.calledWith(200)).to.be.true;

      const jsonStub = res.json as sinon.SinonStub;
      expect(jsonStub.calledWith([carMockWithId])).to.be.true;
    });
  });

  describe('Lê um carro pelo seu Id', () => {
    beforeEach(() => {
      sinon.stub(carService, 'readOne').resolves(carMockWithId);
    });

    it('Em caso de sucesso', async () => {
      req.params = { id: carMockWithId._id };
      await carController.readOne(req, res);

      const statusStub = res.status as sinon.SinonStub;
      expect(statusStub.calledWith(200)).to.be.true;

      const jsonStub = res.json as sinon.SinonStub;
      expect(jsonStub.calledWith(carMockWithId)).to.be.true;
    });
  });

  describe('Atualiza um carro através de seu Id', () => {
    beforeEach(() => {
      sinon.stub(carService, 'update').resolves(carMockWithIdUpdate);
    });

    it('Em caso de sucesso', async () => {
      req.params = { id: carMockWithIdUpdate._id };
      req.body = carMockUpdate;
      await carController.update(req, res);

      const statusStub = res.status as sinon.SinonStub;
      expect(statusStub.calledWith(200)).to.be.true;

      const jsonStub = res.json as sinon.SinonStub;
      expect(jsonStub.calledWith(carMockWithIdUpdate)).to.be.true;
    });
  });

  describe('Deleta um carro através de seu Id', () => {
    beforeEach(() => {
      sinon.stub(carService, 'delete').resolves(carMockWithId);
    });

    it('Em caso de sucesso', async () => {
      req.params = { id: carMockWithId._id };
      await carController.delete(req, res);

      const statusStub = res.status as sinon.SinonStub;
      expect(statusStub.calledWith(204)).to.be.true;

      const jsonStub = res.json as sinon.SinonStub;
      expect(jsonStub.calledWith(carMockWithId)).to.be.true;
    });
  });

});