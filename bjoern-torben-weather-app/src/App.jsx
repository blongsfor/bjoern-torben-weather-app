import { useState } from "react";
import "./App.css";
import Form from "./Components/Form";
import { List } from "./Components/List";
import { uid } from "uid";
import useLocalStorageState from "use-local-storage-state";

const InitialActivities = [
  { name: "Berghain", isForGoodWeather: true },
  { name: "Sisyphos", isForGoodWeather: true },
  { name: "drin bleiben", isForGoodWeather: false },
];

const isGoodWeather = true;

function App() {
  const [activities, setActivities] = useLocalStorageState("activities", {
    defaultValue: InitialActivities,
  });

  function handleAddActivity(newActivity) {
    setActivities([...activities, { id: uid(), ...newActivity }]);
  }

  const filteredActivities = activities.filter(
    (activity) => activity.isForGoodWeather === isGoodWeather
  );

  console.log("activities", activities);
  return (
    <>
      <div>
        <h1>{isForGoodWeather ? "Good Weather" : "Bad Weather"}</h1>
        <ul>
          {filteredActivities.map((activity) => (
            <li key={activity.id}>
              <List
                name={activity.name}
                isForGoodWeather={activity.isForGoodWeather}
                id={activity.id}
              />
            </li>
          ))}
        </ul>
      </div>
      <Form onAddActivity={handleAddActivity} />
    </>
  );
}

export default App;
