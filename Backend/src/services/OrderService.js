const mongoose = require("mongoose");
const BillingDetailModel = require("../models/BillingDetailModel");
const InvoiceProductModel = require("../models/InvoiceProductModel");
const PaymentModel = require("../models/PaymentModel");
const ObjectID = mongoose.Types.ObjectId;
const FormData = require("form-data");
const axios = require("axios");

const createInvoiceService = async (orderData) => {
    const { billingDetails, cartItems, paymentDetails } = orderData;

    try {
        // Step 1: Save billing details
        const newBilling = new BillingDetailModel(billingDetails);
        const savedBilling = await newBilling.save();


        const orderID = 12342424 // Generate order ID

        // Step 2: Save ordered products
        const invoiceProducts = cartItems.map(item => ({
            productID: item.productID,
            billingDetailID: savedBilling._id,
            orderID: orderID,
            qty: item.qty,
            color: item.color
        }));

        const savedInvoiceProducts = await InvoiceProductModel.insertMany(invoiceProducts);

        // Step 3: Save payment details
        const newPayment = new PaymentModel({
            invoiceID: savedBilling._id,
            subTotal: paymentDetails.subTotal,
            discount: paymentDetails.discount,
            grandTotal: paymentDetails.grandTotal,
            pay_method: paymentDetails.pay_method,
            tran_id: paymentDetails.tran_id,
            acc_number: paymentDetails.acc_number,
            payment_status: "pending"
        });

        const savedPayment = await newPayment.save();

        return { billing: savedBilling, invoiceProducts: savedInvoiceProducts, payment: savedPayment };
    } catch (error) {
        throw new Error("Order processing failed: " + error.message);
    }
}

module.exports = createInvoiceService;