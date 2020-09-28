import React, { useCallback } from 'react'
import { Text, View } from 'react-native'
import { useForm } from './Form'

const Error = ({ as = View, children, name, ...props }) => {
  const { errors } = useForm('Form.Error')
  const Tag = as
  const error = errors?.[name] || false

  return (
    <Tag {...{ ...props, error }}>
      {children ? children(error) : error && <Text>{error.message}</Text>}
    </Tag>
  )
}

export default Error
