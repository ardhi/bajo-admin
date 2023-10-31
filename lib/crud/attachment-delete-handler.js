async function attachmentDeleteHandler ({ ctx, req, reply, coll, redirect = 'bajoAdmin:/coll/:coll/list' }) {
  const { pascalCase } = this.bajo.helper
  const { redirectTo } = this.bajoWeb.helper
  const { attachmentRemove } = this.bajoDb.helper
  coll = coll ?? pascalCase(req.params.coll)
  const id = req.params.id ?? req.query.id
  const ids = (req.body.ids ?? '').split(',')
  for (const item of ids) {
    const [field, file] = item.split(':')
    await attachmentRemove(coll, id, field, file)
  }
  redirectTo(redirect, { params: req.params, query: req.query })
}

export default attachmentDeleteHandler
