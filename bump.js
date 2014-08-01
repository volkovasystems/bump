/*:
	@module-configuration:
		{
			"packageName": "bump",
			"fileName": "bump.js",
			"moduleName": "bump",
			"authorName": "Richeve S. Bebedor",
			"authorEMail": "richeve.bebedor@gmail.com",
			"repository": "git@github.com:volkovasystems/bump.git",
			"testCase": "bump-test.js",
			"isGlobal": true
		}
	@end-module-configuration

	@module-documentation:

	@end-module-documentation
*/
var bump = function bump( method, URL, catcher, requestOverride ){
	/*:
		@meta-configuration:
			{
				"method:required": "string",
				"URL:required": "string",
				"catcher:required": "function",
				"requestOverride:optional": "function"
			}
		@end-meta-configuration
	*/

	var request;
	if( "XMLHttpRequest" in window ){
		request = new XMLHttpRequest( );

	}else if( "ActiveXObject" in window ){
		try{
			request = new ActiveXObject( "Msxml2.XMLHTTP" );
		}catch( error ){
			console.warn( "Msxml2.XMLHTTP is not supported trying Microsoft.XMLHTTP" );
			console.error( error );

			try{
				request = new ActiveXObject( "Microsoft.XMLHTTP" );
			}catch( error ){
				console.warn( "Microsoft.XMLHTTP is not supported" );
				console.error( error );

				error = new Error( "fatal:procedure lacks the required support" );
				console.error( error );
				throw error;
			}
		}
	}

	request.open( method, URL );

	var requestParameterData = "";
	if( typeof requestOverride != "undefined" ){
		requestParameterData = requestOverride( request );
	}

	request.onreadystatechange = function onReadyStateChange( ){
		var parameterList = Array.prototype.slice.call( arguments );

		parameterList.splice( 0, 1, null );

		catcher.apply( request, parameterList );
	};

	try{
		request.send( requestParameterData );

	}catch( error ){
		console.error( error );
		
		catcher.call( request, error );
	}

	return request;
};