{
	// HelloWorld.js

	function HelloWorld(thisObj) {
		const isSecurityPrefSet = () => app.preferences.getPrefAsLong("Main Pref Section", "Pref_SCRIPTING_FILE_NETWORK_SECURITY")
        
		if (isSecurityPrefSet()) {
			alert("Hello World")
		} else {
			alert("This demo requires the scripting security preference to be set.\nGo to the \"Scripting & Expressions\" panel of your application preferences, and make sure that \"Allow Scripts to Write Files and Access Network\" is checked.", "Hello World");
		}
	}

	HelloWorld(this);
}
