export default function Form({ onAddActivity }) {
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    const isChecked = event.target.elements["checkbox"].checked;

    console.log("submit: ", data);
    console.log("is checked: ", isChecked);
    onAddActivity(data);
    event.target.reset();
    event.target.elements.name.focus();
  }

  return (
    <>
      <h1>Add new Activity</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input name="name"></input>
        <label htmlFor="isForGoodWeather">Is For Good Weather</label>
        <input type="checkbox" id="checkbox" />
        <button>Submit</button>
      </form>
    </>
  );
}
