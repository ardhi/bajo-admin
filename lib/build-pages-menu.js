async function buildPagesMenu () {
  const { importPkg, getConfig } = this.bajo.helper
  const { map, pick, groupBy, forOwn, keys, filter, get, isArray } = await importPkg('lodash-es')
  const cfg = getConfig('bajoAdmin')
  const all = filter(this.bajoWeb.routes, r => {
    if (cfg.pages.excludes.includes(get(r, 'config.name'))) return false
    const methods = isArray(r.method) ? r.method : [r.method]
    return methods.includes('GET') &&
      get(r, 'config.plugin') === 'bajoAdmin' &&
      get(r, 'config.adminMenu') &&
      get(r, 'config.subRouteOf')
  })
  const omenu = groupBy(map(all, a => {
    const cfg = getConfig(a.config.subRouteOf)
    const item = pick(a.config, ['subRouteOf', 'name', 'title'])
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
      children: map(items, i => pick(i, ['name', 'url', 'title']))
    })
  })
  return menu
}

export default buildPagesMenu
