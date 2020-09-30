/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
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

const reverseString = value => {
  const arr = value.split('');
  return [arr[arr.length - 1], ...arr.slice(0, -1)].join('');
};

const StyledTextInput = React.forwardRef(({error, label, ...props}, ref) => (
  <View>
    {label && <Text style={styles.label}>{label}</Text>}
    <TextInput {...props} ref={ref} />
    {error && <Text>{error.message}</Text>}
  </View>
));

const App: () => React$Node = () => {
  const [showExtraFields, setShowExtraFields] = useState(true);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Form
            values={initialValues}
            onSubmit={(values, {event, id}) => {
              console.log('Submitted! ', values, id);
            }}
            onError={errors => console.log('Submission Failed! ', errors)}>
            <View style={styles.sectionContainer}>
              <Text>Content that isn't related to the form.</Text>
              <Switch
                value={showExtraFields}
                onValueChange={() => setShowExtraFields(current => !current)}
              />
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

              {showExtraFields && (
                <Form.Input
                  as={StyledTextInput}
                  parseValue={reverseString}
                  required
                  name="pet-name"
                  label="Pet Name"
                  style={styles.input}
                />
              )}

              <Form.Input
                style={styles.input}
                as={StyledTextInput}
                label="Password"
                name="password"
                secureTextEntry={true}
                required
              />

              <Form.Input
                style={styles.input}
                as={StyledTextInput}
                label="Title"
                name="title"
                required
              />

              {showExtraFields && (
                <Form.Input
                  style={styles.input}
                  as={StyledTextInput}
                  label="Childs Name"
                  multiline
                  name="child.name"
                  required
                />
              )}
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
