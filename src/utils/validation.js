export const phone = (string) => {
  let tester = /^(((\+44\s?\d{4}|\(?0\d{4}\)?)\s?\d{3}\s?\d{3})|((\+44\s?\d{3}|\(?0\d{3}\)?)\s?\d{3}\s?\d{4})|((\+44\s?\d{2}|\(?0\d{2}\)?)\s?\d{4}\s?\d{4}))(\s?\#(\d{4}|\d{3}))?$/g

  return tester.test(string)
}

export const email = (string) => {
  let tester = /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/

  if (!tester.test(string)) {
    return false
  }

  // Further checking of some things regex can't handle
  let [account, address] = string.split('@')
  if (account.length > 64) {
    return false
  }

  let domainParts = address.split('.')
  if (
    domainParts.some(function (part) {
      return part.length > 63
    })
  ) {
    return false
  }

  return true
}

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
  if (required && value === '') {
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

  if (validate && validator && validator(value, { error, values })) {
    let validationError = validator(value, { error, values })

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
