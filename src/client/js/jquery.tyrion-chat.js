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
					ID: '',
					name: '',
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
						var p = this.settings,
							$chat = $("<div class='chat-container'></div>");

						$(this.element).append($chat);

						$chat.append(this.createUsersList(p.friends));

						for (var idx in p.friends) {
							$chat.append(this.createRoom(p.friends[idx]));
						}

						$chat.find(".chat-btn-minimize").click(function(e){
							$(this).parent().parent().toggleClass("chat-minized");
							e.stopPropagation();
						});

						$chat.find(".chat-header").click(function(e){
							$(this).parent().toggleClass("chat-minized");
							e.stopPropagation();
						});

				},

				createUsersList: function (users) {
					var html = "";

					for (var idx in users) {
							html += "<div class='chat-list-user'>" +
												"<div class='chat-user-photo'></div>" +
												"<div class='chat-user-link-name'>" + users[idx].name + "</div>" +
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
												"<div class='chat-user-msg'>bla bla bla bla bla bla bla bla bla bla bla bla</div>" +
											"</div>" +
											"<div class='chat-conversation'>" +
												"<div class='chat-user-photo'></div>" +
												"<div class='chat-user-name'>Eder</div>" +
												"<div class='chat-user-msg'>bla bla bla bla bla bla bla bla bla</div>" +
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
