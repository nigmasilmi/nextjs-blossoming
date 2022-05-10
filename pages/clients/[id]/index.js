import React from "react";
import { useRouter } from "next/router";

const ClientProjectsPage = () => {
  const router = useRouter();
  console.log(router.pathname);
  console.log(router.query);

  const loadProjectHandler = () => {
    // load data...
    router.push({
      pathname: "/clients/[id]/[clientprojectid]",
      query: { id: "jane", clientprojectid: "holaid" },
    });
  };
  return (
    <div>
      <h1>Specific Client Project</h1>
      <button onClick={loadProjectHandler}>Load Project</button>
    </div>
  );
};

export default ClientProjectsPage;
