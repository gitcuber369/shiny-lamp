import {
  View,
  Text,
  Image,
  Dimensions,
  StatusBar,
  StyleSheet,
  Pressable,
} from "react-native";
import { Marquee } from "@animatereactnative/marquee";
import React, { useState } from "react";
import { images } from "../data";
import Animated, {
  FadeIn,
  FadeInUp,
  FadeOut,
  runOnJS,
  useAnimatedReaction,
  Easing,
  useSharedValue,
} from "react-native-reanimated";
import { Stagger } from "@animatereactnative/stagger";

const { width } = Dimensions.get("window");
const _itemWidth = width * 0.62;
const _itemHeight = _itemWidth * 1.67;
const _spacing = 16;
const _itemSize = _itemWidth + _spacing;

function Item({ image, index }: { image: string; index: number }) {
  return (
    <View
      style={{
        width: _itemWidth,
        height: _itemHeight,
      }}
    >
      <Image source={{ uri: image }} style={{ flex: 1, borderRadius: 16 }} />
    </View>
  );
}

const AppleInvitest = () => {
  const offset = useSharedValue(0);
  const [activeIndex, setActiveIndex] = useState(1);

  useAnimatedReaction(
    () => {
      const floatIndex =
        ((offset.value + width / 2) / _itemSize) % images.length;
      return Math.abs(Math.floor(floatIndex));
    },
    (value) => {
      runOnJS(setActiveIndex)(value);
    }
  );

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
      }}
    >
      <View
        style={[
          StyleSheet.absoluteFillObject,
          {
            opacity: 0.9,
          },
        ]}
      >
        <Animated.Image
          key={`image-${activeIndex}`}
          source={{ uri: images[activeIndex] }}
          style={{ flex: 1 }}
          blurRadius={20}
          entering={FadeIn.duration(1000)}
          exiting={FadeOut.duration(1000)}
        />
      </View>
      <StatusBar barStyle={"light-content"} hidden={true} />
      <Marquee spacing={_spacing} position={offset}>
        <Animated.View
          style={{ flexDirection: "row", gap: _spacing }}
          entering={FadeInUp.delay(1000)
            .duration(1000)
            .easing(Easing.elastic(0.9))
            .withInitialValues({
              transform: [{ translateY: -_itemHeight / 2 }],
            })}
        >
          {images.map((image, index) => (
            <Item key={`image-${index}`} image={image} index={index} />
          ))}
        </Animated.View>
      </Marquee>
      <Stagger
        duration={1000}
        enabled={true}
        initialEnteringDelay={2000}
        stagger={100}
        style={{ alignItems: "center", justifyContent: "center", gap: 16 }}
      >
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: 26,
            alignItems: "center",
            marginTop: 16,
            justifyContent: "center",
          }}
        >
          Welcome to the Apple Invites
        </Text>

        <Text
          style={{
            color: "white",
            fontSize: 16,
            opacity: 0.8,
            fontWeight: "500",
            textAlign: "center",
            paddingHorizontal: 10,
            marginTop: 8,
            lineHeight: 22,
          }}
        >
          Join our community for special member events, preview new releases
          before they launch, and enjoy curated experiences designed around your
          interests.
        </Text>
      </Stagger>
      <Stagger style={{ alignItems: "center", justifyContent: "center" , flexDirection: "row", gap: 16}}>
        <View style={{ marginTop: 20 }}>
            <Animated.View
            entering={FadeInUp.delay(3000).duration(1000)}
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              paddingVertical: 16,
              paddingHorizontal: 40,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              borderRadius: 30,
              marginTop: 10,
              borderWidth: 1,
              borderColor: "rgba(255, 255, 255, 0.3)",
              gap: 8,
              maxWidth: 500,
            }}
            android_ripple={{ color: "rgba(255, 255, 255, 0.1)" }}
            >
            <Text
              style={{
              color: "white",
              fontSize: 16,
              fontWeight: "600",
              textAlign: "center",
              }}
            >
              Join Now
            </Text>

            <Text
              style={{
              color: "white",
              fontSize: 18,
              fontWeight: "300",
              }}
            >
              →
            </Text>
            </Animated.View>
        </View>
      </Stagger>
    </View>
  );
};

export default AppleInvitest;
