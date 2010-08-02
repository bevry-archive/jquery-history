/**
 * @depends jquery, core.console
 * @name jquery.history
 * @package jquery-history {@link http://www.balupton/projects/jquery-history}
 */

// Start of our jQuery Plugin
(function($)
{	// Create our Plugin function, with $ as the argument (we pass the jQuery object over later)
	// More info: http://docs.jquery.com/Plugins/Authoring#Custom_Alias
	
	/**
	 * jQuery History
	 * @version 1.4.0
	 * @date August 03, 2010
	 * @since 0.1.0-dev, July 24, 2008
     * @package jquery-history {@link http://www.balupton/projects/jquery-history}
	 * @author Benjamin "balupton" Lupton {@link http://www.balupton.com}
	 * @copyright (c) 2008-2010 Benjamin Arthur Lupton {@link http://www.balupton.com}
	 * @license GNU Affero General Public License version 3 {@link http://www.gnu.org/licenses/agpl-3.0.html}
	 */
	// Check our class exists
	if ( !($.History||false) ) {
		// Declare our class
		$.History = {
			// Our Plugin definition
		
			// -----------------
			// Options
		
			options: {
				debug: false
			},
		
			// -----------------
			// Variables
		
			state:		'',
			$window:	null,
			$iframe:	null,
			handlers:	{
				generic:	[],
				specific:	{}
			},
		
			// --------------------------------------------------
			// Functions
			
			/**
			 * Extract the Hash from a URL
			 * @param {String} hash
			 */
			extractHash: function ( url ) {
				// Extract the hash
				var hash = url
					.replace(/^[^#]*#/, '')	/* strip anything before the first anchor */
					.replace(/^#+|#+$/, '')
					;
				
				// Return hash
				return hash;
			},
			
			/**
			 * Extract the State from a URL
			 * @param {String} hash
			 */
			extractState: function ( hash ) {
				// Extract the state
				var state = hash
					.replace(/#.*$/, '')	/* strip anything after the first anchor */
					.replace(/^#+|#+$/, '')
					;
				
				// Return state
				return state;
			},
			
			/**
			 * Fetch the Anchor from a State
			 * @param {String} hash
			 */
			extractAnchor: function ( hash ) {
				var History = $.History;
				
				// Extract the anchor
				var anchor = hash
					.replace(/^.*#/, '')	/* strip anything before the last anchor */
					.replace(/^#+|#+$/, '')
					;
				
				// Return anchor
				return anchor;
			},
			
			/**
			 * Get the current state of the application
			 */
	        getState: function ( ) {
				var History = $.History;
			
				// Get the current state
				return History.state;
	        },
			/**
			 * Set the current state of the application
			 * @param {String} hash
			 */
			setState: function ( state ) {
				var History = $.History;
				// Format the state
				state = History.extractHash(state)
			
				// Apply the state
				History.state = state;
			
				// Return the state
				return History.state;
			},
		
			/**
			 * Get the current hash of the browser
			 */
			getHash: function ( ) {
				var History = $.History;
			
				// Get the hash
				var hash = History.extractHash(window.location.hash || location.hash);
			
				// Return the hash
				return hash;
			},
		
			/**
			 * Set the current hash of the browser and iframe if present
			 * @param {String} hash
			 */
			setHash: function ( hash ) {
				var History = $.History;
			
				// Prepare hash
				hash = History.extractHash(hash);
			
				// Write hash
				if ( typeof window.location.hash !== 'undefined' ) {
					if ( window.location.hash !== hash ) {
						window.location.hash = hash;
					}
				} else if ( location.hash !== hash ) {
					location.hash = hash;
				}
			
				// Done
				return hash;
			},
		
			/**
			 * Go to the specific state - does not force a history entry like setHash
			 * @param {String} to
			 */
			go: function ( to ) {
				var History = $.History;
			
				// Format
				to = History.extractHash(to);
			
				// Get current
				var hash = History.getHash();
				var state = History.getState();
			
				// Has the hash changed
				if ( to !== hash ) {
					// Yes, update the hash
					// And wait for the next automatic fire
					History.setHash(to);
				} else {
					// Hash the state changed?
					if ( to !== state ) {
						// Yes, Update the state
						History.setState(to);
					}
				
					// Trigger our change
					History.trigger();
				}
			
				// Done
				return true;
			},
		
			/**
			 * Handle when the hash has changed
			 * @param {Event} e
			 */
			hashchange: function ( e ) {
				var History = $.History;
			
				// Get Hash
				var hash = History.getHash();
			
				// Handle the new hash
				History.go(hash);
			
				// All done
				return true;
			},
		
			/**
			 * Bind a handler to a hash
			 * @param {Object} state
			 * @param {Object} handler
			 */
			bind: function ( state, handler ) {
				var History = $.History;
			
				// 
				if ( handler ) {
					// We have a state specific handler
					// Prepare
					if ( typeof History.handlers.specific[state] === 'undefined' ) {
						// Make it an array
						History.handlers.specific[state] = [];
					}
					// Push new handler
					History.handlers.specific[state].push(handler);
				}
				else {
					// We have a generic handler
					handler = state;
					History.handlers.generic.push(handler);
				}
			
				// Done
				return true;
			},
		
			/**
			 * Trigger a handler for a state
			 * @param {String} state
			 */
			trigger: function ( state ) {
				var History = $.History;
			
				// Prepare
				if ( typeof state === 'undefined' ) {
					// Use current
					state = History.getState();
				}
				var i, n, handler, list;
			
				// Fire specific
				if ( typeof History.handlers.specific[state] !== 'undefined' ) {
					// We have specific handlers
					list = History.handlers.specific[state];
					for ( i = 0, n = list.length; i < n; ++i ) {
						// Fire the specific handler
						handler = list[i];
						handler(state);
					}
				}
			
				// Fire generics
				list = History.handlers.generic;
				for ( i = 0, n = list.length; i < n; ++i ) {
					// Fire the specific handler
					handler = list[i];
					handler(state);
				}
			
				// Done
				return true;
			},
		
			// --------------------------------------------------
			// Constructors
		
			/**
			 * Construct our application
			 */
			construct: function ( ) {
				var History = $.History;
			
				// Modify the document
				$(document).ready(function() {
					// Prepare the document
					History.domReady();
				});
			
				// Done
				return true;
			},
		
			/**
			 * Configure our application
			 * @param {Object} options
			 */
			configure: function ( options ) {
				var History = $.History;
			
				// Set options
				History.options = $.extend(History.options, options);
			
				// Done
				return true;
			},
		
			domReadied: false,
			domReady: function ( ) {
				var History = $.History;
			
				// Runonce
				if ( History.domRedied ) {
					return;
				}
				History.domRedied = true;
			
				// Define window
				History.$window = $(window);
			
				// Apply the hashchange function
				History.$window.bind('hashchange', this.hashchange);
			
				// Force hashchange support for all browsers
				setTimeout(History.hashchangeLoader, 200);
			
				// All done
				return true;
			},
		
			/**
			 * Enable hashchange for all browsers
			 */
			hashchangeLoader: function () {
				var History = $.History;
			
				// More is needed for non IE8 browsers
				if ( !($.browser.msie && parseInt($.browser.version) >= 8) ) {	
					// We are not IE8
			
					// State our checker function, it is used to constantly check the location to detect a change
					var checker;
				
					// Handle depending on the browser
					if ( $.browser.msie ) {
						// We are still IE
						// IE6, IE7, etc
				
						// Append and $iframe to the document, as $iframes are required for back and forward
						// Create a hidden $iframe for hash change tracking
						History.$iframe = $('<iframe id="jquery-history-iframe" style="display: none;"></$iframe>').prependTo(document.body)[0];
					
						// Create initial history entry
						History.$iframe.contentWindow.document.open();
						History.$iframe.contentWindow.document.close();
					
						// Define the checker function (for bookmarks)
						var iframeHit = false;
						checker = function ( ) {
						
							// Fetch
							var hash = History.getHash();
							var state = History.getState();
							var iframeHash = History.extractHash(History.$iframe.contentWindow.document.location.hash);
						
							// Check if the browser hash is different
							if ( state !== hash ) {
								// Browser hash is different
							
								// Check if we need to update the iframe
								if ( !iframeHit ) {
									// Write a iframe/history entry in the browsers back and forward
									// alert('update iframe entry');
									History.$iframe.contentWindow.document.open();
									History.$iframe.contentWindow.document.close();
									// alert('update iframe entry.');
								
									// Update the iframe hash
									// alert('update iframe hash');
									History.$iframe.contentWindow.document.location.hash = hash;
									// alert('update iframe hash.');
								}
							
								// Reset
								iframeHit = false;
							
								// Fire
								// alert('hashchange');
								History.$window.trigger('hashchange');
								// alert('hashchange.');
							}
							else {
								// Browser hash is not different
							
								// Check if the iframe hash is different from the iframe state
								if ( state !== iframeHash ) {
									// Specify we were hit from the iframe
									iframeHit = true;
								
									// Update the browser hash
									// alert('set hash from iframe');
									History.setHash(iframeHash);
									// alert('set hash from iframe.');
								}
							}
						
						};
					}
					else {
						// We are not IE
						// Firefox, Opera, Etc
				
						// Define the checker function (for bookmarks, back, forward)
						checker = function ( ) {
							var hash = History.getHash();
							var state = History.getState();
							// Check
							if ( state !== hash ) {
								// State change
								History.$window.trigger('hashchange');
							}
						};
					}
				
					// Apply the checker function
					setInterval(checker, 200);
				}
				else {
					// We are IE8
				
					// Fire the initial
					var hash = History.getHash();
					if ( hash ) {
						History.$window.trigger('hashchange');
					}
				}
			
				// Done
				return true;
			}
	
		}; // We have finished extending/defining our Plugin
	
		// --------------------------------------------------
		// Finish up
	
		// Instantiate
		$.History.construct();
	}
	else {
		window.console.warn('$.History has already been defined...');
	}
	
	// Finished definition
})(jQuery); // We are done with our plugin, so lets call it with jQuery as the argument
