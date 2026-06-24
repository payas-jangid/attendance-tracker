// app/test-scores.tsx
import React from "react";
import {
  FlatList,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useSubjects } from "@/context/SubjectContext";
import { SubjectItem } from "@/constants/subjectData";
import "@/global.css";

export default function TestScoresScreen() {
  // 📻 Tune into the exact same context radio stream!
  const { subjects, updateScore } = useSubjects();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-amber-900 pt-6"
    >
      <View className="px-6 py-4">
        <Text className="text-3xl font-sans-bold text-amber-100">
          Test Scores
        </Text>
        <Text className="text-amber-200/70 mt-1 font-sans-semibold">
          Update your grades for each evaluation block
        </Text>
      </View>

      <FlatList
        data={subjects}
        keyExtractor={(item) => item.id}
        contentContainerClassName="pb-32"
        renderItem={({ item }: { item: SubjectItem }) => (
          <View className="bg-amber-50 mx-5 my-3 p-5 rounded-2xl shadow-sm">
            {/* Subject Title Header */}
            <Text className="text-xl font-sans-semibold text-amber-950 mb-4 border-b border-amber-200/50 pb-2">
              {item.name}
            </Text>

            {/* Grid Layout for the 4 Score Input Blocks */}
            <View className="flex-row flex-wrap justify-between gap-y-4">
              {/* Quiz 1 Input */}
              <View className="w-[47%]">
                <Text className="text-xs font-sans-semibold text-amber-800 mb-1">
                  Quiz 1 Marks
                </Text>
                <TextInput
                  value={item.scores.quiz1}
                  onChangeText={(text) => updateScore(item.id, "quiz1", text)}
                  placeholder="e.g. 15"
                  keyboardType="numeric"
                  className="bg-white p-3 rounded-xl border border-amber-200 text-amber-950 font-medium"
                />
              </View>

              {/* Quiz 2 Input */}
              <View className="w-[47%]">
                <Text className="text-xs font-sans-semibold text-amber-800 mb-1">
                  Quiz 2 Marks
                </Text>
                <TextInput
                  value={item.scores.quiz2}
                  onChangeText={(text) => updateScore(item.id, "quiz2", text)}
                  placeholder="e.g. 18"
                  keyboardType="numeric"
                  className="bg-white p-3 rounded-xl border border-amber-200 text-amber-950 font-medium"
                />
              </View>

              {/* Mid Sem Input */}
              <View className="w-[47%]">
                <Text className="text-xs font-sans-semibold text-amber-800 mb-1">
                  Mid Sem Marks
                </Text>
                <TextInput
                  value={item.scores.mid_sem}
                  onChangeText={(text) => updateScore(item.id, "mid_sem", text)}
                  placeholder="e.g. 45"
                  keyboardType="numeric"
                  className="bg-white p-3 rounded-xl border border-amber-200 text-amber-950 font-medium"
                />
              </View>

              {/* End Sem Input */}
              <View className="w-[47%]">
                <Text className="text-xs font-sans-semibold text-amber-800 mb-1">
                  End Sem Marks
                </Text>
                <TextInput
                  value={item.scores.end_sem}
                  onChangeText={(text) => updateScore(item.id, "end_sem", text)}
                  placeholder="e.g. 82"
                  keyboardType="numeric"
                  className="bg-white p-3 rounded-xl border border-amber-200 text-amber-950 font-medium"
                />
              </View>
              <View className="w-[47%]">
                <Text className="text-xs font-sans-semibold text-amber-800 mb-1">
                  total Marks
                </Text>
                <TextInput
                  value={String(
                    (parseInt(item.scores.end_sem) || 0) +
                      (parseInt(item.scores.mid_sem) || 0) +
                      (parseInt(item.scores.quiz1) || 0) +
                      (parseInt(item.scores.quiz2) || 0),
                  )}
                  onChangeText={(text) => updateScore(item.id, "end_sem", text)}
                  placeholder="e.g. 75"
                  keyboardType="numeric"
                  className="bg-white p-3 rounded-xl border border-amber-200 text-amber-950 font-medium"
                />
              </View>
            </View>
          </View>
        )}
      />
    </KeyboardAvoidingView>
  );
}
