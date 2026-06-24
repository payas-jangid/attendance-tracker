import { SubjectProvider } from "@/context/SubjectContext";
import "@/global.css";
import { useFonts } from "expo-font";
import { SplashScreen, Tabs } from "expo-router";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();
export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "sans-regular": require("../assets/fonts/PlusJakartaSans-Regular.ttf"),
    "sans-bold": require("../assets/fonts/PlusJakartaSans-Bold.ttf"),
    "sans-medium": require("../assets/fonts/PlusJakartaSans-Medium.ttf"),
    "sans-semibold": require("../assets/fonts/PlusJakartaSans-SemiBold.ttf"),
    "sans-extrabold": require("../assets/fonts/PlusJakartaSans-ExtraBold.ttf"),
    "sans-light": require("../assets/fonts/PlusJakartaSans-Light.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;
  return (
    <SubjectProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#f59e0b",
          tabBarStyle: {
            backgroundColor: "black",
            height: 60,
            paddingBottom: 8,
            borderRadius: 10,
            marginRight: 40,
            marginLeft: 40,
            marginBottom: 30,
            position: "absolute",
          },
        }}
      >
        <Tabs.Screen name="index" options={{ title: "attendance" }} />
        <Tabs.Screen name="TestScores" options={{ title: "Scores" }} />
      </Tabs>
    </SubjectProvider>
  );
}
