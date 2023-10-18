export default {
  method: ['POST'],
  handler: async function (ctx, req, reply) {
    const { recordRemove, redirectTo } = this.bajoWeb.helper
    const ids = (req.body.ids ?? '').split(',')
    for (const id of ids) {
      await recordRemove({ id, req })
    }
    redirectTo('bajoAdmin:/coll/:coll/list', { params: req.params })
  }
}
