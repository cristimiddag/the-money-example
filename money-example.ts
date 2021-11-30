interface Expression {
  reduce(bank: Bank, to: string): Money;

  plus(addend: Expression): Expression;

  times(multiplier: number): Expression;
}

export class Money implements Expression {
  public amount: number;

  constructor(amount: number, currency: string) {
    this.amount = amount;
    this.currency = currency;
  }

  public times = (multiplier: number): Expression => {
    return new Money(this.amount * multiplier, this.currency);
  }

  public plus = (addend: Expression): Expression => {
    return new Sum(this, addend);
  }

  public equals = (object: Object): boolean => {
    const money = object as Money;
    return this.amount === money.amount && this.getCurrency() === money.getCurrency();
  }

  static dollar = (amount: number) => {
    return new Money(amount, "USD");
  }

  static franc = (amount: number) => {
    return new Money(amount, "CHF");
  }

  protected currency: string;
  getCurrency = (): string => {
    return this.currency;
  }

  public toString = (): string => {
    return this.amount + " " + this.currency;
  }

  public reduce = (bank: Bank, to: string): Money => {
    const rate = bank.rate(this.currency, to);
    return new Money(this.amount / rate, to);
  }
}

export class Dollar extends Money{

  constructor(amount: number, currency: string) {
    super(amount, currency);
    }
}

export class Franc extends Money {

  constructor(amount: number, currency: string) {
    super(amount, currency);
    }
}

export class Bank {
  public amount: number;

  rate = (from: string, to: string): number => {
    if (from === to) {
      return 1;
    }
    const rate = this.rates.get(Pair.key(from, to));
    return rate;
  }

  reduce = (source: Expression, to: string): Money => {
    return source.reduce(this, to);
  }

  private rates = new Map<string, number>();

  addRate = (from: string, to: string, rate: number): void => {
    this.rates.set(Pair.key(from, to), rate);
  };
}

export class Sum implements Expression {

  augend: Expression;
  addend: Expression;

  constructor(augend: Expression, addend: Expression) {
    this.augend = augend;
    this.addend = addend;
  }

  public reduce = (bank: Bank, to: string): Money => {
    const amount = this.augend.reduce(bank, to).amount + this.addend.reduce(bank, to).amount;
    return new Money(amount, to);
  }

  public plus = (addend: Expression): Expression => {
    return new Sum(this, addend);
  }

  public times = (multiplier: number): Expression => {
    return new Sum(this.augend.times(multiplier), this.addend.times(multiplier))
  }
}

export class Pair {
  private from: string;
  private to: string;

  constructor(from: string, to: string) {
    this.from = from;
    this.to = to;
  }

  static key = (from: string, to: string) => new Pair(from, to).toString();

  public equals = (object: Object): boolean => {
    const pair = object as Pair;
    return (this.from === pair.from) && (this.to === pair.to);
  }

  public toString = () => `${this.from}-${this.to}`
}

