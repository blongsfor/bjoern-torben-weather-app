export default function Form({ onAddActivity }) {
  return (
    <>
      <h1>Add new Activity</h1>
      <form>
        <label htmlFor="name-input">Name:</label>
        <input name="name-input"></input>
        <label htmlFor="checkbox-input">Good-weather activity:</label>
        <input type="checkbox" name="checkbox-input" />
        <button>Submit</button>
      </form>
    </>
  );
}
