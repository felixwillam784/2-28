import CarCard from '../../components/CarCard';

const car = [{
  id: 1,
  image:
  `https://images.unsplash.com/photo-1503376780353-
7e6692767b70?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx
8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80`,
  carName: ' 2018 car name',
  quality: 90,
  price: 300,
  mailage: 300,
  description:
  `Posuere consectetur est at lob ortis. Aenean eu l eo quam Pellentesque
  ornare sem lacini ... more`,
  goodPrice: false,

},
{
  id: 2,
  image:
  `https://images.unsplash.com/photo-1503376780353-
7e6692767b70?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx
8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80`,
  carName: ' 2018 car name',
  quality: 90,
  price: 300,
  mailage: 300,
  description:
  `Posuere consectetur est at lob ortis. Aenean eu l eo quam Pellentesque
   ornare sem lacini ... more`,
  goodPrice: true,

}];
function Search() {
  return (
    <div>
      {car.map((e) => (
        <CarCard
          key={e.id}
          image={e.image}
          carName={e.carName}
          quality={e.quality}
          price={e.price}
          mailage={e.mailage}
          description={e.description}
          goodPrice={e.goodPrice}
        />
      ))}
    </div>
  );
}

export default Search;
