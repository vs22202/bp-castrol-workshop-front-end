import { useEffect, useRef, useState } from "react";
import { SvgIcon } from "../IconComponent/SvgIcon";
import styles from "./Thumbnail.module.css";

/** The props type of {@link Thumbnail | `Thumbnail`}. */
type ThumbnailProps = {
  /**
   * Image Source
   */
  src: string;
  /**
   * Name of the file to pass when deleting file
   */
  fileName: string;
  /**
   * Remove file event handler
   */
  removeFile: React.MouseEventHandler<HTMLSpanElement>;
  /** Type of file (ex: "image/png" or "video/mp4" etc) */
  type: string;
};
/**
 *
 * File thumbnail component
 * @category component
 *
 * @returns {JSX.Element} The rendered thumbnail component.
 *
 * @example
 * Render a thumbnail of a png image.
 * ```tsx
 * <Thumbnail src="http://fileurl" fileName="name of file" removeFile={fileRemoveHandler} key="unique-key" type="image/png"/>
 * ```
 * Render a thumbnail of a mp4 video.
 * ```tsx
 * <Thumbnail src="http://fileurl" fileName="name of file" removeFile={fileRemoveHandler} key="unique-key" type="video/mp4"/>
 * ```
 */
const Thumbnail = ({ src, fileName, removeFile, type }: ThumbnailProps) => {
  const [fullScreen, setFullScreen] = useState<boolean>(false);
  const thumb = useRef<null | HTMLDivElement>(null);
  useEffect(() => {
    window.addEventListener("fullscreenchange", () => {
      if (document.fullscreenElement) {
        setFullScreen(true);
        return;
      }
      setFullScreen(false);
    });
    return window.removeEventListener("fullscreenchange", () => {});
  }, []);
  const toggleFullScreenFile = () => {
    if (!thumb.current) return;
    if (!document.fullscreenElement) {
      thumb.current.requestFullscreen();
      setFullScreen(true);
    } else {
      document.exitFullscreen();
      setFullScreen(false);
    }
  };
  return (
    <div className={styles.thumb} ref={thumb}>
      {fullScreen && (
        <span className={styles.deleteIcon} onClick={toggleFullScreenFile}>
          <SvgIcon iconName="x-circle-wrong" />
        </span>
      )}
      {!fullScreen && (
        <span
          className={styles.deleteIcon}
          onClick={removeFile}
          data-filename={fileName}
          data-testid={`delete-icon-${fileName}`}
        >
          <SvgIcon iconName="delete" />
        </span>
      )}
      {type.split("/")[0] == "video" ? (
        <video
          onLoad={() => {
            URL.revokeObjectURL(src);
          }}
          key={fileName}
          className={fullScreen ? styles.fullScreen : ""}
          controls
        >
          <source src={src} type={type}/>
        </video>
      ) : (
        <img
          src={src}
          onLoad={() => {
            URL.revokeObjectURL(src);
          }}
          key={fileName}
          className={fullScreen ? styles.fullScreen : ""}
        />
      )}
      {!fullScreen && (
        <span className={styles.viewButton} onClick={toggleFullScreenFile}>
          <SvgIcon iconName="eye" />
          <span>View</span>
        </span>
      )}
    </div>
  );
};

export default Thumbnail;
