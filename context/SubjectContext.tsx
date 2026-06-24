import React, { useContext, createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SubjectList, SubjectItem } from "@/constants/subjectData";

const STORAGE_KEY = "@my_tracked_subjects";

type SubjectContextType = {
  subjects: SubjectList;
  addSubject: (name: string) => void;
  updateAttendance: (id: string, type: "present" | "absent") => void;
  updateScore: (
    id: string,
    examType: "quiz1" | "quiz2" | "mid_sem" | "end_sem",
    value: string,
  ) => void;
  deleteSubject: (id: string) => void;
};

const SubjectContext = createContext<SubjectContextType | undefined>(undefined);

export function SubjectProvider({ children }: { children: React.ReactNode }) {
  const [subjects, setSubjects] = useState<SubjectList>([]);

  // Automatic saving pipeline
  const saveSubjectsToStorage = async (currentSubjects: SubjectList) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(currentSubjects));
    } catch (e) {
      console.log("error saving subjects: ", e);
    }
  };

  // Automatic loading on app startup
  useEffect(() => {
    const loadSubjects = async () => {
      try {
        const savedString = await AsyncStorage.getItem(STORAGE_KEY);
        if (savedString != null) {
          setSubjects(JSON.parse(savedString));
        }
      } catch (e) {
        console.log("error loading subjects", e);
      }
    };
    loadSubjects();
  }, []);

  // Action: Add Subject (Now includes the blank score templates automatically)
  const addSubject = (name: string) => {
    const newSubject: SubjectItem = {
      id: Date.now().toString(),
      name: name,
      present: 0,
      absent: 0,
      scores: { quiz1: "", quiz2: "", mid_sem: "", end_sem: "" },
    };
    const updated = [...subjects, newSubject];
    setSubjects(updated);
    saveSubjectsToStorage(updated);
  };


  const deleteSubject = (id : string) => {
    const updated = subjects.filter((sub) => sub.id !== id)

    setSubjects(updated);
    saveSubjectsToStorage(updated);
  }
  // Action: Increment Attendance counters
  const updateAttendance = (id: string, type: "present" | "absent") => {
    const updated = subjects.map((sub) => {
      if (sub.id === id) {
        return { ...sub, [type]: sub[type] + 1 };
      }
      return sub;
    });
    setSubjects(updated);
    saveSubjectsToStorage(updated);
  };

  // Action: Update a specific test score slot dynamically
  const updateScore = (
    id: string,
    examType: "quiz1" | "quiz2" | "mid_sem" | "end_sem",
    value: string,
  ) => {
    const updated = subjects.map((sub) => {
      if (sub.id === id) {
        return {
          ...sub,
          scores: {
            ...sub.scores,
            [examType]: value, // 👈 Updates only the target exam field
          },
        };
      }
      return sub;
    });
    setSubjects(updated);
    saveSubjectsToStorage(updated);
  };

  return (
    <SubjectContext.Provider
      value={{ subjects, addSubject, updateAttendance, updateScore, deleteSubject }}
    >
      {children}
    </SubjectContext.Provider>
  );
}

// 4. Custom Hook for easy screen consumption
export function useSubjects() {
  const context = useContext(SubjectContext);
  if (!context) {
    throw new Error("useSubjects must be used inside a SubjectProvider");
  }
  return context;
}