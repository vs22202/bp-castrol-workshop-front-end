// List.tsx

import React from 'react';
import styles from './List.module.css';
import { ListItem, IListItemProps } from './ListItem';

export interface IListProps {
  items: string[];
  size: "small" | "large";
}

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
