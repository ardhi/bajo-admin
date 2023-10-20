import preParsing from '../../../../lib/crud/pre-parsing.js'
import editHandler from '../../../../lib/crud/edit-handler.js'

export default {
  name: 'Collection',
  preParsing,
  method: ['GET', 'POST'],
  handler: async function (ctx, req, reply) {
    return editHandler.call(this, { ctx, req, reply })
  }
}
