import userAPI from "../service/userService";

const loginAPI = async (req, res) => {
  try {
    // check data required
    console.log("check login API ");
    if (!req.body.account || !req.body.password) {
      return res.status(200).json({
        result: false,
        message: "your email/phone or password is required!",
      });
    }
    // call service registeruser
    let data = await userAPI.loginUser(req.body);
    if (data.result) {
      // return case success
      return res.status(200).json(data);
    }
    return res.status(400).json(data);
  } catch (error) {
    // return case error
    return res.status(500).json({
      result: false,
      message: "Error from server",
    });
  }
};

// API register user
const regesterAPI = async (req, res) => {
  try {
    // check data required
    console.log("check req ", req.body);
    if (!req.body.email || !req.body.phone || !req.body.password) {
      return res.status(200).json({
        result: false,
        messageError: "missing required parameters",
      });
    }
    // call service register user
    let data = await userAPI.registerUser(req.body);
    // return case success
    return res.status(200).json(data);
  } catch (error) {
    // return case error
    return res.status(500).json({
      result: false,
      message: "Error from server",
    });
  }
};

const updateAvatar = async (req, res) => {
  try {
    let data = await userAPI.updateAvatarService(req.body);
    return res.status(200).json(data);
  } catch (error) {
    // return case error
    return res.status(500).json({
      result: false,
      message: "Error from server",
    });
  }
};

const getInfo = async (req, res) => {
  try {
    let data = await userAPI.getUserInfoService(req.body);
    return res.status(200).json(data);
  } catch (error) {
    // return case error
    return res.status(500).json({
      result: false,
      message: "Error from server",
    });
  }
};

module.exports = {
  loginAPI,
  regesterAPI,
  updateAvatar,
  getInfo,
};
