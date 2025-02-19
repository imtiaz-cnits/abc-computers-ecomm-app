const {ProfileAddService} = require("../services/ProfileServices");


// ====================== Profile All Controller ====================== //

exports.AddProfile = async (req, res) => {
  try {
    const result = await ProfileAddService(req); // Call the service to handle the logic
    return res.status(200).json(result); // Send the response to the client
  } catch (error) {
    console.error("Error in AddProfile controller:", error);
    return res
      .status(500)
      .json({ status: "fail", message: "Error adding profile." });
  }
};
