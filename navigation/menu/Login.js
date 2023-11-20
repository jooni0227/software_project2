import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, Alert,TouchableOpacity, Image, Pressable} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { signInWithEmailAndPassword, getAuth, onAuthStateChanged } from 'firebase/auth';
import { ref, get, set } from 'firebase/database';
import { db } from './firebaseConfig';
import { onValue } from "firebase/database";


export default function Login({route}) {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [nick, setNick] = useState('');
  const navigation = useNavigation();
  const [loginStatus, setLoginStatus] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(null); 
  const [voteCount, setVoteCount] = useState(0);
  const now = new Date();
  const FirstDay = now.getDate() === 1;


  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
        // 사용자의 uid로 데이터베이스에서 닉네임을 가져옴
        const userRef = ref(db, 'users/' + user.uid);
        try {
          const snapshot = await get(userRef);
          if (snapshot.exists()) {
            const userData = snapshot.val();
            setNick(userData.nick);
          }
        } catch (error) {
          console.error('Error getting user data:', error);
        }
    });
  }, []);
  
  useEffect(() => {
    const auth = getAuth();
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userId = user.uid;
        const userVoteRef = ref(db, 'users/' + userId + '/vote/count');
  
        // 사용자의 투표 횟수를 실시간으로 감지
        const unsubscribeVote = onValue(userVoteRef, (snapshot) => {
          if (snapshot.exists()) {
            const voteData = snapshot.val();
            setVoteCount(voteData);
          }
        });
        // 컴포넌트가 언마운트될 때 cleanup 함수 실행
        return () => {
          unsubscribeVote();
        };
      }
    }, [db]); // db를 의존성 배열에 추가
  }, []); 
 

  //응모하기 버튼
  const selectRandomUser = async () => {
    const usersRef = ref(db, 'users/');
  
    // 현재 사용자의 ID
    const auth = getAuth();
    const userId = auth.currentUser.uid;
  
    // 사용자의 현재 투표 횟수
    const userVoteRef = ref(db, 'users/' + userId + '/vote/count');
    const voteSnapshot = await get(userVoteRef);
    const userVoteCount = voteSnapshot.exists() ? voteSnapshot.val() : 0;
  
    if (userVoteCount >= 15) {
      const updatedVoteCount = userVoteCount - 1;
      try {
        await set(userVoteRef, updatedVoteCount);
        setVoteCount(updatedVoteCount);
        Alert.alert('응모 완료', '투표 횟수가 차감되었습니다.');
      } catch (error) {
        console.error('투표 횟수 업데이트 실패:', error);
      }
    } else {
      Alert.alert('투표 횟수 부족', '이벤트에 참여하려면 최소 15회 이상의 투표 횟수가 필요합니다.');
    }
  };
  
 //당첨자 확인 버튼
  const win = () => {
    const usersRef = ref(db, 'users/');
    
    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      const userData = Object.values(data); // 모든 사용자 데이터를 배열
  
      let selectedUsers = [];
      for(let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * userData.length); 
        const selectedUser = userData[randomIndex];
        const selectedUserNick = selectedUser.nick; 
        selectedUsers.push(selectedUserNick);
        userData.splice(randomIndex, 1); // 이미 선택된 사용자를 제거하여 중복 선택 방지
      }
      setSelectedUserId(selectedUsers.join(', ')); 
      Alert.alert('당첨자 확인', `당첨자 닉네임: ${selectedUsers.join(', ')}`);
    });
  };

  const logout=()=>{
    Alert.alert("로그아웃", "로그아웃 하시겠습니까?", [
      {
        text: "예",
        onPress: async () => {
          setLoginStatus(true);
          setId("");
          setPw("");
        },
      },
      { text: "아니오" },
    ])
    
  }

const handleLogin = () => {
  if (!id || !pw) {
    Alert.alert('오류', 'ID와 비밀번호를 입력하세요.');
    return;
  }

  // Firebase를 사용하여 사용자 인증
  const auth = getAuth();
  signInWithEmailAndPassword(auth, id, pw, nick)
    .then(async () => {
      // 성공적으로 로그인
      setLoginStatus(false);
      const userId = auth.currentUser.uid;
      const userVoteRef = ref(db, 'users/' + userId + '/vote/count');
      try {
        const voteSnapshot = await get(userVoteRef);
        if (voteSnapshot.exists()) {
          const voteData = voteSnapshot.val();
          setVoteCount(voteData);
        } else {
          // 투표 데이터 없는 경우 초기값 0
          await set(userVoteRef, 0);
          setVoteCount(0);
        }
      } catch (error) {
        console.error('투표 데이터를 가져오는 중 오류 발생:', error);
      }
    })
    .catch((error) => {
      Alert.alert('오류', '아이디 또는 비밀번호가 올바르지 않습니다.');
    });
};

  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();

  const uploadImage = async () => {
  
    if(!status?.granted){
      const permission = await requestPermission();
      if(!permission.granted){
        return null;
      }
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const localUri = result.assets[0].uri;
      setSelectedImage(localUri);
  
      const filename = localUri.split('/').pop();
      const match = /\.(\w+)$/.exec(filename ?? '');
      const type = match ? `image/${match[1]}` : `image`;
  
      const formData = new FormData();
      formData.append('image', {uri: localUri, name: filename, type});

      try {
        await axios({
          method: 'post',
          url: '{API주소}',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          data: formData
        });
      } catch (error) {
        console.error('Upload failed:', error);
      }
    }
};


const handleImageChange = () => {
  Alert.alert(
    '이미지 바꾸기',
    '원하는 작업을 선택해주세요.',
    [
      {
        text: '사진 바꾸기',
        onPress: uploadImage,
        style : 'default',
      },
      {
        text: '삭제',
        onPress: handleImageDelete,
        style: 'destructive',
      },
      {
        text: '취소',
        style: 'cancel',
      },
    ]
  );
};

