"use client";
import React, { useState } from "react";
import cartImg1 from "@/assets/img/cart-product-img1.webp";
import cartImg2 from "@/assets/img/cart-product-img2.webp";
import cartImg3 from "@/assets/img/cart-product-img3.webp";
import { FaAngleDown } from "react-icons/fa6";
import countries from "../../../../public/js/website/countries";
import states from "../../../../public/js/website/states";
import Link from "next/link";

const Checkout = () => {
  const [stateOptions, setStateOptions] = useState([]);

  const handleCountryChange = (e) => {
    const selectedCountryIndex = e.target.value;

    if (selectedCountryIndex == 0) {
      return setStateOptions([]);
    }

    const newStates = states[selectedCountryIndex]?.split("|");
    setStateOptions(newStates);
  };

  return (
    <>
      {/* <!-- Billing Details Start --> */}
      <div className="billing_details">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/cart">Shopping Cart </Link>
            <div className="icon">
              <svg
                width="32"
                height="30"
                viewBox="0 0 32 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.0565 25.9035C14.4726 26.4888 14.4724 27.4363 15.0561 28.0219L15.9665 28.9351C16.5524 29.5228 17.5042 29.5231 18.0904 28.9357L30.9423 16.0597C31.5268 15.4741 31.5268 14.5259 30.9423 13.9403L18.0904 1.0643C17.5042 0.476929 16.5524 0.477217 15.9665 1.06494L15.0561 1.97809C14.4724 2.56365 14.4726 3.51117 15.0565 4.09652L24.8775 13.9406C25.4616 14.5261 25.4616 15.4739 24.8775 16.0594L15.0565 25.9035Z"
                  fill="#09090B"
                />
                <path
                  d="M1.05653 25.9035C0.472561 26.4888 0.472386 27.4363 1.05614 28.0219L1.96647 28.9351C2.55238 29.5228 3.50416 29.5231 4.09042 28.9357L16.9423 16.0597C17.5268 15.4741 17.5268 14.5259 16.9423 13.9403L4.09043 1.0643C3.50416 0.476929 2.55238 0.477217 1.96647 1.06494L1.05614 1.97809C0.472388 2.56365 0.472563 3.51117 1.05653 4.09652L10.8775 13.9406C11.4616 14.5261 11.4616 15.4739 10.8775 16.0594L1.05653 25.9035Z"
                  fill="#09090B"
                />
              </svg>
            </div>
            <span className="breadcrumb_last active">Checkout</span>
          </div>

          <div className="row">
            <div className="col-lg-8">
              <div className="billing_section">
                <h1 className="heading">Billing Details</h1>
                <form>
                  <div className="form_group_wrapper">
                    <div className="form_group">
                      <label htmlFor="first-name">
                        First Name<span>*</span>
                      </label>
                      <input
                        type="text"
                        id="first-name"
                        placeholder="First name"
                      />
                    </div>
                    <div className="form_group">
                      <label htmlFor="last-name">
                        Last Name<span>*</span>
                      </label>
                      <input
                        type="text"
                        id="last-name"
                        placeholder="Last name"
                      />
                    </div>
                  </div>
                  <div className="form_group">
                    <label htmlFor="company">Company Name (Optional)</label>
                    <input
                      type="text"
                      id="company"
                      placeholder="Company name..."
                    />
                  </div>
                  <div className="form_group">
                    <label>
                      Country<span>*</span>
                    </label>
                    <div className="select_option">
                      <select
                        id="country"
                        name="country"
                        className="form-control"
                        onChange={(e) => handleCountryChange(e)}
                      >
                        {countries?.map((country, idx) => (
                          <option value={idx} key={idx}>
                            {country}
                          </option>
                        ))}
                      </select>
                      <div className="icon">
                        <FaAngleDown />
                      </div>
                    </div>
                  </div>
                  <div className="form_group">
                    <label htmlFor="address">
                      Street Address<span>*</span>
                    </label>
                    <input
                      type="text"
                      id="address"
                      placeholder="House name and street address..."
                    />
                  </div>
                  <div className="form_group">
                    <label htmlFor="city">
                      Town / City<span>*</span>
                    </label>
                    <input type="text" id="city" placeholder="Town/City" />
                  </div>
                  <div className="form_group">
                    <label>
                      State<span>*</span>
                    </label>
                    <div className="select_option">
                      <select name="state" id="state" className="form-control">
                        <option defaultValue="">Select your state</option>
                        {stateOptions?.map((option, idx) => (
                          <option value={option} key={idx}>
                            {option}
                          </option>
                        ))}
                      </select>
                      <div className="icon">
                        <FaAngleDown />
                      </div>
                    </div>
                  </div>
                  <div className="form_group">
                    <label htmlFor="zip">
                      ZIP Code<span>*</span>
                    </label>
                    <input type="text" id="zip" placeholder="Enter ZIP code" />
                  </div>
                  <div className="form_group">
                    <label htmlFor="phone">
                      Phone Number<span>*</span>
                    </label>
                    <input
                      type="number"
                      id="phone"
                      placeholder="Phone number"
                    />
                  </div>
                  <div className="form_group">
                    <label htmlFor="email">
                      Email Address<span>*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="example@gmail.com"
                    />
                  </div>
                  <div className="form_group">
                    <label htmlFor="order-notes">Order Notes (Optional)</label>
                    <textarea
                      id="order-notes"
                      placeholder="Notes about your order, e.g. special notes for delivery"
                    ></textarea>
                  </div>
                </form>
              </div>

              <div className="shipping_section">
                <h2>Shipping Method</h2>
                <div className="shipping_option">
                  <input
                    type="radio"
                    name="shipping"
                    id="regular"
                    defaultChecked
                  />
                  <label htmlFor="regular">
                    <span className="details">
                      <strong>Regular Shipping</strong>
                      <span>$9.50</span>
                    </span>
                    <span>5-7 days</span>
                  </label>
                </div>
                <div className="shipping_option">
                  <input type="radio" name="shipping" id="express" />
                  <label htmlFor="express">
                    <span className="details">
                      <strong>Express Shipping</strong>
                      <span>$22.50</span>
                    </span>
                    <span>1-3 days</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="order_summery_wrapper">
                <div className="order_items">
                  <div className="cart_header">
                    <h2>Your Order</h2>
                  </div>
                  <ul className="cart_items">
                    <li>
                      <div className="product_details_wrapper">
                        <div className="product_item">
                          <img src={cartImg1.src} alt="" />
                        </div>
                        <div className="item">
                          <span className="title">DJI Osmo Mobile 6</span>
                          <div className="type_wrap_container">
                            <h2 className="type_wrap">
                              Gimbal<span>1×</span>
                            </h2>
                          </div>
                        </div>
                      </div>
                      <div>
                        <span className="price"> $149.99 </span>
                      </div>
                    </li>
                    <li>
                      <div className="product_details_wrapper">
                        <div className="product_item">
                          <img src={cartImg2.src} alt="" />
                        </div>
                        <div className="item">
                          <span className="title">MSI- Gaming Case</span>
                          <div className="type_wrap_container">
                            <h2 className="type_wrap">
                              Gaming Case<span>1×</span>
                            </h2>
                          </div>
                        </div>
                      </div>
                      <div>
                        <span className="price"> $139.99 </span>
                      </div>
                    </li>
                    <li>
                      <div className="product_details_wrapper">
                        <div className="product_item">
                          <img src={cartImg3.src} alt="" />
                        </div>
                        <div className="item">
                          <span className="title">CAUGAR- Gaming Head</span>
                          <div className="type_wrap_container">
                            <h2 className="type_wrap">
                              Headphone<span>1×</span>
                            </h2>
                          </div>
                        </div>
                      </div>
                      <div>
                        <span className="price">$54.00</span>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="discount_wrapper">
                  <h2 className="title">Discount Code</h2>
                  <div className="group">
                    <input type="text" placeholder="Add discount code" />
                    <button className="apply_btn">Apply</button>
                  </div>
                </div>

                <div className="sign_up">
                  <p>New Customer?</p>
                  <p>
                    <Link href="/login">Sign Up</Link> to get better offer.
                  </p>
                </div>

                <div className="order_summary">
                  <p className="summary_item">
                    <span>Sub-Total</span>{" "}
                    <span className="price1">$343.98</span>
                  </p>
                  <p className="summary_item">
                    <span>Taxes</span> <span className="price">-$5.00</span>
                  </p>
                  <p className="summary_item">
                    <span>Discount</span> <span className="price">-$0</span>
                  </p>
                  <p className="summary_item">
                    <span>Shipment Cost</span>{" "}
                    <span className="price">$22.50</span>
                  </p>
                  <p className="summary_item">
                    <span className="grand">Grand Total</span>
                    <span className="grand_price">$374.48</span>
                  </p>
                  <Link href="/payment" className="continue_btn">
                    Continue
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Billing Details End --> */}
    </>
  );
};

export default Checkout;
