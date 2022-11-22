import { createTransport } from 'nodemailer';

class EmailService {

    transporterSettings = {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        email: process.env.EMAIL_USER,
        password: process.env.EMAIL_PASS
    }

    getDefaultSettings() {
        return DEFAULTSETTINGS;
    }

    createTransporter() {
        let transporter = createTransport({
            host: this.transporterSettings.host,
            port: this.transporterSettings.port,
            secure: true,
            auth: {
                user: this.transporterSettings.email,
                pass: this.transporterSettings.password,
            },
            tls: {  // When using on local host!
                rejectUnauthorized: true,
            }
        });
        return transporter;
    }
    
    async sendEmail(to, subject, template) {
        let transporter = this.createTransporter()
        try {
            await transporter.sendMail({
                from: `"Login app" <${this.transporterSettings.email}>`,
                to: to, // can be multiple (list)
                subject: subject,
                text: "",
                html: template,
            });
            return `sent to ${to}!`;
        } catch (err) {
            console.log(err);
        }
    }
}

const emailService = new EmailService();
export { emailService };
