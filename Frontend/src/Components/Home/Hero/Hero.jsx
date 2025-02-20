"use client";
import React, { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";

import heroPriceShape from "@/assets/icons/hero-slider-price-shape.png";

import heroSlide1 from "@/assets/img/home/hero-slide1.webp";
import heroSlide2 from "@/assets/img/home/hero-slide2.webp";
import heroSlide3 from "@/assets/img/home/hero-slide3.webp";

import heroCard1 from "@/assets/img/home/hero-product-card1-img.webp";
import heroCard2 from "@/assets/img/home/hero-product-card2-img.webp";

import heroProduct1 from "@/assets/img/home/hero-slider-product-card1-product-img.webp";
import heroProduct6 from "@/assets/img/home/herpo-slide6.webp";
import heroProduct4 from "@/assets/img/home/hero-img4.webp";

import discountProduct1 from "@/assets/img/home/hero-slider3-discount-product-img1.webp";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import axios from "axios";

const Hero = () => {
  const [banners, setBanners] = useState([]);

  useEffect(async () => {
    try {
      const response = await axios.get(
        "http://localhost:5070/api/v1/hero-slider"
      );

      setBanners(response?.data?.data || []);
    } catch (error) {
      // Improved error handling
      if (error.response) {
        console.error(
          `Error fetching banners: ${error.response.status} - ${error.response.data}`
        );
      } else if (error.request) {
        console.error("No response received from server:", error.request);
      } else {
        console.error("Error setting up request:", error.message);
      }
    }
  }, []);

  return (
    <div id="hero">
      <div className="hero-slider-container">
        <Swiper
          pagination={{
            clickable: true,
          }}
          loop={true}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          autoplay={true}
          modules={[Pagination, Navigation, Autoplay]}
          className="mySwiper swiper-wrapper"
        >
          {banners?.map((banner, idx) => (
            <SwiperSlide key={idx} className="hero_slide">
              <div>
                <img src={`http://localhost:5070${banner?.slideImg}`} alt="" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* <!-- Swiper Navigation --> */}
        <div className="swiper-button-next"></div>
        <div className="swiper-button-prev"></div>
      </div>
    </div>
  );
};

export default Hero;
