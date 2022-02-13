import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Button,
  Dimensions,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import DatePicker from 'react-native-date-picker';
import useFetch from '../components/useFetch';
import AppLoader from './AppLoader';

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import {ScrollView} from 'react-native-gesture-handler';

export default function ComparePrice({route, navigation}) {
  const {name, id} = route.params;

  const API_URL =
    'https://dataapi.moc.go.th/gis-product-prices?product_id=' +
    id +
    '&from_date=2022-01-01&to_date=2023-01-28';

  const {data, loading} = useFetch(API_URL);

  const [chartData, setChartData] = useState({
    labels: ['January'],
    datasets: [
      {
        data: [Math.random() * 100],
      },
    ],
  });

  const [priceDateArr, setPriceDateArr] = useState([]);
  const [averagePrice, setAveragePrice] = useState([]);

  const chart = () => {
    let pDate = [];
    let mPrice = [];
    try {
      for (let index = 0; index < data.price_list.length; index++) {
        let price =
          (data.price_list[index].price_max +
            data.price_list[index].price_min) /
          2;
        if (price != 0) {
          pDate.push(data.price_list[index].date);
          mPrice.push(price);
        }
      }
      setPriceDateArr(pDate);
      setAveragePrice(mPrice);
    } catch (error) {}

    setChartData({
      labels: pDate,
      datasets: [
        {
          data: mPrice,
        },
      ],
      legend: ['Chart Price'],
    });
  };

  useEffect(() => {
    if (!loading) {
      chart();
    }
  }, [!loading]);


  const formatDate = date => {
    try {
      let year = date.split('T')[0].split('-')[0];
      let month = date.split('T')[0].split('-')[1];
      let day = date.split('T')[0].split('-')[2];
      return 'ราคาเฉลี่ยล่าสุด ณ วันที่ ' + day + '/' + month + '/' + year;
    } catch (error) {}
  };

  const diffPrice =
    averagePrice[averagePrice.length - 1] -
    averagePrice[averagePrice.length - 2];

  const percent = (diffPrice / averagePrice[averagePrice.length - 2]) * 100;

  const chartConfig = {
    backgroundColor: '#2752E6',
    backgroundGradientFrom: '#2752E6',
    backgroundGradientTo: '#2752E6',
    decimalPlaces: 1, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 50,
      margin: 5,
      padding: 20,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#0A214A',
    },
  };

  return (
    <>
      <SafeAreaView style={styles.Container}>
        <ScrollView>
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
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 0.8}}>
                <Text style={styles.HeaderContent}>{name}</Text>

                <View style={{flexDirection: 'row'}}>
                  {diffPrice < 0 ? (
                    <Text style={styles.CardPriceDown}>
                      {averagePrice[averagePrice.length - 1]}
                    </Text>
                  ) : null}

                  {diffPrice > 0 ? (
                    <Text style={styles.CardPriceUp}>
                      {averagePrice[averagePrice.length - 1]}
                    </Text>
                  ) : null}

                  <Text style={styles.CardUnit}>{data.unit}</Text>
                </View>
                <Text style={styles.CardDate}>
                  {formatDate(priceDateArr[priceDateArr.length - 1])}
                </Text>
              </View>

              {percent < 0 ? (
                <View style={{flex: 0.3}}>
                  <Text style={styles.PercentDown}>{percent.toFixed(2)}%</Text>
                </View>
              ) : null}

              {percent > 0 ? (
                <View style={{flex: 0.3}}>
                  <Text style={styles.PercentUp}>{percent.toFixed(2)}%</Text>
                </View>
              ) : null}
            </View>
          </View>

          <View style={{alignSelf: 'center'}}>
            {!loading ? (
              <LineChart
                data={chartData}
                width={Dimensions.get('window').width - 20} // from react-native
                height={200}
                yAxisSuffix="฿"
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={chartConfig}
                withDots={false}
                bezier
                withVerticalLabels={false}
                style={{borderRadius: 20, padding: 5}}
              />
            ) : null}
          </View>

          <View style={styles.Content}>
            <View
              style={styles.ChangeDay}>
              <TouchableOpacity style={styles.ChangeDayButton}>
                <Text style={styles.ChangeDayText}>7D</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.ChangeDayButton}>
                <Text style={styles.ChangeDayText}>1M</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.Content}>
            <Text style={styles.HeaderContent}>ตารางเปรียบเทียบราคาสินค้า</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
      {loading ? <AppLoader /> : null}
    </>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  ChangeDay: {
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: '#2752E6',
    borderRadius:15
  },
  ChangeDayButton: {
    padding: 5,
    margin: 5
  },
  ChangeDayText: {
    color: '#fff',
    fontFamily: 'Prompt-Bold',
    fontSize: 15,
    alignSelf: 'center',
  },
  PercentDown: {
    color: 'red',
    fontFamily: 'Prompt-Bold',
    fontSize: 30,
    alignSelf: 'center',
    top: 40,
  },
  PercentUp: {
    color: 'green',
    fontFamily: 'Prompt-Bold',
    fontSize: 30,
    alignSelf: 'center',
    top: 40,
  },
  CardDate: {
    fontFamily: 'Prompt-Regular',
    fontSize: 12,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#000',
  },
  CardUnit: {
    fontFamily: 'Prompt-Regular',
    fontSize: 15,
    top: 35,
    left: 5,
    textAlign: 'center',
    color: '#000',
  },
  CardPriceUp: {
    fontFamily: 'Prompt-Bold',
    fontSize: 50,
    padding: 0,
    letterSpacing: 0,
    textAlign: 'left',
    color: 'green',
  },
  CardPriceDown: {
    fontFamily: 'Prompt-Bold',
    fontSize: 50,
    padding: 0,
    letterSpacing: 0,
    textAlign: 'left',
    color: 'red',
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
