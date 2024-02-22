import React from 'react';

import styles from './ticket.module.sass';

export default function Ticket(ticket) {
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };
  const data1 = new Date(ticket.segments[0].date);
  const newData1 = new Date(data1.getTime() + ticket.segments[0].duration * 60 * 1000);
  const duration1 = ticket.segments[0].duration;
  const hoursDuration1 = Math.floor(duration1 / 60);
  const minutesDuration1 = duration1 - hoursDuration1 * 60;
  const data2 = new Date(ticket.segments[1].date);
  const newData2 = new Date(data2.getTime() + ticket.segments[1].duration * 60 * 1000);
  const duration2 = ticket.segments[1].duration;
  const hoursDuration2 = Math.floor(duration2 / 60);
  const minutesDuration2 = duration2 - hoursDuration2 * 60;
  const nameOfNumberTransition = (stop) => {
    if (stop.length === 3) {
      return '3 ПЕРЕСАДКИ';
    } else if (stop.length === 2) {
      return '2 ПЕРЕСАДКИ';
    } else if (stop.length === 1) {
      return '1 ПЕРЕСАДКА';
    } else {
      return 'БЕЗ ПЕРЕСАДОК';
    }
  };
  const src = `//pics.avs.io/99/36/${ticket.carrier}.png`;

  return (
    <div className={styles.ticket}>
      <div className={styles.ticket__head}>
        <p className={styles.ticket__price}>{formatPrice(ticket.price)} P</p>
        <img src={src} className={styles.ticket__logo}></img>
      </div>
      <div className={styles.ticket__main}>
        <div className={styles.ticket__blockOfInfo}>
          <div className={styles.ticket__info}>
            <h5>
              {ticket.segments[0].origin}-{ticket.segments[0].destination}
            </h5>
            <p>
              {data1.getHours()}:{data1.getMinutes()} - {newData1.getHours()}:{newData1.getMinutes()}
            </p>
          </div>
          <div className={styles.ticket__info}>
            <h5>В ПУТИ</h5>
            <p>
              {hoursDuration1} ч {minutesDuration1} м
            </p>
          </div>
          <div className={styles.ticket__info}>
            <h5>{nameOfNumberTransition(ticket.segments[0].stops)}</h5>
            <p>{ticket.segments[0].stops.join(', ')}</p>
          </div>
        </div>
        <div className={styles.ticket__blockOfInfo}>
          <div className={styles.ticket__info}>
            <h5>
              {ticket.segments[1].origin}-{ticket.segments[1].destination}
            </h5>
            <p>
              {data2.getHours()}:{data2.getMinutes()} - {newData2.getHours()}:{newData2.getMinutes()}
            </p>
          </div>
          <div className={styles.ticket__info}>
            <h5>В ПУТИ</h5>
            <p>
              {hoursDuration2} ч {minutesDuration2} м
            </p>
          </div>
          <div className={styles.ticket__info}>
            <h5>{nameOfNumberTransition(ticket.segments[1].stops)}</h5>
            <p>{ticket.segments[1].stops.join(', ')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
