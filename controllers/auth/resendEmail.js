const { User } = require("../../models/user");

const { HTTPError, sendEmail } = require("../../helpers");

const { BASE_URL } = process.env;

const resendEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HTTPError(404);
  }

  if (user.verify === true) {
    throw HTTPError(400, "Verification has already been passed");
  }

  const mail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}">Click to verify</a>`,
  };

  await sendEmail(mail);

  res.json({
    message: "resend verify link",
  });
};

module.exports = resendEmail;