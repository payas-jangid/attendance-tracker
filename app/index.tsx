import Subject from "@/components/Subject";
import "@/global.css";
import clsx from "clsx";
import { useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  Text,
  View,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SubjectList } from "@/constants/subjectData";
import { useSubjects } from "@/context/SubjectContext";
const STORAGE_KEY = "@my_tracked_subjects";
export default function App() {
  const {subjects, addSubject, updateAttendance, deleteSubject} = useSubjects();

  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newSubjectName, setNewSubjectName] = useState("");

  const toggleExpand = (id: string) => {
    // If it's already open, close it. Otherwise, open the new one.
    setExpandedId(expandedId === id ? null : id);
  };
  
  return (
    <>
      <View className="flex-1 bg-amber-700 pt-6">
        <Pressable
          onPress={() => setIsModalVisible(true)}
          className="bg-amber-400 rounded-2xl p-3 m-8"
        >
          <Text className="text-3xl self-center-safe font-sans-bold">Create</Text>
        </Pressable>
        <FlatList
          data={subjects}
          keyExtractor={(item) => item.id}
          numColumns={1}
          contentContainerClassName="pb-32"
          renderItem={({ item }) => {
            const isExpanded = expandedId === item.id;
            return (
              <Pressable
                onPress={() => toggleExpand(item.id)}
                className={clsx(
                  "mx-5 my-2",
                  isExpanded ? "expanded-view" : "subject-box",
                )}
              >
                <Subject
                  name={item.name}
                  isExpanded={isExpanded}
                  present={item.present}
                  absent={item.absent}
                  onPressPresent={() => updateAttendance(item.id, "present")}
                  onPressAbsent={() => updateAttendance(item.id, "absent")}
                  onPressDelete={() => deleteSubject(item.id)}
                />
              </Pressable>
            );
          }}
        />
      </View>
      <Modal animationType="slide" transparent={true} visible={isModalVisible}>
        <View className="flex-1 bg-black/50 justify-end">
          <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <View className="modal-view">
              <Text className="text-2xl font-bold mb-4">Add New Subject</Text>
              <TextInput
                value={newSubjectName}
                onChangeText={(text) => setNewSubjectName(text)}
                placeholder="Enter subject name..."
                className="bg-gray-100 p-4 rounded-xl"
              ></TextInput>
              <View className="flex-row justify-between mt-5">
                <Pressable
                  onPress={() => {
                    (setNewSubjectName(""), setIsModalVisible(false));
                  }}
                >
                  <Text>Cancel</Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    if (newSubjectName.trim() === "") return;

                    addSubject(newSubjectName.trim());
                    setNewSubjectName("");
                    setIsModalVisible(false);
                  }}
                >
                  <Text>Add</Text>
                </Pressable>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>
      
    </>
  );
}
