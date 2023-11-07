import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Alert,  } from 'react-native';
import { StackActions } from '@react-navigation/native';
import { CheckBox } from 'react-native-elements';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { db, auth } from './firebaseConfig';



export default function SignUp({ navigation }) {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [nick, setNick] = useState('');
  const [mw, setMw] = useState('');
  const [age, setAge] = useState('');

  const handleSignUp = () => {
    if (!id || !pw || !nick || !mw || !age) {
      Alert.alert("오류", "모든 필수 항목을 입력하세요.");
      return;
    }

    // Firebase Authentication에서 사용자 생성
    createUserWithEmailAndPassword(auth, id, pw)
      .then((userCredential) => {
        // 사용자 등록이 성공하면
        const user = userCredential.user;

        // Firebase 실시간 데이터베이스에 추가 사용자 데이터 저장
        const usersRef = ref(db, 'users/' + user.uid);
        set(usersRef, {
          id,
          pw,
          age,
          nick,
          gender: mw,
        });

        Alert.alert(
          '회원 가입이 완료되었습니다',
          '가입을 축하드립니다! 다시 로그인하세요.',
          [
            { text: '확인', onPress: () => {
                navigation.dispatch(StackActions.popToTop());
              },
            }
          ]
        );
      })
      .catch((error) => {
        Alert.alert('오류', error.message);
      });
  }
  

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
      <Text style={styles.join}>회원가입 페이지{'\n'}</Text>
      <Text style={{fontSize: 18}}>사용하실 ID를 입력해주세요.</Text>
      <TextInput
        style={[styles.input, { marginBottom: 30 }]}
        value={id}
        onChangeText={(text) => setId(text)}
        placeholder="이메일"
      />
      
      <Text style={{fontSize: 18}}>사용하실 PW를 입력해주세요.</Text>
      <TextInput
        style={[styles.input, { marginBottom: 5 }]}
        value={pw}
        onChangeText={(text) => setPw(text)}
        placeholder="비밀번호"
        secureTextEntry={true}
      />
      <Text style={{fontSize: 12, marginBottom:25, marginLeft:8,color:"gray"}}>비밀번호는 최소 6자 이상</Text>

      <Text style={{fontSize: 18}}>닉네임을 입력해주세요.</Text>
      <TextInput
        style={[styles.input, { marginBottom: 30 }]}
        value={nick}
        onChangeText={(text) => setNick(text)}
        placeholder="닉네임"
      />

      <Text style={{fontSize: 18}}>나이를 입력해주세요.</Text>
      <TextInput
        style={styles.input}
        value={age}
        onChangeText={(text) => setAge(text)}
        placeholder="나이"
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

      <TouchableOpacity style={styles.login} onPress={() => handleSignUp()}>
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
   join:{
    fontSize: 33,
    color: '#F5A9A9',
    textAlign: 'center',
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
