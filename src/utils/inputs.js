export const getInputPosition = (inputs, name) =>
  inputs.findIndex(input => input.name === name)

export const getReturnKeyType = (inputs, name, multiline = false) => {
  const nextInput = getNextFocusableInput(inputs, name)

  if (multiline) {
    return 'default'
  }

  if (nextInput) {
    return 'next'
  }

  return 'done'
}

export const getNextFocusableInput = (inputs, name) => {
  const inputPosition = getInputPosition(inputs, name)
  const nextInput = inputs[inputPosition + 1]

  if (nextInput && nextInput.ref.current && nextInput.ref.current.focus) {
    return nextInput
  }

  return false
}

export const filterRelevant = (state, inputs) => {
  return Object.keys(state)
    .filter(key => inputs.includes(key))
    .reduce((obj, key) => {
      obj[key] = state[key]
      return obj
    }, {})
}
