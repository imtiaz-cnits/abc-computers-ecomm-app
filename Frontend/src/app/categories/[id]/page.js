import AllProducts from "@/Components/Products/AllProducts/AllProducts";
import Breadcrumb from "@/Components/Shared/Breadcrumb/Breadcrumb";
import React from "react";

const SingleCategory = async ({ params }) => {
  const { id } = await params;

  return (
    <>
      <AllProducts catId={id} />
    </>
  );
};

export default SingleCategory;
