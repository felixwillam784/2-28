import { Request, Response, NextFunction } from 'express';

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
