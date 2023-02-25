import React, { useRef } from "react";
import { useState, useEffect } from "react";

const Table = () => {
  const [emData, setEmData] = useState([]);
  const [temp, setTemp] = useState(0);

  const name = useRef("");
  const job = useRef("");
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
      job: job.current.value,
      status: status.current.value,
    });
    setTemp(temp + 1);
    name.current.value = "";
    job.current.value = "";
    status.current.value = "In-Progress";
  };

  useEffect(() => {
    setEmData(emData);
  }, [emData, temp]);

  return (
    <div className="table-data">
      <form onSubmit={handleSubmit}>
        <label>
          NAME*
          <input ref={name} required></input>
        </label>

        <label>
          JOB*
          <input ref={job} required></input>
        </label>

        <label>
          STATUS
          <select defaultValue={status} ref={status}>
            <option value="In-Progress">In-Progress</option>
            <option value="Complete">Complete</option>
          </select>
        </label>
        <input type="submit"></input>
      </form>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Job</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {emData.map((row, index) => {
            return (
              <tr key={index}>
                <td>{row.name}</td>
                <td>{row.job}</td>
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
