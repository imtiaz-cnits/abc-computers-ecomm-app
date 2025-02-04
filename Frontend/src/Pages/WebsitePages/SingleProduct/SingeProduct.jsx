"use client";
import Breadcrumb from "@/Components/Shared/Breadcrumb/Breadcrumb";
import React, { useEffect } from "react";
import "@/assets/css/product-single.css";
import "@/assets/css/vendor/lightslider.css";

import productImg1 from "@/assets/img/product/populer-product-img1.webp";
import productImg2 from "@/assets/img/product/populer-product-img2.webp";
import productImg3 from "@/assets/img/product/populer-product-img3.webp";
import productImg4 from "@/assets/img/product/populer-product-img4.webp";
import productImg5 from "@/assets/img/product/populer-product-img5.webp";

import viewProductImg1 from "@/assets/img/product/view-product-img1.webp";
import viewProductImg2 from "@/assets/img/product/view-product-img2.webp";
import viewProductImg3 from "@/assets/img/product/view-product-img3.webp";
import viewProductImg4 from "@/assets/img/product/view-product-img4.webp";
import viewProductImg5 from "@/assets/img/product/view-product-img5.webp";

import productVideo1 from "@/assets/img/product/product-video-img1.webp";

import sliderProfile1 from "@/assets/img/product/video-slider.profile1.webp";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const SingleProduct = () => {

  useEffect(() => {

    // Video Modal JS Start.........................................
    const modalBtn = document.querySelectorAll(".openModalBtn");
    const modals = document.querySelectorAll(".video_modal");
    const closeBtn = document.querySelectorAll(".close");

    // Open the modal and start the video when the button is clicked
    modalBtn.forEach((btn) => {
      btn.onclick = function () {
        const modalId = btn.getAttribute("data-modal");
        const modal = document.getElementById(`myModal${modalId}`);
        const iframe = modal.querySelector("iframe");

        // Add autoplay to the iframe source
        iframe.src = iframe.src.includes("autoplay=1")
          ? iframe.src
          : iframe.src + "?autoplay=1";

        modal.style.display = "block"; // Show the modal
      };
    });

    // Close the modal and stop the video when the close button is clicked
    closeBtn.forEach((btn) => {
      btn.onclick = function () {
        const modalId = btn.getAttribute("data-close");
        const modal = document.getElementById(`myModal${modalId}`);
        modal.style.display = "none"; // Hide the modal

        // Stop the video by resetting the iframe's source
        const iframe = modal.querySelector("iframe");
        iframe.src = iframe.src.split("?")[0];
      };
    });

    // Close the modal if the user clicks outside the modal content
    window.onclick = function (event) {
      modals.forEach((modal) => {
        if (event.target === modal) {
          modal.style.display = "none";

          // Stop the video by resetting the iframe's source
          const iframe = modal.querySelector("iframe");
          iframe.src = iframe.src.split("?")[0];
        }
      });
    };
    // Video Modal JS End.........................................


  }, [])


  // Slider Product Quantity Start..................
  const decreaseQuantity = () => {
    const quantityInput = document.getElementById("quantity");
    let currentValue = parseInt(quantityInput.value) || 1;
    if (currentValue > 1) {
      quantityInput.value = currentValue - 1;
    }
  };

  const increaseQuantity = () => {
    const quantityInput = document.getElementById("quantity");
    let currentValue = parseInt(quantityInput.value) || 1;
    quantityInput.value = currentValue + 1;
  };
  // Slider Product Quantity End..................

  return (
    <>
      <Breadcrumb />

      {/* <!-- Product Single Start --> */}
      <div className="single_product">
        <div className="container">
          <div className="single_product_wrapper">
            <div className="row no-gutters">
              <div className="col-lg-6">
                {/* <div className="card_custom">
                                    <div className="demo_custom">
                                        <ul id="lightSlider">
                                            <li
                                                data-thumb={productImg1.src}
                                            >
                                                <div className="zoom_container">
                                                    <div className="zoom_container_img">
                                                        <img
                                                            src={productImg1.src}
                                                            alt="Product Image 1"
                                                        />
                                                    </div>

                                                    <div className="zoom_box">
                                                        <img
                                                            src={productImg1.src}
                                                            alt="Zoom Image 1"
                                                        />
                                                    </div>
                                                </div>
                                            </li>
                                            <li
                                                data-thumb={productImg2.src}
                                            >
                                                <div className="zoom_container">
                                                    <div className="zoom_container_img">
                                                        <img
                                                            src={productImg2.src}
                                                            alt="Product Image 1"
                                                        />
                                                    </div>

                                                    <div className="zoom_box">
                                                        <img
                                                            src={productImg2.src}
                                                            alt="Zoom Image 1"
                                                        />
                                                    </div>
                                                </div>
                                            </li>
                                            <li
                                                data-thumb={productImg3.src}
                                            >
                                                <div className="zoom_container">
                                                    <div className="zoom_container_img">
                                                        <img
                                                            src={productImg3.src}
                                                            alt="Product Image 1"
                                                        />
                                                    </div>

                                                    <div className="zoom_box">
                                                        <img
                                                            src={productImg3.src}
                                                            alt="Zoom Image 1"
                                                        />
                                                    </div>
                                                </div>
                                            </li>
                                            <li
                                                data-thumb={productImg4.src}
                                            >
                                                <div className="zoom_container">
                                                    <div className="zoom_container_img">
                                                        <img
                                                            src={productImg4.src}
                                                            alt="Product Image 1"
                                                        />
                                                    </div>

                                                    <div className="zoom_box">
                                                        <img
                                                            src={productImg4.src}
                                                            alt="Zoom Image 1"
                                                        />
                                                    </div>
                                                </div>
                                            </li>
                                            <li
                                                data-thumb={productImg5.src}
                                            >
                                                <div className="zoom_container">
                                                    <div className="zoom_container_img">
                                                        <img
                                                            src={productImg5.src}
                                                            alt="Product Image 1"
                                                        />
                                                    </div>

                                                    <div className="zoom_box">
                                                        <img
                                                            src={productImg5.src}
                                                            alt="Zoom Image 1"
                                                        />
                                                    </div>
                                                </div>
                                            </li>
                                            <li
                                                data-thumb={productImg1.src}
                                            >
                                                <div className="zoom_container">
                                                    <div className="zoom_container_img">
                                                        <img
                                                            src={productImg1.src}
                                                            alt="Product Image 1"
                                                        />
                                                    </div>

                                                    <div className="zoom_box">
                                                        <img
                                                            src={productImg1.src}
                                                            alt="Zoom Image 1"
                                                        />
                                                    </div>
                                                </div>
                                            </li>
                                            <li
                                                data-thumb={productImg2.src}
                                            >
                                                <div className="zoom_container">
                                                    <div className="zoom_container_img">
                                                        <img
                                                            src={productImg2.src}
                                                            alt="Product Image 1"
                                                        />
                                                    </div>

                                                    <div className="zoom_box">
                                                        <img
                                                            src={productImg2.src}
                                                            alt="Zoom Image 1"
                                                        />
                                                    </div>
                                                </div>
                                            </li>
                                            <li
                                                data-thumb={productImg3.src}
                                            >
                                                <div className="zoom_container">
                                                    <div className="zoom_container_img">
                                                        <img
                                                            src={productImg3.src}
                                                            alt="Product Image 1"
                                                        />
                                                    </div>

                                                    <div className="zoom_box">
                                                        <img
                                                            src={productImg3.src}
                                                            alt="Zoom Image 1"
                                                        />
                                                    </div>
                                                </div>
                                            </li>
                                            <li
                                                data-thumb={productImg4.src}
                                            >
                                                <div className="zoom_container">
                                                    <div className="zoom_container_img">
                                                        <img
                                                            src={productImg4.src}
                                                            alt="Product Image 1"
                                                        />
                                                    </div>

                                                    <div className="zoom_box">
                                                        <img
                                                            src={productImg4.src}
                                                            alt="Zoom Image 1"
                                                        />
                                                    </div>
                                                </div>
                                            </li>
                                            <li
                                                data-thumb={productImg5.src}
                                            >
                                                <div className="zoom_container">
                                                    <div className="zoom_container_img">
                                                        <img
                                                            src={productImg5.src}
                                                            alt="Product Image 1"
                                                        />
                                                    </div>

                                                    <div className="zoom_box">
                                                        <img
                                                            src={productImg5.src}
                                                            alt="Zoom Image 1"
                                                        />
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div> */}
              </div>
              <div className="col-lg-6">
                {/* <!-- Product Details Section --> */}
                <div className="product_details_custom">
                  <h1>DJI Osmo Mobile 6</h1>
                  <div className="price">
                    <span className="discounted_price">$149.99</span>
                    <span className="original_price">$169.99</span>
                  </div>

                  <div className="product_all_details">
                    <div className="availability_custom">
                      <span className="available">Available</span>
                      <p className="in_stock">
                        : <span>In Stock</span>
                      </p>
                    </div>

                    <div className="key_feature">
                      <p>Key Features</p>
                      <p>Model: FP-J30E-B</p>
                      <p>Plasma cluster Ion Technology</p>
                      <p>Plasma cluster Indicator Light</p>
                      <p>Replacement Filter (Automatic Detection)</p>
                      <p>Special Program Mode (Haze Mode)</p>
                    </div>
                  </div>

                  <div className="select_color_custom">
                    <label>Select Color</label>:
                    <button
                      className="color_btn"
                      style={{ backgroundColor: "#333" }}
                    ></button>
                    <button
                      className="color_btn"
                      style={{ backgroundColor: "#999" }}
                    ></button>
                  </div>

                  <div className="action_buttons_custom">
                    <div className="quantity_wrapper">
                      <div className="quantity_custom">
                        <button
                          type="button"
                          className="btn-decrease"
                          onClick={() => decreaseQuantity()}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          id="quantity"
                          min="1"
                          defaultValue="1"
                        />
                        <button
                          type="button"
                          className="btn-increase"
                          onClick={() => increaseQuantity()}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="button_wrapper">
                      <a href="./shopping-cart.html" className="add_to_cart">
                        Add to Cart
                      </a>
                      <a href="./shopping-cart.html" className="buy_now">
                        Buy Now
                      </a>
                    </div>
                  </div>

                  <div className="gift_receipt_custom">
                    <label>
                      <input type="checkbox" />
                      <span>Add a gift receipt for easy returns</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Product Single End --> */}

      {/* <!-- Product DEs --> */}
      <div className="product_des">
        <div className="container">
          <div className="buttons">
            <a href="#specification" className="tab_btn">
              Specification
            </a>
            <a href="#description" className="tab_btn">
              Description
            </a>
          </div>
          <div id="specification" className="table_wrapper">
            <table>
              <thead>
                <th colSpan="2">General Information</th>
              </thead>
              <tbody>
                <tr>
                  <td>Coverage Area</td>
                  <td>23m</td>
                </tr>
                <tr>
                  <td>Air Flow</td>
                  <td>
                    Airflow (Max/Med/Low) (m³/hour) - Without Humidifying: 180 /
                    120 / 60
                  </td>
                </tr>
                <tr>
                  <td>Noise Level</td>
                  <td>
                    Noise Level (Max/Med/Low) (dB) - Without Humidifying: 44 /36
                    /23
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="item">Sensor</div>
                  </td>
                  <td>
                    <span>Dust Sensor</span> <br />
                    <span>Odor Sensor</span> <br />
                    <span>Temperature & Humidity Sensor</span>
                  </td>
                </tr>
                <tr>
                  <td>Power</td>
                  <td>Standby Power (W): 1</td>
                </tr>
                <tr>
                  <td>Others</td>
                  <td>Auto Restart: Yes</td>
                </tr>
              </tbody>
              <thead>
                <th colSpan="2">Physical Information</th>
              </thead>
              <tbody>
                <tr>
                  <td>Dimension</td>
                  <td>431 x 411 x 211 mm</td>
                </tr>
                <tr>
                  <td>Weight</td>
                  <td>4kg</td>
                </tr>
                <tr>
                  <td>Color</td>
                  <td>White</td>
                </tr>
              </tbody>
              <thead>
                <th colSpan="2">Warranty Information</th>
              </thead>
              <tbody>
                <tr>
                  <td>Warranty</td>
                  <td>No Warranty.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* <!-- Product DEs --> */}

      {/* <!-- Product Documents Start --> */}
      <div id="description" className="product_document">
        <div className="container">
          <div className="document">
            <h2 className="title">Description</h2>
            <ul className="item">
              <li>
                <a href="#">Instructions for Use (IFU) (PDF)</a>
              </li>
              <li>
                <a href="#">Safety Information (PDF)</a>
              </li>
              <li>
                <a href="#">User Guide (PDF)</a>
              </li>
              <li>
                <a href="#">User Manual (PDF)</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* <!-- Product Documents End --> */}

      {/* <!-- View Product Start --> */}
      <section id="view_product">
        <div className="container">
          <div className="heading">
            <h2>View Product</h2>
          </div>
          <div className="product_wrapper">
            <div className="row g-3">
              <div className="col-12">
                <div className="product_view">
                  <img src={viewProductImg1.src} alt="" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="product_view">
                  <img src={viewProductImg2.src} alt="" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="product_view">
                  <img src={viewProductImg3.src} alt="" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="product_view">
                  <img src={viewProductImg4.src} alt="" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="product_view">
                  <img src={viewProductImg5.src} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- View Product End --> */}

      {/* <!-- What’s in the box Start --> */}
      <div className="in_box_item">
        <div className="container">
          <div className="document">
            <h2 className="title">What’s in the box</h2>
            <ul className="item">
              <li>
                <a href="#">Osmo Gimbal- Mobile 6 x1</a>
              </li>
              <li>
                <a href="#">DJI OM Magnetic Phone Clamp 3 x1</a>
              </li>
              <li>
                <a href="#">Grip Tripod x1</a>
              </li>
              <li>
                <a href="#">Power Cable x1</a>
              </li>
              <li>
                <a href="#">Storage Pouch x1</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* <!-- What’s in the box End --> */}

      {/* <!-- Product Video Slider Start --> */}
      <div id="product_video">
        <div className="container">
          <div className="heading">
            <div>
              <h2>Videos for this product</h2>
            </div>
          </div>

          <div className="carousel-container">
            <div className="owl-carousel owl-theme video-carousel">
              <div className="item">
                <div className="product_video_card">
                  <div className="product">
                    <img src={productVideo1.src} alt="" />
                  </div>
                  <span className="product_rate">3.30</span>
                  <div className="product_reviews d-flex">
                    <div className="profiles">
                      <img src={sliderProfile1.src} alt="" />
                    </div>

                    <div className="details">
                      <h2 className="name">DJI Osmo Mobile 6 - Review</h2>
                      <h3 className="person">Danny M.</h3>
                    </div>
                  </div>
                </div>
                <a class="play_btn openModalBtn" data-modal="1">
                  <svg
                    width="80"
                    height="80"
                    viewBox="0 0 80 80"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="40"
                      cy="40"
                      r="40"
                      fill="black"
                      fillOpacity="0.8"
                    />
                    <path
                      d="M56 40L32 53.8564L32 26.1436L56 40Z"
                      fill="white"
                    />
                  </svg>
                </a>
              </div>
              <div className="item">
                <div className="product_video_card">
                  <div className="product">
                    <img src={productVideo1.src} alt="" />
                  </div>
                  <span className="product_rate">3.30</span>
                  <div className="product_reviews d-flex">
                    <div className="profiles">
                      <img src={sliderProfile1.src} alt="" />
                    </div>

                    <div className="details">
                      <h2 className="name">DJI Osmo Mobile 6 - Review</h2>
                      <h3 className="person">Danny M.</h3>
                    </div>
                  </div>
                </div>
                <a className="play_btn openModalBtn" data-modal="2">
                  <svg
                    width="80"
                    height="80"
                    viewBox="0 0 80 80"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="40"
                      cy="40"
                      r="40"
                      fill="black"
                      fillOpacity="0.8"
                    />
                    <path
                      d="M56 40L32 53.8564L32 26.1436L56 40Z"
                      fill="white"
                    />
                  </svg>
                </a>
              </div>
              <div className="item">
                <div className="product_video_card">
                  <div className="product">
                    <img src={productVideo1.src} alt="" />
                  </div>
                  <span className="product_rate">3.30</span>
                  <div className="product_reviews d-flex">
                    <div className="profiles">
                      <img src={sliderProfile1.src} alt="" />
                    </div>

                    <div className="details">
                      <h2 className="name">DJI Osmo Mobile 6 - Review</h2>
                      <h3 className="person">Danny M.</h3>
                    </div>
                  </div>
                </div>
                <a className="play_btn openModalBtn" data-modal="3">
                  <svg
                    width="80"
                    height="80"
                    viewBox="0 0 80 80"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="40"
                      cy="40"
                      r="40"
                      fill="black"
                      fillOpacity="0.8"
                    />
                    <path
                      d="M56 40L32 53.8564L32 26.1436L56 40Z"
                      fill="white"
                    />
                  </svg>
                </a>
              </div>
              <div className="item">
                <div className="product_video_card">
                  <div className="product">
                    <img src={productVideo1.src} alt="" />
                  </div>
                  <span className="product_rate">3.30</span>
                  <div className="product_reviews d-flex">
                    <div className="profiles">
                      <img src={sliderProfile1.src} alt="" />
                    </div>

                    <div className="details">
                      <h2 className="name">DJI Osmo Mobile 6 - Review</h2>
                      <h3 className="person">Danny M.</h3>
                    </div>
                  </div>
                </div>
                <a className="play_btn openModalBtn" data-modal="5">
                  <svg
                    width="80"
                    height="80"
                    viewBox="0 0 80 80"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="40"
                      cy="40"
                      r="40"
                      fill="black"
                      fillOpacity="0.8"
                    />
                    <path
                      d="M56 40L32 53.8564L32 26.1436L56 40Z"
                      fill="white"
                    />
                  </svg>
                </a>
              </div>
              <div className="item">
                <div className="product_video_card">
                  <div className="product">
                    <img src={productVideo1.src} alt="" />
                  </div>
                  <span className="product_rate">3.30</span>
                  <div className="product_reviews d-flex">
                    <div className="profiles">
                      <img src={sliderProfile1.src} alt="" />
                    </div>

                    <div className="details">
                      <h2 className="name">DJI Osmo Mobile 6 - Review</h2>
                      <h3 className="person">Danny M.</h3>
                    </div>
                  </div>
                </div>
                <a className="play_btn openModalBtn" data-modal="4">
                  <svg
                    width="80"
                    height="80"
                    viewBox="0 0 80 80"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="40"
                      cy="40"
                      r="40"
                      fill="black"
                      fillOpacity="0.8"
                    />
                    <path
                      d="M56 40L32 53.8564L32 26.1436L56 40Z"
                      fill="white"
                    />
                  </svg>
                </a>
              </div>
            </div>

            {/* <!-- Custom navigation buttons --> */}
            <div className="custom-nav">
              <button className="prev-btn">
                <FaChevronLeft />
              </button>
              <button className="next-btn">
                <FaChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Video modal Start --> */}


      {/* <!-- Modal 1 --> */}
      <div id="myModal1" class="modal video_modal">
        <div class="modal-content">
          <span class="close" data-close="1">&times;</span>
          <iframe
            src="https://www.youtube.com/embed/2dEaJSw81jU?si=kpC8mPGS-4yFA-Hc"
            allow="fullscreen"
          ></iframe>
        </div>
      </div>
      {/* <!-- Modal 2 --> */}
      <div id="myModal2" class="modal video_modal">
        <div class="modal-content">
          <span class="close" data-close="2">&times;</span>
          <iframe
            src="https://www.youtube.com/embed/2dEaJSw81jU?si=kpC8mPGS-4yFA-Hc"
            allow="fullscreen"
          ></iframe>
        </div>
      </div>
      {/* <!-- Modal 3 --> */}
      <div id="myModal3" class="modal video_modal">
        <div class="modal-content">
          <span class="close" data-close="3">&times;</span>
          <iframe
            src="https://www.youtube.com/embed/2dEaJSw81jU?si=kpC8mPGS-4yFA-Hc"
            allow="fullscreen"
          ></iframe>
        </div>
      </div>
      {/* <!-- Modal 4 --> */}
      <div id="myModal4" class="modal video_modal">
        <div class="modal-content">
          <span class="close" data-close="4">&times;</span>
          <iframe
            src="https://www.youtube.com/embed/2dEaJSw81jU?si=kpC8mPGS-4yFA-Hc"
            allow="fullscreen"
          ></iframe>
        </div>
      </div>
      {/* <!-- Modal 4 --> */}
      <div id="myModal5" class="modal video_modal">
        <div class="modal-content">
          <span class="close" data-close="4">&times;</span>
          <iframe
            src="https://www.youtube.com/embed/2dEaJSw81jU?si=kpC8mPGS-4yFA-Hc"
            allow="fullscreen"
          ></iframe>
        </div>
      </div>


      {/* <!-- Product Video Slider End --> */}
    </>
  );
};

export default SingleProduct;
