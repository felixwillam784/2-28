import { Request } from 'express';

import createError from 'http-errors';
import * as yup from 'yup';
import { sendEmail } from '../helpers';
import {
  addCarService,
  deleteCars,
  getCarInfo,
  getCarsDetailsQuery,
  getCars,
  updateCarService,
  findUserById,
  getCarByCustomerId,
  addImageService,
} from '../services';
import { addCarSchema, updateCarSchema } from '../validation';
import emailTemplate from '../helpers/emailTemplate';

const addCar = async (req: Request, res) => {
  const { body } = req;
  const { userId } = res.locals.user;
  const data = { ...body, customerId: userId };
  await addCarSchema.validate(body);
  const result = await addCarService(data);
  const userInfo: { email: string, fullName: string } = await findUserById({ id: userId });
  if (process.env.NODE_ENV !== 'test') {
    const emailTitle = 'Your Sell Request Sent Successfully!';
    const emailBody = `<p>We are happy to tell you that your sell car request has been received with the following details :</p>
  <ul  class="list">
     <li>Brand: ${result.brand}</li>
     <li>Model: ${result.model}</li>
     <li>Year: ${result.year}</li>
     <li>Mileage: ${result.mileage}</li>
     <li>location: ${result.location}</li>
     <li>price: $${result.price}</li>
  </ul>
 <p>Soonly our team will check your request, we will keep in touch with you, you can track your request state through email or using your profile..</p>
 <a href="https://car-trad.herokuapp.com/profile" class="button">Go To Profile!</a>`;

    const subject = 'Car trade team';
    const content = emailTemplate(emailTitle, userInfo.fullName, emailBody);
    await sendEmail(userInfo, subject, content);
  }
  return { msg: 'successfully', status: 201, data: result };
};
//-------------------------------------------------------
const schema = yup.object({
  id: yup.number().integer().required(),
});

const deleteCarsById = async (req: Request) => {
  const { id } = req.params;
  await schema.validate({ id });
  const carInfo = await getCarInfo(id);
  const result = await deleteCars(id);
  if (result === 0) {
    throw createError(400, 'car not found');
  }
  if (process.env.NODE_ENV !== 'test') {
    const userInfo: { email: string, fullName: string } = await findUserById(
      { id: carInfo[0].customerId },
    );
    const emailTitle = 'Your Sell Car Request Has Been Rejected';
    const emailBody = `<p>Unfortunately, Your sell car request with the following details:</p>.
    <ul  class="list">
      <li>Brand: ${carInfo[0].brand}</li>
      <li>Model: ${carInfo[0].model}</li>
      <li>Year: ${carInfo[0].year}</li>
      <li>Mileage: ${carInfo[0].mileage}</li>
      <li>location: ${carInfo[0].location}</li>
      <li>price: $${carInfo[0].price}</li>
    </ul>
     <p>has been rejected. Good luck.</p>`;

    const subject = 'Car trade team';
    const content = emailTemplate(emailTitle, userInfo.fullName, emailBody);
    await sendEmail(userInfo, subject, content);
  }
  return { status: 200, msg: 'done!', data: result };
};
//-------------------------------------------------------
const getCarsById = async (req: Request) => {
  const { id } = req.params;
  const schema2 = yup.object({
    id: yup.number().integer().required(),
  });
  await schema2.validate({ id });
  const result = await getCarInfo(id);
  return { status: 200, msg: 'done!', data: result };
};
//-------------------------------------------------------

const getCarsDetails = async (req: Request) => {
  const {
    state = '',
    page = 1,
  } = req.query;
  if (!state) {
    throw createError(400, 'not found');
  }
  const result = await getCarsDetailsQuery(state, page);
  if (result.rows.length === 0) {
    return { status: 200, msg: 'Not found', data: result };
  }
  return { status: 200, msg: 'done', data: result };
};
//-------------------------------------------------------

