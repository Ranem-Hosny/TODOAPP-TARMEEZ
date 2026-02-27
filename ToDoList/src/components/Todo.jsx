import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CheckIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import "../Styles/Todo.css";
import { useTodoList } from "../context/TOdolistProvider";
import { toast } from "react-toastify";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import { useTheme } from "../context/ThemeProvider";

export default function Todo({ tasks }) {
  const { theme } = useTheme();

  const [opendelete, setOpendelete] = useState(null);
  const [openedit, setOpenedit] = useState(null);

  const [updatedTask, setUpdatedTask] = useState({ title: "", details: "" });

  const { setTasks } = useTodoList();

  const handleCompletedTask = (taskId) => {
    const targetTask = tasks.find((task) => task.id === taskId);

    let UpdatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task,
    );

    setTasks(UpdatedTasks);
    localStorage.setItem("tasks", JSON.stringify(UpdatedTasks));

    if (!targetTask.isCompleted) {
      toast.success("Task is dooooneee 🎉");
    } else {
      toast.info("Task marked as doing again");
    }
  };

  const handleDeleteTask = (taskId) => {
    let deletedTask = tasks.filter((task) => task.id !== taskId);
    setTasks(deletedTask);
    localStorage.setItem("tasks", JSON.stringify(deletedTask));

    setOpendelete(null);

    toast.success("Deleted Task");
  };

  const handleEditTask = (taskId) => {
    let editTask = tasks.map((task) =>
      task.id === taskId ? { ...task, ...updatedTask } : task,
    );
    setTasks(editTask);
    localStorage.setItem("tasks", JSON.stringify(editTask));
    setOpenedit(null);
  };

  return (
    <>
      {tasks.map((task) => (
        <Card
          key={task.id}
          sx={{
            minWidth: 275,
            background: theme.palette.background.default,
            color: "#fff",
            marginBlock: "10px",
          }}
          className="todocard"
        >
          <CardContent
            style={{
              background: theme.palette.background.default,
              color: theme.palette.text.primary,
            }}
          >
            <Grid container spacing={2}>
              <Grid size={8}>
                <Typography
                  sx={{
                    textAlign: "left",
                    textDecoration: task.isCompleted ? "line-through" : "",
                  }}
                  variant="h5"
                >
                  {task.title}
                </Typography>
                <Typography
                  sx={{
                    textAlign: "left",
                    textDecoration: task.isCompleted ? "line-through" : "",
                  }}
                  variant="h6"
                >
                  {task.details}
                </Typography>
              </Grid>
              {/* //action buttons */}
              <Grid
                size={4}
                display="flex"
                xs={12}
                sm={4}
                justifyContent="flex-end"
                gap={1}
                alignItems="center"
              >
                <IconButton
                
                  className="iconButton"
                  aria-label="delete"
                  style={{
                    color: task.isCompleted ? "#fff" : "#8bc34a",
                    background: task.isCompleted ? "#8bc34a" : "#fff",
                    border: "solid #8bc34a 3px",
                  }}
                  onClick={() => handleCompletedTask(task.id)}
                >
                  <CheckIcon fontSize="small" />
                </IconButton>

                <IconButton
                  className="iconButton"
                  aria-label="delete"
                  style={{
                    color: "#ec130b",
                    background: "#fff",
                    border: "solid #ec130b 3px",
                  }}
                  onClick={() => {
                    setOpendelete(task.id);
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
                <IconButton
                  className="iconButton"
                  aria-label="delete"
                  style={{
                    color: "#283593",
                    background: "#fff",
                    border: "solid #070f50 3px",
                  }}
                  onClick={() => {
                    setOpenedit(task.id);
                    setUpdatedTask({
                      title: task.title,
                      details: task.details,
                    });
                  }}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              </Grid>
              {/* //action buttons */}
            </Grid>
          </CardContent>
          {/* //delete */}
          <Modal
            open={opendelete === task.id}
            onClose={() => setOpendelete(null)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 500,
                background: theme.palette.background.paper,
                boxShadow: 24,
                p: 5,
              }}
            >
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Are you sure you want to delete the task?
              </Typography>
              <div style={{ marginBlock: "10px" }}>
                <Button
                  color="error"
                  variant="contained"
                  onClick={() => handleDeleteTask(task.id)}
                >
                  Delete
                </Button>
                <Button
                  sx={{ marginInline: 2 }}
                  variant="contained"
                  color="info"
                  onClick={() => setOpendelete(null)}
                >
                  Cancle
                </Button>
              </div>
            </Box>
          </Modal>

          {/* //edit */}

          <Dialog
            sx={{
              width: "100%",
            }}
            open={openedit === task.id}
            onClose={() => setOpenedit(null)}
          >
            <DialogTitle>Edit Task</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                value={updatedTask.title}
                onChange={(e) => {
                  setUpdatedTask({ ...updatedTask, title: e.target.value });
                }}
                margin="dense"
                id="title"
                name="title"
                label="Title"
                type="text"
                fullWidth
                variant="standard"
              />
              <TextField
                autoFocus
                value={updatedTask.details}
                onChange={(e) => {
                  setUpdatedTask({ ...updatedTask, details: e.target.value });
                }}
                margin="dense"
                id="details"
                name="details"
                label="Details"
                type="text"
                fullWidth
                variant="standard"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenedit(null)}>Cancel</Button>
              <Button
                type="submit"
                onClick={() => {
                  handleEditTask(task.id);
                }}
              >
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </Card>
      ))}
    </>
  );
}
