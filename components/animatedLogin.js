import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput } from 'react-native';
import Svg, {Image, Circle, ClipPath} from 'react-native-svg';
import Animated, { Easing } from 'react-native-reanimated';
import { TapGestureHandler, State } from 'react-native-gesture-handler';
const { width, height } = Dimensions.get('window');
import {icons } from "../constants"
const {Value,event,block,cond,eq,set,Clock,startClock,stopClock,debug,timing,clockRunning,interpolate,concat,Extrapolate} = Animated;

function runTiming(clock, value, dest) {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0)
  };

  const config = {
    duration: 1000,
    toValue: new Value(0),
    easing: Easing.inOut(Easing.ease)
  };

  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.frameTime, 0),
      set(config.toValue, dest),
      startClock(clock)
    ]),
    timing(clock, state, config),
    cond(state.finished, debug('stop clock', stopClock(clock))),
    state.position
  ]);
}
class AnimatedLogin extends Component {
  constructor() {
    super();

    this.buttonOpacity = new Value(1);

    this.onStateChange = event([
      {
        nativeEvent: ({ state }) =>
          block([
            cond(
              eq(state, State.END),
              set(this.buttonOpacity, runTiming(new Clock(), 1, 0))
            )
          ])
      }
    ]);
    this.onCloseState = event([
      {
        nativeEvent: ({ state }) =>
          block([
            cond(
              eq(state, State.END),
              set(this.buttonOpacity, runTiming(new Clock(), 0,1))
            )
          ])
      }
    ]);

    this.buttonY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [100, 0],
      extrapolate: Extrapolate.CLAMP
    });

    this.bgY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [-height / 3 -50, 0],
      extrapolate: Extrapolate.CLAMP
    });
    this.textInputZindex = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [1, -1],
      extrapolate: Extrapolate.CLAMP
    });
    this.textInputY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [0, 100],
      extrapolate: Extrapolate.CLAMP
    });
    this.textInputOpacity = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [1, 0],
      extrapolate: Extrapolate.CLAMP
    });
    this.rotateCross = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [180, 360],
      extrapolate: Extrapolate.CLAMP
    });
    
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          justifyContent: 'flex-end'
        }}
      >
        <Animated.View
          style={{
            ...StyleSheet.absoluteFill,
            transform: [{ translateY: this.bgY }]
          }}
        >
          <Svg height={height} width={width}>
            <ClipPath id='clip'>
              <Circle r={height} cx={width/2}/>
            </ClipPath>
          <Image
            href={icons.bg}
            height={height} width={width}
            preserveAspectRatio='xMidYMid slice'
            clipPath='url(#clip)'
            // style={{ flex: 1, height: null, width: null }}
          />
          </Svg>
        </Animated.View>
        <View style={{ height: height / 3, justifyContent: 'center' }}>
          <TapGestureHandler onHandlerStateChange={this.onStateChange}>
            <Animated.View
              style={{
                ...styles.button,
                opacity: this.buttonOpacity,
                transform: [{ translateY: this.buttonY }]
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>SIGN IN</Text>
            </Animated.View>
          </TapGestureHandler>
          <Animated.View
            style={{
              ...styles.button,
              backgroundColor: '#2E71DC',
              opacity: this.buttonOpacity,
              transform: [{ translateY: this.buttonY }]
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>
              SIGN IN WITH FACEBOOK
            </Text>
          </Animated.View>
          <Animated.View style={{zIndex:this.textInputZindex,
              opacity:this.textInputOpacity,
              transform:[{translateY:this.textInputY}],
              height:height/3,
              ...StyleSheet.absoluteFill,
              top:null,
              justifyContent:'center'}}>
            <TapGestureHandler onHandlerStateChange={this.onCloseState}>
                <Animated.View style={styles.closeButton}>
                  <Animated.Text style={{
                    fontSize: 15,
                     transform:[{rotate:concat(this.rotateCross, 'deg')}]}}>
                    X
                  </Animated.Text>
                </Animated.View>
            </TapGestureHandler>
            <TextInput
            placeholder='EMAIL'
            placeholderTextColor='black'
            style={styles.textInput}/>
            <TextInput
            placeholder='PASSWORD'
            placeholderTextColor='black'
            style={styles.textInput}/>
            <Animated.View style={styles.button}>
              <Text style={{fontSize:20, fontWeight:'bold'}}>
                SIGN IN
              </Text>
            </Animated.View>
          </Animated.View>
          <Animated.View style={{zIndex:this.textInputZindexi,
              opacity:this.textInputOpacityi,
              transform:[{translateY:this.textInputYi}],
              height:height/3,
              ...StyleSheet.absoluteFill,
              top:null,
              justifyContent:'center'}}>
            <TapGestureHandler onHandlerStateChange={this.onCloseState}>
                <Animated.View style={styles.closeButton}>
                  <Animated.Text style={{
                    fontSize: 15,
                     transform:[{rotate:concat(this.rotateCross, 'deg')}]}}>
                    X
                  </Animated.Text>
                </Animated.View>
            </TapGestureHandler>
            <TextInput
            placeholder='USERNAME'
            placeholderTextColor='black'
            style={styles.textInput}/>
            <TextInput
            placeholder='EMAIL'
            placeholderTextColor='black'
            style={styles.textInput}/>
            <TextInput
            placeholder='PASSWORD'
            placeholderTextColor='black'
            style={styles.textInput}/>
            <TextInput
            placeholder='CONFIRM PASSWORD'
            placeholderTextColor='black'
            style={styles.textInput}/>
            <Animated.View style={styles.button}>
              <Text style={{fontSize:20, fontWeight:'bold'}}>
                SIGN IN
              </Text>
            </Animated.View>
          </Animated.View>
        </View>
      </View>
    );
  }
}
export default AnimatedLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    backgroundColor: 'white',
    height: 70,
    marginHorizontal: 20,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    shadowColor:'black',
    shadowOpacity:0.2,
    shadowOffset:{width:2, height:2}

  },
  closeButton:{
    height:40,
    width:40,
    backgroundColor:'white',
    borderRadius:20,
    backgroundColor:'white',
    alignItems:'center',
    justifyContent:'center',
    position:'absolute',
    top:-20,
    left:width/2 -20,
    shadowColor:'black',
    shadowOpacity:0.2,
    shadowOffset:{width:2, height:2}
  },
  textInput:{
    height:50,
    borderRadius:25,
    borderWidth:0.5,
    borderColor:'rgba(0, 0 , 0, 0.2)',
    marginHorizontal:20,
    marginVertical:5,
  }
});