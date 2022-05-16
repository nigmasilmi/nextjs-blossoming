import classes from "./hero.module.css";
import Image from "next/image";

const Hero = () => {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src="/images/site/cdd20-eVboxPoX1iU-unsplash.jpg"
          alt="An abstract avatar"
          height={300}
          width={300}
        />
      </div>
      <h1>Hi I&apos;m Nig</h1>
      <p>I am a Web UI Developer learning NextJS</p>
    </section>
  );
};

export default Hero;
