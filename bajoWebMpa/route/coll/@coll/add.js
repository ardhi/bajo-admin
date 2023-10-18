import buildCollMenu from '../../../../lib/build-coll-menu.js'

export default {
  method: ['GET', 'POST'],
  handler: async function (ctx, req, reply) {
    const { pascalCase, error } = this.bajo.helper
    const { recordCreate, redirectTo } = this.bajoWeb.helper
    const { getSchemaExt } = this.bajoAdmin.helper
    const coll = pascalCase(req.params.coll)
    const schema = await getSchemaExt(coll, 'edit')
    let form = {}
    if (req.body) form = req.body
    else if (req.query.payload) { // cloned object via query string
      try {
        const decoded = atob(req.query.payload)
        form = JSON.parse(decoded)
      } catch (err) {}
    }
    const collMenu = await buildCollMenu.call(this)
    if (req.method === 'POST') {
      try {
        form = (await recordCreate({ req })).data
        throw error('redirect')
      } catch (err) {
        if (err.message === 'redirect') redirectTo('bajoAdmin:/coll/:coll/list', { params: req.params })
      }
    }
    return reply.view('bajoAdmin:/coll/form', { form, schema, collMenu, action: 'Add Record' })
  }
}
