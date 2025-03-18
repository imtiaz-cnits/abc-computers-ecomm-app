const { CreateInvoiceService, OrderListService } = require("../services/OrderService");

exports.PlaceOrder = async (req, res) => {
    try {
        const orderData = req.body; // Get data from frontend

        console.log(orderData);

        const response = await CreateInvoiceService(orderData);
        res.status(201).json({ success: true, message: "Order placed successfully", data: response });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.OrderList = async(req, res) => {
    try {
        let result = await OrderListService();
        return res.status(200).json(result); // Ensure JSON response
      } catch (e) {
        return res.status(500).json({ status: "Fail", data: e.toString() }); // Ensure JSON error response
      }
}