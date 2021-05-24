import React, { useRef, useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import Constant from "expo-constants";
import { useTheme } from '@react-navigation/native';
//import {Picker} from '@react-native-picker/picker';


import Header from "../components/Header";
import Tile from "../components/Tile"

import { FontAwesome5 } from '@expo/vector-icons';
import { RFPercentage } from "react-native-responsive-fontsize";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function GlobalDataScreen(props) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const { colors } = useTheme();
    //const [selectedLanguage, setSelectedLanguage] = useState("");
    //console.log(selectedLanguage);


    useEffect(() => {
        fetch('https://www.hpb.health.gov.lk/api/get-current-statistical')
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);


    

    let covidData = {};

    if (data.data != undefined) {
        covidData.update_date_time = data.data.update_date_time;
        covidData.global_total_cases = data.data.global_total_cases;
        covidData.global_new_cases = data.data.global_new_cases;
        covidData.global_recovered = data.data.global_recovered;
        covidData.global_deaths = data.data.global_deaths;
        covidData.global_new_deaths = data.data.global_new_deaths;
    }

    return (
      <View style={{ flex: 1 }}>
        <Header
          navigation={props.navigation}
          dateAndTime={covidData.update_date_time}
        />
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}
          showsVerticalScrollIndicator={false}
        >
          
          {/* <View style={{ borderWidth: 1, borderRadius: 5, marginBottom:10, marginTop:10 }}>
            <Picker
              selectedValue={selectedLanguage}
              style={{ height: 50, width: 320 }}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedLanguage(itemValue)
              }
              prompt="Select Country"
              mode="dropdown"
            >

              <Picker.Item label="Afganistan" value="AF" />
              <Picker.Item label="Sri Lanka" value="LK" />
              <Picker.Item label="India" value="IN" />
            </Picker>
          </View> */}

          <Text style={[styles.subTitle, { color: colors.subTitleColor }]}>
            Global
          </Text>

          <View style={styles.tileParent}>
            <View style={{ flexDirection: "row" }}>
              <Tile
                heading={"Total Confirmed Cases"}
                iconComponent={
                  <FontAwesome5 name="hospital-alt" size={30} color="white" />
                }
                count={covidData.global_total_cases}
                tileBackgroundColor={{ backgroundColor: "#fdb01a" }}
              />
              <Tile
                heading={"Daily New Cases"}
                iconComponent={
                  <FontAwesome5 name="ambulance" size={30} color="white" />
                }
                count={covidData.global_new_cases}
                tileBackgroundColor={{ backgroundColor: "#7052fb" }}
              />
            </View>

            <View style={{ flexDirection: "row" }}>
              <Tile
                heading={"Recovered"}
                iconComponent={
                  <FontAwesome5 name="running" size={30} color="white" />
                }
                count={covidData.global_recovered}
                tileBackgroundColor={{ backgroundColor: "#50cd8a" }}
              />
              <Tile
                heading={"Deaths"}
                iconComponent={
                  <FontAwesome5 name="bed" size={30} color="white" />
                }
                count={covidData.global_deaths}
                tileBackgroundColor={{ backgroundColor: "#f64a8f" }}
              />
            </View>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Tile
                heading={"New Deaths"}
                iconComponent={
                  <FontAwesome5 name="bed" size={30} color="white" />
                }
                count={covidData.global_new_deaths}
                tileBackgroundColor={{ backgroundColor: "#f57b25" }}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
}

const styles = StyleSheet.create({
    subTitle: {
        fontSize: RFPercentage(3),
        marginBottom: 10
    },

    tileParent: {
        width: wp('90%'),
        marginBottom: 10,
        padding: 10,
        backgroundColor: "#e0e0e0",
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        flexWrap: "wrap",
    }
});