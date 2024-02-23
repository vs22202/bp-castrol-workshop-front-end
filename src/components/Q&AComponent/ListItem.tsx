import styles from './ListItem.module.css'; 
/** The props type of {@link ListItem | `ListItem`}. */
export interface IListItemProps {
    /**
   * text, size and classname of the listitem
   */
  text: string;
  size?: "small" | "large";
  className?: string;
};
/**
 *
 * ListItem Component
 * @category component
 * 
 * @param text label text on the list item
 * @param size the size of the list item could be small or large
 * @param className variant class for defining styling(size) of list item
 *
 * @returns {JSX.Element} The rendered listitem component.
 *
 * @example
 * Render a listitem of size small and text "Are you committed to quality maintenance and friendly customer service?"
 * ```tsx
 * <ListItem size="small" text="Are you committed to quality maintenance and friendly customer service?" />
 * ```
 */


export const ListItem = ({
  text,
  size = "small",
  className,
}: IListItemProps): JSX.Element => {
  const variantsClassName = size === 'small' ? styles['size-small'] : styles['size-large'];

  return (
    <div data-testid='list-item' className={`${styles['list-item']} ${variantsClassName} ${className}`}>
      <img
        className={styles.icon}
        src="src\assets\icon.svg" 
        alt="Icon"
      />
      <div className={styles.text}>{text}</div>
    </div>
  );
};
