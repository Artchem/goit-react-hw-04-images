import css from './Button.module.css';

export const Button = ({ onBtnClick }) => {
  return (
    <div className={css.container}>
      <button onClick={onBtnClick} className={css.button}>
        Load More
      </button>
    </div>
  );
};
