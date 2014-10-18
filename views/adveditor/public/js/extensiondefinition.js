/**
* 
*/

/**
* 
*/
(function($) {
	
	/**
	* put your comment there...
	* 
	* @type T_JS_FUNCTION
	*/
	CJTEAPEExtDef = new function() {

		/**
		* put your comment there...
		* 
		* @type String
		*/
		var type = 'wpcoreeditor';
		
		/**
		* put your comment there...
		* 
		* @type String
		*/
		var module = 'CJTEWCE';
		
		/**
		* put your comment there...
		* 
		* @type String
		*/
		var name = 'wpcoreeditor';

		/**
		* 
		*/
		this.getEditFile = function() {
			return $('#template').find('input[name="file"]').val();
		};
		
		/**
		* put your comment there...
		* 
		* @type String
		*/
		this.getModuleName = function() {
			return module;
		};
			
		/**
		* put your comment there...
		* 
		* @type String
		*/
		this.getName = function() {
			return name;
		};
		
		/**
		* 
		*/
		this.getType = function() {
			return type;
		};
		
		/**
		* 
		*/
		this.on_blockLoaded = function(block) {
			CJTEWordpressCoreEditor.initialize(block);
		};
	
	};

})(jQuery);