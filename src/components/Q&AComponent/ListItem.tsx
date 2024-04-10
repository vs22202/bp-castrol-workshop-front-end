import React from "react";
import styles from "./ListItem.module.css";
import { SvgIcon } from "../IconComponent/SvgIcon";

/**
 * Properties for the `ListItem` component.
 *
 * Defines the configuration and behavior of the ListItem component,
 * including its size and display text.
 */

export interface IListItemProps {
  /**
   * The display text associated with the listitem. This text is shown to the user alongside the listitem itself.
   */
  text: string;
  /**
   * The size of the listitem. This controls the scaling of the listitem's appearance.
   * While currently a string, consider restricting this to specific size options like "small" or "large" for consistency.
   */
  size?: string;
  /**
   * The classname for the styling purpose of the icon and listitem text.
   */
  className?: string;
}

/**
 * Renders a `Listitem` component with customizable properties.
 *
 * This component is designed to be used within forms and landing page, supporting custom sizes and custom text.
 *
 * @param props The {@link IListItemProps} to configure the listitem.
 * @returns A JSX element representing a stylized listitem with associated label text.
 */

const ListItem: React.FC<IListItemProps> = ({
  text,
  size = "small",
  className,
}) => {
  const variantsClassName =
    size === "small" ? styles["size-small"] : styles["size-large"];

  return (
    <div
      data-testid="list-item"
      className={`${styles["list-item"]} ${variantsClassName} ${className}`}
    >
      <div className={styles.icon}>
        <SvgIcon iconName="icon" />
      </div>
      <div className={styles.text}>{text}</div>
    </div>
  );
};

export default ListItem;
