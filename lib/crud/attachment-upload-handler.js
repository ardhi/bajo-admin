async function attachmentUploadHandler ({ ctx, req, reply, coll, redirect = 'bajoAdmin:/coll/:coll/list' }) {
  const { getConfig, importModule, pascalCase } = this.bajo.helper
  const { redirectTo } = this.bajoWeb.helper
  const cfg = getConfig('bajoDb', { full: true })
  coll = coll ?? pascalCase(req.params.coll)
  const id = req.params.id ?? req.query.id
  try {
    const handleAttachmentUpload = await importModule(`${cfg.dir.pkg}/lib/handle-attachment-upload.js`)
    await handleAttachmentUpload.call(this, { name: coll, id, options: { req } })
  } catch (err) {
    console.log(err)
  }

  redirectTo(redirect, { params: req.params, query: req.query })
}

export default attachmentUploadHandler
