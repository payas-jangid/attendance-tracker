import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import clsx from "clsx";
import '@/global.css'
type SubjectProps = {
  name: string;
  isExpanded: boolean;
};
const Subject = ({ name, isExpanded }: SubjectProps) => {

  return (
    <>
      <Text className="bold">{name}</Text>
      {isExpanded && (
        <View className="items-center mt-2 animate-fade-in">
          <Text>Attendance: 85%</Text>
          <Text>Tap to collapse</Text>
        </View>
      )}
    </>
  );
};

export default Subject;
