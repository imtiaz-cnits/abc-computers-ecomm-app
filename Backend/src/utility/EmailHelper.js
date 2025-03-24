const nodemailer = require("nodemailer");

const EmailSend = async (EmailTo, EmailText, EmailSubject) => {
    try {
        let transporter = nodemailer.createTransport({
            host: "mail.abcpabnabd.com",
            port: 587, // or 587 if TLS is required
            secure: false, // Use true for port 465, false for 587
            auth: {
                user: "order@abcpabnabd.com",
                pass: 'a+a+.o6m(S0}', // ⚠️ Move this to a config file or env variable
            },
            tls: {
                rejectUnauthorized: false, // Use only if facing SSL issues
            }
        });

        let mailOptions = {
            from: '"ABC Computers Pabna" <order@abcpabnabd.com>',
            to: EmailTo,
            subject: EmailSubject,
            text: EmailText,
        };

        let info = await transporter.sendMail(mailOptions);
        console.log("Email sent successfully:", info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error("Error sending email:", error);
        return { success: false, error: error.message };
    }
};

module.exports = EmailSend;