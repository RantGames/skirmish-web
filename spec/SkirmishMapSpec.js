describe("SkirmishMap", function(){

	describe("display a city", function(){

		xit("plots a new city overlay on the map", function(){
			spyOn(SkirmishMap, 'CityOverlay');
			spyOn(SkirmishMap, 'setupDomClickListener');
			this.city = new City("cityname", [123,55], 1);
			SkirmishMap.displayCity(this.city);
			expect(SkirmishMap.CityOverlay).toHaveBeenCalled();
		});
	});

	describe("display cities", function(){
		it("displays cities", function(){
			spyOn(SkirmishMap, "displayCity");
			this.cities = [1,2,3];
			SkirmishMap.displayCities(this.cities);
			expect(SkirmishMap.displayCity).toHaveBeenCalled();
		});

	});

});
