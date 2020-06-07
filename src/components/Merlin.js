import React, {
  useEffect,
  useState,
  createRef,
  cloneElement,
  useRef,
  forwardRef,
} from 'react'

import { View } from 'react-native'

import {
  parseFieldErrors,
  parseFieldValues,
  parseFieldValidation,
} from '../lib/parse'

import { parseInputs, getInputPosition, getReturnKeyType } from '../lib/inputs'

import { filterRelevant, forceArray } from '../utils/helpers'
import { error, errorMessage, validate } from '../utils/validation'

export default forwardRef(
  (
    {
      children,
      style,
      initialValues = {},
      initialErrors = {},
      validateOnBlur = false,
      submitAfterLastInput = true,
      revalidateOnInput = true,
      onSubmit,
    },
    ref
  ) => {
    const [values, setValues] = useState({})
    const [errors, setErrors] = useState({})
    const inputs = parseInputs(children || [])
    const inputRefs = {}

    const setValue = (name, value) =>
      setValues((state) => ({
        ...state,
        [name]: value,
      }))

    const setError = (name, err) => {
      setErrors((state) => ({
        ...state,
        [name]: err,
      }))

      return err
    }

    const clearErrors = () => {
      setErrors({})
    }

    const clearError = (name) => {
      setErrors((state) => {
        delete state[name]
        return state
      })

      return true
    }

    if (ref) {
      ref.current = {
        values,
        errors,
        setValue,
        setError,
        clearErrors,
      }
    }

    useEffect(() => {
      let fieldValues = parseFieldValues(children, values, initialValues)
      let fieldErrors = parseFieldErrors(children, initialErrors)

      if (Object.keys(fieldErrors).length) {
        setErrors(fieldErrors)
      }

      setValues((state) => {
        let newState = {
          ...state,
          ...fieldValues,
        }

        return filterRelevant(newState, fieldValues)
      })
    }, [children])

    const attemptSubmission = (key) => {
      clearErrors()
      const validationErrors = runValidation()
      onSubmit({
        values,
        errors: validationErrors.errors,
        key,
        setErrors,
        isValid: validationErrors.isValid,
        runValidation,
        setValues,
      })
    }

    const parseJSX = (childNodes) => {
      // console.log(depth)
      // https://reactjs.org/docs/react-api.html#reactchildrentoarray
      return (
        <>
          {forceArray(childNodes).map((child, i) => {
            if (child.props && child.props.name) {
              let ref = createRef()
              let element = cloneElement(child, {
                value: values[child.props.name],
                ref: child.ref ? child.ref : ref,
                [child.props.onChangeKey || 'onChangeText']: (v) => {
                  let value = child.props.handleValue
                    ? child.props.handleValue(v)
                    : v

                  if (revalidateOnInput) {
                    if (errors[child.props.name]) {
                      clearError(child.props.name)
                      validate(child.props, value, values)
                    } else {
                      clearError(child.props.name)
                    }
                  }

                  setValue(child.props.name, value)
                },
                onSubmitEditing: (nativeEvent) => {
                  if (child.props.multiline && child.props.multiline) {
                    return
                  }

                  const inputPosition = getInputPosition(
                    inputs,
                    child.props.name
                  )
                  const nextInputs = inputs.slice(inputPosition + 1)

                  const nextFocusableInput = nextInputs.find(
                    (element) =>
                      inputRefs[element.props.name] &&
                      inputRefs[element.props.name].current.focus
                  )

                  if (nextFocusableInput) {
                    inputRefs[nextFocusableInput.props.name].current.focus()
                  } else {
                    inputRefs[child.props.name].current.blur()
                    submitAfterLastInput && attemptSubmission()
                  }
                },
                onEndEditing: () =>
                  validateOnBlur &&
                  validate(child.props, values[child.props.name], values),
                returnKeyType: getReturnKeyType(inputs, child.props.name),
                blurOnSubmit: false,
                key: child.props.name,
                error: errors[child.props.name],
              })

              inputRefs[child.props.name] = ref
              return element
            }

            if (
              child.props &&
              child.props.type &&
              child.props.type === 'submit'
            ) {
              return cloneElement(child, {
                key: `${child.props.type}-${i}`,
                onPress: () => attemptSubmission(child.key),
                disabled: child.props.disabled
                  ? child.props.disabled
                  : child.props.disable
                  ? child.props.disable({
                      values,
                      errors,
                      setErrors,
                      runValidation,
                      setValues,
                      empty:
                        !Object.values(values).filter((i) => i != false)
                          .length > 0,
                    })
                  : undefined,
              })
            }

            if (
              child.props &&
              child.props.children &&
              typeof child.props.children !== 'string'
            ) {
              return cloneElement(
                child,
                {
                  key: i,
                },
                parseJSX(child.props.children)
              )
            }

            return child
          })}
        </>
      )
    }

    const runValidation = () => {
      let validationErrors = parseFieldValidation(children, values)

      let errorsMappedToFields = validationErrors.reduce((errors, item) => {
        errors[item.name] = item.error
        return errors
      }, {})

      setErrors(errorsMappedToFields)

      return { errors: errorsMappedToFields, isValid: !validationErrors.length }
    }

    return <View style={style}>{parseJSX(children)}</View>
  }
)
