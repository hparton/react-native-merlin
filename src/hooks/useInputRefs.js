import { useEffect, useState, useRef } from 'react'

const useInputRefs = () => {
  const inputs = useRef([])
  const [inputCount, setInputCount] = useState(0)
  const [shouldRecalculate, setShouldRecalculate] = useState(true)

  const registerInput = props => {
    if (!props.ref) {
      throw new Error(
        'You must pass a ref as part of the props when calling registerInput({...}).'
      )
    }

    inputs.current = [...inputs.current, { ...props }]
  }

  const addInput = () => {
    setInputCount(current => current + 1)

    return () => {
      setInputCount(current => current - 1)
    }
  }

  useEffect(() => {
    inputs.current = []
    setShouldRecalculate(true)
  }, [inputCount])

  useEffect(() => {
    if (shouldRecalculate) {
      setShouldRecalculate(false)
    }
  }, [shouldRecalculate])

  return {
    registerInput,
    addInput,
    inputs: inputs.current,
    shouldRecalculate,
  }
}

export default useInputRefs
