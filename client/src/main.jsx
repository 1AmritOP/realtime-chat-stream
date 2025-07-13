import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router"
import Login from './Page/Login.jsx'
import LandingPage from './Page/LandingPage.jsx'
import CreateRoom from './Page/CreateRoom.jsx'
import { store } from './app/Store.js'
import { Provider } from 'react-redux'
import Profile from './Page/Profile.jsx'

const router=createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<App/>} >
        <Route path='' element={<LandingPage/>} />
        <Route path='login' element={<Login/>} />
        <Route path='room' element={<CreateRoom/>} />
        <Route path='profile' element={<Profile/>} />
        <Route path='room/:roomId' element={<CreateRoom/>} />

      </Route>
    )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
