async function deleteHandler ({ ctx, req, reply, coll, redirect = 'bajoAdmin:/coll/:coll/list' }) {
  const { pascalCase } = this.bajo.helper
  const { recordRemove, redirectTo } = this.bajoWeb.helper
  const ids = (req.body.ids ?? '').split(',')
  coll = coll ?? pascalCase(req.params.coll)
  for (const id of ids) {
    await recordRemove({ coll, id, req })
  }
  redirectTo(redirect, { params: req.params })
}

export default deleteHandler
