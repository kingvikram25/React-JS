import React, { useRef } from "react";
import { useState, useEffect } from "react";

const Table = () => {
  const [emData, setEmData] = useState([]);
  const [temp, setTemp] = useState(0);

  const name = useRef("");
  const task = useRef("");
  const status = useRef("");

  let removeCharacter = (index) => {
    let dt = emData.filter((employe, i) => {
      return i !== index;
    });
    setEmData(dt);
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    let dt = emData;
    dt.push({
      name: name.current.value,
      task: task.current.value,
      status: status.current.value,
    });
    setTemp(temp + 1);
    name.current.value = "";
    task.current.value = "";
    status.current.value = "In-Progress";
  };

  useEffect(() => {
    setEmData(emData);
  }, [emData, temp]);

  return (
    <div className="table-data">
      <form className="form-css" onSubmit={handleSubmit}>
        <div className="label-css">
          <label>
            NAME*
            <input className="input-css" ref={name} required></input>
          </label>

          <label>
            TASK*
            <input className="input-css" ref={task} required></input>
          </label>

          <label>
            STATUS*
            <select defaultValue={status} ref={status}>
              <option value="In-Progress">In-Progress</option>
              <option value="Complete">Complete</option>
            </select>
          </label>
          <input className="submit-css" type="submit"></input>
        </div>
      </form>

      <table className="table-css">
        <thead>
          <tr>
            <th>Name</th>
            <th>Task</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {emData.map((row, index) => {
            return (
              <tr key={index}>
                <td>{row.name}</td>
                <td>{row.task}</td>
                <td>{row.status}</td>
                <td>
                  <button onClick={() => removeCharacter(index)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

// useRef like when we say then only thing render which is not possible in useState() hooks
