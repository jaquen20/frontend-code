import React, { useEffect, useState } from "react";
import "./AddCourse.module.css";
import Styles from "./AddCourse.module.css";
import Toast from "../Toast/Toast";

const AddCourseInstance = () => {
  const [error, setError] = useState("");
  const [course, setCourse] = useState([]);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const [formData, setFormData] = useState({
    id: "",
    year: "",
    semester: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "id" ? parseInt(value, 10) : value,
    });
  };
  const seeData = () => {
    console.log(formData);
  };

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/courseList", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          setCourse(data);
          console.log(data);
        } else {
          const errorData = response.json;
          setError(errorData.error);
          console.error(errorData);
        }
      } catch (error) {
        setError("un expected error occurred");
        console.error("error", error);
      }
    };
    fetchCourse();
  }, []);

  const handleSubmit = async (e) => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/courseInstanceList",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: formData.id,
            year: formData.year,
            semester: formData.semester,
          }),
        }
      );
      if (response.ok) {
        setToastMessage("Course instance added successfully!");
        setShowToast(true);
        setFormData({
          id: "",
          year: "",
          semester: "",
        });
      } else {
        const errorData = response.json;
        setError(errorData.error);
        console.error(errorData);
      }
    } catch (error) {
      setError("un expected error occurred");
      console.error("error", error);
    }
  };

  return (
    <div>
      <div className={Styles.addCouseInstance}>
        <form>
          <div style={{ display: "flex" }}>
            <select
              id="course"
              name="id"
              value={formData.id}
              onChange={handleInputChange}
            >
              <option value="" hidden>
                select course
              </option>
              {course.map((courses, id) => {
                return (
                  <option key={id} value={courses.id}>
                    {courses.title}
                  </option>
                );
              })}
            </select>
            <button className={Styles.button}>refres</button>
          </div>

          <input
            type="text"
            id="year"
            name="year"
            placeholder=" year.."
            value={formData.year}
            onChange={handleInputChange}
          />

          <input
            type="text"
            id="semester"
            name="semester"
            value={formData.semester}
            placeholder="semester .."
            onChange={handleInputChange}
          />

          <input type="button" value="Add instance" onClick={handleSubmit} />
        </form>
      </div>
      {showToast && (
        <Toast message={toastMessage} onClose={() => setShowToast(false)} />
      )}
    </div>
  );
};

export default AddCourseInstance;
