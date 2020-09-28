import React, { useEffect, useRef, useMemo, useCallback } from 'react'
import { TextInput } from 'react-native'
import { getReturnKeyType, getNextFocusableInput } from '../utils/inputs'
import { validate } from '../utils/validation'
import { useForm } from './Form'

const Input = ({
  as = TextInput,
  children,
  eventKey = 'onChangeText',
  handleValue,
  multiline,
  required,
  minLength,
  maxLength,
  validator,
  name,
  onSubmitEditing,
  ...passThrough
}) => {
  const ref = useRef(null)
  const { values, setValues, setErrors, errors, inputs, setInputs } = useForm(
    'Form.Input'
  )
  const Tag = as

  const onEvent = v => {
    let value = handleValue ? handleValue(v) : v
    setValues(current => ({ ...current, [name]: v }))

    const validated = validate(
      { name, ref, required, minLength, maxLength, validator },
      v,
      values
    )

    if (validated === true && errors?.[name]) {
      setErrors(current => {
        delete current[name]
        return current
      })
    } else {
      setErrors(current => ({
        ...current,
        [validated.name]: validated.error,
      }))
    }
  }

  useEffect(() => {
    console.log(`${name} field added`)
    setInputs(current => [
      ...current,
      { name, ref, required, minLength, maxLength, validator },
    ])

    return () => {
      console.log(`${name} field removed`)
      setInputs(current => current.filter(input => input.name !== name))
    }
  }, [])

  const returnKeyType = useMemo(() => {
    return getReturnKeyType(inputs, name, multiline)
  }, [inputs, name, multiline])

  const tryFocusNextInput = useCallback(() => {
    const nextInput = getNextFocusableInput(inputs, name)

    if (multiline || !nextInput) {
      return
    }

    nextInput.ref.current.focus()
  }, [inputs, name])

  const merlinProps = {
    ref,
    [eventKey]: onEvent,
    value: values?.[name] || undefined,
    error: errors?.[name] || undefined,
    ...(multiline && { multiline }),
    returnKeyType,
    onSubmitEditing: e => {
      tryFocusNextInput(e)
      onSubmitEditing && onSubmitEditing(e)
    },
  }

  return (
    <Tag
      {...{
        ...passThrough,
        ...merlinProps,
      }}
    >
      {children}
    </Tag>
  )
}

export default Input
