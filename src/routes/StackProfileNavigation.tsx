import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Telas
import { ProfileDetails } from "@/screen/Profile/ProfileDetails"
import { EditProfile } from "@/screen/Profile/EditProfile"
import { EditProfileImage } from "@/screen/Profile/EditProfileImage"
import { EditPasswordProfile } from "@/screen/Profile/EditPasswordProfile"



const Stack = createNativeStackNavigator()


const StackProfileNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name="profileDetails" component={ProfileDetails} />
      <Stack.Screen name="editProfile" component={EditProfile} />
      <Stack.Screen name="editProfileImage" component={EditProfileImage} />
      <Stack.Screen name="editPasswordProfile" component={EditPasswordProfile} />


    </Stack.Navigator>
  )
}

export { StackProfileNavigation };
