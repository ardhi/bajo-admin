import deleteHandler from '../../../../lib/crud/delete-handler.js'

export default {
  method: 'POST',
  handler: async function (req, reply) {
    await deleteHandler.call(this, { req, reply })
  }
}
