import { useRouter } from "next/router";

const SelectedClientProjectPage = () => {
  const router = useRouter();
  console.log(router.pathname);
  console.log(router.query);

  return (
    <div>
      <h1>Specific Client Project</h1>
      <p>content of the project</p>
    </div>
  );
};

export default SelectedClientProjectPage;
