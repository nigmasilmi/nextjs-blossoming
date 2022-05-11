import { useEffect } from "react";

const LastSalesPage = () => {
  const url = process.env.NEXT_PUBLIC_TEST_BACKEND;
  useEffect(() => {
    fetch(url);
  }, [url]);
  return <div>LastSalesPage</div>;
};

export default LastSalesPage;
