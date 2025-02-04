import React from 'react';
import brandImg1 from "@/assets/img/home/brand-logo1.webp"
import brandImg2 from "@/assets/img/home/brand-logo2.webp"
import brandImg3 from "@/assets/img/home/brand-logo3.webp"
import brandImg4 from "@/assets/img/home/brand-logo4.webp"
import brandImg5 from "@/assets/img/home/brand-logo5.webp"

const Brands = () => {
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
                        <div className="item">
                            <img src={brandImg1.src} alt="Brand 1" />
                        </div>
                        <div className="item">
                            <img src={brandImg2.src} alt="Brand 2" />
                        </div>
                        <div className="item">
                            <img src={brandImg3.src} alt="Brand 3" />
                        </div>
                        <div className="item">
                            <img src={brandImg4.src} alt="Brand 4" />
                        </div>
                        <div className="item">
                            <img src={brandImg5.src} alt="Brand 5" />
                        </div>
                        <div className="item">
                            <img src={brandImg1.src} alt="Brand 1" />
                        </div>
                        <div className="item">
                            <img src={brandImg2.src} alt="Brand 2" />
                        </div>
                        <div className="item">
                            <img src={brandImg3.src} alt="Brand 3" />
                        </div>
                        <div className="item">
                            <img src={brandImg4.src} alt="Brand 4" />
                        </div>
                        <div className="item">
                            <img src={brandImg5.src} alt="Brand 5" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Brands;