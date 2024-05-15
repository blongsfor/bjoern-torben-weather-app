export default function Form({ onAddActivity }) {
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    const isForGoodWeather = event.target.elements["isForGoodWeather"].checked;

    console.log("submit: ", data);
    console.log("isForGoodWeather: ", isForGoodWeather);
    onAddActivity({ ...data, isForGoodWeather });
    event.target.reset();
    event.target.elements.name.focus();
  }

  return (
    <>
      <h1>Add new Activity</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input name="name" required></input>
        <label htmlFor="isForGoodWeather">Is For Good Weather</label>
        <input type="checkbox" name="isForGoodWeather" id="isForGoodWeather" />
        <button>Submit</button>
      </form>
    </>
  );
}
