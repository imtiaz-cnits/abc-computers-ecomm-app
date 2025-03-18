const createInvoiceService = require("../services/OrderService");

exports.placeOrder = async (req, res) => {
    try {
        const orderData = req.body; // Get data from frontend

        console.log(orderData);

        const response = await createInvoiceService(orderData);
        res.status(201).json({ success: true, message: "Order placed successfully", data: response });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
