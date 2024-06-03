import { useState } from "react";
import styles from "./imageSlider.module.scss";
import { ImageSliderProps } from "./imageSlider.props";

export const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  const [currentIndex, setIndex] = useState(0);
  const imageCount = images.length - 1;

  const API_URL = import.meta.env.VITE_API_URL;

  const avaiableImages = images.map((image, index) => (
    <img
      onClick={() => show(index)}
      key={index}
      src={`${API_URL}${image.full_path}`}
    />
  ));

  console.info(images);

  const move = (direction: string) => {
    if (direction === "left") {
      currentIndex - 1 < 0 ? setIndex(imageCount) : setIndex(currentIndex - 1);
    } else {
      currentIndex + 1 > imageCount ? setIndex(0) : setIndex(currentIndex + 1);
    }
  };

  const show = (index: number) => {
    setIndex(index);
  };

  console.info("current_index", currentIndex);

  return (
    <div className={styles.slider}>
      <div className={styles["current-image"]}>
        <img src={`${API_URL}${images[currentIndex].full_path}`} />
      </div>
      <div className={styles["other-images"]}>{avaiableImages}</div>
    </div>
  );
};
