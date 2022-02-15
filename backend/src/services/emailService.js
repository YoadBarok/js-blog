import { createTransport } from 'nodemailer';

const defaultTransporterSettings = {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    email: process.env.EMAIL,
    password: process.env.PASSWORD
}

class EmailService {

    getDefaultSettings() {
        return defaultTransporterSettings;
    }

    async sendEmail(to, subject, template, transporterSettings = defaultTransporterSettings) {
        let transporter = createTransport({
            host: transporterSettings.host,
            port: transporterSettings.port,
            secure: false,
            auth: {
                user: transporterSettings.email,
                pass: transporterSettings.password,
            },
            tls: {  // When using on local host!
                rejectUnauthorized: false,
            }
        });
        try {
            let info = await transporter.sendMail({
                from: `"Login app" <${transporterSettings.email}>`,
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
