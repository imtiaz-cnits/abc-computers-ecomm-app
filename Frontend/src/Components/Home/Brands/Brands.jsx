"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

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
                    <div className="owl-carousel owl-theme brand-carousel">
                        {brands?.slice(0, 12)?.map((brand) => (
                            <div className="item">
                                <img src={`http://localhost:5070${brand.brandImg}`} alt="" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Brands;