export function addClass (el, className) {
  if (hasClass(el, className)) return
  const newClass = el.className.split('')
  newClass.push(className)
  el.className = newClass.join('')
}

export function hasClass (el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className, className)
}

export function getData (el, name, value) {
  const prefix = 'data-'
  name = prefix + name
  if (value) {
    return el.setAttribute(name, value)
  } else {
    return el.getAttribute(name)
  }
}

const elementStyle = document.createElement('div').style

const vender = (function () {
  const transformStyle = {
    standard: 'transform',
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTtransform',
    ms: 'msTransform'
  }
  for (let key in transformStyle) {
    if (transformStyle[key] in elementStyle) {
      return key
    }
  }
  return false
})()

export function prefixStyle (style) {
  if (!vender) return false
  if (vender === 'standard') return style
  return vender + style.charAt(0).toUpperCase() + style.substr(1)
}
