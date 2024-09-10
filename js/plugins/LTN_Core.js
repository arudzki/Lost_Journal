/**
 * @file LTN Core is a utility plugin for RPG Maker MV.
 * @author LTN Games
 * @version 0.8.8
 */
//=============================================================================
// LTN_Core.js
//=============================================================================
/*:
 @plugindesc v0.8.8 LTN Core Utility Plugin. Place above all LTN plugins.

 @author LTN Games

 @param ================
 @param  Resolution Options
 @param ================

 @param Screen Width
 @desc Adjusts the resoltuion (width) of the screen.
 Default: 816
 @default 816

 @param Screen Height
 @desc Adjusts the resoltuion (height) of the screen.
 Default: 624
 @default 624

 @param Tile Size
 @desc The size of the tiles you want to use in game.
 Default: 48
 @default 48

 @param Start Full Screen
 @desc Start the game in full screen mode.
 Default: false
 @default false

 @param Re-scale Backgrounds
 @desc This will scale backgrounds to new resolution.
 Default: title:false, gameover:false, battle:false
 @default title:false, gameover:false, battle:false

 @param Re-position Battlers
 @desc This will re-position the battlers to new reolution.
 Default: false
 @default false

 @param Force Renderer
 @desc Force the renderer type for pixi. Canvas or WebGL
 Default: force:false, type:webgl
 @default force:false, type:webgl

 @param ================
 @param  Debug Options
 @param ================

 @param Print Debug
 @desc Prints the name and version of this plugin.
 @default false

 @param Open Console
 @desc Open Console on bootup.
 @default false

 @param Skip Title
 @desc Skips the title scene on boot.
 @default false

 @param Show FPS
 @desc Opens FPS meter on boot.
 @default false

 @param ================
 @param  Screenshot Options
 @param ================

 @param Screenshot Key
 @desc What key would you like to use to take a screenshot
 Default: 44
 @default 44

 @param Screenshot Path
 @desc Where would you like to save your screenshots. Please ensure folder exists.
 Default: / - Root directory
 @default /

 @param Screenshot Quality
 @desc What would you like the quality of the image to be.
 Default: 90  - Max value is 100;
 @default 90


 @param ================
 @param  Bug Fixes
 @param ================

 @param Vehicle BGM Fix
 @desc Fix vehicle bgm not changing when exiting on different map
 than when you got on vehicle.
 @default true
 @help
 ================================================================================
 ▼ TERMS OF USE
 ================================================================================
 Credit must be given to: LTN Games

 Exclusive to rpgmakermv.co, please don't share anywhere else unless given strict
 permission by the author of the plugin.

 You may modify this plugin for your own use, but you cannot claim it as your own.

 This plugin may be used in commerical and non-commerical products.

 ============================================================================
 ▼ DONATIONS
 ============================================================================
Most of the plugins I write are free to use commercially, and I put a lot of
hours into the development of my plugins, If you like my work and want to see
more of it in the future, I ask that you consider offering a donation.

If you do wish to provide your support, you can do so by sending your
contribution via PayPal to: LTNGamesDevelopment(at)gmail.com


 ================================================================================
 ▼ INFORMATION
 ================================================================================
 LTN Games core plugin is required for all other LTN plugins to work.
 This core plugin conains common and useful functions for plugin development.
 It also extends the functionality of RPG Maker MV by providing bug fixes and
 debug options.

 The current version is still in Beta and does not contain all the functionality
 intended for the offical release. It will be updated over the next month with
 more bug fixes, more options and extended functionality. Please keep it up to
 date if you plan on using this Core plugin.

 */


/**-----------------------------------------------------------------------
 * Start Of Utility Core >>
 *
 ------------------------------------------------------------------------*/

/** @namespace LTNCore */

/**
 * LTNCore is the namespace of this module, it holds all the common functions
 * plugin parameters and aliases of all plugins developed with LTNCore.
 * @namespace LTNCore
 */
var LTNCore = LTNCore || {};

/**
 * LTN is simple and shorter version of LTNCore for easier access.
 * @namespace LTN
 * @memberof LTNCore
 * @member {Object}
 */
var LTN = LTNCore;

/*@TODO
 - Remove all for each() function as it has been deprecated in ECMA5 script. Replace with for loops or for in.
 -
*/

