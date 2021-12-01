import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';


// this function defines 1. creation of game board  2. generating random color choices from arr 3. pushing those colors to arr/gameboard

// BOARD STATE CONSTANTS

// CHECKING FOR MATCHING SQUARES ( 1 )
// 1. define column of 4. e.g; | [i, i + width, i + width * 3];
// 2. if every square in the column of 4 is the same as the decided color go to line 3.
// 3. remove that color and replace with ''
// 4. which leads to any identify vertical column of 4 with the same color as the decided color being removed.
// *. setting columns [0, 8, 16, ...]

// CHECKING FOR MATCHING SQUARES ( COLUMNS / VERTICAL ) ) :
// 1. loop till index 47 of the game board, this will be the check for column of 3.
// 2. columnOFThree const : represent 3 boxes, started on 3 different indexes or lines...
// 3. e.g ( columnOfThree ) | [i, i + width, i + width * 2] <- should equal 3 columns
// 4. Check every elemnent within the columnOFthree, IF the particular square matches the current color arrangement then for each of those items replace the image with an empty string
// 5. this gives us blank squares on the gameboard.
// 6. this algorithm will run every 100ms, see : useEffect()..

// CHECKING FOR MATCHING 4 SQUARES ( ROWS / HORIZONTAL ) :
// 1. row defined as [0,1,2]
// 2. if there exists on the board same matching square 3 times then, that is a match
// 3. notValid : these are the rows we want excluded from checks.. for game logic reasons

// Steps
// 1. do much of what checkForRowOfThree func does.
// 2. except define row of four

// Dragging Behaviour of SQUARES
// 1. dom element animations: a. dragStart b. dragDrop c. dragEnd


// 1. Purpose : Move all squares above matched row/column group
// a. squares are matched using the checks within the above methods
// b. this animates the matched groups up to the top of screen
// c. while moving non-matched squares to the bottom of screen.

// CHECKING FOR 3 MATCHING SQUARES ( ROWS / HORIZONTAL ) :

// CREATE BOARD FOR GAME
// create array of 64 items, will be made of colors above : this will become our board.

// constrains the number of times createboard is called to 1
// useEffect 1. causes the createBoard to be called as a sideeffect of the App functions being called once. 2. the empty arr when filled becomes the listener for events, so if we placed width var within and it changes this func will execute

// GAME LOGIC ( 2 )
// 1. after board is created, these are the next set of actions :
// 2. clears the setInterval timer
// 3. every 100ms run: checkForColumnOfThree
// 4. if matching color/square is found,
// 5. when the checkForColumnThree runs returns, the useEffect() is executed again.
// 6. spreading the currentColorArrangement and setting the items into the setCurrentColorArrangement
// 7. goal : create a column of three with no content inside.

// this is the visual build of the site



const width = 8;
const candyColors = [
    'blue',
    'green',
    'orange',
    'purple',
    'red',
    'yellow'
];

