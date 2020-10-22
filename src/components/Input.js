import React, { useEffect, useRef, useMemo, useCallback } from 'react'
import { TextInput } from 'react-native'
import { getReturnKeyType, getNextFocusableInput } from '../utils/inputs'
import { omit } from '../utils/object'
import { validate } from '../utils/validation'
import { useForm } from './Form'

const Input = ({
  as = TextInput,
  children,
  eventKey = 'onChangeText',
  valueKey = 'value',
  parseValue,
  multiline,
  required,
  minLength,
  maxLength,
  validator,
  messages,
  instantValidation = false,
  name,
  onSubmitEditing,
  ...passThrough
}) => {
  const ref = useRef(null)
  const {
    values,
    setValues,
    setErrors,
    errors,
    inputs,
    shouldRecalculate,
    addInput,
    registerInput,
  } = useForm('Form.Input')
  const Tag = as

  const onEvent = v => {
    let value = parseValue ? parseValue(v) : v
    setValues(current => ({ ...current, [name]: value }))

    if (!errors?.[name] && !instantValidation) {
      return
    }

    const validated = validate(
      { name, ref, required, minLength, maxLength, validator, messages },
      v,
      values
    )

    if (validated === true && errors?.[name]) {
      setErrors(current => omit(current, [name]))
    } else {
      setErrors(current => ({
        ...current,
        [validated.name]: validated.error,
      }))
    }
  }

  useEffect(() => {
    if (shouldRecalculate) {
      registerInput({ name, ref, required, minLength, maxLength, validator, messages })
    }
  }, [shouldRecalculate])

  useEffect(addInput, [])

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
    [valueKey]: values?.[name] || undefined,
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
      key={name}
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
