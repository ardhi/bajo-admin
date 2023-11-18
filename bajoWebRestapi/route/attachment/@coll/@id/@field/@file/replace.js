import update from './update.js'

async function replace (ctx, req, reply) {
  return await update.call(this, ctx, req, reply)
}

export default replace
