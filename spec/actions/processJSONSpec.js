describe("Process JSON function", function(){


	describe("the buildCityArray method", function(){
		it("cityArray starts off as an empty array", function(){
			buildCityArray;
			expect(cityArray.length).toEqual(0);
		});
	});

	describe("the buildCities function", function(){
		it("returns an array of cities", function(){
			buildCities;
			expect(cities instanceof Object).toBe(true);
		});
	});


	describe("After the processing of JSON data", function(){
		
		beforeEach(function(){
			processJson(obj);	
		});

		it("cityArray will no longer be empy", function(){
			expect(cityArray.length).not.toEqual(0);
		});

		it("the objects inside cityArray should be City objects", function(){
			expect(cityArray[1] instanceof City).toBe(true);
		});

		it("A city object should have a name", function(){
			expect(cityArray[0].name).not.toBe(null);
		});

	});


});
