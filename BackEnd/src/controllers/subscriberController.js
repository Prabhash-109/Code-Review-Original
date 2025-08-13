const Subscriber=require('../Models/Subscriber.js');
const {sendConfirmationEmail}=require('../services/emailService.js')

const subscribeUser = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const existingSubscriber = await Subscriber.findOne({ email });
    if (existingSubscriber) {
      return res.status(400).json({ message: "Already subscribed" });
    }

    const subscriber = new Subscriber({ email });
    await subscriber.save();

    await sendConfirmationEmail(email);

    res.status(201).json({ message: "Subscribed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { subscribeUser };
