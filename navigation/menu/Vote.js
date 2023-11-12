import { useState, useEffect } from "react";
import React from 'react';
import { WebView } from 'react-native-webview';
import { TouchableOpacity, StyleSheet, Text, View, ScrollView, Alert} from "react-native";
import { CheckBox } from 'react-native-elements';
import { ref, get, child, getDatabase, update } from 'firebase/database';
import { db,auth } from './firebaseConfig';
import { PieChart } from 'react-native-chart-kit';


function AfterVote({ chartData }) {
  const getVoteCount = (itemName) => {
    return chartData.filter((vote) => vote === itemName).length || 0;
  };
  return (
    <View style={styles.container1}>

      {/* 차트 */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>투표 결과 차트</Text>
        <PieChart
          data={[
            {
              name: 'Knit',
              population: getVoteCount('knit'),
              color: '#FF6384',
              legendFontColor: '#7F7F7F',
              legendFontSize: 15,
            },
            {
              name: 'Cardigan',
              population: getVoteCount('cardigan'),
              color: '#36A2EB',
              legendFontColor: '#7F7F7F',
              legendFontSize: 15,
            },
            
            // ... 추가적으로 필요한 데이터를 추가
          ]}
          width={350}
          height={220}
          chartConfig={{
            backgroundGradientFrom: '#F5A9A9',
            backgroundGradientTo: '#F5A9A9',
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      </View>
    </View>
  );
}


function VoteScreen({setShow, onChartDataChange,chartData}) {
  const [selectedItem, setSelectedItem] = useState('');
  const [selectedItem2, setSelectedItem2] = useState('');
  const [selectedItem3, setSelectedItem3] = useState('');

  useEffect(() => {
    const fetchVoteData = async () => {
      // 모든 사용자의 투표 데이터 가져오기
      const usersRef = ref(db, 'users');
      const usersSnapshot = await get(usersRef);
      console.log(usersRef, usersSnapshot);
      const allUsersVoteData = [];
    
      usersSnapshot.forEach((userSnapshot) => {
        const userVoteData = userSnapshot.val()?.vote;
        if (userVoteData && userVoteData.top) {
          allUsersVoteData.push(userVoteData.top);
          console.log("탑",allUsersVoteData)

        }
      });
    
      onChartDataChange(allUsersVoteData);

      
    };
    
    

    fetchVoteData();
  }, [chartData]);

  const handleVoteSubmit = () => {
    const user = auth.currentUser;
    if (!user) {
      Alert.alert('오류', '사용자 인증 실패.');
      return;
    }
    const newChartData = [...chartData, selectedItem, selectedItem2, selectedItem3];
    onChartDataChange(newChartData);

    const userId = user.uid;

    // Firebase에서 사용자 데이터 업데이트
    const userRef = ref(db, `users/${userId}`);
    update(userRef, {
      vote: {
        top: selectedItem,
        bottom: selectedItem2,
        jacket: selectedItem3,
      },
    });

    // 사용자에게 투표 제출 성공 메시지 표시
    Alert.alert('성공', '투표가 성공적으로 제출되었습니다.');

    // show 상태를 AfterVote로 설정
    setShow('AfterVote');
  };

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
      <TouchableOpacity style={styles.login} onPress={handleVoteSubmit}>
          <Text style={{ color: 'white', fontSize: 16, }}>제출하기</Text>
        </TouchableOpacity>
    </View>
  );
}

export default function Vote({ navigation }) {
  const [show, setShow] = useState('vote');
  const [chartData, setChartData] = useState([]);
  const handleButtonClick = () => {
    setShow(false);
  };
  const handleChartDataChange = (newChartData) => {
    setChartData(newChartData);
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
        <VoteScreen setShow={setShow} onChartDataChange={handleChartDataChange} chartData={chartData} />
      ) : (
        <AfterVote chartData={chartData} />
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
