export function List({ name, id }) {
  return (
    <>
      <ul>
        <initialActivities key={id} name={name}></initialActivities>
      </ul>
    </>
  );
}
