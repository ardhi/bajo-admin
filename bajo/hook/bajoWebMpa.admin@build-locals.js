async function onBuildLocals (locals, req) {
  const { isEmpty } = this.bajo.helper._
  const title = {}
  const items = req.params.coll ? locals._meta.menu.coll : locals._meta.menu.pages
  for (const item of items) {
    for (const child of item.children) {
      if (req.params.coll) {
        if (child.id === req.params.coll) {
          title.page = item.name
          title.subPage = child.name
        }
      } else {
        if (child.url === req.url) {
          title.page = item.name
          title.subPage = child.title
        }
      }
    }
  }
  if (!isEmpty(title)) locals._meta.title = title
}

export default onBuildLocals
