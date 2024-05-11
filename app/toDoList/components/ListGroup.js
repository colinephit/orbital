"use client";

function ListGroup() {
  const items = [
    "CS2030S lab",
    "CS2040S tutorial",
    "Math tutorial",
    "Write Essay",
  ];

  return (
    <>
      <h1>To Do List</h1>
      <ul class="list-group">
        {items.map((item) => (
          <li
            class="list-group-item"
            key={item}
            onClick={() => console.log("done!")}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
