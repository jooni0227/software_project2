import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { CheckBox } from 'react-native-elements';

export default function SignUp({ navigation }) {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [num, setNum] = useState('');
  const [mw, setMw] = useState('');
  
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
      <Text style={{fontSize: 18}}>사용하실 ID를 입력해주세요.</Text>
      <TextInput
        style={[styles.input,{ marginBottom: 30}]}
        value={id}
        onChangeText={(text) => setId(text)}
        placeholder="아이디"
      />
      
      <Text style={{fontSize: 18}}>사용하실 PW를 입력해주세요.</Text>
      <TextInput
        style={[styles.input,{ marginBottom: 30}]}
        value={pw}
        onChangeText={(text) => setPw(text)}
        placeholder="비밀번호"
        secureTextEntry={true}
      />

      <Text style={{fontSize: 18}}>전화번호를 입력해주세요.</Text>
      <TextInput
        style={styles.input}
        value={num}
        onChangeText={(text) => setNum(text)}
        placeholder="전화번호"
        keyboardType="number-pad"
      />

      <View style={styles.check}>
            <CheckBox 
                title='남자'
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checked={mw === 'male'}
                onPress={() => setMw('male')}
                containerStyle={{backgroundColor: 'transparent', borderWidth: 0,  marginBottom: 15}}
                checkedColor='#F5A9A9'
            />
            <CheckBox 
                title='여자'
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checked={mw === 'female'}
                onPress={() => setMw('female')}
                containerStyle={{backgroundColor: 'transparent', borderWidth: 0,  marginBottom: 15}}
                checkedColor='#F5A9A9'
            />
        </View>

      <TouchableOpacity style={styles.login}>
          <Text style={{ color: 'white', fontSize: 16 }}>회원가입하기</Text>
      </TouchableOpacity>
    </View>
    </TouchableWithoutFeedback> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  input: {
    width: 350,
    height: 60,
    marginVertical: 10,
    padding: 20,
    borderColor: '#F5A9A9',
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: 'white',
   },
   login:{
    width: 300,
    height: 50,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth:1,
    borderRadius: 30,
    marginTop:35,
    marginLeft:24,
    marginBottom: 10,
  },
  check:{
    flexDirection: 'row', 
    justifyContent: 'center',
  }
});
