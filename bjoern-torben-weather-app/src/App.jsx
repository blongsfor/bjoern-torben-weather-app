import { useState } from "react";
import "./App.css";
import Form from "./Components/Form";
import { uid } from "uid";

const initialActivities = [
  { name: "Berghain", checked: false },
  { name: "Sisyphos", checked: true },
  { name: "drin bleiben", checked: false },
];

function App() {
  const [activities, setActivities] = useState(initialActivities);

  function handleAddActivity({ newActivity }) {
    setActivities([...activities, { id: uid(), ...newActivity }]);
  }

  return (
    <>
      <Form onAddActivity={handleAddActivity} />
    </>
  );
}

export default App;
