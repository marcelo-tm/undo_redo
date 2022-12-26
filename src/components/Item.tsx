import { Coord } from "../types/Coord";

import styles from "./Item.module.css";

export function Item({ clientX, clientY }: Coord) {
  return (
    <div
      className={styles.item}
      style={{
        left: clientX,
        top: clientY,
      }}
    ></div>
  );
}
