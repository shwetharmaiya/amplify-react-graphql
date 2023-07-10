import React from "react";
import "./App.css";
import "./style.scss";
import "@aws-amplify/ui-react/styles.css";

import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";

import {
  Button,
  Card,
  Heading,
  View,
  withAuthenticator,
} from '@aws-amplify/ui-react';


import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "./components/navbar/Navbar";
import LeftBar from "./components/leftBar/LeftBar";
import RightBar from "./components/rightBar/RightBar";
import Messages from "./components/messages/Messages";

function App({ signOut }) {
  const queryClient = new QueryClient();

  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient}>
      <div className={"light"}>
        <Navbar />
        <div style={{ display: "flex" }}>
          <LeftBar />
          
          <div style={{ flex: 6 }}>
            <Outlet />
          </div>
          <RightBar />
        </div>
      </div>
    </QueryClientProvider>
    );
  };
  const ProtectedRoute = ({ children }) => {
    if (!withAuthenticator) {
      return ;
    }

    return children;
  };


  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
        {
          path: "/messages",
          element: <Messages />,
       
        },
       
      ],
    },
   
  ]);

  return (
    <View className="App">
      <Card>
        <Heading level={1}>We now have Auth!</Heading>
      </Card>
  <div>
    <RouterProvider router={router} />
  </div>
      <Button onClick={signOut}>Sign Out</Button>
    </View>
  
  );
  }
export default withAuthenticator(App);