import Link from "next/link";

const HomePage = () => {
  return (
    <div>
      <h1>HomePage</h1>
      <ul>
        <li>
          <Link href="/blog/initialPage">Blog</Link>
        </li>
        <li>
          <Link href="/portfolio">Porfolio</Link>
        </li>
        <li>
          <Link href="/clients">Clients</Link>
        </li>
      </ul>
    </div>
  );
};

export default HomePage;
