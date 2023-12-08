import './App.css'
import { Route, Routes, Navigate } from "react-router-dom";
import MainPage from './pages/mainPage';
import LoginPage from './pages/LoginPage';

(async function () {
  // we need less for antd global less variable and them customization.
  // note that cra dont support less by default so i needed to customize
  // webpack config.
  await import("./styles/app.less");
  // we need this because we all know that sass is way cooler than less.
  await import("./styles/app.scss");
})();

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<MainPage />} />
      </Routes>
    </>
  )
}

export default App
