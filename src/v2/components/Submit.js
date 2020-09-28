import React, { useCallback } from 'react'
import { useForm } from './Form'

const Submit = ({ as, children, eventKey = 'onPress', id, ...props }) => {
  const { handleSubmit } = useForm('Form.Submit')
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
