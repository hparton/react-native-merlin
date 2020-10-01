import React, { useCallback } from 'react'
import { Button } from 'react-native'
import { useForm } from './Form'

const Submit = ({
  as = Button,
  children,
  eventKey = 'onPress',
  id,
  ...props
}) => {
  const { values, handleSubmit } = useForm('Form.Submit')
  const Tag = as

  const submit = useCallback(
    e => {
      handleSubmit(e, id)
    },
    [id, handleSubmit]
  )

  return <Tag {...{ ...props, [eventKey]: submit }}>{children}</Tag>
}

export default Submit
