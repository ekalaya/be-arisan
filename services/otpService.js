const otpStore = new Map();

function generateOTP(phone) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore.set(phone, otp);
    setTimeout(() => otpStore.delete(phone), 5 * 60 * 1000); // expired 5 menit
    return otp;
}

function verifyOTP(phone, inputOtp) {
    const validOtp = otpStore.get(phone);
    return validOtp && validOtp === inputOtp;
}

module.exports = { generateOTP, verifyOTP };
