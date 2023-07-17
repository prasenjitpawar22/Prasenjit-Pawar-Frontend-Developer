import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import SectionOne from "./Components/SectionOne";
import SectionTwo from "./Components/SectionTwo";

function App() {
  return (
    <div className="App">
      <Navbar />
      <SectionOne />
      <SectionTwo />
    </div>
  );
}

export default App;
