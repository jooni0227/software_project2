import { useState, useEffect } from "react";
import React from 'react';
import { WebView } from 'react-native-webview';
import { TouchableOpacity, StyleSheet, Text, View, ScrollView, Alert} from "react-native";
import { CheckBox } from 'react-native-elements';
import { ref, get, child, getDatabase, update } from 'firebase/database';
import { db,auth } from './firebaseConfig';
import { PieChart } from 'react-native-chart-kit';


function AfterVote({topChartData, bottomChartData, jacketChartData }) {
  
  const getVoteCount = (itemName, data = []) => {
    console.log(data);
    if (data && data.length > 0) {
      // 정확한 아이템명을 비교하기 위해 정규표현식을 사용합니다.
      const regex = new RegExp(itemName, 'g');
      const count = (data.join('').match(regex) || []).length;
      return count;
    } else {
      return 0;
    }
  };
  
  
  //console.log(topChartData);
  //console.log(bottomChartData);
  //console.log(jacketChartData);
  return (
    <View style={styles.container1}>

      {/* 차트 */}
      <ScrollView style={styles.chartContainer}>
        <Text style={{fontSize:22,marginLeft:150, marginTop:20, }}>투표 결과</Text>
        {topChartData && topChartData.length > 0 && (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{fontSize:22,marginLeft:-275, marginTop:30}}>상의</Text>
        <View style={{ borderWidth: 2, borderColor: 'white', borderRadius: 8, padding: 10 ,width:320, height:240, marginTop:10 }}>
        <PieChart
          data={[
            {
              name: '니트',
              population: getVoteCount('knit',topChartData),
              color: 'yellow',
              legendFontColor: '#7F7F7F',
              legendFontSize: 15,
            },
            {
              name: '가디건',
              population: getVoteCount('cardigan',topChartData),
              color: '#36A2EB',
              legendFontColor: '#7F7F7F',
              legendFontSize: 15,
            },
            {
              name: '반팔',
              population: getVoteCount('sSleeve',topChartData),
              color: 'blue',
              legendFontColor: '#7F7F7F',
              legendFontSize: 15,
            },
            {
              name: '긴팔',
              population: getVoteCount('lSleeve',topChartData),
              color: 'red',
              legendFontColor: '#7F7F7F',
              legendFontSize: 15,
            },
            {
              name: '목티',
              population: getVoteCount('necks',topChartData),
              color: 'green',
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
          paddingLeft="10"
          absolute
        />
        </View>
        </View>
        )}
        {bottomChartData && bottomChartData.length > 0 && (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{fontSize:22,marginLeft:-275, marginTop:45}}>하의</Text>
        <View style={{ borderWidth: 2, borderColor: 'white', borderRadius: 8, padding: 10 ,width:320, height:240, marginTop:10 }}>
        <PieChart
          data={[
            {
              name: '반바지',
              population: getVoteCount('shorts',bottomChartData),
              color: 'yellow',
              legendFontColor: '#7F7F7F',
              legendFontSize: 15,
            },
            {
              name: '긴바지',
              population: getVoteCount('pants',bottomChartData),
              color: '#36A2EB',
              legendFontColor: '#7F7F7F',
              legendFontSize: 15,
            },
            {
              name: '슬랙스',
              population: getVoteCount('slacks',bottomChartData),
              color: 'blue',
              legendFontColor: '#7F7F7F',
              legendFontSize: 15,
            },
            {
              name: '청바지',
              population: getVoteCount('bluejeans',bottomChartData),
              color: 'red',
              legendFontColor: '#7F7F7F',
              legendFontSize: 15,
            },
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
          paddingLeft="10"
          absolute
        />
        </View>
        </View>
        )}
        {jacketChartData && jacketChartData.length > 0 && (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{fontSize:22,marginLeft:-275, marginTop:45, }}>재킷</Text>
        <View style={{ borderWidth: 2, borderColor: 'white', borderRadius: 8, padding: 10 ,width:320, height:240, marginTop:10 }}>
        <PieChart
          data={[
            {
              name: '바람막이',
              population: getVoteCount('jacket',jacketChartData),
              color: 'yellow',
              legendFontColor: '#7F7F7F',
              legendFontSize: 15,
            },
            {
              name: '코트',
              population: getVoteCount('coat',jacketChartData),
              color: '#36A2EB',
              legendFontColor: '#7F7F7F',
              legendFontSize: 15,
            },
            {
              name: '패딩',
              population: getVoteCount('padding',jacketChartData),
              color: 'blue',
              legendFontColor: '#7F7F7F',
              legendFontSize: 15,
            },
            {
              name: '조끼',
              population: getVoteCount('vest',jacketChartData),
              color: 'red',
              legendFontColor: '#7F7F7F',
              legendFontSize: 15,
            },
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
          paddingLeft="5"
          absolute
        />
        </View>
        </View>
        )}
      </ScrollView>
    </View>
  );
}


function VoteScreen({setShow, onTopChartDataChange, onBottomChartDataChange, onJacketChartDataChange, setTopChartData,setBottomChartData,setJacketChartData}) {
  const [selectedItem, setSelectedItem] = useState('');
  const [selectedItem2, setSelectedItem2] = useState('');
  const [selectedItem3, setSelectedItem3] = useState('');

  useEffect(() => {
    const fetchVoteData = async () => {
      // 모든 사용자의 투표 데이터 가져오기
      const usersRef = ref(db, 'users');
      const usersSnapshot = await get(usersRef);
      //console.log(usersRef, usersSnapshot);
      //const allUsersVoteData =[];
      const TopUsersVoteData = [];
      const BottomUsersVoteData = [];
      const JacketUsersVoteData = [];
    
      usersSnapshot.forEach((userSnapshot) => {
        const userVoteData = userSnapshot.val()?.vote;
        //allUsersVoteData.push(userVoteData);
        //console.log("전부",allUsersVoteData)
        
        if (userVoteData && userVoteData.top) {
          TopUsersVoteData.push(userVoteData.top);
          //console.log("탑",TopUsersVoteData)
        }
        if (userVoteData && userVoteData.bottom) {
          BottomUsersVoteData.push(userVoteData.bottom);
          //console.log("바텀",BottomUsersVoteData)
        }
        if (userVoteData && userVoteData.jacket) {
          JacketUsersVoteData.push(userVoteData.jacket);
          //console.log("재킷",JacketUsersVoteData)
        }
      });
      onTopChartDataChange(TopUsersVoteData);
      onBottomChartDataChange(BottomUsersVoteData);
      onJacketChartDataChange(JacketUsersVoteData);

      setTopChartData(TopUsersVoteData);
      setBottomChartData(BottomUsersVoteData);
      setJacketChartData(JacketUsersVoteData);
      
      console.log('LOG 전체 데이터', TopUsersVoteData, BottomUsersVoteData, JacketUsersVoteData);
    };

    fetchVoteData();
  }, []);

  const handleVoteSubmit = async () => {
    const user = auth.currentUser;
    if (!user) {
      Alert.alert('오류', '사용자 인증 실패.');
      return;
    }

    onTopChartDataChange(selectedItem);
    onBottomChartDataChange(selectedItem2);
    onJacketChartDataChange(selectedItem3);

    const userId = user.uid;

    // Firebase에서 사용자 데이터 업데이트
    const userRef = ref(db, `users/${userId}`);
    const userSnapshot = await get(userRef);
    let currentCount = userSnapshot.val()?.vote?.count || 0;
    currentCount++;

    update(userRef, {
      vote: {
        top: selectedItem,
        bottom: selectedItem2,
        jacket: selectedItem3,
        count: currentCount,
      },
    });

    Alert.alert('성공', '투표가 성공적으로 제출되었습니다.');
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
  const [topChartData, setTopChartData] = useState([]);
  const [bottomChartData, setBottomChartData] = useState([]);
  const [jacketChartData, setJacketChartData] = useState([]);

  const handleButtonClick = () => {
    setShow(false);
  };
  const handleTopChartDataChange = (newChartData) => {
    setTopChartData([...topChartData, ...newChartData]);
  };
  
  const handleBottomChartDataChange = (newChartData) => {
    setBottomChartData([...bottomChartData, ...newChartData]);
  };
  
  const handleJacketChartDataChange = (newChartData) => {
    setJacketChartData([...jacketChartData, ...newChartData]);
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
        <VoteScreen setShow={setShow} onTopChartDataChange={handleTopChartDataChange} onBottomChartDataChange={handleBottomChartDataChange} onJacketChartDataChange={handleJacketChartDataChange} setTopChartData={setTopChartData} // 추가: state를 업데이트하기 위한 함수
        setBottomChartData={setBottomChartData} // 추가: state를 업데이트하기 위한 함수
        setJacketChartData={setJacketChartData} // 추가: state를 업데이트하기 위한 함수
      /> 
      ) : (
        <AfterVote topChartData={topChartData} bottomChartData={bottomChartData} jacketChartData={jacketChartData}/>
      )}
      </View>
  );
}

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: '#F5A9A9',
  },
  container2: {
    flex: 1,
    backgroundColor: 'white',
  },
  topContainer1: {
    height: 230, 
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
    flex: 4, 
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
