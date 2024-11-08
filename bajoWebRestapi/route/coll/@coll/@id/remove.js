const remove = {
  handler: async function (req, reply) {
    const { recordRemove } = this.bajoWeb.helper
    return await recordRemove({ req, reply })
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

export default remove
