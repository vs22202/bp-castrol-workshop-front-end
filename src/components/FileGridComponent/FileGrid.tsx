import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import styles from "./FileGrid.module.css";
import Thumbnail from "./Thumbnail";

export default function FileGrid() {
  const [files, setFiles] = useState<(File & { preview: string })[]>([]);
  const removeFile = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const key = e.currentTarget.getAttribute("data-filename");
    const newFiles = files.filter((file) => file.name != key);
    setFiles(newFiles);
  };
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setFiles((s) => [
        ...s,
        ...acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        ),
      ]);
    },
  });

  const thumbs = files.map((file) => (
    <Thumbnail
      src={file.preview}
      onLoad={() => {
        URL.revokeObjectURL(file.preview);
      }}
      fileName={file.name}
      removeFile={(e) => removeFile(e)}
      key={file.name}
    />
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <section className="container">
      <div {...getRootProps({ className: styles.dropzone })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
        <aside className={styles.thumbsContainer}>{thumbs}</aside>
      </div>
    </section>
  );
}
