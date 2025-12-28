require("dotenv").config();
const nodemailer = require("nodemailer");
const express = require("express");

const router = express.Router();

/* -------------------- Email Transporter (created once) -------------------- */
const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

/* -------------------- Welcome Email Function -------------------- */
async function sendWelcomeEmail(toEmail, username) {
    return transporter.sendMail({
        from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_USER}>`,
        to: toEmail,
        subject: "Welcome to BlogBase",
        text: `Hi ${username}, welcome to BlogBase!`,
        html: `
        <!doctype html>
        <html>
        <body style="margin:0;padding:0;background:#f4f6f8;font-family:Arial,Helvetica,sans-serif;">
            <table width="100%" style="max-width:680px;margin:24px auto;background:#ffffff;border-radius:12px;overflow:hidden;">
                
                <tr>
                    <td style="padding:20px;background:#4f46e5;color:#fff;">
                        <h2 style="margin:0;">Welcome to BlogBase 🎉</h2>
                    </td>
                </tr>

                <tr>
                    <td style="padding:24px;">
                        <p style="font-size:15px;color:#374151;">
                            Hi <b>${username}</b>,<br/><br/>
                            Thanks for signing up on BlogBase. You can now create, share, and explore blogs from the community.
                        </p>
                        <p style="margin-top:16px;">
                            <a href="https://yourwebsite.com"
                               style="background:#4f46e5;color:#fff;padding:10px 18px;
                               border-radius:6px;text-decoration:none;font-size:14px;">
                               Start Exploring →
                            </a>
                        </p>
                    </td>
                </tr>

                <tr>
                    <td style="padding:14px;background:#f9fafb;text-align:center;font-size:13px;color:#6b7280;">
                        © ${new Date().getFullYear()} BlogBase
                    </td>
                </tr>
            </table>
        </body>
        </html>
        `,
    });
}

/* -------------------- Route -------------------- */
router.post("/", async (req, res) => {
    const { gmail, Username } = req.body;

    if (!gmail || !Username) {
        return res.status(400).json({ msg: "Email and username are required" });
    }

    try {
        await sendWelcomeEmail(gmail, Username);
        return res.status(200).json({ msg: "Welcome email sent successfully" });
    } catch (error) {
        console.error("Email send failed:", error.message);
        return res.status(500).json({ msg: "Failed to send email" });
    }
});

module.exports = router;
