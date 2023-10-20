async function buildCollMenu () {
  const { importPkg, getConfig, titleize } = this.bajo.helper
  const { map, pick, groupBy, forOwn, keys, kebabCase, filter } = await importPkg('lodash-es')
  const cfg = getConfig('bajoAdmin')
  const exclPlugins = ['bajoBook', 'sumba', ...cfg.coll.exclude.plugins]
  const schemas = filter(this.bajoDb.schemas, s => {
    const notColls = !cfg.coll.exclude.names.includes(s.name)
    const notPlugins = !exclPlugins.includes(s.plugin)
    return notColls && notPlugins
  })
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
