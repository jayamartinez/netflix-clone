import AuthScreen from "./AuthScreen.jsx";
import HomeScreen from "./HomeScreen.jsx";
import { useAuthStore } from "../../store/authUser.js";

const HomePage = () => {
  const { user } = useAuthStore();

  return (
    <>
      {user ? <HomeScreen /> : <AuthScreen />}
    </>
  )
}

export default HomePage
