import Images from '../../assets';
import OutlinedCard from '../../components/CarCard/indes';

const car = [{
  id: 1,
  image: Images.carTest,
  carName: ' 2018 car name',
  presented: 90,
  price: 300,
  mailage: 300,
  description:
  `Posuere consectetur est at lob ortis. Aenean eu l eo quam Pellentesque
  ornare sem lacini ... more`,
  goodPrice: false,

},
{
  id: 2,
  image: Images.carTest,
  carName: ' 2018 car name',
  presented: 90,
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
        <OutlinedCard
          key={e.id}
          image={e.image}
          carName={e.carName}
          presented={e.presented}
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
