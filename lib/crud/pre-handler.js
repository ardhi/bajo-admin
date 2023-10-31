import buildCollMenu from '../build-coll-menu.js'
import buildPagesMenu from '../build-pages-menu.js'

async function preHandler (ctx, req, reply) {
  req.menu = req.menu ?? {}
  req.menu.coll = await buildCollMenu.call(this)
  req.menu.pages = await buildPagesMenu.call(this)
}

export default preHandler
