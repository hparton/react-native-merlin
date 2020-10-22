export const error = (type, message) => ({
  type,
  message,
})

export const errorMessage = (name, messages = {}, { props, fallback }) => {

  if (!messages.hasOwnProperty(name)) {
    return fallback
  }

  return typeof messages[name] === 'string'
    ? messages[name]
    : messages[name](props)
}

export const validate = (
  { name, required, minLength, maxLength, validator, messages = {} },
  value,
  values
) => {
  if (required && !value) {
    return {
      name,
      error: error(
        'required',
        errorMessage('required', messages, {
          props: { name, value },
          fallback: `The ${name} field is required.`,
        })
      ),
    }
  }

  if (minLength && value.length < minLength) {
    return {
      name,
      error: error(
        'minLength',
        errorMessage('minLength', messages, {
          props: { name, value, minLength },
          fallback: `${name} must be at least ${minLength} characters long.`,
        })
      ),
    }
  }

  if (maxLength && value.length > maxLength) {
    return {
      name,
      error: error(
        'maxLength',
        errorMessage('maxLength', messages, {
          props: { name, value, maxLength },
          fallback: `${name} must be less than ${maxLength} characters long.`,
        })
      ),
    }
  }

  if (validator && validator(value, error, values)) {
    let validationError = validator(value, error, values)

    validationError.message = errorMessage(
      validationError.type,
      messages,
      {
        props: { name, value },
        fallback: validationError.message || '',
      }
    )

    return { name, error: validationError }
  }

  return true
}
