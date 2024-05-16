export function List({ name, id, handleDeleteActivity }) {
  return (
    <>
      <div className="list-activities">
        <li key={id} name={name}>
          {name}
          <button
            className="delete-button"
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
