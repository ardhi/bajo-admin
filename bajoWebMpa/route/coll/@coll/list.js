import buildCollMenu from '../../../../lib/build-coll-menu.js'

export default {
  handler: async function (ctx, req, reply) {
    const { importPkg, pascalCase } = this.bajo.helper
    const { recordFind } = this.bajoWeb.helper
    const { getSchemaExt } = this.bajoAdmin.helper
    const { isEmpty, omit, get } = await importPkg('lodash-es')
    const coll = pascalCase(req.params.coll)
    const schema = await getSchemaExt(coll, 'list')
    if (!req.query.sort) req.query.sort = get(schema, 'view.list.defSort')
    const data = await recordFind({ req })
    if (!isEmpty(req.query.view)) req.session.adminView = req.query.view
    if (!req.session.adminView) req.session.adminView = 'table'
    const params = omit(data, ['data'])
    const collMenu = await buildCollMenu.call(this)
    return reply.view('bajoAdmin:/coll/list', { data: data.data, params, view: req.session.adminView, schema, collMenu })
  }
}
