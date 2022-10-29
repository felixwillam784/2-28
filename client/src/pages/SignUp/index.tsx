import SignUpform from '../../components/signUpForm';
import '../Login/style.css';

function SignUp() {
  return (
    <div className="signPage">
      <div
        className="signImg"
      >
        <div className="decs">
          <h2>
            The best way to buy or sell a used car
          </h2>
          <p>Great Value | Trusted Quality | All Online</p>
        </div>
      </div>
      <SignUpform />
    </div>
  );
}

export default SignUp;
