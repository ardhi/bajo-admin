import buildCollMenu from './build-coll-menu.js'
import buildPagesMenu from './build-pages-menu.js'

async function preParsing (ctx, req, reply) {
  req.menu = {
    coll: await buildCollMenu.call(this),
    pages: await buildPagesMenu.call(this)
  }
}

export default preParsing
