export enum ErrorTypes {
  EntityNotFound = 'EntityNotFound',
  InvalidMongoId = 'InvalidMongoId',
}

type ErrorResponse = {
  message: string;
  httpStatus: number
};

export type ErrorCatalog = {
  [key in ErrorTypes]: ErrorResponse
};

export const errorCatalog: ErrorCatalog = {
  EntityNotFound: {
    message: 'Entity not found',
    httpStatus: 404,
  },
  InvalidMongoId: {
    message: 'Id must be a 24 characters hexadecimal',
    httpStatus: 400,
  },
};
