import css from './Error.module.css';

export const Error = ({ error }) => {
  return <h2 className={css.title}>{error}</h2>;
};
