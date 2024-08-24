import React, { useEffect, useState } from "react";
import "./Display.module.css";
import Popup from "../PopUp/Popup";
import Styles from "./DisplayCourseInstance.module.css";
import Popup2 from "../PopUp/Popup2";
import Toast from "../Toast/Toast";

const Display = () => {
  const [course, setCourse] = useState([]);
  const [error, setError] = useState("");
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupData, setPopupData] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const showPopup = (data) => {
    setIsPopupVisible(true);
    setPopupData(data);
  };

  const hidePopup = () => {
    setIsPopupVisible(false);
  };

  useEffect(() => {
    const fetchCourseInstances = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/courseList", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          // console.log(data);
          setCourse(data);
          console.log(course);
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
    fetchCourseInstances();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/courseList/" + id,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        setCourse((prevCourses) =>
          prevCourses.filter((course) => course.id !== id)
        );
        setToastMessage("Course deleted successfully!");
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
    <div style={{ margin: "50px" }}>
      {course !== null ? (
        <table>
          <tbody>
            <tr>
              <th>course title</th>
              <th>course code</th>
              <th>action</th>
            </tr>

            {course.map((data, id) => {
              return (
                <tr key={id}>
                  <td>{data.title}</td>
                  <td>{data.courseCode}</td>

                  <td
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <i
                      className="bi bi-search"
                      onClick={() => showPopup(data)}
                      style={{ cursor: "pointer" }}
                    ></i>
                    <i
                      className="bi bi-trash-fill"
                      onClick={() => handleDelete(data.id)}
                      style={{ cursor: "pointer" }}
                    ></i>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div> no data is present</div>
      )}

      <div className={Styles.container}>
        <div>
          {isPopupVisible && (
            <Popup2 handleClose={hidePopup} popupData={popupData} />
          )}
        </div>
      </div>
      <div>
        {showToast && (
          <Toast message={toastMessage} onClose={() => setShowToast(false)} />
        )}
      </div>
    </div>
  );
};

export default Display;
