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

Merlin is still in early beta, It's in a few apps currently in development and the API is mostly stable but there may be a few breaking changes between now and release.

### Features

- 🔎 &nbsp;Auto focus on the next input
- 📚 &nbsp;Built in validation with support for custom validators.
- ❌ &nbsp;Built in error handling.
- 💾 &nbsp;Support for external form state.
- 📦 &nbsp;Dependency free.

### Roadmap

- 100% test coverage.
- Async form validators.

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

Merlin takes care of state management for you. At it's most basic it looks like this:

```js
<Form onSubmit={values => console.log(values)}>
    <Form.Input name="username" required />
    <Form.Submit title="Submit" />
</Form>
```

This will render out a `FormProvider` to hold your form state, an input which defaults to a `TextInput` and a submit button which defaults to a `Button`. It also handles some basic validation whilst giving you a framework to build on top of.

<br />

### Handling Form Submissions

It's not much use to have a form that just console logs out some values if it's valid and does nothing if there is an error so we need to add some logic around that. First up is showing any relvant errors to the user using `<Form.Error>`.

```js
<Form 
    onSubmit={values => console.log(values)}
    onError={errors => console.log(errors)}
>
    <Form.Input name="username" required />
    <Form.Error name="username" />
    <Form.Submit title="Submit" />
</Form>
```

This will render out a `Text` element if there are any errors that match the input name, these can be placed anywhere inside the `<Form>` parent.

The other change we made was adding the `onError` prop so we know when the form submission failed due to a validation error. We can then report this back to other parts of the app or to an external service.

Currently the validation will only run on an input when the form is submitted or when the input changes and it already has an error, this is the default behaviour so we don't start trying to validate as the user starts typing which is bad UX. If you need this on certain fields that need feedback as you type(such as a password strength indicator). Then you can use the `instantValidation` prop which will run the validator on every change.

<br/>

### Async Form Submissions

Your form submission is most likely going to post off to a backend and take a second or two to finish submitting. In this time you might want to disable the form from being submitted again or display something to the user so they know it's working away in the background. Merlin makes this simple, just provide an async function as the `onSubmit` handler and Merlin will wait until it resolves.

To get access to the current form state you can use `<Form.State>` and a render function.

```js
const wait = duration => new Promise(success => setTimeout(success, duration));
const handleSubmit = async (values) => {
    await wait(2000); // this is where you would do your post instead.
    console.log('Submitted! ', values);
}

<Form 
    onSubmit={handleSubmit}
>
    <Form.Input name="username" required />
    <Form.Error name="username" />
    <Form.State>
        {({submitting}) => (
            <Form.Submit disabled={submitting} title={submitting ? 'Submitting...' : 'Submit'} />
        )}
    </Form.State>
</Form>
```

<br />

### Integrating with external validation errors

If you are submitting to an external service you will probably get some validation errors back if your local validation doesn't quite match the servers. Not to worry, you can handle this with a bit of extra work in Merlin. First we need to add a `ref` to the form so we can get access to a few helper methods.

Then we can use the `addErrors` helper to add our external errors.

```js
const formRef = useRef(null)
const wait = duration => new Promise((success, fail) => setTimeout(fail, duration));
const handleSubmit = async (values) => {
    try {
        await wait(2000); // this is where you would do your post instead.
    } catch (e) {
        testRef.current.addErrors(error => ({
            username: error('externalError', 'Error from the api!'),
        }));
    }
}

<Form
    ref={formRef}
    onSubmit={handleSubmit}
>
    <Form.Input name="username" required />
    <Form.Submit title="Submit" />
</Form>
```


<br />

### Using Custom Validators

Merlin ships with some basic validators loosely based on the built in HTML5 form validation. Currently just `required`, `minLength` and `maxLength` but these will be expanded on in the future if needed to cover more common use cases. If you need to expand beyond this and want to integrate your own validators it's very simple. Just add a `validator` prop to the `<Form.Input>`.

```js
const isNotFoo = (value, error) => value !== 'Foo' && error('notFoo', `Value should not be Foo.`);

<Form onError={errors => console.log(errors)}>
    <Form.Input name="username" required validator={isNotFoo} />
    <Form.Submit title="Submit" />
</Form>
```

A validator is provided `(value, error, values)`.

`value` is the current value of the field you  are running the validator on. `error` is a helper to return an error in the format that Merlin expects. The first argument is the type of error and the second is the message and `values` gives you access to other values in the form in case you need them to do a comparision. A great example of this is password matching for a confirmation field.

```js
const confirmPassword = (value, error, values) => value !== values.password && error('passwordMismatch', "Passwords don't match");

<Form onError={errors => console.log(errors)}>
    <Form.Input name="password" required />
    <Form.Input name="password_confirmation" required validator={confirmPassword} />
    <Form.Error name="password_confirmation">
</Form>
```

<br />

### Using Custom Inputs
Just using the built in inputs provided by `react-native` won't get you very far when it comes to styling up you form, adding custom functionality or integrating 3rd party inputs.

You can specify what the `<Form.Input>` should render as by providing the `as` prop. Merlin will then render the input using that component instead and pass along all the props you defined as well as any props managed by Merlin (such as the `value` or `error` for the field).

```js
<Form onSubmit={values => console.log(values)}>
    <Form.Input as={StyledTextInput} name="username" label="User" required />
    <Form.Submit as={Button} title="Submit" />
</Form>
```

