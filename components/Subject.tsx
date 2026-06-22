import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import clsx from "clsx";
import '@/global.css';

type SubjectProps = {
  name: string;
  isExpanded: boolean;
  present: number;
  absent: number;
  onPressPresent: () => void;
  onPressAbsent: () => void;
};
const Subject = ({ name, isExpanded,present,absent,onPressPresent,onPressAbsent }: SubjectProps) => {
  const totalClasses = present + absent;
  const attendancePercentage = totalClasses === 0 ? 100 : Math.round((present/totalClasses) * 100);
  const isDangerZone = attendancePercentage < 75;
  return (
    <View className="p-4 bg-amber-50 rounded-xl shadow-sm w-full">
      <View className="flex-row justify-between items-center">
        <Text className="text-xl font-bold text-amber-900">{name}</Text>
        <View
          className={clsx(
            "px-3 py-1 rounded-full",
            isDangerZone ? "bg-red-100" : "bg-green-100",
          )}
        >
          <Text
            className={clsx(
              "font-semibold text-sm",
              isDangerZone ? "text-red-700" : "text-green-700",
            )}
          >
            {attendancePercentage}%
          </Text>
        </View>
      </View>
      {isExpanded && (
        <View className="mt-4 pt-4 border-t border-amber-200/50">
          <View className="flex-row justify-between m-4">
            <Text className="present">Present : {present}</Text>
            <Text className="absent">Absent : {absent}</Text>
          </View>

          <View className="flex-row justify-between m-4">
            <Pressable onPress={onPressPresent} className="present">
              <Text>Present +1</Text>
            </Pressable>
            <Pressable onPress={onPressAbsent} className="absent">
              <Text>Absent +1</Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
};

export default Subject;
