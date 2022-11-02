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
  updateCarServes,
  findUserById,
  getCarByCustomerId,
} from '../services';
import { addCarSchema, updateCarSchema } from '../validation';

const addCar = async (req: Request, res) => {
  const { body } = req;
  const { userId } = res.locals.user;
  const data = { ...body, customerId: userId };
  await addCarSchema.validate(body);
  const result = await addCarService(data);
  const userInfo:{ email: string, fullName: string } = await findUserById({ id: userId });
  const subject = 'Car trade team: Sell car request';
  const content = `<!DOCTYPE html>
  <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">

  <head>
    <title></title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
    <!--[if !mso]><!-->
    <link href="https://fonts.googleapis.com/css?family=Roboto+Slab" rel="stylesheet" type="text/css">
    <!--<![endif]-->
    <style>
      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        padding: 0;
      }

      a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: inherit !important;
      }

      #MessageViewBody a {
        color: inherit;
        text-decoration: none;
      }

      p {
        line-height: inherit
      }

      .desktop_hide,
      .desktop_hide table {
        mso-hide: all;
        display: none;
        max-height: 0px;
        overflow: hidden;
      }

      @media (max-width:520px) {
        .row-content {
          width: 100% !important;
        }

        .mobile_hide {
          display: none;
        }

        .stack .column {
          width: 100%;
          display: block;
        }

        .mobile_hide {
          min-height: 0;
          max-height: 0;
          max-width: 0;
          overflow: hidden;
          font-size: 0px;
        }

        .desktop_hide,
        .desktop_hide table {
          display: table !important;
          max-height: none !important;
        }
      }
    </style>
  </head>

  <body style="background-color: #FFFFFF; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
    <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF;">
      <tbody>
        <tr>
          <td>
            <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
              <tbody>
                <tr>
                  <td>
                    <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 500px;" width="500">
                      <tbody>
                        <tr>
                          <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                            <table class="heading_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td class="pad" style="padding-top:15px;text-align:center;width:100%;">
                                  <h1 style="margin: 0; color: #525760; direction: ltr; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; font-size: 27px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: left; margin-top: 0; margin-bottom: 0;"><span style="color: #000000;"><strong>Your Sell Request Sent Successfully!</strong></span></h1>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
              <tbody>
                <tr>
                  <td>
                    <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 500px;" width="500">
                      <tbody>
                        <tr>
                          <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                            <table class="divider_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td class="pad">
                                  <div class="alignment" align="center">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="80%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                      <tr>
                                        <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 2px solid #5666EA;"><span>&#8202;</span></td>
                                      </tr>
                                    </table>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table class="paragraph_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                              <tr>
                                <td class="pad" style="padding-top:15px;">
                                  <div style="color:#2f3643;direction:ltr;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:150%;text-align:left;mso-line-height-alt:24px;">
                                    <p style="margin: 0; margin-bottom: 13px;"><strong>Dear ${userInfo.fullName},</strong></p>
                                    <p style="margin: 0;">we are happy to tell you that your sell car request has been received with the following details :</p>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table class="list_block block-3" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                              <tr>
                                <td class="pad" style="padding-bottom:10px;padding-top:10px;">
                                  <ul start="1" style="margin: 0; padding: 0; margin-left: 20px; list-style-type: revert; color: #2f3643; direction: ltr; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 16px; font-weight: 400; letter-spacing: 1px; line-height: 180%; text-align: left;">
                                    <li style="margin-bottom: 0px;">Brand: ${result.brand}</li>
                                    <li style="margin-bottom: 0px;">Model: ${result.model}</li>
                                    <li style="margin-bottom: 0px;">Year: ${result.year}</li>
                                    <li style="margin-bottom: 0px;">Mileage: ${result.mileage}</li>
                                    <li style="margin-bottom: 0px;">location: ${result.location}</li>
                                    <li >price: $${result.price}</li>
                                  </ul>
                                </td>
                              </tr>
                            </table>
                            <table class="paragraph_block block-4" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                              <tr>
                                <td class="pad" style="padding-top:15px;">
                                  <div style="color:#2f3643;direction:ltr;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:150%;text-align:left;mso-line-height-alt:24px;">
                                    <p style="margin: 0; margin-bottom: 13px;">Soonly our team will check your request, we will keep in touch with you, you can track your request state through email or using your profile.</p>
                                    <p style="margin: 0;">&nbsp;</p>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table class="button_block block-5" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td class="pad" style="text-align:center;">
                                  <div class="alignment" align="center">
                                    <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" style="height:42px;width:133px;v-text-anchor:middle;" arcsize="10%" stroke="false" fillcolor="#5666ea"><w:anchorlock/><v:textbox inset="0px,0px,0px,0px"><center style="color:#ffffff; font-family:Arial, sans-serif; font-size:16px"><![endif]-->
                                    <div style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#5666ea;border-radius:4px;width:auto;border-top:0px solid transparent;font-weight:400;border-right:0px solid transparent;border-bottom:0px solid transparent;border-left:0px solid transparent;padding-top:5px;padding-bottom:5px;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;text-align:center;mso-border-alt:none;word-break:keep-all;"><span style="padding-left:20px;padding-right:20px;font-size:16px;display:inline-block;letter-spacing:normal;"><span style="word-break: break-word; line-height: 32px;" dir="ltr">Go to Profile!</span></span></div>
                                    <!--[if mso]></center></v:textbox></v:roundrect><![endif]-->
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table><!-- End -->
  </body>

  </html>`;

  await sendEmail(userInfo, subject, content);
  return { msg: 'successfully', status: 201, data: result };
};
//-------------------------------------------------------
const schema = yup.object({
  id: yup.number().integer().required(),
});
const deleteCarsById = async (req:Request) => {
  const { id } = req.params;
  await schema.validate({ id });
  const result = await deleteCars(id);
  if (result === 0) {
    throw createError(400, 'car not found');
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

const updateCars = async (req: Request) => {
  const { body } = req;
  const { id } = req.params;
  await updateCarSchema.validate(body);
  const result = await updateCarServes(body, id);
  if (body.state === 'under-check') {
    const userInfo:{ email: string, fullName: string } = await findUserById(
      { id: result[1][0].customerId },
    );
    const subject = 'Car trade team';
    const content = `<!DOCTYPE html>
    <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
    
    <head>
      <title></title>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
      <!--[if !mso]><!-->
      <link href="https://fonts.googleapis.com/css?family=Roboto+Slab" rel="stylesheet" type="text/css">
      <!--<![endif]-->
      <style>
        * {
          box-sizing: border-box;
        }
    
        body {
          margin: 0;
          padding: 0;
        }
    
        a[x-apple-data-detectors] {
          color: inherit !important;
          text-decoration: inherit !important;
        }
    
        #MessageViewBody a {
          color: inherit;
          text-decoration: none;
        }
    
        p {
          line-height: inherit
        }
    
        .desktop_hide,
        .desktop_hide table {
          mso-hide: all;
          display: none;
          max-height: 0px;
          overflow: hidden;
        }
    
        @media (max-width:520px) {
          .row-content {
            width: 100% !important;
          }
    
          .mobile_hide {
            display: none;
          }
    
          .stack .column {
            width: 100%;
            display: block;
          }
    
          .mobile_hide {
            min-height: 0;
            max-height: 0;
            max-width: 0;
            overflow: hidden;
            font-size: 0px;
          }
    
          .desktop_hide,
          .desktop_hide table {
            display: table !important;
            max-height: none !important;
          }
        }
      </style>
    </head>
    
    <body style="background-color: #FFFFFF; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
      <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF;">
        <tbody>
          <tr>
            <td>
              <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                <tbody>
                  <tr>
                    <td>
                      <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 500px;" width="500">
                        <tbody>
                          <tr>
                            <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                              <table class="heading_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                <tr>
                                  <td class="pad" style="padding-top:15px;text-align:center;width:100%;">
                                    <h1 style="margin: 0; color: #525760; direction: ltr; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; font-size: 27px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: left; margin-top: 0; margin-bottom: 0;"><span style="color: #000000;"><strong>Your Sell Request Has Been Accepted!</strong></span></h1>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                <tbody>
                  <tr>
                    <td>
                      <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 500px;" width="500">
                        <tbody>
                          <tr>
                            <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                              <table class="divider_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                <tr>
                                  <td class="pad">
                                    <div class="alignment" align="center">
                                      <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="80%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                        <tr>
                                          <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 2px solid #5666EA;"><span>&#8202;</span></td>
                                        </tr>
                                      </table>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                              <table class="paragraph_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                <tr>
                                  <td class="pad" style="padding-top:15px;">
                                    <div style="color:#2f3643;direction:ltr;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:150%;text-align:left;mso-line-height-alt:24px;">
                                      <p style="margin: 0; margin-bottom: 13px;"><strong>Dear ${userInfo.fullName},</strong></p>
                                      <p style="margin: 0;">We are happy to tell you that your sell car request has been accepted initially.</p>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                              <table class="paragraph_block block-3" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                <tr>
                                  <td class="pad" style="padding-top:15px;">
                                    <div style="color:#2f3643;direction:ltr;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:150%;text-align:left;mso-line-height-alt:24px;">
                                      <p style="margin: 0; margin-bottom: 13px;">Soonly our team will check your request, if it is accepted, a group of professionals will contact you to come to see the car and gather its specifications preparing to publish it on our market.</p>
                                      <p style="margin: 0; margin-bottom: 13px;">you can track the state of your request through your email or your profile.</p>
                                      <p style="margin: 0;">&nbsp;</p>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                              <table class="button_block block-4" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                <tr>
                                  <td class="pad" style="text-align:center;">
                                    <div class="alignment" align="center">
                                      <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" style="height:42px;width:133px;v-text-anchor:middle;" arcsize="10%" stroke="false" fillcolor="#5666ea"><w:anchorlock/><v:textbox inset="0px,0px,0px,0px"><center style="color:#ffffff; font-family:Arial, sans-serif; font-size:16px"><![endif]-->
                                      <div style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#5666ea;border-radius:4px;width:auto;border-top:0px solid transparent;font-weight:400;border-right:0px solid transparent;border-bottom:0px solid transparent;border-left:0px solid transparent;padding-top:5px;padding-bottom:5px;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;text-align:center;mso-border-alt:none;word-break:keep-all;"><span style="padding-left:20px;padding-right:20px;font-size:16px;display:inline-block;letter-spacing:normal;"><span style="word-break: break-word; line-height: 32px;" dir="ltr">Go to Profile!</span></span></div>
                                      <!--[if mso]></center></v:textbox></v:roundrect><![endif]-->
                                    </div>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table><!-- End -->
    </body>
    
    </html>`;
    await sendEmail(userInfo, subject, content);
  }
  return { status: 200, msg: 'done!', data: result };
};

//-------------------------------------------------------

const buyCar = async (req, res) => {
  const { state, id } = req.body;
  const { userId } = res.locals.user;
  const carInfo = await getCarInfo(id);
  if (carInfo[0].state === 'on-market') {
    await updateCarServes({ state }, id);
    const result:{ email: string, fullName: string } = await findUserById({ id: userId });

    const subject = 'car trede team';
    const content = `<div>
    <main>
        <p> Dear ${result.fullName},<br/>
        <br/>
        We appreciate your patronage and your decision to purchase a vehicle from our website.<br/>
        <br/>
        Thanks again, <b>Your reservation was accepted. To finish the sale, kindly visit our showroom. 
        </b><br/>     <br/>
        Contact information:<br/>
              mobile: 0599504801;<br/>
              email: cartredee@gmail;
          </p>
    </main>
            <img src='' alt='compony logo'/>
        </div>`;

    await sendEmail(result, subject, content);
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

export {
  getFilteredCars,
  getCarsById,
  updateCars,
  deleteCarsById,
  getCarsDetails,
  addCar,
  buyCar,
  getUserCars,
};
