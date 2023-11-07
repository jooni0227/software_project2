import { useState, useEffect } from "react";
import React from 'react';
import { WebView } from 'react-native-webview';
import { TouchableOpacity, StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";
import { CheckBox } from 'react-native-elements';

function AfterVote(){
  return (
    <View style={styles.container1}>
      <Text style={styles.text1}>{'\n'}* 투표는 3문항으로 구성됩니다.</Text>
      </View>
  );
}


function VoteScreen({setShow}) {
  const [selectedItem, setSelectedItem] = useState('');
  const [selectedItem2, setSelectedItem2] = useState('');
  const [selectedItem3, setSelectedItem3] = useState('');

  return (
    <View style={styles.container}>
      <View>
      <Text style={styles.text}>1. 오늘 입은 상의</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexDirection: "row", marginVertical:0}}>
      <CheckBox 
          title={<Text style={{fontSize: 20}}>니트</Text>}
          checkedIcon='dot-circle-o'
          uncheckedIcon='circle-thin'
          checked={selectedItem === 'knit'}
          onPress={() => selectedItem === 'knit' ? setSelectedItem('') : setSelectedItem('knit')}
          containerStyle={{backgroundColor: 'transparent', borderWidth: 0}}
          checkedColor='#ffffff'  
            uncheckedColor='#000000'
        />

        <CheckBox 
          title={<Text style={{fontSize: 20}}>가디건</Text>}  
          checkedIcon='dot-circle-o'
          uncheckedIcon='circle-thin'
          checked={selectedItem === 'cardigan'}
          onPress={() => selectedItem === 'cardigan' ? setSelectedItem('') : setSelectedItem('cardigan')}
          containerStyle={{backgroundColor: 'transparent', borderWidth: 0}}
          checkedColor='#ffffff'  
            uncheckedColor='#000000'
        />

        <CheckBox 
            title={<Text style={{fontSize: 20}}>반팔</Text>}
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-thin'
            checked={selectedItem === 'sSleeve'}
            onPress={() => selectedItem === 'sSleeve' ? setSelectedItem('') : setSelectedItem('sSleeve')}
            containerStyle={{backgroundColor: 'transparent', borderWidth: 0}}
            checkedColor='#ffffff'  
            uncheckedColor='#000000'
        />

        <CheckBox 
            title={<Text style={{fontSize: 20}}>긴팔</Text>}
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-thin'
            checked={selectedItem === 'lSleeve'}
            onPress={() => selectedItem === 'lSleeve' ? setSelectedItem('') : setSelectedItem('lSleeve')}
            containerStyle={{backgroundColor: 'transparent', borderWidth: 0}}
            checkedColor='#ffffff'  
            uncheckedColor='#000000'
        />

        <CheckBox 
            title={<Text style={{fontSize: 20}}>목티</Text>}
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-thin'
            checked={selectedItem === 'necks'}
            onPress={() => selectedItem === 'necks' ? setSelectedItem('') : setSelectedItem('necks')}
            containerStyle={{backgroundColor: 'transparent', borderWidth: 0}}
            checkedColor='#ffffff'  
            uncheckedColor='#000000'
        />
      </ScrollView>
      <Text style={styles.text2}>2. 오늘 입은 하의</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexDirection: "row", marginVertical:0 }}>
      <CheckBox 
          title={<Text style={{fontSize: 20}}>반바지</Text>}
          checkedIcon='dot-circle-o'
          uncheckedIcon='circle-thin'
          checked={selectedItem2 === 'shorts'}
          onPress={() => selectedItem2 === 'shorts' ? setSelectedItem2('') : setSelectedItem2('shorts')}
          containerStyle={{backgroundColor: 'transparent', borderWidth: 0}}
          checkedColor='#ffffff'  
            uncheckedColor='#000000'
        />

        <CheckBox 
          title={<Text style={{fontSize: 20}}>긴바지</Text>}
          checkedIcon='dot-circle-o'
          uncheckedIcon='circle-thin'
          checked={selectedItem2 === 'pants'}
          onPress={() => selectedItem2 === 'pants' ? setSelectedItem2('') : setSelectedItem2('pants')}
          containerStyle={{backgroundColor: 'transparent', borderWidth: 0}}
          checkedColor='#ffffff'  
            uncheckedColor='#000000'
        />

        <CheckBox 
            title={<Text style={{fontSize: 20}}>슬랙스</Text>}
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-thin'
            checked={selectedItem2 === 'slacks'}
            onPress={() => selectedItem2 === 'slacks' ? setSelectedItem2('') : setSelectedItem2('slacks')}
            containerStyle={{backgroundColor: 'transparent', borderWidth: 0}}
            checkedColor='#ffffff'  
            uncheckedColor='#000000'
        />

        <CheckBox 
            title={<Text style={{fontSize: 20}}>청바지</Text>}
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-thin'
            checked={selectedItem2 === 'bluejeans'}
            onPress={() => selectedItem2 === 'bluejeans' ? setSelectedItem2('') : setSelectedItem2('bluejeans')}
            containerStyle={{backgroundColor: 'transparent', borderWidth: 0}}
            checkedColor='#ffffff'  
            uncheckedColor='#000000'
        />
      </ScrollView>
      <Text style={styles.text2}>3. 오늘 입은 자켓</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexDirection: "row", marginVertical:0 }}>
      <CheckBox 
          title={<Text style={{fontSize: 20}}>바람막이</Text>}
          checkedIcon='dot-circle-o'
          uncheckedIcon='circle-thin'
          checked={selectedItem3 === 'jacket'}
          onPress={() => selectedItem3 === 'jacket' ? setSelectedItem3('') : setSelectedItem3('jacket')}
          containerStyle={{backgroundColor: 'transparent', borderWidth: 0}}
          checkedColor='#ffffff'  
            uncheckedColor='#000000'
        />

        <CheckBox 
          title={<Text style={{fontSize: 20}}>코트</Text>}
          checkedIcon='dot-circle-o'
          uncheckedIcon='circle-thin'
          checked={selectedItem3 === 'coat'}
          onPress={() => selectedItem3 === 'coat' ? setSelectedItem3('') : setSelectedItem3('coat')}
          containerStyle={{backgroundColor: 'transparent', borderWidth: 0}}
          checkedColor='#ffffff'  
            uncheckedColor='#000000'
        />

        <CheckBox 
            title={<Text style={{fontSize: 20}}>패딩</Text>}
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-thin'
            checked={selectedItem3 === 'padding'}
            onPress={() => selectedItem3 === 'padding' ? setSelectedItem3('') : setSelectedItem3('padding')}
            containerStyle={{backgroundColor: 'transparent', borderWidth: 0}}
            checkedColor='#ffffff'  
            uncheckedColor='#000000'
        />
        <CheckBox 
            title={<Text style={{fontSize: 20}}>조끼</Text>}
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-thin'
            checked={selectedItem3 === 'vest'}
            onPress={() => selectedItem3 === 'vest' ? setSelectedItem3('') : setSelectedItem3('vest')}
            containerStyle={{backgroundColor: 'transparent', borderWidth: 0}}
            checkedColor='#ffffff'  
            uncheckedColor='#000000'  
        />
      </ScrollView>
      </View>
      <TouchableOpacity style={styles.login} onPress={() => setShow('AfterVote')}>
          <Text style={{ color: 'white', fontSize: 16, }}>제출하기</Text>
        </TouchableOpacity>
    </View>
  );
}

