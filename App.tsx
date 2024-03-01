/* *
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { theme } from './color';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

const STORAGE_KEY = "@toDos"

function App(): React.JSX.Element {
  const [working, setWorking] = useState(true);
  const travel = () => setWorking(false);
  const work = () => setWorking(true);
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<any>({});
  const onChangeText = (payload: string) => setText(payload);
  const saveTodos = async (toSave:object) => {
    const s = JSON.stringify(toSave)
    await AsyncStorage.setItem(STORAGE_KEY, s)
  };
  const addTodo = async () => {
    if (text === ""){
      return 
    }
    const newToDos = {
      ...todos,
      [Date.now()]: { text, working },
      };
    setTodos(newToDos);
    await saveTodos(newToDos);
    setText("");
  }
  const loadTodo = async () => {
    const s = await AsyncStorage.getItem(STORAGE_KEY)
    JSON.parse(s: String);
  }
  useEffect(() => {
    loadTodo()
  }, [])
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text style={{...styles.btnText, color : working ? "white": theme.grey}}>Work</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
        <Text style={{...styles.btnText, color : working ? theme.grey: "white"}}>Travel</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TextInput 
          onSubmitEditing={addTodo}
          placeholder={working ? "Add a To do" : "Where do you want to go?"}
          onChangeText={onChangeText}
          returnKeyType="done"
          clearTextOnFocus
          style={styles.input} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {Object.keys(todos).map((key) => (
          todos[key].working === working ?
          <View style={styles.todo} key={key as string}>
            <Text style={styles.todoText}>{todos[key].text}</Text>
          </View>: null
        ))} 
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: theme.background,
    paddingHorizontal: 25
  },
  header:{
    justifyContent: "space-between",
    flexDirection:"row",
    marginTop:100,
  },
  btnText:{
    fontSize:40,
    color: "white",
    fontWeight:"600",
  },
  input:{
    backgroundColor:"white",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 15,
    fontSize: 15,
    marginBottom:25,
  },
  todo:{
    backgroundColor: theme.todoBg,
    marginVertical:6,
    padding:25,
    borderRadius: 17,
  },
  todoText:{
    color: "white",
    fontWeight: "500",
    fontSize: 15,
  }
});

export default App;
