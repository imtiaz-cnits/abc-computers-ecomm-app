"use client";
import React from "react";
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

const Hero = () => {
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
          <SwiperSlide className="hero-slide hero_slide1">
            <div
              className="hero_slide_bg"
              style={{
                width: "100%",
                height: "100%",
                background: `linear-gradient(
                      90deg,
                      #000 0%,
                      rgba(0, 0, 0, 0) 100%
                    ),
                    url(${heroSlide1.src}) lightgray 50% / cover
                      no-repeat`,
                borderBottomRightRadius: "16px",
              }}
            ></div>
            <div className="product_sidebar">
              <div
                className="product_card1"
                style={{
                  width: "100%",
                  background: `url(${heroCard1.src})
                      lightgray 50% / cover no-repeat`,
                }}
              >
                <div className="img_wrap">
                  <img src={heroProduct1.src} alt="" />
                </div>
                <div className="product_card1_details">
                  <div className="wrap">
                    <p className="discount_label">Discounted!</p>
                    <h2 className="product_title">Lamp</h2>
                    <div className="wrap">
                      <div>
                        <a href="./product.html" className="shop_now">
                          Shop Now
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="price_container">
                    <div className="discount_info_phone_view d-block d-lg-none text-lg-center align-content-center">
                      <p>30%</p>
                      <span>Off</span>
                    </div>
                    <div className="d-flex align-content-center">
                      <span className="original_price">৳39.99</span>
                      <span className="discounted_price">৳29.99</span>
                    </div>
                  </div>
                </div>

                <div className="discount_info d-none d-lg-block text-lg-center align-content-center">
                  <p>30%</p>
                  <span>Off</span>
                </div>
              </div>
              <div
                className="product_card2"
                style={{
                  width: "100%",
                  height: "100%",
                  background: `url(${heroCard2.src})
                      lightgray 50% / cover no-repeat`,
                }}
              >
                <p className="discount_label">Discounted!</p>
                <h2 className="product_title">USB Flash Drive</h2>
                <a href="./product.html" className="shop_now">
                  Shop Now
                </a>
                <div className="price_container">
                  <span className="original_price">৳29.99</span>
                  <span className="discounted_price">৳19.99</span>
                </div>

                <div className="discount_info">
                  <p>30%</p>
                  <span>Off</span>
                </div>
              </div>
            </div>

            <div className="container hero_content1">
              <h1>Explore Trendsetting Gadgets Under One Roof</h1>
              <p>
                Our knowledgeable and friendly staff are here to guide you
                through the latest trends and help you make informed choices.
              </p>
              <a href="./product.html" className="start_shop_button">
                Start Shopping
              </a>
            </div>
          </SwiperSlide>
          <SwiperSlide
            className="hero-slide hero-slide2"
            style={{
              background: `url(${heroSlide2.src}) lightgray 50% /
                  cover no-repeat`,
            }}
          >
            <div className="container">
              <div className="hero_content2">
                <div className="ad_container">
                  {/* <!-- Content --> */}
                  <div className="container">
                    <div className="content">
                      <h2>
                        <span>VISION ONE</span>
                      </h2>
                      <h1>LOCKWORD</h1>
                      <h3>HEADSET</h3>
                      <p className="price">৳1,999</p>
                      <a href="./product.html" className="shop_now_btn">
                        Shop Now
                      </a>
                    </div>
                  </div>

                  {/* <!-- Product Image --> */}
                  <div className="product-image">
                    <img src={heroProduct4.src} alt="VR Headset" />
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide
            className="hero_slide"
            style={{
              background: `url(${heroSlide3.src}) lightgray 50% /
                  cover no-repeat`,
            }}
          >
            <div className="container">
              <div className="hero_content3">
                <div className="ad_container">
                  {/* <!-- Content --> */}
                  <div className="container">
                    <div className="content">
                      <h1>JBL Synchros E50BT Headphones</h1>
                      <p>
                        Our knowledgeable and friendly staff are here to guide
                        you through the latest trends and help you make informed
                        choices.
                      </p>
                      <a href="./product.html" className="get_product_button">
                        Get the Product
                      </a>

                      <div className="discount_product">
                        <div className="product_details">
                          <p>Discounted Product</p>
                          <h3>JBL-Backbeat Go 2</h3>
                          <div className="price_container">
                            <span className="original_price">৳80.00</span>
                            <span className="discounted_price">৳40.00</span>
                          </div>
                        </div>
                        <div className="product_img">
                          <img src={discountProduct1.src} alt="" />
                        </div>
                        <div className="button_wrap">
                          <span className="discount_badge">50%</span>
                          <button className="next_btn">
                            <i className="fa-solid fa-angle-right"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* <!-- Product Image --> */}
                  <div className="product-image">
                    <img src={heroProduct6.src} alt="VR Headset" />
                    <div
                      className="price_shape"
                      style={{
                        background: `url(${heroPriceShape.src})
                            no-repeat center / contain`,
                      }}
                    >
                      <h3>৳59.99</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>

        {/* <!-- Swiper Navigation --> */}
        <div className="swiper-button-next"></div>
        <div className="swiper-button-prev"></div>
      </div>
    </div>
  );
};

export default Hero;
