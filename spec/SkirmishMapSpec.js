describe("SkirmishMap", function(){

	describe("display a city", function(){

		it("plots a new marker on the map", function(){
			spyOn(google.maps, 'Marker');
			this.city = new City("cityname", [123,55], 1);
			SkirmishMap.displayCity(this.city);
			expect(google.maps.Marker).toHaveBeenCalled();
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