import ImageMagnifier from "@/Components/Shared/ImageMagnifier/ImageMagnifier";
import React from "react";

const practice = () => {
  return (
    <div style={{ padding: "100px 0", width: "100%" }}>
      <div style={{ margin: "auto", width: "500px" }}>
        <ImageMagnifier
          imgSrc={
            "http://localhost:3000/_next/static/media/single-product-slider-3.db2ad030.webp"
          }
        />
      </div>
    </div>
  );
};

export default practice;
