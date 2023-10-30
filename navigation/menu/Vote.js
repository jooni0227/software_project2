import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';

function Vote({navigation}) {
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
      <div style="padding-left: 70px;">
        <div style="font-size: 140px; margin-top: 130px; color:white; text-align: left;">오늘<br> 뭐 입지?</div>
      </body>
      </html>
    `;
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <WebView
          source={{ html: renderFontHtml()}}
        />
      </View>
      <Text style={styles.text}>{'\n'}* 투표는 3문항으로 구성됩니다.</Text>
      <TouchableOpacity style={styles.vote} onPress={() => navigation.navigate('Vote2')}>
          <Text style={{ color: 'white', fontSize: 16 }}>투표시작</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5A9A9',
  },
  topContainer: {
    height: 230, // 위쪽 영역의 높이 비율을 3으로 설정
    borderWidth:1,
    borderColor:'#F5A9A9'
  },  
  text: {
    fontSize: 20,
  },
  vote:{
    width: 300,
    height: 50,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth:1,
    borderRadius: 30,
    marginTop:5,
    marginLeft:45,
    marginBottom: 50,
  },
  text:{
    color: 'black',
    fontSize: 20,
    marginBottom: 270,
    marginLeft: 40,
  }
});

export default Vote;
