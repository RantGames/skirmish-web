describe("SkirmishMap", function(){

	describe("display a city", function(){

		it("plots a new marker on the map", function(){
			spyOn(google.maps, 'Marker');
			this.city = new City("cityname", [123,55], 1);
			SkirmishMap.displayCity(this.city);
			expect(google.maps.Marker).toHaveBeenCalled();
		});
	});

	it("Displays a list of cities", function(){
		spyOn(SkirmishMap, "displayCity");
		SkirmishMap.displayCities([1,2,3]);
		console.log(SkirmishMap.displayCity.calls.count());
		expect(3).toBe(3);
	});

});