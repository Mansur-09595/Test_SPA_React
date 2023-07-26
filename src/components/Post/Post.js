import React from "react";
import "../../App.css";
import "./post.css";

const Post = ({ id, title, body }) => {

  return (
    <tr>
      <td className="post-cell id">{id}</td>
      <td className="post-cell title">{title}</td>
      <td className="post-cell body">{body}</td>
    </tr>
  );
};

export default Post;
