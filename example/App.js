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
              <Text>Username</Text>
              <Form.Input
                as={TextInput}
                name="username"
                required
                maxLength={20}
                minLength={5}
              />
              <Text>Password</Text>
              <Form.Input as={TextInput} name="password" required />
              <Text>Title</Text>
              <Form.Input as={TextInput} name="title" required />
              <Text>Pet Name</Text>
              <Form.Input as={TextInput} name="pet-name" multiline required />
              <Text>Childs Name</Text>
              <Form.Input as={TextInput} name="child.name" required />
            </View>

            <View style={styles.sectionContainer}>
              <View>
                <Text>Do you agree to the terms and conditions?</Text>
                <Form.Input
                  as={Switch}
                  name="terms"
                  required
                  eventKey="onValueChange"
                />
              </View>
            </View>

            <View style={styles.sectionContainer}>
              <Form.Submit as={Button} title="Submit" />

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
  input: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 4,
    padding: 10,
    marginTop: 10,
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
