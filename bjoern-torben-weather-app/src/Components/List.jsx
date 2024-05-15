export function List({ name, id, handleDeleteActivity }) {
  return (
    <>
      <div>
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
      </div>
    </>
  );
}
