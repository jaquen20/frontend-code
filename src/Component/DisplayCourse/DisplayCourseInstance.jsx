import React, { useEffect, useState } from "react";
import "./Display.module.css";
import Popup from "../PopUp/Popup";
import Styles from "./DisplayCourseInstance.module.css";
import Toast from "../Toast/Toast";

const DisplayCourseInstance = () => {
  const [courseInstance, setCourseInstances] = useState([]);
  const [error, setError] = useState("");
  const [semester, setSemester] = useState(null);
  const [year, setYear] = useState(null);
  const [popupData, setPopupData] = useState(null);

  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const [isPopupVisible, setIsPopupVisible] = useState(false);

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
        const response = await fetch(
          "http://localhost:8080/api/courseInstanceList",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setCourseInstances(data);
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
    fetchCourseInstances();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/courseInstanceList/" + id,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        setCourseInstances(courseInstance.filter((course) => course.id !== id));
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

  const searchQuery = async (year, semester) => {
    let query = "http://localhost:8080/api/courseInstanceList/search?";
    if (year) {
      query += `year=${year}&`;
    }
    if (semester) {
      query += `semester=${semester}&`;
    }

    // Remove trailing '&' if present
    query = query.endsWith("&") ? query.slice(0, -1) : query;

    try {
      const response = await fetch(
        query,
        // `http://localhost:8080/api/courseInstanceList/search?year=${year}&semester=${semester}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setCourseInstances(data);
      } else {
        const errorData = await response.json(); // Correct

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
      {courseInstance.length > 0 ? (
        <div>
          <table>
            <thead>
              <tr>
                <th>
                  <input
                    type="text"
                    id="year"
                    name="year"
                    placeholder=" year.."
                    onChange={(e) =>
                      setYear(parseInt(e.target.value, 10) || null)
                    }
                  />
                </th>
                <th>
                  <select
                    id="course"
                    name="semester"
                    onChange={(e) =>
                      setSemester(parseInt(e.target.value, 10) || null)
                    }
                  >
                    <option value="" hidden>
                      select semester
                    </option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                  </select>
                </th>
                <th>
                  <button
                    type="button"
                    onClick={() => searchQuery(year, semester)}
                  >
                    search
                  </button>
                </th>
              </tr>
            </thead>
          </table>
          <br />
          <table>
            <tbody>
              <tr>
                <th>course title</th>
                <th>Year-sem</th>
                <th>course code</th>
                <th>Action</th>
              </tr>
              {courseInstance.map((data, id) => {
                return (
                  <tr key={id}>
                    <td>{data.course.title}</td>
                    <td>
                      {data.year}-{data.semester}
                    </td>
                    <td>{data.course.courseCode}</td>

                    <td
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
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
        </div>
      ) : (
        <div> no data is present</div>
      )}
      <div className={Styles.container}>
        <div>
          {isPopupVisible && (
            <Popup handleClose={hidePopup} popupData={popupData} />
          )}
        </div>
      </div>
      {showToast && (
        <Toast message={toastMessage} onClose={() => setShowToast(false)} />
      )}
    </div>
  );
};

export default DisplayCourseInstance;
