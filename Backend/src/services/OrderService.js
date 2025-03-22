const mongoose = require("mongoose");
const BillingDetailModel = require("../models/BillingDetailModel");
const InvoiceProductModel = require("../models/InvoiceProductModel");
const PaymentModel = require("../models/PaymentModel");
const ObjectID = mongoose.Types.ObjectId;
const FormData = require("form-data");
const axios = require("axios");

const CreateInvoiceService = async (orderData) => {
    // Function to generate a unique order ID dynamically
    const generateOrderID = async () => {
        try {
            // Fetch the last order from InvoiceProductModel
            const latestOrder = await PaymentModel.findOne().sort({ createdAt: -1 });

            // Extract the last order number or start from 0
            const lastNumber = latestOrder ? parseInt(latestOrder.orderID.split("-")[2]) : 0;

            // Increment the order number and format it as 6-digit
            const orderNumber = (lastNumber + 1).toString().padStart(6, "0");

            return `#ABC-2025-${orderNumber}`;
        } catch (error) {
            throw new Error("Failed to generate order ID: " + error.message);
        }
    };
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
            orderID,
            billingDetailID: savedBilling._id,
            subTotal: paymentDetails.subTotal,
            discount: paymentDetails.discount,
            grandTotal: paymentDetails.grandTotal,
            pay_method: paymentDetails.pay_method,
            tran_id: paymentDetails.tran_id,
            acc_number: paymentDetails.acc_number,
            payment_status: "pending"
        });

        const savedPayment = await newPayment.save();

        const newInvoiceProducts = await InvoiceProductModel.find({ orderID }).populate({
            path: "productID",
            populate: [
                { path: "subCategoryID" }
            ]
        })

        return { orderID, billing: savedBilling, invoiceProducts: newInvoiceProducts, payment: savedPayment };
    } catch (error) {
        throw new Error("Order processing failed: " + error.message);
    }
};


const OrderListService = async () => {
    try {
        const data = await PaymentModel.aggregate([
            {
                $lookup: {
                    from: "invoiceproducts", // Collection name
                    localField: "orderID",
                    foreignField: "orderID",
                    as: "invoiceProducts",
                },
            },
            {
                $unwind: { path: "$invoiceProducts", preserveNullAndEmptyArrays: true }, // Flatten invoiceProducts
            },
            {
                $lookup: {
                    from: "billingdetails", // Collection name
                    localField: "billingDetailID",
                    foreignField: "_id",
                    as: "billingDetails",
                },
            },
            {
                $unwind: { path: "$billingDetails", preserveNullAndEmptyArrays: true }, // Flatten billing details
            },
            {
                $lookup: {
                    from: "products", // Collection name
                    localField: "invoiceProducts.productID",
                    foreignField: "_id",
                    as: "invoiceProducts.productDetails",
                },
            },
            {
                $unwind: { path: "$invoiceProducts.productDetails", preserveNullAndEmptyArrays: true }, // Flatten productDetails
            },
            {
                $group: {
                    _id: "$_id",
                    acc_number: { $first: "$acc_number" },
                    billingDetailID: { $first: "$billingDetailID" },
                    billingDetails: { $first: "$billingDetails" },
                    createdAt: { $first: "$createdAt" },
                    discount: { $first: "$discount" },
                    grandTotal: { $first: "$grandTotal" },
                    orderID: { $first: "$orderID" },
                    pay_method: { $first: "$pay_method" },
                    payment_status: { $first: "$payment_status" },
                    subTotal: { $first: "$subTotal" },
                    tran_id: { $first: "$tran_id" },
                    updatedAt: { $first: "$updatedAt" },
                    invoiceProducts: { $push: "$invoiceProducts" },
                },
            }
        ]).sort({ createdAt: -1 })
        return { status: "success", data: data }; // Ensure JSON response
    } catch (e) {
        return { status: "Fail", data: e.toString() }; // Ensure JSON error response
    }
}


const OrderStatusUpdateService = async (req) => {
    try {
        const id = req.params.id
        const status = req.body.status

        const existingPayment = await PaymentModel.findById(id)

        if (!existingPayment) {
            return { status: "fail", message: "Payment not found" };
        }

        existingPayment.payment_status = status

        await existingPayment.save()

        return {
            status: "success",
            message: "Payment Status updated successfully",
            data: existingPayment,
        };
    } catch (error) {
        console.error("Error in OrderStatusUpdateService:", error.message);
        return {
            status: "fail",
            message: "Error updating payment status. Please try again.",
        };
    }
}


const OrderDeleteService = async (billingDetailID) => {
    try {
        // Step 1: Delete Payment
        const payment = await PaymentModel.findOne({ billingDetailID })
        if (!payment) {
            return { status: "fail", message: "Payment not found" };
        }

        await PaymentModel.deleteOne({ billingDetailID })


        // Step 2: Delete Invoice Products
        await InvoiceProductModel.deleteMany({ billingDetailID })

        // Step 3: Delete Billing Details
        await BillingDetailModel.findByIdAndDelete(billingDetailID)

        return { status: "success" }; // Ensure JSON response
    } catch (e) {
        return { status: "Fail", data: e.toString() }; // Ensure JSON error response
    }
}

module.exports = { CreateInvoiceService, OrderListService, OrderDeleteService, OrderStatusUpdateService };