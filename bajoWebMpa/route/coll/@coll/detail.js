import preParsing from '../../../../lib/crud/pre-parsing.js'
import detailHandler from '../../../../lib/crud/detail-handler.js'

export default {
  name: 'Collection',
  preParsing,
  handler: async function (ctx, req, reply) {
    return await detailHandler.call(this, { ctx, req, reply })
  }
}
