import React, {useState} from 'react';
import { View, Text, StyleSheet,TouchableOpacity, ScrollView} from 'react-native';
import { WebView } from 'react-native-webview';
import { CheckBox } from 'react-native-elements';

function Vote() {
  const [selectedItem, setSelectedItem] = useState('');
  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>1. 오늘 입은 상의</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexDirection: "row", marginVertical:-260 }}>
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
          title={<Text style={{fontSize: 20}}>자켓</Text>}
          checkedIcon='dot-circle-o'
          uncheckedIcon='circle-thin'
          checked={selectedItem === 'jacket'}
          onPress={() => selectedItem === 'jacket' ? setSelectedItem('') : setSelectedItem('jacket')}
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
      </ScrollView>
      <Text style={styles.text2}>2. 오늘 입은 하의</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexDirection: "row", marginVertical:-260 }}>
      <CheckBox 
          title={<Text style={{fontSize: 20}}>반바지</Text>}
          checkedIcon='dot-circle-o'
          uncheckedIcon='circle-thin'
          checked={selectedItem === 'shorts'}
          onPress={() => selectedItem === 'shorts' ? setSelectedItem('') : setSelectedItem('shorts')}
          containerStyle={{backgroundColor: 'transparent', borderWidth: 0}}
          checkedColor='#ffffff'  
            uncheckedColor='#000000'
        />

        <CheckBox 
          title={<Text style={{fontSize: 20}}>긴바지</Text>}
          checkedIcon='dot-circle-o'
          uncheckedIcon='circle-thin'
          checked={selectedItem === 'pants'}
          onPress={() => selectedItem === 'pants' ? setSelectedItem('') : setSelectedItem('pants')}
          containerStyle={{backgroundColor: 'transparent', borderWidth: 0}}
          checkedColor='#ffffff'  
            uncheckedColor='#000000'
        />

        <CheckBox 
            title={<Text style={{fontSize: 20}}>슬랙스</Text>}
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-thin'
            checked={selectedItem === 'slacks'}
            onPress={() => selectedItem === 'slacks' ? setSelectedItem('') : setSelectedItem('slacks')}
            containerStyle={{backgroundColor: 'transparent', borderWidth: 0}}
            checkedColor='#ffffff'  
            uncheckedColor='#000000'
        />
      </ScrollView>
      <Text style={styles.text2}>3. 기타</Text>
      <TouchableOpacity style={styles.vote}>
          <Text style={{ color: 'white', fontSize: 16 }}>제출하기</Text>
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
    flex: 4, // 위쪽 영역의 높이 비율을 3으로 설정
    borderWidth:1,
    borderColor:'#F5A9A9'
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
    marginBottom: 270,
    marginLeft: 20,
    marginTop: 20,
    fontWeight: 'bold',
  },
  text2:{
    color: 'white',
    fontSize: 35,
    marginBottom: 270,
    marginLeft: 20,
    marginTop: -280,
    fontWeight: 'bold',
  }
});

export default Vote;
