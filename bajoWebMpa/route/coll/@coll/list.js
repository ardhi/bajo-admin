import preHandler from '../../../../lib/crud/pre-handler.js'
import listHandler from '../../../../lib/crud/list-handler.js'

export default {
  title: 'Collection',
  preHandler,
  handler: async function (req, reply) {
    return await listHandler.call(this, { req, reply })
  }
}
