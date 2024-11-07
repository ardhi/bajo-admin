import preHandler from '../../../../lib/crud/pre-handler.js'
import detailHandler from '../../../../lib/crud/detail-handler.js'

export default {
  title: 'Collection',
  preHandler,
  handler: async function (req, reply) {
    return await detailHandler.call(this, { req, reply })
  }
}
