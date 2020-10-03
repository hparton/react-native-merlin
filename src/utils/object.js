export const omit = (object = {}, keysToRemove = []) => {
  return Object.keys(object).reduce((result, key) => {
    if (!keysToRemove.includes(key)) {
      result[key] = object[key]
    }

    return result
  }, {})
}
