import { useEffect, useState } from "react";
import {
  Button,
  Collapse,
  Container,
  ListGroup,
  Card,
  Form,
} from "react-bootstrap";

const CollapsibleTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [open, setOpen] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/api/tasks")
      .then((res) => res.json())
      .then(setTasks);
  }, []);

  const handleAdd = async () => {
    if (newTask.trim() === "") return;
    const res = await fetch("http://localhost:8080/api/tasks", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ text: newTask }),
    });
    const task = await res.json();
    setTasks([...tasks, task]);
    setNewTask("");
  };

  // ✅ fixed function syntax
  const handleToggle = async (id) => {
    await fetch(`http://localhost:8080/api/tasks/${id}`, { method: "PUT" });
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:8080/api/tasks/${id}`, { method: "DELETE" });
    setTasks(tasks.filter((t) => t.id !== id));
  };
  return (
    <Container className="bg-light">
      <Card className="my-3 shadow-sm">
        <Card.Header
          onClick={() => setOpen(!open)}
          style={{ cursor: "pointer" }}
          className="d-flex justify-content-between align-items-center"
        >
          <strong>My Tasks</strong>
          <span>{open ? "▾" : "▸"}</span>
        </Card.Header>
        <Collapse in={open}>
          <div>
            <Card.Body>
              <Form
                className="d-flex gap-2 mb-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAdd();
                }}
              >
                <Form.Control
                  type="text"
                  placeholder="New Task?"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                />
                <Button variant="primary" onClick={handleAdd}>
                  Add
                </Button>
              </Form>

              <ListGroup>
                {tasks.length === 0 ? (
                  <ListGroup.Item>No Tasks</ListGroup.Item>
                ) : (
                  tasks.map((task) => (
                    <ListGroup.Item
                      key={task.id}
                      className="d-flex justify-content-between align-items-center"
                    >
                      <span
                        style={{
                          textDecoration: task.done ? "line-through" : "none",
                          cursor: "pointer",
                        }}
                        onClick={() => handleToggle(task.id)}
                      >
                        {task.text}
                      </span>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDelete(task.id)}
                      >
                        ✕
                      </Button>
                    </ListGroup.Item>
                  ))
                )}
              </ListGroup>
            </Card.Body>
          </div>
        </Collapse>
      </Card>
    </Container>
  );
};

export default CollapsibleTasks;
