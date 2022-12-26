import React, { useState } from "react";

import styles from "./App.module.css";
import { Item } from "./components/Item";

export type CoordsProps = {
  clientX: number;
  clientY: number;
};

function App() {
  const [undoPoints, setUndoPoints] = useState<CoordsProps[]>([]);
  const [redoPoints, setRedoPoints] = useState<CoordsProps[]>([]);

  function getPositionOnClick({
    clientX,
    clientY,
  }: React.MouseEvent<HTMLElement>) {
    const newCoord = { clientX, clientY };
    setUndoPoints([...undoPoints, newCoord]);
  }

  function handlePoints(
    e: React.MouseEvent<HTMLElement>,
    originArray: CoordsProps[],
    destArray: CoordsProps[],
    originFn: React.Dispatch<React.SetStateAction<CoordsProps[]>>,
    destFn: React.Dispatch<React.SetStateAction<CoordsProps[]>>
  ) {
    e.stopPropagation();

    if (originArray.length === 0) return;

    const newList = [...originArray];
    const lastPoint = newList.pop();
    originFn(newList);
    destFn([...destArray, lastPoint!]);
  }

  function handleClear(e: React.MouseEvent<HTMLElement>) {
    e.stopPropagation();
    setUndoPoints([]);
    setRedoPoints([]);
  }

  return (
    <div className={styles.content} onClick={getPositionOnClick}>
      <div className={styles.header}>
        <p>Click on the screen to create points</p>

        <div className={styles.headerButtons}>
          <button
            onClick={handleClear}
            disabled={undoPoints.length === 0 && redoPoints.length === 0}
          >
            Clear
          </button>
          <button
            onClick={(e) =>
              handlePoints(
                e,
                undoPoints,
                redoPoints,
                setUndoPoints,
                setRedoPoints
              )
            }
            disabled={undoPoints.length === 0}
          >
            Undo
          </button>
          <button
            onClick={(e) =>
              handlePoints(
                e,
                redoPoints,
                undoPoints,
                setRedoPoints,
                setUndoPoints
              )
            }
            disabled={redoPoints.length === 0}
          >
            Redo
          </button>
        </div>
      </div>

      {undoPoints.map((p, i) => (
        <Item key={i} clientX={p.clientX} clientY={p.clientY} />
      ))}
    </div>
  );
}

export default App;