const handleImageDelete = () => {// 이미지 삭제
  setSelectedImage(null);
};

  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };
 

  const renderFontHtml = () => {
    return `
      <html>
      <head>
        <style>
          @font-face {
            font-family: 'yg-jalnan';
            src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_four@1.2/JalnanOTF00.woff') format('woff');
            font-weight: normal;
            font-style: normal;
          }
          body {  
            font-family: 'yg-jalnan';
            text-align: center; /* 텍스트를 수평으로 중앙 정렬 */
            background-color: #F5A9A9;
            overflow:hidden;
          }
        </style>
      </head>
      <body>
        <div style="font-size: 120px; margin-top: 230px; color:white;">오늘 뭐 입지?</div>
      </body>
      </html>
    `;
  };

  if(loginStatus){
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <WebView
          source={{ html: renderFontHtml()}}
        />
      </View>
      <View style={styles.bottomContainer}>
        <Text style={{ fontSize: 18, marginTop:10}}>ID</Text>
        <TextInput
          style={styles.input_id}
          value={id}
          onChangeText={(text) => setId(text)}
          placeholder="아이디"
          keyboardType="email-address"
        />
        <Text style={{ fontSize: 18 }}>Password</Text>
        <TextInput
          style={styles.input_pw}
          value={pw}
          onChangeText={(text) => setPw(text)}
          placeholder="비밀번호"
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={{ color: 'black', fontSize: 16 }}>회원가입</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.login} onPress={handleLogin}>
          <Text style={{ color: 'white', fontSize: 16 }}>로그인</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
  }else{
    return (
      <View style={styles.container2}>
        <View style={styles.content}>
        <View style={styles.image}>
         <Pressable onPress={handleImageChange}>
          {selectedImage ? (
            <Image source={{ uri: selectedImage }} style={{ width: 130, height: 130, borderRadius:90 }} />
          ) : (
            <Text style={{ color: 'black', fontSize: 16 }}>이미지 업로드</Text>
          )}
        </Pressable>
        </View>
        <View style={styles.profile}>
        <Text style={styles.text}>{nick}님 환영합니다!</Text>
        </View>
        </View>
        <View style={styles.underline} />
        <Text style={styles.text1}>투표횟수 {voteCount}회</Text>
        <View style={styles.underline} />
        <Text style={styles.text2}>* 이벤트 *</Text>
        <Text style={styles.text3}>오늘 뭐 입지? 앱을 이용해주셔서 감사합니다.{'\n'}저희는 기프티콘 제공 이벤트를 진행합니다.{'\n'}매월 1일 추점을 진행하여 총 3명의 당첨자를{'\n'}발표합니다.
        </Text>
        <Text style={styles.text2}>* 조건 *</Text>
        <Text style={styles.text3}>투표횟수가 20회 이상인 분들만 응모 가능합니다.{'\n'}응모하신 후 투표횟수는 20회가 차감됩니다.</Text>
        <TouchableOpacity style={styles.event} onPress={selectRandomUser} >
          <Text style={{ color: 'white', fontSize: 16 }}>응모하기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.event2} onPress={win}>
          <Text style={{ color: 'white', fontSize: 16 }}>당첨자 확인</Text>
        </TouchableOpacity>
        <View style={styles.underline} />
        <TouchableOpacity style={styles.logout} onPress={logout}>
          <Text style={{ color: 'black', fontSize: 16 }}>로그아웃</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5A9A9',
    borderWidth:1,
    borderColor:'#F5A9A9',
  },
  content: {
    flexDirection: 'row', // 수평으로 배치
    justifyContent: 'space-between', // 요소 사이의 간격을 최대로 설정
    alignItems: 'center', // 요소를 수직 가운데로 정렬
  },
  container2: {
    flex: 1,
    backgroundColor: '#F5A9A9',
  },
  topContainer: {
    flex: 4,
    borderWidth:1,
    borderColor:'#F5A9A9'
  },  
  bottomContainer: {
    flex: 7,
    justifyContent: 'center',
    padding: 20,  
    borderBottomColor: '#F5A9A9',
    borderTopRightRadius: 80,
    borderTopLeftRadius: 80,
    backgroundColor: 'white',
  },
  input_id: {
    width: 350,
    height: 60,
    marginVertical: 10,
    padding: 20,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: 'white',
    marginBottom:25,
  },
  input_pw: {
    width: 350,
    height: 60,
    marginVertical: 10,
    padding: 20,
    borderColor: 'gray',
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
  button: {
    width: 70,
    height: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft:275,
    borderWidth:0,
    borderRadius: 0,
  },
  underline: {
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    marginTop:20,
  },
  text:{
    marginTop:70,
    marginLeft:10,
    fontSize:20,
  },
  content: {
    flexDirection: 'row', 
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10, 
  },
  image: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginRight: 5,
    marginTop: 20,
    marginLeft:-80,
  },
  profile: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  text1:{
    marginTop:30,
    marginLeft:140,
    fontSize:20,
    marginBottom:10,
  },
  text2:{
    marginTop: 25,
    marginLeft: 30,
    fontSize:20,
    color:'white'
  },
  text3:{
    marginLeft:30,
    fontSize:18,
  },
  event:{
    width: 130,
    height: 40,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth:1,
    borderRadius: 30,
    marginTop:25,
    marginLeft:30,
  },
  event2:{
    width: 130,
    height: 40,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth:1,
    borderRadius: 30,
    marginTop:-40,
    marginLeft:230,
  },
  logout:{
    width: 130,
    height: 40,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginTop:20,
    marginLeft:130,
  },
});
