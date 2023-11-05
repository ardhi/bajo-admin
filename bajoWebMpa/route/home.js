import preHandler from '../../lib/crud/pre-handler.js'

export default {
  title: 'Home',
  preHandler,
  handler: async function (ctx, req, reply) {
    return reply.view('bajoAdmin:/home')
  }
}
