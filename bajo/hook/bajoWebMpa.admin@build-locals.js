async function onBuildLocals (locals, req) {
  const { titleize, getConfig } = this.bajo.helper
  const { getSchema } = this.bajoDb.helper
  if (req.params.coll) {
    const schema = getSchema(req.params.coll)
    const cfg = getConfig(schema.plugin, { full: true })
    const subPage = cfg.title
    const subSubPage = titleize(schema.name.slice(cfg.alias.length))
    locals._meta.title.subPage = subPage
    locals._meta.title.subSubPage = subSubPage
    locals._meta.schema = schema
  }
}

export default onBuildLocals
