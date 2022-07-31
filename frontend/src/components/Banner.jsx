import React from "react";
import "../App.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const Banner = () => {
   const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: 0,
      autoplay: true,
      arrows: false,
      autoplaySpeed: 3000
    };
    const banner = [
      {
         img: "./banner-2.jpg",
         i: "The lastest gear from",
         h3: "The mens' store",
         span: "Browse collection" 
      },
      {
         img: "./banner-1.jpg",
         i: "The lastest gear from",
         h3: "Keep Your summer vibe alive",
         span: "Browse collection" 
      },
      {
         img: "./banner-3.jpg",
         i: "The lastest gear from",
         h3: "The mens' store",
         span: "Browse collection" 
      },
    ]
   return (
       <div className="banners">
         <Slider {...settings}>
         {
            banner.map((b, i) => (
                 <div className="banner" key={i}>
                     <img src={b.img} alt="banner" />
                     <div className="banner-content">
                        <i>{b.i}</i>
                        <h3>{b.h3}</h3>
                        <span>{b.span}</span>
                  </div>
               </div>
            ))
         }
         </Slider>
      </div>
   );
};

export default Banner;
