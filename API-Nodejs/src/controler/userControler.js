const loginAPI = async (req, res) => {
  try {
    // check data required
    if (!req.body.account || !req.body.password) {
      return res.status(200).json({
        result: false,
        message: "your email/phone or password is required!",
      });
    }
    // call service registeruser
    let data = await userAPI.loginUser(req.body);
    // return case success
    return res.status(200).json(data);
  } catch (error) {
    // return case error
    return res.status(500).json({
      result: false,
      message: "error form server",
    });
  }
};

module.exports = {
  loginAPI,
};
