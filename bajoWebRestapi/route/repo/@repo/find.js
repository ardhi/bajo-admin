const find = {
  handler: async function (ctx, req, reply) {
    const { recordFind } = this.bajoWebRestapi.helper
    return await recordFind({ req, reply })
  }
}

export default find
