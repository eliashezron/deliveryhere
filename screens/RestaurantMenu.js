import { StatusBar } from 'expo-status-bar';
import React from 'react'
import {     StyleSheet,
            SafeAreaView,
            View,
            Text,
            TouchableOpacity,
            Image,
            Animated } from 'react-native'
import { icons, COLORS, SIZES, FONTS } from '../constants'
import { isIphoneX } from 'react-native-iphone-x-helper';
import { FlatList } from 'react-native-gesture-handler';

const RestaurantMenu = ({route, navigation}) => {
  const scrollX = new Animated.Value(0);
  const [restaurant, setRestaurant] = React.useState(null);
  const [currentLocation, setCurrentLocation] = React.useState(null);
  const [orderItems, setOrderItems] = React.useState([]);
  React.useEffect(() => {
    let { item, currentLocation } = route.params;

    setRestaurant(item)
    setCurrentLocation(currentLocation)
})
function editOrder(action, menuId, price) {
  let orderList = orderItems.slice()
  let item = orderList.filter(a => a.menuId == menuId)

  if (action == "+") {
      if (item.length > 0) {
          let newQty = item[0].qty + 1
          item[0].qty = newQty
          item[0].total = item[0].qty * price
      } else {
          const newItem = {
              menuId: menuId,
              qty: 1,
              price: price,
              total: price
          }
          orderList.push(newItem)
      }

      setOrderItems(orderList)
  } else {
      if (item.length > 0) {
          if (item[0]?.qty > 0) {
              let newQty = item[0].qty - 1
              item[0].qty = newQty
              item[0].total = newQty * price
          }
      }

      setOrderItems(orderList)
  }
}

function getOrderQty(menuId) {
  let orderItem = orderItems.filter(a => a.menuId == menuId)

  if (orderItem.length > 0) {
      return orderItem[0].qty
  }

  return 0
}

function getBasketItemCount() {
  let itemCount = orderItems.reduce((a, b) => a + (b.qty || 0), 0)

  return itemCount
}

function sumOrder() {
  let total = orderItems.reduce((a, b) => a + (b.total || 0), 0)

  return total.toFixed(2)
}

function renderHeader() {
  return (
      <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
              style={{
                  width: 50,
                  paddingLeft: SIZES.padding * 2,
                  justifyContent: 'center'
              }}
              onPress={() => navigation.goBack()}
          >
              <Image
                  source={icons.back}
                  resizeMode="contain"
                  style={{
                      width: 30,
                      height: 30
                  }}
              />
          </TouchableOpacity>

          {/* Restaurant Name Section */}
          <View
              style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center'
              }}
          >
              <View
                  style={{
                      height: 50,
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingHorizontal: SIZES.padding * 3,
                      borderRadius: SIZES.radius,
                      backgroundColor: COLORS.lightGray3
                  }}
              >
                  <Text style={{ ...FONTS.h3 }}>{restaurant?.name}</Text>
              </View>
          </View>

          <TouchableOpacity
              style={{
                  width: 50,
                  paddingRight: SIZES.padding * 2,
                  justifyContent: 'center'
              }}
          >
              <Image
                  source={icons.list}
                  resizeMode="contain"
                  style={{
                      width: 30,
                      height: 30
                  }}
              />
          </TouchableOpacity>
      </View>
  )
}

