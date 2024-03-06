import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

import { getSearchId } from '../../store/sessionIdReducer';
import { getTickets } from '../../store/getTicketsReducer';
import logo from '../app/img/logo.png';
import Filter from '../filter';
import Tabs from '../tabs';
import TicketsList from '../ticketsList';

import styles from './app.module.sass';

const selectSessionIdReducer = (state) => state.sessionIdReducer;
const selectGetTicketsReducer = (state) => state.getTicketsReducer;

export default function App() {
  const dispatch = useDispatch();
  const { sessionId, statusOfgetSearchId, errorOfgetSearchId } = useSelector(selectSessionIdReducer);
  const { statusOfgetTickets, errorOfgetTickets } = useSelector(selectGetTicketsReducer);
  const [continueFetching, setContinueFetching] = useState(false);
  const [isFirstRequest, setIsFirstRequest] = useState(true);

  useEffect(() => {
    dispatch(getSearchId());
  }, []);

  useEffect(() => {
    if (sessionId) {
      fetchTickets();
    }
  }, [sessionId]);

  useEffect(() => {
    if (continueFetching) {
      fetchTickets();
    }
    setContinueFetching(false);
  }, [continueFetching]);

  const fetchTickets = async () => {
    const actionResult = await dispatch(getTickets({ sessionId }));
    const result = actionResult.payload;
    if (result.stop === false) {
      setContinueFetching(true);
    } else {
      setContinueFetching(false);
    }
    if (result === 'server error') {
      setContinueFetching(true);
    }
    setIsFirstRequest(false);
  };

  let content;
  if ((errorOfgetSearchId || errorOfgetTickets) && isFirstRequest) {
    content = <h2 className={styles.main__error}>Got error...</h2>;
  } else {
    content = <TicketsList />;
  }

  return (
    <section className={styles.mainColor}>
      <div className={styles.loader}>
        {statusOfgetSearchId === 'loading' || statusOfgetTickets === 'loading' ? <LinearProgress /> : null}
      </div>
      <section className={styles.container}>
        <header className={styles.header}>
          <img className={styles.header__image} src={logo} alt="plain logo" />
        </header>
        <main>
          <Filter />
          <section className={styles.main__tickets}>
            <Tabs />
            {content}
          </section>
        </main>
      </section>
    </section>
  );
}
