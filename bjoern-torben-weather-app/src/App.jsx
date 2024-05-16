//////////////////////////////////////IMPORTS//////////////////////////////////////
import { useState } from "react";
import "./App.css";
import Form from "./Components/Form";
import { List } from "./Components/List";
import { uid } from "uid";
import useLocalStorageState from "use-local-storage-state";
import { useEffect } from "react";
import "./Components/Checkbox.css";
import City from "./Components/City";

//////////////////////////////////////INITIAL DATA BEFORE API//////////////////////////////////////
const InitialActivities = [
  {
    id: 1,
    name: "Berghain",
    categoriesOptions: "social-cultural",
    isForGoodWeather: true,
  },
  {
    id: 2,
    name: "Sisyphos",
    categoriesOptions: "social-cultural",
    isForGoodWeather: true,
  },
  {
    id: 3,
    name: "drin bleiben",
    categoriesOptions: "leisure",
    isForGoodWeather: false,
  },
];
//////////////////////////////////////APP COMPONENT//////////////////////////////////////
function App() {
  const [activities, setActivities] = useLocalStorageState("activities", {
    defaultValue: InitialActivities,
  });
  const [isGoodWeather, setIsGoodWeather] = useState(true);
  const [categorizedActivities, setCategorizedActivities] = useState([]);
  const [condition, setCondition] = useState("");
  const [temperature, setTemperature] = useState(0);
  const [selectedCity, setSelectedCity] = useState("rainforest");
  const filteredActivitiesByWeather = activities.filter(
    (activity) =>
      isGoodWeather ? activity.isForGoodWeather : !activity.isForGoodWeather // alternative: return activity.isForGoodWeather === isGoodWeather;
  );
  // -------------------- this function adds new entries and categorizes them into the tabs -------------
  function handleAddActivity(newActivity) {
    const { categoriesOptions } = newActivity;
    setActivities([...activities, { id: uid(), ...newActivity }]);
    const updatedCategorizedActivities = categorizedActivities.map(
      (category) => {
        if (category.category === categoriesOptions) {
          return {
            category: categoriesOptions,
            activities: [...category.activities, newActivity],
          };
        }
        return category;
      }
    );
    if (
      !updatedCategorizedActivities.some(
        (category) => category.category === categoriesOptions
      )
    ) {
      setCategorizedActivities([
        ...updatedCategorizedActivities,
        {
          category: categoriesOptions,
          activities: [newActivity],
        },
      ]);
    } else {
      setCategorizedActivities(updatedCategorizedActivities);
    }
  }
  // -------------- this function deletes activities on button click ----------------------
  function handleDeleteActivity(idActivity) {
    setActivities(activities.filter((activity) => activity.id !== idActivity));
  }
  // ---------------- this function selects the location for the fetching of the weather ----------------------
  function handleSelectCity(selectedCity) {
    setSelectedCity(selectedCity);
  }
  // ------------------ fetch API DATA ---------------------
  useEffect(() => {
    async function getIsGoodWeather() {
      try {
        const response = await fetch(
          `https://example-apis.vercel.app/api/weather/${selectedCity}`
        );
        let fetchedData = await response.json();
        console.log("weather", fetchedData);
        setIsGoodWeather(fetchedData.isGoodWeather);
        setCondition(fetchedData.condition);
        setTemperature(fetchedData.temperature);
      } catch (err) {
        console.log("couldn't load data", err);
      }
    }
    getIsGoodWeather();
    const interval = setInterval(getIsGoodWeather, 5000);
    return () => clearInterval(interval);
  }, [selectedCity]);
  // ------------------ display components ---------------------
  return (
    <>
      <div>
        <City onSelectCity={handleSelectCity} />
        <h1 className="heading">
          <span>{condition}</span>
          <span>{temperature} °C</span>
        </h1>
        <p>
          {isGoodWeather
            ? "The weather is awesome! Go outside and:"
            : "Bad weather outside! Here's what you can do now:"}
        </p>
        <ul>
          {filteredActivitiesByWeather.map((activity) => (
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
