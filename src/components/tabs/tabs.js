import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import { newTicketsAction } from '../../store/getTicketsReducer';
import { cheapAction, fastAction, optimalAction } from '../../store/tabsReducer';

import styles from './tabs.module.sass';

export default function Tabs() {
  const dispatch = useDispatch();
  const { tickets, filtredTickets } = useSelector((state) => state.getTicketsReducer);

  const cheap = (e) => {
    e.target.nextSibling.classList.remove(styles.choosen);
    e.target.nextSibling.nextSibling.classList.remove(styles.choosen);
    e.target.classList.add(styles.choosen);

    const arr = structuredClone(filtredTickets);
    const sortedTickets = arr.sort((a, b) => {
      return a.price - b.price;
    });

    dispatch(newTicketsAction(sortedTickets));
    dispatch(cheapAction());
  };
  const fast = (e) => {
    e.target.previousSibling.classList.remove(styles.choosen);
    e.target.nextSibling.classList.remove(styles.choosen);
    e.target.classList.add(styles.choosen);

    const arr = structuredClone(filtredTickets);
    const sortedTickets = arr.sort((a, b) => {
      const totalDurationA = a.segments.reduce((acc, curr) => acc + curr.duration, 0);
      const totalDurationB = b.segments.reduce((acc, curr) => acc + curr.duration, 0);
      return totalDurationA - totalDurationB;
    });

    dispatch(newTicketsAction(sortedTickets));
    dispatch(fastAction());
  };
  const optimal = (e) => {
    e.target.previousSibling.classList.remove(styles.choosen);
    e.target.previousSibling.previousSibling.classList.remove(styles.choosen);
    e.target.classList.toggle(styles.choosen);
    dispatch(newTicketsAction(filtredTickets));
    dispatch(optimalAction());
  };
  return (
    <div className={styles.tabs}>
      <button onClick={(e) => cheap(e)} className={styles.tabs__item}>
        САМЫЙ ДЕШЕВЫЙ
      </button>
      <button onClick={(e) => fast(e)} className={styles.tabs__item}>
        САМЫЙ БЫСТРЫЙ
      </button>
      <button onClick={(e) => optimal(e)} className={classNames(styles.tabs__item, styles.choosen)}>
        ОПТИМАЛЬНЫЙ
      </button>
    </div>
  );
}
