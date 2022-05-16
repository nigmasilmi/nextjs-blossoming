import { useState, useEffect, useContext } from "react";
import NotificationContext from "../../store/notification-context";
import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";

function Comments(props) {
  const notificationCtx = useContext(NotificationContext);
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [loadedComments, setLoadedComments] = useState([]);
  const [isFetchingComments, setIsFetchingComments] = useState(false);

  useEffect(() => {
    setIsFetchingComments(true);
    fetch(`/api/comments/${eventId}`)
      .then((response) => response.json())
      .then((data) => {
        setLoadedComments(data.comments);
        setIsFetchingComments(false);
      });
  }, [showComments, eventId]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    notificationCtx.showNotification({
      title: "Processing",
      message: "Sending comment",
      status: "pending",
    });

    fetch(`/api/comments/${eventId}`, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
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
          message: "Comment successfully added",
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
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && isFetchingComments && <p>Loading comments...</p>}
      {showComments && !isFetchingComments && (
        <CommentList comments={loadedComments} />
      )}
    </section>
  );
}

export default Comments;
