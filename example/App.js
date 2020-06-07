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
  Alert,
} from 'react-native';

import Form from 'react-native-merlin';

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <Form
            onSubmit={({values, errors, isValid}) => {
              if (isValid) {
                Alert.alert(JSON.stringify(values));
              } else {
                console.log(errors);
              }
            }}>
            <TextInput name="name" required style={{backgroundColor: 'pink'}} />
            <View>
              <View>
                <TextInput
                  name="password"
                  required
                  secureTextEntry={true}
                  style={{backgroundColor: 'pink'}}
                />
              </View>
            </View>
            <View>
              <TextInput
                name="email"
                validator={(v, {error, values}) =>
                  v !== 'jam@isgreat.fact' &&
                  error(
                    'jamError',
                    `Jam is great and you know it ${values.name}`,
                  )
                }
                style={{backgroundColor: 'pink'}}
              />
            </View>
            <View>
              <Button title="Submit" type="submit" />
            </View>
          </Form>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default App;
