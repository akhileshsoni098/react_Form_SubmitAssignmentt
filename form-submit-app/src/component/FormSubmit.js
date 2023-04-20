import React, { useState } from 'react';
import './FormSubmit.css';

function FormSubmit() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [education, setEducation] = useState('');
  const [about, setAbout] = useState('');
  const [students, setStudents] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const student = { name, age, email, education, about};
    setStudents([...students, student]);
    setName('');
    setAge('');
    setEmail('');
    setEducation('');
    setAbout('');
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Student Form</h2>
      <form className="form" onSubmit={handleSubmit}>
        <label className="form-label">
          Name:
          <input className="form-input" type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />
        <label className="form-label">
          Age:
          <input className="form-input" type="number" value={age} onChange={(e) => setAge(e.target.value)} />
        </label>
        <br />
        <label className="form-label">
          Email:
          <input className="form-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <label className="form-label">
        Education:
          <input className="form-input" type="text" value={education} onChange={(e) => setEducation(e.target.value)} />
        </label>

        <br />
        <label className="form-label">
        About:
       <p>
          <input className="form-input" type="text" value={about} onChange={(e) => setAbout(e.target.value)} />
          </p>
        </label>
        <br />
        <button className="form-button" type="submit">Submit</button>
      </form>
      <h2 className="table-title">Students</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Education</th>
            <th>About</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>{student.name}</td>
              <td>{student.age}</td>
              <td>{student.email}</td>
              <td>{student.education}</td>
              <td>{student.about}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FormSubmit;
