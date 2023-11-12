import { useState, useEffect } from 'react';

import HexagonalTile from '../../common/HexagonalTile/HexagonalTile';
import initialState from '../../../data/initialState';

import styles from './HexagonGrid.module.scss';

const HexagonGrid = () => {
  const [grid, setGrid] = useState(initialState);
  const [gameStatus, setGameStatus] = useState('playing');

  const fetchRandomTiles = async (grid) => {
    const nonEmptyTiles = grid.filter((tile) => tile.value !== 0);

    const response = await fetch('https://hex2048-lambda.octa.wtf/2', {
      method: 'POST',
      body: JSON.stringify(nonEmptyTiles),
    });
    const data = await response.json();

    return data;
  };

  const updateGridWithNewTiles = (oldGrid, newTiles) => {
    // Initialize a new grid array with the values from the old grid
    let newGrid = [...oldGrid];
    // Iterate over the newTiles array
    newTiles.forEach((newTile) => {
      // Find the corresponding tile in the newGrid array
      const tileIndex = newGrid.findIndex(
        (tile) =>
          newTile.x === tile.x && newTile.y === tile.y && newTile.z === tile.z
      );
      // If the tile is found, update its value
      if (tileIndex !== -1) {
        newGrid[tileIndex].value = 2;
      } else {
        // If the tile is not found, add it to the newGrid array
        newGrid.push(newTile);
      }
    });
    return newGrid;
  };

  const addRandomTile = async (oldGrid) => {
    const newTiles = await fetchRandomTiles(oldGrid);

    const updatedGrid = updateGridWithNewTiles(oldGrid, newTiles);
    setGrid(updatedGrid);
  };

  const moveTiles = (direction) => {
    // Initialize newGrid with the values from the grid
    let newGrid = [...grid];

    // Iterate over newGrid and update the values
    newGrid = newGrid.map((currentTile) => {
      // Find the next tile in the newGrid array based on the direction of movement
      const nextTile = newGrid.find((tile) => {
        if (direction === 'W') {
          return (
            tile.x === currentTile.x &&
            tile.y === currentTile.y + 1 &&
            tile.z === currentTile.z - 1
          );
        }
        if (direction === 'S') {
          return (
            tile.x === currentTile.x &&
            tile.y === currentTile.y - 1 &&
            tile.z === currentTile.z + 1
          );
        }
        if (direction === 'Q') {
          return (
            tile.x === currentTile.x - 1 &&
            tile.y === currentTile.y + 1 &&
            tile.z === currentTile.z
          );
        }
        if (direction === 'E') {
          return (
            tile.x === currentTile.x + 1 &&
            tile.y === currentTile.y &&
            tile.z === currentTile.z - 1
          );
        }
        if (direction === 'A') {
          return (
            tile.x === currentTile.x - 1 &&
            tile.y === currentTile.y &&
            tile.z === currentTile.z + 1
          );
        }
        if (direction === 'D') {
          return (
            tile.x === currentTile.x + 1 &&
            tile.y === currentTile.y - 1 &&
            tile.z === currentTile.z
          );
        }
        return tile;
      });

      // Update the value of the next tile and set the value of the current tile to 0
      if (nextTile && nextTile.value === currentTile.value) {
        nextTile.value = currentTile.value * 2;
        currentTile.value = 0;
      } else if (nextTile && nextTile.value === 0 && currentTile.value !== 0) {
        nextTile.value = currentTile.value;
        currentTile.value = 0;
      }
      return currentTile;
    });

    setGrid(newGrid);
    addRandomTile(newGrid);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'w':
          moveTiles('W');
          break;
        case 'q':
          moveTiles('Q');
          break;
        case 'e':
          moveTiles('E');
          break;
        case 's':
          moveTiles('S');
          break;
        case 'a':
          moveTiles('A');
          break;
        case 'd':
          moveTiles('D');
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    addRandomTile(grid);
  }, []);

  return (
    <div className='container'>
      <div className={styles.hexagon_grid}>
        <h1 className={styles.title}>Hexagon 2048</h1>
        <div className={styles.description}>
          <h3>
            Game Status: <span data-status={gameStatus}>{gameStatus}</span>
          </h3>
          <br />
          <h3>
            Move with W, A, S, D, Q, E. Your goal is to get to 2048 score in any
            of the tiles
          </h3>
        </div>
        <div className={styles.tiles_wrapper}>
          {grid.map((tile, i) => (
            <HexagonalTile
              // This will ensure that each hexagon tile has a unique key based on its x, y, and z values, and that there is only one element in the DOM with a unique combination of `data-x
              key={`${tile.x}-${tile.y}-${tile.z}`}
              value={tile.value}
              x={tile.x}
              y={tile.y}
              z={tile.z}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HexagonGrid;
