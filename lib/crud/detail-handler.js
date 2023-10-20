async function detailHandler ({ ctx, req, reply, coll, tpl = 'bajoAdmin:/coll/detail' } = {}) {
  const { importPkg, pascalCase } = this.bajo.helper
  const { recordGet } = this.bajoWeb.helper
  const { getSchemaExt } = this.bajoAdmin.helper
  const { omit } = await importPkg('lodash-es')
  coll = coll ?? pascalCase(req.params.coll)
  const schema = await getSchemaExt(coll, 'detail')
  const data = await recordGet({ coll, req })
  const params = omit(data, ['data'])
  return reply.view(tpl, { form: data.data, params, schema })
}

export default detailHandler
