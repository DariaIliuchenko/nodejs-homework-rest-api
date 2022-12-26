const {Contact} = require("../../models/contact");
const { HTTPError } = require("../../helpers");

const updateFavorite = async (req, res) => {
  
  const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
        new: true,
    });
    if (!result) {
        throw HTTPError(404);
  }
  res.json(result);
};
module.exports = updateFavorite;
