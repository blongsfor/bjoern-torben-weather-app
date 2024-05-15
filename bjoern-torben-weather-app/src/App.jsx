import { useState } from "react";
import "./App.css";
import Form from "./Components/Form";
import { List } from "./Components/List";
import { uid } from "uid";
import useLocalStorageState from "use-local-storage-state";
import { useEffect } from "react";

const InitialActivities = [
  { name: "Berghain", isForGoodWeather: true },
  { name: "Sisyphos", isForGoodWeather: true },
  { name: "drin bleiben", isForGoodWeather: false },
];

function App() {
  const [activities, setActivities] = useLocalStorageState("activities", {
    defaultValue: InitialActivities,
  });

  const [isGoodWeather, setIsGoodWeather] = useState({
    isGoodWeather: true,
  });

  useEffect(
    () =>
      async function getIsGoodWeather() {
        const response = await fetch(
          "https://example-apis.vercel.app/api/weather"
        );
        const data = await response.json();
        console.log("fetch: ", data);
        setIsGoodWeather({ isGoodWeather: data.isGoodWeather });
        getIsGoodWeather();
      },
    []
  );

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
        <h1>{setIsGoodWeather ? "Good Weather" : "Bad Weather"}</h1>
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
