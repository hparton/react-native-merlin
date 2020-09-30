import { useEffect, useState } from 'react'

const useInputRefs = () => {
  const [inputCount, setInputCount] = useState(0)
  const [inputs, setInputs] = useState([])
  const [shouldRecalculate, setShouldRecalculate] = useState(false)

  const registerInput = props => {
    if (!props.ref) {
      throw new Error(
        'You must pass a ref as part of the props when calling registerInput({...}).'
      )
    }

    setInputs(current => [...current, { ...props }])
  }

  const addInput = () => {
    setInputCount(current => current + 1)

    return () => {
      setInputCount(current => current - 1)
    }
  }

  useEffect(() => {
    setInputs([])
    if (inputCount) {
      setShouldRecalculate(true)
    }
  }, [inputCount])

  useEffect(() => {
    if (shouldRecalculate) {
      setShouldRecalculate(false)
    }
  }, [shouldRecalculate])

  return {
    registerInput,
    addInput,
    inputs,
    shouldRecalculate,
  }
}

export default useInputRefs
