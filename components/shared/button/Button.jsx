import React from 'react';
import styles from './_button.module.scss';

const Button = React.forwardRef(function buttonFunction(
  { type, children, onClick },
  ref
) {
  return type === 'primary' ? (
    <button onClick={onClick} className={styles.primary} ref={ref}>
      {children}
    </button>
  ) : type === 'secondary' ? (
    <button onClick={onClick} className={styles.secondary} ref={ref}>
      {children}
    </button>
  ) : type === 'tertiary' ? (
    <button onClick={onClick} className={styles.tertiary} ref={ref}>
      {children}
    </button>
  ) : type === 'quaternary' ? (
    <button onClick={onClick} className={styles.quaternary} ref={ref}>
      {children}
    </button>
  ) : type === 'quinary' ? (
    <button onClick={onClick} className={styles.quinary} ref={ref}>
      {children}
    </button>
  ) : type === 'transparent' ? (
    <button onClick={onClick} className={styles.transparent} ref={ref}>
      {children}
    </button>
  ) : (
    <button onClick={onClick} className={styles.default} ref={ref}>
      {children}
    </button>
  );
});

export default Button;
