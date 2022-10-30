import { Request, Response, NextFunction } from 'express';

export type CarType = {
  brand:string,
  createdAt:string,
  customerId:number,
  description:string,
  features:Array<string>,
  fuel:string,
  id:number,
  isGoodPrice:boolean,
  location:string,
  mileage:number,
  model:string,
  price:number,
  quality:number,
  state:string,
  transmission:string,
  updatedAt:string,
  year:number,
  images:Array<{ carId:number,
    createdAt:string, id:number, image:string, updatedAt:string }>,
};

export type ControllersReturn = {
  status: number,
  data?: any,
  msg?: string,
  token?: unknown,
};

export interface AuthResponse extends Response {
  locals:{ user?: { role:string, userId: number } }
}
export type Controllers = (req: Request, res:
AuthResponse, next: NextFunction) => Promise<ControllersReturn>;
