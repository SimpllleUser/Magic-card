describe('Sum function', () => {
  it('should add two numbers', () => {
    const sum = (a: number, b: number) => a + b;
    expect(sum(2, 3)).toBe(5);
  });
});
