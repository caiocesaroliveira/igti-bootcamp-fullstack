const calculate = (initialCapital, rate, period) => {
  const values = []

  for (let a = 1; a <= period; a++) {
    const finalCapital = initialCapital * (1 + rate / 100) ** a
    const balance = finalCapital - initialCapital

    values.push({
      number: a,
      finalCapital,
      balance,
      percent: (balance * 100) / initialCapital,
    })
  }

  return values
}

export default calculate
