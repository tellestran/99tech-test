export const getTokenIconUrl = (symbol: string) => {
  const sym = (symbol || '').toUpperCase().trim();
  return `https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${sym}.svg`;
}
