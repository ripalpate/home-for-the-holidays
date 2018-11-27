import axios from 'axios';
import apiKeys from '../../../db/apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getHolidaysByArrayOfIds = (uid, holidayIdsArray) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/holidays.json?orderBy="uid"&equalTo="${uid}"`)
    .then((result) => {
      // console.log(holidayIdsArray);
      const holidaysObject = result.data;
      const holidaysArray = [];
      if (holidaysObject !== null) {
        Object.keys(holidaysObject).forEach((holidayId) => {
          holidaysObject[holidayId].id = holidayId;
          holidaysArray.push(holidaysObject[holidayId]);
        });
      }
      // console.log(holidaysArray);
      const selectedHolidays = holidaysArray.filter(x => holidayIdsArray.includes(x.id));
      resolve(selectedHolidays);
    })
    .catch((err) => {
      reject(err);
    });
});

export default { getHolidaysByArrayOfIds };
