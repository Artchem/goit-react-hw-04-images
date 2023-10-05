import css from './Error.module.css';

export function Error({ error }) {
  return <h2 className={css.title}>{error}</h2>;
}
