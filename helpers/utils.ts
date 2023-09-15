export const convertDateString = (
  dateString: string | Date | null,
  options: {}
) => {
  if (dateString === null) {
    return null // or handle the null case appropriately
  }

  const dateObj = new Date(dateString)
  const formattedDate = dateObj.toLocaleString(undefined, options)

  return formattedDate
}
