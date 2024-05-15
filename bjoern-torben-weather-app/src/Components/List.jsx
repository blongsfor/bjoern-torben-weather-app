export function List({ name, id, handleDeleteActivity }) {
  return (
    <>
      <ul>
        <li key={id} name={name}>
          {name}
          <button
            type="button"
            title="delete activity"
            onClick={() => handleDeleteActivity(id)}
          >
            x
          </button>
        </li>
      </ul>
    </>
  );
}
