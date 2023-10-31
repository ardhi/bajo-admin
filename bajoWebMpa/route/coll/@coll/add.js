import preHandler from '../../../../lib/crud/pre-handler.js'
import addHandler from '../../../../lib/crud/add-handler.js'

export default {
  title: 'Collection',
  preHandler,
  method: ['GET', 'POST'],
  handler: async function (ctx, req, reply) {
    return await addHandler.call(this, { ctx, req, reply })
  }
}
