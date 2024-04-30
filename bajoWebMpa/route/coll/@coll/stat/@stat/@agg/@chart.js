import preHandler from '../../../../../../../lib/crud/pre-handler.js'
import statHandler from '../../../../../../../lib/crud/stat-handler.js'

export default {
  title: 'Collection',
  preHandler,
  handler: async function (ctx, req, reply) {
    return await statHandler.call(this, { ctx, req, reply })
  }
}
