import path from 'path'

async function buildCollMenu () {
  const { getConfig, titleize, readConfig } = this.bajo.helper
  const { map, pick, groupBy, forOwn, keys, kebabCase, filter, pullAt } = this.bajo.helper._
  const cfg = getConfig('bajoAdmin')
  const schemas = filter(this.bajoDb.schemas, s => {
    return !cfg.coll.excludes.includes(s.name)
  })
  const deleted = []
  for (const i in schemas) {
    const s = schemas[i]
    const cfgs = getConfig(s.plugin, { full: true })
    const base = path.basename(s.file, path.extname(s.file))
    const opts = await readConfig(`${cfgs.dir.pkg}/bajoAdmin/coll/${base}.*`, { ignoreError: true })
    if (opts.onMenu === false) deleted.push(i)
  }
  if (deleted.length > 0) pullAt(schemas, deleted)
  const omenu = groupBy(map(schemas, s => {
    const cfg = getConfig(s.plugin)
    const item = pick(s, ['name', 'plugin'])
    item.pluginTitle = cfg.title
    return item
  }), 'pluginTitle')
  const menu = []
  forOwn(keys(omenu).sort(), k => {
    const items = omenu[k]
    const cfg = getConfig(items[0].plugin, { full: true })
    menu.push({
      id: items[0].plugin,
      name: k,
      children: map(items, i => {
        const name = titleize(i.name.slice(cfg.alias.length))
        return {
          id: kebabCase(i.name),
          name
        }
      })
    })
  })
  return menu
}

export default buildCollMenu
