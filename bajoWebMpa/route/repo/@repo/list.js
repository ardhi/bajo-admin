import repoPreHandler from '../../../../lib/repo-pre-handler.js'

export default {
  handler: async function (ctx, req, reply) {
    const { importPkg } = this.bajo.helper
    const { recordFind, recordSchema } = this.bajoWeb.helper
    const { isEmpty, omit } = await importPkg('lodash-es')
    const data = await recordFind({ req, reply })
    if (!isEmpty(req.query.list)) req.session.bookList = req.query.list
    if (!req.session.bookList) req.session.bookList = 'grid'
    const schema = await recordSchema({ req })
    return reply.view('bajoAdmin:/repo/list', { data: data.data, params: omit(data, ['data']), list: req.session.bookList, schema })
  },
  preHandler: repoPreHandler
}

