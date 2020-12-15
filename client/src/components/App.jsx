import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Guests from './Guests.jsx';
import DateSelection from './DateSelection.jsx';
import GuestsDropDown from './GuestsDropDown.jsx';
import CheckingDropDown from './CheckingDropDown.jsx';
import Fees from './Fees.jsx';
import styles from './App.css';

function App() {
  const [guestsBool, setGuestsBool] = useState(false);
  const [guestsNum, setGuests] = useState(1);
  const [adultsNum, setAdultsNum] = useState(1);
  const [childrenNum, setChildrenNum] = useState(0);
  const [infantsNum, setInfantsNum] = useState(0);
  const [checkingBool, setCheckingBool] = useState(false);
  const [checkInDate, setCheckInDate] = useState(undefined);
  const [checkOutDate, setCheckOutDate] = useState(undefined);
  const [listingData, setListingData] = useState(undefined);
  const [checkingDatesSet, setCheckingDatesSet] = useState(false);
  const [focusedDate, setFocusedDate] = useState(undefined);
  function getListingData() {
    const listingID = window.location.pathname.split('/')[1];
    return axios.get(`/api/listings/${isNaN(listingID) ? 1 : listingID}`)
      .then((response) => {
        console.log(response.data);
        setListingData(response.data);
      })
      .catch((err) => {
        console.error(err);
        return err;
      });
  }
  function dropDownGuestsToggle() {
    setCheckingBool(false);
    setGuestsBool(!guestsBool);
  }
  function changeGuests(operation) {
    if (operation === 'decrease') {
      setGuests(guestsNum - 1);
    }
    if (operation === 'increase') {
      setGuests(guestsNum + 1);
    }
  }
  function dropDownCheckingToggle() {
    setGuestsBool(false);
    setCheckingBool(!checkingBool);
  }
  useEffect(() => {
    getListingData();
  }, []); //empty array tells us when useEffect is called (once)
  useEffect(() => {
    if (checkingDatesSet) {
      setCheckingBool(false);
    }
  }, [checkingDatesSet]); //every time checkingDateSet's state gets changed run useffect
  const dateSelectionProps = {
    checkingDates: [checkInDate, checkOutDate],
    setCheckInDate,
    setCheckOutDate,
    dropDownCheckingToggle,
    focusedDate,
    setFocusedDate,
    setCheckingDatesSet,
  };
  const checkingDropDownProps = {
    setCheckInDate,
    setCheckOutDate,
    setCheckingDatesSet,
    checkingDatesSet,
    checkingDates: [checkInDate, checkOutDate],
    dropDownCheckingToggle,
    focusedDate,
    setFocusedDate,
  };
  // const guestsProps = {
  //   dropdown: dropDownGuestsToggle,
  //   guestsNum,
  //   changeGuests,
  //   adultsNum,
  //   setAdultsNum,
  //   childrenNum,
  //   setChildrenNum,
  //   infantsNum,
  //   setInfantsNum,
  // };
  const guestsProps = {
    dropdown: dropDownGuestsToggle,
    guestsNum,
    infantsNum,
    guestsBool,
  };
  return (
    <div className={styles.mainContainer}>
      <div className={styles.mainGrid}>
        <span className={styles.mainPrice}>
          <span id={styles.mainPriceAmount}>
            {`$${listingData === undefined ? '' : listingData[0].fees.pernight}`}
          </span>
          <span id={styles.mainPricePerNight}>/ night</span>
        </span>
        <span className={styles.calendarReviews}>
          <svg id={styles.iconStar} viewBox="0 0 1000 1000" role="presentation" aria-hidden="true" focusable="false">
            <path d="M972 380c9 28 2 50-20 67L725 619l87 280c11 39-18 75-54 75-12 0-23-4-33-12L499 790 273 962a58 58 0 0 1-78-12 50 50 0 0 1-8-51l86-278L46 447c-21-17-28-39-19-67 8-24 29-40 52-40h280l87-279c7-23 28-39 52-39 25 0 47 17 54 41l87 277h280c24 0 45 16 53 40z" />
          </svg>
          <span id={styles.reviews}>{' 4.96'}</span>
          <span id={styles.reviewsNum}>
            {' '}
            {' (290)'}
          </span>
        </span>
        <DateSelection onDropdown={false} dateSelectionProps={dateSelectionProps} />
        {checkingBool && (
          <CheckingDropDown props={checkingDropDownProps} />)}
        <Guests props={guestsProps} />
        {guestsBool && (
          <GuestsDropDown dropdown={dropDownGuestsToggle} changeGuests={changeGuests} adultsNum={adultsNum} setAdultsNum={setAdultsNum} childrenNum={childrenNum} setChildrenNum={setChildrenNum} infantsNum={infantsNum} setInfantsNum={setInfantsNum} />
        )}
        <button className={styles.reserveButton} type="submit">{checkingDatesSet ? 'Reserve' : 'Check Availability'}</button>
      </div>
      {checkingDatesSet
        && (<Fees listingData={listingData} checkInDate={checkInDate} checkOutDate={checkOutDate} />)}
    </div>
  );
}
export default App;
