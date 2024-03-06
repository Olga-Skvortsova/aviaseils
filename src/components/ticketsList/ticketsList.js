import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';

import Ticket from '../ticket';

import styles from './ticketsList.module.sass';

const selectGetTicketsReducer = (state) => state.getTicketsReducer.filtredTickets;
const selectTabsReducer = (state) => state.tabsReducer.tab;
const selectFilterReducer = (state) => state.filterReducer.filter;

export default function TicketsList() {
  const filtredTickets = useSelector(selectGetTicketsReducer);
  const tab = useSelector(selectTabsReducer);
  const filter = useSelector(selectFilterReducer);
  const [ticketsListContent, setTicketsListContent] = useState(null);
  const [numberOfTickets, setNumberOfTickets] = useState(5);
  const [noTicketsMessage, setNoTicketsMessage] = useState(null);
  const moreTickets = useRef(null);

  useEffect(() => {
    const renderTicketsList = () => {
      if (filtredTickets) {
        setTicketsListContent(
          filtredTickets
            .slice(0, numberOfTickets)
            .map((ticket) => <TicketView key={ticket.price + ticket.carrier + Math.random()} ticket={ticket} />)
        );
      }
    };
    renderTicketsList();
  }, [filtredTickets, numberOfTickets]);

  useEffect(() => {
    setNumberOfTickets(5);
  }, [tab]);

  useEffect(() => {
    if (filter.length === 0) {
      setNoTicketsMessage(<h2 className={styles.noTickets}>Рейсов, подходящих под заданные фильтры, не найдено</h2>);
      moreTickets.current.classList.add(styles.hidden);
    } else {
      moreTickets.current.classList.remove(styles.hidden);
      setNoTicketsMessage(null);
    }
  }, [filter]);

  const changeNumberOfTickets = () => {
    setNumberOfTickets((prevData) => prevData + 5);
  };

  const TicketView = ({ ticket }) => {
    return (
      <li>
        <Ticket {...ticket} />
      </li>
    );
  };

  return (
    <React.Fragment>
      {noTicketsMessage}
      <div className={styles.ticketsList}>
        <div className={styles.ticketsList__tickets}>{filter.length !== 0 ? ticketsListContent : null}</div>
        <button ref={moreTickets} onClick={changeNumberOfTickets} className={styles.ticketsList__moreTickets}>
          ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ!
        </button>
      </div>
    </React.Fragment>
  );
}
