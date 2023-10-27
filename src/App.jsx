import { Navigate, Outlet } from "react-router-dom";
import styles from './App.module.css';
import './App.css'


const App = () => {

    return (
    <div id='main' className={styles.main}>
      <h1 className={styles.heading}>
        Find The Animal!
      </h1>
      <Outlet />
    </div>
    
)}

export default App