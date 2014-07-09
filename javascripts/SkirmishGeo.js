

var SkirmishGeo = (function () {

  var publik = {};

  publik.checkRange = function(originCity, targetCity) {
    var p1 = {};
    var p2 = {};
    var range = 1000;
    p1.lat = originCity.latLng[0];
    p1.lng = originCity.latLng[1];
    p2.lat = targetCity.latLng[0];
    p2.lng = targetCity.latLng[1];
    var interCityDistance = publik.getDistance(p1,p2)

    if(interCityDistance > range) {SkirmishDOM.flash('Target city not within range')};
    return interCityDistance <= range;
  };

    //Courtesy Mike Williams
    var rad = function(x) {
      return x * Math.PI / 180;
    };

    publik.getDistance = function(p1, p2) {
      var R = 6378137; // Earth’s mean radius in meter
      var dLat = rad(p2.lat - p1.lat);
      var dLong = rad(p2.lng - p1.lng);
      var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) *
        Math.sin(dLong / 2) * Math.sin(dLong / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c;
      return d/1000; // returns the distance in meter
    };
    //

  return publik

}());
