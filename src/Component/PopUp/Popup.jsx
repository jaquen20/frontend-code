import React from "react";
import Styles from "./Popup.module.css";

const Popup = ({ handleClose, popupData }) => {
  console.log(popupData);
  return (
    <div>
      <div className={Styles.popupOverlay}>
        <div className={Styles.popup}>
          <button className={Styles.closeButton} onClick={handleClose}>
            X
          </button>
          <div className={Styles.content}>
            <h2>course details</h2>

            <table>
              <tbody>
                <tr>
                  <th>course title</th>
                  <th>course details</th>
                  <th>course code</th>
                  <th>semester</th>
                  <th>year</th>
                </tr>
                <tr>
                  <td>{popupData.course.title}</td>
                  <td>{popupData.course.description}</td>
                  <td>{popupData.course.courseCode}</td>
                  <td>{popupData.semester}</td>
                  <td>{popupData.year}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
