const replace = {
  handler: async function (ctx, req, reply) {
    const { recordUpdate } = this.bajoWeb.helper
    const options = { partial: false }
    return await recordUpdate({ req, reply, options })
  },
  schema: async function (ctx, parentCtx) {
    const { docSchemaParams } = this.bajoWebRestapi.helper
    await docSchemaParams(parentCtx, 'paramsCollId', 'coll||Collection ID', 'id||Record ID')
    return {
      params: { $ref: 'paramsCollId#' },
      querystring: { $ref: 'qsFields#' }
    }
  }
}

export default replace
