import Contact from "../models/contact.js";

export const submitContact = async (req, res) => {
    try {
        const { name, email, phone, inquiry, subject, message, subscribe } = req.body;
        const attachment = req.file ? req.file.filename : null;

        const contact = new Contact({
            name,
            email,
            phone,
            inquiry,
            subject,
            message,
            attachment,
            subscribe: subscribe === "on" ? true : false,
        });

        await contact.save();

        res.json({ success: true, message: "Form submitted successfully!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error. Try later." });
    }
};