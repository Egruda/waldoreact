import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useRef } from 'react';

import styles from './Game.module.css';
import { useEffect } from 'react';

function Game() {

    const initialGuess = {x: '', y: '', name: ''};
    const [coordinate, setCoordinate] = useState({x: '', y: ''});
    const [target, setTarget] = useState(false);
    const [message, setMessage] = useState('Quickly find all the animals before they escape!');
    const imageRef = useRef(null);
    const [rect, setRect] = useState({});
    const [guess, setGuess] = useState(initialGuess)

    const [monkey, setMonkey] = useState(true);
    const [alligator, setAlligator] = useState(true);
    const [bird, setBird] = useState(true);
    const [bat, setBat] = useState(true);
    const [leopard, setLeopard] = useState(true);

    const navigate = useNavigate();
    useEffect(() => {
        const newRect = imageRef.current.getBoundingClientRect();
        setRect(newRect);
        
    },[]); 
    
    useEffect(() => {
    
          
    async function submitGuess() {
       console.log(guess)
        setTarget(false);
        try {

        const response = await fetch('http://localhost:3000/target', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(guess)
        })
        
        if(response.ok) {
            
            const data = await response.json();
            setMessage(data.message);
            if(data.animal === 'leopard') {
                setLeopard(false);
            }
            else if(data.animal === 'bat') {
                setBat(false);
            }
            else if(data.animal === 'bird') {
                setBird(false);
            }
            else if(data.animal === 'alligator') {
                setAlligator(false);
            }
            else if(data.animal === 'monkey') {
                setMonkey(false);
            }
            if(data.complete === true) {
                navigate('/result')
            }

        } else {
            console.error('API call failed')
            
        }
        
        } catch(error) {
            console.error('Error:', error)
        }
    }
       
    if (guess === initialGuess) {
        return;
    } else {
            submitGuess()
    }
    
    // return () => {
    //     console.log('cleanup')
    //     firstUpdate.current = true;
    //     setMessage('')
    // }
    }, [guess])

    function handleClick(e) {
        if (window.matchMedia("(max-width: 600px)").matches) {
            console.log('max width 600')
        }

        const scrollDiv = document.querySelector('#main');
        

        const x = window.matchMedia("(max-width: 600px)").matches? (e.pageX + scrollDiv.scrollLeft) : e.pageX- rect.left;
        const y = rect.height - (e.pageY - rect.top);
       
        // console.log('x', x);
        // console.log('pageX', e.pageX)
        // console.log('rectwidth', rect.width)
        // console.log('screenwidth', screen.width)
        // console.log('scrollleft', scrollDiv.scrollLeft)
        // console.log('scrollX', scrollDiv.scrollX)
        // console.log('y', y);
        // console.log('pageY', e.pageY)
        // console.log('rect.bottom', rect.bottom)
       
        setCoordinate({x: x, y: y});
        setTarget(true);
    
    }

    async function handleButton(e) {
        e.stopPropagation();
        console.log(e.target.value.toLowerCase());
        setGuess({...coordinate, name: e.target.value.toLowerCase()})
        
        
        // try {

        // const response = fetch('http://localhost:3000', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type' : 'application/json'
        //     },
        //     credentials: 'include',
        //     body: JSON.stringify(coordinate)
        // })
        
        // if(response.ok) {
        //     setTarget(false);
        //     setCoordinate({x: '', y: '', name: ''});
        //     const data = await response.json();
        //     if(data.complete === true) {
        //         navigate('/scoreboard')
        //     }

        // } else {
        //     console.error('API call failed')
        // }
        
        // } catch(error) {
        //     console.error('Error:', error)
        // }
        
    }

    const bottom = window.matchMedia("(max-width: 600px)").matches? coordinate.y : coordinate.y-90;
    const left = window.matchMedia("(max-width: 600px)").matches? coordinate.y : coordinate.x-90;


    const targetStyle = {
        bottom: coordinate.y-90,
        left: coordinate.x-90,
        position: 'absolute',
        padding: '10px', 
        borderStyle: 'solid',
        borderWidth: '5px',
        borderColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        gap: '5px',
        width: '150px',
        height: '100px'
    }



    function propagation(e) {
        e.stopPropagation();
    }

    return(
        <>
        
         
            <div className={styles.imageDiv} ref={imageRef} onClick={handleClick}>
           
                {target? 
                <div className='target' onClick={propagation} style={targetStyle}>
                    <div className={styles.windowTarget}>
                        
                    </div>
                    <div className={styles.buttons}>
                            {leopard? <input type='button' className={styles.button} onClick={handleButton} value='Leopard'/> : null}
                            {alligator? <input type='button' className={styles.button} onClick={handleButton} value='Alligator'/> : null}
                    </div>
                    <div className={styles.buttons}>
                            {bird? <input type='button' className={styles.button} onClick={handleButton} value='Bird'/> : null}
                            {monkey? <input type='button' className={styles.button} onClick={handleButton} value='Monkey'/> : null}
                            {bat? <input type='button' className={styles.button} onClick={handleButton} value='Bat'/> : null}
                    </div>
                </div>
                : null}
            </div>
        
        <div className={styles.animals}>
        {leopard? <p className={styles.animal}> Leopard </p> : null}
        {alligator? <p className={styles.animal}> Alligator </p> : null}
        {bird? <p className={styles.animal}> Bird </p> : null}
        {monkey? <p className={styles.animal}> Monkey </p> : null}
        {bat? <p className={styles.animal}> Bat </p> : null}
        </div>
        <div className={styles.messageDiv}>
        <p className={styles.message}>{message? message: ' '}</p>
        </div>
        </>
    )

}

export default Game;