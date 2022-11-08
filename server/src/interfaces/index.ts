import { Request, Response, NextFunction } from 'express';
import { Model, Optional } from 'sequelize';

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
// ----- Car interface -------------
interface CarAttributes {
  id: number;
  brand: string;
  model: string;
  price: number;
  year: number;
  mileage: number;
  quality: number;
  isGoodPrice: boolean;
  location: string;
  state: string;
  transmission: string;
  features: Array<string>;
  description: string;
  fuel: string;
  customerId?: number;
}
type CarCreationAttributes = Optional<CarAttributes, 'id'>;
export interface CarInstance
  extends Model<CarAttributes, CarCreationAttributes>,
  CarAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}
// ----- Admin interface -------------
interface AdminAttributes {
  id: number;
  username: string;
  password: string;
}
type AdminCreationAttributes = Optional<CarAttributes, 'id'>;
export interface AdminInstance
  extends Model<AdminAttributes, AdminCreationAttributes>,
  AdminAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}
// ----- Customer interface -------------
interface CustomerAttributes {
  id: number;
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;

}
type CustomerCreationAttributes = Optional<CustomerAttributes, 'id'>;
export interface CustomerInstance
  extends Model<CustomerAttributes, CustomerCreationAttributes>,
  CustomerAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}
// ----- Image interface -------------
interface ImageAttributes {
  id: number;
  image: string;
  carId?: number;
}
type ImageCreationAttributes = Optional<ImageAttributes, 'id'>;
export interface ImageInstance
  extends Model<ImageAttributes, ImageCreationAttributes>,
  ImageAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}
