const nodemailer = require("nodemailer");

const EmailSend = async (EmailTo, EmailHtml, EmailSubject) => {
    try {
        let transporter = nodemailer.createTransport({
            host: "160.191.80.34", // Directly use mail server IP
            port: 587,
            secure: false,
            auth: {
                user: "order@abcpabnabd.com",
                pass: "i,cWRhyUdnBO",
            },
            pool: true,
            tls: {
                rejectUnauthorized: false,
            }
        });

        let mailOptions = {
            from: '"ABC Computers Pabna" <order@abcpabnabd.com>',
            to: EmailTo,
            subject: EmailSubject,
            html: EmailHtml,
        };

        let info = await transporter.sendMail(mailOptions);
        console.log("✅ Email sent successfully:", info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error("❌ Error sending email:", error);
        return { success: false, error: error.message };
    }
};

module.exports = EmailSend;
