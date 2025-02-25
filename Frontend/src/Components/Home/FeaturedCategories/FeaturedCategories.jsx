"use client";

import React, { useEffect, useState } from "react";
import categoryImg1 from "@/assets/img/home/catagories-img1.webp";
import axios from "axios";

const FeaturedCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axios.get("http://localhost:5070/api/v1/category");

      if (response?.data?.status === "success") {
        setCategories(response?.data?.data);
      }
    };

    fetchCategories();
  }, []);

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
            {categories?.slice(0, 12)?.map((category) => (
              <div className="col-lg-2 col-6 col-sm-4 d-flex align-item-stretch">
                <a href="#" className="categories_card">
                  <div className="categories_title">
                    <h2>{category?.categoryName}</h2>
                  </div>
                  <div className="catagories_image">
                    <img
                      src={`http://localhost:5070${category.categoryImg}`}
                      alt=""
                    />
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    // <!-- Categories end -->
  );
};

export default FeaturedCategories;
