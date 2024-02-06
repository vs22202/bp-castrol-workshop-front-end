
import { FC } from "react"
import styles from "./Button.module.css"

type ButtonProps = {
    size: string
}

export const Button:FC<ButtonProps> = () => {
  return (
    <button className={`${styles.sm} ${styles.outline}`}>Button</button>
  )
}
