export const getImageURL = (name: string, extension = 'svg'): string => {
  return new URL(`../assets/icons/${name}.${extension}`, import.meta.url).href
}
