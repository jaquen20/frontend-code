import React from "react";
import Styles from "./Popup.module.css";

const Popup2 = ({ handleClose, popupData }) => {
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
                </tr>
                <tr>
                  <td>{popupData.title}</td>
                  <td>{popupData.description}</td>
                  <td>{popupData.courseCode}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup2;
