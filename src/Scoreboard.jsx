import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import styles from './Scoreboard.module.css';

function Scoreboard() {
    const [submit, setSubmit] = useState(false);
    const [name, setName] = useState('');
    const [ranking, setRanking] = useState([]);
    const [time, setTime] = useState('');
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(()=> {
        async function getTime() {
            try {
                const response = await fetch('https://frosty-field-5257.fly.dev/time', {
                    method: 'GET',
                    credentials: 'include',
                })
                if(response.ok) {
                    const data = await response.json();
                    setTime(data.time);
                    setError(null)
                } else {
                    throw new Error('Failed to fetch API. Code:', response.status)
                }
            } catch(error) {
                setError(error.message);
                setTime(null);
            } finally {
                setLoading(false);
            }
        }

        getTime();

    }, [])

    const navigate = useNavigate();

    function inputChange(e) {
        setName(e.target.value)
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true)
        
        try {
            const response = await fetch('https://frosty-field-5257.fly.dev/name', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name: name})
            })
            if(response.ok) {
                const data = await response.json();
                setRanking(data);
                setSubmit(true);
                setError(null);
            } else {
                console.error('API call failed')
            }
        } catch (error) {
            setError(error.message);
            setRanking(null)
        } finally {
            setLoading(false);
        }
    }

    function handleNewGame() {
        navigate('/');
    }

    if(loading) {
        return <p>Loading...</p>
    }

    if(error) {
        return <p>A network error is encountered: {error.message}</p>
    }

    return (

        <>
        {submit? 
        <div className={styles.center}>
        <h2 className={styles.h2}>Top 5</h2>
        <table className={styles.table}>
            <tbody className={styles.tbody}>
            <tr>
                <th className={styles.th}>Rank</th>
                <th className={styles.th}>Name</th>
                <th className={styles.th}>Time</th>
            </tr>
            {ranking.map((user, index)=>
            <tr className={styles.tr} key={user.id}> 
                <td className={styles.td}>{index + 1}</td>
                <td className={styles.td}>{user.name}</td>
                <td className={styles.td}>{user.time}</td>
            </tr>
            )}
            </tbody>
        </table>
        <button className={styles.submit} onClick={handleNewGame}>New Game</button>
        </div>
        : 
        <div className={styles.result}>
            <h3 className={styles.h3}>Your time is {time} seconds</h3>
            <p className={styles.p}> Input your name to record it on the scoreboard </p>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div>
                <label className={styles.label} htmlFor='name'>Name: </label>
                <input className={styles.input} type='text' id='name' onChange={inputChange} value={name} required/>
                </div>
                <div>
                <button className={styles.submit} type='submit'>Submit</button>
                </div>
            </form>
        </div> 
        
        } </>
        
    )
}

export default Scoreboard;