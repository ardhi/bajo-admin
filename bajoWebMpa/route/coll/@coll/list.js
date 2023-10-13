import buildCollMenu from '../../../../lib/build-coll-menu.js'

export default {
  handler: async function (ctx, req, reply) {
    const { importPkg, getConfig, pascalCase } = this.bajo.helper
    const { recordFind, recordSchema } = this.bajoWeb.helper
    const { isEmpty, omit, get } = await importPkg('lodash-es')
    const cfg = getConfig('bajoAdmin')
    const coll = pascalCase(req.params.coll)
    const data = await recordFind({ req })
    if (!isEmpty(req.query.view)) req.session.adminView = req.query.view
    if (!req.session.adminView) req.session.adminView = 'table'
    const meta = get(cfg, `coll.${coll}`)
    const schema = await recordSchema(coll, meta)
    const params = omit(data, ['data'])
    const collMenu = await buildCollMenu.call(this)
    return reply.view('bajoAdmin:/coll/list', { data: data.data, params, view: req.session.adminView, schema, collMenu })
  }
}
