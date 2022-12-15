const contacts = require("../../models/contacts");
const { HTTPError } = require("../../helpers");
const removeById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);
  if (!result) {
    throw HTTPError(404);
  }
  res.json({
    message: "contact deleted",
  });
};
module.exports = removeById;
