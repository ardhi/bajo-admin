import attachmentUploadHandler from '../../../../lib/crud/attachment-upload-handler.js'

export default {
  method: 'POST',
  handler: async function (req, reply) {
    const redirect = req.body.redirect
    await attachmentUploadHandler.call(this, { req, reply, redirect })
  }
}
