export const omit = (object = {}, keysToRemove = []) => {
  return Object.keys(object).reduce((result, key) => {
    if (!keysToRemove.includes(key)) {
      result[key] = object[key]
    }

    return result
  }, {})
}

export const get = (obj, keys) => {
  if (!obj) return
  if (typeof keys === 'string') return get(obj, keys.split('.'))
  else if (keys.length === 0) return obj
  else return get(obj[keys[0]], keys.slice(1))
}

export const deepKeys = obj => {
  return Object.keys(obj)
    .filter(key => obj[key] instanceof Object)
    .map(key => deepKeys(obj[key]).map(k => `${key}.${k}`))
    .reduce((x, y) => x.concat(y), Object.keys(obj))
}

// Set is currently from https://github.com/fwilkerson/clean-set
// Slightly refactored since we don't need to be able to pass update functions
export const set = (obj, keys, value) => {
  keys.split && (keys = keys.split('.'))

  let next = copy(obj)
  let last = next
  let totalKeys = keys.length

  for (let i = 0; i < totalKeys; i++) {
    last = last[keys[i]] = i === totalKeys - 1 ? value && value : copy(last[keys[i]])
  }

  return next
}

function copy(obj) {
  let to = obj && !!obj.pop ? [] : {}
  for (let i in obj) to[i] = obj[i]
  return to
}
