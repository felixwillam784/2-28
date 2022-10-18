import HeroSection from '../../components/HeroSection';
import Brand from '../../components/brand';
import Images from '../../assets';
import HomeCardSection from '../../components/HomeCardSection';
import HomeCard from '../../components/HomeCard';

function Landing() {
  return (
    <>
      <HeroSection />
      <Brand />
      <HomeCardSection
        color="#8EB3FE"
        text="Buying a used car?"
        ask="Here's why you should do it on Carswitch"
      >
        <HomeCard
          title="Great Value"
          description="Skip the dealership margins, and buy directly"
          src={Images.privateSeller}
          alt="privateSeller"
        />
        <HomeCard
          title="Trusted Quality"
          description="Condition reports upfront & online, "
          src={Images.inspected}
          alt="inspected"
        />
        <HomeCard
          title="All Online"
          description="Ve handle every step, you just click click click"
          src={Images.rating}
          alt="rating"
        />
      </HomeCardSection>

      <HomeCardSection
        color="#FBC67F"
        text="selling a used car?"
        ask="Here's why you should do it on Carswitch"
      >
        <HomeCard
          title="Great Value"
          description="+10-20% more than a dealer offer,  by selling"
          src={Images.privateSeller}
          alt="privateSeller"
        />
        <HomeCard
          title="Trusted Quality"
          description="Keep the car, well bring buyers to you & secure
          payment Fraud proof"
          src={Images.inspected}
          alt="inspected"
        />
        <HomeCard
          title="All Online"
          description="You set the price, we handle the rest - at
          your doorstep!"
          src={Images.rating}
          alt="rating"
        />
      </HomeCardSection>
    </>
  );
}

export default Landing;
