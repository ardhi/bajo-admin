async function editHandler ({ ctx, req, reply, coll, tpl = 'bajoAdmin:/coll/form', redirect = 'bajoAdmin:/coll/:coll/list' } = {}) {
  const { importPkg, pascalCase, defaultsDeep, error } = this.bajo.helper
  const { recordGet, recordUpdate, redirectTo } = this.bajoWeb.helper
  const { getSchemaExt } = this.bajoAdmin.helper
  const { omit } = await importPkg('lodash-es')
  coll = coll ?? pascalCase(req.params.coll)
  const schema = await getSchemaExt(coll, 'edit')
  const data = await recordGet({ req })
  const params = omit(data, ['data'])
  let form = defaultsDeep(req.body, data.data)
  if (req.method === 'POST') {
    try {
      form = (await recordUpdate({ req })).data
      throw error('redirect')
    } catch (err) {
      if (err.message === 'redirect') redirectTo(redirect, { params: req.params })
    }
  }
  return reply.view(tpl, { form, params, schema, action: 'Edit Record' })
}

export default editHandler
