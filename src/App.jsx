import './App.css'
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { createContext, useReducer } from 'react';
import UserPage from './pages/UserPage';
import MainPage from './pages/MainPage';
import AllTicketsPage from './pages/AllTicketsPage';
import TicketRegister from './pages/TicketRegister';
import TicketSubmitted from './pages/TicketSubmitted';


(async function () {
  // we need less for antd global less variable and them customization.
  // note that cra dont support less by default so i needed to customize
  // webpack config.
  await import("./styles/app.less");
  // we need this because we all know that sass is way cooler than less.
  await import("./styles/app.scss");
})();

export const AuthContext = createContext();

const initialState = {
  isAuthenticated: !!localStorage.getItem("token"),
  user: JSON.parse(localStorage.getItem("user")),
  token: JSON.parse(localStorage.getItem("token")),
  role: JSON.parse(localStorage.getItem("role")),
  id: JSON.parse(localStorage.getItem("id"))
};

const reducer = (state, action) => {
  let token = null;
  switch (action.type) {
    case "LOGIN":
      token = "Token " + action.payload.accessToken;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", JSON.stringify(token));
      localStorage.setItem("role", JSON.stringify(action.payload.role));
      localStorage.setItem("role", JSON.stringify(action.payload.id));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: token,
        role: action.payload.role,
        id: action.payload.id
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
      };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      <AuthContext.Provider
        value={{
          state,
          dispatch,
        }}
      >
        <Routes>
          <Route path="/ticketSubmitted" element={<TicketSubmitted />} />
          <Route path="/support/:organizationName" element={<TicketRegister />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/user"
            element={
              state.isAuthenticated ? (
                <UserPage />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          >
            <Route index element={<AllTicketsPage />} />
          </Route>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </AuthContext.Provider>

    </>
  )
}

export default App