import { SvgIcon } from "../IconComponent/SvgIcon";
import styles from "./Thumbnail.module.css";

type ThumbnailProps = {
  src: string;
  onLoad: React.ReactEventHandler<HTMLImageElement>;
  fileName: string;
  removeFile: React.MouseEventHandler<HTMLSpanElement>;
};
const Thumbnail = ({ src, onLoad, fileName, removeFile }: ThumbnailProps) => {
  return (
    <div className={styles.thumb}>
      <span className={styles.deleteIcon} onClick={removeFile} data-filename={fileName} >
        <SvgIcon iconName="delete" wrapperStyle="xlg" />
      </span>
      <img src={src} onLoad={onLoad} key={fileName} />
      <span className={styles.viewButton}>
        <SvgIcon iconName="eye" wrapperStyle="xlg" />
        <span>View</span>
      </span>
    </div>
  );
};

export default Thumbnail;
