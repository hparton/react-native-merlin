export const filterRelevant = (state, fields) => {
  return Object.keys(state)
    .filter((key) => Object.keys(fields).includes(key))
    .reduce((obj, key) => {
      obj[key] = state[key]
      return obj
    }, {})
}

export const forceArray = (input) =>
  Array.isArray(input) ? [...input] : [input]
