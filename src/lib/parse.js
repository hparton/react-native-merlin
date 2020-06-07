import { forceArray } from '../utils/helpers'

export const parseFieldValues = (childNodes, values, initialValues) => {
  return forceArray(childNodes).reduce((parsedFields, child, i) => {
    if (child.props && child.props.name) {
      parsedFields[child.props.name] = values.hasOwnProperty(child.props.name)
        ? values[child.props.name]
        : initialValues[child.props.name]
        ? initialValues[child.props.name]
        : ''

      return parsedFields
    }

    if (
      child.props &&
      child.props.children &&
      typeof child.props.children !== 'string'
    ) {
      return {
        ...parsedFields,
        ...parseFieldValues(
          forceArray(child.props.children),
          values,
          initialValues
        ),
      }
    }
    return parsedFields
  }, {})
}

export const parseFieldErrors = (childNodes, initialErrors) => {
  return forceArray(childNodes).reduce((parsedFields, child, i) => {
    if (child.props && child.props.name) {
      let initialError = initialErrors[child.props.name]
        ? initialErrors[child.props.name]
        : false

      if (initialError) {
        parsedFields[child.props.name] = initialError
      }

      return parsedFields
    }

    if (
      child.props &&
      child.props.children &&
      typeof child.props.children !== 'string'
    ) {
      return {
        ...parsedFields,
        ...parseFieldErrors(forceArray(child.props.children), initialErrors),
      }
    }
    return parsedFields
  }, {})
}

export const parseFieldValidation = (childNodes, values, validate) => {
  return forceArray(childNodes).reduce((arr, child, i) => {
    if (child.props && child.props.name) {
      let validated = validate(child.props, values[child.props.name])
      return validated !== true
        ? [...arr, validate(child.props, values[child.props.name])]
        : arr
    }

    if (
      child.props &&
      child.props.children &&
      typeof child.props.children !== 'string'
    ) {
      return [
        ...arr,
        ...parseFieldValidation(
          forceArray(child.props.children),
          values,
          validate
        ),
      ]
    }

    return arr
  }, [])
}
