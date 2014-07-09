/*global describe, it, $, jasmine, spyOn, expect, SkirmishGeo, SkirmishTroupMovement, SkirmishTrigger, beforeEach, afterEach */
"use strict";

describe("Troup Movement and Attack", function () {

  xit('clickHandler updates count', function () {
    SkirmishTroupMovement.setClickCount(0)
    var city = {id: 1}
    SkirmishTroupMovement.clickHandler(city)
    expect(clickCountUpdater).toEqual(1)

  });

  it('collates raw move', function () {
    var city = {id:1, playerId: 2};
    var lastCity = {id:3, playerId: 4};
    spyOn(SkirmishTroupMovement, 'calculateUnits').and.returnValue(5);
    var move = {moveType: 'attack', originId: 3, targetId: 1, unitCount: 5}
    expect(SkirmishTroupMovement.collateRawMove(lastCity, city)).toEqual(move)
  });

  it('calculates Units from number of clicks', function() {
    var city = {units:{length:6}};
    expect(SkirmishTroupMovement.calculateUnits(city, 4)).toEqual(5)
  });

  describe('validates move click', function () {

    beforeEach(function () {
      this.city = {id:1}
      this.lastCity = {id:2}
      SkirmishTroupMovement.setClickCount(2);
    });

    it('as legal - different cities, last city clicked, clicks recorded, in range', function() {
      spyOn(SkirmishGeo,'checkRange').and.returnValue(true)
      expect(SkirmishTroupMovement.validMoveClick(this.city, this.lastCity)).toBe(true)
    })

    it('as illegal - same cities', function() {
      spyOn(SkirmishGeo,'checkRange').and.returnValue(true)
      this.lastCity = {id:1}
      expect(SkirmishTroupMovement.validMoveClick(this.city, this.lastCity)).toBe(false)
    })

    it('as illegal - no last city clicked', function() {
      spyOn(SkirmishGeo,'checkRange').and.returnValue(true)
      this.lastCity = null;
      expect(SkirmishTroupMovement.validMoveClick(this.city, this.lastCity)).toBe(false)
    })

    it('as illegal - no clicks recorded', function() {
      spyOn(SkirmishGeo,'checkRange').and.returnValue(true)
      SkirmishTroupMovement.setClickCount(0);
      expect(SkirmishTroupMovement.validMoveClick(this.city, this.lastCity)).toBe(false)
    })

    it('as illegal - out range', function() {
      spyOn(SkirmishGeo, 'checkRange').and.returnValue(false)
      expect(SkirmishTroupMovement.validMoveClick(this.city, this.lastCity)).toBe(false)
    })

  });

});
