async function create (ctx, req, reply) {
  const { importModule, getConfig } = this.bajo.helper
  const { coll, id } = req.params
  const { mimeType, stats } = req.query
  const cfg = getConfig('bajoDb', { full: true })
  const handleAttachmentUpload = await importModule(`${cfg.dir.pkg}/lib/handle-attachment-upload.js`)
  const result = await handleAttachmentUpload.call(this, { name: coll, id, options: { req, mimeType, stats } })
  return { data: result[0] }
}

export default create
