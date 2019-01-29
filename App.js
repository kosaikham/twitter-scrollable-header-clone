import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Animated
} from "react-native";

const HEADER_MAX_HEIGHT = 120;
const HEADER_MIN_HEIGHT = 70;
const PROFILE_MAX_HEIGHT = 80;
const PROFILE_MIN_HEIGHT = 40;

export default class App extends React.Component {
  state = {
    scrollY: new Animated.Value(0)
  };
  render() {
    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: "clamp"
    });

    const profileHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      outputRange: [PROFILE_MAX_HEIGHT, PROFILE_MIN_HEIGHT],
      extrapolate: "clamp"
    });

    const profileMarginTop = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      outputRange: [
        HEADER_MAX_HEIGHT - PROFILE_MAX_HEIGHT / 2,
        HEADER_MAX_HEIGHT + 5
      ],
      extrapolate: "clamp"
    });

    const headerZIndex = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      outputRange: [0, 1],
      extrapolate: "clamp"
    });

    const headerTitleBottom = this.state.scrollY.interpolate({
      inputRange: [
        0,
        HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT,
        HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + 5 + PROFILE_MIN_HEIGHT,
        HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + 5 + PROFILE_MIN_HEIGHT + 26
      ],
      outputRange: [-20, -20, -20, 0],
      extrapolate: "clamp"
    });

    const headerTitleOpacity = this.state.scrollY.interpolate({
      inputRange: [
        0,
        HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT,
        HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + 5 + PROFILE_MIN_HEIGHT,
        HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + 5 + PROFILE_MIN_HEIGHT + 26
      ],
      outputRange: [0, 0, 0, 1],
      extrapolate: "clamp"
    });

    return (
      <View style={{ flex: 1 }}>
        {/* HEADER */}
        <Animated.View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: headerHeight,
            backgroundColor: "lightskyblue",
            zIndex: headerZIndex,
            alignItems: "center"
          }}
        >
          <Animated.View
            style={{
              position: "absolute",
              bottom: headerTitleBottom
            }}
          >
            <Animated.Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
                color: "white",
                opacity: headerTitleOpacity
              }}
            >
              Sai Lao Kham
            </Animated.Text>
          </Animated.View>
        </Animated.View>
        <ScrollView
          scrollEventThrottle={16}
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {
                  y: this.state.scrollY
                }
              }
            }
          ])}
          style={{ flex: 1 }}
        >
          <Animated.View
            style={{
              width: profileHeight,
              height: profileHeight,
              borderRadius: PROFILE_MAX_HEIGHT / 2,
              borderWidth: 3,
              borderColor: "white",
              marginTop: profileMarginTop,
              marginLeft: 10,
              overflow: "hidden"
            }}
          >
            <Image
              source={require("./assets/profile.jpg")}
              style={{
                flex: 1,
                width: null,
                height: null
              }}
            />
          </Animated.View>
          <View>
            <Text
              style={{
                fontSize: 26,
                fontWeight: "bold",
                paddingLeft: 10
              }}
            >
              Sai Lao Kham
            </Text>
          </View>
          <View style={{ height: 1000 }} />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
