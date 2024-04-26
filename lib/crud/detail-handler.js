async function detailHandler ({ ctx, req, reply, coll, view = 'bajoAdmin:/coll/detail', tpl = {} } = {}) {
  const { pascalCase } = this.bajo.helper
  const { recordGet } = this.bajoWeb.helper
  const { getSchemaExt } = this.bajoAdmin.helper
  const { omit } = this.bajo.helper._
  coll = coll ?? pascalCase(req.params.coll)
  const { schema } = await getSchemaExt(coll, 'detail')
  req.query.attachment = true
  const data = await recordGet({ coll, req })
  const params = omit(data, ['data'])
  return reply.view(view, { form: data.data, params, schema, tpl })
}

export default detailHandler
