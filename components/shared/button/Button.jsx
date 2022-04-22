import React from 'react';
import styles from './_button.module.scss';

const Button = React.forwardRef(function buttonFunction(
  { type, children },
  ref
) {
  return type === 'primary' ? (
    <button className={styles.primary} ref={ref}>
      {children}
    </button>
  ) : type === 'secondary' ? (
    <button className={styles.secondary} ref={ref}>
      {children}
    </button>
  ) : type === 'tertiary' ? (
    <button className={styles.tertiary} ref={ref}>
      {children}
    </button>
  ) : type === 'transparent' ? (
    <button className={styles.transparent} ref={ref}>
      {children}
    </button>
  ) : (
    <button className={styles.default} ref={ref}>
      {children}
    </button>
  );
});

export default Button;
