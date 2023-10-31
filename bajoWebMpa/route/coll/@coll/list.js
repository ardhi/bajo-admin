import preHandler from '../../../../lib/crud/pre-handler.js'
import listHandler from '../../../../lib/crud/list-handler.js'

export default {
  title: 'Collection',
  preHandler,
  handler: async function (ctx, req, reply) {
    return await listHandler.call(this, { ctx, req, reply })
  }
}
