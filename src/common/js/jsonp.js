import originJsonp from 'jsonp'

export default function jsonp (url, data, option) {
  url += ((!url.indexOf('?')) ? '&' : '?') + param(data)
  return new Promise((resolve, reject) => {
    originJsonp(url, option, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

function param (data) {
  let url = ''
  for (let k in data) {
    const value = data[k] !== 'undifiend' ? data[k] : ''
    url += `&${k}=${encodeURIComponent(value)}`
  }
  return url ? url.substring(1) : ''
}
