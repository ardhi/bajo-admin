async function editHandler ({ ctx, req, reply, coll, view = 'bajoAdmin:/coll/form', redirect = 'bajoAdmin:/coll/:coll/list', tpl = {} } = {}) {
  const { pascalCase, defaultsDeep, error } = this.bajo.helper
  const { recordGet, recordUpdate, redirectTo } = this.bajoWeb.helper
  const { getSchemaExt } = this.bajoAdmin.helper
  const { omit, merge, get } = this.bajo.helper._
  coll = coll ?? pascalCase(req.params.coll)
  const { schema, config } = await getSchemaExt(coll, 'detail')
  const options = {}
  merge(options, get(config, `methodOptions.${req.method === 'POST' ? 'create' : 'update'}`))
  const data = await recordGet({ coll, req, options })
  const params = omit(data, ['data'])
  let form = defaultsDeep(req.body, data.data)
  if (req.method === 'POST') {
    try {
      form = (await recordUpdate({ coll, req })).data
      throw error('redirect')
    } catch (err) {
      if (err.message === 'redirect') redirectTo(redirect, { params: req.params })
    }
  }
  return reply.view(view, { form, params, schema, action: 'Edit Record', tpl })
}

export default editHandler
