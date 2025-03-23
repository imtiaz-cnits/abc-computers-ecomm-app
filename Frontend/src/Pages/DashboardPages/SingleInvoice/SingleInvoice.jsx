"use client"

import React, { useEffect, useRef, useState } from 'react';
import abcLogo from '@/assets/img/invoice-logo.png'
import bcsLogo from "@/assets/img/bcs-logo.png"
import "./SingleInvoice.css"
import { FaPrint } from 'react-icons/fa';
import { useReactToPrint } from 'react-to-print';
import axios from 'axios';
import moment from 'moment';

const SingleInvoice = ({ id }) => {
    const componentRef = useRef(null)
    const [order, setOrder] = useState({})

    useEffect(() => {
        const fetchOrderDetails = async () => {
            const response = await axios.get(`http://localhost:5070/api/v1/order-details/${id}`)

            if (response?.data?.status === "success") {
                setOrder(response.data?.data[0])
            }
        }

        fetchOrderDetails()
    }, [id]);


    const handlePrint = () => {
        window.print()
    };

    const formattedNumber = (number) => {
        return new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(number);
    }


    return (
        <div className="main-content">
            <div className="page-content">
                <div className="data-table">
                    <div className="invoice-btn">
                        <div></div>
                        <div className="table-btn-item">
                            <button type="button" className="view-more-btn invoice" onClick={handlePrint}>
                                <FaPrint style={{ fontSize: "12px" }} />
                                PRINT
                            </button>
                        </div>
                    </div>
                </div>
                <div ref={componentRef} className="invoice" >
                    <div className="invoice-header">
                        <div className="logo">
                            <img src={abcLogo?.src} alt="" />
                        </div>
                        <div className="info">
                            <div>
                                <h3>
                                    Computer Sales, Servicing & Networking
                                </h3>
                                <img src={bcsLogo.src} alt="" />
                                <h4>
                                    MEMBER-1258
                                </h4>
                            </div>
                            <div>
                                <p>
                                    BGC Complex (In front of Pabna Central Girls High School), Thana Road, Shalgaria, Pabna
                                </p>
                            </div>
                            <div className='contact'>
                                <p>
                                    <b>
                                        Contact: 02588843212, 01991-404004, 01839-971200, 01818-115081 E-mail: abc_pabna2007@gmail.com
                                    </b>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="invoice-body">
                        <div className="heading">
                            <h2>Invoice</h2>
                        </div>
                        <div className='details-container'>
                            <div>
                                <div className='info-row'>
                                    <p className="left">
                                        Customer Name
                                    </p>
                                    :
                                    <p className="right">
                                        {order?.billingDetails?.cus_name}
                                    </p>
                                </div>
                                <div className='info-row'>
                                    <p className="left">
                                        Contact No.
                                    </p>
                                    :
                                    <p className="right">
                                        {order?.billingDetails?.cus_phone}
                                    </p>
                                </div>
                                <div className='info-row'>
                                    <p className="left">
                                        Address
                                    </p>
                                    :
                                    <p className="right">
                                        {order?.billingDetails?.cus_address}
                                    </p>
                                </div>
                                <div className='info-row'>
                                    <p className="left">
                                        Email
                                    </p>
                                    :
                                    <p className="right">
                                        {order?.billingDetails?.cus_email}
                                    </p>
                                </div>
                            </div>
                            <div>
                                <div className='info-row'>
                                    <p className="left">
                                        Invoice No.
                                    </p>
                                    :
                                    <p className="right">
                                        {order?.orderID}
                                    </p>
                                </div>
                                <div className='info-row'>
                                    <p className="left">
                                        Date
                                    </p>
                                    :
                                    <p className="right">
                                        {moment(order?.updatedAt).format('DD-MMM-YYYY hh:mm:ss A')}
                                    </p>
                                </div>
                                <div className='info-row'>
                                    <p className="left">
                                        Status
                                    </p>
                                    :
                                    <p className="right" style={{ textTransform: "capitalize" }}>
                                        {order?.payment_status}
                                    </p>
                                </div>
                                <div className='info-row'>
                                    <p className="left">
                                        Payment Method
                                    </p>
                                    :
                                    <p className="right">
                                        {order?.pay_method}
                                    </p>
                                </div>
                                <div className='info-row'>
                                    <p className="left">
                                        TranID/ACC
                                    </p>
                                    :
                                    <p className="right">
                                        {order?.tran_id} {order?.acc_number}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="products-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Product Name</th>
                                        <th>QTY</th>
                                        <th>Price</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        order?.invoiceProducts?.map((product, idx) => (
                                            <tr key={product?._id}>
                                                <td>{idx + 1}</td>
                                                <td>
                                                    {product?.productDetails?.productName}
                                                </td>
                                                <td>{formattedNumber(product?.qty)} PCS</td>
                                                <td>{formattedNumber(product?.productDetails?.discountPrice || product?.productDetails?.price)}</td>
                                                <td>{formattedNumber((product?.productDetails?.discountPrice || product?.productDetails?.price) * product?.qty)}</td>
                                            </tr>
                                        ))
                                    }


                                    <tr className='total-row'>
                                        <td colSpan="3"></td>
                                        <td>Grand Total</td>
                                        <td>{formattedNumber(order?.grandTotal)}</td>
                                    </tr>
                                    <tr className='total-row'>
                                        <td colSpan="3"></td>
                                        <td>Total Paid</td>
                                        <td>{formattedNumber(order?.grandTotal)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="conditions">
                            <span>Services: 01969-666676</span>
                            <span>Warranty: 01818-115081</span>
                            <p>
                                *Good One Sold are not Refundable & Exchangeable. Warranty are not Applicable for Mouse & all kinds of Cable.
                            </p>
                            <p>
                                *Warranty Support will not cover any kind of physical damage, burn & liquid case and time expiration.
                            </p>
                            <p>
                                *<b>For Any Warranty claim must show Invoice/Bill</b>
                            </p>
                        </div>
                        <div className='branding'>
                            <p>Developed by</p>
                            <p>CodeNext IT - <a href="www.codenextit.com">www.codenextit.com</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default SingleInvoice;