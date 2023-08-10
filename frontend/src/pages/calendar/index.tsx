import { momentLocalizer } from "react-big-calendar"
import { ReactBigCalendar } from "./ReactBigCalendar"
import moment from "moment"

const localizer = momentLocalizer(moment)

export const Calendar = () => {
  return <ReactBigCalendar localizer={localizer} />
}