And this is what the `StyledTextInput` would look like. You need to make sure to use `forwardRef` to pass along the ref handled by Merlin onto the actual input you want to use.

```js
const StyledTextInput = React.forwardRef(({error, label, ...props}, ref) => (
  <View>
    {label && <Text style={styles.label}>{label}</Text>}
    <TextInput {...props} ref={ref} />
    {error && <Text>{error.message}</Text>}
  </View>
));
```

If you're using a third party component or integrating an existing component you may need to tell Merlin how to integrate with your input properly. There are a few ways that you can do this. This example uses a `Switch` component from `react-native`.

```js
<Form.Input
    as={Switch}
    name="example"
    required
    valueKey="value"
    eventKey="onValueChange"
    parseValue={value => value ? 1 : 0}
/>
```

Here we are making use of `valueKey` to tell Merlin what prop the component expects the form value as, `eventKey` to know what to listen to so we can update the form state and `parseValue` to transform the value before we put it in the form state. In this instance we are converting the `Boolean` to a `Number` but it could be anything. Using these three props makes it possible to integrate almost any component directly into Merlin.

<br />

### Using External State

If you don't want to manage your state locally using Merlin but still want all the other benefits then you can pass in `values` and `errors` to the `<Form>` component.

```js

const initialValues = {
  username: 'Arthur',
};

<Form
    values={initialValues}
>
    <Form.Input name="username" />
    <Form.Submit title="Submit">
</Form>

```

By default this will just set the initial state of the form on the first render to match those values but you can ensure that the form stays up to date with any changes by passing the `watch` prop. You can also watch values and errors separately with `watchValues` and `watchErrors` respectively.

```js

const [values, setValues] = useState({
    username: 'Percival'
}) 

<Form
    values={values}
    watchValues={true}
>
    <View>
        <Button onPress={() => setValues({username: 'Uther'})} title="Change Name">
    </View>
    <View>
        <Form.Input name="username" />
        <Form.Submit title="Submit">
    </View>
</Form>

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
  values={{}}
  errors={{}}
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
| `errors`      | Array _(Default: `{}`)_      | External errors to pass to the form for the inputs to use as an initial error. |
| `watch`       | Boolean _(Default: `false`)_ | Should the form update internal state if `values` or `errors` changes.         |
| `watchValues` | Boolean _(Default: `false`)_ | Should the form update internal state if `values` changes.                     |
| `watchErrors` | Boolean _(Default: `false`)_ | Should the form update internal state if `errors` changes.                     |

##### Ref props

| Prop          | Type     | Description                                                                                                        |
| ------------- | -------- | ------------------------------------------------------------------------------------------------------------------ |
| `submit`      | Function | Submit the form from outside of the form context.                                                                  |
| `addErrors`   | Function | Add additional errors to the internal form errors, for instance from an external api.                              |
| `clearErrors` | Function | Clear errors from the internal form errors, pass an array of names to specify what to remove or remove everything. |

```jsx
const formRef = useRef()
const form = formRef.current

// Submit the form from outside the form context
const submit = () => form.submit()

// Add external errors.
const externalErrors = () => form.addErrors(error => {
  return {
    username: error('externalUsername', 'Username is not foo!')
  }
}

// Clear specific errors
const clear = () => form.clearErrors(['username'])
// Clear all errors
const clearAll = () => form.clearErrors()

<View>
  <Form ref={formRef}>
    <Form.Input name="username" required />
    <Form.Error name="username />
    <Form.Input name="password" secureTextInput />
    <Form.Error name="password />
    <Form.Submit title="Submit" />
  </Form>

  <Button title="Submit" onPress={submit} />
  <Button title="Add Errors" onPress={externalErrors} />
  <Button title="Clear Errors" onPress={clear} />
</View>
```

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

| Prop                | Type                               | Description                                                                                                                               |
| ------------------- | ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `name`              | String                             | Name for the input when mapped in to the form values.                                                                                     |
| `as`                | Component _(Default: `TextInput`)_ | Component to render the input as.                                                                                                         |
| `eventKey`          | String _(Default: `onChangeText`)_ | Event from the input to listen to for value updates.                                                                                      |
| `valueKey` | String _(Default: `value`)_ | Prop from the input that expects the form value |
| `parseValue`        | Function                           | Function to handle input values before updating them in the form.                                                                         |
| `instantValidation` | Boolean _(Default: `false`)_       | Should we start validating as soon as the user starts changing the input or only re-validate if we currently have an error for the field. |
| `required`          | Boolean _(Default: `false`)_       | Field is required to not be falsey to submit the form.                                                                                    |
| `maxLength`         | Number                             | Field is required to be under the maxLength to submit the form.                                                                           |
| `minLength`         | Number                             | Field is required to be over the minLength to submit the form.                                                                            |
| `validator`         | Function                           | Custom validation function, return `true` to pass or return a custom error.                                                               |

##### Custom validator

```js
const validator = (v, error, values) => {
  // Either return an error to fail or nothing/true to pass.
  // You can get access to other form values from values

  if (v !== 'Foo') {
    return error('notFoo', 'Thats not foo!')
  }

  return true
}
```

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

| Prop         | Type    | Description                                        |
| ------------ | ------- | -------------------------------------------------- |
| `values`     | Object  | Access to the internal values state from the form. |
| `errors`     | Array   | Access to the internal errors state from the form. |
| `submitting` | Boolean | Is the form currently submitting.                  |

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