function renderFoodInfo(){
    const renderItem = ({item}) => {
        return (
          <View style={styles.cartCard}>
            <Image source={item.photo} style={{height: 80, width: 80}} />
            <View
              style={{
                height: 100,
                marginLeft: 10,
                paddingVertical: 20,
                flex: 1,
              }}>
              <Text style={{fontWeight: 'bold', fontSize: 16}}>{item.name}</Text>
              <Text style={{fontSize: 13, color: COLORS.grey}}>
                {item.ingredients}
              </Text>
              <Text style={{fontSize: 17, fontWeight: 'bold'}}>${item.price}</Text>
            </View>
            <View style={{marginRight: 20, alignItems: 'center'}}>
              <Text style={{fontWeight: 'bold', fontSize: 18}}>3</Text>
              <View style={styles.actionBtn}>
                {/* <Icon name="remove" size={25} color={COLORS.white} />
                <Icon name="add" size={25} color={COLORS.white} /> */}
              </View>
            </View>
          </View>
        );
      };
  return(
    <Animated.ScrollView
    horizontal
    pagingEnabled
    scrollEventThrottle={16}
    snapToAlignment='center'
    showsHorizontalScrollIndicator={false}
    onScroll={Animated.event([
      { nativeEvent: { contentOffset: { x: scrollX } } }
  ], { useNativeDriver: false })}
  >
      {restaurant?.menu.map((item, index)=>(
        <View
          key={`menu-${index}`}
          style={{alignItems:'center'}}>
            <View style={{height: SIZES.height *0.325}}>
              {/* food image */}
              <Image
              source={item.photo}
              resizeMode='cover'
              style={{
                width:SIZES.width,
                height:'100%'
              }}/>
            </View>
            <View style={{marginVertical: 10}}>
                {renderDots()}
            </View>
            {/* Name & Description */}
            <View
              style={{
                  width: SIZES.width,
                  alignItems: 'center',
                  marginTop: 1,
                  paddingHorizontal: SIZES.padding 
              }}
          >
              <Text style={{ marginVertical: 2, textAlign: 'center', ...FONTS.h2 }}>{restaurant.name}</Text>
              <Text style={{ marginVertical: 2, textAlign: 'center', ...FONTS.h2 }}>MENU</Text>
          </View>
              <View>
                  <FlatList
                data={restaurant.menu}
                keyExtractor={item=>`${item.id}`}
                renderItem={renderItem}
                contentContainerStyle={{
                paddingHorizontal:SIZES.padding * 2,
                paddingBottom:30}}
                />
              </View>

          </View>
      ))}
    </Animated.ScrollView>
  )
}
function renderDots() {

  const dotPosition = Animated.divide(scrollX, SIZES.width)

  return (
      <View style={{ height: 20 }}>
          <View
              style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: SIZES.padding
              }}
          >
              {restaurant?.menu.map((item, index) => {

                  const opacity = dotPosition.interpolate({
                      inputRange: [index - 1, index, index + 1],
                      outputRange: [0.3, 1, 0.3],
                      extrapolate: "clamp"
                  })

                  const dotSize = dotPosition.interpolate({
                      inputRange: [index - 1, index, index + 1],
                      outputRange: [SIZES.base * 0.8, 10, SIZES.base * 0.8],
                      extrapolate: "clamp"
                  })

                  const dotColor = dotPosition.interpolate({
                      inputRange: [index - 1, index, index + 1],
                      outputRange: [COLORS.darkgray, COLORS.primary, COLORS.darkgray],
                      extrapolate: "clamp"
                  })

                  return (
                      <Animated.View
                          key={`dot-${index}`}
                          opacity={opacity}
                          style={{
                              borderRadius: SIZES.radius,
                              marginHorizontal: 6,
                              width: dotSize,
                              height: dotSize,
                              backgroundColor: dotColor
                          }}
                      />
                  )
              })}
          </View>
      </View>
  )
}
  

    return (
      <SafeAreaView styles={styles.container}>
      {renderHeader()}
      {renderFoodInfo()}
    </SafeAreaView>
    )
}

export default RestaurantMenu

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    cartCard: {
        height: 100,
        elevation: 15,
        borderRadius: 10,
        backgroundColor: COLORS.white,
        marginVertical: 10,
        marginHorizontal: 20,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
      },
      actionBtn: {
        width: 80,
        height: 30,
        backgroundColor: COLORS.primary,
        borderRadius: 30,
        paddingHorizontal: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
      },
  })


