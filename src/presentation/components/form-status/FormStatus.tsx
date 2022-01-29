import React from 'react';
import Spinner from '../spinner/Spinner';
import Styles from './form-status-styles.scss';

const FormStatus: React.FC = () => (
  <div className={Styles.errorWrap}>
    <Spinner className={Styles.spinner} />
    <span className={Styles.error}>Erro</span>
  </div>
);

export default FormStatus;