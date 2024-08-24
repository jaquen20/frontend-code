import React, { useEffect, useState } from "react";
import Styles from "./Toast.module.css";

const Toast = ({ message, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return visible && <div className={Styles.toast}>{message}</div>;
};

export default Toast;
