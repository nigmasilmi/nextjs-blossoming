import { useRef, useState } from "react";
import classes from "./newsletter-registration.module.css";

function NewsletterRegistration() {
  const emailInputRef = useRef();
  const [error, setError] = useState(null);

  function registrationHandler(event) {
    event.preventDefault();
    const userEmail = emailInputRef.current.value;
    if (!userEmail.includes("@")) {
      setError("Please input a valid email");
    }
    fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({ email: userEmail }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
    // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API
  }

  return (
    <section className={classes.newsletter}>
      {error && <p>{error}</p>}
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailInputRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
