export const error = (type, message) => ({
  type,
  message,
})

export const errorMessage = (name, errorMessages = {}, { props, fallback }) => {
  if (!errorMessages.hasOwnProperty(name)) {
    return fallback
  }

  return typeof errorMessages[name] === 'string'
    ? errorMessages[name]
    : errorMessages[name](props)
}

export const validate = (
  { name, required, minLength, maxLength, validator, errorMessages = {} },
  value,
  values
) => {
  if (required && !value) {
    return {
      name,
      error: error(
        'required',
        errorMessage('required', errorMessages, {
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
        errorMessage('minLength', errorMessages, {
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
        errorMessage('maxLength', errorMessages, {
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
      errorMessages,
      {
        props: { name, value },
        fallback: validationError.message || '',
      }
    )

    return { name, error: validationError }
  }

  return true
}
