import React from 'react';
import styles from './ListItem.module.css';

export interface IListItemProps {
  text: string;
  size?:string ;
  className?: string;
}

const ListItem: React.FC<IListItemProps> = ({ text, size = 'small', className }) => {
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

export default ListItem;
