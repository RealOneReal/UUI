import { getDecimalLength, getCalculatedValue } from "../numericInputCalculations";

describe('numericInputCalculations', () => {
    it('getDecimalLength return length of the decimal value', () => {
        expect(getDecimalLength(2)).toBe(0);
        expect(getDecimalLength(0.123)).toBe(3);
        expect(getDecimalLength(1.25)).toBe(2);
        expect(getDecimalLength(1.3333333333)).toBe(10);
    });
    it('getCalculatedValue return calculated value with default step and action', () => {
        expect(getCalculatedValue({ value: 1.25})).toBe(2.25);
        expect(getCalculatedValue({ value: 2})).toBe(3);
        expect(getCalculatedValue({ value: 4.225})).toBe(5.225);
    });
    it('getCalculatedValue return incremented value with custom step ', () => {
        expect(getCalculatedValue({ value: 1.33, step: 0.125})).toBe(1.455);
        expect(getCalculatedValue({ value: 2, step: 0.01})).toBe(2.01);
        expect(getCalculatedValue({ value: 4.225, step: 0.3})).toBe(4.525);
    });
    it('getCalculatedValue return decremented value with custom step ', () => {
        expect(getCalculatedValue({ value: 10.33333, step: 0.008, action: "decr"})).toBe(10.32533);
        expect(getCalculatedValue({ value: 2, step: 1.0026, action: "decr"})).toBe(0.9974);
        expect(getCalculatedValue({ value: 4.225, step: 0.03, action: "decr"})).toBe(4.195);
    });
});