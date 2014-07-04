describe("Process JSON function", function(){

	xit("cityArray starts off as an empty array", function(){
		expect(cityArray.length).toEqual(0);
	});

	xit("the cities variable has all objects in an array",function(){
		expect(cities.length).toEqual(2);
	});


	describe("After the processing of JSON data", function(){
		
		beforeEach(function(){
			processJson();	
		});

		afterEach(function(){
			cityArray = [];
		});
		

		xit("cityArray will no longer be empy", function(){
			expect(cityArray.length).not.toEqual(0);
		});

		xit("the objects inside cityArray should be City objects", function(){
			expect(cityArray[1] instanceof City).toBe(true);
		});

		xit("A city object should have a name", function(){
			expect(cityArray[0].name).not.toBe(null);
		});

		xit("cityArray should have all the items from JSON in its array", function(){
			expect(cityArray.length).toEqual(2);
		});
	});


});
