const User = require("./../../model/user.model");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../../middleware/jwt.middleware");

const userSignin = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return res.status(409).json({
        message: "Email already in use",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username: username.trim(),
      email: normalizedEmail,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    const payload = {
      id: savedUser._id,
      username: savedUser.username,
    };
    const token = generateToken(payload);
    return res.status(201).json({ message: "User created successfully", token });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ message: "User creation failed" });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const payload = {
      id: user._id,
      username: user.username,
    };
    // generating new token while user login
    const token = generateToken(payload);
    return res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Login failed" });
  }
};


module.exports = {
  userSignin,
  userLogin,
};
