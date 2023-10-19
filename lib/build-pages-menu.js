async function buildPagesMenu () {
  const { importPkg, getConfig } = this.bajo.helper
  const { map, pick, groupBy, forOwn, keys, filter, get } = await importPkg('lodash-es')
  const all = filter(this.bajoWeb.routes, r => {
    return ['GET', 'POST'].includes(r.method) && get(r, 'config.plugin') === 'bajoAdmin' && get(r, 'config.subRouteOf')
  })
  const omenu = groupBy(map(all, a => {
    const cfg = getConfig(a.config.plugin)
    const item = pick(a.config, ['subRouteOf', 'name'])
    item.url = a.url
    item.pluginTitle = cfg.title
    return item
  }), 'pluginTitle')
  const menu = []
  forOwn(keys(omenu).sort(), k => {
    const items = omenu[k]
    menu.push({
      id: items[0].plugin,
      name: k,
      children: map(items, i => pick(i, ['name', 'url']))
    })
  })
  return menu
}

export default buildPagesMenu
