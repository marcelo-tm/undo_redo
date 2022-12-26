import { CoordsProps } from "../App";

import styles from "./Item.module.css";

export function Item({ clientX, clientY }: CoordsProps) {
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
