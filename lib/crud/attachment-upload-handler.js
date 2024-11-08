async function attachmentUploadHandler ({ req, reply, coll, redirect = 'bajoAdmin:/coll/:coll/list' }) {
  const { importModule, pascalCase } = this.bajo.helper
  coll = coll ?? pascalCase(req.params.coll)
  const id = req.params.id ?? req.query.id
  try {
    const handleAttachmentUpload = await importModule('bajoDb:/lib/handle-attachment-upload.js')
    await handleAttachmentUpload.call(this, { name: coll, id, options: { req } })
  } catch (err) {
    console.log(err)
  }

  await reply.redirectTo(redirect, { params: req.params, query: req.query })
}

export default attachmentUploadHandler
