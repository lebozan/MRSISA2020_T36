import React from 'react'
import PricesRow from './PricesRow';
import axios from 'axios';

// Component for rendering rows of appointment type prices in each clinic price list
export default function PricesComponent(props) {
  const {prices, changeAppointmentTypePrice, priceListId} = props;

  const changeItemPrice = (appointmentType, newValue) => {
    var newPrices = prices;
    var data = {
      priceListId,
      updateKey: appointmentType,
      updateValue: newValue
    }

    axios.put('http://localhost:8080/api/clinics/changePrice', data)
      .then(res => {
        if (res.data) {
          newPrices[appointmentType] = newValue;
          changeAppointmentTypePrice(newPrices);

        }
      })
      .catch(error => console.log(error))

  };

  const returnPrices = (prices) => {
    var rows = []
    for (const [key, value] of Object.entries(prices)) {
      rows.push(<PricesRow key={key + 'row'} appointmentType={key} appointmentPrice={value} changeItemPrice={changeItemPrice} />);
    }
    return rows;
  };


  return (
    <React.Fragment>
      {returnPrices(prices)}
    </React.Fragment>
  )
}
