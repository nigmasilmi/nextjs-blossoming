import { useRef, useState, useContext } from "react";
import classes from "./newsletter-registration.module.css";
import NotificationContext from "../../store/notification-context";

function NewsletterRegistration() {
  const notificationCtx = useContext(NotificationContext);
  const emailInputRef = useRef();
  const [error, setError] = useState(null);

  function registrationHandler(event) {
    event.preventDefault();
    const userEmail = emailInputRef.current.value;
    notificationCtx.showNotification({
      title: "Signing up",
      message: "Registering for newsletter",
      status: "pending",
    });

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
      .then((response) => {
        // manage errors 4xx or 5xx
        // check if the response is ok
        if (response.ok) {
          return response.json();
        }
        // if not, manage the resolved response and throw an error
        return response.json().then((data) => {
          throw new Error(data.maessage || "Something went wrong");
        });
      })
      .then((data) => {
        notificationCtx.showNotification({
          title: "Success",
          message: "Sucessful sign up",
          status: "success",
        });
      })
      .catch((err) => {
        notificationCtx.showNotification({
          title: "Error",
          message: err.message || "Something went wrong",
          status: "error",
        });
      });
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
