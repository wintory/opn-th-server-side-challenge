export const getAgeFromISODate = (isoDate: string) => {
  try {
    if (isoDate)
      return new Date().getFullYear() - new Date(isoDate).getFullYear()

    return undefined
  } catch (error) {
    console.error('Error parsing date:', error)
    return isoDate
  }
}
