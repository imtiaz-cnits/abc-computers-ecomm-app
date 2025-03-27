"use client";
import "@/assets/css/product-single.css";
import "@/assets/css/vendor/lightslider.css";
import Breadcrumb from "@/Components/Shared/Breadcrumb/Breadcrumb";
import { useContext, useEffect, useState } from "react";
import "./SingleProduct.css";

import moreProduct1 from "@/assets/img/product/more-product-img1.webp";
import moreProduct2 from "@/assets/img/product/more-product-img2.webp";
import moreProduct3 from "@/assets/img/product/more-product-img3.webp";
import moreProduct4 from "@/assets/img/product/more-product-img4.webp";

import recentImg1 from "@/assets/img/product/recent-shopping-img1.webp";
import recentImg2 from "@/assets/img/product/recent-shopping-img2.webp";
import recentImg3 from "@/assets/img/product/recent-shopping-img3.webp";
import recentImg4 from "@/assets/img/product/recent-shopping-img4.webp";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { LiaTimesSolid } from "react-icons/lia";
import { Swiper, SwiperSlide } from "swiper/react";

import axios from "axios";
import "swiper/css";
import { FreeMode, Thumbs } from "swiper/modules";
import { CartContext } from "@/Utilities/Contexts/CartContextProvider";
import { useRouter } from "next/navigation";

