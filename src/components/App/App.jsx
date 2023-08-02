import { Feed } from "components/features/pages/Feed/Feed";
import { Login } from "components/features/pages/Login/Login";
import { Missing } from "components/features/pages/Missing/Missing";
import { Profile } from "components/features/pages/Profile/Profile";
import { SignUp } from "components/features/pages/SignUp/SignUp";
import { MainLayout } from "components/layouts/AppLayout/MainLayout";
import RequireAuth from "components/features/ReuireAuth";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAuthUser } from "store/redux/slices/usersSlice";
import { UserPage } from "components/features/pages/UserPage/UserPage";

function App() {
  const auth = useSelector(getAuthUser);
  console.log(auth, "auth");
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />

          <Route element={<RequireAuth auth={auth} />}>
            <Route path="/" element={<Feed />} />
            <Route path="profile" element={<Profile />} />
            <Route path="/profile/:id" element={<UserPage />} />
          </Route>

          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
