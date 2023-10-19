import preParsing from '../../../../lib/pre-parsing.js'

export default {
  preParsing,
  method: ['GET', 'POST'],
  handler: async function (ctx, req, reply) {
    const { importPkg, pascalCase, defaultsDeep, error } = this.bajo.helper
    const { recordGet, recordUpdate, redirectTo } = this.bajoWeb.helper
    const { getSchemaExt } = this.bajoAdmin.helper
    const { omit } = await importPkg('lodash-es')
    const coll = pascalCase(req.params.coll)
    const schema = await getSchemaExt(coll, 'edit')
    const data = await recordGet({ req })
    const params = omit(data, ['data'])
    let form = defaultsDeep(req.body, data.data)
    if (req.method === 'POST') {
      try {
        form = (await recordUpdate({ req })).data
        throw error('redirect')
      } catch (err) {
        if (err.message === 'redirect') redirectTo('bajoAdmin:/coll/:coll/list', { params: req.params })
      }
    }
    return reply.view('bajoAdmin:/coll/form', { form, params, schema, action: 'Edit Record' })
  }
}
