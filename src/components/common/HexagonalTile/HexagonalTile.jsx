import React from 'react';
import styles from './HexagonalTile.module.scss';

const HexagonalTile = ({ value, x, y, z }) => {
  let tilePosition = '';

  if (x === 0 && y === 1 && z === -1) tilePosition = styles.tile_top;
  if (x === -1 && y === 1 && z === 0) tilePosition = styles.tile_top_left;
  if (x === 1 && y === 0 && z === -1) tilePosition = styles.tile_top_right;
  if (x === 0 && y === 0 && z === 0) tilePosition = styles.tile_middle;
  if (x === -1 && y === 0 && z === 1) tilePosition = styles.tile_bottom_left;
  if (x === 0 && y === -1 && z === 1) tilePosition = styles.tile_bottom;
  if (x === 1 && y === -1 && z === 0) tilePosition = styles.tile_bottom_right;

  return (
    <div className={styles.tile}>
      <div className={tilePosition}>
        <div
          className={styles.hexagon}
          data-value={value}
          data-x={x}
          data-y={y}
          data-z={z}
        >
          {value}
        </div>
      </div>
    </div>
  );
};

export default HexagonalTile;
