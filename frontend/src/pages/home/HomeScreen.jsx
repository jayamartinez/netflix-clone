import { useAuthStore } from '../../store/authUser.js';

const HomeScreen = () => {
  const { logout } = useAuthStore();

  return (
    <div>
      Home Screen

      <button onClick={logout}>logout</button>
    </div>
  )
}

export default HomeScreen
