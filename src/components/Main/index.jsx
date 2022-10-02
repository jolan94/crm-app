import styles from "./styles.module.css";
import { useState, useEffect } from "react";

const Main = () => {
  const API = "http://localhost:8080";
  // const API = "https://jerline-app.herokuapp.com";
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };
  const [crm, setCrm] = useState([]);
  useEffect(() => {
    fetch(`${API}/crmapp`)
      .then((data) => data.json())
      .then((fts) => setCrm(fts));
  }, []);
  return (
    <div className={styles.main_container}>
      <nav className={styles.navbar}>
        <h1>CRM Application</h1>
        <button className={styles.white_btn} onClick={handleLogout}>
          Logout
        </button>
      </nav>
      <div>
      <p>hello world</p>
        <ul className={styles.list}>
          {crm.map((fts) => (
            <CRM crmdata={fts} />
          ))}
        </ul>
      </div>
    </div>
  );
};

function CRM({ crmdata }) {
  return (
    <div className={styles.movie_data}>
     
      <li className={styles.item}>
        <img src={crmdata.img} alt={crmdata.name} />
        <h2>{crmdata.name}</h2>
      </li>
    </div>
  );
}

export default Main;
