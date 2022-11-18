<div id="top"></div>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/CA-G12/car-trade">
    <img src="https://i.imgur.com/veF5F6J.png" alt="Logo" width="200" height="140">
  </a>

  <p align="center">
    <br />
    <br />
    <a href="https://car-tradee.herokuapp.com">View Demo on Heroku</a>
     .
    <a href="https://car-trede.onrender.com">View Demo on Render</a>
    .
    <a href="https://www.figma.com/file/4j4A83unKcFHLyfKiIwrQq/Car-trade?node-id=0%3A1">Design Link</a>
    ·
    <a href="https://github.com/CA-G12/car-trade/issues/new">Report Bug</a>
    ·
    <a href="https://github.com/CA-G12/car-trade/issues/new">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#problem">Problem</a></li>
        <li><a href="#solution">Solution</a></li>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#database-schema">Database Schema</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li>
      <a href="#usage">Usage</a>
      <ul>
        <li>
          <a href="#user-stories">User Stories</a>
            <ul>
                <li><a href="#buyer-stories">As a Buyer</a></li>
                <li><a href="#seller-stories">As a Seller</a></li>
                <li><a href="#admin-stories">As an Admin</a></li>
            </ul>
          </li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project <span id="about-the-project"></span>

<img src="https://i.imgur.com/AqLx1W1.png" />

<p align="right">(<a href="#top">back to top</a>)</p>

### Problem <span id="problem"></span>
- Limited access to more buyers
- Lack of experience with some buyers or sellers
- Difficulty in dealing with buyers from outside the region
- Limited search process for cars with certain specifications.

### Solution <span id="solution"></span>
- Wider access to more buyers
- Manage selling processes
- Tell buyer and seller all details for the sales processes
- There are alot of cars options for buyers
- More reachable to specifice cars

### Built With <span id="built-with"></span>

* [React.js](https://beta.reactjs.org/)
* [Express.js](https://expressjs.com/)
* [TypeScript](https://www.typescriptlang.org/docs/)
* [PostgreSQL](https://www.postgresql.org/docs/)
* [Material UI](https://mui.com/)
* [Firebase](https://firebase.google.com/docs/web/setup)
* [Stripe](https://stripe.com/)
* [Nodemailer](https://nodemailer.com/about/)

### Database Schema <span id="database-schema"></span>
![image](https://i.imgur.com/ih6nChg.png)


<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started <span id="getting-started"></span>

To get a local copy up and running follow these simple example steps.

### Prerequisites <span id="prerequisites"></span>

* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation <span id="installation"></span>

1. Create a free account at [Firebase](https://firebase.google.com/)
2. Clone the repo
   ```sh
   git clone https://github.com/CA-G12/car-trade.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. In the project root folder, rename `.env.example` file to `.env` and fill in the environment variables
   ```sh
   SECRET_KEY='<your secret key>'
   DB_URL_DEV=postgres://<username>:<password>@localhost:<port || 5432>/<development database>
   DB_URL_TEST=postgres://<username>:<password>@localhost:<port || 5432>/<test database>
   SECRET_EMAIL='<your email>'
   SECRET_PASSWORD='<your EMAIL password>'
   
   ```
<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage <span id="usage"></span>
### User Stories <span id="user-stories"></span>
#### As a user who wants to sell a car: <span id="seller-stories"></span>
- I can create a new account.
- I can log into my account.
- I want to see my profile.
- I can send request to sell my car.
- I can see my cars and the status of each one.
#### As a user who wants to buy a car: <span id="buyer-stories"></span>
- I can create a new account.
- I can log into my account.
- I want to see my profile.
- I want to see all cars that shown to selling.
- I want to filter cars depends on multi-types of spacefications.
- I want to contact admin to more informations.
- I want to reserve the car by paying part of the price.
- I will recive an email message after payment process to complete the purchase procedures.
#### As a user who wants to control the status of sales requests: <span id="admin-stories"></span>
- I can log into admin's dashboard.
- I want to accept/reject any sales request in "pending" state.
- I want to accept/reject any sales request in "on-check" state.
- I want to update the car informations and upload some of it's images befor shown "on-market".

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- CONTRIBUTING -->
## Contributing <span id="contributing"></span>

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- CONTACT -->
## Contact <span id="contact"></span>
### Our Great Contributors
- Husam abu mughessib - [@husam](https://github.com/husamkamal) - husamkmal94@gmail.com
- AbdAlilah Abu Al Hussein - [@AbdAlilah](https://github.com/abdou059) - abdoumonuir9@gmail.com
- Mai abu aabid - [@maimohammed](https://github.com/mai-mohammed) - maiimohammedd21@gmail.com
- Tariq Abu Sada - [@tariqesa](https://github.com/tariqabusada) - tariqesa101@gmail.com

### Our Great Team Leader
- Lina Ebeid - [@LinaEbeid](https://github.com/LinaYahya) - linaebe0@gmail.com

Project Link: [https://github.com/CA-G12/car-trade](https://github.com/CA-G12/car-trade)

<p align="right">(<a href="#top">back to top</a>)</p>

[contributors-shield]: https://img.shields.io/github/contributors/CA-G12/car-trade?style=for-the-badge
[contributors-url]: https://github.com/CA-G12/car-trade/graphs/contributors
[forks-shield]:https://img.shields.io/github/forks/CA-G12/car-trade?style=for-the-badge
[forks-url]: https://github.com/CA-G12/car-trade/network/members
[stars-shield]: https://img.shields.io/github/stars/CA-G12/car-trade?style=for-the-badge
[stars-url]: https://github.com/CA-G12/car-trade/stargazers
[issues-shield]: https://img.shields.io/github/issues/CA-G12/car-trade?style=for-the-badge
[issues-url]: https://github.com/CA-G12/car-trade/issues
