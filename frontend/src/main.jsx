import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import './index.css'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import Home from './layouts/Home.jsx'
import Contact from './layouts/Contact.jsx'
import Login from './layouts/Login.jsx'
import Register from './layouts/Register.jsx'
import Profile from './layouts/Profile.jsx'
import store from './store.js'
import { Provider } from 'react-redux'
import PrivateRoute from './components/PrivateRoute.jsx'

const router2 = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<Home />}></Route>
      <Route path='/contacto' element={<Contact />}></Route>

    </Route>
  )
)


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        path: '/',
        element: <Home />
      },
      {
        path: '/contacto',
        element: <Contact />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      },
      {/*Private Routes*/
        path: '',
        element: <PrivateRoute />,
        children: [
          {
            path: '/profile',
            element: <Profile />
          },
        ]
      },

    ]
  },

]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router}></RouterProvider>
    </React.StrictMode>,
  </Provider>
)
