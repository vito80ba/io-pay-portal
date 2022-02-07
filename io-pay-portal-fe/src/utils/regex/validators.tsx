export function emailValidation(email: string) {
  return /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i.test(
    email
  );
}

export function cardNameValidation(name: string) {
  return /^[a-zA-Z]+[\s']+([a-zA-Z]+[\s']*){1,}$/.test(name);
}

export function cardNumberValidation(ccnumber: string) {
  return /^[0-9\\*]{15,19}$/.test(ccnumber);
}

export function cardMonthValidation(month: string) {
  return /^(0[1-9]|1[0-2])$/.test(month);
}

export function cardYearValidation(year: string) {
  return /^[0-9]{2}$/.test(year);
}

export function cvvValidation(cvv: string) {
  return /^[0-9]{3,4}$/.test(cvv);
}

export function digitValidation(text: string) {
  return /^\d+$/.test(text);
}

export function expirationDateValidation(text: string) {
  return /^((0[1-9]|1[0-2])|([1-9]))\/[0-9]{2}$/.test(text);
}
