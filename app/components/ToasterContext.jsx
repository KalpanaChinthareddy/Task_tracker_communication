"use client"; // Directive for Next.js indicating that this component runs on the client-side

import { Toaster } from "react-hot-toast"; // Importing the Toaster component from the react-hot-toast library

const ToasterContext = () => {
  // Toaster component displays toast notifications globally in the app
  return (
    <Toaster /> // Render the Toaster component to handle and display notifications
  );
};

export default ToasterContext; // Exporting the component for use in other parts of the application
