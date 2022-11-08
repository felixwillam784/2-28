export interface Car {
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
}
export interface CarWithImages extends Car {
  images:Array<{ carId:number,
    createdAt:string, id:number, image:string, updatedAt:string }>,
}
export interface SliderImages {
  carImages:Array<{ carId:number,
    createdAt:string, id:number, image:string, updatedAt:string }>,
}

export interface CarWithCustomerInfo extends Car {
  customer:{
    fullName: string,
    email: string,
    phoneNumber: string,
  }
}

export type CarsWithImagesRow = Array<CarWithImages>;
export type CarsWithCustomerRow = Array<CarWithCustomerInfo>;

export type CarsCount = number;

export interface CarsFilterProps {
  setCars:React.Dispatch<React.SetStateAction<CarsWithImagesRow | []>>,
  setPagination : React.Dispatch<React.SetStateAction<number>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  currentPage: number,
  search: string,
  setCurrentPAge: React.Dispatch<React.SetStateAction<number>>
}

export interface CarsWithImagesData {
  msg: string,
  data:{
    count: CarsCount,
    rows: CarsWithImagesRow
  }
}
export interface CarsWithCustomerData {
  msg: string,
  data:{
    count: CarsCount,
    rows: CarsWithCustomerRow
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
  page?: number,
  state: string,
}

export interface RowProps {
  car:CarWithCustomerInfo, state:string,
  setCarsData:React.Dispatch<React.SetStateAction<CarsWithCustomerRow>>,
}
export interface UserContextType {
  id: number,
  email: string,
  username: string,
  role: string
}

export interface UserContextTypeWithDispatch {
  userInfo: UserContextType | null,
  setUserInfo:(c: UserContextType | null) => void,
}
export interface SnackBarContextType {
  open:boolean,
  message:string,
  type:'success' | 'error'
}

export interface SnackBarContextTypeWithDispatch {
  snackBarProperties: SnackBarContextType,
  setSnackBarProperties:React.Dispatch<React.SetStateAction<SnackBarContextType>>
}
export interface PrivateType {
  children:JSX.Element,
  roles:string,
}
export interface LoginProtected {
  children:JSX.Element,
}
export interface EditCarFormProps {
  modalType: 'addRequest' | 'checkRequest',
  id: string | undefined,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik : any,
  children: JSX.Element | undefined
}

export interface UserSellRequest {
  createdAt:string,
  id:number,
  model:string,
  state:string,
}

export interface UserSellRequestsResponse {
  msg: string,
  data:UserSellRequest[]
}
