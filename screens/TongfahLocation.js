import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity
  
} from 'react-native';
import {Component} from 'react/cjs/react.production.min';
import {FlatList} from 'react-native-gesture-handler';
import data from '../assets/data/bangkok.json';

export default class TongfahLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
        dataSource: data,
        filterData: data,
    };
  }

  onChangeText(text) {
    this.setState({
        filterData: this.state.dataSource.filter(i=>
            i.Name.includes(text) || i.Sub.includes(text) || i.District.includes(text))
    });
  }

  render() {
    return (
      <SafeAreaView style={{backgroundColor:'#fff'}}>
        <StatusBar barStyle="light-content" backgroundColor="#091D42" />
        <TouchableOpacity onPress={() => {
                    this.props.navigation.goBack();
                  }}>
        <Text>
          back
        </Text>
      </TouchableOpacity>
        <View style={styles.header}>
          <TextInput
            placeholder="ชื่อร้าน, เขต, จังหวัด, ..."
            placeholderTextColor="gray"
            onChangeText={text => this.onChangeText(text)}
            style={styles.input}
          />
        </View>
        <FlatList
          data={this.state.filterData}
          renderItem={({item, index}) => {
            return (
              <View style={styles.Flatstyle}>
                <Text
                  style={{fontSize: 15, fontWeight: 'bold', marginBottom: 5}}>
                  {item.Name}
                </Text>
                <Text>{item.Address}</Text>
                <Text>{item.District}</Text>
                <Text>{item.Sub}</Text>
                <Text>{item.Province}</Text>
                <Text>{item.Tel}</Text>
              </View>
            );
            
          }}
          ListEmptyComponent={()=>
            <View style={{
                alignItems:'center',
                justifyContent: 'center'
            }}>
                <Text>ไม่มีข้อมูล</Text>

            </View>
        }
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Flatstyle: {
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
  },

  header: {
    height: 80,
    width: '100%',
    backgroundColor: '#091D42',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 5,
    paddingLeft: 10,
  },
});
