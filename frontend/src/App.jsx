import { Routes, Route, Navigate} from "react-router-dom"
import { HistoryPage, HomePage, LoginPage, NotFoundPage, SearchPage, SignupPage, WatchPage } from "./pages"
import { Footer } from "./components"
import { Toaster } from "react-hot-toast"
import { useAuthStore } from "./store/authUser.js"
import { useEffect } from "react"
import { Loader } from "lucide-react"

function App() {
  const { user, isCheckingAuth, authCheck } = useAuthStore();
  useEffect(() => {
    authCheck();
  }, [authCheck]);

  if(isCheckingAuth) {
    return (
      <div className="h-screen">
          <div className="flex justify-center items-center bg-black h-full">
            <Loader className="animate-spin text-red-600 size-10" />
          </div>
      </div>
    )
  }
  
  return (
    
    <>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/login' element={!user ? <LoginPage/> : <Navigate to={"/"}/>}/>
      <Route path='/signup' element={!user ? <SignupPage/> : <Navigate to={"/"} />}/>
      <Route path='/watch/:id' element={user ? <WatchPage/> : <Navigate to={"/login"} />}/>
      <Route path='/search' element={user ? <SearchPage/> : <Navigate to={"/login"} />}/>
      <Route path='/history' element={user ? <HistoryPage/> : <Navigate to={"/login"} />}/>
      <Route path='/*' element={<NotFoundPage />}/>
    </Routes>
    <Footer />

    <Toaster />
    </>
  )
}

export default App
