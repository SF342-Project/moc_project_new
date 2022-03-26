import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Button,
  Dimensions,
  TouchableHighlight,
  Image,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import DatePicker from 'react-native-date-picker';
import useFetch from '../components/useFetch';
import AppLoader from './AppLoader';

import {LineChart} from 'react-native-chart-kit';
import {ScrollView} from 'react-native-gesture-handler';

import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell,
} from 'react-native-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentPrice, getPriceNow } from '../redux/users/PriceSlice';

export default function ComparePrice({route, navigation}) {
  const {name, id} = route.params;

  const currentPriceProduct = useSelector(getCurrentPrice);
  const currentPrice = (currentPriceProduct.price_min + currentPriceProduct.price_max) / 2
  console.log("Current",currentPrice)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPriceNow(id))
  }, [dispatch])
  
  const getDateToday = () => {
    let day = new Date().getDate().toLocaleString();
    let month = (new Date().getMonth() + 1).toLocaleString();
    if (day.length == 1) {
      day = '0' + day;
    }
    if (month.length == 1) {
      month = '0' + month;
    }
    let formatDateText = new Date().getFullYear() + '-' + month + '-' + day;

    return formatDateText;
  };

  const [textStart, setTextStart] = useState('2022-01-01');
  const [textEnd, setTextEnd] = useState(getDateToday);

  const API_URL =
    'https://dataapi.moc.go.th/gis-product-prices?product_id=' +
    id +
    '&from_date=' +
    textStart +
    '&to_date=' +
    textEnd;

  const {data, loading, refetch} = useFetch(API_URL);

  const [startDate, setStartDate] = useState(new Date());
  const [openStart, setOpenStart] = useState(false);

  const [endDate, setEndDate] = useState(new Date());
  const [openEnd, setOpenEnd] = useState(false);

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

  const formatDate = date => {
    let tempDate = new Date(date);
    let day = tempDate.getDate().toLocaleString();
    let month = (tempDate.getMonth() + 1).toLocaleString();
    if (day.length == 1) {
      day = '0' + day;
    }
    if (month.length == 1) {
      month = '0' + month;
    }
    return tempDate.getFullYear() + '-' + month + '-' + day;
  };

  const ConfirmDateStart = date => {
    setOpenStart(false);
    setTextStart(formatDate(date));
    setStartDate(date);
  };

  const ConfirmDateEnd = date => {
    setOpenEnd(false);
    setTextEnd(formatDate(date));
    setEndDate(date);
  };

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
    if (loading || !loading) {
      chart();
    }
  }, [data]);

  const formatDateText = date => {
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
                      {currentPrice}
                    </Text>
                  ) : null}

                  {diffPrice >= 0 ? (
                    <Text style={styles.CardPriceUp}>
                      {currentPrice}
                    </Text>
                  ) : null}

                  <Text style={styles.CardUnit}>{data.unit}</Text>
                </View>
                <Text style={styles.CardDate}>
                  {formatDateText(priceDateArr[priceDateArr.length - 1])}
                </Text>
              </View>

              {percent < 0 ? (
                <View style={{flex: 0.3}}>
                  <Text style={styles.PercentDown}>{percent.toFixed(2)}%</Text>
                </View>
              ) : null}

              {percent >= 0 ? (
                <View style={{flex: 0.3}}>
                  <Text style={styles.PercentUp}>{percent.toFixed(2)}%</Text>
                </View>
              ) : null}
            </View>
          </View>

          <View style={{alignSelf: 'center',marginTop:20,marginBottom: 20}}>
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
                withInnerLines={false}
                withOuterLines={false}
              />
            ) : null}
          </View>

          <View style={styles.Content}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.LabelDate}>ตั้งแต่วันที่</Text>
              <View style={{alignItems: 'center', paddingBottom: 20}}>
                <View style={styles.input_f}>
                  <TouchableOpacity
                    onPress={() => setOpenStart(true)}
                    style={{borderRadius: 15}}>
                    <FontAwesome5 name="calendar" size={17}></FontAwesome5>
                  </TouchableOpacity>
                  <DatePicker
                    modal
                    open={openStart}
                    date={startDate}
                    mode={'date'}
                    onConfirm={date => ConfirmDateStart(date)}
                    onCancel={() => {
                      setOpenStart(false);
                    }}
                  />
                  <Text style={styles.style_text_date}>{textStart}</Text>
                </View>
              </View>
            </View>

            <View style={{flexDirection: 'row'}}>
              <Text style={styles.LabelDate}>ถึงวันที่</Text>
              <View
                style={{
                  alignItems: 'center',
                  paddingBottom: 20,
                  paddingLeft: 20,
                }}>
                <View style={styles.input_f}>
                  <TouchableOpacity
                    onPress={() => setOpenEnd(true)}
                    style={{borderRadius: 15}}>
                    <FontAwesome5 name="calendar" size={17}></FontAwesome5>
                  </TouchableOpacity>
                  <DatePicker
                    modal
                    open={openEnd}
                    date={endDate}
                    mode={'date'}
                    onConfirm={date => ConfirmDateEnd(date)}
                    onCancel={() => {
                      setOpenEnd(false);
                    }}
                  />
                  <Text style={styles.style_text_date}>{textEnd}</Text>
                </View>
              </View>
            </View>


              {/* {!loading && averagePrice.length > 0 ? (
                <View style={styles.containerTable}>
                  <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                    <Row
                      data={averagePrice}
                      style={styles.head}
                      textStyle={styles.text}
                    />
                    <Row
                      data={priceDateArr}
                      style={styles.head}
                      textStyle={styles.text}
                    />
                  </Table>
                </View>
              ) : null} */}
 
          </View>
        </ScrollView>
      </SafeAreaView>
      {loading ? <AppLoader /> : null}
    </>
  );
}

const styles = StyleSheet.create({
  containerTable: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: '#fff',
  },
  head: {height: 50, backgroundColor: '#f1f8ff'},
  text: {fontSize: 10},
  Container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  LabelDate: {
    fontFamily: 'Prompt-Bold',
    margin: 10,
    fontSize: 15,
    color: '#000',
  },
  style_text_date: {
    fontSize: 12,
    alignItems: 'center',
    fontFamily: 'Prompt-Bold',
    paddingLeft: 5,
    color: '#000',
  },
  input_f: {
    width: '100%',
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
    shadowColor: '#000000',
    shadowOpacity: 5,
    shadowRadius: 5,
    elevation: 2,
    backgroundColor: '#e5f1f1',
    borderRadius: 50,
    flexDirection: 'row',
  },
  ChangeDay: {
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: '#2752E6',
    borderRadius: 15,
  },
  ChangeDayButton: {
    padding: 5,
    margin: 5,
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
