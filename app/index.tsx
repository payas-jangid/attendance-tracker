import Subject from "@/components/Subject";
import "@/global.css";
import { FlatList, Pressable, Text, View } from "react-native";

export default function App() {
  return (
    <>
      <View className="flex-1 bg-amber-700 pt-6">
        
          <Pressable className="bg-amber-400 rounded-2xl p-3 m-8">
            <Text className="text-3xl self-center-safe">Create</Text>
          </Pressable>
        
        <View className="flex flex-wrap flex-row m-3">
          <Subject name="maths-1" />
          <Subject name="maths-2" />
          <Subject name="maths-3" />
          <Subject name="maths-4" />
          <Subject name="maths-5" />
          <Subject name="maths-3" />
          <Subject name="maths-3" />
          <Subject name="maths-3" />
          <Subject name="maths-3" />
        </View>
      </View>
    </>
  );
}
