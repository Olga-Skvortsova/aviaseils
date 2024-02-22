import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  allFilterAction,
  withoutTransferFilterAction,
  oneTransferFilterAction,
  twoTransferFilterAction,
  threeTransferFilterAction,
} from '../../store/filterReducer';
import { newTicketsAction, filtredTicketsAction } from '../../store/getTicketsReducer';

import styles from './filter.module.sass';

export default function Filter() {
  const dispatch = useDispatch();
  const { tickets, filtredTickets } = useSelector((state) => state.getTicketsReducer);
  const { filter } = useSelector((state) => state.filterReducer);
  const { tab } = useSelector((state) => state.tabsReducer);

  useEffect(() => {
    if (filter.includes(4)) {
      let sortedTickets;
      if (tab === 'cheap') {
        const arr = structuredClone(tickets);
        sortedTickets = arr.sort((a, b) => {
          return a.price - b.price;
        });
      } else if (tab === 'fast') {
        const arr = structuredClone(tickets);
        sortedTickets = arr.sort((a, b) => {
          const totalDurationA = a.segments.reduce((acc, curr) => acc + curr.duration, 0);
          const totalDurationB = b.segments.reduce((acc, curr) => acc + curr.duration, 0);
          return totalDurationA - totalDurationB;
        });
      } else {
        sortedTickets = tickets;
      }
      dispatch(newTicketsAction(sortedTickets));
    } else {
      let sortedTickets;
      if (tab === 'cheap') {
        const arr = structuredClone(tickets);
        sortedTickets = arr.sort((a, b) => {
          return a.price - b.price;
        });
      } else if (tab === 'fast') {
        const arr = structuredClone(tickets);
        sortedTickets = arr.sort((a, b) => {
          const totalDurationA = a.segments.reduce((acc, curr) => acc + curr.duration, 0);
          const totalDurationB = b.segments.reduce((acc, curr) => acc + curr.duration, 0);
          return totalDurationA - totalDurationB;
        });
      } else {
        const arr = structuredClone(tickets);
        sortedTickets = arr;
      }
      dispatch(filtredTicketsAction({ filter: filter, tickets: sortedTickets }));
    }
  }, [filter]);

  const allFilter = (e) => {
    let form = e.target.parentElement.parentElement;
    if (!e.target.checked) {
      Array.from(form).filter((el) => {
        el.checked = false;
      });
    } else {
      Array.from(form).filter((el) => {
        el.checked = true;
      });
    }
    dispatch(allFilterAction());
  };
  const withoutTransferFilter = (e) => {
    let form = e.target.parentElement.parentElement;
    if (!e.target.checked) {
      Array.from(form)[0].checked = false;
    } else {
      let count = 0;
      Array.from(form).filter((el) => {
        if (el.checked === true) {
          count++;
        }
      });
      if (count === 4) {
        Array.from(form)[0].checked = true;
      }
    }
    dispatch(withoutTransferFilterAction());
  };
  const oneTransferFilter = (e) => {
    let form = e.target.parentElement.parentElement;
    if (!e.target.checked) {
      Array.from(form)[0].checked = false;
    } else {
      let count = 0;
      Array.from(form).filter((el) => {
        if (el.checked === true) {
          count++;
        }
      });
      if (count === 4) {
        Array.from(form)[0].checked = true;
      }
    }
    dispatch(oneTransferFilterAction());
  };
  const twoTransferFilter = (e) => {
    let form = e.target.parentElement.parentElement;
    if (!e.target.checked) {
      Array.from(form)[0].checked = false;
    } else {
      let count = 0;
      Array.from(form).filter((el) => {
        if (el.checked === true) {
          count++;
        }
      });
      if (count === 4) {
        Array.from(form)[0].checked = true;
      }
    }
    dispatch(twoTransferFilterAction());
  };
  const threeTransferFilter = (e) => {
    let form = e.target.parentElement.parentElement;
    if (!e.target.checked) {
      Array.from(form)[0].checked = false;
    } else {
      let count = 0;
      Array.from(form).filter((el) => {
        if (el.checked === true) {
          count++;
        }
      });
      if (count === 4) {
        Array.from(form)[0].checked = true;
      }
    }
    dispatch(threeTransferFilterAction());
  };

  return (
    <div className={styles.filter}>
      <form className={styles.filter__form}>
        <h3>КОЛИЧЕСТВО ПЕРЕСАДОК</h3>
        <label>
          <input onClick={(e) => allFilter(e)} defaultChecked type="checkbox" value="all" />
          <span></span>
          Все
        </label>
        <label>
          <input defaultChecked onClick={(e) => withoutTransferFilter(e)} type="checkbox" value="withoutTransfer" />
          <span></span>
          Без пересадок
        </label>
        <label>
          <input defaultChecked onClick={(e) => oneTransferFilter(e)} type="checkbox" value="1Transfer" />
          <span></span> 1 пересадка
        </label>
        <label>
          <input defaultChecked onClick={(e) => twoTransferFilter(e)} type="checkbox" value="2Transfer" />
          <span></span> 2 пересадки
        </label>
        <label>
          <input defaultChecked onClick={(e) => threeTransferFilter(e)} type="checkbox" value="3Transfer" />
          <span></span> 3 пересадки
        </label>
      </form>
    </div>
  );
}
