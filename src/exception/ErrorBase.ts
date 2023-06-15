export enum StatusCodes {
  OK = 200,
  Created = 201,
  BadRequest = 400,
  Unauthorized = 401,
  NotFound = 404,
  InternalServerError = 500,
  Not_Implemented = 501,
}

export class ErroBase extends Error {
  constructor(
    public statusCode: StatusCodes,
    public message: string,
    public object?: Object
  ) {
    super(message);
  }
}
