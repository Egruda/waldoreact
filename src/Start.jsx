import { useNavigate } from 'react-router-dom';
import styles from './Start.module.css'


function Start() {

    const navigate = useNavigate();
    
    const handleClick = async () => {
        try {
            const response = await fetch('http://localhost:3000', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                mode: 'cors',
            });
            if(response.ok) {
                navigate('/Game')
            } else {
                console.error('API call failed')
            } 
        } catch(error) {
            console.error('Error:', error);
        }
        
        
    }

    return(
        <div className={styles.center}>
        <h1 className={styles.title}> Find The Animal! </h1>
        <button className={styles.button} onClick={handleClick}>Start</button>
        </div>
    )
}

export default Start;