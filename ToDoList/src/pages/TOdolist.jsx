import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Todo from "../components/Todo";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Alert from "@mui/material/Alert";
import { useTodoList } from "../context/TOdolistProvider";
import { useTheme } from "../context/ThemeProvider";

export default function TOdolist() {
  const { theme } = useTheme();

  const { tasks, setTasks } = useTodoList();
  const [taskInput, setTaskInput] = useState("");
  const [filterTasks, setFilterTasks] = useState("all");

  useEffect(() => {
    const getTasks = localStorage.getItem("tasks");
    if (getTasks && getTasks.length > 0) {
      setTasks(JSON.parse(getTasks));
    }
  }, [setTasks]);

  const handleAddTask = () => {
    if (taskInput.trim() === "") {
      toast.error("Please Enter Task");
      return;
    } else {
      let newTask = {
        id: uuidv4(),
        title: taskInput,
        details: "",
        isCompleted: false,
      };
      const UpdatedTasks = [...tasks, newTask];
      setTasks(UpdatedTasks);
      localStorage.setItem("tasks", JSON.stringify(UpdatedTasks));
      toast.success("task added successfly");
    }

    setTaskInput("");
  };

  let filteredTasks =
    filterTasks === "completed"
      ? tasks.filter((task) => task.isCompleted)
      : filterTasks === "doing"
        ? tasks.filter((task) => !task.isCompleted)
        : tasks;

  return (
    <>
      <ToastContainer />
      <Container maxWidth="sm">
        <Card
          sx={{ minWidth: 275 }}
          style={{
            background: theme.palette.background.paper,
          }}
        >
          <CardContent>
            <Typography variant="h2">TO DO LIST</Typography>
            <Divider />

            {/* //Filter Buttons */}
            <ToggleButtonGroup
              value={filterTasks}
              exclusive
              onChange={(e, newValue) => {
                if (newValue !== null) {
                  setFilterTasks(newValue);
                }
              }}
              aria-label="Platform"
              color="primary"
              style={{ marginBlock: "15px" }}
            >
              <ToggleButton value="all">ALL</ToggleButton>
              <ToggleButton value="completed">Completed</ToggleButton>
              <ToggleButton value="doing">Doing</ToggleButton>
            </ToggleButtonGroup>
            {/* //Filter Buttons */}
            <div
              className=""
              style={{
                height: tasks.length > 3 ? "298px" : "",
                overflowY: "scroll",
                scrollBehavior: "smooth",
                scrollbarWidth: "none",
              }}
            >
              {filteredTasks.length > 0 ? (
                <Todo tasks={filteredTasks} />
              ) : (
                <Alert severity="info" color="info">
                  No tasks yet ! Start the tasks now.
                </Alert>
              )}
            </div>

            {/* //input and addbtn */}
            <Grid container spacing={2} sx={{ marginBlock: "15px" }}>
              <Grid
                size={4}
                display="flex"
                justifyContent="space-around"
                alignItems="center"
              >
                <Button
                  sx={{
                    width: "100%",
                    height: "100%",
                  }}
                  variant="contained"
                  onClick={handleAddTask}
                >
                  Add Task
                </Button>
              </Grid>
              <Grid
                size={8}
                display="flex"
                justifyContent="space-around"
                alignItems="center"
              >
                <TextField
                  sx={{ width: "100%" }}
                  id="outlined-basic"
                  label="task title"
                  variant="outlined"
                  value={taskInput}
                  onChange={(e) => setTaskInput(e.target.value)}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
