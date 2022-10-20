/* eslint-disable no-nested-ternary */
import { Pagination, TextField } from '@mui/material';
import { useState } from 'react';
import CarCard from '../../components/CarCard';
import CarsFilter from '../../components/CarsFilter';
import CustomSkeleton from '../../helpers/skeleton';
import { CarsCount, CarsRow } from '../../interfaces';
import './style.css';

function Search() {
  const [cars, setCars] = useState<CarsRow | []>([]);
  const [pagination, setPagination] = useState <CarsCount>(1);
  const [pageNumber, setPageIndex] = useState<number>(1);
  const [loading, setLoading] = useState <boolean>(false);
  const [search, setSearch] = useState<string>('');
  const paginationHandler = (event: React.ChangeEvent<unknown>, value: number) => {
    setPageIndex(value);
  };
  return (
    <div className="search_container">
      <CarsFilter
        setCars={setCars}
        setPagination={setPagination}
        setLoading={setLoading}
        pageNumber={pageNumber}
        search={search}
      />
      <div className="car_wrapper">
        <TextField
          sx={{
            width: '50vw',
            mb: '2rem',
            marginLeft: '20rem',
          }}
          id="outlined-basic"
          label="search"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {loading
          ? (
            <div className="car_wrapper">

              <CustomSkeleton />
              <CustomSkeleton />
              <CustomSkeleton />
              <CustomSkeleton />
            </div>
          )

          : (cars?.length ? (
            <div className="car_wrapper">
              {cars.map((e) => (
                <CarCard
                  key={e.id}
                  image={
                  // eslint-disable-next-line max-len
                  e.images[0]?.image || 'https://thumbs.dreamstime.com/b/no-image-available-icon-photo-camera-flat-vector-illustration-132483141.jpg'
                }
                  carName={e.model}
                  quality={e.quality}
                  price={e.price}
                  mileage={e.mileage}
                  description={e.description}
                  isGoodPrice={e.isGoodPrice}
                />
              ))}
              <Pagination
                sx={{
                  margin: '2rem 0rem',
                  marginLeft: '10rem',
                }}
                onChange={paginationHandler}
                count={pagination / 9}
                variant="outlined"
              />

            </div>
          ) : <h2 style={{ fontSize: '2rem' }}>NO results found</h2>)}
      </div>
    </div>
  );
}

export default Search;
