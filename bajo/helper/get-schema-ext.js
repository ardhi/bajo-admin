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
        const prop = find(schema.properties, { name: f.name })
        if (prop) {
          f.type = prop.type
          layout.fields[j] = f
        }
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

function hasHistogram (schema, ext) {
  const { isSet } = this.bajo.helper
  const { get } = this.bajo.helper._
  let histogram = ext.histogram === false ? [] : get(ext, 'histogram.baseField')
  if (typeof histogram === 'string') histogram = [histogram]
  if (!isSet(histogram)) histogram = schema.properties.filter(p => p.type === 'datetime').map(p => p.name)
  schema.histogram = histogram
  schema.histogramGroup = get(ext, 'histogram.groupField')
  if (!schema.histogramGroup) schema.histogramGroup = schema.properties.filter(p => ['integer', 'smallint', 'float'].includes(p.type) && !['id'].includes(p.name)).map(p => p.name)
}

async function getSchemaExt (coll, view) {
  const { readConfig } = this.bajo.helper
  const { getSchema } = this.bajoDb.helper
  const { pick, get, filter, omit, pull } = this.bajo.helper._
  let schema = getSchema(coll)
  const base = path.basename(schema.file, path.extname(schema.file))
  const ext = await readConfig(`${schema.plugin}:/bajoAdmin/coll/${base}.*`, { ignoreError: true })
  const viewOpts = get(ext, `view.${view}`, {})
  const hidden = get(ext, 'view.hidden', [])
  hidden.push(...(viewOpts.hidden ?? []))
  const shown = get(ext, 'view.shown', [])
  shown.push(...(viewOpts.shown ?? []))
  if (shown.length > 0) pull(hidden, ...shown)
  schema.properties = filter(schema.properties, p => {
    return !(hidden.includes(p.name) || p.hidden)
  })
  schema = pick(schema, ['name', 'properties', 'indexes', 'disabled', 'attachment', 'sortables'])
  schema.view = omit(viewOpts, ['hidden'])
  await handler[view].call(this, schema)
  hasHistogram.call(this, schema, ext)
  return { schema, config: ext }
}

export default getSchemaExt
