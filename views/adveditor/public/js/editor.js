/**
* 
*/

/**
* 
*/
(function($) {
	
	
	/**
	* Dummy Code File View!
	* 
	* @type T_JS_FUNCTION
	*/
	CJTBlockCodeFileView = new function() {

		/**
		* 
		*/
		this.applyTheme = function() {;}
		
	};

	/**
	* put your comment there...
	* 
	* @type T_JS_FUNCTION
	*/
	CJTEAdvancedPluginsEditor = new function() {
		
		/**
		* 
		*/
		this.cjtserver = new CJTModuleServer(CJTEAPEExtDef.getModuleName());
	
		/**
		* 
		*/
		this.initialize = function() {
			// Create Dummy Block
			this.block = new CJTBlockPluginBase();
			// Load Extensions cheated by Dummy Block!
			this.block.load();
			// Extension definition block loaded event
			if (CJTEAPEExtDef.on_blockLoaded) {
				CJTEAPEExtDef.on_blockLoaded(this.block);
			}
			// Activate Toolbox menu
			this.block.block.box.trigger('click');
			// Remove Assignmet Panel toggler button if editot toolbox extension currently 
			// activated
			$('.cjttbl-toggle-objects-panel').remove();
			// If Editor Toolbox menu is plugged then override save, savefile and remove 'delete' button
			if (this.block.menu !== undefined) {
				// Delete 'Delete' item
				$('#cjteet-menu-file-delete').remove();
				// Hack reload method
				this.block.menu.file.pluginsAdvancedEditorLoad = this.block.menu.file.load;
				this.block.menu.file.load = function(method) {
					switch (method) {
						case undefined:
							// Reload from server
							var requestData = {
								'file' : CJTEAdvancedPluginsEditor.block.getInEditFile(), 
								'folder' : CJTEAPEExtDef.getType()
							};
							// Get Download URL.
							CJTEAdvancedPluginsEditor.cjtserver.send('default', 'downloadFile', requestData, 'get', 'text').success($.proxy(
								function(filecontent) {
									// Set value
									CJTEAdvancedPluginsEditor.block.editor.setValuePossibleUndo(filecontent);
								}, this)
							);
						break;
						default:
							CJTEAdvancedPluginsEditor.block.menu.file.pluginsAdvancedEditorLoad(method);
						break;
					}
				};
				// Hack save and save File methods.
				this.block.menu.file.save = function(method) {
					// Process different save actions.
					switch (method) {
						case 'file':
							var requestData = {
								'file' : CJTEAdvancedPluginsEditor.block.getInEditFile(), 
								'folder' : CJTEAPEExtDef.getType()
							};
							// Get Download URL.
							var pluginFileURL = CJTEAdvancedPluginsEditor.cjtserver.getRequestURL('default', 'downloadFile', requestData);
							// Download via new Window.
							window.open(pluginFileURL);
						break;
						default: // Save block
							$('#template').find('#submit').click();
						break;
					}
				};
			}
		};

	};
	
	$($.proxy(CJTEAdvancedPluginsEditor.initialize, CJTEAdvancedPluginsEditor));
	
})(jQuery);