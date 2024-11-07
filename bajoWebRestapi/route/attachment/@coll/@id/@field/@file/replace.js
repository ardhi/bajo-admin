import update from './update.js'

async function replace (req, reply) {
  return await update.call(this, req, reply)
}

export default replace
