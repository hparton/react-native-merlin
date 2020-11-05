import React, { useCallback } from 'react'
import { useForm } from './Form'

const State = ({ as: Tag = React.Fragment, children, ...props }) => {
  const { submitting, values, errors, inputs } = useForm('Form.State')
  return <Tag {...props}>{children && children({ values, errors, inputs, submitting })}</Tag>
}

export default State
