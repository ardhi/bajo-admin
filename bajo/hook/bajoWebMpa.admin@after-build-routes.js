async function afterBuildRoutes (ctx) {
  const { fastGlob, importModule, getConfig, eachPlugins } = this.bajo.helper
  const cfg = getConfig('bajoWebMpa', { full: true })
  const { build } = await importModule('bajoWebMpa:/lib/build-routes.js', { asDefaultImport: false })
  const pathPrefix = 'bajoAdmin/mpa/route'
  await eachPlugins(async function ({ dir, alias, plugin }) {
    const pattern = `${dir}/${pathPrefix}/**/*.js`
    const files = await fastGlob(pattern)
    if (files.length === 0) return undefined
    await build.call(this, { ctx, files, pathPrefix, dir, alias, plugin, cfg, parent: 'bajoAdmin' })
  })
}

export default afterBuildRoutes
