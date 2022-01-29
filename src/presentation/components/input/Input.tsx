import React from 'react';
import Styles from './input-styles.scss';

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Footer: React.FC<Props> = (props: Props) => (
  <div className={Styles.inputWrap}>
    <input {...props} />
    <span className={Styles.status}>🔴</span>
  </div>
);

export default Footer;