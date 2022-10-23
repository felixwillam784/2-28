import * as yup from 'yup';

const updateCarSchema = yup.object().shape({

  brand: yup.string().notRequired().label('brand'),
  model: yup.string().notRequired().label('model'),
  price: yup.number().notRequired().label('price'),
  year: yup.number().notRequired().label('year'),
  mileage: yup.number().notRequired().label('mileage'),
  quality: yup.number().notRequired().label('quality'),
  isGoodPrice: yup.boolean().notRequired().label('isGoodPrice'),
  features: yup.array().of(yup.string()).notRequired().label('features'),
  transmission: yup.string().notRequired().label('transmission'),
  description: yup.string().notRequired().label('description'),
});

export default updateCarSchema;
