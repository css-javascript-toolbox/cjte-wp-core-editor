/**
* 
*/

var CJTBlockPluginBase;

/**
* 
*/
(function($) {
	
	/**
	* DUMMY Blocks Manager container
	* 
	* @type T_JS_FUNCTION
	*/
	CJTBlocksPage = new function() {
		
		/**
		* Ajax Server prototype object
		* 
		* @type T_JS_FUNCTION
		*/
		this.server = CJTServer;
		
		/**
		* 
		*/
		this.initialize = function() {
			this.server.securityToken = $('#cjt-security-token').val();
		};
		
		// Seet server security token
		$($.proxy(this.initialize, this));
	};

	/**
	* 
	*/
	CJTBlockPluginBase = function() {
		
		/**
		* 
		*/
		this.load = function() {
			// Initialize
			var regularEditor = $('#newcontent');
			// Add ACE Editor div instead of textarea
			var editorElement = $('<div class="cjt-toolbox" id="cjteape-newcontent"></div>').html(regularEditor.html());
			// Dummy Block box
			var blockBox = $('<span id="dummy-block-container" class="cjcodeblock"><div class="cjt-toolbox editor-toolbox"><div class="icons-group"></div></div><div class="inside-container"><div class="inside"></div></div></span>').append(editorElement).insertBefore(regularEditor);
			// Push Dummy Block object into Block Box dummy element
			blockBox.get(0).CJTBlock = this;
			// Clear regular editor
			regularEditor.empty();
			// Turns into ACE Editor
			this.editor = ace.edit('cjteape-newcontent');
			// Getting file type
			var fileName = CJTEAPEExtDef.getEditFile();
			var fileExtension = fileName.substring(fileName.length - 3);
			// Set options
			var editorSession = this.editor.getSession();
			editorSession.setMode('ace/mode/' + fileExtension);
			// Editor default options.
			this.editor.setOptions({showPrintMargin : false});
			// Set focus
			this.editor.focus();
			// Extend editor methods
			this.editor.setValuePossibleUndo = function(value) {
				// Directly clear using setValue('') prevent 'undo' action!
				// Select all text.
				this.selectAll();
				// Replace content with empty string!
				this.getSession().replace(this.getSelectionRange(), value);
				this.focus();
			};
			// Theme object
			this.theme = {};
			// Dummy edit Block name element to have Toolbox Block Menu added after!
			this.elements = new function() {
				
				/**
				* 
				*/
				this.editBlockName = $('<div id="dummy-cjt-block-name"></div>').insertBefore(editorElement);
				
			};
			
			/**
			* Screen modes DOCK!
			*/
			this.extraDocks = [];
			this.defaultDocks = [{element : editorElement, pixels : -6}];
			CJTBlockObjectPluginDockModule.plug(this);
			
			/**
			* 
			*/
			this.getInEditFile = function() {
				return fileName;
			};
		
			// Create Dummy Block AcEditor
			this.block = new (function(advEditor) {
				
				/**
				* 
				*/
				this.aceEditor = advEditor.editor;
				
				/**
				* 
				*/
				this.box = blockBox;
		
				/**
				* 
				*/
				this.get = function(propName, defaultValue, type) {
					// Get property class type
					type = (type !== undefined) ? type : 'getCookiePropertyName';
					// Read cookies value
					var cookieName = this[type](propName);
					var cookiedValue = $.cookies.get(cookieName);
					// Return cookies or default if no cookies available for theme
					value = cookiedValue ? cookiedValue : defaultValue;
					// Return value
					return value;
				};

				/**
				* 
				*/
				this.getCookieFilePropertyValue = function(name, defaultValue) {
					return this.get(name, defaultValue, 'getCookieFilePropertyName');
				};
				
				/**
				* 
				*/
				this.getCookieFilePropertyName = function(name) {
					return this.getCookiePropertyName(name + '-' + fileName);
				};
		
				/**
				* 
				*/
				this.getCookiePropertyName = function(name) {
					return 'CJTEAPEExtDef' + '-' + CJTEAPEExtDef.getName() + '-' + name; 
				};
		
				/**
				* 
				*/
				this.getCookiePropertyValue = function(name, defaultValue) {
					return this.get(name, defaultValue);
				};

				/**
				* 
				*/
				this.getFileScrollPosition = function() {
					return this.getCookieFilePropertyValue('scrollPosition', 0);
				};
				
				/**
				* 
				*/
				this.set = function(propName, value, type) {
					// Get property class type
					type = (type !== undefined) ? type : 'getCookiePropertyName';
					// Set value
					var cookieName = this[type](propName);
					$.cookies.set(cookieName, value);
					// Chain
					return this;
				};
		
				/**
				* 
				*/
				this.setCookieFilePropertyValue = function(name, value) {
					return this.set(name, value, 'getCookieFilePropertyName');
				};

				/**
				* 
				*/
				this.setCookiePropertyValue = function(name, value) {
					return this.set(name, value);
				};
				
				/**
				* 
				*/
				this.setFileScrollPosition = function(value)	{
					return this.setCookieFilePropertyValue('scrollPosition', value);
				};
		
			})(this);
		
			// Set scroll top
			editorSession.setScrollTop(this.block.getFileScrollPosition());
			
			/**
			* 
			*/
			this.editorToolbox = this.block.box.find('.editor-toolbox').CJTToolBox({
				context : this,
				handlers : {}
			}).get(0).CJTToolBox;
		
			// Set fil content before form submission
			$('#template').submit($.proxy(
				function() {
					// Get editor session
					var session = this.editor.getSession();
					// Fill regular editor
					regularEditor.text(session.getValue());
					// Hold scroll top position
					this.block.setFileScrollPosition(session.getScrollTop());
				}, this)
			);
		
		};
		
	};
	
})(jQuery);