async function listHandler ({ ctx, req, reply, coll, tpl = 'bajoAdmin:/coll/list' } = {}) {
  const { importPkg, pascalCase } = this.bajo.helper
  const { recordFind } = this.bajoWeb.helper
  const { getSchemaExt } = this.bajoAdmin.helper
  const { isEmpty, omit, get } = await importPkg('lodash-es')
  coll = coll ?? pascalCase(req.params.coll)
  const schema = await getSchemaExt(coll, 'list')
  if (!req.query.sort) req.query.sort = get(schema, 'view.defSort')
  const data = await recordFind({ coll, req })
  if (!isEmpty(req.query.view)) req.session.adminView = req.query.view
  if (!req.session.adminView) req.session.adminView = 'table'
  const params = omit(data, ['data'])
  return reply.view(tpl, { data: data.data, params, view: req.session.adminView, schema })
}

export default listHandler
