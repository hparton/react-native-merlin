import { Children } from 'react'

export const parseInputs = (children) =>
  Children.toArray(children).reduce((partialInputs, child) => {
    if (child && child.props && child.props.children) {
      return partialInputs.concat(parseInputs(child.props.children))
    }
    if (child && child.props && !!child.props.name)
      return partialInputs.concat(child)
    return partialInputs
  }, [])

export const getInputPosition = (inputs, name) =>
  inputs.findIndex((input) => input.props.name === name)

export const getReturnKeyType = (inputs, name, multiline) => {
  const inputPosition = getInputPosition(inputs, name)
  if (multiline) {
    return 'default';
  }
  const isLastInput = inputPosition === inputs.length - 1
  return isLastInput ? 'done' : 'next'
}
