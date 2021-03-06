/*
 *  Tyrion Chat jQuery - v0.0.1
 *  a simples chat system, like gTalk or facebook, and which always pays his debts.
 *  https://github.com/ederFortunato//tyrion-chat/
 *
 *  Made by Eder Fortunato
 *  Under MIT License
 */
// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {

	// undefined is used here as the undefined global variable in ECMAScript 3 is
	// mutable (ie. it can be changed by someone else). undefined isn't really being
	// passed in so we can ensure the value of it is truly undefined. In ES5, undefined
	// can no longer be modified.

	// window and document are passed through as local variable rather than global
	// as this (slightly) quickens the resolution process and can be more efficiently
	// minified (especially when both are regularly referenced in your plugin).

	"use strict";
	// Create the defaults once
	var pluginName = "tyrionChat",
		defaults = {
			ID: "",
			name: "",
			friends: []
		};

	// The actual plugin constructor
	function Plugin ( element, options ) {
		this.element = element;

		// jQuery has an extend method which merges the contents of two or
		// more objects, storing the result in the first object. The first object
		// is generally empty as we don't want to alter the default options for
		// future instances of the plugin
		this.settings = $.extend( {}, defaults, options );
		this._defaults = defaults;
		this._name = pluginName;
		this.init();
	}

	Plugin.prototype = {

		init: function () {
			var i, p = this.settings,
				$chat = $("<div class='chat-container'></div>");

			$(this.element).append($chat);

			$chat.append(this.createUsersList(p.friends));

			for (i in p.friends) {
				$chat.append(this.createRoom(p.friends[i]));
				renderEmotions($chat.find(".chat-user-msg"));
			}

			$chat.find(".chat-btn-minimize").click(function(e){
				$(this).parent().parent().toggleClass("chat-minized");
				e.stopPropagation();
			});

			$chat.find(".chat-btn-close").click(function(e){
				$(this).parent().parent().remove();
				e.stopPropagation();
			});

			$chat.find(".chat-header").click(function(e){
				$(this).parent().toggleClass("chat-minized");
				e.stopPropagation();
			});

		},

		createUsersList: function (users) {
			var i, html = "";

			for(i in users) {
				html += "<div class='chat-list-user'>" +
									"<div class='chat-user-photo'></div>" +
									"<div class='chat-user-link-name'>" + users[i].name + "</div>" +
									"<div class='chat-icon-online'></div>" +
								"</div>";
			}

			return $("<div class='chat-box chat-box-friends'>" +
								"<div class='chat-header'>" +
									"<span class='chat-header-name'>My Friends</span>" +
									"<a href='#'' class='chat-btn chat-btn-minimize'>_</a>" +
								"</div>" +
								"<div class='chat-body'>" +
								html +
								"</div>");

		},

		createRoom: function (user) {
			return $("<div class='chat-box'>" +
								"<div class='chat-header'>" +
									"<span class='chat-icon-online'></span>" +
									"<span class='chat-header-name'>" + user.name +"</span>" +
									"<a href='#'' class='chat-btn chat-btn-close'>X</a>" +
									"<a href='#'' class='chat-btn chat-btn-minimize'>_</a>" +
								"</div>" +
								"<div class='chat-body'>" +
									"<div class='chat-conversation'>" +
										"<div class='chat-user-photo'></div>" +
										"<div class='chat-user-name'>Eder</div>" +
										"<div class='chat-user-msg'>1bla :) bla bla ;) bla bla bla bla bla bla bla bla bla</div>" +
									"</div>" +
									"<div class='chat-conversation'>" +
										"<div class='chat-user-photo'></div>" +
										"<div class='chat-user-name'>Eder</div>" +
										"<div class='chat-user-msg'>bla bla <3 bla bla bla bla bla bla bla</div>" +
									"</div>" +
									"<div class='chat-conversation'>" +
										"<div class='chat-user-photo'></div>" +
										"<div class='chat-user-name'>Eder</div>" +
										"<div class='chat-user-msg'>bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla</div>" +
									"</div>" +
								"</div>" +
								"<div class='chat-footer'>" +
									"<textarea></textarea>" +
								"</div>");
			}
	};

	function renderEmotions (target){
		var opts = {
			imgPath : "../img/emotions.png",
			patterns : new Array("o:)",":3","o.O",":'(","3:)",":(",":O","8)",":D",">:(","<3","^_^",":*",":v",":)","-_-","8|",":p",":/",">:O",";)")
		};

		target.each(function(i, obj){
			var j, repls, rstr,
				_targer = $(obj),
				imgHeight = 14,
				allHeight = 280,
				encoded = [];

			for(i=0; i<opts.patterns.length; i++){
				encoded[i] = String(opts.patterns[i]).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
			}

			for(j=0; j<opts.patterns.length; j++){
				repls = _targer.html();
				if(repls.indexOf(opts.patterns[j]) || repls.indexOf(encoded[j])){
					rstr = "<i style='background-image: url(" + opts.imgPath + ");" +
											"display: inline-block;" +
											"width: 16px;" +
											"height: " + imgHeight + "px;" +
											"vertical-align: -1px;" +
											"background-repeat: no-repeat;" +
											"background-position-y: -" + (allHeight - (j * imgHeight)) + "px;" +
											"margin: 0'/></i>";
					_targer.html(repls.replace(opts.patterns[j], rstr));
					_targer.html(repls.replace(encoded[j], rstr));
				}
			}
		});
	}

	// A really lightweight plugin wrapper around the constructor,
	// preventing against multiple instantiations
	$.fn[ pluginName ] = function ( options ) {
		return this.each(function() {
				if ( !$.data( this, "plugin_" + pluginName ) ) {
					$.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
				}
		});
	};

})( jQuery, window, document );
