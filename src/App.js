import './App.css';
import { useEffect, useState } from 'react';
import blueSquare from './images/blue.jpeg';
import greenSquare from './images/green.jpeg';
import orangeSquare from './images/orange.jpeg';
import purpleSquare from './images/purple.jpeg';
import redSquare from './images/red.jpeg';
import yellowSquare from './images/yellow.jpeg';
import blank from './images/blank.jpeg';


// What happening here
// 1. a board is created
// 2. that board is filled with images
// 3. the board is has 64 total images / squares
// 4. Board has 8 rows 8 columns ( 8 x 8 : 64 total squares )
// 5. Row of 3 is defined : [0,1,2] ( row of 3 squares )
// 6. Column of 3 is defined as : [i, i + width, i + width * 3] or [ 0, 8, 16]
// 7. Column of 4 : [ 0, 8 , 16, 24 ] or  [i, i + width, i + width * 2, i + width * 3];
// 8. Row of 4 : [0,1,2,3]
// ...


// CHECKING FOR MATCHING SQUARES ( 1 )
// 1. define column of 4. e.g; | [i, i + width, i + width * 3];
// 2. if every square in the column of 4 is the same as the decided color go to line 3.
// 3. remove that color and replace with blank
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


// Dragging Behaviour of SQUARES :
// 1. dom element animations: a. dragStart b. dragDrop c. dragEnd

// ANIMATION OF THE BOARD WHEN SQUARES ARE MATCHED :
// 1. Purpose : Move all squares above matched row/column group
// a. squares are matched using the checks within the above methods
// b. this animates the matched groups up to the top of screen
// c. while moving non-matched squares to the bottom of screen.

// RESTRAINTS PLACED ON GAME BOARD AND DOM
// constrains the number of times createboard is called to 1
// useEffect 1. causes the createBoard to be called as a sideeffect of the App functions being called once. 2. the empty arr when filled becomes the listener for events, so if we placed width var within and it changes this func will execute

const width = 8;
const squareColors = [
    blueSquare,
    greenSquare,
    orangeSquare,
    purpleSquare,
    redSquare,
    yellowSquare
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
                columnOfFour.forEach( square => currentColorArrangement[square] = blank)
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
                rowOfFour.forEach( square => currentColorArrangement[square] = blank);
                return true;
            }
        }
    }

    const checkForColumnOfThree = () =>{
        for ( let i = 0; i < 47; i++ ){
            const columnOfThree = [i, i + width, i + width * 2];
            const decidedColor = currentColorArrangement[i];
            if ( columnOfThree.every(square => currentColorArrangement[square] === decidedColor)){
                columnOfThree.forEach( square => currentColorArrangement[square] = blank);
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
                rowOfThree.forEach( square => currentColorArrangement[square] = blank);
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

        currentColorArrangement[squareBeingReplacedId] = squareBeingDragged.getAttribute('src');
        currentColorArrangement[squareBeingDraggedId] = squareBeingReplaced.getAttribute('src');

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
            currentColorArrangement[squareBeingReplacedId] = squareBeingReplaced.getAttribute('src');
            currentColorArrangement[squareBeingDraggedId] = squareBeingDragged.getAttribute('src');
            setCurrentColorArrangement([...currentColorArrangement]);
        }

    }

    function createboard() {
        const randomColorArrangement = [];
        for (let i = 0; i < 64; i++){
            const randomNumberFrom0to5 = Math.floor(Math.random() * squareColors.length);
            const randomcolor = squareColors[randomNumberFrom0to5];
            randomColorArrangement.push(randomcolor);
        }
        setCurrentColorArrangement(randomColorArrangement);
    }


    const moveIntoSquareBelow = () => {
        for ( let i = 0; i < 64 - width; i++ ){
            const firstRow = [ 0, 1, 2, 3, 4, 5, 6, 7 ]
            const isFirstRow = firstRow.includes(i)

            if (isFirstRow && currentColorArrangement[i] === blank) {
                let randomNumber = Math.floor(Math.random() * squareColors.length);
                currentColorArrangement[i] = squareColors[randomNumber];
            }

            if ((currentColorArrangement[i + width]) === blank){
                currentColorArrangement[i + width] = currentColorArrangement[i]
                currentColorArrangement[i] = blank;
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
            { currentColorArrangement.map((squareColor, index) => (
                <img
                    key={index}
                    src={squareColor}
                    alt={squareColor}
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
