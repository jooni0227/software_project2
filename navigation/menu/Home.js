import * as Location from 'expo-location';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, ActivityIndicator, Image} from 'react-native';
import { Fontisto } from '@expo/vector-icons';
import 민소매 from '../icon/민소매.png';
import 반바지 from '../icon/반바지.png';
import 원피스 from '../icon/원피스.png';
import 반팔티 from '../icon/반팔티.png';
import 반팔티2 from '../icon/반팔티2.png';
import 바지 from '../icon/바지.png';
import 긴팔티 from '../icon/긴팔티.png';
import 가디건 from '../icon/가디건.png';
import 재킷 from '../icon/재킷.png';
import 코트 from '../icon/코트.png';
import 패딩 from '../icon/패딩.png';
import 목도리 from '../icon/목도리.png';

const temperatureIcons = {
  hot: [민소매, 반바지, 원피스],
  warm: [반팔티, 반팔티2, 바지],
  mild: [가디건, 긴팔티, 바지],
  cool: [가디건, 재킷, 바지],
  cold: [코트,패딩,목도리],
};

function getTemperatureIcon(temperature) {
  if (temperature > 28) {
    return temperatureIcons.hot;
  } else if (temperature > 23 && temperature <= 28) {
    return temperatureIcons.warm;
  } else if (temperature > 16 && temperature <= 23) {
    return temperatureIcons.mild;
  } else if (temperature > 8 && temperature <= 16) {
    return temperatureIcons.cool;
  } else if (temperature <= 8) {
    return temperatureIcons.cold;
  } else {
    return [];
  }
}

function getTemperatureText(temperature) {
  if (temperature > 28) {
    return "민소매, 반바지, 원피스";
  } else if (temperature > 23 && temperature <= 28) {
    return "반팔티, 얇은 셔츠, 반바지, 면바지";
  } else if (temperature > 16 && temperature <= 23) {
    return "  가디건, 맨투맨, 긴바지";
  } else if (temperature > 8 && temperature <= 16) {
    return "가디건, 재킷, 긴바지, 니트";
  } else if (temperature <= 8) {
    return "두꺼운 코트, 패딩, 목도리" 
  }else {
    return "기타";
  }
}



const {width:SCREEN_WIDTH} = Dimensions.get('window'); //휴대폰 화면 확인하는 API

const API_KEY = "33ed60c372b64f1fa11eafa16df0fb46"; //원래라면 서버에 API key를 두고 불러와서 사용해야 함.

const icons = {
  Clouds:"cloudy",
  Clear:"day-sunny",
  Rain: "rain",
  Atmosphere: "cloudy-gusts",
  Snow: "snow",
  Drizzle: "day-rain",
  Thunderstorm: "lightning",
}


export default function WeatherApp() {
  const [city,setCity] = useState("Loading...");
  const [days, setDays] = useState([]);
  const [ok,setOk]= useState(true);
  const getWeather = async() => {
    const {granted} = await Location.requestForegroundPermissionsAsync();
    if(!granted){
      setOk(false);
    }
    const {coords:{latitude,longitude}} = await Location.getCurrentPositionAsync({accuracy:5});
    const location = await Location.reverseGeocodeAsync({latitude,longitude}, {useGoogleMaps:false});
    setCity(location[0].city);
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
    const json = await response.json();
    setDays(
      json.list.filter((weather) => {
        if (weather.dt_txt.includes("00:00:00")) {
          return weather;
        }
      })
    );
  };
  useEffect(() => {
    getWeather();
  }, []);

  
  return (
    <View style={styles.container}>
      <View style= {styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
     
      {days.length === 0 ? (
        <View style={styles.day}>
          <ActivityIndicator  color="black" style={{marginTop:30, marginLeft:180}} size="large"  />
        </View>
      ) : (
        days.map((day,index) =>
        <View key={index} style={styles.day}>
          <View style={{flexDirection:"row",alignItems:"center", width:"90%",justifyContent:"space-between"}}>
            <Text style={styles.temp}>{parseFloat(day.main.temp).toFixed(1)}</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", width: "90%" }}>
            <Text style={styles.description}>{day.weather[0].main}</Text>
            <Fontisto name={icons[day.weather[0].main]} size={40} color="white" marginLeft={8} />  
          </View>
          <View style={styles.clothes}>
              <Text style={{fontSize:25,color:"black",marginTop:-10}}>Today</Text>
              <View style={styles.iconRow}>
                {getTemperatureIcon(parseFloat(day.main.temp).toFixed(1)).map((icon, index) => (
                  <Image key={index} style={[styles.icon, { marginLeft:-9,marginRight: 13}]} source={icon} />
                ))}
              </View>
              <View>
                <Text style={styles.conditionsText}>{getTemperatureText(parseFloat(day.main.temp).toFixed(1))}</Text>
              </View>
          </View>
        </View>
        )
      )}  
       
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1, 
    backgroundColor:"#F5A9A9",
  }, 
  city:{
    justifyContent:"center",
    alignItems:"center",
  },
  cityName:{
    fontSize:40,
    fontWeight:"500",
    color:"white",
    marginTop:40,
  },
  weather:{
    
  },
  day:{
    width:SCREEN_WIDTH,
    alignContent:"center",
    alignItems:"left",
    marginBottom:450,
    
  },
  temp:{
    marginTop:15,
    fontSize:100,
    marginLeft:105,
    alignContent:"center",
    color:"white",
  },
  description:{
    marginTop:-1,
    fontSize:40,
    marginTop:1,
    marginLeft:125,
    color:"white",
  },
  clothes:{
    height:350,
    width:355,
    padding:30,
    marginTop:30,
    marginLeft:19,
    borderWidth:2,
    borderRadius:50,
    borderColor:"black",
    backgroundColor:"white",
  },
  iconRow: {
    flexDirection: "row",
    marginTop:50,
  },
  icon:{
    width:110, 
    height:110,
    
  },
  conditionsText:{
    fontSize:25,
    marginTop:50,
    marginLeft:25,
  }
})