const getFilteredCars = async (req: Request) => {
  const {
    brand = '',
    model = '',
    year = '',
    maxPrice = '',
    fuel = '',
    mileage = '',
    goodPrice = '',
    state = '',
    page = 1,
  } = req.query;
  const result = await getCars({
    brand, model, year, maxPrice, fuel, mileage, goodPrice, state, page,
  });

  if (result.rows.length === 0) {
    return { status: 200, msg: 'Not found', data: result };
  }
  return { status: 200, msg: 'done!', data: result };
};

//-------------------------------------------------------

// eslint-disable-next-line consistent-return
const updateCars = async (req: Request) => {
  const { body } = req;
  const { id } = req.params;
  const car = await getCarInfo(id);
  if (!car.length) {
    throw createError(400, 'car not found to update');
  } else if (car[0].state === 'sold') {
    throw createError(400, 'This car sold');
  }
  await updateCarSchema.validate(body);
  const result = await updateCarService(body, id);
  if (process.env.NODE_ENV !== 'test') {
    let emailTitle; let emailBody;

    const userInfo: { email: string, fullName: string } = await findUserById(
      { id: result[1][0].customerId },
    );

    if (body.state === 'under-check') {
      emailTitle = 'Your Sell Request Has Been Accepted!';
      emailBody = `<p>We are happy to tell you that your sell car request has been accepted initially.</p>
    <p>Soonly our team will check your request, if it is accepted, a group of professionals will contact you to
        come to see the car and gather its specifications preparing to publish it on our market.</p>
    <p>you can track the state of your request through your email or your profile.</p>
    <a href="https://car-trad.herokuapp.com/profile" class="button">Go To Profile!</a>`;
    } else
    if (body.state === 'on-market') {
      emailTitle = 'Your Car Added To The Market !';
      emailBody = `<p>We are happy to tell you that your sell car request
       has been accepted and your car added to the market finally🌟.</p>
       <p>You can track the state of your request through your email or your profile.</p>
       <a href="https://car-trad.herokuapp.com/profile" class="button">Go To Profile!</a>`;
    }

    const subject = 'Car trade team';
    const content = emailTemplate(emailTitle, userInfo.fullName, emailBody);
    await sendEmail(userInfo, subject, content);
  }
  return { status: 200, msg: 'done!', data: result };
};

//-------------------------------------------------------

const buyCar = async (req, res) => {
  const { id } = req.body;
  const { userId } = res.locals.user;
  const carInfo = await getCarInfo(id);
  if (carInfo[0].state === 'on-market') {
    await updateCarService({ state: 'sold' }, id);
    if (process.env.NODE_ENV !== 'test') {
      const result: { email: string, fullName: string } = await findUserById({ id: userId });

      const subject = 'Car trade team';
      const emailTitle = 'Your Buy Request receive successfully!';
      const emailBody = `<br/>
    We appreciate your patronage and your decision to purchase a vehicle from our website.<br/>
    <br/>
    Thanks again, <b>Your reservation was accepted. To finish the sale, kindly visit our showroom. 
    </b><br/><br/>`;

      const content = emailTemplate(emailTitle, result.fullName, emailBody);
      await sendEmail(result, subject, content);
    }
    return { status: 200, msg: 'successfully' };
  }
  throw createError(400, 'car not available to sell');
};

//-------------------------------------------------------

const getUserCars = async (req, res) => {
  const { userId } = res.locals.user;
  const result = await getCarByCustomerId(userId);
  return {
    status: 200,
    msg: 'successfully',
    data: result,
  };
};

const addCarImagesController = async (request) => {
  const { images } = request.body;
  const { id } = request.params;
  await addImageService(images);
  const car = await getCarInfo(id);
  if (!car.length) {
    throw createError(400, 'car not found to update');
  } else if (car[0].state !== 'under-check' && car[0].state !== 'on-market') {
    throw createError(400, 'car not allowed to update');
  }

  const result = await updateCarService({ state: 'on-market' }, id);
  return { status: 201, msg: 'successfully', data: result };
};

export {
  getFilteredCars,
  getCarsById,
  updateCars,
  deleteCarsById,
  getCarsDetails,
  addCar,
  buyCar,
  getUserCars,
  addCarImagesController,
};
