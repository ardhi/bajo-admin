import path from 'path'

const disableds = ['id', 'createdAt', 'updatedAt']

function applyLayout ({ schema, hidden, plaintext } = {}) {
  const { map, each, isString, pullAt, trim, find } = this.bajo.helper._
  if ((schema.view.layouts ?? []).length === 0) {
    schema.view.layouts = [{
      fields: map(schema.properties, p => {
        const f = { name: p.name, col: ':12', type: p.type }
        if (plaintext || disableds.includes(p.name)) f.widget = 'formPlaintext'
        // if (disableds.includes(p.name)) f.placeholder = '- autocreate -'
        return f
      })
    }]
  } else {
    each(schema.view.layouts, (layout, i) => {
      const deleted = []
      each(layout.fields, (f, j) => {
        if (isString(f)) {
          const [name, col, widget, placeholder] = map(f.split(';'), m => trim(m))
          f = { name }
          f.col = col ?? ':12'
          if (widget) f.widget = widget
          if (placeholder) f.placeholder = placeholder
        }
        if (hidden.includes(f.name)) deleted.push(j)
        if (plaintext) f.widget = 'formPlaintext'
        if (!f.widget && disableds.includes(f.name)) f.widget = 'formPlaintext'
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
    applyLayout.call(this, { schema, hidden, plaintext: true })
  },
  add: async function (schema, hidden) {
    applyLayout.call(this, { schema, hidden })
  },
  edit: async function (schema, hidden) {
    applyLayout.call(this, { schema, hidden })
  }
}

async function getSchemaExt (coll, view) {
  const { getConfig, readConfig } = this.bajo.helper
  const { getSchema } = this.bajoDb.helper
  const { pick, get, filter, omit } = this.bajo.helper._
  let schema = getSchema(coll)
  const cfg = getConfig(schema.plugin, { full: true })
  const base = path.basename(schema.file, path.extname(schema.file))
  const ext = await readConfig(`${cfg.dir.pkg}/bajoAdmin/coll/${base}.*`, { ignoreError: true })
  const viewOpts = get(ext, `view.${view}`, {})
  const hidden = get(ext, 'view.hidden', [])
  hidden.push(...(viewOpts.hidden ?? []))
  schema.properties = filter(schema.properties, p => {
    return !(hidden.includes(p.name) || p.hidden)
  })
  schema = pick(schema, ['name', 'properties', 'indexes', 'disabled'])
  schema.view = omit(viewOpts, ['hidden'])
  await handler[view].call(this, schema, hidden)
  return schema
}

export default getSchemaExt
