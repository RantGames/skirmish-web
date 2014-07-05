describe("City model", function(){

	beforeEach(function(){
		city = new City("London", [123,556], 4);
	});

	it("City object is created with name", function(){
		expect(city.name).toBe("London");
	});

	it("City object is created with latLng", function(){
		expect(city.latLng).toEqual([123,556]);
	});

	it("City object has a player ID", function(){
		expect(city.playerId).toEqual(4);
	});

});