const mongoose = require("mongoose");
const BillingDetailModel = require("../models/BillingDetailModel");
const InvoiceProductModel = require("../models/InvoiceProductModel");
const PaymentModel = require("../models/PaymentModel");
const ObjectID = mongoose.Types.ObjectId;
const FormData = require("form-data");
const axios = require("axios");

// Function to generate a unique order ID dynamically
const generateOrderID = async () => {
    try {
        // Fetch the last order from InvoiceProductModel
        const latestOrder = await InvoiceProductModel.findOne().sort({ createdAt: -1 });

        // Extract the last order number or start from 0
        const lastNumber = latestOrder ? parseInt(latestOrder.orderID.split("-")[2]) : 0;

        // Increment the order number and format it as 6-digit
        const orderNumber = (lastNumber + 1).toString().padStart(6, "0");

        return `#ABC-2025-${orderNumber}`;
    } catch (error) {
        throw new Error("Failed to generate order ID: " + error.message);
    }
};

const createInvoiceService = async (orderData) => {
    const { billingDetails, cartItems, paymentDetails } = orderData;

    try {
        // Step 1: Generate custom order ID
        const orderID = await generateOrderID();

        // Step 2: Save billing details
        const newBilling = new BillingDetailModel(billingDetails);
        const savedBilling = await newBilling.save();

        // Step 3: Save ordered products with the generated order ID
        const invoiceProducts = cartItems.map(item => ({
            productID: item.productID,
            billingDetailID: savedBilling._id,
            orderID, // Assign dynamically generated order ID
            qty: item.qty,
            color: item.color
        }));

        const savedInvoiceProducts = await InvoiceProductModel.insertMany(invoiceProducts);

        // Step 4: Save payment details
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

        return { orderID, billing: savedBilling, invoiceProducts: savedInvoiceProducts, payment: savedPayment };
    } catch (error) {
        throw new Error("Order processing failed: " + error.message);
    }
};

module.exports = createInvoiceService;