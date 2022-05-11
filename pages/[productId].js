import { Fragment } from "react";
import fs from "fs/promises";
import path from "path";

const ProductDetailPage = ({ product }) => {
  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <Fragment>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
    </Fragment>
  );
};

const getData = async () => {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  return data;
};

export async function getStaticProps(context) {
  const data = await getData();
  const { params } = context;
  const productId = params.productId;
  const productContent = data.products.find(
    (product) => product.id === productId
  );

  if (!productContent) {
    return { notFound: true };
  }

  return {
    props: {
      product: productContent,
    },
  };
}

export async function getStaticPaths() {
  const data = await getData();
  const ids = data.products.map((product) => product.id);
  const pathsWithParams = ids.map((id) => ({ params: { productId: id } }));

  return {
    paths: pathsWithParams,
    fallback: true,
  };
}

export default ProductDetailPage;
