/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Button,
  Switch,
  TouchableOpacity,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import Form from 'react-native-merlin';

const initialValues = {
  username: 'Hary',
};

const empty = values =>
  !values || !Object.values(values).filter(i => i != false).length > 0;

const StyledTextInput = React.forwardRef(({error, label, ...props}, ref) => (
  <View>
    {label && <Text style={styles.label}>{label}</Text>}
    <TextInput {...props} ref={ref} />
    {error && <Text>{error.message}</Text>}
  </View>
));

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Form
            values={initialValues}
            onSubmit={(values, {e, id}) =>
              console.log('Submitted! ', values, id)
            }
            onError={errors => console.log('Submission Failed! ', errors)}>
            <View style={styles.sectionContainer}>
              <Text>Content that isn't related to the form.</Text>
            </View>

            <View style={styles.sectionContainer}>
              <Text style={styles.label}>Username</Text>
              <Form.Input
                style={styles.input}
                name="username"
                required
                maxLength={20}
                minLength={5}
                validator={(v, {error, values}) =>
                  v !== 'Harry' &&
                  error('customError', `Harry is the only valid username.`)
                }
              />
              <Form.Error name="username" />

              <Form.Input
                style={styles.input}
                as={StyledTextInput}
                label="Password"
                name="password"
                required
              />

              <Form.Input
                style={styles.input}
                as={StyledTextInput}
                label="Title"
                name="title"
                required
              />

              <Form.Input
                style={styles.input}
                as={StyledTextInput}
                label="Pet Name"
                name="pet-name"
                multiline
                required
              />

              <Form.Input
                style={styles.input}
                as={StyledTextInput}
                label="Childs Name"
                name="child.name"
                required
              />
            </View>

            <View style={styles.sectionContainer}>
              <View>
                <Text style={styles.label}>
                  Do you agree to the terms and conditions?
                </Text>
                <Form.Input
                  as={Switch}
                  name="terms"
                  required
                  eventKey="onValueChange"
                />
              </View>
              <Form.Error name="terms" />
            </View>

            <View style={styles.sectionContainer}>
              <Form.State>
                {({values}) => {
                  return (
                    <Form.Submit title="Submit" disabled={empty(values)} />
                  );
                }}
              </Form.State>

              <Form.Submit as={TouchableOpacity}>
                <Text>Submit that form!</Text>
              </Form.Submit>

              <Form.Submit as={TouchableOpacity} id="extra-submit">
                <Text>Submit that form with me!</Text>
              </Form.Submit>
            </View>
          </Form>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  label: {
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 4,
    padding: 10,
    marginTop: 5,
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
