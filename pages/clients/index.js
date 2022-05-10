import Link from "next/link";

const ClientsPage = () => {
  const clients = [
    { id: "jane", name: "Jane Doe" },
    { id: "john", name: "John Doe" },
    { id: "juana", name: "Juana de Arco" },
  ];
  return (
    <div>
      <h1>The Clients Page</h1>
      <ul>
        <h2>Links generated with string values</h2>
        {clients.map((client) => (
          <li key={client.id}>
            <Link href={`clients/${client.id}`}>{client.name}</Link>
          </li>
        ))}
      </ul>
      <ul>
        <h2>Links generated with object values</h2>
        {clients.map((client) => (
          <li key={client.id}>
            <Link
              href={{
                pathname: "/clients/[id]",
                query: { id: client.id },
              }}
            >
              {client.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientsPage;
