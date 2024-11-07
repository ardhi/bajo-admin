import preHandler from '../../../../lib/crud/pre-handler.js'
import editHandler from '../../../../lib/crud/edit-handler.js'

export default {
  title: 'Collection',
  preHandler,
  method: ['GET', 'POST'],
  handler: async function (req, reply) {
    return editHandler.call(this, { req, reply })
  }
}