export default function Vote({ navigation }) {
  const [show, setShow] = useState('vote');

  const handleButtonClick = () => {
    setShow(false);
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
      <div style="padding-left: 70px;">
        <div style="font-size: 140px; margin-top: 130px; color:white; text-align: left;">오늘<br> 뭐 입지?</div>
      </body>
      </html>
    `;
  };

  return (
    <View style={styles.container1}>
      {show === 'vote' ? (
        <>
      <View style={styles.topContainer1}>
        <WebView
          source={{ html: renderFontHtml()}}
        />
      </View>
      <Text style={styles.text1}>{'\n'}* 투표는 3문항으로 구성됩니다.</Text>
      <TouchableOpacity onPress={() => setShow('voting')}> 
        <View style={styles.vote1}>
        <Text style={{ color: 'white', fontSize: 22 }}>투표시작</Text>
        </View>
      </TouchableOpacity>
    </>
      ) : show === 'voting' ? (
        <VoteScreen setShow={setShow}/>
      ) : (
      <AfterVote/>
      )}
      </View>
  );
}

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: '#F5A9A9',
  },
  topContainer1: {
    height: 230, // 위쪽 영역의 높이 비율을 3으로 설정
    borderWidth:1,
    borderColor:'#F5A9A9'
  },  
  vote1:{
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
  text1:{
    color: 'black',
    fontSize: 20,
    marginBottom: 270,
    marginLeft: 40,
  },
  container: {
    flex: 1,
    backgroundColor: '#F5A9A9',
  },
  topContainer: {
    flex: 4, // 위쪽 영역의 높이 비율을 3으로 설정
    borderWidth:1,
    borderColor:'#F5A9A9'
  },  
  login:{
    width: 300,
    height: 50,
    fontSize: 16,
    color: 'white',
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth:1,
    borderRadius: 30,
    marginTop:40,
    marginLeft:50,
    marginBottom: 30,
  },
  vote:{
    width: 300,
    height: 50,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth:1,
    borderRadius: 30,
    marginTop:35,
    marginLeft:45,
    marginBottom: 50,
  },
  text:{
    color: 'white',
    fontSize: 35,
    marginBottom: 30,
    marginLeft: 20,
    marginTop: 85,
    fontWeight: 'bold',
  },
  text2:{
    color: 'white',
    fontSize: 35,
    marginBottom: 30,
    marginLeft: 20,
    marginTop: 45,
    fontWeight: 'bold',
  },
});
