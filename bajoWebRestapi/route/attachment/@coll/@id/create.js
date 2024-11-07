async function create (req, reply) {
  const { importModule } = this.bajo.helper
  const { coll, id } = req.params
  const { mimeType, stats } = req.query
  const handleAttachmentUpload = await importModule('bajoDb:/lib/handle-attachment-upload.js')
  const result = await handleAttachmentUpload.call(this, { name: coll, id, options: { req, mimeType, stats } })
  return { data: result[0] }
}

export default create
