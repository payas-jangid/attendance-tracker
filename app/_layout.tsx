import "@/global.css";
import { Tabs } from "expo-router";
import { SubjectProvider } from "@/context/SubjectContext";
export default function RootLayout() {
  return (
    <SubjectProvider>
      <Tabs
        screenOptions={{
          headerShown:false,
          tabBarActiveTintColor:"#f59e0b",
          tabBarStyle:{
            backgroundColor:"black",
            height:60,
            paddingBottom:8,
            borderRadius:10,
            marginRight:40,
            marginLeft:40,
            marginBottom:30,
            position:"absolute"
          }
        }}
      >
        <Tabs.Screen 
        name="index" 
        options={{title:"attendance"
        }}/>
        <Tabs.Screen name="TestScores" options={{title:"Scores"}}/>
      </Tabs>
    </SubjectProvider>
  )
}
