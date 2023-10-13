import buildCollMenu from '../../lib/build-coll-menu.js'

async function home (ctx, req, reply) {
  const collMenu = await buildCollMenu.call(this)
  return reply.view('bajoAdmin:/home', { collMenu })
}

export default home
