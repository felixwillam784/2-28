export interface Car {
  brand:string,
  createdAt:string,
  customerId:number,
  description:string,
  features:Array<string>,
  fuel:string,
  id:number
  images:Array<{ carId:number,
    createdAt:string, id:number, image:string, updatedAt:string }>,
  isGoodPrice:boolean,
  location:string,
  mileage:number,
  model:string,
  price:number,
  quality:number,
  state:string,
  transmission:string,
  updatedAt:string,
  year:number
}

export type CarsRow = Array<Car>;

export type CarsCount = number;

export interface CarsFilterProps {
  setCars:React.Dispatch<React.SetStateAction<CarsRow | []>>,
  setPagination : React.Dispatch<React.SetStateAction<number>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  currentPage: number,
  search: string
}

export interface CarsData {
  msg: string,
  data:{
    count: CarsCount,
    rows: CarsRow
  }
}

export interface Params {
  brand?: string,
  model?: string | null,
  mileage?:number | number[],
  year?: string | null,
  fuel?: string | null,
  maxPrice?: number,
  goodPrice?: number,
  page?: number
}
