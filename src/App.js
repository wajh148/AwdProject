import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from "react-router-dom";
import Header from './layouts/Header_temp';
import Login from './pages/Loginpages/Loginpage';
import Dashboard from './pages/Dashboardu/Dashboardu';
import Register from './pages/Registeru/Registeru';
import Forgotpassword from './pages/ForgotPassword/Forgotpasswordu';
import ResetPassword from './pages/ForgotPassword/ResetPasswordu';
import RecipeDetails from './pages/RecipeDetails/RecipeDetails';
import { Toaster } from 'react-hot-toast';
import CreateRecipe from './pages/CreateRecipe/CreateRecipe';
import AddReview from './pages/AddReview/AddReview'; // path apke project structure ke hisab se adjust karo


function App() {
  return (
    <>
      <Header />

      {/* 🔥 Toaster upar hona chahiye */}
      <Toaster position="top-center" />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/loginpage" element={<Login />} />
        <Route path="/RecipeDetails/:id" element={<RecipeDetails />} />
        <Route path="/Registeru" element={<Register />} />
        <Route path="/Forgotpasswordu" element={<Forgotpassword />} />
        <Route
          path="/RsetPasswordu/:id/:token"
          element={<ResetPassword />}
        />
        <Route path='/CreateRecipe' element={<CreateRecipe />} />
        <Route path="/AddReview" element={<AddReview />} />
      </Routes>
    </>
  );
}

export default App;
