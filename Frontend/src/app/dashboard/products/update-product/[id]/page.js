import UpdateProduct from "@/Pages/DashboardPages/UpdateProduct/UpdateProduct";
import React from "react";

const UpdateProductPage = async ({ params }) => {
  const id = await params?.id;
  return (
    <>
      <UpdateProduct id={id} />
    </>
  );
};

export default UpdateProductPage;
