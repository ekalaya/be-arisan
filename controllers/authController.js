const jwt = require('jsonwebtoken');
const { generateOTP, verifyOTP } = require('../services/otpService');
const { sendMessage } = require('../services/whatsappService');

const JWT_SECRET = process.env.JWT_SECRET;

exports.login = async (req, res) => {
    const { phone } = req.body;
    const otp = generateOTP(phone);
    await sendMessage(phone, `Kode OTP kamu adalah: ${otp}`);
    res.json({ message: 'OTP dikirim via WhatsApp' });
};

exports.verify = (req, res) => {
    const { phone, otp } = req.body;
    const isValid = verifyOTP(phone, otp);

    if (!isValid) return res.status(400).json({ error: 'OTP salah atau kadaluarsa' });

    const token = jwt.sign({ phone }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token });
};
