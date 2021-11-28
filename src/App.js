import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

// reference : https://www.youtube.com/watch?v=PBrEq9Wd6_U

// important variables / array's used in game
const width = 8;
const candycolors = [
    'blue',
    'green',
    'orange',
    'purple',
    'red',
    'yellow'
];

function App() {
    // defining a state for the board
    const [currentColorArrangement, setCurrentColorArrangement] = useState([]);

    // create array of 64 items, will be made of colors above : this will become our board.
    function createboard() {
        const randomColorArrangement = [];
        for (let i = 0; i < 64; i++){
            const randomNumberFrom0to5 = Math.floor(Math.random() * candycolors.length);
            const randomcolor = candycolors[randomNumberFrom0to5];
            randomColorArrangement.push(randomcolor);
        }
        setCurrentColorArrangement(randomColorArrangement)
    }

    // constrains the number of times createboard is called to 1
    useEffect(() => {
        createboard();
    }, [])


    console.log(currentColorArrangement);

  return (
    <div className="App"> </div>
  );
}

export default App;
