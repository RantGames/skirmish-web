describe("SkirmishData", function(){

	it("Has an empty cityArray", function(){
		expect(cityArray).toEqual([]);
	});

	beforeEach(function(){
		var obj = {
				cities: [
				{
						name: "Tokyo",
						latLng: [35.6800,139.7700],
						playerId: 3
					},

					{
						name: "Jakartka",
						latLng: [-6.2000, 106.8000],
						playerId: 2
					},

					{
						name: "Los Angeles",
						latLng: [34.0500, -118.2500],
						playerId: 2
					},

					{
						name: "New York City",
						latLng: [40.7127, -74.0059],
						playerId: 1
					}
					]
				}
	});

	it("makes a cities variable with the cities from data", function(){
		expect(cities).toEqual(obj.cities);
	});

});