import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  ReactNode,
} from 'react';
import classNames from 'classnames';
import styles from './SecondaryButton.module.scss';

// eslint-disable-next-line max-len
interface Props extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  children: ReactNode,
  className?: string,
  isSelected?: boolean,
  isDisable?: boolean,
}

export const SecondaryButton: React.FC<Props> = ({
  children,
  className,
  isSelected,
  isDisable,
  ...props
}) => {
  return (
    <button
      type="button"
      className={classNames(styles.button, className, {
        [styles.isSelected]: isSelected,
        [styles.isDisable]: isDisable,
      })}
      {...props}
    >
      {children}
    </button>
  );
};

SecondaryButton.defaultProps = {
  className: '',
  isSelected: false,
  isDisable: false,
};
