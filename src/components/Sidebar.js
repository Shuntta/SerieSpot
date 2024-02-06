import React from 'react';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "New Review",
    path: "/CreateReview/:movieId",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "My Series",
    path: "/mySeries",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "SerieHub",
    path: "/SerieHubNoId",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Login",
    path: "/Login",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
];