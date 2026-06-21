import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [assignment, setAssignment] = useState("");
  const [subject, setSubject] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [search, setSearch] = useState("");

  const [assignments, setAssignments] = useState(() => {
    const saved = localStorage.getItem("assignments");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("assignments", JSON.stringify(assignments));
  }, [assignments]);

  const addAssignment = () => {
    if (!assignment || !subject || !dueDate) {
      alert("Please fill all fields");
      return;
    }

    const newAssignment = {
      assignment,
      subject,
      dueDate,
      submitted: false
    };

    setAssignments([...assignments, newAssignment]);
    setAssignment("");
    setSubject("");
    setDueDate("");
  };

  const markSubmitted = (index) => {
    const updated = [...assignments];
    updated[index].submitted = true;
    setAssignments(updated);
  };

  const deleteAssignment = (index) => {
    const updated = assignments.filter((_, i) => i !== index);
    setAssignments(updated);
  };

  const editAssignment = (index) => {
    const newName = prompt("Edit assignment name:");
    if (!newName) return;

    const updated = [...assignments];
    updated[index].assignment = newName;
    setAssignments(updated);
  };

  const isOverdue = (date) => {
    return new Date(date) < new Date();
  };

  const filteredAssignments = assignments.filter((item) =>
    item.assignment.toLowerCase().includes(search.toLowerCase())
  );

  const total = assignments.length;
  const submitted = assignments.filter((a) => a.submitted).length;
  const pending = total - submitted;

  return (
    <div className="container">
      <h1>College Assignment Submission Tracker</h1>

      <div className="cards">
        <div className="card">Total: {total}</div>
        <div className="card">Submitted: {submitted}</div>
        <div className="card">Pending: {pending}</div>
      </div>

      <input
        type="text"
        placeholder="Search Assignment"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <input
        type="text"
        placeholder="Assignment Name"
        value={assignment}
        onChange={(e) => setAssignment(e.target.value)}
      />

      <input
        type="text"
        placeholder="Subject Name"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <button onClick={addAssignment}>Add Assignment</button>

      <ul>
        {filteredAssignments.map((item, index) => (
          <li key={index}>
            <b>{item.assignment}</b> | {item.subject} | {item.dueDate}

            {isOverdue(item.dueDate) && !item.submitted && (
              <span className="overdue"> OVERDUE</span>
            )}

            <br />

            {item.submitted ? (
              <span className="submitted">Submitted</span>
            ) : (
              <span className="pending">Pending</span>
            )}

            {!item.submitted && (
              <button onClick={() => markSubmitted(index)}>Submit</button>
            )}

            <button onClick={() => editAssignment(index)}>Edit</button>

            <button onClick={() => deleteAssignment(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;