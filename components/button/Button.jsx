 import styles from './_button.module.scss'

const Button = ({ type, color, children, placeholder }) => {
    console.log(color)

    const colorClass = color === 'primaryColor' ? 'styles.primary-color' : ''


  return type === 'primary' ? (
    <button className={styles.primary} placeholder={placeholder}>{children}</button>
  ) : 
    type ===
          'secondary' ? (
              <button className={colorClass} placeholder={placeholder}>{children}</button>)
     : (
      <button className={styles.base} placeholder={placeholder}>{children}</button>
  );
};

export default Button     