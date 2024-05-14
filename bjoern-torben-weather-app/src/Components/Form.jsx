import { Checkbox } from "./Checkbox";

export default function Form({ onAddActivity }) {
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    console.log("submit: ", data);
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
        <Checkbox />
        <button>Submit</button>
      </form>
    </>
  );
}
