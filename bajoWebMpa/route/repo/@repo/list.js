import repoPreHandler from '../../../../lib/repo-pre-handler.js'

export default {
  handler: async function (ctx, req, reply) {
    const { importPkg } = this.bajo.helper
    const { recordFind, recordSchema } = this.bajoWeb.helper
    const { isEmpty, omit } = await importPkg('lodash-es')
    const data = await recordFind({ req, reply })
    if (!isEmpty(req.query.view)) req.session.adminView = req.query.view
    if (!req.session.adminView) req.session.adminView = 'table'
    const schema = await recordSchema({ req })
    const params = omit(data, ['data'])
    return reply.view('bajoAdmin:/repo/list', { data: data.data, params, view: req.session.adminView, schema })
  },
  preHandler: repoPreHandler
}
