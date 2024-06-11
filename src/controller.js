const User = require("./model/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Post = require("./model/post.model");

module.exports = {
  registration: async (request, response) => {
    try {
      const { password, email, name } = request.body;
      const checkEmail = await User.findOne({ email: email });
      if (checkEmail) {
        return response.status(400).json({ email: "Email already exists" });
      }
      const registration = await User.create({
        email: email,
        name: name,
        password: await bcrypt.hash(password, 8),
      });
      return response.status(200).json({
        success: true,
        message: "successfully registered",
        data: registration,
      });
    } catch (error) {
      console.error(error);
      return response.status(500).json({
        success: false,
        message: "INTERNAL SERVER ERROR",
      });
    }
  },
  login: async (request, response) => {
    try {
      const { password, email } = request.body;
      const findEmail = await User.findOne({ email });
      if (!findEmail) {
        return res.status(404).json({ email: "User not found" });
      }
      const check = await bcrypt.compare(password, findEmail.password);
      if (check === true) {
        const payload = { name: findEmail.name, email: findEmail.email };
        const token = jwt.sign(payload, process.env.secretKey);
        return response.status(200).json({
          success: true,
          message: "successfully registered",
          data: token,
        });
      }
      return response.status(404).json({
        success: false,
        message: "Password is incorrect",
      });
    } catch (error) {
      console.error(error);
      return response.status(500).json({
        success: false,
        message: "INTERNAL SERVER ERROR",
      });
    }
  },
  create: async (request, response) => {
    try {
      const { title, body, active, lat, long } = request.body;
      const createPost = await Post.create({
        title,
        body,
        createdBy: request.user.name,
        active,
        geoLocation: { lat: lat, long: long },
      });
      return response.status(200).json({
        success: true,
        message: "successfully registered",
        data: createPost,
      });
    } catch (error) {
      console.error(error);
      return response.status(500).json({
        success: false,
        message: "INTERNAL SERVER ERROR",
      });
    }
  },
  update: async (request, response) => {
    try {
      const updatedPost = await Post.findOneAndUpdate(
        { _id: request.params.postID, name: request.user.name },
        request.body,
        { new: true }
      );
      if (!updatedPost) {
        return response
          .status(404)
          .json({ success: false, message: "you don't have rights to update" });
      }
      return response.status(200).json({
        success: true,
        message: "successfully updated",
        data: updatedPost,
      });
    } catch (error) {
      console.error(error);
      return response.status(500).json({
        success: false,
        message: "INTERNAL SERVER ERROR",
      });
    }
  },
  get: async (request, response) => {
    try {
      const getPost = await Post.findOne({ createdBy: request.user.name });
      return response.status(200).json({
        success: true,
        message: "successfully fetched",
        data: getPost,
      });
    } catch (error) {
      console.error(error);
      return response.status(500).json({
        success: false,
        message: "INTERNAL SERVER ERROR",
      });
    }
  },
  delete: async (request, response) => {
    try {
      const deletePost = await Post.findByIdAndDelete({
        _id: request.params.postID,
      });
      return response.status(200).json({
        success: true,
        message: "successfully deleted",
        data: deletePost,
      });
    } catch (error) {
      console.error(error);
      return response.status(500).json({
        success: false,
        message: "INTERNAL SERVER ERROR",
      });
    }
  },
  latAndLong: async (request, response) => {
    try {
      const { lat, long } = request.body;
      const getPost = await Post.findOne({
        "geoLocation.lat": lat,
        "geoLocation.long": long,
      });
      if (!getPost) {
        return response.status(404).json({
          success: false,
          message: "Post not found",
        });
      }
      return response.status(200).json({
        success: true,
        message: "successfully fetched",
        data: getPost,
      });
    } catch (error) {
      console.error(error);
      return response.status(500).json({
        success: false,
        message: "INTERNAL SERVER ERROR",
      });
    }
  },
  countActive: async (request, response) => {
    try {
      const { active } = request.query;
      const check = active == "true";
      const activePost = await Post.find({ active: check }).count();
      return response.status(200).json({
        success: true,
        message: "Number of Active and inActive post",
        data: activePost,
      });
    } catch (error) {
      console.error(error);
      return response.status(500).json({
        success: false,
        message: "INTERNAL SERVER ERROR",
      });
    }
  },
};
