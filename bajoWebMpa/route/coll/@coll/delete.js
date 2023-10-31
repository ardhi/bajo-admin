import deleteHandler from '../../../../lib/crud/delete-handler.js'

export default {
  method: 'POST',
  handler: async function (ctx, req, reply) {
    await deleteHandler.call(this, { ctx, req, reply })
  }
}
