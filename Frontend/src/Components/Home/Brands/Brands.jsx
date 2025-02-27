"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const Brands = () => {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchBrands = async () => {
      const response = await axios.get("http://localhost:5070/api/v1/brands");

      if (response?.data?.status === "success") {
        setBrands(response?.data?.data);
      }
    };

    fetchBrands();
  }, []);

  return (
    <div className="brand">
      <div className="container">
        <div className="heading">
          <div>
            <h2>Brand</h2>
          </div>
        </div>

        <div className="carousel-container">
          <div className="brand-carousel">
            <Swiper
              slidesPerView={5}
              breakpoints={{
                0: { slidesPerView: 2 },
                600: { slidesPerView: 3 },
                1000: { slidesPerView: 5 },
              }}
            >
              {brands?.slice(0, 12)?.map((brand, idx) => (
                <SwiperSlide>
                  <div key={idx} className="item">
                    <img
                      src={`http://localhost:5070${brand.brandImg}`}
                      alt=""
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Brands;
