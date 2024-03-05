// List.tsx

import React from 'react';
import styles from './List.module.css';
import ListItem  from './ListItem';

/**
 * Properties for the `List` component.
 * 
 * Defines the configuration and behavior of the List component
 * including its size and display text.
 */

export interface IListProps {
   /**
   * An array of string containing labels of list
   */
  items: string[];
  /** 
   * Specifies the size of the list: "small" and "large".
   */
  size: "small" | "large";
}
/**
 * Renders a customizable `List` component.
 * 
 * This component allows for the creation of a list with customizable properties such as text and size.
 * 
 * @category Components
 * 
 * @param props The {@link IListProps} for the List.
 *
 * @returns The rendered `List` component as a `JSX.Element`.
 *
 * @example
 * Render a list of size large and items array
 * ```tsx
 * const items = ['Are you committed to quality maintenance and friendly customer service?', 'Do you have at least 3 bays in your workshop?', 'Are you a full service workshop?', 'Are you ready to benefit from branding with Castrol?'];
 * <List items={items} size="large" />  />
 * ```
 */
const List: React.FC<IListProps> = ({ items, size }): JSX.Element => {
  return (
    <div className={styles.list}>
      {items.map((item, index) => (
        <div key={index} className={styles['list-item']}>
          <ListItem text={item} size={size} />
        </div>
      ))}
    </div>
  );
};

export { List };
