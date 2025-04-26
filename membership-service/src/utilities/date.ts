export const getAgeFromISODate = (isoDate: string) => {
  if (isoDate) return new Date().getFullYear() - new Date(isoDate).getFullYear()

  return undefined
}
