import buildCollMenu from '../../../../../lib/build-coll-menu.js'

export default {
  handler: async function (ctx, req, reply) {
    const { importPkg, pascalCase } = this.bajo.helper
    const { recordGet } = this.bajoWeb.helper
    const { getSchemaExt } = this.bajoAdmin.helper
    const { omit } = await importPkg('lodash-es')
    const coll = pascalCase(req.params.coll)
    const schema = await getSchemaExt(coll, 'detail')
    const data = await recordGet({ req })
    const params = omit(data, ['data'])
    const collMenu = await buildCollMenu.call(this)
    return reply.view('bajoAdmin:/coll/detail', { form: data.data, params, schema, collMenu })
  }
}
