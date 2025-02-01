import styles from "./SolarSystem.module.css";

const SolarSystem = () => {
  return (
    <div id={styles["solar-system"]}>
      <div className={`${styles.sun}`}></div>

      <div className={`${styles.planet} ${styles.mercury}`}></div>
      <div className={`${styles.planet} ${styles.venus}`}></div>

      <div className={styles["earth-system"]}>
        <div className={styles.earth}></div>
        <div className={styles.moon}></div>
      </div>

      <div className={`${styles.planet} ${styles.mars}`}></div>
      <div className={`${styles.planet} ${styles.jupiter}`}></div>
      <div className={`${styles.planet} ${styles.saturn}`}></div>
      <div className={`${styles.planet} ${styles.uranus}`}></div>
      <div className={`${styles.planet} ${styles.neptune}`}></div>
    </div>
  );
};

export default SolarSystem;
