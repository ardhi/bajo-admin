async function addHandler ({ ctx, req, reply, coll, tpl = 'bajoAdmin:/coll/form', redirect = 'bajoAdmin:/coll/:coll/list' } = {}) {
  const { pascalCase, error } = this.bajo.helper
  const { recordCreate, redirectTo } = this.bajoWeb.helper
  const { getSchemaExt } = this.bajoAdmin.helper
  coll = coll ?? pascalCase(req.params.coll)
  const schema = await getSchemaExt(coll, 'edit')
  let form = {}
  if (req.body) form = req.body
  else if (req.query.payload) { // cloned object via query string
    try {
      const decoded = atob(req.query.payload)
      form = JSON.parse(decoded)
    } catch (err) {}
  }
  if (req.method === 'POST') {
    try {
      form = (await recordCreate({ req })).data
      throw error('redirect')
    } catch (err) {
      if (err.message === 'redirect') redirectTo(redirect, { params: req.params })
    }
  }
  return reply.view(tpl, { form, schema, action: 'Add Record' })
}

export default addHandler
