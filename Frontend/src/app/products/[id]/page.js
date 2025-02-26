import SingleProduct from "@/Pages/WebsitePages/SingleProduct/SingeProduct";
import React from "react";

const ProductSinglePage = async ({ params }) => {
  const { id } = await params;

  return (
    <>
      <SingleProduct id={id} />
    </>
  );
};

export default ProductSinglePage;
