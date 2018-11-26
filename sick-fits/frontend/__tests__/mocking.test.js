function Person(name, foods) {
  this.name = name;
  this.foods = foods;
}

Person.prototype.fetchFavFoods = function() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(this.foods), 2000);
  });
};

describe("mocking learning", () => {
  it("mocks a reg function", () => {
    const fetchDogs = jest.fn();
    fetchDogs("snickers");
    expect(fetchDogs).toHaveBeenCalled();
    expect(fetchDogs).toHaveBeenCalledWith("snickers");
    fetchDogs("hugo");
    expect(fetchDogs).toHaveBeenCalledTimes(2);
  });

  it("can create a person", () => {
    const me = new Person("Juned", ["Biryani", "Haleem"]);
    const newMe = new Person("Juned", ["Biryani", "Haleem"]);
    //should fail as both object doesnt ref to same object
    //expect(me).toBe(newMe);
    expect(me.name).toBe("Juned");
  });

  it("can fetch foods", async () => {
    const me = new Person("Juned", ["Biryani", "Haleem"]);
    me.fetchFavFoods = jest
      .fn()
      .mockResolvedValue(["Chicken Tandoori", "Kababs"]);
    const favFoods = await me.fetchFavFoods();
    expect(favFoods).toContain("Kababs");
    //should fail as its case sensitive
    //expect(favFoods).toContain("kababs");
  });
});
