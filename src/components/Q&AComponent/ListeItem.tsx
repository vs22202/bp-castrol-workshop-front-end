import styles from './ListItem.module.css'; 

export interface IListItemProps {
  text?: string;
  size?: "small" | "large";
  className?: string;
}

export const ListItem = ({
  text = "Are you committed to quality maintenance and friendly customer service?",
  size = "small",
  className,
  ...props
}: IListItemProps): JSX.Element => {
  const variantsClassName = size === 'small' ? styles['size-small'] : styles['size-large'];

  return (
    <div className={`${styles['list-item']} ${variantsClassName} ${className}`}>
      <img
        className={styles.icon}
        src="docs\assets\images\icon.svg" 
        alt="Icon"
      />
      <div className={styles.text}>{text}</div>
    </div>
  );
};
