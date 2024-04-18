async function listHandler ({ ctx, req, reply, coll, view = 'bajoAdmin:/coll/list', tpl = {} } = {}) {
  const { pascalCase } = this.bajo.helper
  const { recordFind } = this.bajoWeb.helper
  const { getSchemaExt } = this.bajoAdmin.helper
  const { isEmpty, omit, get } = this.bajo.helper._
  const options = { count: true }
  coll = coll ?? pascalCase(req.params.coll)
  const schema = await getSchemaExt(coll, 'list')
  if (!req.query.sort) req.query.sort = get(schema, 'view.defSort')
  req.query.attachment = true
  const data = await recordFind({ coll, req, options })
  if (!isEmpty(req.query.view)) req.session.adminView = req.query.view
  if (!req.session.adminView) req.session.adminView = 'table'
  const params = omit(data, ['data'])
  return reply.view(view, { data: data.data, params, view: req.session.adminView, schema, tpl })
}

export default listHandler
