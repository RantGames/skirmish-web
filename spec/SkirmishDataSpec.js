describe("SkirmishData", function(){

	describe("processJson", function(){
		it("processes json into new City objects", function(){
			this.data = {cities:[{name:"char"}]};
			expect(SkirmishData.processJson(this.data)[0] instanceof City).toBe(true);
		});
	});
	
});

