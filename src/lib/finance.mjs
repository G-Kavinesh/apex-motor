/** Fixed-rate amortization estimate; excludes taxes, fees and balloon payments. */
export function estimateFinance(price, depositPercent, annualRate, months) {
  if (![price, depositPercent, annualRate, months].every(Number.isFinite) || price < 0 || depositPercent < 0 || depositPercent > 100 || annualRate < 0 || !Number.isInteger(months) || months < 1) throw new RangeError('Invalid finance inputs');
  const deposit = price * depositPercent / 100;
  const principal = price - deposit;
  const rate = annualRate / 1200;
  const monthly = rate === 0 ? principal / months : principal * rate / (1 - Math.pow(1 + rate, -months));
  const total = monthly * months + deposit;
  return { deposit, principal, monthly, interest: Math.max(0, total - price), total };
}
