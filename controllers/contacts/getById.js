const contacts = require("../../models/contacts");
const { HTTPError } = require("../../helpers");
const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.getContactById(contactId);
  if (!result) {
    throw HTTPError(404);
  }

  res.json(result);
};
module.exports = getById;
