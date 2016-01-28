"use strict"
var Game = require('./game.js');

var roomID = 1;
var rooms = [];

setInterval(function () {
	for (var i = 0; i < rooms.length; i++) {
		if (rooms[i].game.clients.length == 0 && !rooms[i].presist) {
			rooms.splice(i, 1);
		}
	}
}, 1000);

var Room = {
	setConfig: function (code) {
		this.code = code;
	},
	createRoom: function (type, presist) {
		var maxUser = 6;
		if (type) {
			maxUser = 20;
		}
		var room = {
			id: roomID++,
			presist: presist,
			game: new Game(this.code, maxUser, type, Room.removeRoom),
			name: type
		}
		rooms.push(room);
		return room;
	},
	removeRoom: function (game) {
		for (var i = 0; i < rooms.length; i++) {
			if (rooms[i].game == game) {
				rooms.splice(i, 1);
				break;
			}
		}
	},
	findRoom: function (roomID) {
		for (var i = 0; i < rooms.length; i++) {
			if (rooms[i].id == roomID) {
				return rooms[i];
			}
		}
	},
	getRoomData: function () {
		var rdata = [];
		for (let room of rooms) {
			rdata.push({
				id: room.id,
				maxUser: room.game.props.maxUser,
				users: room.game.users.length,
				name: room.name
			})
		}
		return rdata;
	}
}
module.exports = Room;