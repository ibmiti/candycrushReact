import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

// important variables / array's used in game
const width = 8;
const candyColors = [
    'blue',
    'green',
    'orange',
    'purple',
    'red',
    'yellow'
];

// this function defines 1. creation of game board  2. generating random color choices from arr 3. pushing those colors to arr/gameboard
function App() {
    // defining a state for the board
    const [currentColorArrangement, setCurrentColorArrangement] = useState([]);

    // CHECKING FOR MATCHING SQUARES ( 1 )
     // 1. define column of 4. e.g; | [i, i + width, i + width * 3];
    // 2. if every square in the column of 4 is the same as the decided color go to line 3.
    // 3. remove that color and replace with ''
    // 4. which leads to any identify vertical column of 4 with the same color as the decided color being removed.
    // *. setting columns [0, 8, 16, ...]
    const checkForColumnOfFour = () =>{
        for ( let i = 0; i < 39; i++ ){
            const columnOfFour = [i, i + width, i + width * 2, i + width * 3]; //*
            console.log(columnOfFour);
            const decidedColor = currentColorArrangement[i];
            if ( columnOfFour.every(square => currentColorArrangement[square] === decidedColor)){
                columnOfFour.forEach( square => currentColorArrangement[square] = '')
            }
        }
    }

    // CHECKING FOR MATCHING SQUARES ( COLUMNS / VERTICAL ) ) :
    // 1. loop till index 47 of the game board, this will be the check for column of 3.
    // 2. columnOFThree const : represent 3 boxes, started on 3 different indexes or lines...
    // 3. e.g ( columnOfThree ) | [i, i + width, i + width * 2] <- should equal 3 columns
    // 4. Check every elemnent within the columnOFthree, IF the particular square matches the current color arrangement then for each of those items replace the image with an empty string
    // 5. this gives us blank squares on the gameboard.
    // 6. this algorithm will run every 100ms, see : useEffect()..
    const checkForColumnOfThree = () =>{
        for ( let i = 0; i < 47; i++ ){
            const columnOfThree = [i, i + width, i + width * 2];
            const decidedColor = currentColorArrangement[i];
            if ( columnOfThree.every(square => currentColorArrangement[square] === decidedColor)){
                columnOfThree.forEach( square => currentColorArrangement[square] = '')
            }
        }
    }

    // CHECKING FOR MATCHING 4 SQUARES ( ROWS / HORIZONTAL ) :
    // 1. row defined as [0,1,2]
    // 2. if there exists on the board same matching square 3 times then, that is a match
    // 3. notValid : these are the rows we want excluded from checks.. for game logic reasons
    const checkForRowOfThree = () => {
        for ( let i = 0; i < 64; i++ ){
            const rowOfThree = [i, i + 1, i + 2]; // 1.
            const decidedColor = currentColorArrangement[i];
            const notValid = [ 6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64 ];

            if (notValid.includes(i)) continue

            if ( rowOfThree.every(square => currentColorArrangement[square] === decidedColor)){
                rowOfThree.forEach( square => currentColorArrangement[square] = '')
            }
        }
    }

    // Steps
    // 1. do much of what checkForRowOfThree func does.
    // 2. except define row of four
    const checkForRowOfFour = () => {
        for (let i = 0; i < 64; i++ ){
            const rowOfFour = [i, i + 1, i + 2, i + 3];
            const decidedColor = currentColorArrangement[i];
            const notValid = [ 5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64 ];
            if (notValid.includes(i)) continue
            if ( rowOfFour.every(square => currentColorArrangement[square] === decidedColor)){
                rowOfFour.forEach( square => currentColorArrangement[square] = '');
            }
        }
    }
    // CHECKING FOR 3 MATCHING SQUARES ( ROWS / HORIZONTAL ) :
    function createboard() {
    // CREATE BOARD FOR GAME
    // create array of 64 items, will be made of colors above : this will become our board.
        const randomColorArrangement = [];
        for (let i = 0; i < 64; i++){
            const randomNumberFrom0to5 = Math.floor(Math.random() * candyColors.length);
            const randomcolor = candyColors[randomNumberFrom0to5];
            randomColorArrangement.push(randomcolor);
        }
        setCurrentColorArrangement(randomColorArrangement)
    }


    const moveIntoSquareBelow = () => {
    // 1. Purpose : Move all squares above matched row/column group
    // a. squares are matched using the checks within the above methods
    // b. this animates the matched groups up to the top of screen
    // c. while moving non-matched squares to the bottom of screen.
        for ( let i = 0; i < 64 - width; i++ ){
            const firstRow = [ 0, 1, 2, 3, 4, 5, 6, 7 ]
            const isFirstRow = firstRow.includes(i)

            if (isFirstRow && currentColorArrangement[i] === '') {
                let randomNumber = Math.floor(Math.random() * candyColors.length);
                currentColorArrangement[i] = candyColors[randomNumber];
            }

            if ((currentColorArrangement[i + width]) === ''){
                currentColorArrangement[i + width] = currentColorArrangement[i]
                currentColorArrangement[i] = '';
            }
        }
    }

    // constrains the number of times createboard is called to 1
    // useEffect 1. causes the createBoard to be called as a sideeffect of the App functions being called once. 2. the empty arr when filled becomes the listener for events, so if we placed width var within and it changes this func will execute
    useEffect(() => {
        createboard();
    }, []);

    // GAME LOGIC ( 2 )
    // 1. after board is created, these are the next set of actions :
    // 2. clears the setInterval timer
    // 3. every 100ms run: checkForColumnOfThree
    // 4. if matching color/square is found,
    // 5. when the checkForColumnThree runs returns, the useEffect() is executed again.
    // 6. spreading the currentColorArrangement and setting the items into the setCurrentColorArrangement
    // 7. goal : create a column of three with no content inside.

    useEffect(() => {
        const timer = setInterval(()=>{
            checkForColumnOfFour();
            checkForRowOfFour();
            checkForColumnOfThree();
            checkForRowOfThree();
            moveIntoSquareBelow();
            setCurrentColorArrangement([...currentColorArrangement]);
        }, 100)
        return () => clearInterval(timer)
    }, [checkForColumnOfThree, checkForColumnOfFour, checkForRowOfThree, checkForRowOfFour, moveIntoSquareBelow, currentColorArrangement])

    console.log(currentColorArrangement);





    // this is the visual build of the site
  return (
    <div className="App">
        <div className="game">
            { currentColorArrangement.map((candyColor, index) => (
                <img
                    key={index}
                    style={{backgroundColor: candyColor}}
                    alt={candyColor}
                />
            ))}
        </div>
     </div>
  )
}

export default App;
