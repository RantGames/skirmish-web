/*global describe, it, $, jasmine, spyOn, expect, SkirmishGeo, SkirmishApp, SkirmishTroupMovement, SkirmishTrigger, beforeEach, afterEach */
"use strict";

describe("Troup Movement and Attack", function () {

  describe("clickhandler", function() {
    beforeEach( function () {
      spyOn(SkirmishTroupMovement, 'collateRawMove');
      spyOn(SkirmishTroupMovement, 'clickCountUpdater');
      spyOn(SkirmishGameState, 'getCurrentPlayerId');
      spyOn(SkirmishApp, 'sendMove');
      this.city = {id: 1}
      this.lastCity = {id: 2}
    });

    it('updates count', function () {
      spyOn(SkirmishTroupMovement, 'validMoveClick').and.returnValue(false);
      SkirmishTroupMovement.clickHandler(this.city);
      expect(SkirmishTroupMovement.clickCountUpdater).toHaveBeenCalled()
    });

    it('sends move if valid', function () {
      spyOn(SkirmishTroupMovement, 'validMoveClick').and.returnValue(true);
      SkirmishTroupMovement.clickHandler(this.city);
      expect(SkirmishApp.sendMove).toHaveBeenCalled()
    })

    it('updates last city clicked', function () {
      spyOn(SkirmishTroupMovement, 'validMoveClick').and.returnValue(false);
      SkirmishTroupMovement.setPreviousCityClicked(this.lastCity)
      SkirmishTroupMovement.clickHandler(this.city);
      expect(SkirmishTroupMovement.previousCityClicked()).toEqual(this.city)
    })

  });

  it('collates raw move', function () {
    var city = {id:1, playerId: 2};
    var lastCity = {id:3, playerId: 4};
    spyOn(SkirmishTroupMovement, 'calculateUnits').and.returnValue(5);
    var move = {moveType: 'attack', originId: 3, targetId: 1, unitCount: 5}
    expect(SkirmishTroupMovement.collateRawMove(lastCity, city)).toEqual(move)
  });

  describe('validates move click', function () {

    beforeEach(function () {
      this.city = {id:1}
      this.lastCity = {id:2}
      SkirmishTroupMovement.setClickCount(2);
    });

    it('as legal - different cities, last city clicked, clicks recorded, in range', function() {
      spyOn(SkirmishGeo,'checkRange').and.returnValue(true)
      expect(SkirmishTroupMovement.validMoveClick(this.lastCity, this.city)).toBe(true)
    })

    it('as illegal - same cities', function() {
      spyOn(SkirmishGeo,'checkRange').and.returnValue(true)
      this.lastCity = {id:1}
      expect(SkirmishTroupMovement.validMoveClick(this.lastCity, this.city)).toBe(false)
    })

    it('as illegal - no last city clicked', function() {
      spyOn(SkirmishGeo,'checkRange').and.returnValue(true)
      this.lastCity = null;
      expect(SkirmishTroupMovement.validMoveClick(this.lastCity, this.city)).toBe(false)
    })

    it('as illegal - no clicks recorded', function() {
      spyOn(SkirmishGeo,'checkRange').and.returnValue(true)
      SkirmishTroupMovement.setClickCount(0);
      expect(SkirmishTroupMovement.validMoveClick(this.lastCity, this.city)).toBe(false)
    })

    it('as illegal - out range', function() {
      spyOn(SkirmishGeo, 'checkRange').and.returnValue(false)
      expect(SkirmishTroupMovement.validMoveClick(this.lastCity, this.city)).toBe(false)
    })

  });

  describe('validates click count updater', function () {

    beforeEach(function () {
      this.city = {id:1, playerId: 2}
      this.lastCity = {id:1, playerId: 2, units:[{id:1},{id:2},{id:3},{id:4},{id:5}]}
      SkirmishTroupMovement.setClickCount(3);
      spyOn(SkirmishGameState, 'getCurrentPlayerId').and.returnValue(2)
    });

    it('increments clickCount for same city I own', function (){
      var result = SkirmishTroupMovement.clickCountUpdater(this.lastCity, this.city)
      expect(result).toEqual(4);
    });

    it('resets clickCount to zero when click on other cities twice', function (){
      this.city = {id:1, playerId: 3}
      this.lastCity = {id:2, playerId: 3, units:[{id:1},{id:2},{id:3},{id:4},{id:5}]}
      var result = SkirmishTroupMovement.clickCountUpdater(this.lastCity, this.city)
      expect(result).toEqual(0);
    });

    it('limits clickCount to 1 less than units on own same city', function (){
      SkirmishTroupMovement.setClickCount(5);
      var result = SkirmishTroupMovement.clickCountUpdater(this.lastCity, this.city)
      expect(result).toEqual(4);
    });

    it('resets clickCount for city I dont own', function() {
      this.city = {id:1, playerId: 3}
      var result = SkirmishTroupMovement.clickCountUpdater(this.lastCity, this.city)
      expect(result).toEqual(0);
    });

    it('resets clickCount to 1 when click on another own city', function () {
      this.city = {id:2, playerId: 2}
      var result = SkirmishTroupMovement.clickCountUpdater(this.lastCity, this.city)
      expect(result).toEqual(1);
    });

    it('resets clickCount to 1 when click on opening city', function () {
      this.city = {id:2, playerId: 2, units:[{id:1},{id:2},{id:3},{id:4},{id:5}]}
      this.lastCity = {id:-1, playerId: 2, units:[{id:1},{id:2},{id:3},{id:4},{id:5}]}
      var result = SkirmishTroupMovement.clickCountUpdater(this.lastCity, this.city)
      expect(result).toEqual(1);
    });

  });

  it('calculates Units from number of clicks', function() {
    var city = {units:{length:6}};
    expect(SkirmishTroupMovement.calculateUnits(city, 6)).toEqual(6)
  });

});
