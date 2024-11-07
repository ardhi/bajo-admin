const find = {
  handler: async function (req, reply) {
    const { recordFind } = this.bajoWeb.helper
    return await recordFind({ req, reply })
  }
}

export default find
