import classes from "./comment-list.module.css";

function CommentList(props) {
  return (
    <ul className={classes.comments}>
      {/* Render list of comments - fetched from API */}

      {props.comments.map((com) => (
        <li key={com._id}>
          <p>{com.text}</p>
          <div>By {com.name}</div>
        </li>
      ))}
    </ul>
  );
}

export default CommentList;
