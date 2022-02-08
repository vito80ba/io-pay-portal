export function expireDateFormatter(old: string, current: string) {
  if (current.length === 3 && !current.includes("/")) {
    return old + "/" + current.slice(-1);
  }
  return current;
}

export function cleanSpaces(text: string) {
  return text.replace(/\s/g, "");
}
