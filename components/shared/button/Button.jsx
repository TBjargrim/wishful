import styles from './_button.module.scss';

const Button = ({ type, children }) => {
  return type === 'primary' ? (
    <button className={styles.primary}>{children}</button>
  ) : type === 'secondary' ? (
    <button className={styles.secondary}>{children}</button>
  ) : type === 'tertiary' ? (
    <button className={styles.tertiary}>{children}</button>
  ) : type === 'transparent' ? (
    <button className={styles.transparent}>{children}</button>
  ) : (
    <button className={styles.default}>{children}</button>
  );
};

export default Button;
