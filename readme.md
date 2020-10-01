<p align="center">
  <img src="https://raw.githubusercontent.com/hparton/react-native-merlin/master/assets/merlin.png" width="260">
</p>

<p align="center">
  Simple web-like forms in react native.
</p>

<p align="center"> 
  <a href="#installation">Installation</a> | <a href="#components">Components</a> | <a href="#usage">Usage</a>
</p>

<p align="center">
  <a href="https://npmjs.org/package/react-native-merlin"><img src="https://img.shields.io/npm/v/react-native-merlin.svg?style=flat-square"></a>
</p>

## About

Merlin is still in early beta, It's in a few apps currently in development and the API is mostly stable but there may be a few breaking changes between now and release. It's not recommended for use in a critical production app but feel free to tinker with it.

### Features

- 🔎 &nbsp;Auto focus on the next input
- 📚 &nbsp;Built in validation with support for custom validators.
- ❌ &nbsp;Built in error handling.
- 💾 &nbsp;Support for external form state.
- 📦 &nbsp;Dependency free.

### Roadmap

- 100% test coverage.
- Async form validators.
- Async submission handling.

...and more in the future.

---

## Installation

```sh
# npm
npm install react-native-merlin

#yarn
yarn add react-native-merlin
```

## Usage

```js
import {TextInput, Button} from 'react-native'
import Form from 'react-native-merlin'

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
      <Form.Submit as={Button} title="Submit">
    </Form>
  )
}
```

## Components

- [Form](#form)
- [Form.Input](#forminput)
- [Form.Submit](#formsubmit)
- [Form.Error](#formerror)
- [Form.State](#formstate)

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

| Prop          | Type                         | Description                                                                    |
| ------------- | ---------------------------- | ------------------------------------------------------------------------------ |
| `onSubmit`    | Function                     | Function to call when the form passes validation on submission.                |
| `onError`     | Function                     | Function to call when the form fails validation on submission.                 |
| `values`      | Object _(Default: `{}`)_     | External values to pass to the form for the inputs to use as an initial value. |
| `errors`      | Array _(Default: `[]`)_      | External errors to pass to the form for the inputs to use as an initial error. |
| `watch`       | Boolean _(Default: `false`)_ | Should the form update internal state if `values` or `errors` changes.         |
| `watchValues` | Boolean _(Default: `false`)_ | Should the form update internal state if `values` changes.                     |
| `watchErrors` | Boolean _(Default: `false`)_ | Should the form update internal state if `errors` changes.                     |

#### Form.Input

```jsx
<Form.Input
  name=""
  as={TextInput}
  eventKey=""
  parseValue={}
  required
  maxLength={}
  minLength={}
  validator={}
/>
```

##### Props

| Prop         | Type                               | Description                                                                 |
| ------------ | ---------------------------------- | --------------------------------------------------------------------------- |
| `name`       | String                             | Name for the input when mapped in to the form values.                       |
| `as`         | Component _(Default: `TextInput`)_ | Component to render the input as.                                           |
| `eventKey`   | String _(Default: `onChangeText`)_ | Event from the input to listen to for value updates.                        |
| `parseValue` | Function                           | Function to handle input values before updating them in the form.           |
| `required`   | Boolean _(Default: `false`)_       | Field is required to not be falsey to submit the form.                      |
| `maxLength`  | Number                             | Field is required to be under the maxLength to submit the form.             |
| `minLength`  | Number                             | Field is required to be over the minLength to submit the form.              |
| `validator`  | Function                           | Custom validation function, return `true` to pass or return a custom error. |

#### Form.Submit

```jsx
<Form.Submit id="" as={Button} eventKey="" />
```

##### Props

| Prop       | Type                               | Description                                                                      |
| ---------- | ---------------------------------- | -------------------------------------------------------------------------------- |
| `id`       | String                             | Can be consumed in the form `onSubmit` method to see where the submit came from. |
| `as`       | Component _(Default: `Button`)_    | Component to render the input as.                                                |
| `eventKey` | String _(Default: `onChangeText`)_ | Event from the input to listen to for value updates.                             |

#### Form.Error

```jsx
<Form.Error name="" as={Text} />
```

##### Props

| Prop   | Type                          | Description                                |
| ------ | ----------------------------- | ------------------------------------------ |
| `name` | String                        | Name of the field to render the error for. |
| `as`   | Component _(Default: `Text`)_ | Component to render the input as.          |

##### Render prop arguments

| Prop    | Type                                 | Description                                |
| ------- | ------------------------------------ | ------------------------------------------ |
| `error` | Object _(`{type: '', message: ''}`)_ | Error passed down from the form validation |

#### Form.State

```jsx
<Form.State as={React.Fragment} />
```

##### Props

| Prop | Type                                    | Description                       |
| ---- | --------------------------------------- | --------------------------------- |
| `as` | Component _(Default: `React.Fragment`)_ | Component to render the input as. |

##### Render prop arguments

| Prop     | Type   | Description                                        |
| -------- | ------ | -------------------------------------------------- |
| `values` | Object | Access to the internal values state from the form. |
| `errors` | Array  | Access to the internal errors state from the form. |

## Contribute

First off, thanks for taking the time to contribute!
Now, take a moment to be sure your contributions make sense to everyone else.

### Reporting Issues

Found a problem? Want a new feature? First of all see if your issue or idea has [already been reported](../../issues).
If not, just open a [new clear and descriptive issue](../../issues/new).

### Submitting pull requests

Pull requests are the greatest contributions, so be sure they are focused in scope, and do avoid unrelated commits.

- Fork it!
- Clone your fork: `git clone https://github.com/<your-username>/react-native-merlin`
- Navigate to the newly cloned directory: `cd react-native-merlin`
- Create a new branch for the new feature: `git checkout -b my-new-feature`
- Install the tools necessary for development: `yarn`
- Make your changes.
- Commit your changes: `git commit -am 'Add some feature'`
- Push to the branch: `git push origin my-new-feature`
- Submit a pull request with full remarks documenting your changes.

## License

[MIT License](https://opensource.org/licenses/MIT) © [Harry Parton](https://harryparton.me/)
