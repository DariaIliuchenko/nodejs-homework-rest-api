const Jimp = require("jimp");
const fs = require("fs/promises");
const path = require("path");

const { User } = require("../../models/user");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { _id: userId } = req.user;
  const { path: tempUpload, originalname } = req.file;

  const filename = `${userId}_${originalname}`;
  const resultUpload = path.join(avatarsDir, filename);
  await fs.rename(tempUpload, resultUpload);

  const imageAvatar = await Jimp.read(resultUpload);
  const resizeAvatar = await imageAvatar.resize(250, 250);
  await resizeAvatar.write(resultUpload);

  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(userId, { avatarURL });

  res.json({
    avatarURL,
  });
};

module.exports = updateAvatar;