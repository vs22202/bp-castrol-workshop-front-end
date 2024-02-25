// List.tsx

import React from 'react';
import styles from './List.module.css';
import { ListItem } from './ListItem';
/** The props type of {@link List | `List`}. */
export interface IListProps {
  /**
   * item and size of the list
   */
  items: string[];
  size: "small" | "large";
}
/**
 *
 * ListItem Component
 * @category component
 * 
 * @param items an array of string containing labels of list
 * @param size the size of the list could be small or large
 *
 * @returns {JSX.Element} The rendered list component.
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
