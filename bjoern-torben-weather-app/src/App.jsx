import { useState } from "react";
import "./App.css";
import Form from "./Components/Form";
import { List } from "./Components/List";
import { uid } from "uid";
import useLocalStorageState from "use-local-storage-state";
import { useEffect } from "react";

const InitialActivities = [
  { name: "Berghain", id: 1, isForGoodWeather: true },
  { name: "Sisyphos", id: 2, isForGoodWeather: true },
  { name: "drin bleiben", id: 3, isForGoodWeather: false },
];

function App() {
  const [activities, setActivities] = useLocalStorageState("activities", {
    defaultValue: InitialActivities,
  });

  const [isGoodWeather, setIsGoodWeather] = useState(true);

  // const isGoodWeather = true;

  const filteredActivities = activities.filter(
    (activity) => activity.isForGoodWeather === isGoodWeather
  );

  function handleAddActivity(newActivity) {
    setActivities([...activities, { id: uid(), ...newActivity }]);
  }

  function handleDeleteActivity(idActivity) {
    setActivities(activities.filter((activity) => activity.id != idActivity));
  }

  useEffect(() => {
    async function getIsGoodWeather() {
      try {
        const response = await fetch(
          "https://example-apis.vercel.app/api/weather"
        );
        let fetchedData = await response.json();
        console.log("weather", fetchedData);
        setIsGoodWeather(fetchedData.isGoodWeather);
      } catch (err) {
        console.log(
          "Failed to fetch weather data, defaulting weather to bad weather: ",
          err
        );
      }
    }
    getIsGoodWeather();
  }, []);

  console.log("activities", activities);
  return (
    <>
      <div>
        <h1>{/*{setIsGoodWeather ? "Good Weather" : "Bad Weather"}*/}</h1>
        <ul>
          {filteredActivities.map((activity) => (
            <li key={activity.id}>
              <List
                name={activity.name}
                isForGoodWeather={activity.isForGoodWeather}
                id={activity.id}
                handleDeleteActivity={handleDeleteActivity}
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
