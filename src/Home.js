import React from "react";
import "./Home.css";
import makeid from "./makeid";
import Product from "./Product";
function Home() {
  return (
    <div>
      <div className="home__container">
        <img
          className="home__image"
          src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
          alt=""
        />
        <div className="home__row">
          <Product
            id={makeid(20)}
            title="Umbrella Hat 23” for Rainy Party"
            image="https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1571685334-umberella-hat-1571685305.jpg?crop=1.00xw:0.667xh;0,0.193xh&resize=768:*"
            price={7.99}
            rating={3}
          />
          <Product
            id={makeid(20)}
            title="Nicolas Cage Pillowcase"
            image="https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1571685053-nicolas-cage-1571685026.jpg?crop=1.00xw:0.667xh;0,0.137xh&resize=768:*"
            price={9.99}
            rating={4}
          />
        </div>

        <div className="home__row">
          <Product
            id={makeid(20)}
            title="Chicken Harness and Leash"
            image="https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1565295718-41-Z274tCDL.jpg?crop=1xw:1xh;center,top&resize=768:*"
            price={16.89}
            rating={4}
          />
          <Product
            id={makeid(20)}
            title="Dog Dryer"
            image="https://i0.wp.com/bestlifeonline.com/wp-content/uploads/2018/08/dog-dryer.jpg?w=1023&ssl=1"
            price={39.95}
            rating={5}
          />
          <Product
            id={makeid(20)}
            title="Inflatable Pool Bull"
            image="https://i0.wp.com/bestlifeonline.com/wp-content/uploads/2018/08/inflatable-pool-bull.jpeg?w=1024&ssl=1"
            price={37.59}
            rating={4}
          />
        </div>

        <div className="home__row">
          <Product
            id={makeid(20)}
            title="Philips 499P9H/00 Super Widescreen, Dual QHD, VA W-LED Curved Monitor (5120x1440/5ms/1xDP/2xHDMI/ USB-C) Webcam, Speakers"
            image="https://images-na.ssl-images-amazon.com/images/I/513xuyxvG2L._AC_SL1181_.jpg"
            price={999.99}
            rating={5}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
