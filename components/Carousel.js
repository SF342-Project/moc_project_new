import React, { useState, useRef } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    Dimensions,
    TouchableWithoutFeedback,
    ImageBackground,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
const Slider = () => {
    const data = [
        {
            bg: require('../assets/images/product_image/bg.png'),
            animal_img: require('../assets/images/product_image/Pig.png'),
            animal_name: "สุกรชำแหละ เนื้อสันใน สันใน",
            Time: "ข้อมูล ณ วันที่ 12/04/2565",
            price: "200.00",
            bath: "บาท/กก.",
        },
        {
            bg: require('../assets/images/product_image/bg.png'),
            animal_img: require('../assets/images/product_image/Chicken.png'),
            animal_name: "ไก่สดชำแหละ เนื้อสันใน",
            Time: "ข้อมูล ณ วันที่ 12/04/2565",
            price: "92.50",
            bath: "บาท/กก.",
        },
        {
            bg: require('../assets/images/product_image/bg.png'),
            animal_img: require('../assets/images/product_image/BigCow.png'),
            animal_name: "เนื้อโคธรรมดา",
            Time: "ข้อมูล ณ วันที่ 12/04/2565",
            price: "243.50",
            bath: "บาท/กก.",
        }, {
            bg: require('../assets/images/product_image/bg.png'),
            animal_img: require('../assets/images/product_image/Shrimp.png'),
            animal_name: "กุ้งขาว(40 ตัว/กก)",
            Time: "ข้อมูล ณ วันที่ 12/04/2565",
            price: "255.00",
            bath: "บาท/กก.",
        },
    ];


    const { width, height } = Dimensions.get('window');
    const carouselRef = useRef(null);

    const RenderItem = ({ item }) => {
        return (
            <TouchableWithoutFeedback>
                <View>
                    <ImageBackground
                        source={item.bg}
                        style={{
                            padding: 10,
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                        }}
                        borderRadius={10}>
                        <View style={{ alignItems: "center" }}>
                            <Text style={{ color: '#ffffff', fontWeight: '600', fontSize: 15, fontFamily: "Prompt-Regular",marginBottom: 5 }}>
                                {item.animal_name}
                            </Text>
                            <Image
                                style={{ height: 70, width: 70, resizeMode: 'contain' }}
                                source={item.animal_img}
                            />
                            <View>
                                <Text
                                    style={{ color: '#ffffff', fontWeight: '600', fontSize: 10, fontFamily: "Prompt-Regular",marginTop: 8 }}>
                                    {item.Time}
                                </Text>
                            </View>
                        </View>
                        <View>
                            <Text
                                style={{
                                    color: '#FFCC00',
                                    fontFamily: "Prompt-Bold",
                                    fontSize: 25,
                                }}>
                                {item.price}
                            </Text>
                            <Text style={{ color: '#ffffff', fontWeight: '600', fontSize: 10, fontFamily: "Prompt-Regular" }}>
                                {item.bath}
                            </Text>
                        </View>
                    </ImageBackground>
                </View>
            </TouchableWithoutFeedback>
        );
    };
    return (
        <View style={styles.container}>
            <View>
                <Carousel
                    layout={'default'}
                    ref={carouselRef}
                    data={data}
                    renderItem={RenderItem}
                    sliderWidth={width}
                    itemWidth={width - 100}
                    swipeThreshold={100}
                    layoutCardOffset={-12}
                    inactiveSlideOpacity={0.4}
                    containerCustomStyle={{
                        overflow: 'visible',
                        marginVertical: 30,
                    }}
                    contentContainerCustomStyle={{
                        shadowColor: "#000000",
                        shadowOpacity: 20,
                        shadowRadius: 10,
                    }}
                />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
export default Slider;