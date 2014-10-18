/**
* 
*/

/**
* 
*/
(function($) {
	
	/**
	* 
	*/
	CJTEWordpressCoreEditor = new function() {
    
		/**
		* put your comment there...
		* 
		* @type CJTModuleServer
		*/
		var ajaxSrv = new CJTModuleServer('CJTEWCE');
		
		/**
		* put your comment there...
		* 
		*/
		var fileContentHash = null;
		
		/**
		* put your comment there...
		* 
		*/
		var filesListElement;
		
		/**
		* put your comment there...
		* 
		*/
		var on_loadFile = function(file, fileContent) {
			// Reset file code hash
			fileContentHash = hex_md5(fileContent);
			// Reflect windows title
			$('head title').text(file + ' - CJT Wordpress Core Editor');
			// Set file name header info
			$('#file-name').text(file);
		};
		
		/**
		* 
		*/
		this.initialize = function(block) {
			// Initiaize
			var fileInfoName = $('#file-name');
			// Get files list element
			filesListElement = $('#cjtewce-root-files-list>ul>li');
			// Create Files list
			filesListElement.CJTEWordpressCoreEditorFilesList({
				files : wpCoreFilesList, 
				directorySeparator : directorySeparator,
				defaultFile : $('#template').find('input[name="file"]').val(),
				ajaxSrv : ajaxSrv,
				onloadNewFile : on_loadFile
			});
			// Status notie markup
			var saveProgress = $('<div id="operation-status"></div>').insertBefore($('#cjteape-newcontent'));
			var progressMessage = $('<span class="message"></span>').appendTo(saveProgress);
			$('<a href="#" class="closeButton"></a>').appendTo(saveProgress).click(
				function() {
					// Hide save progress
					saveProgress.css('visibility', 'hidden');
					$(this).css('visibility', 'hidden');
					// inactive
					return false;
				});
			// Initialize vars
			var editor = block.editor;
			var editorSession = editor.getSession();			
			// Change file code hash when editor data changed
			editorSession.doc.on('change', function() {
				// Set changed class
				if (fileContentHash != hex_md5(editorSession.getValue())) {
					fileInfoName.addClass('changed');
				}
				else {
					fileInfoName.removeClass('changed');
				}
			});
			// Saving file
			$('#template #submit').click(
				function() {
					// Lock Editor
					editor.setReadOnly(true);
					// Lock files list
					filesListElement.CJTEWordpressCoreEditorFilesList({lock : true});
					// Set saving progress location and visiblity
					progressMessage.text('Saving ...')
					saveProgress.css('visibility', 'visible').find('.closeButton').css('visibility', 'hidden');
					// Save over AJAX
					ajaxSrv.send('default', 'saveFile', {
						file : $('#template input[name="file"]').val(),
						content : editorSession.getValue()
					}, 'post').done(
						function(status) {
							// Hide saving progress
							saveProgress.css('visibility', 'hidden');
							// Refresh content hash
							fileContentHash = hex_md5(editorSession.getValue());
							// Remove UI changes notice
							fileInfoName.removeClass('changed');
						}
					).complete(
						function() {
							// Unlock editor
							editor.setReadOnly(false);
							// Unlock files list
							filesListElement.CJTEWordpressCoreEditorFilesList({lock : false});
						}
					).error(
						function() {
							// Display error message
							progressMessage.text('Error while saving file!');
							// Allow dismissing Error message
							saveProgress.find('.closeButton').css('visibility', 'visible');
						}
					);
				}
			);
		};

	};
	
})(jQuery);