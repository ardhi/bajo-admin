const stats = ['daily', 'monthly', 'yearly']
const aggs = ['count', 'avg', 'min', 'max', 'sum']
const charts = ['bar', 'line', 'area']

function rebuildProperties ({ stat, agg, group, schema }) {
  const { camelCase } = this.bajo.helper._
  const props = []
  let name = stat === 'daily' ? 'date' : (stat === 'monthly' ? 'period' : 'year')
  let type = stat === 'daily' ? 'date' : (stat === 'monthly' ? 'string' : 'smallint')
  props.push({ name, type })
  if (agg === 'count') props.push({ name: 'count', type: 'integer' })
  else {
    name = camelCase(`${group} ${agg}`)
    const item = schema.properties.find(p => p.name === group)
    type = item.type
    props.push({ name, type })
  }
  return props
}

async function listHandler ({ ctx, req, reply, coll, view = 'bajoAdmin:/coll/stat', tpl = {} } = {}) {
  const { pascalCase, error, join } = this.bajo.helper
  const { statHistogram } = this.bajoWeb.helper
  const { getSchemaExt } = this.bajoAdmin.helper
  const { omit, get, merge } = this.bajo.helper._
  let { stat, agg, chart } = req.params
  coll = coll ?? pascalCase(req.params.coll)
  if (!stat) stat = stats[0]
  if (!agg) agg = aggs[0]
  if (!chart) chart = charts[0]
  if (!stats.includes(stat)) throw error('Invalid stat type. Must be one of these: %s', join(stats))
  if (!aggs.includes(agg)) throw error('Invalid aggregate type. Must be one of these: %s', join(aggs))
  if (!charts.includes(chart)) throw error('Invalid chart type. Must be one of these: %s', join(charts))
  const { schema, config } = await getSchemaExt(coll, 'list')
  const group = req.query.group ?? schema.histogramGroup[0]
  const base = req.query.base ?? schema.histogram[0]
  schema.properties = rebuildProperties.call(this, { stat, agg, group, schema })
  const options = { count: true, type: stat, aggregate: agg, group, fields: [base] }
  merge(options, get(config, 'methodOptions.find'))
  if (!req.query.sort) req.query.sort = get(schema, 'view.defSort')
  const data = await statHistogram({ coll, req, options })
  req.session.adminView = 'stat'
  const params = omit(data, ['data'])
  const locals = { data: data.data, params, view: req.session.adminView, schema, tpl, stats, aggs, charts, stat, agg, chart }
  locals.base = base
  locals.group = group
  return reply.view(view, locals)
}

export default listHandler