const SingleProduct = ({ id }) => {

  const router = useRouter()

  const [productDetails, setProductDetails] = useState({});
  const product = productDetails?.productID;
  const [selectedColor, setSelectedColor] = useState("");
  const [colorSelected, setColorSelected] = useState(true)

  const {addToCart} = useContext(CartContext)

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await axios.get(
        `https://api.abcpabnabd.com/api/v1/product-details/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response?.data?.status === "success") {
        setProductDetails(response?.data?.data);
      }
    };

    fetchProduct();
  }, [id]);


  useEffect(()=>{
    console.log(productDetails);
  }, [productDetails])

  // Slider Product Quantity Start..................
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  };


  const handleAddToCart = () =>{
    if((selectedColor === "") && (product?.color?.length)){
      setColorSelected(false)
      return
    }

    setColorSelected(true)

    const cartItem = {
      productID: productDetails?.productID?._id,
      productName: productDetails?.productID?.productName,
      price: productDetails?.productID?.discountPrice || productDetails?.productID?.price,
      productImg: productDetails?.productID?.productImg,
      subCategory: productDetails?.productID?.subCategoryID?.subCategoryName,
      quantity: quantity,
    }

    if(selectedColor !== ""){
      cartItem.color = selectedColor
    }

    addToCart(cartItem)
  }

  const handleBuyNow = () =>{
    if((selectedColor === "") && (product?.color?.length)){
      setColorSelected(false)
      return
    }

    setColorSelected(true)

    const cartItem = {
      productID: productDetails?.productID?._id,
      productName: productDetails?.productID?.productName,
      price: productDetails?.productID?.discountPrice || productDetails?.productID?.price,
      productImg: productDetails?.productID?.productImg,
      subCategory: productDetails?.productID?.subCategoryID?.subCategoryName,
      quantity: quantity,
    }

    if(selectedColor !== ""){
      cartItem.color = selectedColor
    }

    addToCart(cartItem)

    router.push("/cart")
  }

  return (
    <>
      <Breadcrumb pageTitle={product?.productName} />

      {/* <!-- Product Single Start --> */}
      <div className="single_product">
        <div className="container">
          <div className="single_product_wrapper">
            <div className="row no-gutters">
              <div className="col-lg-6">
                <Swiper
                  style={{
                    "--swiper-navigation-color": "#fff",
                    "--swiper-pagination-color": "#fff",
                  }}
                  loop={true}
                  spaceBetween={10}
                  thumbs={{ swiper: thumbsSwiper }}
                  modules={[FreeMode, Thumbs]}
                  className="mySwiper2"
                >
                  {productDetails?.productImgs?.map((img, idx) => (
                    <SwiperSlide key={idx}>
                      <img src={`https://api.abcpabnabd.com${img}`} alt="" />
                    </SwiperSlide>
                  ))}
                </Swiper>
                <Swiper
                  onSwiper={setThumbsSwiper}
                  loop={true}
                  spaceBetween={5}
                  slidesPerView={5}
                  freeMode={true}
                  watchSlidesProgress={true}
                  modules={[FreeMode, Thumbs]}
                  className="mySwiper"
                >
                  {productDetails?.productImgs?.map((img, idx) => (
                    <SwiperSlide key={idx}>
                      <img src={`https://api.abcpabnabd.com${img}`} alt="" />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              <div className="col-lg-6">
                {/* <!-- Product Details Section --> */}
                <div className="product_details_custom">
                  <h1>{product?.productName}</h1>
                  <div className="price">
                    <span className="discounted_price">
                    ৳{product?.discountPrice?.toLocaleString(2)}
                    </span>
                    <span className="original_price">৳{product?.price?.toLocaleString(2)}</span>
                  </div>

                  <div className="product_all_details">
                  <div className="availability_custom">
                      <div className="product_stock">
                        <span className="available">Available</span>
                        <p
                            className={`in_stock ${
                                product?.stock === 0 ? "text-danger" :""
                            }`}
                        >
                          : {" "}
                          <span>
                           {product?.stock > 0 ? "In Stock" : "Out of Stock"}
                        </span>
                        </p>
                      </div>

                      <div className="product_code">
                        <p>Product Code: {product?.productCode}</p>
                      </div>

                    </div>

                    <div className="key_feature">
                      <p>Key Features</p>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: productDetails?.keyFeature,
                        }}
                      ></div>
                    </div>
                  </div>


                    {
                      product?.stock !== 0 ? <>
                          {
                          product?.color?.length ? (
                          <>
                            <div className="select_color_custom">
                              <label>Select Color: {selectedColor}</label>
                              <div className="color_btn_container">
                                {product?.color?.map((color, idx) => (
                                  <button
                                    onClick={() => setSelectedColor(color)}
                                    key={idx}
                                    className={`color_btn ${
                                      selectedColor === color ? "active" : ""
                                    }`}
                                  >
                                    {color}
                                  </button>
                                ))}
      
                                <button
                                  onClick={() => setSelectedColor("")}
                                  className={`color_btn`}
                                >
                                  <LiaTimesSolid />
                                </button>
                              </div>
                              {
                                !colorSelected ? <span className="text-danger">*Select color first!</span> : <></>
                              }
                            </div>
                          </>
                          ) : <></>
                        }
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
                                value={quantity}
                                onChange={(e)=>setQuantity(e.target.value)}
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
                            <button className="add_to_cart" onClick={handleAddToCart}>
                              Add to Cart
                            </button>
                            <button className="buy_now" onClick={handleBuyNow}>
                              Buy Now
                            </button>
                          </div>
                        </div>

                        <div className="gift_receipt_custom">
                          <label>
                            <input type="checkbox" />
                            <span>Add a gift receipt for easy returns</span>
                          </label>
                        </div>
                      </> 
                      : 
                      <></>
                    }
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
            <div
              dangerouslySetInnerHTML={{
                __html: productDetails?.specification,
              }}
            ></div>
          </div>
        </div>
      </div>
      {/* <!-- Product DEs --> */}

      {/* <!-- Product Documents Start --> */}
      <div id="description" className="product_document">
        <div className="container">
          <div className="document">
            <h2 className="title">Description</h2>
            <div
              dangerouslySetInnerHTML={{
                __html: productDetails?.description,
              }}
            ></div>
          </div>
        </div>
      </div>
      {/* <!-- Product Documents End --> */}

      {/* <!-- Modal 1 --> */}
      <div id="myModal1" className="modal video_modal">
        <div className="modal-content">
          <span className="close" data-close="1">
            &times;
          </span>
          <iframe
            src="https://www.youtube.com/embed/2dEaJSw81jU?si=kpC8mPGS-4yFA-Hc"
            allow="fullscreen"
          ></iframe>
        </div>
      </div>
      {/* <!-- Modal 2 --> */}
      <div id="myModal2" className="modal video_modal">
        <div className="modal-content">
          <span className="close" data-close="2">
            &times;
          </span>
          <iframe
            src="https://www.youtube.com/embed/2dEaJSw81jU?si=kpC8mPGS-4yFA-Hc"
            allow="fullscreen"
          ></iframe>
        </div>
      </div>
      {/* <!-- Modal 3 --> */}
      <div id="myModal3" className="modal video_modal">
        <div className="modal-content">
          <span className="close" data-close="3">
            &times;
          </span>
          <iframe
            src="https://www.youtube.com/embed/2dEaJSw81jU?si=kpC8mPGS-4yFA-Hc"
            allow="fullscreen"
          ></iframe>
        </div>
      </div>
      {/* <!-- Modal 4 --> */}
      <div id="myModal4" className="modal video_modal">
        <div className="modal-content">
          <span className="close" data-close="4">
            &times;
          </span>
          <iframe
            src="https://www.youtube.com/embed/2dEaJSw81jU?si=kpC8mPGS-4yFA-Hc"
            allow="fullscreen"
          ></iframe>
        </div>
      </div>
      {/* <!-- Modal 4 --> */}
      <div id="myModal5" className="modal video_modal">
        <div className="modal-content">
          <span className="close" data-close="4">
            &times;
          </span>
          <iframe
            src="https://www.youtube.com/embed/2dEaJSw81jU?si=kpC8mPGS-4yFA-Hc"
            allow="fullscreen"
          ></iframe>
        </div>
      </div>

      {/* <!-- Product Video Slider End --> */}

      {/* <!-- More Product Start --> */}
      <section id="more_product">
        <div className="container">
          <div className="more_product_wrapper">
            <h2 className="heading">More Product</h2>

            <div className="row g-3 g-md-4">
              <div className="col-lg-3 col-sm-6 d-flex align-item-stretch">
                <div className="more_product_card">
                  <div className="product">
                    <img src={moreProduct1.src} alt="" />

                    <div className="product_icon">
                      <a
                        href="#"
                        className="icon"
                        id="quick_view"
                        data-bs-toggle="modal"
                        data-bs-target="#quickViewModal"
                      >
                        <svg
                          width="39"
                          height="27"
                          viewBox="0 0 39 27"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M19.5 1C10.8676 1 3.55869 6.24444 1 13.5C3.55869 20.7556 10.8676 26 19.5 26C28.1324 26 35.4413 20.7556 38 13.5C35.4413 6.24444 28.1324 1 19.5 1Z"
                            stroke="white"
                            strokeWidth="2"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M19 21C22.866 21 26 17.6421 26 13.5C26 9.35786 22.866 6 19 6C15.134 6 12 9.35786 12 13.5C12 17.6421 15.134 21 19 21Z"
                            stroke="white"
                            strokeWidth="2"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </a>
                      <a href="#" className="icon">
                        <svg
                          width="32"
                          height="32"
                          viewBox="0 0 32 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_1_35)">
                            <path
                              d="M24.3301 22.9997H13.5301C12.8711 23.001 12.23 22.7853 11.7058 22.3858C11.1817 21.9864 10.8036 21.4255 10.6301 20.7897L8.00007 11.2597C7.95962 11.1114 7.95392 10.9557 7.9834 10.8048C8.01289 10.654 8.07677 10.5119 8.17007 10.3897C8.26728 10.2632 8.39334 10.1618 8.53773 10.094C8.68212 10.0261 8.84065 9.9938 9.00007 9.99971H28.0001C28.147 9.99947 28.2921 10.0316 28.4252 10.0938C28.5583 10.156 28.6761 10.2468 28.7701 10.3597C28.8629 10.4727 28.9298 10.6047 28.9661 10.7464C29.0024 10.8881 29.0072 11.036 28.9801 11.1797L27.2801 20.5397C27.1537 21.2301 26.7894 21.8543 26.2504 22.3037C25.7114 22.7532 25.0319 22.9995 24.3301 22.9997ZM10.3301 11.9997L12.5801 20.2597C12.6387 20.4779 12.7694 20.6698 12.951 20.8041C13.1326 20.9385 13.3543 21.0074 13.5801 20.9997H24.3801C24.6169 21.0036 24.8473 20.9233 25.0305 20.7731C25.2136 20.6229 25.3375 20.4127 25.3801 20.1797L26.8001 11.9997H10.3301Z"
                              fill="#ffff"
                            />
                            <path
                              d="M9 12C8.77555 12.0083 8.55485 11.9408 8.37344 11.8084C8.19203 11.6759 8.06049 11.4863 8 11.27L6.45 5.73C6.38951 5.5137 6.25797 5.32406 6.07656 5.19163C5.89515 5.05921 5.67445 4.9917 5.45 5H4C3.73478 5 3.48043 4.89465 3.29289 4.70711C3.10536 4.51957 3 4.26522 3 4C3 3.73479 3.10536 3.48043 3.29289 3.2929C3.48043 3.10536 3.73478 3 4 3H5.49C6.1434 2.99908 6.77923 3.2115 7.30086 3.60498C7.8225 3.99846 8.20141 4.55149 8.38 5.18L10 10.73C10.0406 10.8613 10.0538 10.9996 10.0386 11.1362C10.0234 11.2729 9.98021 11.4049 9.9117 11.5241C9.8432 11.6432 9.75086 11.747 9.64045 11.8289C9.53004 11.9108 9.40393 11.969 9.27 12C9.18059 12.0146 9.08941 12.0146 9 12Z"
                              fill="#ffff"
                            />
                            <path
                              d="M16 29C15.6044 29 15.2178 28.8827 14.8889 28.6629C14.56 28.4432 14.3036 28.1308 14.1522 27.7654C14.0009 27.3999 13.9613 26.9978 14.0384 26.6098C14.1156 26.2219 14.3061 25.8655 14.5858 25.5858C14.8655 25.3061 15.2219 25.1156 15.6098 25.0384C15.9978 24.9613 16.3999 25.0009 16.7654 25.1522C17.1308 25.3036 17.4432 25.56 17.6629 25.8889C17.8827 26.2178 18 26.6044 18 27C18 27.5304 17.7893 28.0391 17.4142 28.4142C17.0391 28.7893 16.5304 29 16 29Z"
                              fill="#ffff"
                            />
                            <path
                              d="M22 29C21.6044 29 21.2178 28.8827 20.8889 28.6629C20.56 28.4432 20.3036 28.1308 20.1522 27.7654C20.0009 27.3999 19.9613 26.9978 20.0384 26.6098C20.1156 26.2219 20.3061 25.8655 20.5858 25.5858C20.8655 25.3061 21.2219 25.1156 21.6098 25.0384C21.9978 24.9613 22.3999 25.0009 22.7654 25.1522C23.1308 25.3036 23.4432 25.56 23.6629 25.8889C23.8827 26.2178 24 26.6044 24 27C24 27.5304 23.7893 28.0391 23.4142 28.4142C23.0391 28.7893 22.5304 29 22 29Z"
                              fill="#ffff"
                            />
                            <path
                              d="M22 17H16C15.7348 17 15.4804 16.8946 15.2929 16.7071C15.1054 16.5196 15 16.2652 15 16C15 15.7348 15.1054 15.4804 15.2929 15.2929C15.4804 15.1054 15.7348 15 16 15H22C22.2652 15 22.5196 15.1054 22.7071 15.2929C22.8946 15.4804 23 15.7348 23 16C23 16.2652 22.8946 16.5196 22.7071 16.7071C22.5196 16.8946 22.2652 17 22 17Z"
                              fill="#ffff"
                            />
                          </g>
                          <defs>
                            <clipPath>
                              <rect width="32" height="32" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </a>
                      <a href="#" className="icon">
                        <svg
                          width="36"
                          height="32"
                          viewBox="0 0 36 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M17.7046 32L17.1119 31.4641C3.6298 20.134 0 16.1531 0 9.64593C0 4.28708 4.22242 0 9.33378 0C13.6303 0 16.0748 2.52631 17.7046 4.44018C19.3343 2.52631 21.7788 0 26.0753 0C31.2608 0 35.4091 4.36363 35.4091 9.64593C35.4091 16.1531 31.7793 20.134 18.2972 31.4641L17.7046 32ZM9.33378 1.99042C5.25951 1.99042 1.92601 5.4354 1.92601 9.64593C1.92601 15.2344 5.33359 18.9091 17.7046 29.3971C30.0755 18.9091 33.4831 15.2344 33.4831 9.64593C33.4831 5.4354 30.1496 1.99042 26.0753 1.99042C22.3715 1.99042 20.3714 4.28708 18.8157 6.1244L17.7046 7.42584L16.5934 6.1244C15.0378 4.28708 13.0377 1.99042 9.33378 1.99042Z"
                            fill="white"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                  <div className="product_details">
                    <h3 className="product_name">Osmo DJI (Frist Edition)</h3>
                    <div className="price">
                      <span>$139.99</span>
                      <span className="discount">$149.99</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 d-flex align-item-stretch">
                <div className="more_product_card">
                  <div className="product">
                    <img src={moreProduct2.src} alt="" />

                    <div className="product_icon">
                      <a
                        href="#"
                        className="icon"
                        id="quick_view"
                        data-bs-toggle="modal"
                        data-bs-target="#quickViewModal"
                      >
                        <svg
                          width="39"
                          height="27"
                          viewBox="0 0 39 27"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M19.5 1C10.8676 1 3.55869 6.24444 1 13.5C3.55869 20.7556 10.8676 26 19.5 26C28.1324 26 35.4413 20.7556 38 13.5C35.4413 6.24444 28.1324 1 19.5 1Z"
                            stroke="white"
                            strokeWidth="2"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M19 21C22.866 21 26 17.6421 26 13.5C26 9.35786 22.866 6 19 6C15.134 6 12 9.35786 12 13.5C12 17.6421 15.134 21 19 21Z"
                            stroke="white"
                            strokeWidth="2"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </a>
                      <a href="#" className="icon">
                        <svg
                          width="32"
                          height="32"
                          viewBox="0 0 32 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_1_35)">
                            <path
                              d="M24.3301 22.9997H13.5301C12.8711 23.001 12.23 22.7853 11.7058 22.3858C11.1817 21.9864 10.8036 21.4255 10.6301 20.7897L8.00007 11.2597C7.95962 11.1114 7.95392 10.9557 7.9834 10.8048C8.01289 10.654 8.07677 10.5119 8.17007 10.3897C8.26728 10.2632 8.39334 10.1618 8.53773 10.094C8.68212 10.0261 8.84065 9.9938 9.00007 9.99971H28.0001C28.147 9.99947 28.2921 10.0316 28.4252 10.0938C28.5583 10.156 28.6761 10.2468 28.7701 10.3597C28.8629 10.4727 28.9298 10.6047 28.9661 10.7464C29.0024 10.8881 29.0072 11.036 28.9801 11.1797L27.2801 20.5397C27.1537 21.2301 26.7894 21.8543 26.2504 22.3037C25.7114 22.7532 25.0319 22.9995 24.3301 22.9997ZM10.3301 11.9997L12.5801 20.2597C12.6387 20.4779 12.7694 20.6698 12.951 20.8041C13.1326 20.9385 13.3543 21.0074 13.5801 20.9997H24.3801C24.6169 21.0036 24.8473 20.9233 25.0305 20.7731C25.2136 20.6229 25.3375 20.4127 25.3801 20.1797L26.8001 11.9997H10.3301Z"
                              fill="#ffff"
                            />
                            <path
                              d="M9 12C8.77555 12.0083 8.55485 11.9408 8.37344 11.8084C8.19203 11.6759 8.06049 11.4863 8 11.27L6.45 5.73C6.38951 5.5137 6.25797 5.32406 6.07656 5.19163C5.89515 5.05921 5.67445 4.9917 5.45 5H4C3.73478 5 3.48043 4.89465 3.29289 4.70711C3.10536 4.51957 3 4.26522 3 4C3 3.73479 3.10536 3.48043 3.29289 3.2929C3.48043 3.10536 3.73478 3 4 3H5.49C6.1434 2.99908 6.77923 3.2115 7.30086 3.60498C7.8225 3.99846 8.20141 4.55149 8.38 5.18L10 10.73C10.0406 10.8613 10.0538 10.9996 10.0386 11.1362C10.0234 11.2729 9.98021 11.4049 9.9117 11.5241C9.8432 11.6432 9.75086 11.747 9.64045 11.8289C9.53004 11.9108 9.40393 11.969 9.27 12C9.18059 12.0146 9.08941 12.0146 9 12Z"
                              fill="#ffff"
                            />
                            <path
                              d="M16 29C15.6044 29 15.2178 28.8827 14.8889 28.6629C14.56 28.4432 14.3036 28.1308 14.1522 27.7654C14.0009 27.3999 13.9613 26.9978 14.0384 26.6098C14.1156 26.2219 14.3061 25.8655 14.5858 25.5858C14.8655 25.3061 15.2219 25.1156 15.6098 25.0384C15.9978 24.9613 16.3999 25.0009 16.7654 25.1522C17.1308 25.3036 17.4432 25.56 17.6629 25.8889C17.8827 26.2178 18 26.6044 18 27C18 27.5304 17.7893 28.0391 17.4142 28.4142C17.0391 28.7893 16.5304 29 16 29Z"
                              fill="#ffff"
                            />
                            <path
                              d="M22 29C21.6044 29 21.2178 28.8827 20.8889 28.6629C20.56 28.4432 20.3036 28.1308 20.1522 27.7654C20.0009 27.3999 19.9613 26.9978 20.0384 26.6098C20.1156 26.2219 20.3061 25.8655 20.5858 25.5858C20.8655 25.3061 21.2219 25.1156 21.6098 25.0384C21.9978 24.9613 22.3999 25.0009 22.7654 25.1522C23.1308 25.3036 23.4432 25.56 23.6629 25.8889C23.8827 26.2178 24 26.6044 24 27C24 27.5304 23.7893 28.0391 23.4142 28.4142C23.0391 28.7893 22.5304 29 22 29Z"
                              fill="#ffff"
                            />
                            <path
                              d="M22 17H16C15.7348 17 15.4804 16.8946 15.2929 16.7071C15.1054 16.5196 15 16.2652 15 16C15 15.7348 15.1054 15.4804 15.2929 15.2929C15.4804 15.1054 15.7348 15 16 15H22C22.2652 15 22.5196 15.1054 22.7071 15.2929C22.8946 15.4804 23 15.7348 23 16C23 16.2652 22.8946 16.5196 22.7071 16.7071C22.5196 16.8946 22.2652 17 22 17Z"
                              fill="#ffff"
                            />
                          </g>
                          <defs>
                            <clipPath>
                              <rect width="32" height="32" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </a>
                      <a href="#" className="icon">
                        <svg
                          width="36"
                          height="32"
                          viewBox="0 0 36 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M17.7046 32L17.1119 31.4641C3.6298 20.134 0 16.1531 0 9.64593C0 4.28708 4.22242 0 9.33378 0C13.6303 0 16.0748 2.52631 17.7046 4.44018C19.3343 2.52631 21.7788 0 26.0753 0C31.2608 0 35.4091 4.36363 35.4091 9.64593C35.4091 16.1531 31.7793 20.134 18.2972 31.4641L17.7046 32ZM9.33378 1.99042C5.25951 1.99042 1.92601 5.4354 1.92601 9.64593C1.92601 15.2344 5.33359 18.9091 17.7046 29.3971C30.0755 18.9091 33.4831 15.2344 33.4831 9.64593C33.4831 5.4354 30.1496 1.99042 26.0753 1.99042C22.3715 1.99042 20.3714 4.28708 18.8157 6.1244L17.7046 7.42584L16.5934 6.1244C15.0378 4.28708 13.0377 1.99042 9.33378 1.99042Z"
                            fill="white"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                  <div className="product_details">
                    <h3 className="product_name">
                      DJI Mavic Pro Electric battery Rōnin Gimbal
                    </h3>
                    <div className="price">
                      <span>$49.99</span>
                      {/* <!-- <span className="discount">$149.99</span> --> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 d-flex align-item-stretch">
                <div className="more_product_card">
                  <div className="product">
                    <img src={moreProduct3.src} alt="" />

                    <div className="product_icon">
                      <a
                        href="#"
                        className="icon"
                        id="quick_view"
                        data-bs-toggle="modal"
                        data-bs-target="#quickViewModal"
                      >
                        <svg
                          width="39"
                          height="27"
                          viewBox="0 0 39 27"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M19.5 1C10.8676 1 3.55869 6.24444 1 13.5C3.55869 20.7556 10.8676 26 19.5 26C28.1324 26 35.4413 20.7556 38 13.5C35.4413 6.24444 28.1324 1 19.5 1Z"
                            stroke="white"
                            strokeWidth="2"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M19 21C22.866 21 26 17.6421 26 13.5C26 9.35786 22.866 6 19 6C15.134 6 12 9.35786 12 13.5C12 17.6421 15.134 21 19 21Z"
                            stroke="white"
                            strokeWidth="2"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </a>
                      <a href="#" className="icon">
                        <svg
                          width="32"
                          height="32"
                          viewBox="0 0 32 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_1_35)">
                            <path
                              d="M24.3301 22.9997H13.5301C12.8711 23.001 12.23 22.7853 11.7058 22.3858C11.1817 21.9864 10.8036 21.4255 10.6301 20.7897L8.00007 11.2597C7.95962 11.1114 7.95392 10.9557 7.9834 10.8048C8.01289 10.654 8.07677 10.5119 8.17007 10.3897C8.26728 10.2632 8.39334 10.1618 8.53773 10.094C8.68212 10.0261 8.84065 9.9938 9.00007 9.99971H28.0001C28.147 9.99947 28.2921 10.0316 28.4252 10.0938C28.5583 10.156 28.6761 10.2468 28.7701 10.3597C28.8629 10.4727 28.9298 10.6047 28.9661 10.7464C29.0024 10.8881 29.0072 11.036 28.9801 11.1797L27.2801 20.5397C27.1537 21.2301 26.7894 21.8543 26.2504 22.3037C25.7114 22.7532 25.0319 22.9995 24.3301 22.9997ZM10.3301 11.9997L12.5801 20.2597C12.6387 20.4779 12.7694 20.6698 12.951 20.8041C13.1326 20.9385 13.3543 21.0074 13.5801 20.9997H24.3801C24.6169 21.0036 24.8473 20.9233 25.0305 20.7731C25.2136 20.6229 25.3375 20.4127 25.3801 20.1797L26.8001 11.9997H10.3301Z"
                              fill="#ffff"
                            />
                            <path
                              d="M9 12C8.77555 12.0083 8.55485 11.9408 8.37344 11.8084C8.19203 11.6759 8.06049 11.4863 8 11.27L6.45 5.73C6.38951 5.5137 6.25797 5.32406 6.07656 5.19163C5.89515 5.05921 5.67445 4.9917 5.45 5H4C3.73478 5 3.48043 4.89465 3.29289 4.70711C3.10536 4.51957 3 4.26522 3 4C3 3.73479 3.10536 3.48043 3.29289 3.2929C3.48043 3.10536 3.73478 3 4 3H5.49C6.1434 2.99908 6.77923 3.2115 7.30086 3.60498C7.8225 3.99846 8.20141 4.55149 8.38 5.18L10 10.73C10.0406 10.8613 10.0538 10.9996 10.0386 11.1362C10.0234 11.2729 9.98021 11.4049 9.9117 11.5241C9.8432 11.6432 9.75086 11.747 9.64045 11.8289C9.53004 11.9108 9.40393 11.969 9.27 12C9.18059 12.0146 9.08941 12.0146 9 12Z"
                              fill="#ffff"
                            />
                            <path
                              d="M16 29C15.6044 29 15.2178 28.8827 14.8889 28.6629C14.56 28.4432 14.3036 28.1308 14.1522 27.7654C14.0009 27.3999 13.9613 26.9978 14.0384 26.6098C14.1156 26.2219 14.3061 25.8655 14.5858 25.5858C14.8655 25.3061 15.2219 25.1156 15.6098 25.0384C15.9978 24.9613 16.3999 25.0009 16.7654 25.1522C17.1308 25.3036 17.4432 25.56 17.6629 25.8889C17.8827 26.2178 18 26.6044 18 27C18 27.5304 17.7893 28.0391 17.4142 28.4142C17.0391 28.7893 16.5304 29 16 29Z"
                              fill="#ffff"
                            />
                            <path
                              d="M22 29C21.6044 29 21.2178 28.8827 20.8889 28.6629C20.56 28.4432 20.3036 28.1308 20.1522 27.7654C20.0009 27.3999 19.9613 26.9978 20.0384 26.6098C20.1156 26.2219 20.3061 25.8655 20.5858 25.5858C20.8655 25.3061 21.2219 25.1156 21.6098 25.0384C21.9978 24.9613 22.3999 25.0009 22.7654 25.1522C23.1308 25.3036 23.4432 25.56 23.6629 25.8889C23.8827 26.2178 24 26.6044 24 27C24 27.5304 23.7893 28.0391 23.4142 28.4142C23.0391 28.7893 22.5304 29 22 29Z"
                              fill="#ffff"
                            />
                            <path
                              d="M22 17H16C15.7348 17 15.4804 16.8946 15.2929 16.7071C15.1054 16.5196 15 16.2652 15 16C15 15.7348 15.1054 15.4804 15.2929 15.2929C15.4804 15.1054 15.7348 15 16 15H22C22.2652 15 22.5196 15.1054 22.7071 15.2929C22.8946 15.4804 23 15.7348 23 16C23 16.2652 22.8946 16.5196 22.7071 16.7071C22.5196 16.8946 22.2652 17 22 17Z"
                              fill="#ffff"
                            />
                          </g>
                          <defs>
                            <clipPath>
                              <rect width="32" height="32" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </a>
                      <a href="#" className="icon">
                        <svg
                          width="36"
                          height="32"
                          viewBox="0 0 36 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M17.7046 32L17.1119 31.4641C3.6298 20.134 0 16.1531 0 9.64593C0 4.28708 4.22242 0 9.33378 0C13.6303 0 16.0748 2.52631 17.7046 4.44018C19.3343 2.52631 21.7788 0 26.0753 0C31.2608 0 35.4091 4.36363 35.4091 9.64593C35.4091 16.1531 31.7793 20.134 18.2972 31.4641L17.7046 32ZM9.33378 1.99042C5.25951 1.99042 1.92601 5.4354 1.92601 9.64593C1.92601 15.2344 5.33359 18.9091 17.7046 29.3971C30.0755 18.9091 33.4831 15.2344 33.4831 9.64593C33.4831 5.4354 30.1496 1.99042 26.0753 1.99042C22.3715 1.99042 20.3714 4.28708 18.8157 6.1244L17.7046 7.42584L16.5934 6.1244C15.0378 4.28708 13.0377 1.99042 9.33378 1.99042Z"
                            fill="white"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                  <div className="product_details">
                    <h3 className="product_name">DJI Inspire 2 Pro</h3>
                    <div className="price">
                      <span>$1049.00</span>
                      {/* <!-- <span className="discount">$74.00</span> --> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 d-flex align-item-stretch">
                <div className="more_product_card">
                  <div className="product">
                    <img src={moreProduct4.src} alt="" />

                    <div className="product_icon">
                      <a
                        href="#"
                        className="icon"
                        id="quick_view"
                        data-bs-toggle="modal"
                        data-bs-target="#quickViewModal"
                      >
                        <svg
                          width="39"
                          height="27"
                          viewBox="0 0 39 27"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M19.5 1C10.8676 1 3.55869 6.24444 1 13.5C3.55869 20.7556 10.8676 26 19.5 26C28.1324 26 35.4413 20.7556 38 13.5C35.4413 6.24444 28.1324 1 19.5 1Z"
                            stroke="white"
                            strokeWidth="2"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M19 21C22.866 21 26 17.6421 26 13.5C26 9.35786 22.866 6 19 6C15.134 6 12 9.35786 12 13.5C12 17.6421 15.134 21 19 21Z"
                            stroke="white"
                            strokeWidth="2"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </a>
                      <a href="#" className="icon">
                        <svg
                          width="32"
                          height="32"
                          viewBox="0 0 32 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_1_35)">
                            <path
                              d="M24.3301 22.9997H13.5301C12.8711 23.001 12.23 22.7853 11.7058 22.3858C11.1817 21.9864 10.8036 21.4255 10.6301 20.7897L8.00007 11.2597C7.95962 11.1114 7.95392 10.9557 7.9834 10.8048C8.01289 10.654 8.07677 10.5119 8.17007 10.3897C8.26728 10.2632 8.39334 10.1618 8.53773 10.094C8.68212 10.0261 8.84065 9.9938 9.00007 9.99971H28.0001C28.147 9.99947 28.2921 10.0316 28.4252 10.0938C28.5583 10.156 28.6761 10.2468 28.7701 10.3597C28.8629 10.4727 28.9298 10.6047 28.9661 10.7464C29.0024 10.8881 29.0072 11.036 28.9801 11.1797L27.2801 20.5397C27.1537 21.2301 26.7894 21.8543 26.2504 22.3037C25.7114 22.7532 25.0319 22.9995 24.3301 22.9997ZM10.3301 11.9997L12.5801 20.2597C12.6387 20.4779 12.7694 20.6698 12.951 20.8041C13.1326 20.9385 13.3543 21.0074 13.5801 20.9997H24.3801C24.6169 21.0036 24.8473 20.9233 25.0305 20.7731C25.2136 20.6229 25.3375 20.4127 25.3801 20.1797L26.8001 11.9997H10.3301Z"
                              fill="#ffff"
                            />
                            <path
                              d="M9 12C8.77555 12.0083 8.55485 11.9408 8.37344 11.8084C8.19203 11.6759 8.06049 11.4863 8 11.27L6.45 5.73C6.38951 5.5137 6.25797 5.32406 6.07656 5.19163C5.89515 5.05921 5.67445 4.9917 5.45 5H4C3.73478 5 3.48043 4.89465 3.29289 4.70711C3.10536 4.51957 3 4.26522 3 4C3 3.73479 3.10536 3.48043 3.29289 3.2929C3.48043 3.10536 3.73478 3 4 3H5.49C6.1434 2.99908 6.77923 3.2115 7.30086 3.60498C7.8225 3.99846 8.20141 4.55149 8.38 5.18L10 10.73C10.0406 10.8613 10.0538 10.9996 10.0386 11.1362C10.0234 11.2729 9.98021 11.4049 9.9117 11.5241C9.8432 11.6432 9.75086 11.747 9.64045 11.8289C9.53004 11.9108 9.40393 11.969 9.27 12C9.18059 12.0146 9.08941 12.0146 9 12Z"
                              fill="#ffff"
                            />
                            <path
                              d="M16 29C15.6044 29 15.2178 28.8827 14.8889 28.6629C14.56 28.4432 14.3036 28.1308 14.1522 27.7654C14.0009 27.3999 13.9613 26.9978 14.0384 26.6098C14.1156 26.2219 14.3061 25.8655 14.5858 25.5858C14.8655 25.3061 15.2219 25.1156 15.6098 25.0384C15.9978 24.9613 16.3999 25.0009 16.7654 25.1522C17.1308 25.3036 17.4432 25.56 17.6629 25.8889C17.8827 26.2178 18 26.6044 18 27C18 27.5304 17.7893 28.0391 17.4142 28.4142C17.0391 28.7893 16.5304 29 16 29Z"
                              fill="#ffff"
                            />
                            <path
                              d="M22 29C21.6044 29 21.2178 28.8827 20.8889 28.6629C20.56 28.4432 20.3036 28.1308 20.1522 27.7654C20.0009 27.3999 19.9613 26.9978 20.0384 26.6098C20.1156 26.2219 20.3061 25.8655 20.5858 25.5858C20.8655 25.3061 21.2219 25.1156 21.6098 25.0384C21.9978 24.9613 22.3999 25.0009 22.7654 25.1522C23.1308 25.3036 23.4432 25.56 23.6629 25.8889C23.8827 26.2178 24 26.6044 24 27C24 27.5304 23.7893 28.0391 23.4142 28.4142C23.0391 28.7893 22.5304 29 22 29Z"
                              fill="#ffff"
                            />
                            <path
                              d="M22 17H16C15.7348 17 15.4804 16.8946 15.2929 16.7071C15.1054 16.5196 15 16.2652 15 16C15 15.7348 15.1054 15.4804 15.2929 15.2929C15.4804 15.1054 15.7348 15 16 15H22C22.2652 15 22.5196 15.1054 22.7071 15.2929C22.8946 15.4804 23 15.7348 23 16C23 16.2652 22.8946 16.5196 22.7071 16.7071C22.5196 16.8946 22.2652 17 22 17Z"
                              fill="#ffff"
                            />
                          </g>
                          <defs>
                            <clipPath>
                              <rect width="32" height="32" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </a>
                      <a href="#" className="icon">
                        <svg
                          width="36"
                          height="32"
                          viewBox="0 0 36 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M17.7046 32L17.1119 31.4641C3.6298 20.134 0 16.1531 0 9.64593C0 4.28708 4.22242 0 9.33378 0C13.6303 0 16.0748 2.52631 17.7046 4.44018C19.3343 2.52631 21.7788 0 26.0753 0C31.2608 0 35.4091 4.36363 35.4091 9.64593C35.4091 16.1531 31.7793 20.134 18.2972 31.4641L17.7046 32ZM9.33378 1.99042C5.25951 1.99042 1.92601 5.4354 1.92601 9.64593C1.92601 15.2344 5.33359 18.9091 17.7046 29.3971C30.0755 18.9091 33.4831 15.2344 33.4831 9.64593C33.4831 5.4354 30.1496 1.99042 26.0753 1.99042C22.3715 1.99042 20.3714 4.28708 18.8157 6.1244L17.7046 7.42584L16.5934 6.1244C15.0378 4.28708 13.0377 1.99042 9.33378 1.99042Z"
                            fill="white"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                  <div className="product_details">
                    <h3 className="product_name">DJI - Spark</h3>
                    <div className="price">
                      <span>$500.00</span>
                      {/* <!-- <span className="discount">$79.00</span> --> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="modal fade"
        id="quickViewModal"
        tabIndex="-1"
        aria-labelledby="quickViewModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal_header">
              <h5 className="modal_title" id="quickViewModalLabel">
                DJI Osmo Mobile 6
              </h5>
            </div>
            <div className="modal_body">
              <div className="product">
                <img
                  src={moreProduct1.src}
                  alt="DJI Osmo Mobile 6"
                  className="img-fluid"
                />
              </div>
              <p>
                The DJI Osmo Mobile 6 is an intelligent gimbal packed with
                creative features. Capture smooth video and dynamic footage
                effortlessly.
              </p>
              <div className="price">
                <span className="price1">৳149.99</span>
                <span className="price2 text-muted">৳169.99</span>
              </div>
            </div>
            <div className="modal_footer">
              <button
                type="button"
                className="btn close_btn"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <a href="./product-single.html" className="btn details_btn">
                View Details
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- More Product End --> */}

      {/* <!-- Recent Shopping Slider Start --> */}
      <div id="recent_shopping">
        <div className="container">
          <div className="heading">
            <div>
              <h2>Recent Shopping Trends</h2>
            </div>
          </div>

          <div className="carousel-container">
            <div className="owl-carousel owl-theme shopping-carousel">
              <div className="item">
                <div className="recent_shopping_card">
                  <div className="product">
                    <img src={recentImg1.src} alt="" />
                    <span className="product_status">New</span>

                    <div className="product_icon">
                      <a
                        href="#"
                        className="icon"
                        id="quick_view"
                        data-bs-toggle="modal"
                        data-bs-target="#quickViewModal"
                      >
                        <svg
                          width="39"
                          height="27"
                          viewBox="0 0 39 27"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M19.5 1C10.8676 1 3.55869 6.24444 1 13.5C3.55869 20.7556 10.8676 26 19.5 26C28.1324 26 35.4413 20.7556 38 13.5C35.4413 6.24444 28.1324 1 19.5 1Z"
                            stroke="white"
                            strokeWidth="2"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M19 21C22.866 21 26 17.6421 26 13.5C26 9.35786 22.866 6 19 6C15.134 6 12 9.35786 12 13.5C12 17.6421 15.134 21 19 21Z"
                            stroke="white"
                            strokeWidth="2"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </a>
                      <a href="#" className="icon">
                        <svg
                          width="32"
                          height="32"
                          viewBox="0 0 32 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_1_35)">
                            <path
                              d="M24.3301 22.9997H13.5301C12.8711 23.001 12.23 22.7853 11.7058 22.3858C11.1817 21.9864 10.8036 21.4255 10.6301 20.7897L8.00007 11.2597C7.95962 11.1114 7.95392 10.9557 7.9834 10.8048C8.01289 10.654 8.07677 10.5119 8.17007 10.3897C8.26728 10.2632 8.39334 10.1618 8.53773 10.094C8.68212 10.0261 8.84065 9.9938 9.00007 9.99971H28.0001C28.147 9.99947 28.2921 10.0316 28.4252 10.0938C28.5583 10.156 28.6761 10.2468 28.7701 10.3597C28.8629 10.4727 28.9298 10.6047 28.9661 10.7464C29.0024 10.8881 29.0072 11.036 28.9801 11.1797L27.2801 20.5397C27.1537 21.2301 26.7894 21.8543 26.2504 22.3037C25.7114 22.7532 25.0319 22.9995 24.3301 22.9997ZM10.3301 11.9997L12.5801 20.2597C12.6387 20.4779 12.7694 20.6698 12.951 20.8041C13.1326 20.9385 13.3543 21.0074 13.5801 20.9997H24.3801C24.6169 21.0036 24.8473 20.9233 25.0305 20.7731C25.2136 20.6229 25.3375 20.4127 25.3801 20.1797L26.8001 11.9997H10.3301Z"
                              fill="#ffff"
                            />
                            <path
                              d="M9 12C8.77555 12.0083 8.55485 11.9408 8.37344 11.8084C8.19203 11.6759 8.06049 11.4863 8 11.27L6.45 5.73C6.38951 5.5137 6.25797 5.32406 6.07656 5.19163C5.89515 5.05921 5.67445 4.9917 5.45 5H4C3.73478 5 3.48043 4.89465 3.29289 4.70711C3.10536 4.51957 3 4.26522 3 4C3 3.73479 3.10536 3.48043 3.29289 3.2929C3.48043 3.10536 3.73478 3 4 3H5.49C6.1434 2.99908 6.77923 3.2115 7.30086 3.60498C7.8225 3.99846 8.20141 4.55149 8.38 5.18L10 10.73C10.0406 10.8613 10.0538 10.9996 10.0386 11.1362C10.0234 11.2729 9.98021 11.4049 9.9117 11.5241C9.8432 11.6432 9.75086 11.747 9.64045 11.8289C9.53004 11.9108 9.40393 11.969 9.27 12C9.18059 12.0146 9.08941 12.0146 9 12Z"
                              fill="#ffff"
                            />
                            <path
                              d="M16 29C15.6044 29 15.2178 28.8827 14.8889 28.6629C14.56 28.4432 14.3036 28.1308 14.1522 27.7654C14.0009 27.3999 13.9613 26.9978 14.0384 26.6098C14.1156 26.2219 14.3061 25.8655 14.5858 25.5858C14.8655 25.3061 15.2219 25.1156 15.6098 25.0384C15.9978 24.9613 16.3999 25.0009 16.7654 25.1522C17.1308 25.3036 17.4432 25.56 17.6629 25.8889C17.8827 26.2178 18 26.6044 18 27C18 27.5304 17.7893 28.0391 17.4142 28.4142C17.0391 28.7893 16.5304 29 16 29Z"
                              fill="#ffff"
                            />
                            <path
                              d="M22 29C21.6044 29 21.2178 28.8827 20.8889 28.6629C20.56 28.4432 20.3036 28.1308 20.1522 27.7654C20.0009 27.3999 19.9613 26.9978 20.0384 26.6098C20.1156 26.2219 20.3061 25.8655 20.5858 25.5858C20.8655 25.3061 21.2219 25.1156 21.6098 25.0384C21.9978 24.9613 22.3999 25.0009 22.7654 25.1522C23.1308 25.3036 23.4432 25.56 23.6629 25.8889C23.8827 26.2178 24 26.6044 24 27C24 27.5304 23.7893 28.0391 23.4142 28.4142C23.0391 28.7893 22.5304 29 22 29Z"
                              fill="#ffff"
                            />
                            <path
                              d="M22 17H16C15.7348 17 15.4804 16.8946 15.2929 16.7071C15.1054 16.5196 15 16.2652 15 16C15 15.7348 15.1054 15.4804 15.2929 15.2929C15.4804 15.1054 15.7348 15 16 15H22C22.2652 15 22.5196 15.1054 22.7071 15.2929C22.8946 15.4804 23 15.7348 23 16C23 16.2652 22.8946 16.5196 22.7071 16.7071C22.5196 16.8946 22.2652 17 22 17Z"
                              fill="#ffff"
                            />
                          </g>
                          <defs>
                            <clipPath>
                              <rect width="32" height="32" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </a>
                      <a href="#" className="icon">
                        <svg
                          width="36"
                          height="32"
                          viewBox="0 0 36 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M17.7046 32L17.1119 31.4641C3.6298 20.134 0 16.1531 0 9.64593C0 4.28708 4.22242 0 9.33378 0C13.6303 0 16.0748 2.52631 17.7046 4.44018C19.3343 2.52631 21.7788 0 26.0753 0C31.2608 0 35.4091 4.36363 35.4091 9.64593C35.4091 16.1531 31.7793 20.134 18.2972 31.4641L17.7046 32ZM9.33378 1.99042C5.25951 1.99042 1.92601 5.4354 1.92601 9.64593C1.92601 15.2344 5.33359 18.9091 17.7046 29.3971C30.0755 18.9091 33.4831 15.2344 33.4831 9.64593C33.4831 5.4354 30.1496 1.99042 26.0753 1.99042C22.3715 1.99042 20.3714 4.28708 18.8157 6.1244L17.7046 7.42584L16.5934 6.1244C15.0378 4.28708 13.0377 1.99042 9.33378 1.99042Z"
                            fill="white"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                  <div className="product_details">
                    <h3 className="product_name">Adico- Smart Watch</h3>
                    <div className="price">
                      <span>$129.99</span>
                      {/* <!-- <span className="discount">$199.99</span> --> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="recent_shopping_card">
                  <div className="product">
                    <img src={recentImg2.src} alt="" />
                    <span className="product_status_parcent">6%</span>

                    <div className="product_icon">
                      <a
                        href="#"
                        className="icon"
                        id="quick_view"
                        data-bs-toggle="modal"
                        data-bs-target="#quickViewModal"
                      >
                        <svg
                          width="39"
                          height="27"
                          viewBox="0 0 39 27"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M19.5 1C10.8676 1 3.55869 6.24444 1 13.5C3.55869 20.7556 10.8676 26 19.5 26C28.1324 26 35.4413 20.7556 38 13.5C35.4413 6.24444 28.1324 1 19.5 1Z"
                            stroke="white"
                            strokeWidth="2"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M19 21C22.866 21 26 17.6421 26 13.5C26 9.35786 22.866 6 19 6C15.134 6 12 9.35786 12 13.5C12 17.6421 15.134 21 19 21Z"
                            stroke="white"
                            strokeWidth="2"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </a>
                      <a href="#" className="icon">
                        <svg
                          width="32"
                          height="32"
                          viewBox="0 0 32 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_1_35)">
                            <path
                              d="M24.3301 22.9997H13.5301C12.8711 23.001 12.23 22.7853 11.7058 22.3858C11.1817 21.9864 10.8036 21.4255 10.6301 20.7897L8.00007 11.2597C7.95962 11.1114 7.95392 10.9557 7.9834 10.8048C8.01289 10.654 8.07677 10.5119 8.17007 10.3897C8.26728 10.2632 8.39334 10.1618 8.53773 10.094C8.68212 10.0261 8.84065 9.9938 9.00007 9.99971H28.0001C28.147 9.99947 28.2921 10.0316 28.4252 10.0938C28.5583 10.156 28.6761 10.2468 28.7701 10.3597C28.8629 10.4727 28.9298 10.6047 28.9661 10.7464C29.0024 10.8881 29.0072 11.036 28.9801 11.1797L27.2801 20.5397C27.1537 21.2301 26.7894 21.8543 26.2504 22.3037C25.7114 22.7532 25.0319 22.9995 24.3301 22.9997ZM10.3301 11.9997L12.5801 20.2597C12.6387 20.4779 12.7694 20.6698 12.951 20.8041C13.1326 20.9385 13.3543 21.0074 13.5801 20.9997H24.3801C24.6169 21.0036 24.8473 20.9233 25.0305 20.7731C25.2136 20.6229 25.3375 20.4127 25.3801 20.1797L26.8001 11.9997H10.3301Z"
                              fill="#ffff"
                            />
                            <path
                              d="M9 12C8.77555 12.0083 8.55485 11.9408 8.37344 11.8084C8.19203 11.6759 8.06049 11.4863 8 11.27L6.45 5.73C6.38951 5.5137 6.25797 5.32406 6.07656 5.19163C5.89515 5.05921 5.67445 4.9917 5.45 5H4C3.73478 5 3.48043 4.89465 3.29289 4.70711C3.10536 4.51957 3 4.26522 3 4C3 3.73479 3.10536 3.48043 3.29289 3.2929C3.48043 3.10536 3.73478 3 4 3H5.49C6.1434 2.99908 6.77923 3.2115 7.30086 3.60498C7.8225 3.99846 8.20141 4.55149 8.38 5.18L10 10.73C10.0406 10.8613 10.0538 10.9996 10.0386 11.1362C10.0234 11.2729 9.98021 11.4049 9.9117 11.5241C9.8432 11.6432 9.75086 11.747 9.64045 11.8289C9.53004 11.9108 9.40393 11.969 9.27 12C9.18059 12.0146 9.08941 12.0146 9 12Z"
                              fill="#ffff"
                            />
                            <path
                              d="M16 29C15.6044 29 15.2178 28.8827 14.8889 28.6629C14.56 28.4432 14.3036 28.1308 14.1522 27.7654C14.0009 27.3999 13.9613 26.9978 14.0384 26.6098C14.1156 26.2219 14.3061 25.8655 14.5858 25.5858C14.8655 25.3061 15.2219 25.1156 15.6098 25.0384C15.9978 24.9613 16.3999 25.0009 16.7654 25.1522C17.1308 25.3036 17.4432 25.56 17.6629 25.8889C17.8827 26.2178 18 26.6044 18 27C18 27.5304 17.7893 28.0391 17.4142 28.4142C17.0391 28.7893 16.5304 29 16 29Z"
                              fill="#ffff"
                            />
                            <path
                              d="M22 29C21.6044 29 21.2178 28.8827 20.8889 28.6629C20.56 28.4432 20.3036 28.1308 20.1522 27.7654C20.0009 27.3999 19.9613 26.9978 20.0384 26.6098C20.1156 26.2219 20.3061 25.8655 20.5858 25.5858C20.8655 25.3061 21.2219 25.1156 21.6098 25.0384C21.9978 24.9613 22.3999 25.0009 22.7654 25.1522C23.1308 25.3036 23.4432 25.56 23.6629 25.8889C23.8827 26.2178 24 26.6044 24 27C24 27.5304 23.7893 28.0391 23.4142 28.4142C23.0391 28.7893 22.5304 29 22 29Z"
                              fill="#ffff"
                            />
                            <path
                              d="M22 17H16C15.7348 17 15.4804 16.8946 15.2929 16.7071C15.1054 16.5196 15 16.2652 15 16C15 15.7348 15.1054 15.4804 15.2929 15.2929C15.4804 15.1054 15.7348 15 16 15H22C22.2652 15 22.5196 15.1054 22.7071 15.2929C22.8946 15.4804 23 15.7348 23 16C23 16.2652 22.8946 16.5196 22.7071 16.7071C22.5196 16.8946 22.2652 17 22 17Z"
                              fill="#ffff"
                            />
                          </g>
                          <defs>
                            <clipPath>
                              <rect width="32" height="32" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </a>
                      <a href="#" className="icon">
                        <svg
                          width="36"
                          height="32"
                          viewBox="0 0 36 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M17.7046 32L17.1119 31.4641C3.6298 20.134 0 16.1531 0 9.64593C0 4.28708 4.22242 0 9.33378 0C13.6303 0 16.0748 2.52631 17.7046 4.44018C19.3343 2.52631 21.7788 0 26.0753 0C31.2608 0 35.4091 4.36363 35.4091 9.64593C35.4091 16.1531 31.7793 20.134 18.2972 31.4641L17.7046 32ZM9.33378 1.99042C5.25951 1.99042 1.92601 5.4354 1.92601 9.64593C1.92601 15.2344 5.33359 18.9091 17.7046 29.3971C30.0755 18.9091 33.4831 15.2344 33.4831 9.64593C33.4831 5.4354 30.1496 1.99042 26.0753 1.99042C22.3715 1.99042 20.3714 4.28708 18.8157 6.1244L17.7046 7.42584L16.5934 6.1244C15.0378 4.28708 13.0377 1.99042 9.33378 1.99042Z"
                            fill="white"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                  <div className="product_details">
                    <h3 className="product_name">Osmo DJI (Frist Edition)</h3>
                    <div className="price">
                      <span>$139.99</span>
                      <span className="discount">$149.99</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="recent_shopping_card">
                  <div className="product">
                    <img src={recentImg3.src} alt="" />
                    <span className="product_status">New</span>

                    <div className="product_icon">
                      <a
                        href="#"
                        className="icon"
                        id="quick_view"
                        data-bs-toggle="modal"
                        data-bs-target="#quickViewModal"
                      >
                        <svg
                          width="39"
                          height="27"
                          viewBox="0 0 39 27"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M19.5 1C10.8676 1 3.55869 6.24444 1 13.5C3.55869 20.7556 10.8676 26 19.5 26C28.1324 26 35.4413 20.7556 38 13.5C35.4413 6.24444 28.1324 1 19.5 1Z"
                            stroke="white"
                            strokeWidth="2"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M19 21C22.866 21 26 17.6421 26 13.5C26 9.35786 22.866 6 19 6C15.134 6 12 9.35786 12 13.5C12 17.6421 15.134 21 19 21Z"
                            stroke="white"
                            strokeWidth="2"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </a>
                      <a href="#" className="icon">
                        <svg
                          width="32"
                          height="32"
                          viewBox="0 0 32 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_1_35)">
                            <path
                              d="M24.3301 22.9997H13.5301C12.8711 23.001 12.23 22.7853 11.7058 22.3858C11.1817 21.9864 10.8036 21.4255 10.6301 20.7897L8.00007 11.2597C7.95962 11.1114 7.95392 10.9557 7.9834 10.8048C8.01289 10.654 8.07677 10.5119 8.17007 10.3897C8.26728 10.2632 8.39334 10.1618 8.53773 10.094C8.68212 10.0261 8.84065 9.9938 9.00007 9.99971H28.0001C28.147 9.99947 28.2921 10.0316 28.4252 10.0938C28.5583 10.156 28.6761 10.2468 28.7701 10.3597C28.8629 10.4727 28.9298 10.6047 28.9661 10.7464C29.0024 10.8881 29.0072 11.036 28.9801 11.1797L27.2801 20.5397C27.1537 21.2301 26.7894 21.8543 26.2504 22.3037C25.7114 22.7532 25.0319 22.9995 24.3301 22.9997ZM10.3301 11.9997L12.5801 20.2597C12.6387 20.4779 12.7694 20.6698 12.951 20.8041C13.1326 20.9385 13.3543 21.0074 13.5801 20.9997H24.3801C24.6169 21.0036 24.8473 20.9233 25.0305 20.7731C25.2136 20.6229 25.3375 20.4127 25.3801 20.1797L26.8001 11.9997H10.3301Z"
                              fill="#ffff"
                            />
                            <path
                              d="M9 12C8.77555 12.0083 8.55485 11.9408 8.37344 11.8084C8.19203 11.6759 8.06049 11.4863 8 11.27L6.45 5.73C6.38951 5.5137 6.25797 5.32406 6.07656 5.19163C5.89515 5.05921 5.67445 4.9917 5.45 5H4C3.73478 5 3.48043 4.89465 3.29289 4.70711C3.10536 4.51957 3 4.26522 3 4C3 3.73479 3.10536 3.48043 3.29289 3.2929C3.48043 3.10536 3.73478 3 4 3H5.49C6.1434 2.99908 6.77923 3.2115 7.30086 3.60498C7.8225 3.99846 8.20141 4.55149 8.38 5.18L10 10.73C10.0406 10.8613 10.0538 10.9996 10.0386 11.1362C10.0234 11.2729 9.98021 11.4049 9.9117 11.5241C9.8432 11.6432 9.75086 11.747 9.64045 11.8289C9.53004 11.9108 9.40393 11.969 9.27 12C9.18059 12.0146 9.08941 12.0146 9 12Z"
                              fill="#ffff"
                            />
                            <path
                              d="M16 29C15.6044 29 15.2178 28.8827 14.8889 28.6629C14.56 28.4432 14.3036 28.1308 14.1522 27.7654C14.0009 27.3999 13.9613 26.9978 14.0384 26.6098C14.1156 26.2219 14.3061 25.8655 14.5858 25.5858C14.8655 25.3061 15.2219 25.1156 15.6098 25.0384C15.9978 24.9613 16.3999 25.0009 16.7654 25.1522C17.1308 25.3036 17.4432 25.56 17.6629 25.8889C17.8827 26.2178 18 26.6044 18 27C18 27.5304 17.7893 28.0391 17.4142 28.4142C17.0391 28.7893 16.5304 29 16 29Z"
                              fill="#ffff"
                            />
                            <path
                              d="M22 29C21.6044 29 21.2178 28.8827 20.8889 28.6629C20.56 28.4432 20.3036 28.1308 20.1522 27.7654C20.0009 27.3999 19.9613 26.9978 20.0384 26.6098C20.1156 26.2219 20.3061 25.8655 20.5858 25.5858C20.8655 25.3061 21.2219 25.1156 21.6098 25.0384C21.9978 24.9613 22.3999 25.0009 22.7654 25.1522C23.1308 25.3036 23.4432 25.56 23.6629 25.8889C23.8827 26.2178 24 26.6044 24 27C24 27.5304 23.7893 28.0391 23.4142 28.4142C23.0391 28.7893 22.5304 29 22 29Z"
                              fill="#ffff"
                            />
                            <path
                              d="M22 17H16C15.7348 17 15.4804 16.8946 15.2929 16.7071C15.1054 16.5196 15 16.2652 15 16C15 15.7348 15.1054 15.4804 15.2929 15.2929C15.4804 15.1054 15.7348 15 16 15H22C22.2652 15 22.5196 15.1054 22.7071 15.2929C22.8946 15.4804 23 15.7348 23 16C23 16.2652 22.8946 16.5196 22.7071 16.7071C22.5196 16.8946 22.2652 17 22 17Z"
                              fill="#ffff"
                            />
                          </g>
                          <defs>
                            <clipPath>
                              <rect width="32" height="32" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </a>
                      <a href="#" className="icon">
                        <svg
                          width="36"
                          height="32"
                          viewBox="0 0 36 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M17.7046 32L17.1119 31.4641C3.6298 20.134 0 16.1531 0 9.64593C0 4.28708 4.22242 0 9.33378 0C13.6303 0 16.0748 2.52631 17.7046 4.44018C19.3343 2.52631 21.7788 0 26.0753 0C31.2608 0 35.4091 4.36363 35.4091 9.64593C35.4091 16.1531 31.7793 20.134 18.2972 31.4641L17.7046 32ZM9.33378 1.99042C5.25951 1.99042 1.92601 5.4354 1.92601 9.64593C1.92601 15.2344 5.33359 18.9091 17.7046 29.3971C30.0755 18.9091 33.4831 15.2344 33.4831 9.64593C33.4831 5.4354 30.1496 1.99042 26.0753 1.99042C22.3715 1.99042 20.3714 4.28708 18.8157 6.1244L17.7046 7.42584L16.5934 6.1244C15.0378 4.28708 13.0377 1.99042 9.33378 1.99042Z"
                            fill="white"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                  <div className="product_details">
                    <h3 className="product_name">CAUGAR- Gaming Headphones</h3>
                    <div className="price">
                      <span>$54.00</span>
                      <span className="discount">$74.00</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="recent_shopping_card">
                  <div className="product">
                    <img src={recentImg4.src} alt="" />
                    <span className="sold_out">Sold out</span>

                    <div className="product_icon">
                      <a
                        href="#"
                        className="icon"
                        id="quick_view"
                        data-bs-toggle="modal"
                        data-bs-target="#quickViewModal"
                      >
                        <svg
                          width="39"
                          height="27"
                          viewBox="0 0 39 27"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M19.5 1C10.8676 1 3.55869 6.24444 1 13.5C3.55869 20.7556 10.8676 26 19.5 26C28.1324 26 35.4413 20.7556 38 13.5C35.4413 6.24444 28.1324 1 19.5 1Z"
                            stroke="white"
                            strokeWidth="2"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M19 21C22.866 21 26 17.6421 26 13.5C26 9.35786 22.866 6 19 6C15.134 6 12 9.35786 12 13.5C12 17.6421 15.134 21 19 21Z"
                            stroke="white"
                            strokeWidth="2"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </a>
                      <a href="#" className="icon">
                        <svg
                          width="32"
                          height="32"
                          viewBox="0 0 32 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_1_35)">
                            <path
                              d="M24.3301 22.9997H13.5301C12.8711 23.001 12.23 22.7853 11.7058 22.3858C11.1817 21.9864 10.8036 21.4255 10.6301 20.7897L8.00007 11.2597C7.95962 11.1114 7.95392 10.9557 7.9834 10.8048C8.01289 10.654 8.07677 10.5119 8.17007 10.3897C8.26728 10.2632 8.39334 10.1618 8.53773 10.094C8.68212 10.0261 8.84065 9.9938 9.00007 9.99971H28.0001C28.147 9.99947 28.2921 10.0316 28.4252 10.0938C28.5583 10.156 28.6761 10.2468 28.7701 10.3597C28.8629 10.4727 28.9298 10.6047 28.9661 10.7464C29.0024 10.8881 29.0072 11.036 28.9801 11.1797L27.2801 20.5397C27.1537 21.2301 26.7894 21.8543 26.2504 22.3037C25.7114 22.7532 25.0319 22.9995 24.3301 22.9997ZM10.3301 11.9997L12.5801 20.2597C12.6387 20.4779 12.7694 20.6698 12.951 20.8041C13.1326 20.9385 13.3543 21.0074 13.5801 20.9997H24.3801C24.6169 21.0036 24.8473 20.9233 25.0305 20.7731C25.2136 20.6229 25.3375 20.4127 25.3801 20.1797L26.8001 11.9997H10.3301Z"
                              fill="#ffff"
                            />
                            <path
                              d="M9 12C8.77555 12.0083 8.55485 11.9408 8.37344 11.8084C8.19203 11.6759 8.06049 11.4863 8 11.27L6.45 5.73C6.38951 5.5137 6.25797 5.32406 6.07656 5.19163C5.89515 5.05921 5.67445 4.9917 5.45 5H4C3.73478 5 3.48043 4.89465 3.29289 4.70711C3.10536 4.51957 3 4.26522 3 4C3 3.73479 3.10536 3.48043 3.29289 3.2929C3.48043 3.10536 3.73478 3 4 3H5.49C6.1434 2.99908 6.77923 3.2115 7.30086 3.60498C7.8225 3.99846 8.20141 4.55149 8.38 5.18L10 10.73C10.0406 10.8613 10.0538 10.9996 10.0386 11.1362C10.0234 11.2729 9.98021 11.4049 9.9117 11.5241C9.8432 11.6432 9.75086 11.747 9.64045 11.8289C9.53004 11.9108 9.40393 11.969 9.27 12C9.18059 12.0146 9.08941 12.0146 9 12Z"
                              fill="#ffff"
                            />
                            <path
                              d="M16 29C15.6044 29 15.2178 28.8827 14.8889 28.6629C14.56 28.4432 14.3036 28.1308 14.1522 27.7654C14.0009 27.3999 13.9613 26.9978 14.0384 26.6098C14.1156 26.2219 14.3061 25.8655 14.5858 25.5858C14.8655 25.3061 15.2219 25.1156 15.6098 25.0384C15.9978 24.9613 16.3999 25.0009 16.7654 25.1522C17.1308 25.3036 17.4432 25.56 17.6629 25.8889C17.8827 26.2178 18 26.6044 18 27C18 27.5304 17.7893 28.0391 17.4142 28.4142C17.0391 28.7893 16.5304 29 16 29Z"
                              fill="#ffff"
                            />
                            <path
                              d="M22 29C21.6044 29 21.2178 28.8827 20.8889 28.6629C20.56 28.4432 20.3036 28.1308 20.1522 27.7654C20.0009 27.3999 19.9613 26.9978 20.0384 26.6098C20.1156 26.2219 20.3061 25.8655 20.5858 25.5858C20.8655 25.3061 21.2219 25.1156 21.6098 25.0384C21.9978 24.9613 22.3999 25.0009 22.7654 25.1522C23.1308 25.3036 23.4432 25.56 23.6629 25.8889C23.8827 26.2178 24 26.6044 24 27C24 27.5304 23.7893 28.0391 23.4142 28.4142C23.0391 28.7893 22.5304 29 22 29Z"
                              fill="#ffff"
                            />
                            <path
                              d="M22 17H16C15.7348 17 15.4804 16.8946 15.2929 16.7071C15.1054 16.5196 15 16.2652 15 16C15 15.7348 15.1054 15.4804 15.2929 15.2929C15.4804 15.1054 15.7348 15 16 15H22C22.2652 15 22.5196 15.1054 22.7071 15.2929C22.8946 15.4804 23 15.7348 23 16C23 16.2652 22.8946 16.5196 22.7071 16.7071C22.5196 16.8946 22.2652 17 22 17Z"
                              fill="#ffff"
                            />
                          </g>
                          <defs>
                            <clipPath>
                              <rect width="32" height="32" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </a>
                      <a href="#" className="icon">
                        <svg
                          width="36"
                          height="32"
                          viewBox="0 0 36 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M17.7046 32L17.1119 31.4641C3.6298 20.134 0 16.1531 0 9.64593C0 4.28708 4.22242 0 9.33378 0C13.6303 0 16.0748 2.52631 17.7046 4.44018C19.3343 2.52631 21.7788 0 26.0753 0C31.2608 0 35.4091 4.36363 35.4091 9.64593C35.4091 16.1531 31.7793 20.134 18.2972 31.4641L17.7046 32ZM9.33378 1.99042C5.25951 1.99042 1.92601 5.4354 1.92601 9.64593C1.92601 15.2344 5.33359 18.9091 17.7046 29.3971C30.0755 18.9091 33.4831 15.2344 33.4831 9.64593C33.4831 5.4354 30.1496 1.99042 26.0753 1.99042C22.3715 1.99042 20.3714 4.28708 18.8157 6.1244L17.7046 7.42584L16.5934 6.1244C15.0378 4.28708 13.0377 1.99042 9.33378 1.99042Z"
                            fill="white"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                  <div className="product_details">
                    <h3 className="product_name">
                      Xiaomi Mi Notebook Air 12.5″
                    </h3>
                    <div className="price">
                      <span>$500.00</span>
                      <span className="discount">$550.00</span>
                    </div>
                  </div>
                </div>
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
      {/* <!-- Recent Shopping Slider End --> */}
    </>
  );
};

export default SingleProduct;
