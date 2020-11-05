import React, { useCallback } from 'react'
import { Text, View } from 'react-native'
import { useForm } from './Form'

const Error = ({ as: Tag = Text, children, name, ...props }) => {
  const { errors } = useForm('Form.Error')
  const error = errors?.[name] || false

  return <Tag {...{ ...props, error }}>{children ? children(error) : error && error.message}</Tag>
}

export default Error
