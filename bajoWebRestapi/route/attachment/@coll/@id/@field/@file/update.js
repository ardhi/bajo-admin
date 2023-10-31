async function update (ctx, req, reply) {
  const { importModule, getConfig } = this.bajo.helper
  const { attachmentRemove } = this.bajoDb.helper
  const { coll, id, field, file } = req.params
  const { mimeType, stats } = req.query
  await attachmentRemove(coll, id, field, file)
  const cfg = getConfig('bajoDb', { full: true })
  const handleAttachmentUpload = await importModule(`${cfg.dir.pkg}/lib/handle-attachment-upload.js`)
  const result = await handleAttachmentUpload.call(this, { name: coll, id, options: { req, mimeType, stats, setField: field, setFile: file } })
  return { data: result[0] }
}

export default update
