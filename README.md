## jQuery History

Super-seeded by github.com/balupton/history.js - jQuery History allows you to easily track changes of the pages state by tracking URL Hashes. Supports changes triggered by bookmarks and back & forward buttons, as well as cross browser support.


## Usage

Refer to the [demo](http://balupton.github.com/jquery-history/demo/) and the [source code](https://github.com/balupton/jquery-history/tree/master/scripts/resources)


## Query Strings

If you would like to have a QueryString in your hash and fetch the contents of it. So for example we have:

	http://localhost/page/#subpage?a=true&b=false

And we would like to extract b. Then we can do:

	var hashData = hash.queryStringToJSON();
	console.log(hashData); // {a:true,b:false}
	console.log(hashData.a); // true
	console.log(hashData.b); // false

But first, you will have to download the queryStringToJSON function from within here:

	https://github.com/balupton/jquery-sparkle/blob/master/scripts/resources/core.string.js

And place it within your own code. It is not included within jQuery History by default, as it is not essential.


## History

You can discover the history inside the [History.md](https://github.com/balupton/jquery-history/blob/master/History.md#files) file


## License

Licensed under the [MIT License](http://creativecommons.org/licenses/MIT/)
<br/>Copyright &copy; 2008-2010 [Benjamin Arthur Lupton](http://balupton.com)


## Thanks

- [jQuery](http://jquery.com/)
- [jQuery UI History - Klaus Hartl](http://www.stilbuero.de/jquery/ui_history/)
- [Really Simple History - Brian Dillard and Brad Neuberg](http://code.google.com/p/reallysimplehistory/)
- [jQuery History Plugin - Taku Sano (Mikage Sawatari)](http://www.mikage.to/jquery/jquery_history.html)
- [jQuery History Remote Plugin - Klaus Hartl](http://stilbuero.de/jquery/history/)
- [Content With Style: Fixing the back button and enabling bookmarking for ajax apps - Mike Stenhouse](http://www.contentwithstyle.co.uk/Articles/38/fixing-the-back-button-and-enabling-bookmarking-for-ajax-apps)
- [Bookmarks and Back Buttons](http://ajax.howtosetup.info/options-and-efficiencies/bookmarks-and-back-buttons/)
- [Ajax: How to handle bookmarks and back buttons - Brad Neuberg](http://dev.aol.com/ajax-handling-bookmarks-and-back-button)
