import React, { useEffect, useRef, useMemo, useCallback } from 'react'
import { TextInput } from 'react-native'
import { getReturnKeyType, getNextFocusableInput } from '../utils/inputs'
import { omit, set, get } from '../utils/object'
import { validate } from '../utils/validation'
import { useForm } from './Form'

const Input = ({
  as: Tag = TextInput,
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
  returnKeyType,
  suppressReturnKeyTypeWarning = false,
  ...passThrough
}) => {
  const ref = useRef(null)
  const { values, setValues, setErrors, errors, inputs, shouldRecalculate, addInput, registerInput } = useForm(
    'Form.Input'
  )

  if (returnKeyType && !suppressReturnKeyTypeWarning) {
    console.warn("A form input has been supplied a returnKeyType, but react-native-merlin handles these automatically. You can suppress this warning by passing suppressReturnKeyTypeWarning to the input component.")
  }

  const onEvent = v => {
    let value = parseValue ? parseValue(v) : v
    setValues(current => set(current, name, value))

    if (!errors?.[name] && !instantValidation) {
      return
    }

    const validated = validate({ name, ref, required, minLength, maxLength, validator, messages }, v, values)

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

  const autoReturnKeyType = useMemo(() => {
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
    [valueKey]: get(values, name) || undefined,
    error: errors?.[name] || undefined,
    ...(multiline && { multiline }),
    returnKeyType: returnKeyType || autoReturnKeyType,
    onSubmitEditing: (e) => {
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
