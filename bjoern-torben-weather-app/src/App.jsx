import { useState } from "react";
import "./App.css";
import Form from "./Components/Form";

const initialActivities = [
  { name: "Berghain", checked: true },
  { name: "About Blank", checked: true },
  { name: "drin bleiben", checked: true },
];

function App() {
  const [activities, setActivities] = useState("");

  function handleAddActivity({ name, checked }) {}

  return (
    <>
      <Form />
    </>
  );
}

export default App;
