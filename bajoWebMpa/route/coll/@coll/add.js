import preParsing from '../../../../lib/crud/pre-parsing.js'
import addHandler from '../../../../lib/crud/add-handler.js'

export default {
  name: 'Collection',
  preParsing,
  method: ['GET', 'POST'],
  handler: async function (ctx, req, reply) {
    return await addHandler.call(this, { ctx, req, reply })
  }
}
