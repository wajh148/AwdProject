const userDB = require("../../models/users/usermodel");
const bcrypt = require("bcryptjs");
const cloudinary = require("../../cloudinery/cloudinery");
const jwt = require("jsonwebtoken");
const { JsonWebTokenError } = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;
const { transporter } = require("../../helper");

// user register
exports.register = async (req, res) => {
    const file = req.file ? req.file.path : "";
    const { username, email, password, confirmpassword } = req.body;

    if (!username || !email || !password || !confirmpassword || !file) {
        return res.status(400).json({ error: "all fields are required" }); // ✅ added return
    }

    const upload = await cloudinary.uploader.upload(file);

    try {
        const preuser = await userDB.findOne({ email: email });

        if (preuser) {
            return res.status(400).json({ error: "this user already exists" }); // ✅ added return
        } else if (password !== confirmpassword) {
            return res.status(400).json({ error: "password and confirm password do not match" }); // ✅ added return
        } else {
            const haspassword = await bcrypt.hash(password, 12);

            const userData = new userDB({
                username,
                email,
                password: haspassword,
                userprofile: upload.secure_url
            });

            await userData.save();
            return res.status(200).json(userData);
        }

    } catch (error) {
        console.log("catch block error", error);
        return res.status(500).json({ error: error });
    }
}

// user login
exports.login = async (req, res) => {
    const { email, password } = req.body;
    console.log(":", req.body);

    if (!email || !password) {
        return res.status(400).json({ error: "all fields are required" }); // ✅ fixed username → email
    }

    try {
        const userValid = await userDB.findOne({ email: email });
        if (userValid) {
            const isMatch = await bcrypt.compare(password, userValid.password);

            if (!isMatch) {
                return res.status(400).json({ error: "invalid details" });
            } else {
                // token generate 
                const token = await userValid.generateAuthtoken();
                const result = { token };
                return res.status(200).json({ result, message: "user successfully logged in" });
            }
        } else {
            return res.status(400).json({ error: "this user does not exist in db" });
        }
    } catch (error) {
        console.log("catch block error", error);
        return res.status(500).json({ error: error });
    }
}

// user verify
exports.userVarify = async (req, res) => {
    try {
        const verifyUser = await userDB.findOne({ _id: req.userId });
        return res.status(200).json(verifyUser);
    } catch (error) {
        console.log("catch block error", error);
        return res.status(500).json({ error: error });
    }
}

// forget password
exports.forgetpassword = async (req, res) => {
    const { email } = req.body; // ✅ fixed typo emial → email
    if (!email) {
        return res.status(400).json({ error: "enter your email" });
    }
    try {
        const userfind = await userDB.findOne({ email: email });
        if (!userfind) {
            return res.status(400).json({ error: "this user does not exist in db" });
        } else {
            const token = jwt.sign({ _id: userfind._id }, SECRET_KEY, { expiresIn: "120s" });
            const setuserToken = await userDB.findByIdAndUpdate(
                { _id: userfind._id },
                { verifytoken: token },
                { new: true }
            );

            if (setuserToken) {
                const mailOptions = {
                    from: process.env.EMAIL,
                    to: email,
                    subject: "sending email for password reset",
                    html: `
                        <h2>Password reset request</h2>
                        <p>Hi ${userfind.username},</p>
                        <p>You requested to reset your password. Please click the link below:</p>
                        <a href="https://localhost:3001/resetpassword/${userfind._id}/${setuserToken.verifytoken}" style="display:inline-block;">Reset Password</a>
                        <p>If you did not request this, ignore this email.</p>
                        <p>Thank you</p>
                    `
                }

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log("error", error);
                        return res.status(400).json({ error: "email not sent" });
                    } else {
                        console.log("Email sent", info.response);
                        return res.status(200).json({ message: "email sent successfully" });
                    }
                });

            } else {
                return res.status(400).json({ error: "user invalid" });
            }
        }

    } catch (error) {
        console.log("catch block error", error);
        return res.status(500).json({ error: error });
    }
}

// forget password verify
exports.forgetpasswordVerify = async (req, res) => {
    const { id, token } = req.params;

    try {
        const validUser = await userDB.findOne({ _id: id, verifytoken: token });
        const verifyToken = jwt.verify(token, SECRET_KEY); // ✅ fixed jst → jwt
        if (validUser && verifyToken._id) {
            return res.status(200).json({ message: "valid user" });
        } else {
            return res.status(400).json({ error: "link expired" });
        }
    } catch (error) {
        console.log("catch block error", error);
        return res.status(500).json({ error: error });
    }
}

// reset password
exports.resetPassword = async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;

    try {
        const validUser = await userDB.findOne({ _id: id, verifytoken: token });
        const verifyToken = jwt.verify(token, SECRET_KEY); // ✅ fixed jst → jwt
        if (validUser && verifyToken._id) {
            const newpassword = await bcrypt.hash(password, 12);
            const setUsernewPassword = await userDB.findByIdAndUpdate(
                { _id: id },
                { password: newpassword },
                { new: true }
            );
            return res.status(200).json({ message: "password successfully updated", setUsernewPassword });
        } else {
            return res.status(400).json({ error: "link expired" });
        }

    } catch (error) {
        console.log("catch block error", error);
        return res.status(500).json({ error: error });
    }
}
