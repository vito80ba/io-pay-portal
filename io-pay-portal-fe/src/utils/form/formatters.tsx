export function expireDateFormatter(old: string, current: string) {
  if (current.length === 3 && !current.includes("/")) {
    return old + "/" + current.slice(-1);
  }
  return current;
}

export function cleanSpaces(text: string) {
  return text.replace(/\s/g, "");
}

export function moneyFormat(amount: number) {
  return new Intl.NumberFormat("it-IT", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount / 100);
}