(function ($) {
	"use strict";
	/**
     * LTN.Core, will hold all core params and aliases(if needed);
     * @namespace Core
     * @member {Object}
     * @memberof LTNCore
     */
	$.Core = $.Core || {};

	/**
     * LTN.Core, will hold all core params and aliases(if needed);
     * @namespace Core
     * @member {Object}
     * @memberof LTNCore
     */
	$.Alias = $.Alias || {};

	/**
     * VERSION is an object representing the current version of this core plugin.
     * @member {String}
     * @memberof LTNCore
     */
	$.VERSION = "0.8.8";

	/**
     * Utilities is an object containing all utility functions.
     * @member {Object}
     * @access private
     */
	var Utilities = Utilities || {};

	/**
     * $Utils is a shorter version of Utilities namespace for easy access in this core plugin.
     * @member {Object}
     * @access private
     */
	var $Utils = Utilities;

	/**
     * Plugins is an object containing all registered plugins.
     * @member {Object}
     * @access private
     */
	var Plugins = Plugins || {};

	/**-----------------------------------------------------------------------
     * Start Of Core Parameters >>
     *
     ------------------------------------------------------------------------*/

	$.Core.Parameters = PluginManager.parameters('LTN_Core');
	$.Core.Param = $.Core.Param || {};

	/*Resolution Setting*/
	$.Core.Param.screenWidth     = Number($.Core.Parameters['Screen Width'] || 816);
	$.Core.Param.screenHeight    = Number($.Core.Parameters['Screen Height'] || 624);
	$.Core.Param.tileSize        = Number($.Core.Parameters['Tile Size'] || 48);
	$.Core.Param.scaleBacks      = String($.Core.Parameters['Re-scale Backgrounds']);
	$.Core.Param.reposBattlers   = Boolean($.Core.Parameters['Re-position Battlers'] === 'true' || false);
	$.Core.Param.renderChoice    = String($.Core.Parameters['Force Renderer']);
	$.Core.Param.startFullScreen = Boolean($.Core.Parameters['Start Full Screen'] === 'true' || false);

	/*Appearance Setting*/


	/*Debug Setting*/
	$.Core.Param.openConsole       = Boolean($.Core.Parameters['Open Console'] === 'true' || false);
	$.Core.Param.printDebugInfo    = Boolean($.Core.Parameters['Print Debug'] === 'true' || false);
	$.Core.Param.skipTitle 	       = Boolean($.Core.Parameters['Skip Title'] === 'true' || false);
	$.Core.Param.fpsStart  		   = Boolean($.Core.Parameters['Show FPS'] === 'true' || false);

	/*Screenshot Settings*/
	$.Core.Param.screenshotKey     = Number($.Core.Parameters['Screenshot Key'] || 44);
	$.Core.Param.screenshotPath    = String($.Core.Parameters['Screenshot Path'] || '/');
	$.Core.Param.screenshotQuality = Number($.Core.Parameters['Screenshot Quality'] / 100 || 0.7);

	/*Bugfix Setting*/
	$.Core.Param.vehicleBGMFix   = Boolean($.Core.Parameters['Vehicle BGM Fix'] === 'true' || false);

	/**
     * Print the namespace module version to console.
     */
	if ($.Core.Param.printDebugInfo) {
		var args = [
			'\n %c %c %c LTNCore.js ' + $.VERSION + ' %c ' + ' \n\n',
			'background: #092496; padding:5px 0;',
			'background: #092496; padding:5px 0;',
			'color: #3cb4a6; background: #0b0b14; padding:5px 0;',
			'background: #092496; padding:5px 0;'
		];

		window.console.log.apply(console, args); //jshint ignore:line
	}


	/**-----------------------------------------------------------------------
     * Start Of Utility functions >>
     *
     *
     ------------------------------------------------------------------------*/

	/**
     * @module Utilities
     * @desc This module contains general and useful utility functions for RMMV.
     * @access protected
     */
	(function ($) {
		/**
         * @function
         * @name isObject
         * @memberof module:Utilities
         * @desc Checks if a varaible is an object.
         * @param {Object} obj The object to be checked.
         * @returns {Boolean} Return true if the object is an object.
         */
		function isObject(obj) {
			return obj && Object.prototype.toString.call(obj) === '[object Object]';
		}


		/**
         * @function
         * @name isFunction
         * @memberof module:Utilities
         * @desc Checks if an object is a function
         * @param {Object} obj - The object to be checked.
         * @returns {Boolean} Return true if the object is a function.
         */
		function isFunction(obj) {
			return obj && Object.prototype.toString.call(obj) === '[object Function]';
		}

		/**
         * @function
         * @name isArray
         * @memberof module:Utilities
         * @desc Checks if an object is an array
         * @param {Object} obj - The object to be checked.
         * @returns {Boolean} Return true if the object is an array.
         */
		function isArray(obj) {
			return obj && Object.prototype.toString.call(obj) === '[object Array]';
		}


		/**
         * @function
         * @name isDefined
         * @memberof module:Utilities
         * @desc Checks if an object is defined
         * @param {Object} obj - The object to be checked.
         * @returns {Boolean} Return true if the object is defined.
         */
		function isDefined(obj) {
			return typeof obj !== 'undefined' || [obj] in window;
		}


		/**
         * @function
         * @name isEmpty
         * @memberof module:Utilities
         * @desc Checks if an object is empty or cotnains undefined properties.
         * @param {Object} obj - The object to be checked.
         * @returns {Boolean} Return true if the object is empty.
         */
		function isEmpty(obj) {
			for(var prop in obj) {
				if(obj.hasOwnProperty(prop)){return false;}
			}
			return true;
		}

		/**
         * @function
         * @name toObj
         * @memberof module:Utilities
         * @desc Converts an array to an object.
         * @param {Object} type The array to be converted.
         * @returns {Boolean} Return an array of the object.
         */
		function toObj(type) {
			var obj = {};
			if($.isArray(type)) {
				for (var i = 0; i > type.length; i++) {
					obj = type[i];
				}
				return obj;
			}
			if(typeof type === 'string'){
				var cleanStr = type.trim();
				var properties = cleanStr.split(', ');

				properties.forEach(function(property) {
					var tup = property.split(':');
					obj[tup[0]] = !isNaN(tup[1]) ? parseInt(tup[1]) : tup[1].trim();
				});

				return obj;
			}

		}

		/**
         * @function
         * @name toArray
         * @memberof module:Utilities
         * @desc Converts an object, string to an array.
         * @param {Object} {string} type - The type to be converted.
         * @returns {Boolean} Return an array of the object.
         */
		function toArray(type) {
			if(typeof type === 'object'){
				return Array.prototype.slice.call(type);
			}
			if(typeof type === 'string'){
				var newArr = [];
				var cleanStr = type.trim();
				var strArr = cleanStr.includes(',') ? cleanStr.split(',') : cleanStr.split(' ');
				for(var i = 0; i < strArr.length; i++){
					var index = !isNaN(strArr[i]) ? parseInt(strArr[i]) : strArr[i].trim();
					newArr.push(index);
				}
				return newArr;
			}
		}

		/**
         * @function
         * @name toBool
         * @memberof module:Utilities
         * @desc Converts an object, string to an array.
         * @param {Object} {string} type - The type to be converted.
         * @returns {Boolean} Return an array of the object.
         */
		function toBool(string) {
			switch(string.toLowerCase()) {
				case 'true':
					return true;
				case 'false':
					return false;
				case 'yes':
					return true;
				case 'no':
					return false;
				case 'enable':
					return true;
				case 'disable':
					return false;
				default:
					throw new Error('LTN Core: Cannot parse string to boolean');
			}
		}

		/**
         * @function
         * @name toString
         * @memberof module:Utilities
         * @desc Converts an object, string to an array.
         * @param {Object} {string} type - The type to be converted.
         * @returns {Boolean} Return an array of the object.
         */
		function toString (obj) {
			var str = '';
			for (var p in obj) {
				if (obj.hasOwnProperty(p)) {
					str += p + '::' + obj[p] + '\n';
				}
			}
			return str;
		}
		/**
         * @function
         * @name inBetween
         * @memberof module:Utilities
         * @desc Determines if a number is in between to numbers.
         * @param {number} a - The lowest number to check.
		 * @param {number} b - The highest number to check.
         * @returns {Boolean} Return true if in between to numbers.
         */
		function inBetween (a, b) {
			/*jshint validthis: true */
			var min = Math.min(a, b),
				max = Math.max(a, b);

			return this > min && this < max;
		}

		/**
         * @function
         * @name tryEval
         * @memberof module:Utilities
         * @desc An eval with try error method, it will try to eval and throw error if not succesful.
         * @param {Object} text - The text/expression to evaluate
         * @returns {Result} The result of the evaulated text.
         */
		function tryEval (text) {
			try {
				return eval(text); //jshint ignore:line
			}
			catch(e) {
				console.error(e);
				return null;
			}
		}

		/**
         * @function
         * @name hexToRgb
         * @memberof module:Utilities
         * @desc Converts hex values to rgb values
         * @param {Number} hex - the hex value you want to convert
         * @returns {String} A string representing the rgb value after conversion.
         */
		function hexToRgb(hex) {
			var int = parseInt(hex, 16);
			var r = (int >> 16) & 255;
			var g = (int >> 8) & 255;
			var b = int & 255;

			return r + "," + g + "," + b;
		}

		/**
         * @function
		 * @author MVCommons(Dekita)
         * @name extend
         * @desc An easy way to extend a rgss class.
         * @memberof module:Utilities
         * @param  parent The parent class
         * @param  constructor, a custom constructor
         * @return this function returns a new class prototype already cofigured.
         */
		function extend(/*parent , constructor */) {
			var constructor, parent;
			parent = arguments.length > 0 ? arguments[0] : Object;
			constructor = arguments.length > 1 ? arguments[1] : function () {
				parent.apply(this, arguments);
				if (!parent.prototype.initialize && this.initialize) {
					this.initialize.apply(this, arguments);
				}
			};
			constructor.prototype = Object.create(parent.prototype);
			constructor.prototype.constructor = constructor;
			constructor.extend = function (/* constructor*/) {
				if (arguments.length) {
					return $.extend(constructor, arguments[0]);
				}
				return $.extend(constructor, function () {
					constructor.apply(this, arguments);
				});
			};
			return constructor;
		}

		/**
         * @function
         * @name parsedClone
         * @memberof module:Utilities
         * @desc Uses JSON.stringify to clone an object. Use only with objects with no functions
         * @param {object} obj - The object to be cloned.
         * @returns {object} cloned version of the object.
         */
		function parsedClone(obj) {
			return JSON.parse(JSON.stringify(obj));
		}

		/**
         * @function
         * @name clone
         * @memberof module:Utilities
         * @desc Clones an object & properties and returns new object
         * @param {object} obj - The object to be cloned.
         * @returns {object} cloned version of the object.
         */
		function clone(obj) {
			if (null === obj || "object" != typeof obj) {
				return obj;
			}
			var copy = obj.constructor();
			for (var attr in obj) {
				if (obj.hasOwnProperty(attr)) {
					copy[attr] = obj[attr];
				}
			}
			return copy;
		}
		/**
		 * @function
		 * @author Dekeyde(MVCommons)
         * @name ajaxLoadFile
		 * Loads a file asynchronously (in the background) - optional custom callbacks.
		 * @param filePath The full path to the file to load.
		 * @param mimeType [ optional ] A mimeType to parse, by default it uses file extension.
		 * @param onLoad   [ optional ] A callback to call when the file loads successfully.
		 * @param onError  [ optional ] A callback to call if there is an error loading the file.
         */
		function ajaxLoadFileAsync(filePath, mimeType, onLoad, onError){
			mimeType = mimeType || "application/json";
			var xhr = new XMLHttpRequest();
			var name = '$' + filePath.replace(/^.*(\\|\/|\:)/, '').replace(/\..*/, '');
			xhr.open('GET', filePath);
			if (mimeType && xhr.overrideMimeType) {
				xhr.overrideMimeType(mimeType);
			}
			if(onLoad === undefined){
				onLoad = function(xhr, filePath, name) {
					if (xhr.status < 400) {
						window[name] = JSON.parse(xhr.responseText);
						DataManager.onLoad(window[name]);
					}
				};
			}
			if(onError === undefined) {
				onError = function() {
					DataManager._errorUrl = DataManager._errorUrl || filePath;
				};
			}
			xhr.onload = function() {
				onLoad.call(this, xhr, filePath, name);
			};
			xhr.onerror = onError;
			window[name] = null;
			xhr.send();
		}

		/**
         * @function
         * @name loadJSON
         * @memberof module:Utilities
         * @desc Loads a JSON file and returns it's contents.
         * @returns {string} string returns contents of a parsed JSON
         */
		function loadJSON(path, filename) {
			var contents = null;
			var fullPath = $.projectPath() + path + filename + '.json';
			var fs = require('fs');
			if (fs.existsSync(fullPath)) {
				contents = fs.readFileSync(fullPath, { encoding: 'utf8' });
				return JSON.parse(contents);
			}
			console.warn('Cannot read JSON file');
			return false;
		}

		/**
         * @function
         * @name projectPath
         * @memberof module:Utilities
         * @desc Gets the location of the current projects path.
         * @returns {string} string containing the projects path
         */
		function projectPath() {
			var path = window.location.pathname.replace(/\/[^\/]*$/, "/");
			if (path.match(/^\/([A-Z]\:)/)) {
				path = path.slice(1);
			}
			return decodeURIComponent(path);
		}

		/**
         * @function
         * @name localFileExists
         * @memberof module:Utilities
         * @desc Checks if a file exists via node-webkit.
         * @param {string} folder - string The folder you want to check for file existence.
         * @param {string} filename - the filename you want to check.
         * @param {string} extension - the extension of file you want to check.
         * @returns {boolean} return true if the file exists.
         */
		function localFileExists(folder, filename, extensions) {
			var fs = require("fs");
			var path = $.projectPath() + folder + filename;
			for (var i = 0, max = extensions.length; i < max; i++) {
				if (fs.existsSync(path + extensions[i])) {
					return true;
				}
			}
			return false;
		}

		/**
         * @function
         * @name urlFileExists
         * @memberof module:Utilities
         * @desc Checks if a file exists via XMLHttpRequest(). Should be used
         * for web browser compatability.
         * @param {String} folder - The folder you want to check for file
         * @param {String} filename - the filename you want to check
         * @param {Array} extensions -  the extension(s) of file you want to check
         * @returns {Boolean} return true if the file exists.
         */
		function urlFileExists(folder, filename, extensions) {
			var url = $.projectPath() + folder + filename;
			var xhr = new XMLHttpRequest();
			for (var i = 0, max = extensions.length; i < max; i++) {
				xhr.open('GET', url + extensions[i], false);
				xhr.send();
				if(xhr.status >= 404) {
					return false;
				} else {
					return true;
				}
			}
		}

		/**
         * @function
         * @name throwFileNotFound
         * @memberof module:Utilities
         * @desc Gives a warning or a error. For use with methods which check
         * for file existence.
         * @param {string} folder   - The folder that has been checked
         * @param {string} filename - The filename that has been checked
         * @param {boolean} warn    - Prints to console.
         * @param {boolean} error   - Throws an error.
         * @returns Prints to console or throws a new error.
         * @private
         */
		function throwFileNotFound(folder, filename, warn, error) {
			warn = warn ? warn : false;
			error = error ? error : false;
			if (warn) {
				console.log('===========  LTN Core: Warning!!-  =================');
				console.log("LTN Core: File " + folder + filename + " could not be found.");
			}
			if (error) {
				throw new Error("LTN Core: File " + folder + filename + " could not be found.");
			}
		}

		/**
         * @function
         * @name toTimeFormat
         * @memberof module:Utilities
         * @desc Converts hours & minutes into HH:MM am or pm format.
         * @param  {Number} hour   - the hour variable.
         * @param  {Number} minute - the minute variable
         * @param  {Object} object - [optional] An object containing the hours & minutes
         * @returns {String} returns a string representing time in hh:mm am/pm format
         */
		function toTimeFormat(hour, minute, object) {
			if (!object && (hour === 0 || minute === 0)) {
				console.warn('LTN Core: Missing parameters for [toTimeFormat()]');
			}
			var h = object ? Math.floor(object.hour) : Math.floor(hour);
			var m = object ? Math.floor(object.minute) : Math.floor(minute);
			return ((h > 12 ? h - 12 : h)) + ':' + ((m < 10) ? '0' + m : m) + ' ' + ((h > 12 && h < 24) ? 'PM' : 'AM');
		}

		/**
         * @function
         * @name toTimeFormat
         * @memberof module:Utilities
         * @desc Converts hours & minutes into army time format.
         * @param  {Number} hour   - the hour variable.
         * @param  {Number} minute - the minute variable
         * @param  {Object} object - [optional] An object containing the hours & minutes
         * @returns {String} returns a string representing time in army format.
         */
		function toArmyTime(hour, minute, object) {
			if (!object && (hour === 0 || minute === 0)) {
				console.warn('LTN Core: Missing parameters for [toTimeFormat()]');
			}
			var h = object ? Math.floor(object.hour) : Math.floor(hour);
			var m = object ? Math.floor(object.minute) : Math.floor(minute);
			return ((h < 10) ? '0' + h : h) + ':' + ((m < 10) ? '0' + m : m);
		}
		/**
         * @function
         * @name loadAllNotetags
         * @memberof module:Utilities
         * @desc   Loads all notetags from database and puts them in an array.
         * @returns {array} of an array of notes from each section of database.
         */
		function loadAllNotetags() {

			//var data = [$dataActors, $dataClasses, $dataSkills, $dataItems, $dataWeapons,
			//			$dataArmors, $dataEnemies, $dataStates
			//		   ];
			//var dataNames = ['$dataActors', '$dataClasses', '$dataSkills', '$dataItems', '$dataWeapons',
			//				 '$dataArmors', '$dataEnemies', '$dataStates'
			//				];
			//var notes = [];
			//
			//for(var i = 0; i < data.length; i++){
			//	var dataClass = data[i];
			//
			//	for (var prop in dataClass) {
			//		if (dataClass.hasOwnProperty(prop)) {
			//
			//			if(dataClass[prop] !== null || undefined){
			//				var dataNotes = dataClass[prop].note;
			//				console.log(dataNotes === '');
			//				if(dataNotes === ''){ return; }
			//
			//				notes.push(results);
			//			}
			//		}
			//	}
			//}
			//console.log(notes);
			//return notes;
		}
		/**
         * @function
         * @name getTag
         * @memberof module:Utilities
         * @desc Extracts the value from notetags or comment tags. Allows for multi line
		 * notetags. So <Notetag: Params> may be included on multiple lines.
         * @param {string} text - the notetag(s) or comments to be searched.
         * @param {String} - tag - The meta tag you want to search for.
         * @returns {object} Returns an array of params for each instance of the tag.
         */
		function getTag(text, tag) {
			if(!text || !tag){ return; }
			var notetags = {};
			var params   = [];

			/* Setup regex and test string*/
			var match;
			var re = /<([^<>:]+)(:?)([^>]*)>/g;
			/* Loop exec() until all matches are found */
			while (match = re.exec(text)){   //jshint ignore:line
				if (!match) { return null;}

				/*If tag matches, & params available then push */
				if(match[1].toLowerCase() === tag.toLowerCase()){
					if(match[3]){
						var args = $.toArray(match[3]);
						params.push(args);
						notetags = params;
					}
				}
			}
			if($Utils.isEmpty(notetags)){ return; }
			return notetags;
		}

		/**
         * @function
         * @name getMetaData
         * @memberof module:Utilities
         * @desc Extracts the value from notetags or comment tags.
         * @param  {object} obj - the notetag(s) or comment tag(s) object.
         * @param {String} - tag - The meta tag you want to search for.
         * @returns {string} a string representing the value(s) of the notetag
         */
		function getMetaData(obj, tag) {
			if (obj === undefined || obj === null) {return undefined;}
			var meta = obj.meta;

			for (var key in meta){
				if(meta.hasOwnProperty(key)){
					if(key.toLowerCase() === tag.toLowerCase()){
						return typeof meta[key] === 'string' ? meta[key].trim() : meta[key];
					}
				}
			}
		}

		/**
         * @function
         * @name loadEventComments
         * @memberof module:Utilities
         * @desc   Obtains all comments from an event which can be used to obtain
		 * notetag data.
         * @param  {Object} event - The object containing the event(s)
         * @return {Array} Returns an array of string of all comments added togather
		 * categorized by eventId.
		 * @example 28 = [param1, param2, param3]
         */
		function loadEventComments() {
			var allEvents = $dataMap.events;
			var meta = {};

			/*for each event load pages*/
			for(var e = 0; e < allEvents.length; e++){
				if(allEvents[e] === null){ continue; }
				var pages = allEvents[e].pages;
				var eventId = allEvents[e].id;
				var pageComments = [];

				/*For each page in the event load page list*/
				for (var i = 0; i < pages.length; i++) {
					var page = pages[i];
					var pageId = pages.indexOf(pages[i]);
					if(pageId <= -1) { continue; }
					var comments = '';

					/* For each command in page list check for comments*/
					for (var j = 0; j < page.list.length; j++) {
						var command = page.list[j];
						/* if command is a comment add to comments var*/
						if (command.code === 108 || command.code === 408) {
							comments += command.parameters[0];
							pageComments.push(comments);
							meta[eventId] = pageComments;
						}
					}
				}
			}
			return meta;
		}

		/**
         * @function
         * @name convertTileCoord
         * @memberof module:Utilities
         * @desc Converts the tile position to stage position
         * @param  {number} x - the x tile position to convert.
         * @param  {number} y - the y tile position to convert.
         * @returns {object} return width and height after conversion.
         */
		function convertTileCoords(x, y) {
			if ((!x || !y) || (typeof x !== 'number' || typeof y !== 'number')) {
				throw new Error('Incorrect values, ensure x & y values are correct.');
			}
			var result = {};
			result.width = x * Tilemap._tileWidth;
			result.height = y * Tilemap._tileHeight;
			return result;
		}

		/**
         * @function
         * @name takeScreenshot
         * @memberof module:Utilities
         * @desc   Takes a screenshot of current screen for use in plugins. This is not a function
         *         for files and will not download the screenshot to the computer. This only gets
		 *		   the data to be used in plugins by adding it to a sprite.
         */
		function takeScreenshot(quality) {
			quality = (quality <= 0) ? 0.9 : quality;
			var renderer = Graphics._renderer;
			var stage = renderer._lastObjectRendered;
			renderer.render(stage);
			var data = renderer.view.toDataURL('image/png', quality);
			return data;
		}

		/**
		 * @function
		 * @name saveScreenshot
		 * @memberof module:Utilities
		 * @desc Will write an image file(screenshot) to the root directory of the project.
		*/
		function saveScreenshot (){
			if (!Utils.isNwjs()) {return;}

			var fs = require('fs');
			var image = $.takeScreenshot(LTN.Core.Param.screenshotType, LTN.Core.Param.screenshotQuality);
			var filepath = $.projectPath() + LTN.Core.Param.screenshotPath;
			var filename = filepath + 'Screenshot_' + Date.now() + '.png';
			var base64Data = image.replace(/^data:image\/png;base64,/, "");

			try {
				fs.writeFile(filename, base64Data, 'base64', function(error){
					if (error !== undefined && error !== null) {
						console.error('An error occured when attempting to save the screenshot', error);
					}
				});
			}
			catch(error) {
				if (error !== undefined && error !== null) {
					console.error('An error occured when attempting to save the screenshot', error);
				}
			}

		}
		/**
         * @function
         * @name registerPlugin
         * @memberof module:Utilities
         * @desc Registers the plugin with LTN.Plugins object and checks the required plugins required for the plugin
         * to work correctly.
         * @param  {string} name - A string of name of the plugin being registered.
         * @param  {string} version - A string of the version of plugin being registered.
         * @param  {string} author - A string for the name of the author of the plugin.
         * @param  {array}  required - An array of required plugins for the plugin being registered
         * @returns {none}
         * @todo - Add in functionality for checking version's
         */
		function registerPlugin(name, version, author, required) {
			if (!name) {
				throw new Error('No name for registration of plugin! Please ensure you entered a name');
			}
			if ($.isPluginRegistered(name)) {
				throw new Error('Plugin already registered with PluginManager. Please use a unique name');
			}

			Plugins[name] = {};

			Plugins[name].Alias    = Plugins[name].Alias || {};
			Plugins[name].Version  = version ? version : {};
			Plugins[name].Author   = author ? author : {};
			Plugins[name].Required = required ? required : {};
			// Check required plugins if needed.
			if (required) {
				Plugins[name].Required.forEach(function (plugin) {
					if (!PluginManager.isPlugin(plugin) && !$.isPluginRegistered(plugin)) {
						throw new Error('You need to have the required plugin ' + plugin + ' for ' + name + ' to work correctly.');
					}
				});
			}
		}

		/**
         * @function
         * @name isPluginRegistered
         * @memberof module:Utilities
         * @desc Will check if a plugin is registered with LTNCore plugins. Used for controling
         * plugins which reuire other plugins to function.
         * @param {String} plugin - The id of the plugin.
         * @returns Return true if plugin is registered in LTN.Plugins.
         * @access protected
         */
		function isPluginRegistered(plugin) {
			if (typeof Plugins[plugin] !== 'undefined') {
				return true;
			}
			return false;
		}

		/**-----------------------------------------------------------------------
         * Export Utility Extension Functions >>
         *
         ------------------------------------------------------------------------*/

		/** Utility Functions */
		$.isObject = isObject;
		$.isFunction = isFunction;
		$.isArray = isArray;
		$.isDefined = isDefined;
		$.isEmpty = isEmpty;
		$.toObj = toObj;
		$.toArray = toArray;
		$.toString = toString;
		$.toBool = toBool;
		$.inBetween = inBetween;
		$.tryEval  = tryEval;

		$.extend = extend;
		$.hexToRgb = hexToRgb;
		$.toTimeFormat = toTimeFormat;
		$.toArmyTime = toArmyTime;
		$.parsedClone = parsedClone;
		$.clone = clone;

		/** File Manipulation Functions */
		$.ajaxLoadFileAsync = ajaxLoadFileAsync;
		$.loadJSON = loadJSON;
		$.projectPath = projectPath;
		$.localFileExists = localFileExists;
		$.urlFileExists = urlFileExists;
		$.throwFileNotFound = throwFileNotFound;

		/** RPG Maker Helper Functions */
		$.getTag = getTag;
		$.getMetaData = getMetaData;
		$.loadEventComments = loadEventComments;
		$.loadAllNotetags = loadAllNotetags;

		$.convertTileCoord = convertTileCoords;
		$.takeScreenshot = takeScreenshot;
		$.saveScreenshot = saveScreenshot;

		$.isPluginRegistered = isPluginRegistered;
		$.registerPlugin = registerPlugin;

	})(Utilities);

	/**
     * @function
     * @name requireUtils
     * @memberof LTNCore
     * @desc Retieves LTNCore's utility functions.
     * @param {Boollean} all - Aquire all utilities?
     * @param {Object} name - The utility to aquire, if you only need one..
     * @returns {Boolean} Return the plugins namepsace/module
     */
	function requireUtils(all, name) {
		if (all) {
			return Utilities;
		} else {
			return Utilities[name];
		}
	}

	/**
     * @function
     * @name requirePlugin
     * @memberof LTNCore
     * @desc Retieves plugins namespace module for access to aliases, and exported objects/functions.
     * @param {Object} name - The utility to aquire, if you only need one..
     * @param {Boollean} all - Aquire all plugins?
     * @returns {Boolean} Return the plugins namepsace/module
     */
	function requirePlugins(all, name) {
		if(!Utilities.isPluginRegistered(name)){
			throw new Error('Unable to find a registered plugin by the name: ' + name );
		}
		if (all) {
			return Plugins;
		}
		return Plugins[name];
	}

	/**
     * @function
     * @name requireAlias
     * @memberof LTNCore
     * @desc Retieves a registered plugins aliased methods.
     * @param {Object} pluginName - The plugin to require it's aliased methods.
     * @returns {Boolean} Return the plugins aliased methods.
     */
	function requireAlias(pluginName, all, aliasName) {
		if(!Utilities.isPluginRegistered(pluginName)){
			throw new Error('Unable to find a registered plugin by the name: ' + name );
		}
		if(all){
			return Plugins[pluginName].Alias;
		} else if(name) {
			return Plugins[pluginName].Alias[aliasName];
		}

	}
	/**-----------------------------------------------------------------------
     * Export the require function for access to modules >>
     ------------------------------------------------------------------------*/
	/** Module Functions */
	$.requireUtils = requireUtils;
	$.requirePlugins = requirePlugins;
	$.requireAlias   = requireAlias;


	/**-----------------------------------------------------------------------
     * Start Of RPG Maker MV Extended Functions & Bugfixes >>
     ------------------------------------------------------------------------*/

	/**-----------------------------------------------------------------------
     * Bitmap >>
     * Converts bitmaps positions and dimensions to whole numbers
     *
     ------------------------------------------------------------------------*/
	/**
     * @module Bitmap
     * @desc This closure function extends the functionality of RMMV's BitmapClass
	 * mostly converting to whole numbers for better performance and rendering.
     */

	(function ($) {

		/**
         * @function
         * @name blt
         * @desc Converts to whole numbers for better performance and rendering of bitmaps
         */
		var Bitmap_blt = $.blt;
		$.blt = function(source, sx, sy, sw, sh, dx, dy, dw, dh) {
			sx = Math.floor(sx);
			sy = Math.floor(sy);
			sw = Math.floor(sw);
			sh = Math.floor(sh);
			dx = Math.floor(dx);
			dy = Math.floor(dy);
			dw = Math.floor(dw);
			dh = Math.floor(dh);
			Bitmap_blt.apply(this, arguments);

		};
		/**
         * @function
         * @name bltImage
         * @desc Converts to whole numbers for better performance and rendering of bitmaps
         */
		var Bitmap_bltImage = $.bltImage;
		$.bltImage = function(source, sx, sy, sw, sh, dx, dy, dw, dh) {
			sx = Math.floor(sx);
			sy = Math.floor(sy);
			sw = Math.floor(sw);
			sh = Math.floor(sh);
			dx = Math.floor(dx);
			dy = Math.floor(dy);
			dw = Math.floor(dw);
			dh = Math.floor(dh);
			Bitmap_bltImage.apply(this, arguments);
		};
		/**
         * @function
         * @name fillRect
         * @desc Converts to whole numbers for better performance and rendering of bitmaps
         */
		var Bitmap_fillRect = $.fillRect;
		$.fillRect = function(x, y, width, height, color) {
			x = Math.floor(x);
			y = Math.floor(y);
			width = Math.floor(width);
			height = Math.floor(height);
			Bitmap_fillRect.call(this, x, y, width, height, color);
		};

		/**
         * @function
         * @name gradientFillRect
         * @desc Converts to whole numbers for better performance and rendering of bitmaps
         */
		var Bitmap_gradientFillRect = $.gradientFillRect;
		$.gradientFillRect = function(x, y, width, height, color1, color2, vertical) {
			x = Math.floor(x);
			y = Math.floor(y);
			width = Math.floor(width);
			height = Math.floor(height);
			Bitmap_gradientFillRect.call(this, x, y, width, height, color1, color2, vertical);
		};

		/**
         * @function
         * @name drawText
         * @desc Converts to whole numbers for better performance and rendering of bitmaps
         */
		var Bitmap_drawText = $.drawText;
		$.drawText = function(text, x, y, maxWidth, lineHeight, align) {
			x = Math.floor(x);
			y = Math.floor(y);
			maxWidth = Math.floor(maxWidth);
			Bitmap_drawText.call(this, text, x, y, maxWidth, lineHeight, align);
		};

	})(Bitmap.prototype);

	/**-----------------------------------------------------------------------
     * Window >>
     *
     *
     ------------------------------------------------------------------------*/
	/**
     * @function
     * @desc This closure function adds extra functionality to the window class.
     */
	(function ($) {
		/**
		* @method refreshAllParts
		* @desc More whole number conversion for better performance and rendering of windows.
		*/
		var Window_refreshAllParts = $.refreshAllParts;
		$.refreshAllParts = function() {
			this._width  = Math.floor(this._width);
			this._height = Math.floor(this._height);
			Window_refreshAllParts.call(this);
		};
	})(Window.prototype);
	/**-----------------------------------------------------------------------
     * DataManager >>
     * Add to save contents
     *
     ------------------------------------------------------------------------*/
	/**
     * @module DataManager
     * @desc This closure function extends the functionality of RMMV's DataManager
     */
	(function ($, Alias) {

		// saveData global for all save contents.
		var saveData = saveData || {};

		// A global for all event comments parameters for current map
		var eventComments = eventComments || {};

		Alias.DataManager_onLoad = $.onLoad;
		$.onLoad = function(object) {
			Alias.DataManager_onLoad.call(this, object);
			if(object === $dataMap){
				eventComments = $Utils.loadEventComments();
			}
		};

		$.getAllComments = function (){
			return eventComments;
		};

		Alias.DataManager_isDatabaseLoaded = $.isDatabaseLoaded;
		$.isDatabaseLoaded = function() {
			if(Alias.DataManager_isDatabaseLoaded.call(this) === false){
				return false;
			}
			$Utils.loadAllNotetags();
			return true;
		};
		/**
         * @function
         * @name addToSaveContents
         * @memberof module:DataManager
         * @desc Will add the data you want to save to an object which will later be added to
         * DataManager save contents and saved to a save file. Use before game starts or after plugin
         * registration.
         * @param {String} name - The name of the data to save.
         * @param {Object} data - The data you want to save.
         */
		$.addToSaveContents = function (name, data) {
			saveData[name] = {name: name, data: data};
		};

		/**
         * @function
         * @name makeSaveContents
         * @memberof module:DataManager
         * @desc Aliased method for addding in save data for LTN Plugins.
         */

		Alias.DataManager_makeSaveContents = $.makeSaveContents;

		$.makeSaveContents = function () {
			var contents = Alias.DataManager_makeSaveContents.call(this);
			if(!$Utils.isEmpty(saveData)){
				for(var name in saveData){
					if(saveData.hasOwnProperty(name)){
						contents[name] = saveData[name].data;
					}
				}
			}
			return contents;
		};

		/**
         * @function
         * @name extractSaveContents
         * @memberof module:DataManager
         * @desc Aliased method for extracting save data for LTN Plugins.
         */
		var DataManager_extractSaveContents = $.extractSaveContents;

		$.extractSaveContents = function (contents) {
			DataManager_extractSaveContents.call(this, contents);
			if(!$Utils.isEmpty(saveData)){
				for(var name in saveData){
					if(saveData.hasOwnProperty(name)){
						saveData[name].data = contents[name];
					}
				}
			}
		};

	})(DataManager, $.Alias);


	/**-----------------------------------------------------------------------
     * PluginManager >>
     *
     *
     ------------------------------------------------------------------------*/
	/**
     * @module PluginManager
     * @desc This closure function extends the functionality of RMMV's PluginManager
     */
	(function ($) {
		/* globals $plugins */

		/**
         * @function
         * @name getPluginParameters
         * @memberof module:PluginManager
         * @desc Will get the plugin ID in the plugin description instead of the plugin filename.
         * This will avoid any errors when filename is being renamed and causes missing parameters.
         * @author Lavra
         * @param {String} plugin - The name of the plugin.
         * @example PluginManager.getPluginParameters('LTN_Core');
         */
		$.getPluginParameters = function (plugin) {
			return $plugins.filter(function (p) {
				return p.description.contains('<' + plugin + '>');
			})[0].parameters;
		};

		/**
         * @function
         * @name isPlugin
         * @memberof module:PluginManager
         * @desc Will check if a plugin is in the manager and contains the name in description. For private use only.
         * @param {String} plugin - The id of the plugin.
         * @access private
         */
		$.isPlugin = function (plugin) {
			var pluginRegistered = $plugins.filter(function (p) {
				return p.description.contains('<' + plugin + '>');
			});
			if (pluginRegistered.length <= -1) {
				return false;
			}
			return true;
		};

	})(PluginManager);


	/**-----------------------------------------------------------------------
     * SceneManager >>
     *
     *
     ------------------------------------------------------------------------*/
	/**
     * @function
     * @module SceneManager
     * @desc This closure function adds and overwrites the functionality of the SceneManager
	 * class
     */
	(function ($) {
		var rendererChoice 		   = $Utils.toObj(LTN.Core.Param.renderChoice);
		SceneManager._screenWidth  = Number(LTN.Core.Param.screenWidth);
		SceneManager._screenHeight = Number(LTN.Core.Param.screenHeight);
		SceneManager._boxWidth     = Number(LTN.Core.Param.screenWidth);
		SceneManager._boxHeight    = Number(LTN.Core.Param.screenHeight);

		var alias_SceneManager_run = $.run;
		$.run = function (sceneClass) {
			alias_SceneManager_run.call(this, sceneClass);
			$.resizeToResolution();
			$.openDebugTools();
			if(LTN.Core.Param.startFullScreen){Graphics._requestFullScreen();}
		};

		/* @method resizeResolution
		* Resizes the window to fit the resolution set in parameters
		*/
		$.resizeToResolution = function () {
			var resizeWidth  = Graphics.boxWidth - window.innerWidth;
			var resizeHeight = Graphics.boxHeight - window.innerHeight;

			window.moveBy(-1 * resizeWidth / 2, -1 * resizeHeight / 2);
			window.resizeBy(resizeWidth, resizeHeight);
		};

		/* @method openDebugTools
		* Activates the fps meter and console on bootup.
		*/
		$.openDebugTools = function () {
			if (LTN.Core.Param.openConsole && (Utils.isNwjs() && Utils.isOptionValid('test'))) {
				var _debugWindow = require('nw.gui').Window.get().showDevTools();
				_debugWindow.moveTo(0.1, 0.5);
				window.focus();
				if (LTN.Core.Param.fpsStart) {Graphics._fpsMeter.show();}
			}
		};

		if(rendererChoice.force === 'true'){
			$.initGraphics = function() {
				var type = rendererChoice.type;
				Graphics.initialize(this._screenWidth, this._screenHeight, type);
				Graphics.boxWidth = this._boxWidth;
				Graphics.boxHeight = this._boxHeight;
				Graphics.setLoadingImage('img/system/Loading.png');
				if (Utils.isOptionValid('showfps')) {
					Graphics.showFps();
				}
				if (type === 'webgl') {
					this.checkWebGL();
				}
			};
		}

		/* @method openDebugTools
		 * Checks if the current scene is matches the one input in the arguments.
		 */
		$.isScene = function (sceneClass){
			return SceneManager._scene.constructor === sceneClass;
		};

		/* @method openDebugTools
		 * Checks if the current scene is an instance of the scene in the argument.
		 */
		$.isSceneOf = function (sceneClass){
			return SceneManager._scene instanceof sceneClass;
		};

	})(SceneManager);


	/**-----------------------------------------------------------------------
     * Touch Input >>
     *
     *
     ------------------------------------------------------------------------*/
	/**
     * @function
     * @desc This closure function adds extra functionality to the touch input class
     * @access protected
     */
	(function () {
		/**
		* @static
		* @method _onMouseMove
		* @param {MouseEvent} event
		* @desc remove's the need for pressing down the mouse before registering touch input.
 		* @private
		*/
		//$._onMouseMove = function(event) {
		//	var x = Graphics.pageToCanvasX(event.pageX);
		//	var y = Graphics.pageToCanvasY(event.pageY);
		//	this._onMove(x, y);
		//};
	})(TouchInput);


	/**-----------------------------------------------------------------------
     * Input >>
     * Screenshot key implemented.
     *
     ------------------------------------------------------------------------*/
	/**
     * @function
     * @desc This closure function adds extra functionality to the input class
     * @access protected
     */
	(function ($){
		/**
		@function
		@name onKeyUp
		@desc Aliased method, which will save screenshot when key is pressed.
		*/
		var Input_onKeyUp = Input._onKeyUp;

		$._onKeyUp = function(event){
			Input_onKeyUp.call(this, event);
			if(event.keyCode == LTN.Core.Param.screenshotKey){
				var save = LTN.requireUtils(false, 'saveScreenshot');
				save();
			}

		};
	})(Input);


	/**-----------------------------------------------------------------------
     * Sprite_Actor  >>
     * Reposition battlers.
     *
     ------------------------------------------------------------------------*/
	/**
     * @function
     * @desc This closure function extends and overwrites functionality of Sprite_Actor class
	 * It currently only re-position's the battlers to new resolution if enabled.
     */
	(function ($) {
		/*Re-position actors*/
		if (LTN.Core.Param.reposBattlers) {
			var Sprite_Actor_setActorHome = $.setActorHome;
			$.setActorHome = function(index) {
				Sprite_Actor_setActorHome.call(this, index);
				this._homeX += Graphics.boxWidth - 816;
				this._homeY += Graphics.boxHeight - 624;
			};
		}
	})(Sprite_Actor.prototype);

	/**-----------------------------------------------------------------------
     * Scene_Base  >>
     * rescales gameover and title backgrounds.
     *
     ------------------------------------------------------------------------*/
	/**
     * @function
     * @desc This closure function extends and overwrites functionality of Scene_Title class
     */
	(function ($) {
		/**
		* @desc Alised default function to detect background and rescale it to new
		* resolution.
		*/
		var scaleBacks = $Utils.toObj(LTN.Core.Param.scaleBacks);

		var Scene_Base_start = $.start;

		$.start = function () {
			Scene_Base_start.call(this);
			this.rescaleBackgrounds();
		};

		$.rescaleImageBackground = function (sprite, scene) {
			if(scaleBacks[scene] === 'false') {return;}
			if (sprite.bitmap.width <= 0 || sprite.bitmap.height <= 0) {return;}
			var newX = Graphics.boxWidth  / sprite.bitmap.width;
			var newY = Graphics.boxHeight / sprite.bitmap.height;
			if (newX > 1) {sprite.scale.x = newX;}
			if (newY > 1) {sprite.scale.y = newY;}
			this.centerSprite(sprite);
		};

		$.rescaleBackgrounds = function () {
			switch(SceneManager._scene.constructor) {
				case Scene_Title:
					this.rescaleImageBackground(this._backSprite1, 'title');
					this.rescaleImageBackground(this._backSprite2, 'title');
					break;
				case Scene_Gameover:
					this.rescaleImageBackground(this._backSprite, 'gameover');
					break;
			}
		};
	})(Scene_Base.prototype);

	/**-----------------------------------------------------------------------
     * Spriteset_Battle  >>
     * Rescaled battlebacks
     *
     ------------------------------------------------------------------------*/
	/**
     * @function
     * @desc This closure function extends and overwrites functionality of Spriteset_Battle class
     */
	(function ($) {
		var scaleBacks = $Utils.toObj(LTN.Core.Param.scaleBacks);

		var Spriteset_Battle_locateBattleBack = $.locateBattleback;
		$.locateBattleback = function() {
			var sprite1 = this._back1Sprite;
			var sprite2 = this._back2Sprite;
			if (sprite1.bitmap.width <= 0) {return;}
			if (sprite2.bitmap.width <= 0) {return;}
			if(this.isRescaled){return;}
			// isRescaled is for battles when changing of battlebacks occurs.
			this.isRescaled = true;
			Spriteset_Battle_locateBattleBack.call(this);
			this.rescaleImageBackground(sprite1, 'battle');
			this.rescaleImageBackground(sprite2, 'battle');
		};

		$.rescaleImageBackground = function (sprite, scene) {
			if(scaleBacks[scene] === 'false') {return;}
			if (sprite.bitmap.width <= 0 || sprite.bitmap <= 0) {return;}
			var newX = Graphics.boxWidth  / sprite.bitmap.width;
			var newY = Graphics.boxHeight / sprite.bitmap.height;
			if (newX > 1) {
				sprite.scale.x = newX;
				sprite.anchor.x = 0.5;
				sprite.x = Graphics.boxWidth / 2;
			}
			if (newY > 1) {
				sprite.scale.y = newY;
				sprite.origin.y = 0;
				sprite.y = 0;
			}

		};
	})(Spriteset_Battle.prototype);

	/**-----------------------------------------------------------------------
     * Game_Map  >>
     *
     *
     ------------------------------------------------------------------------*/
	/**
     * @function
     * @memberof module:Debug
     * @desc This closure function allows for changing tile size
     */
	(function ($, Param){
		$.tileWidth = function() {
			return Param.tileSize;
		};

		$.tileHeight = function() {
			return Param.tileSize;
		};
	})(Game_Map.prototype, $.Core.Param);


	/**-----------------------------------------------------------------------
     * Scene_Boot  >>
     * Contains debug option - Skip Title -
     *
     ------------------------------------------------------------------------*/
	/**
     * @function
     * @memberof module:Debug
     * @desc This closure function add's in the options of skipping the title on bootup when playtesting a project.
     * @access protected
     */
	(function ($) {
		/**
         * Skip title on boot.
         */
		var alias_Scene_Boot_start = $.start;
		$.start = function () {

			if (LTN.Core.Param.skipTitle) {
				SoundManager.preloadImportantSounds();
				if (DataManager.isBattleTest()) {
					DataManager.setupBattleTest();
					SceneManager.goto(Scene_Battle);
				} else if (DataManager.isEventTest()) {
					DataManager.setupEventTest();
					SceneManager.goto(Scene_Map);
				} else {
					this.checkPlayerLocation();
					DataManager.setupNewGame();
					SceneManager.goto(Scene_Map);
				}
				this.updateDocumentTitle();
			} else {
				alias_Scene_Boot_start.call(this);
			}

		};

	})(Scene_Boot.prototype);
	/**-----------------------------------------------------------------------
     * Game_Vehicle >>
     *
     *
     ------------------------------------------------------------------------*/
	/**
     * @function
     * @desc This closure function fixes an issue with RMMV's bgm not changing when getting off any vehicle on
     * a different map than where you got on the vehicle. It is an extension and overwrite of the default
	 * Game_Vehicle class.
     * @access protected
     */
	(function ($, Param) {

		if (LTN.Core.Param.vehicleBGMFix !== false) {
			var VehicleBGMFix = {};

			// Save BGM when not in vehicle.
			var GameMap_autoPlay = Game_Map.prototype.autoplay;
			$.autoplay = function () {
				if (!$gamePlayer.isInVehicle()) {
					GameMap_autoPlay.call(this);
					VehicleBGMFix = AudioManager.saveBgm();
				}
			};

			// Ensure BGM is not the old BGM before exiting vehicle.
			var GameVehicle_getOff = Game_Vehicle.prototype.getOff;
			$.getOff = function () {
				GameVehicle_getOff.call(this);
				if (VehicleBGMFix !== $dataMap.Bgm) {
					AudioManager.playBgm($dataMap.bgm);
				}
			};
		}

		$.maxAltitude = function() {
			return Param.tileSize;
		};

	})(Game_Map.prototype, $.Core.Param);

}(LTNCore));
