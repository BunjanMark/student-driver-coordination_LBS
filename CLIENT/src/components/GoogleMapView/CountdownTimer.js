import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";

const CountdownTimer = () => {
  const [seconds, setSeconds] = useState(10);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Decrease the seconds by 1
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    // Cleanup the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array to run the effect only once

  return (
    <View>
      <Text>Countdown: {seconds} seconds</Text>
    </View>
  );
};

export default CountdownTimer;
