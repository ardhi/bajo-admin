import preParsing from '../../../../lib/crud/pre-parsing.js'
import listHandler from '../../../../lib/crud/list-handler.js'

export default {
  name: 'Collection',
  preParsing,
  handler: async function (ctx, req, reply) {
    return await listHandler.call(this, { ctx, req, reply })
  }
}
