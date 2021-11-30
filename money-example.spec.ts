import { Sum, Bank, Money } from './money-example';

describe(`The Money Example`, () => {
  it(`
    testMultiplication()
  `, () => {
    const dollar = Money.dollar(5);
    const franc = Money.franc(5);
    expect(dollar.times(2)).toMatchObject({amount: 10, currency: "USD"});
    expect(dollar.times(3)).toMatchObject({amount: 15, currency: "USD"});
    expect(franc.times(2)).toMatchObject({amount: 10, currency: "CHF"});
    expect(franc.times(3)).toMatchObject({amount: 15, currency: "CHF"});
  });
  it(`
    testEquality()
  `, () => {
    expect(Money.dollar(5).equals(Money.dollar(5))).toBe(true);
    expect(Money.dollar(5).equals(Money.dollar(6))).toBe(false);
    expect(Money.franc(5).equals(Money.dollar(5))).toBe(false);
  })
  it(`
    testCurrency()
    `, () => {
      expect(Money.dollar(1).getCurrency()).toEqual("USD");
      expect(Money.franc(1).getCurrency()).toEqual("CHF");
    });
    it(`
    testSimpleAddition()
    `, () => {
      const five = Money.dollar(5)
      const sum = five.plus(five);
      const bank = new Bank();
      const reduced = bank.reduce(sum, "USD");
      expect(reduced).toMatchObject({amount: 10, currency: "USD"});
    });
    it(`
    testReduceSum()
    `, () => {
      const sum = new Sum(Money.dollar(3), Money.dollar(4));
      const bank = new Bank();
      const result = bank.reduce(sum, "USD");
      expect(result).toMatchObject({amount: 7, currency: "USD"});
    });
    it(`
    testReduceMoney()
    `, () => {
      const bank = new Bank();
      const result = bank.reduce(Money.dollar(1), "USD");
      expect(result).toMatchObject({amount: 1, currency: "USD"});
    });
    it(`
      testReduceDifferentCurrency()
      `, () => {
        const bank = new Bank();
        bank.addRate("CHF", "USD", 2);
        const result = bank.reduce(Money.franc(2), "USD");
        expect(result).toMatchObject({amount: 1, currency: "USD"});
      });
      it(`
        testArrayEquals()
        `, () => {
          expect(new Object("USD")).toMatchObject(new Object("USD"));
        });
        it(`
        testIdentityRate()
        `, () => {
          expect(new Bank().rate("USD", "USD")).toEqual(1);
        });
        it(`
        testMixedAddition()
        `, () => {
          const dollar = Money.dollar(5);
          const franc = Money.franc(10);
          const bank = new Bank();
          bank.addRate("CHF", "USD", 2);
          const result = bank.reduce(dollar.plus(franc), "USD");
          expect(result).toMatchObject({amount: 10, currency: "USD"});
        });
        it(`
        testSumPlusMoney()
        `, () => {
          const dollar = Money.dollar(5);
          const franc = Money.franc(10);
          const bank = new Bank();
          bank.addRate("CHF", "USD", 2);
          const sum = new Sum(dollar, franc).plus(dollar);
          const result = bank.reduce(sum, "USD");
          expect(result).toMatchObject({amount: 15, currency: "USD"});
        });
        it(`
        testSumTimes()`, () => {
          const dollar = Money.dollar(5);
          const franc = Money.franc(10);
          const bank = new Bank();
          bank.addRate("CHF", "USD", 2);
          const sum = new Sum(dollar, franc).times(2);
          const result = bank.reduce(sum, "USD");
          expect(result).toMatchObject({amount: 20, currency: "USD"});
        });
});