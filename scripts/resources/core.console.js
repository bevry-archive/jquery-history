/**
 * @depends nothing
 * @name core.console
 * @package jquery-sparkle {@link http://www.balupton/projects/jquery-sparkle}
 */

/**
 * Console Emulator
 * We have to convert arguments into arrays, and do this explicitly as webkit (chrome) hates function references, and arguments cannot be passed as is
 * @version 1.0.1
 * @date July 09, 2010
 * @since 0.1.0-dev, December 01, 2009
 * @package jquery-sparkle {@link http://www.balupton/projects/jquery-sparkle}
 * @author Benjamin "balupton" Lupton {@link http://www.balupton.com}
 * @copyright (c) 2009-2010 Benjamin Arthur Lupton {@link http://www.balupton.com}
 * @license GNU Affero General Public License version 3 {@link http://www.gnu.org/licenses/agpl-3.0.html}
 */
if ( typeof window.console !== 'object' || typeof window.console.emulated === 'undefined' ) {
	// Check to see if console exists
	if ( typeof window.console !== 'object' || typeof window.console.log !== 'function' ) {
		// Console does not exist
		window.console = {};
		window.console.log = window.console.debug = window.console.warn = window.console.trace = function(){};
		window.console.error = function(){
			alert("An error has occured. Please use another browser to obtain more detailed information.");
		};
	}
	else {
		// Console is object, and log does exist
		// Check Debug
		if ( typeof window.console.debug === 'undefined' ) {
			window.console.debug = function(){
				var arr = ['console.debug:']; for(var i = 0; i < arguments.length; i++) { arr.push(arguments[i]); };
			    window.console.log.apply(window.console, arr);
			};
		}
		// Check Warn
		if ( typeof window.console.warn === 'undefined' ) {
			window.console.warn = function(){
				var arr = ['console.warn:']; for(var i = 0; i < arguments.length; i++) { arr.push(arguments[i]); };
			    window.console.log.apply(window.console, arr);
			};
		} 
		// Check Error
		if ( typeof window.console.error === 'undefined' ) {
			window.console.error = function(){
				var arr = ['console.error']; for(var i = 0; i < arguments.length; i++) { arr.push(arguments[i]); };
			    window.console.log.apply(window.console, arr);
			};
		}
		// Check Trace
		if ( typeof window.console.trace === 'undefined' ) {
			window.console.trace = function(){
			    window.console.error.apply(window.console, ['console.trace does not exist']);
			};
		}
	}
	// We have been emulated
	window.console.emulated = true;
}