"use client";
import Script from "next/script";
import React from "react";

const JavascriptClient = () => {
  return (
    <>
      <Script
        src="https://code.jquery.com/jquery-3.7.1.min.js"
        strategy="afterInteractive"
      />
      <Script
        src="/js/website/vendor/bootstrap.bundle.min.js"
        strategy="afterInteractive"
      />
      <Script src="/js/bootstrap.bundle.min.js" strategy="afterInteractive" />
      <Script src="/js/sidebar.js" strategy="beforeInteractive" />
      <Script src="/js/style.js" strategy="beforeInteractive" />
      <Script src="/js/table-function.js" strategy="beforeInteractive" />
      <Script
        src="/js/website/vendor/swiper-bundle.min.js"
        strategy="beforeInteractive"
      />
      <Script src="/js/website/navbar.js" strategy="afterInteractive" />
      <Script
        src="/js/website/popular-product-tab.js"
        strategy="afterInteractive"
      />
      <Script
        src="/js/website/vendor/owl.carousel.min.js"
        strategy="afterInteractive"
      />
      <Script
        src="/js/website/specials-product-slider.js"
        strategy="afterInteractive"
      />
      <Script
        src="/js/website/product-progressbar.js"
        strategy="afterInteractive"
      />
      <Script src="/js/website/brand-slider.js" strategy="afterInteractive" />
      <Script src="/js/website/app.js" strategy="afterInteractive" />
      <Script
        src="/js/website/single-product-zoom-slider.js"
        strategy="beforeInteractive"
      />
      <Script
        src="/js/website/vendor/lightslider.js"
        strategy="afterInteractive"
      />
      <Script
        src="/js/website/product-page-funtionality.js"
        strategy="afterInteractive"
      />

      <Script
        src="/js/website/product-video-slider.js"
        strategy="afterInteractive"
      />
    </>
  );
};

export default JavascriptClient;
