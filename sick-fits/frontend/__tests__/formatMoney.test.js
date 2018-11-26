import formatMoney from "../lib/formatMoney";

describe("formatMoney Function", () => {
  it("works with fractional dollars", () => {
    expect(formatMoney(3)).toEqual("$0.03");
    expect(formatMoney(80)).toEqual("$0.80");
    expect(formatMoney(99)).toEqual("$0.99");
  });

  it("leaves cents off for whole dollars", () => {
    expect(formatMoney(100)).toEqual("$1");
    expect(formatMoney(8000)).toEqual("$80");
    expect(formatMoney(52525200)).toEqual("$525,252");
  });

  it("works with whole and fractional dollars", () => {
    expect(formatMoney(101)).toEqual("$1.01");
    expect(formatMoney(4563)).toEqual("$45.63");
    expect(formatMoney(999)).toEqual("$9.99");
    // expect(formatMoney(20893749823749823749)).toEqual('$208,937,498,237,498,240.00');
  });
});
