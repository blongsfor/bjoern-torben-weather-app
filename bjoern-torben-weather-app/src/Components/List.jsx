export function List({ name, id }) {
  return (
    <>
      <ul>
        <li key={id} name={name}>
          {name}
        </li>
      </ul>
    </>
  );
}
