import path from 'path'

async function getSchemaExt (coll, view) {
  const { importPkg, defaultsDeep, getConfig, readConfig } = this.bajo.helper
  const { getSchema } = this.bajoDb.helper
  const { pick, get, filter } = await importPkg('lodash-es')
  const schema = await getSchema(coll)
  const cfg = getConfig(schema.plugin, { full: true })
  const base = path.basename(schema.file, path.extname(schema.file))
  const ext = await readConfig(`${cfg.dir.pkg}/bajoAdmin/coll/${base}.*`, { ignoreError: true })
  const schemaExt = defaultsDeep(ext, schema)
  const hidden = get(schemaExt, `view.${view}.hidden`, [])
  schemaExt.properties = filter(schemaExt.properties, p => !hidden.includes(p.name))
  return pick(schemaExt, ['name', 'properties', 'view', 'indexes'])
}

export default getSchemaExt
