<img src="https://raw.githubusercontent.com/hparton/react-native-merlin/master/assets/merlin.png" width="260" >
<br>
<br>
[![NPM version][npm-image]][npm-url]
<!-- [![build status][travis-image]][travis-url] -->

---

Simple web like forms in react native. Controlled components with a little bit of magic.

[Features](#features) | [Installation](#installation) | [Usage](#usage) | [Examples](#examples) | [Command-line options](#options) | [Configuration](#configuration)

## Features

- **GitHub style:** The markdown content is rendered as close to the way it's
  rendered on GitHub as possible.

- **File watching:** Local files opened in vmd are watched for changes and the
  viewer will automatically update when a file has been changed. This makes it
  ideal for writing documents in your favorite text editor and get a live
  preview.

- **Standard input:** View any markdown text from other programs by piping
  another program's output in to vmd. Check out the [examples](#examples) for
  cool use cases.

- **Drag & Drop:** Drag files from your file browser or desktop on to a vmd
  window and render it. Hold the `Shift` key while dropping to open the file
  in a new window.

- **Navigation:** Navigate within linked sections in a document, open relative
  links to other documents in the same window or in a new one (`shift-click`),
  and always be able to go back in the history. And open links to directories
  in your file manager and external links in your default browser.

- **Clipboard:** Copy links and local file paths to the clipboard, and even
  copy images in binary format to paste them in to your image editing
  software.

- **Emoji:** :bowtie: Displays emoji, such as `:sweat_drops:`. Take a look at the
  [Emoji Cheat Sheet][emoji-cheat-sheet] for a list of available emoji.

- **Search in page:** Search within your markdown file and scroll to the
  results. Select "Edit -> Find" from the menu or hit `Ctrl+F` (or `Cmd+F` on
  OS X).

- **Customization:** Select different themes and provide your own styles to
  make vmd look the way you want. Take a look at the [Options](#options) for
  an overview of available customization options.

- **Front Matter**: Renders [Front Matter][frontmatter] in YAML and, if
  enabled, in TOML and JSON so you can preview your Jekyll and Hugo content in
  vmd. See some [examples][hugo-frontmatter].

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

[npm-image]: https://img.shields.io/npm/v/react-native-merlin.svg?style=flat-square
[npm-url]: https://npmjs.org/package/react-native-merlin
[travis-image]: https://img.shields.io/travis/yoshuawuyts/vmd/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/yoshuawuyts/vmd
