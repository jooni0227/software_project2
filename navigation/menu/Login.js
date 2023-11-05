import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Alert,TouchableOpacity, Image, Pressable} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

export default function Login({route}) {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const navigation = useNavigation();
  const [loginStatus, setLoginStatus] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');


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
    if (id !== 'a') {
      Alert.alert('아이디가 올바르지 않습니다.');
      return;
    } else if (pw !== 'a') {
      Alert.alert('비밀번호가 올바르지 않습니다.');
      return;
    }
  
    // 로그인 성공하면 로그인 상태를 변경
    setLoginStatus(false);
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

    if (!result.cancelled) {
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
  // 이미지 바꾸기 알림창 구현
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
        <Text style={styles.text}>{id}님 환영합니다!</Text>
        </View>
        </View>
        <View style={styles.underline} />
        <Text style={styles.text1}>투표횟수 회</Text>
        <View style={styles.underline} />
        <Text style={styles.text2}>* 이벤트 *</Text>
        <Text style={styles.text3}>오늘 뭐 입지? 앱을 이용해주셔서 감사합니다.{'\n'}저희는 기프티콘 제공 이벤트를 진행합니다.{'\n'}매월 1일 추점을 진행하여 총 3명의 당첨자를{'\n'}발표합니다.
        </Text>
        <Text style={styles.text2}>* 조건 *</Text>
        <Text style={styles.text3}>투표횟수가 20회 이상인 분들만 응모 가능합니다.{'\n'}응모하신 후 투표횟수는 20회가 차감됩니다.</Text>
        <TouchableOpacity style={styles.event} >
          <Text style={{ color: 'white', fontSize: 16 }}>응모하기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.event2} >
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
