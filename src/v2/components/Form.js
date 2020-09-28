import React, { useState, useEffect, useCallback } from 'react'
import { validate } from '../utils/validation'

const FormContext = React.createContext()

export const useForm = component => {
  const context = React.useContext(FormContext)
  if (context === undefined) {
    throw new Error(`<${component}/> must be used within a <Form /> component.`)
  }

  return context
}

const Form = ({
  children,
  onSubmit,
  onError,
  values: _values,
  errors: _errors,
  revalidateOnInput = true,
}) => {
  const [values, setValues] = useState(_values)
  const [errors, setErrors] = useState(_errors)
  const [inputs, setInputs] = useState([])

  useEffect(() => {
    // if (revalidateOnInput) {
    //   validateAllFields(values)
    // }
    console.log('values: ', values)
  }, [values])

  useEffect(() => {
    console.log('inputs: ', inputs)
  }, [inputs])

  const validateAllFields = values => {
    const errors = inputs
      .map(input => validate(input, values[input.name], values))
      .filter(v => v !== true)

    const errorsMappedToNames = errors.reduce((errors, item) => {
      errors[item.name] = item.error
      return errors
    }, {})

    return { valid: !errors.length, errors: errorsMappedToNames }
  }

  const handleSubmit = (e, id) => {
    const { valid, errors } = validateAllFields(values)

    if (valid) {
      onSubmit && onSubmit(values, { e, id })
    } else {
      onError && onError(errors, { e, id })
    }
  }

  return (
    <FormContext.Provider
      value={{
        values,
        setValues,
        errors,
        setErrors,
        inputs,
        setInputs,
        handleSubmit,
      }}
    >
      {children}
    </FormContext.Provider>
  )
}

export default Form
