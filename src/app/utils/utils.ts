export const addToDollars = (m1: string, m2: string) => {
  let num1 = parseFloat(m1.replace('$', ''));
  let num2 = parseFloat(m2.replace('$', ''));
  return '$' + (num1 + num2).toFixed(2);
};

export const getCurrentMinutes = () => {
  return new Date().getMinutes() + new Date().getHours() * 60;
};

export const dollarToRupee = (dollar: string) => {
  return '₹' + (parseFloat(dollar.replace('$', '')) * 74.5).toFixed(2);
};

