<p align="center">
  <img src="https://raw.githubusercontent.com/hparton/react-native-merlin/master/assets/merlin.png" width="260">
</p>

<p align="center">
  Simple web like forms in react native.
</p>

<p align="center"> 
  <a href="#installation">Installation</a> | <a href="#components">Components</a> | <a href="#usage">Usage</a>
</p>

<p align="center">
  <a href="https://npmjs.org/package/react-native-merlin"><img src="https://img.shields.io/npm/v/react-native-merlin.svg?style=flat-square"></a>
</p>

## About

Merlin is still in early beta, It's in a few apps currently in development and the API is mostly stable but there may be a few breaking changes between now and release. It's not recommended for use in a critical production app but feel free to tinker with it.

## Installation

```sh
# npm
npm install react-native-merlin

#yarn
yarn add react-native-merlin
```

## Components

- [Form](#form)
- [Form.Input](#form-input)
- [Form.Submit](#form-submit)
- [Form.Error](#form-error)
- [Form.State](#form-state)


#### Form

```jsx
<Form
  onSubmit={}
  onError={}
  values={[]}
  errors={[]}
  watch={false}
  watchValues={false}
  watchErrors={false}
>
  {/* Your content goes here*/}
</Form>
```

##### Props

| Prop          | Type                                  | Description                                                                           |
| ------------- | ------------------------------------- | ------------------------------------------------------------------------------------- |
| `onSubmit`    | Function                              | Function to call when the form passes validation on submission.                       |
| `onError`     | Function                              | Function to call when the form fails validation on submission.                        |
| `values`      | Object _(Default: `{}`)_              | External values to pass to the form for the inputs to use as an initial value.        |
| `errors`      | Array _(Default: `[]`)_               | External errors to pass to the form for the inputs to use as an initial error.        |
| `watch`       | Boolean _(Default: `false`)_          | Should the form update internal state if `values` or `errors` changes.                |
| `watchValues` | Boolean _(Default: `false`)_          | Should the form update internal state if `values` changes.                            |
| `watchErrors` | Boolean _(Default: `false`)_          | Should the form update internal state if `errors` changes.                            |

## Usage

```js
import {TextInput, Button} from 'react-native'
import { Form } from 'react-native-merlin'

const ExampleScreen = () => {
    return (
        <Form
          onSubmit={values => {
            console.log('Form submitted! ', values);
          }}
          onError={errors => {
            console.log('Form submission failed! ', errors)
          }}
        >
            <Form.Input as={TextInput} name="username" />
            <Form.Input as={TextInput} name="password" required secureTextEntry={true} />
            <Form.Submit title="Submit">
        </Form>
    )
}
```
