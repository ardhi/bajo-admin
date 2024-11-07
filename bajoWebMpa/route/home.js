import preHandler from '../../lib/crud/pre-handler.js'

export default {
  title: 'Home',
  preHandler,
  handler: async function (req, reply) {
    return reply.view('bajoAdmin:/home')
  }
}
