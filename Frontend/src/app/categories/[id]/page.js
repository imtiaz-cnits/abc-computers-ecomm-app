import AllProducts from "@/Components/Products/AllProducts/AllProducts";
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
