import { Routes, Route } from "react-router-dom";

import "./globals.css";
import SignInForm from "./_auth/forms/SignInForm";
import SignUpForm from "./_auth/forms/SignUpForm";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import { CreatePost, EditPost, Home, PostDetails } from "./_root/pages";
import { Toaster } from "@/components/ui/toaster";
import Explore from "./_root/pages/Explore";

const App = () => {
  return (
    <main className='flex h-screen'>
      <Routes>
        {/* public routes */}
        <Route element={<AuthLayout />}>
          <Route path='/sign-in' element={<SignInForm />} />
          <Route path='/sign-up' element={<SignUpForm />} />
        </Route>
        {/* private routes */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path='/explore' element={<Explore />} />
          <Route path='/create-post' element={<CreatePost />} />
          <Route path='/edit-post/:id' element={<EditPost />} />
          <Route path='/post/:id' element={<PostDetails />} />
        </Route>
      </Routes>
      <Toaster />
    </main>
  );
};

export default App;
