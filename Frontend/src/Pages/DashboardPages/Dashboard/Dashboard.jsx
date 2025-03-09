"use client"

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import axios from "axios";

const Dashboard = () => {
  const tableRef = useRef(null);

  const [products, setProducts] = useState([]);
  // const filteredProducts = Array.isArray(products)
  //     ? product.slice(skip, skip + limit)
  //     : [];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
            "https://api.abcpabnabd.com/api/v1/product-list"
        );

        setProducts(response.data.data || []);
        // setTotalItems(response?.data?.data.length);
      } catch (error) {
        if (error.response) {
          console.error(
              `Error fetching brands: ${error.response.status} - ${error.response.data}`
          );
        } else if (error.request) {
          console.error("No response received from server:", error.request);
        } else {
          console.error("Error setting up request:", error.message);
        }
      }
    };

    fetchProducts();
  }, []);

  return (
      <div className="main-content">
        <div className="page-content">
          {/* <!-- Cards Start --> */}
          <section id="cards">
            <div className="row">
              <div className="col-xl col-sm-6 align-item-stretch">
                <div className="card-item">
                  <div className="card-body">
                    <div className="align-items-center">
                      <div className="card-icon pb-5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" id="apple" >
                          <g transform="translate(430.929 -842.505)">
                            <circle cx="-398.929" cy="874.505" r="32" fill="#e9eef4"></circle>
                            <g transform="translate(-431.929 -145.907)">
                              <g transform="rotate(180 32 1020.412)">
                                <path fill="#141617" d="M32 990.362c-3.878 0-7 .669-7 1.5-1 9.5-4 10.6-4 10.6h22s-3-1.1-4-10.6c0-.831-3.122-1.5-7-1.5Zm0 4.084h.05c.393 0 .712.09.714.203.001.113-.318.205-.713.205-.396 0-.717-.092-.715-.205 0-.107.29-.195.664-.203Zm-4.602 1.424h.002c.063 0 .127.002.19.006.618.04 1.107.278 1.092.53-.016.255-.533.427-1.153.386-.617-.041-1.105-.279-1.09-.532.015-.223.42-.388.96-.39zm8.881 0a1.123.46 3.776 0 1 .192.006 1.123.46 3.776 0 1 1.09.53 1.123.46 3.776 0 1-1.15.386 1.123.46 3.776 0 1-1.093-.532 1.123.46 3.776 0 1 .961-.39zm-4.228 1.74a1.123.715 0 0 1 1.123.715 1.123.715 0 0 1-1.123.715 1.123.715 0 0 1-1.123-.715 1.123.715 0 0 1 1.123-.715z"></path>
                                <path fill="#9fe51a" d="M32.05 992.71c-1.014 0-1.837.525-1.837 1.173 0 .649.823 1.174 1.838 1.174 1.014 0 1.836-.526 1.836-1.174 0-.647-.822-1.173-1.836-1.173Zm-.05 1.736h.05c.393 0 .712.09.714.203.001.113-.318.205-.713.205-.396 0-.717-.092-.715-.205 0-.107.29-.196.664-.203Z"></path>
                                <ellipse cx="-49.875" cy="991.689" fill="#9fe51a" rx="1.838" ry=".868" transform="rotate(-4.475)"></ellipse>
                                <path fill="#9fe51a" d="M36.44 994.24a1.838 1.43 0 0 0-1.838 1.43 1.838 1.43 0 0 0 1.837 1.43 1.838 1.43 0 0 0 1.838-1.43 1.838 1.43 0 0 0-1.838-1.43zm-.16 1.63a1.123.46 3.776 0 1 .19.006 1.123.46 3.776 0 1 1.09.53 1.123.46 3.776 0 1-1.15.386 1.123.46 3.776 0 1-1.092-.532 1.123.46 3.776 0 1 .961-.39zm-4.23.31a1.838 1.531 0 0 0-1.837 1.532 1.838 1.531 0 0 0 1.838 1.53 1.838 1.531 0 0 0 1.836-1.53 1.838 1.531 0 0 0-1.836-1.532zm0 1.43a1.123.715 0 0 1 1.124.715 1.123.715 0 0 1-1.123.715 1.123.715 0 0 1-1.123-.715 1.123.715 0 0 1 1.123-.715zm-4.49-3.37a1.838 1.43 0 0 0-1.837 1.43 1.838 1.43 0 0 0 1.838 1.43 1.838 1.43 0 0 0 1.837-1.43 1.838 1.43 0 0 0-1.837-1.43zm-.16 1.63a1.123.46 3.776 0 1 .19.006 1.123.46 3.776 0 1 1.092.53 1.123.46 3.776 0 1-1.153.386 1.123.46 3.776 0 1-1.09-.532 1.123.46 3.776 0 1 .961-.39z"></path>
                                <ellipse cx="113.775" cy="-986.687" fill="#9fe51a" rx="1.838" ry=".868" transform="scale(1 -1)rotate(-4.475)"></ellipse>
                                <path fill="#9fe51a" d="M35.443 990.563a1.834.455 4.867 0 0-.834.293 1.834.455 4.867 0 0 1.735.62 1.834.455 4.867 0 0 1.916-.274c-.62-.27-1.6-.491-2.817-.639Z"></path>
                                <ellipse cx="32.05" cy="991.587" fill="#9fe51a" rx="1.838" ry=".612"></ellipse>
                                <ellipse cx="32.05" cy="990.566" fill="#9fe51a" rx="1.838" ry=".204"></ellipse>
                                <path fill="#9fe51a" d="M28.707 990.546c-1.21.138-2.195.348-2.846.607a.455 1.834 83.858 0 0-.013.082.455 1.834 83.858 0 0 1.923.238.455 1.834 83.858 0 0 1.721-.656.455 1.834 83.858 0 0-.785-.271z"></path>
                              </g>
                              <rect width="3" height="7" x="46" y="1010.362" fill="#989898" rx="1" ry="1"></rect>
                              <rect width="2" height="9" x="46" y="1021.362" fill="#989898" rx="1" ry="1"></rect>
                              <rect width="30" height="36" x="17" y="1002.362" fill="#aaaaae" rx="5" ry="5"></rect>
                              <rect width="26" height="32" x="19" y="1004.362" fill="#111" rx="3" ry="3"></rect>
                              <rect width="23" height="3" x="21" y="1003.362" fill="#fff" opacity=".135" rx="1.5" ry="1.5"></rect>
                              <path fill="#aaaaae" fillRule="evenodd" d="M47.957 1011.362a.5.5 0 0 0 .05 1H49v-1h-.992a.5.5 0 0 0-.051 0zm0 2a.5.5 0 0 0 .05 1H49v-1h-.992a.5.5 0 0 0-.051 0zm0 2a.5.5 0 0 0 .05 1H49v-1h-.992a.5.5 0 0 0-.051 0z" color="#000" fontFamily="sans-serif" fontWeight="400" overflow="visible" ></path>
                              <path fill="#9fe51a" d="M23.625 1022.258c-.68-.195-1.247-.625-1.503-1.139-.108-.217-.125-.33-.122-.822.003-.465.031-.651.149-1.007.279-.846.984-2.064 1.768-3.057.59-.746.568-.725.434-.387-.517 1.31-.457 2.25.184 2.892.429.428 1.228.652 1.952.546.217-.03 1.36-.319 2.539-.639a32426.497 32426.497 0 0 1 8.223-2.23c3.094-.845 4.716-1.272 4.74-1.247.052.051-.065.115-.778.42-.388.165-1.28.55-1.981.855a2252.94 2252.94 0 0 1-11.833 5.103c-1.824.765-2.888.966-3.772.712z"></path>
                              <circle cx="26" cy="1031.362" r="1" fill="#ececec"></circle>
                              <circle cx="30" cy="1031.362" r="1" fill="#333"></circle>
                              <circle cx="34" cy="1031.362" r="1" fill="#333"></circle>
                              <circle cx="38" cy="1031.362" r="1" fill="#333"></circle>
                              <path fill="#141617" d="M32 990.362c-3.878 0-7 .669-7 1.5-1 9.5-4 10.6-4 10.6h22s-3-1.1-4-10.6c0-.831-3.122-1.5-7-1.5Zm0 4.084h.05c.393 0 .712.09.714.203.001.113-.318.205-.713.205-.396 0-.717-.092-.715-.205 0-.107.29-.195.664-.203Zm-4.602 1.424h.002c.063 0 .127.002.19.006.618.04 1.107.278 1.092.53-.016.255-.533.427-1.153.386-.617-.041-1.105-.279-1.09-.532.015-.223.42-.388.96-.39zm8.881 0a1.123.46 3.776 0 1 .192.006 1.123.46 3.776 0 1 1.09.53 1.123.46 3.776 0 1-1.15.386 1.123.46 3.776 0 1-1.093-.532 1.123.46 3.776 0 1 .961-.39zm-4.228 1.74a1.123.715 0 0 1 1.123.715 1.123.715 0 0 1-1.123.715 1.123.715 0 0 1-1.123-.715 1.123.715 0 0 1 1.123-.715z"></path>
                              <path fill="#9fe51a" d="M32.05 992.71c-1.014 0-1.837.525-1.837 1.173 0 .649.823 1.174 1.838 1.174 1.014 0 1.836-.526 1.836-1.174 0-.647-.822-1.173-1.836-1.173Zm-.05 1.736h.05c.393 0 .712.09.714.203.001.113-.318.205-.713.205-.396 0-.717-.092-.715-.205 0-.107.29-.196.664-.203Z"></path>
                              <ellipse cx="-49.875" cy="991.689" fill="#9fe51a" rx="1.838" ry=".868" transform="rotate(-4.475)"></ellipse>
                              <path fill="#9fe51a" d="M36.44 994.24a1.838 1.43 0 0 0-1.838 1.43 1.838 1.43 0 0 0 1.837 1.43 1.838 1.43 0 0 0 1.838-1.43 1.838 1.43 0 0 0-1.838-1.43zm-.16 1.63a1.123.46 3.776 0 1 .19.006 1.123.46 3.776 0 1 1.09.53 1.123.46 3.776 0 1-1.15.386 1.123.46 3.776 0 1-1.092-.532 1.123.46 3.776 0 1 .961-.39zm-4.23.31a1.838 1.531 0 0 0-1.837 1.532 1.838 1.531 0 0 0 1.838 1.53 1.838 1.531 0 0 0 1.836-1.53 1.838 1.531 0 0 0-1.836-1.532zm0 1.43a1.123.715 0 0 1 1.124.715 1.123.715 0 0 1-1.123.715 1.123.715 0 0 1-1.123-.715 1.123.715 0 0 1 1.123-.715zm-4.49-3.37a1.838 1.43 0 0 0-1.837 1.43 1.838 1.43 0 0 0 1.838 1.43 1.838 1.43 0 0 0 1.837-1.43 1.838 1.43 0 0 0-1.837-1.43zm-.16 1.63a1.123.46 3.776 0 1 .19.006 1.123.46 3.776 0 1 1.092.53 1.123.46 3.776 0 1-1.153.386 1.123.46 3.776 0 1-1.09-.532 1.123.46 3.776 0 1 .961-.39z"></path>
                              <ellipse cx="113.775" cy="-986.687" fill="#9fe51a" rx="1.838" ry=".868" transform="scale(1 -1)rotate(-4.475)"></ellipse>
                              <path fill="#9fe51a" d="M35.443 990.563a1.834.455 4.867 0 0-.834.293 1.834.455 4.867 0 0 1.735.62 1.834.455 4.867 0 0 1.916-.274c-.62-.27-1.6-.491-2.817-.639Z"></path>
                              <ellipse cx="32.05" cy="991.587" fill="#9fe51a" rx="1.838" ry=".612"></ellipse>
                              <ellipse cx="32.05" cy="990.566" fill="#9fe51a" rx="1.838" ry=".204"></ellipse>
                              <path fill="#9fe51a" d="M28.707 990.546c-1.21.138-2.195.348-2.846.607a.455 1.834 83.858 0 0-.013.082.455 1.834 83.858 0 0 1.923.238.455 1.834 83.858 0 0 1.721-.656.455 1.834 83.858 0 0-.785-.271z"></path>
                            </g>
                          </g>
                        </svg>
                      </div>
                      <div>
                        <h4>Products</h4>
                        <h5>{products.length}</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* <!-- Cards End --> */}

          {/* <!-- Table --> */}
          <div className="data-table">
            <div className="invoice-btn">
              <h1>PRODUCT/ SERVICES</h1>
              <div className="table-btn-item">
                <Link href={"/dashboard/products/add-product"}>
                  <button type="submit" className="view-more-btn">
                    <svg
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                          d="M16 10.6667V21.3333M10.6667 16H21.3333M10.4 28H21.6C23.8402 28 24.9603 28 25.816 27.564C26.5686 27.1805 27.1805 26.5686 27.564 25.816C28 24.9603 28 23.8402 28 21.6V10.4C28 8.15979 28 7.03969 27.564 6.18404C27.1805 5.43139 26.5686 4.81947 25.816 4.43597C24.9603 4 23.8402 4 21.6 4H10.4C8.15979 4 7.03969 4 6.18404 4.43597C5.43139 4.81947 4.81947 5.43139 4.43597 6.18404C4 7.03969 4 8.15979 4 10.4V21.6C4 23.8402 4 24.9603 4.43597 25.816C4.81947 26.5686 5.43139 27.1805 6.18404 27.564C7.03969 28 8.15979 28 10.4 28Z"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                      />
                    </svg>
                    ADD PRODUCT/ SERVICES
                  </button>
                </Link>
              </div>
            </div>

            {/* <!-- Action Buttons --> */}
            <div className="button-wrapper mb-3">
              {/* <!-- Search and Filter --> */}
              <div className="btn-group">
                <div className="input-group">
                  <input
                      type="text"
                      id="searchInput"
                      className="form-control"
                      placeholder="Search Product/ Services..."
                  />
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                {/* <!-- Table --> */}
                <div className="table-wrapper">
                  <table
                      id="printTable"
                      className="table table-hover"
                      ref={tableRef}
                  >
                    <thead>
                    <tr>
                      <th>SL NO</th>
                      <th>IMAGE</th>
                      <th>CODE</th>
                      <th>NAME</th>
                      <th>PRICE</th>
                      <th>DISCOUNT PRICE</th>
                      <th>BRAND</th>
                      <th>CATEGORY</th>
                      <th>SUB-CATEGORY</th>
                      <th>STOCK</th>
                      <th>COLORS</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products?.length > 0 ? (
                        products?.map((product, index) => (
                            <tr key={product._id || index}>
                              <td>{index + 1}</td>
                              <td>
                                {product?.productImg ? (
                                    <img
                                        src={`https://api.abcpabnabd.com${product.productImg}`}
                                        alt={product?.productName || "Product"}
                                        style={{
                                          width: "50px",
                                          height: "50px",
                                          objectFit: "cover",
                                          borderRadius: "5px",
                                        }}
                                    />
                                ) : (
                                    "No Image"
                                )}
                              </td>
                              <td>{product?.productCode}</td>
                              <td>{product?.productName}</td>
                              <td>{product?.price}</td>
                              <td>{product?.discountPrice}</td>
                              <td>{product?.brandID?.brandName}</td>
                              <td>{product?.categoryID?.categoryName}</td>
                              <td>{product?.subCategoryID?.subCategoryName}</td>
                              <td>{product?.stock}</td>
                              <td>{product?.color?.join(", ")}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                          <td colSpan="12">No products available</td>
                        </tr>
                    )}
                    </tbody>
                  </table>
                </div>
                {/* <!-- Pagination and Display Info --> */}
                <div className="my-3">
                  <span id="display-info"></span>
                </div>

                <footer className="footer">
                  <div className="entries-page">
                    <label htmlFor="entries" className="mr-2">
                      Products per page:
                    </label>
                    <div className="select-container">
                      <select
                          id="entries"
                          className="form-control"
                          style={{ width: "auto" }}
                      >
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                      </select>
                      <span className="dropdown-icon">&#9662;</span>
                      {/* <!-- Dropdown icon --> */}
                    </div>
                  </div>

                  <div id="pagination" className="pagination">
                    <button id="prevBtn" className="btn">
                      Prev
                    </button>
                    <a href="#" className="page-link page-link--1">
                      1
                    </a>
                    <a href="#" className="page-link page-link--2">
                      2
                    </a>
                    <a href="#" className="page-link page-link--3">
                      3
                    </a>
                    <button id="nextBtn" className="btn">
                      Next
                    </button>
                  </div>
                </footer>
              </div>
            </div>
          </div>
          <div className="copyright">
            <p>&copy; 2025. All Rights Reserved.</p>
          </div>
          {/* <!-- Table End --> */}
        </div>
      </div>
  );
};

export default Dashboard;
