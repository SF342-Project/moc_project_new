import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Button,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import DatePicker from 'react-native-date-picker';

export default function ComparePrice({route, navigation}) {
  const {name} = route.params;
  const [startDate, setStartDate] = useState(new Date());
  const [textStart, setTextStart] = useState("");
  const [openStart, setOpenStart] = useState(false);

  const [endDate, setEndDate] = useState(new Date());
  const [textEnd, setTextEnd] = useState("");
  const [openEnd, setOpenEnd] = useState(false);

  const ConfirmDateStart = date => {
    setOpenStart(false);
    let tempDate = new Date(date);
    let day = tempDate.getDate().toLocaleString();
    let month = (tempDate.getMonth() + 1).toLocaleString();
    if(day.length == 1) {
        day = "0" + day
    }
    if(month.length == 1) {
        month = "0" + month
    }
    let formatDate = tempDate.getFullYear()+"-"+(month)+"-"+day;
    setTextStart(formatDate);
    setStartDate(date);
  }

  const ConfirmDateEnd = date => {
    setOpenEnd(false);
    let tempDate = new Date(date);
    let day = tempDate.getDate().toLocaleString();
    let month = (tempDate.getMonth() + 1).toLocaleString();
    if(day.length == 1) {
        day = "0" + day
    }
    if(month.length == 1) {
        month = "0" + month
    }
    let formatDate = tempDate.getFullYear()+"-"+(month)+"-"+day;
    setTextEnd(formatDate);
    setEndDate(date);
  }
  return (
    <SafeAreaView style={styles.Container}>
      {/* Header */}
      <View style={styles.Header}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Entypo
              name="chevron-thin-left"
              size={30}
              style={styles.Image}
              color={'#fff'}></Entypo>
          </TouchableOpacity>
          <Text style={styles.HeaderText}>เปรียบเทียบราคาสินค้า</Text>
        </View>
      </View>

      {/* Content */}
      <View style={styles.Content}>
        <Text style={styles.HeaderContent}>{name}</Text>
        <Button title="Open" onPress={() => setOpenStart(true)} />
        <Button title="Open" onPress={() => setOpenEnd(true)} />
        <DatePicker
          modal
          open={openStart}
          date={startDate}
          mode={"date"}
          onConfirm={date => ConfirmDateStart(date)}
          onCancel={() => {
            setOpenStart(false);
          }}
        />
        <DatePicker
          modal
          open={openEnd}
          date={endDate}
          mode={"date"}
          onConfirm={date => ConfirmDateEnd(date)}
          onCancel={() => {
            setOpenEnd(false);
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  Content: {
    padding: 5,
    margin: 5,
  },
  HeaderContent: {
    fontFamily: 'Prompt-Bold',
    fontSize: 20,
    color: '#000',
  },
  Header: {
    marginBottom: 10,
    backgroundColor: '#0A214A',
    shadowColor: '#000000',
    shadowOpacity: 5,
    shadowRadius: 5,
    elevation: 5,
  },
  Image: {
    marginTop: 15,
    marginLeft: 5,
    width: 30,
    height: 30,
  },
  HeaderText: {
    textShadowColor: '#000000',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 10,
    marginTop: 15,
    marginLeft: 15,
    fontFamily: 'Prompt-Bold',
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: 10,
  },
});
