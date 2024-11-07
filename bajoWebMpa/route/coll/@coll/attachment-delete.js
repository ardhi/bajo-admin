import attachmentDeleteHandler from '../../../../lib/crud/attachment-delete-handler.js'

export default {
  method: 'POST',
  handler: async function (req, reply) {
    const redirect = req.body.redirect
    await attachmentDeleteHandler.call(this, { req, reply, redirect })
  }
}
