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
import NearDeadlinePage from './pages/NearDeadlinePage';
import PassedDeadlinePage from './pages/PassedTicketsPage';
import AgentsPage from './pages/AgentsPage';
import AllUserTicketPage from './pages/AllUserTicketPage';
import UserTicketPage from './pages/UserTicketPage';
import ProductsPage from './pages/ProductsPage';


(async function () {
  // we need less for antd global less variable and them customization.
  // note that cra dont support less by default so i needed to customize
  // webpack config.
  await import("./styles/app.less");
  // we need this because we all know that sass is way cooler than less.
  await import("./styles/app.scss");
})();

export const AuthContext = createContext();

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
  const getInititalState = () => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const id = localStorage.getItem("id");
    if (id && user && token && role) {
      return {
        isAuthenticated: true,
        user: JSON.parse(user),
        token: JSON.parse(token),
        role: JSON.parse(role),
        id: JSON.parse(id)
      };
    }

    return {
      isAuthenticated: false,
      user: "",
      token: "",
      role: "",
      id: ""
    }
  }
  const [state, dispatch] = useReducer(reducer, getInititalState());

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
    if (state.role === "ROLE_ADMIN") {
      return (
        <Route
          path="/user"
          element={
            <OrganizationPanel />
          }
        >
          <Route index element={<AllTicketsPage />} />
          <Route path="/user/ticket/:ticketId" element={<TicketPage />} />
          <Route path="/user/nearDeadline" element={<NearDeadlinePage />} />
          <Route path="/user/passedDeadline" element={<PassedDeadlinePage />} />
          <Route path="/user/agents" element={<AgentsPage />} />
          <Route path="/user/products" element={<ProductsPage />} />
        </Route>
      )
    } else if (state.role === "ROLE_AGENT") {
      return (
        <Route
          path="/user"
          element={
            <OrganizationPanel />
          }
        >
          <Route index element={<AllTicketsPage />} />
          <Route path="/user/ticket/:ticketId" element={<TicketPage />} />
          <Route path="/user/nearDeadline" element={<NearDeadlinePage />} />
          <Route path="/user/passedDeadline" element={<PassedDeadlinePage />} />
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
          <Route index element={<AllUserTicketPage />} />
          <Route path="/user/ticket/:ticketId" element={<UserTicketPage />} />
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