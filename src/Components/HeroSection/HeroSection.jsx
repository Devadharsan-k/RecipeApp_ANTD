import { Carousel } from "antd";
import React from "react";
import Recipe from "../Recipe/Recipe";
import styles from "./HeroSection.module.css";

const HeroSection = () => {
  const images = [
    "./img1.jpg",
    "./img2.jpg",
    "./img3.jpg",
    "./img4.jpg",
    "./img5.jpg",
  ];
  return (
    <>
      <Carousel
        autoplay
        speed={900}
        autoplaySpeed={2500}
        easing="easeInOutQuad"
        swipeToSlide
        draggable
        dots={false}
        lazyLoad="progressive"
      >
        {images.map((img, index) => (
          <div key={index}>
            <img src={img} className={styles.imgs} />
          </div>
        ))}
      </Carousel>
      <p className={styles.heroContent}>
        Taste the world with <br />
        <span className={styles.clrText}>சுவைக் குறிப்பு</span>
      </p>
      <Recipe />
    </>
  );
};

export default HeroSection;
{
  /* <p className={styles.subContent}>புது ருசிகள், புது ஆரோக்கியம்! </p> */
}
