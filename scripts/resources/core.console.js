/**
 * @depends nothing
 * @name core.console
 * @package jquery-sparkle {@link http://balupton.com/projects/jquery-sparkle}
 */

/**
 * Console Emulator
 * We have to convert arguments into arrays, and do this explicitly as webkit (chrome) hates function references, and arguments cannot be passed as is
 * @version 1.0.3
 * @date August 31, 2010
 * @since 0.1.0-dev, December 01, 2009
 * @package jquery-sparkle {@link http://balupton.com/projects/jquery-sparkle}
 * @author Benjamin "balupton" Lupton {@link http://balupton.com}
 * @copyright (c) 2009-2010 Benjamin Arthur Lupton {@link http://balupton.com}
 * @license MIT License {@link http://creativecommons.org/licenses/MIT/}
 */

// Check to see if console exists, if not define it
if ( typeof window.console === 'undefined' ) {
	window.console = {};
}

// Check to see if we have emulated the console yet
if ( typeof window.console.emulated === 'undefined' ) {
	// Emulate Log
	if ( typeof window.console.log === 'function' ) {
		window.console.hasLog = true;
	}
	else {
		if ( typeof window.console.log === 'undefined' ) {
			window.console.log = function(){};
		}
		window.console.hasLog = false;
	}

	// Emulate Debug
	if ( typeof window.console.debug === 'function' ) {
		window.console.hasDebug = true;
	}
	else {
		if ( typeof window.console.debug === 'undefined' ) {
			window.console.debug = !window.console.hasLog ? function(){} : function(){
				var arr = ['console.debug:']; for(var i = 0; i < arguments.length; i++) { arr.push(arguments[i]); };
		    	window.console.log.apply(window.console, arr);
			};
		}
		window.console.hasDebug = false;
	}

	// Emulate Warn
	if ( typeof window.console.warn === 'function' ) {
		window.console.hasWarn = true;
	}
	else {
		if ( typeof window.console.warn === 'undefined' ) {
			window.console.warn = !window.console.hasLog ? function(){} : function(){
				var arr = ['console.warn:']; for(var i = 0; i < arguments.length; i++) { arr.push(arguments[i]); };
		    	window.console.log.apply(window.console, arr);
			};
		}
		window.console.hasWarn = false;
	}

	// Emulate Error
	if ( typeof window.console.error === 'function' ) {
		window.console.hasError = true;
	}
	else {
		if ( typeof window.console.error === 'undefined' ) {
			window.console.error = function(){
				var msg = "An error has occured.";

				// Log
				if ( window.console.hasLog ) {
					var arr = ['console.error:']; for(var i = 0; i < arguments.length; i++) { arr.push(arguments[i]); };
		    		window.console.log.apply(window.console, arr);
					// Adjust Message
					msg = 'An error has occured. More information is available in your browser\'s javascript console.'
				}

				// Prepare Arguments
				for ( var i = 0; i < arguments.length; ++i ) {
					if ( typeof arguments[i] !== 'string' ) {
						break;
					}
					msg += "\n"+arguments[i];
				}

				// Throw Error
				if ( typeof Error !== 'undefined' ) {
					throw new Error(msg);
				}
				else {
					throw(msg);
				}
			};
		}
		window.console.hasError = false;
	}

	// Emulate Trace
	if ( typeof window.console.trace === 'function' ) {
		window.console.hasTrace = true;
	}
	else {
		if ( typeof window.console.trace === 'undefined' ) {
			window.console.trace = function(){
				window.console.error('console.trace does not exist');
			};
		}
		window.console.hasTrace = false;
	}

	// Done
	window.console.emulated = true;
}
