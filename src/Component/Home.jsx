import React, { useCallback, useState } from "react";
import AddCourse from "./AddCourse/AddCourse";
import DisplayCourseInstance from "./DisplayCourse/DisplayCourseInstance";
import Display from "./DisplayCourse/Display";
import AddCourseInstance from "./AddCourse/AddCourseInstance";
import Styles from "./Home.module.css";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(null);

  return (
    <div>
      <header className={Styles.fixedHeader}>
        <nav className="navbar navbar-expand-lg navbar-light bg-green">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <a className="nav-link">
                  <div
                    onClick={() => {
                      setCurrentPage("addCourse");
                    }}
                  >
                    Add course
                  </div>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link">
                  <div
                    onClick={() => {
                      setCurrentPage("displayCourse");
                    }}
                  >
                    Display course
                  </div>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link">
                  <div
                    onClick={() => {
                      setCurrentPage("AddInstance");
                    }}
                  >
                    Add course instance
                  </div>
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link">
                  <div
                    onClick={() => {
                      setCurrentPage("displayInstanceCourse");
                    }}
                  >
                    Display course instance
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      <div className={Styles.card}>
        {currentPage == "addCourse" && (
          <div>
            <AddCourse />
          </div>
        )}
        {currentPage == "displayInstanceCourse" && (
          <div>
            <DisplayCourseInstance />
          </div>
        )}
        {currentPage == "displayCourse" && (
          <div>
            <Display />
          </div>
        )}
        {currentPage == "AddInstance" && (
          <div>
            <AddCourseInstance />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
