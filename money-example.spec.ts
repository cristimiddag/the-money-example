import { Sum, Bank, Money } from './money-example';

describe(`The Money Example`, () => {
  it(`
    testMultiplication()
  `, () => {
    let dollar = Money.dollar(5);
    let franc = Money.franc(5);
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
      let five = Money.dollar(5)
      let sum = five.plus(five);
      let bank = new Bank();
      let reduced = bank.reduce(sum, "USD");
      expect(reduced).toMatchObject({amount: 10, currency: "USD"});
    });

    it(`
    testReduceSum()
    `, () => {
      let sum = new Sum(Money.dollar(3), Money.dollar(4));
      let bank = new Bank();
      let result = bank.reduce(sum, "USD");
      expect(result).toMatchObject({amount: 7, currency: "USD"});
    });

    it(`
    testReduceMoney()
    `, () => {
      let bank = new Bank();
      let result = bank.reduce(Money.dollar(1), "USD");
      expect(result).toMatchObject({amount: 1, currency: "USD"});
    }); 

    it(`
      testReduceDifferentCurrency()
      `, () => {
        let bank = new Bank();
        bank.addRate("CHF", "USD", 2);
        let result = bank.reduce(Money.franc(2), "USD");
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
          let dollar = Money.dollar(5);
          let franc = Money.franc(10);
          let bank = new Bank();
          bank.addRate("CHF", "USD", 2);
          let result = bank.reduce(dollar.plus(franc), "USD");
          expect(result).toMatchObject({amount: 10, currency: "USD"});
        });

        it(`
        testSumPlusMoney()
        `, () => {
          let dollar = Money.dollar(5);
          let franc = Money.franc(10);
          let bank = new Bank();
          bank.addRate("CHF", "USD", 2);
          let sum = new Sum(dollar, franc).plus(dollar);
          let result = bank.reduce(sum, "USD");
          expect(result).toMatchObject({amount: 15, currency: "USD"});
        });

        it(`
        testSumTimes()`, () => {
          let dollar = Money.dollar(5);
          let franc = Money.franc(10);
          let bank = new Bank();
          bank.addRate("CHF", "USD", 2);
          let sum = new Sum(dollar, franc).times(2);
          let result = bank.reduce(sum, "USD");
          expect(result).toMatchObject({amount: 20, currency: "USD"});
        });
});