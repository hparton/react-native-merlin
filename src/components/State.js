import React, { useCallback } from 'react'
import { useForm } from './Form'

const State = ({ as = React.Fragment, children, ...props }) => {
  const { values, errors } = useForm('Form.State')
  const Tag = as
  return <Tag {...props}>{children && children({ values, errors })}</Tag>
}

export default State
