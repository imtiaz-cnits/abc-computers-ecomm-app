import React from "react";
import categoryImg1 from "@/assets/img/home/catagories-img1.webp";
import categoryImg2 from "@/assets/img/home/catagories-img2.webp";
import categoryImg3 from "@/assets/img/home/catagories-img3.webp";
import categoryImg4 from "@/assets/img/home/catagories-img4.webp";

const FeaturedCategories = () => {
  return (
    // <!-- Categories Start -->
    <div id="categories">
      <div className="container">
        <div className="heading">
          <div>
            <h2>Featured Category</h2>
          </div>
        </div>
        <div className="categories_wrapper">
          <div className="row g-3 g-md-4">
            <div className="col-lg-2 col-6 col-sm-4 d-flex align-item-stretch">
              <a href="#" className="categories_card">
                <div className="categories_title">
                  <h2>All Products</h2>
                </div>
                <div className="catagories_image">
                  <img src={categoryImg1.src} alt="" />
                </div>
              </a>
            </div>
            <div className="col-lg-2 col-6 col-sm-4 d-flex align-item-stretch">
              <a href="#" className="categories_card">
                <div className="categories_title">
                  <h2>Computer & Laptops</h2>
                </div>
                <div className="catagories_image">
                  <img src={categoryImg2.src} alt="" />
                </div>
              </a>
            </div>
            <div className="col-lg-2 col-6 col-sm-4 d-flex align-item-stretch">
              <a href="#" className="categories_card">
                <div className="categories_title">
                  <h2>Watches</h2>
                </div>
                <div className="catagories_image">
                  <img src={categoryImg3.src} alt="" />
                </div>
              </a>
            </div>
            <div className="col-lg-2 col-6 col-sm-4 d-flex align-item-stretch">
              <a href="#" className="categories_card">
                <div className="categories_title">
                  <h2>Ear Buds & Headphones</h2>
                </div>
                <div className="catagories_image">
                  <img src={categoryImg4.src} alt="" />
                </div>
              </a>
            </div>
            <div className="col-lg-2 col-6 col-sm-4 d-flex align-item-stretch">
              <a href="#" className="categories_card">
                <div className="categories_title">
                  <h2>All Products</h2>
                </div>
                <div className="catagories_image">
                  <img src={categoryImg1.src} alt="" />
                </div>
              </a>
            </div>
            <div className="col-lg-2 col-6 col-sm-4 d-flex align-item-stretch">
              <a href="#" className="categories_card">
                <div className="categories_title">
                  <h2>Computer & Laptops</h2>
                </div>
                <div className="catagories_image">
                  <img src={categoryImg2.src} alt="" />
                </div>
              </a>
            </div>
            <div className="col-lg-2 col-6 col-sm-4 d-flex align-item-stretch">
              <a href="#" className="categories_card">
                <div className="categories_title">
                  <h2>Watches</h2>
                </div>
                <div className="catagories_image">
                  <img src={categoryImg3.src} alt="" />
                </div>
              </a>
            </div>
            <div className="col-lg-2 col-6 col-sm-4 d-flex align-item-stretch">
              <a href="#" className="categories_card">
                <div className="categories_title">
                  <h2>Ear Buds & Headphones</h2>
                </div>
                <div className="catagories_image">
                  <img src={categoryImg4.src} alt="" />
                </div>
              </a>
            </div>
            <div className="col-lg-2 col-6 col-sm-4 d-flex align-item-stretch">
              <a href="#" className="categories_card">
                <div className="categories_title">
                  <h2>All Products</h2>
                </div>
                <div className="catagories_image">
                  <img src={categoryImg1.src} alt="" />
                </div>
              </a>
            </div>
            <div className="col-lg-2 col-6 col-sm-4 d-flex align-item-stretch">
              <a href="#" className="categories_card">
                <div className="categories_title">
                  <h2>Computer & Laptops</h2>
                </div>
                <div className="catagories_image">
                  <img src={categoryImg2.src} alt="" />
                </div>
              </a>
            </div>
            <div className="col-lg-2 col-6 col-sm-4 d-flex align-item-stretch">
              <a href="#" className="categories_card">
                <div className="categories_title">
                  <h2>Watches</h2>
                </div>
                <div className="catagories_image">
                  <img src={categoryImg3.src} alt="" />
                </div>
              </a>
            </div>
            <div className="col-lg-2 col-6 col-sm-4 d-flex align-item-stretch">
              <a href="#" className="categories_card">
                <div className="categories_title">
                  <h2>Ear Buds & Headphones</h2>
                </div>
                <div className="catagories_image">
                  <img src={categoryImg4.src} alt="" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <!-- Categories end -->
  );
};

export default FeaturedCategories;
