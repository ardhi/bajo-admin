async function home (ctx, req, reply) {
  req.theme = 'adminlte3'
  return reply.view('bajoAdmin:/home')
}

export default home
