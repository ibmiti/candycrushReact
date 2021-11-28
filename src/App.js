import logo from './logo.svg';
import './App.css';

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
// create array of 64 items, will be made of colors above
function App() {
    function createboard() {
        const randomcolorarrangement = [];
        for (let i = 0; i < 64; i++){
            const randomNumberFrom0to5 = Math.floor(Math.random() * candycolors.length);
            const randomcolor = candycolors[randomNumberFrom0to5];
            randomcolorarrangement.push(randomcolor);
        }
        console.log(randomcolorarrangement); // print the array on end of loop
    }

    createboard();

  return (
    <div className="App"> </div>
  );
}

export default App;
