async function deleteHandler ({ ctx, req, reply, coll, redirect = 'bajoAdmin:/coll/:coll/list' }) {
  const { pascalCase } = this.bajo.helper
  const { getSchemaExt } = this.bajoAdmin.helper
  const { recordRemove } = this.bajoWeb.helper
  const { get, merge } = this.bajo.helper._
  const ids = (req.body.ids ?? '').split(',')
  coll = coll ?? pascalCase(req.params.coll)
  const { config } = await getSchemaExt(coll, 'detail')
  const options = {}
  merge(options, get(config, 'methodOptions.remove'))
  for (const id of ids) {
    await recordRemove({ coll, id, req, options })
  }
  await reply.redirectTo(redirect, { params: req.params })
}

export default deleteHandler
