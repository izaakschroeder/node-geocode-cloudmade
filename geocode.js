
var http = require('http'), querystring = require('querystring');

function Geocoder(opts) {
	opts = opts || { };
	this.apiKey = opts.apiKey || "8ee2a50541944fb9bcedded5165f09d9";
	this.host = opts.host || "geocoding.cloudmade.com";
	this.path = "/" + this.apiKey + "/geocoding/v2/find.js" 
}

Geocoder.prototype.get = function(address, callback) {

	console.log(typeof callback);

	function localCallback(response) {
		var buffer = "";
		response.on("data", function(data) {
			buffer += data;
		}).on("end", function() {
			var json = JSON.parse(buffer);
			callback(json);
		})
	}

	if (typeof address === "object") {
		var query = "?query="
		if (address.address)
			url += "house:" + ";" + "street:" + ";" ;
		else if (address.street)
			url += "street:" + address.street + ";" ;
		if (address.city)
			url += "city:" + address.city + ";" ;
		if (address.province)
			url += "county:" + address.province + ";" ;
		if (address.country)
			url += "country:" + address.country + ";" ;
		http.get({
			host: this.host,
			path: this.path + query
		}, localCallback)
	}
	else {
		http.get({
			host: this.host,
			path: this.path + "?query=" + encodeURIComponent(address)
		}, localCallback)
	}
}

exports.create = function(opts) {
	return new Geocoder(opts);
}

var geocoder = null;

exports.get = function() {
	if (!geocoder)
		geocoder = new Geocoder(exports.settings);
	Geocoder.prototype.get.apply(geocoder, arguments);
}
