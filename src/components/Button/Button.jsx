import css from './Button.module.css';

export function Button({ onBtnClick }) {
  return (
    <div className={css.container}>
      <button onClick={onBtnClick} className={css.button}>
        Load More
      </button>
    </div>
  );
}
