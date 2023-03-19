import moment from "moment"


export const FORMAT_DATE = 'DD.MM.YYYY'
export const FORMAT_DATE_ISO = 'YYYY-MM-DD'

export const format_date = (date, format=FORMAT_DATE) => date ? moment(date).format(format) : null
export const format_date_iso = (date) => format_date(date, FORMAT_DATE_ISO)

export const str_to_date = (date, format=FORMAT_DATE_ISO) => date?.length > 0 ? moment(date, format).toDate() : null
