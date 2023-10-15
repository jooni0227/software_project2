import * as Location from 'expo-location';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, ActivityIndicator} from 'react-native';
import { Fontisto } from '@expo/vector-icons';


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
            <Fontisto name={icons[day.weather[0].main]} size={40} color="black" marginLeft={8} />  
          </View>
          <View style={styles.clothes}>
              {/* 여기에 원하는 추가 내용을 넣으세요 */}
              <Text style={{fontSize:25,color:"black",marginTop:-10}}>Today</Text>
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
    backgroundColor:"white",
  }, 
  city:{
    justifyContent:"center",
    alignItems:"center",
  },
  cityName:{
    fontSize:40,
    fontWeight:"500",
    color:"black",
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
    color:"black",

  },
  description:{
    marginTop:-1,
    fontSize:40,
    marginTop:1,
    marginLeft:125,
    color:"black",
  },
  clothes:{
    height:350,
    width:355,
    padding:30,
    marginTop:30,
    marginLeft:19,
    borderWidth:1,
    borderRadius:50,
    borderColor:"black",
    backgroundColor:"white",
    
  }
})