function App() {

    const [currentColorArrangement, setCurrentColorArrangement] = useState([]);
    const [ squareBeingDragged, setSquareBeingDragged] = useState(null)
    const [ squareBeingReplaced, setSquareBeingReplaced] = useState(null)

    const checkForColumnOfFour = () =>{
        for ( let i = 0; i < 39; i++ ){
            const columnOfFour = [i, i + width, i + width * 2, i + width * 3]; //*
            const decidedColor = currentColorArrangement[i];
            if ( columnOfFour.every(square => currentColorArrangement[square] === decidedColor)){
                columnOfFour.forEach( square => currentColorArrangement[square] = '')
                return true;
            }
        }
    }
    const checkForRowOfFour = () => {
        for (let i = 0; i < 64; i++ ){
            const rowOfFour = [i, i + 1, i + 2, i + 3];
            const decidedColor = currentColorArrangement[i];
            const notValid = [ 5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64 ];
            if (notValid.includes(i)) continue
            if ( rowOfFour.every(square => currentColorArrangement[square] === decidedColor)){
                rowOfFour.forEach( square => currentColorArrangement[square] = '');
                return true;
            }
        }
    }

    const checkForColumnOfThree = () =>{
        for ( let i = 0; i < 47; i++ ){
            const columnOfThree = [i, i + width, i + width * 2];
            const decidedColor = currentColorArrangement[i];
            if ( columnOfThree.every(square => currentColorArrangement[square] === decidedColor)){
                columnOfThree.forEach( square => currentColorArrangement[square] = '');
                return true;
            }
        }
    }

    const checkForRowOfThree = () => {
        for ( let i = 0; i < 64; i++ ){
            const rowOfThree = [i, i + 1, i + 2]; // 1.
            const decidedColor = currentColorArrangement[i];
            const notValid = [ 6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64 ];

            if (notValid.includes(i)) continue

            if ( rowOfThree.every(square => currentColorArrangement[square] === decidedColor)){
                rowOfThree.forEach( square => currentColorArrangement[square] = '');
                return true;
            }
        }
    }



    const dragStart = (e) => {
        console.log(e.target);
        console.log('drag start func');
        setSquareBeingDragged(e.target);
    }

    const dragDrop = (e) => {
        console.log(e.target);
        console.log('drag drop ');
        setSquareBeingReplaced(e.target);
    }

    const dragEnd = (e) => {
        const squareBeingDraggedId = parseInt(squareBeingDragged.getAttribute('data-id'));
        const squareBeingReplacedId = parseInt(squareBeingReplaced.getAttribute('data-id'));

        currentColorArrangement[squareBeingReplacedId] = squareBeingDragged.style.backgroundColor;
        currentColorArrangement[squareBeingDraggedId] = squareBeingReplaced.style.backgroundColor;

        console.log('squareBeingDraggedId', squareBeingDraggedId);
        console.log('squareBeingReplacedId', squareBeingReplacedId);

        // valid move
        const validMoves = [
            squareBeingDraggedId -1,
            squareBeingDraggedId - width,
            squareBeingDraggedId + 1,
            squareBeingDraggedId + width
        ]

        const validMove = validMoves.includes(squareBeingReplacedId) // returns : true / false

        // these 4 methods return : 1. true,false 2. other
        const isAColumnOfFour = checkForColumnOfFour();
        console.log(isAColumnOfFour);
        const isARowOfFour = checkForRowOfFour();
        const isAColumnOfThree = checkForColumnOfThree();
        const isARowOfThree = checkForRowOfThree();

        if (squareBeingReplacedId && validMove && ( isAColumnOfFour || isARowOfFour || isAColumnOfThree || isARowOfThree )) {
            // removing square from prev. position if : all above cond. met
            setSquareBeingDragged(null);
            setSquareBeingReplaced(null);
        } else { // if condition not met : place the squares back to origin positions.
            currentColorArrangement[squareBeingReplacedId] = squareBeingReplaced.style.backgroundColor;
            currentColorArrangement[squareBeingDraggedId] = squareBeingDragged.style.backgroundColor;
            setCurrentColorArrangement([...currentColorArrangement]);
        }

    }

    function createboard() {
        const randomColorArrangement = [];
        for (let i = 0; i < 64; i++){
            const randomNumberFrom0to5 = Math.floor(Math.random() * candyColors.length);
            const randomcolor = candyColors[randomNumberFrom0to5];
            randomColorArrangement.push(randomcolor);
        }
        setCurrentColorArrangement(randomColorArrangement);
    }


    const moveIntoSquareBelow = () => {
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

    useEffect(() => {
        createboard();
    }, []);

    useEffect(() => {
        const timer = setInterval(()=>{
            checkForColumnOfFour();
            checkForRowOfFour();
            checkForColumnOfThree();
            checkForRowOfThree();
            moveIntoSquareBelow();
            setCurrentColorArrangement([...currentColorArrangement]);
        }, 300)
        return () => clearInterval(timer)
    }, [checkForColumnOfThree, checkForColumnOfFour, checkForRowOfThree, checkForRowOfFour, moveIntoSquareBelow, currentColorArrangement])

  return (
    <div className="App">
        <div className="game">
            { currentColorArrangement.map((candyColor, index) => (
                <img
                    key={index}
                    style={{backgroundColor: candyColor}}
                    alt={candyColor}
                    data-id={index}
                    draggable={true}
                    onDragStart={dragStart}
                    onDragOver={(e) => e.preventDefault()}
                    onDragEnter={(e) => e.preventDefault()}
                    onDragLeave={(e) => e.preventDefault()}
                    onDrop={dragDrop}
                    onDragEnd={dragEnd}
                />
            ))}
        </div>
     </div>
  )
}

export default App;
