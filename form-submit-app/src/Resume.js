import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './styles.module.css';
function ResumeForm() {
  const [resumeData, setResumeData] = useState({
    name: '',
    summary: '',
    contact: {
      email: '',
      phone: '',
    },
    dob: '',
    address: {
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
    },
    education: [
      {
        school: '',
        degree: '',
        date: '',
      },
    ],
    work: [
      {
        title: '',
        company: '',
        date: '',
      },
    ],
    skills: [
      {
        name: '',
        rating: 0,
      },
    ],
    projects: [
      {
        title: '',
        description: '',
        date: '',
        projectLink: '',
      },
    ],
    links: [
      {
        url: '',
        name: '',
      },
    ],
    languages: [],
    certifications: [
      {
        title: '',
        issuingOrganization: '',
        date: '',
      },
    ],
    awards: [
      {
        title: '',
        issuingOrganization: '',
        date: '',
      },
    ],
    volunteerExperience: [
      {
        title: '',
        organization: '',
        date: '',
      },
    ],
    interests: [],
    references: [
      {
        name: '',
        company: '',
        position: '',
        email: '',
        phone: '',
      },
    ],
  });

  const [skillsList, setSkillsList] = useState({
    status: true,
    data: [],
  });

  useEffect(() => {
    // Fetch the list of skills from the API
    const fetchSkills = async () => {
      try {
        const response = await axios.get('http://localhost:3001/admin/skills');
        setSkillsList(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching skills:', error);
      }
    };

    fetchSkills();
  }, []);



 
  const handleChange = (event) => {
    const { name, value } = event.target;
    const fieldNameArray = name.split('.');

    if (fieldNameArray.length === 1) {
      setResumeData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else if (fieldNameArray.length === 2) {
      setResumeData((prevData) => ({
        ...prevData,
        [fieldNameArray[0]]: {
          ...prevData[fieldNameArray[0]],
          [fieldNameArray[1]]: value,
        },
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/create-resume', resumeData);
      console.log(response.data);
      // Reset the form or display a success message
    } catch (error) {
      console.error(error);
      // Handle error here
    }
  };

  return (
    <div className={`${styles.resumeForm} ${styles.formSection}`}>
    <h2>Create Resume</h2>
    <form onSubmit={handleSubmit}>
      <label>Name:</label>
      <input type="text" name="name" value={resumeData.name} onChange={handleChange} />

      <label>Summary:</label>
      <textarea name="summary" value={resumeData.summary} onChange={handleChange} />

      <label>Email:</label>
      <input type="text" name="contact.email" value={resumeData.contact.email} onChange={handleChange} />

      <label>Phone:</label>
      <input type="text" name="contact.phone" value={resumeData.contact.phone} onChange={handleChange} />

      <label>Date of Birth:</label>
      <input type="text" name="dob" value={resumeData.dob} onChange={handleChange} />

      <label>Street:</label>
      <input type="text" name="address.street" value={resumeData.address.street} onChange={handleChange} />

      <label>City:</label>
      <input type="text" name="address.city" value={resumeData.address.city} onChange={handleChange} />

      <label>State:</label>
      <input type="text" name="address.state" value={resumeData.address.state} onChange={handleChange} />

      <label>Postal Code:</label>
      <input type="text" name="address.postalCode" value={resumeData.address.postalCode} onChange={handleChange} />

      <label>Country:</label>
      <input type="text" name="address.country" value={resumeData.address.country} onChange={handleChange} />

      {/* Education */}
      <h3>Education</h3>
        {resumeData.education.map((edu, index) => (
          <div key={index}>
            <label>School:</label>
            <input type="text" name={`education.${index}.school`} value={edu.school} onChange={handleChange} />

            <label>Degree:</label>
            <input type="text" name={`education.${index}.degree`} value={edu.degree} onChange={handleChange} />

            <label>Date:</label>
            <input type="text" name={`education.${index}.date`} value={edu.date} onChange={handleChange} />
          </div>
        ))}

        {/* Work */}
        <h3>Work</h3>
        {resumeData.work.map((job, index) => (
          <div key={index}>
            <label>Title:</label>
            <input type="text" name={`work.${index}.title`} value={job.title} onChange={handleChange} />

            <label>Company:</label>
            <input type="text" name={`work.${index}.company`} value={job.company} onChange={handleChange} />

            <label>Date:</label>
            <input type="text" name={`work.${index}.date`} value={job.date} onChange={handleChange} />
          </div>
        ))}

   {/* Skills */}
 {/* Skills */}
 <h3>Skills</h3>
        {resumeData.skills.map((skill, index) => (
          <div key={index}>
            <label>Skill:</label>
            <select
              name={`skills.${index}.name`}
              value={skill.name}
              onChange={handleChange}
            >
              <option value="">Select a skill</option>
              {skillsList.data.map((skillItem) => (
                <option key={skillItem._id} value={skillItem.skills}>
                  {skillItem.skills}
                </option>
              ))}
            </select>
 
            {skill.name && (
              <div>
                <label>Rating:</label>
                <input
                  type="number"
                  name={`skills.${index}.rating`}
                  value={skill.rating}
                  onChange={handleChange}
                />
              </div>
            )}
          </div>
        ))}

        {/* Projects */}
        <h3>Projects</h3>
        {resumeData.projects.map((project, index) => (
          <div key={index}>
            <label>Title:</label>
            <input type="text" name={`projects.${index}.title`} value={project.title} onChange={handleChange} />

            <label>Description:</label>
            <textarea name={`projects.${index}.description`} value={project.description} onChange={handleChange} />

            <label>Date:</label>
            <input type="text" name={`projects.${index}.date`} value={project.date} onChange={handleChange} />

            <label>Project Link:</label>
            <input type="text" name={`projects.${index}.projectLink`} value={project.projectLink} onChange={handleChange} />
          </div>
        ))}

        {/* Links */}
        <h3>Links</h3>
        {resumeData.links.map((link, index) => (
          <div key={index}>
            <label>Name:</label>
            <input type="text" name={`links.${index}.name`} value={link.name} onChange={handleChange} />

            <label>URL:</label>
            <input type="text" name={`links.${index}.url`} value={link.url} onChange={handleChange} />
          </div>
        ))}

        {/* Languages */}
        <h3>Languages</h3>
        <ul>
          {resumeData.languages.map((language, index) => (
            <li key={index}>
              <input type="text" name={`languages.${index}`} value={language} onChange={handleChange} />
            </li>
          ))}
        </ul>

        {/* Certifications */}
        <h3>Certifications</h3>
        {resumeData.certifications.map((certification, index) => (
          <div key={index}>
            <label>Title:</label>
            <input type="text" name={`certifications.${index}.title`} value={certification.title} onChange={handleChange} />

            <label>Issuing Organization:</label>
            <input type="text" name={`certifications.${index}.issuingOrganization`} value={certification.issuingOrganization} onChange={handleChange} />

            <label>Date:</label>
            <input type="text" name={`certifications.${index}.date`} value={certification.date} onChange={handleChange} />
          </div>
        ))}

        {/* Awards */}
        <h3>Awards</h3>
        {resumeData.awards.map((award, index) => (
          <div key={index}>
            <label>Title:</label>
            <input type="text" name={`awards.${index}.title`} value={award.title} onChange={handleChange} />

            <label>Issuing Organization:</label>
            <input type="text" name={`awards.${index}.issuingOrganization`} value={award.issuingOrganization} onChange={handleChange} />

            <label>Date:</label>
            <input type="text" name={`awards.${index}.date`} value={award.date} onChange={handleChange} />
          </div>
        ))}

        {/* Volunteer Experience */}
        <h3>Volunteer Experience</h3>
        {resumeData.volunteerExperience.map((experience, index) => (
          <div key={index}>
            <label>Title:</label>
            <input type="text" name={`volunteerExperience.${index}.title`} value={experience.title} onChange={handleChange} />

            <label>Organization:</label>
            <input type="text" name={`volunteerExperience.${index}.organization`} value={experience.organization} onChange={handleChange} />

            <label>Date:</label>
            <input type="text" name={`volunteerExperience.${index}.date`} value={experience.date} onChange={handleChange} />
          </div>
        ))}

        {/* Interests */}
        <h3>Interests</h3>
        <ul>
          {resumeData.interests.map((interest, index) => (
            <li key={index}>
              <input type="text" name={`interests.${index}`} value={interest} onChange={handleChange} />
            </li>
          ))}
        </ul>

        {/* References */}
        <h3>References</h3>
        {resumeData.references.map((reference, index) => (
          <div key={index}>
            <label>Name:</label>
            <input type="text" name={`references.${index}.name`} value={reference.name} onChange={handleChange} />

            <label>Company:</label>
            <input type="text" name={`references.${index}.company`} value={reference.company} onChange={handleChange} />

            <label>Position:</label>
            <input type="text" name={`references.${index}.position`} value={reference.position} onChange={handleChange} />

            <label>Email:</label>
            <input type="text" name={`references.${index}.email`} value={reference.email} onChange={handleChange} />

            <label>Phone:</label>
            <input type="text" name={`references.${index}.phone`} value={reference.phone} onChange={handleChange} />
          </div>
        ))}
        
        <button type="submit">Download Resume</button>
      </form>
    </div>
  );
}

export default ResumeForm;


