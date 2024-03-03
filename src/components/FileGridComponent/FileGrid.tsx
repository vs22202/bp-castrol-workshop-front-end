import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import styles from "./FileGrid.module.css";
import Thumbnail from "./Thumbnail";
import { Button } from "../ButtonComponent/Button";
import { SvgIcon } from "../IconComponent/SvgIcon";
import { useFormContext } from "react-hook-form";
import { FileData } from "components/FormFieldRenderLogic";
/** The props type of {@link FileGrid| `FileGrid`}. */
type FileGridProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  /** Existing files the user has already uploaded of they exist */
  oldFiles?: FileData[];
};

/**
 *
 * File Upload Grid Component
 * @category component
 *
 * @returns {JSX.Element} The rendered button component.
 *
 * @example
 * Render a empty file grid where files can be uploaded
 * ```tsx
 * <FileGrid />
 * ```
 * Render a file grid with the old files user had uploaded
 * ```tsx
 * <FileGrid oldFile={someArrayOfFiles} />
 * ```
 */
export default function FileGrid({ oldFiles, name = "files" }: FileGridProps) {
  const { register, unregister, setValue, watch } = useFormContext();
  const files: (File & { preview: string; key: string })[] = watch(name);
  useEffect(() => {
    register(name);
    return () => {
      unregister(name);
    };
  }, [register, unregister, name]);
  const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
    noClick: true,
    noKeyboard: true,
    accept: {
      "image/*": [],
      "video/*": [],
    },
    onDrop: (acceptedFiles) => {
      setValue(name, [
        ...(files || []),
        ...acceptedFiles.map((file) => {
          return Object.assign(file, {
            key: file.name + "|" + Date.now(),
            preview: URL.createObjectURL(file),
          });
        }),
      ]);
    },
  });
  const removeFile = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const key = e.currentTarget.getAttribute("data-filename");
    const newFiles = files.filter((file) => file.name != key);
    acceptedFiles.filter((file) => file.name != key);
    setValue(name, newFiles);
  };
  const thumbs =
    files &&
    files.map((file) => (
      <Thumbnail
        src={file.preview}
        fileName={file.name}
        removeFile={(e) => removeFile(e)}
        key={file.key}
        type={file.type}
      />
    ));
  const oldThumbs = oldFiles &&
  oldFiles.map((file) => (
    <Thumbnail
      src={file.fileurl}
      fileName={file.filename}
      removeFile={(e) => removeFile(e)}
      key={file.key}
      type={file.type}
    />
  ))
  return (
    <section className={styles.container}>
      <div {...getRootProps({ className: styles.dropzone })}>
        <input {...getInputProps()} />
        {(!files?.length && !oldFiles?.length) ? (
          <div className={styles.uploadOptions}>
            <SvgIcon iconName="upload" />
            <h3>Drag files to upload</h3>
            <div className={styles.optionSeparator}>
              <div className={styles.horizontalLine}></div>
              <p>or select files</p>
              <div className={styles.horizontalLine}></div>
            </div>
            <Button text="Choose Files" type="outline" onClick={open} />
          </div>
        ) : (
          <aside className={styles.thumbsContainer}>
            {oldThumbs}
            {thumbs}
            <div className={styles.addFile} onClick={open}>
              <SvgIcon iconName="round-plus" />
              <p>Add Files</p>
            </div>
          </aside>
        )}

        <div className={styles.acceptanceFormats}>
          <p>Acceptable formats:jpg,png,heic,mov,mp4</p>
          <p>Max file size is 4GB</p>
        </div>
      </div>
    </section>
  );
}
