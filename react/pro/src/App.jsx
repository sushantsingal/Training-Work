import Greeting from "./components/Greeting";
import React from "react";

function App() {
  return (
    <div>
      <Greeting name="Sushant" roll="15643" />
      <Greeting name="Harsh" roll="15243" />
      <Greeting name="Jatin" roll="15693" />
      <Greeting name="Harman" roll="15043" />
    </div>
  );
}

export default App;