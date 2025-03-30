import moment from "moment-timezone";
const timezone:string = "America/El_Salvador";


export const convertDateLocalToUTC = (localTime: string) => {;
    return moment(localTime, "YYYY-MM-DD").utc().startOf("day").toISOString();
  };

export const convertUTCtoDateLocal = (utcTime: string) => {
    return moment.utc(utcTime).format("YYYY-MM-DD");
  };