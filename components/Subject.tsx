import React from "react";
import { Pressable, Text, View } from "react-native";
import '@/global.css'
type SubjectProps = {
  name: string;
};
const Subject = ({ name }: SubjectProps) => {
  return (
    <Pressable className="subject-box">
      <Text className="color-blue-700">{name}</Text>
    </Pressable>
  );
};

export default Subject;
