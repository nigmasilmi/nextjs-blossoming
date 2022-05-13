import { useRef, useState } from "react";

const HomePage = () => {
  const emailInputRef = useRef();
  const feedbackInputRef = useRef();
  const [feedback, setFeedback] = useState([]);

  const sumbitFormHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredFeedback = feedbackInputRef.current.value;
    const reqBody = { email: enteredEmail, text: enteredFeedback };

    fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  const getFeedbackHandler = () => {
    fetch("/api/feedback")
      .then((response) => response.json())
      .then((data) => setFeedback(data.feedback));
  };

  return (
    <div>
      <h1>Home Page</h1>
      <form onSubmit={sumbitFormHandler}>
        <div>
          <label htmlFor="email">Your email address</label>
          <input type="email" id="email" ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor="feedback">Your feedback </label>
          <textarea id="feedback" rows="5" ref={feedbackInputRef}></textarea>
        </div>
        <div>
          <button>Send feedback</button>
        </div>
      </form>
      <hr />
      <button onClick={getFeedbackHandler}>Get Feedback</button>
      <ul>
        {feedback.map((fb) => (
          <li key={fb.id}>{fb.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
