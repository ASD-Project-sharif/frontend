import './App.css'
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { createContext, useReducer } from 'react';
import OrganizationPanel from './pages/OrganizationPanel';
import MainPage from './pages/MainPage';
import AllTicketsPage from './pages/AllTicketsPage';
import UserPanel from './pages/UserPanel';
import TicketRegister from './pages/TicketRegister';
import TicketSubmitted from './pages/TicketSubmitted';
import TicketPage from './pages/TicketPage';


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
      token = "Token " + action.payload.token;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", JSON.stringify(token));
      localStorage.setItem("role", JSON.stringify(action.payload.role));
      localStorage.setItem("id", JSON.stringify(action.payload.id));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        id: action.payload.id,
        role: action.payload.role,
        token: token,
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

  const getPanel = () => {
    if (!state.isAuthenticated) {
      return (
        <Route
          path="/user"
          element={
            state.isAuthenticated ? (
              <OrganizationPanel />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
      )
    }
    console.log(state.role)
    if (state.role === "ROLE_ADMIN" || state.role === "ROLE_AGENT") {
      return (
        <Route
          path="/user"
          element={
            <OrganizationPanel />
          }
        >
          <Route index element={<AllTicketsPage />} />
          <Route path="/ticket/:ticketId" element={<TicketPage />} />
        </Route>
      )
    } else {
      return (
        <Route
          path="/user"
          element={
            <UserPanel />
          }
        >
          <Route index element={<div>hi</div>} />
        </Route>
      )

    }
  }
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
          {getPanel()}
          <Route path="/" element={<MainPage />} />
        </Routes>
      </AuthContext.Provider>

    </>
  )
}

export default App