import { useState } from "react";
import "./App.css";
import Form from "./Components/Form";
import { List } from "./Components/List";
import { uid } from "uid";
import useLocalStorageState from "use-local-storage-state";
import { useEffect } from "react";
import "./Components/Checkbox.css";

const InitialActivities = [
  { id: 1, name: "Berghain", isForGoodWeather: true },
  { id: 2, name: "Sisyphos", isForGoodWeather: true },
  { id: 3, name: "drin bleiben", isForGoodWeather: false },
];

function App() {
  const [activities, setActivities] = useLocalStorageState("activities", {
    defaultValue: InitialActivities,
  });

  const [isGoodWeather, setIsGoodWeather] = useState(true);
  const [condition, setCondition] = useState("");
  const [temperature, setTemperature] = useState(0);
  const [location, setLocation] = useState("");

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
        setCondition(fetchedData.condition);
        setTemperature(fetchedData.temperature);
        setLocation(fetchedData.location);
      } catch (err) {
        console.log(
          "Failed to fetch weather data, defaulting weather to bad weather: ",
          err
        );
      }
    }
    getIsGoodWeather();
    const interval = setInterval(getIsGoodWeather, 5000);
    return () => clearInterval(interval);
  }, []);

  console.log("activities", activities);
  return (
    <>
      <div>
        <h1 className="heading">
          <span>{condition}</span>
          <span>{temperature} °C</span>
        </h1>
        <div>
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
        </div>
      </div>
      <Form onAddActivity={handleAddActivity} />
    </>
  );
}

export default App;
