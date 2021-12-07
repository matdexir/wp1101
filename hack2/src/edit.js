import React, { useState } from "react";
import instance from "./instance";

import { Button, TextField } from "@material-ui/core";
import { Delete as DeleteIcon, Send as SendIcon } from "@material-ui/icons";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

function Edit(props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // TODO 4-(2): complete handleSubmit function to create a new post and save it to database
  let m = moment();
  const handleSubmit = async () => {
    if (!title) return;
    if (!content) return;
    await instance.post("/newPost", {
      postId: uuidv4(),
      title,
      content,
      timestamp: m.format(),
    });
    setTimeout(() => {
      props.navigate(-1);
    }, 300);
  };

  return (
    <div className="post-wrapper">
      <div className="post-text-container">
        <div style={{ fontWeight: "Bold", fontSize: 18 }}>
          Create a New Post
        </div>

        <div className="post-title">
          {/* TODO 4-(2): add property to Textfield to store the input */}
          <TextField
            label="Title"
            size="small"
            variant="outlined"
            className="post-title"
            id="pid-create-title"
            onChange={(event) => {
              setTitle(event.target.value.trim());
            }}
          />
        </div>

        <div className="post-content-container">
          {/* TODO 4-(2): add property to Textfield to store the input */}
          <TextField
            label="Content"
            variant="outlined"
            className="post-content-editor"
            id="pid-create-content"
            multiline
            onChange={(event) => {
              setContent(event.target.value.trim());
            }}
          />
        </div>

        <div className="post-btn-wrapper">
          <Button
            variant="contained"
            color="primary"
            className="post-btn"
            startIcon={<SendIcon />}
            id="pid-create-submit-btn"
            onClick={handleSubmit}
          >
            Submit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className="post-cancel-btn"
            endIcon={<DeleteIcon />}
            onClick={(e) => props.navigate(-1)}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Edit;
