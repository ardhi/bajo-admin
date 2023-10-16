import path from 'path'

async function applyLayout ({ schema, hidden, plaintext } = {}) {
  const { importPkg } = this.bajo.helper
  const { map, each, isString, pullAt, trim, find } = await importPkg('lodash-es')
  if ((schema.view.layouts ?? []).length === 0) {
    schema.view.layouts = [{
      fields: map(schema.properties, p => {
        const f = { name: p.name, col: ':12', type: p.type }
        if (plaintext) f.widget = 'formPlaintext'
        return f
      })
    }]
  } else {
    each(schema.view.layouts, (layout, i) => {
      const deleted = []
      each(layout.fields, (f, j) => {
        if (isString(f)) {
          const [name, col, widget] = map(f.split(';'), m => trim(m))
          f = { name }
          f.col = col ?? ':12'
          if (widget) f.widget = widget
        }
        if (hidden.includes(f.name)) deleted.push(j)
        if (plaintext) f.widget = 'formPlaintext'
        f.type = find(schema.properties, { name: f.name }).type
        layout.fields[j] = f
      })
      if (deleted.length > 0) pullAt(layout.fields, deleted)
    })
  }
}

const handler = {
  list: async function (schema, hidden) {
  },
  detail: async function (schema, hidden) {
    await applyLayout.call(this, { schema, hidden, plaintext: true })
  },
  add: async function (schema, hidden) {
    await applyLayout.call(this, { schema, hidden })
  },
  edit: async function (schema, hidden) {
    await applyLayout.call(this, { schema, hidden })
  }
}

async function getSchemaExt (coll, view) {
  const { importPkg, getConfig, readConfig } = this.bajo.helper
  const { getSchema } = this.bajoDb.helper
  const { pick, get, filter, omit } = await importPkg('lodash-es')
  let schema = await getSchema(coll)
  const cfg = getConfig(schema.plugin, { full: true })
  const base = path.basename(schema.file, path.extname(schema.file))
  const ext = await readConfig(`${cfg.dir.pkg}/bajoAdmin/coll/${base}.*`, { ignoreError: true })
  const viewOpts = get(ext, `view.${view}`, {})
  const hidden = get(ext, 'view.hidden', [])
  hidden.push(...(viewOpts.hidden ?? []))
  schema.properties = filter(schema.properties, p => {
    return !(hidden.includes(p.name) || p.hidden)
  })
  schema = pick(schema, ['name', 'properties', 'indexes'])
  schema.view = omit(viewOpts, ['hidden'])
  await handler[view].call(this, schema, hidden)
  return schema
}

export default getSchemaExt