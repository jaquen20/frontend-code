import React, { useState } from "react";
import "./AddCourse.module.css";
import Styles from "./AddCourse.module.css";
import Toast from "../Toast/Toast";

const AddCourse = () => {
  const [formData, setFormData] = useState({
    courseCode: "",
    courseTitle: "",
    courseDescription: "",
  });

  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    try {
      const response = await fetch("http://localhost:8080/api/courseList", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseCode: formData.courseCode,
          title: formData.courseTitle,
          description: formData.courseDescription,
        }),
      });
      if (response.ok) {
        setFormData({
          courseCode: "",
          courseTitle: "",
          courseDescription: "",
        });
        setToastMessage("Course added successfully!");
        setShowToast(true);
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
    <div className={Styles.container}>
      <div className={Styles.addCourseContainer}>
        <form>
          <input
            type="text"
            id="courseTitle"
            name="courseTitle"
            value={formData.courseTitle}
            onChange={handleInputChange}
            placeholder="Course title.."
          />

          <input
            type="text"
            id="courseCode"
            name="courseCode"
            value={formData.courseCode}
            onChange={handleInputChange}
            placeholder="Course code.."
          />
          <input
            type="text"
            id="courseDescription"
            name="courseDescription"
            value={formData.courseDescription}
            onChange={handleInputChange}
            placeholder="Course description.."
          />
          <input type="button" value="Add Course" onClick={handleSubmit} />
        </form>
      </div>
      {showToast && (
        <Toast message={toastMessage} onClose={() => setShowToast(false)} />
      )}
    </div>
  );
};

export default AddCourse;
