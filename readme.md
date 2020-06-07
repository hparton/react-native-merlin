<img src="https://raw.githubusercontent.com/hparton/react-native-merlin/master/assets/merlin.png" width="260">

[![npm][npm-image]][npm-url]

[npm-image]: https://img.shields.io/npm/v/react-native-merlin.svg?style=flat-square
[npm-url]: https://npmjs.org/package/react-native-merlin

---

Simple web like forms in react native. Controlled components with a little bit of magic.

[Features](#features) | [Installation](#installation) | [Usage](#usage)

## Features

- **Simple:** Merlin aims to mimic the functionality of web forms, just wrap your
  inputs in a `<Form>` tag, add an onSubmit and any inputs you want to track.

- **Built in Validation:** Built in support for basic validation with the option
  to extend it with your own and overwrite any error messages.

## Installation

```bash
$ yarn add react-native-merlin
```

## Usage

```js
import { Form } from 'react-native-merlin'

const ExampleScreen = () => {
    return (
        <Form
            onSubmit={({values, errors, isValid}) => {
                if (isValid) {
                    console.log(values);
                } else {
                    console.log(errors)
                }
            }}
        >
            <TextInput name="username" />
            <TextInput name="password" required secureTextEntry={true} />
            <Button title="Submit" type="submit">
        </Form>
    )
}
```

<!--

If no FILE is provided it will try to read from standard input, or
automatically look for "README.md" if in a TTY.

### Examples

Read a file from disk:

```sh
$ vmd DOCUMENT.md
```

When no path to a document is supplied, "README.md" will be opened by default:

```sh
$ vmd
```

When a path to a directory is supplied, "directory/README.md" will be opened by default:

```sh
$ vmd node_modules/electron # opens node_modules/electron/README.md
```

It reads from `stdin` so you can pipe markdown text in to it:

```sh
$ cat README.md | vmd
```

For example, you can see the readme for [browserify](https://github.com/substack/node-browserify) like so:

```sh
$ npm view browserify readme | vmd
```

Or from a GitHub project:

```sh
$ gh-rtfm substack/node-browserify | vmd
```

## Components

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin maximus fermentum risus, sit amet maximus enim laoreet non. Duis at neque non risus accumsan dignissim quis id erat. Donec erat elit, lobortis sit amet laoreet sed, congue at risus. Vivamus congue vitae nunc ut porttitor. Donec egestas aliquam purus, ut suscipit libero pulvinar viverra.

### Form

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

#### Options

- `initialValues`: Display the version number. `default: {}`

- `initialErrors`: Display version numbers of different internal components such `default: {}`

- `validateOnBlur`: Display usage instructions. `default: false`

- `submitOnLastField`: Open with the developer tools open. `default: true`

- `revalidateOnInput`: Set a zoom factor to make the content larger or smaller. `default: true`

### [name="input"]

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

#### Options

- `name`: Display the version number. `default: {}`

- `onChangeKey`: Display version numbers of different internal components such `default: {}`

- `value`: Display usage instructions. `default: false`

- `handleValue`: Open with the developer tools open. `default: true`

- `errorMessages`: Set a zoom factor to make the content larger or smaller. `default: true`

- `validator`: Set a zoom factor to make the content larger or smaller. `default: true`

### [type="submit]

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

#### Options

- `name`: Display the version number. `default: {}`

- `onChangeKey`: Display version numbers of different internal components such `default: {}`

- `validateOnBlur`: Display usage instructions. `default: false`

- `submitOnLastField`: Open with the developer tools open. `default: true`

- `revalidateOnInput`: Set a zoom factor to make the content larger or smaller. `default: true`

## Validation

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin maximus fermentum risus, sit amet maximus enim laoreet non. Duis at neque non risus accumsan dignissim quis id erat. Donec erat elit, lobortis sit amet laoreet sed, congue at risus. Vivamus congue vitae nunc ut porttitor. Donec egestas aliquam purus, ut suscipit libero pulvinar viverra.
-->

<!--
// form usage
// submitting
// input props
// submit + props and keys
// validation
// validation error messages
// form props
// setting validation errors
// initialValues
// initialProps
-->
