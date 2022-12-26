const express = require('express')
const { validateBody, isValidId} = require("../../middlewares")
const {schemas} = require("../../models/contact")
const ctrl = require("../../controllers/contacts")
const { ctrlWrapper} = require("../../helpers")
const router = express.Router()

router.get('/', ctrlWrapper(ctrl.getAll));

router.get('/:contactId', isValidId, ctrlWrapper(ctrl.getById));

router.post('/', validateBody(schemas.addSchema), ctrlWrapper(ctrl.add));

router.delete('/:contactId', isValidId, ctrlWrapper(ctrl.removeById));

router.put('/:contactId', isValidId, validateBody(schemas.addSchema), ctrlWrapper(ctrl.updateById));

router.patch('/:contactId/favorite', validateBody(schemas.updateFavoriteSchema), ctrlWrapper(ctrl.updateFavorite))

module.exports = router
