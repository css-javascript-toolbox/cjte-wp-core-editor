/**
* 
*/

/**
* 
*/
(function($) {
	
	/**
	* 
	* 
	*/
	$.fn.CJTEWordpressCoreEditorFilesList = function(options) {
		
		/**
		* put your comment there...
		* 
		*/
		var jListElement = $(this);
		
		// Change option or create plugin instance
		if (jListElement.data('CJTEWCEJPInstance')) {
			// Get PLugin instance
			var instance = jListElement.data('CJTEWCEJPInstance');
			// Update options
			instance.options = $.extend(instance.options, options);
			// Chaining
			return this;
		}
		else {
			// Set instance data structure
			jListElement.data('CJTEWCEJPInstance', new function() {
				// Hold options
				this.options = options;
			});
		}
		
		/**
		* put your comment there...
		* 
		*/
		var ajaxSrv = options.ajaxSrv;
		
		/**
		* put your comment there...
		* 
		* @param options
		*/
		var listElement = this;
		
		/**
		* 
		*/
		var fileNameReg = new RegExp('\\' + options.directorySeparator + '?(([^\\' + options.directorySeparator + ']+)|(\\' + options.directorySeparator + '))$');
	
		/**
		* put your comment there...
		* 
		* @type RegExp
		*/
		var sanitizeFileAnchorClassReg = new RegExp('\\' + options.directorySeparator, 'g');
		
		/**
		* put your comment there...
		* 
		* @param file
		*/
		var getFileClass = function(file) {
			return file.replace(sanitizeFileAnchorClassReg, '-').replace(/\./g, '_DOT_');
		};
		
		/**
		* put your comment there...
		* 
		* @param file
		*/
		var getFileEditorMode = function(file) {
			// Initialize
			var extensionOffset = file.indexOf('.');
			var fileMode = null;
			// Get type from extension for files that has extensin
			// or use special types for special files.
			if (extensionOffset != -1) {
				// Get file extension.
				var fileExtension = file.substring(extensionOffset + 1);
				// Special types map
				switch (fileExtension) {
					case 'txt':
						fileMode = 'text';
					break;
					case 'js':
						fileMode = 'javascript';
					break;
					case 'htaccess':
						fileMode = 'text';
					break;
					default :
						// Use extension as mode.
						fileMode = fileExtension;					
					break;
				}
			}
			else {
				// Special files
				switch (file.substring(1)) {
					case 'DOMAP':
						fileMode = 'MAP MODE';
					break;
				}
			}
			return fileMode;
		};
		
		/**
		* put your comment there...
		* 
		* @param file
		*/
		var loadFileForEdit = function(file) {
			// Getting anchor element
			var fileAnchorClass = getFileClass(file);
			var fileAnchor = $('.' + fileAnchorClass);
			var block = CJTEAdvancedPluginsEditor.block;
			// Load for edit
			ajaxSrv.send('default', 'downloadFile', {returnType : 'text/plain', file : file})
			.done(
				function(fileContent) {
					// Initialize
					var editor = block.editor;
					// Fire loads event
					if (options.onloadNewFile) {
						options.onloadNewFile(file, fileContent);
					}
					// Create CJTEPLluginsEditor extension framewoprk compatibility so
					// that all extensions would functional the same as all the other Advanced Editor plugins
					$('#template input[name="file"]').val(file);
					// Remove previously stated in edit file
					$('.in-edit-file').removeClass('in-edit-file');
					// Highlight in edit file anchor
					fileAnchor.addClass('in-edit-file');
					// Highlight in edit file anchor
					editor.getSession().setValue(fileContent);
					// Switch editor language based on file extension
					var fileEditorMode = getFileEditorMode(file);
					editor.getSession().setMode('ace/mode/' + fileEditorMode);
					// Reach file by Toggle on all parent dirs.
					var directoryList = fileAnchor;
					do {
						// Move to parent
						directoryList = directoryList.parent().parent();
						// Show
						directoryList.show();
					} while (!directoryList.hasClass('root-item'));
				}
			);
		};

		/**
		* put your comment there...
		* 
		*/
		var on_clickDirectory = function(event) {
			// Initialize
			var jLink = $(event.target);
			// Toggle directory list
			jLink.next().toggle();
			
			// Inactive
			return false;
		};
		
		/**
		* put your comment there...
		* 
		* @param event
		*/
		var on_clickFile = function(event) {
			// Don't process if locked
			if (jListElement.data('CJTEWCEJPInstance').options.lock !== true) {
				// Load file for edit
				loadFileForEdit($(event.target).data('filePath'));
			}
			// Inactive
			return false;
		};
	
		/**
		* put your comment there...
		* 
		* @param dirObject
		*/
		var renderDirectory = function(parentElement, directory, filesList) {
			// Create directory link
			parentElement.append($('<a href="#"></a>').data('filePath', directory)
																								.text(directory.match(fileNameReg)[1])
																								.click(on_clickDirectory)
																								.addClass(getFileClass(directory)));
			// Create list
			var list = $('<ul></ul>').hide();
			// Append to parent
			parentElement.append(list);
			// Render items
			$.each(filesList,
				function(fileKey, file) {
					// Create File LI
					var fileLi = $('<li></li>');
					list.append(fileLi);
					// Recusive if current file is an object
					if (($.type(file) == 'object' || $.type(file) == 'array')) {
						// Add directory class to li
						fileLi.addClass('cjtewce-item-directory');
						// Enter Directory recusively
						renderDirectory(fileLi, fileKey, file);
					}
					else {
						// Add directory class to li
						fileLi.addClass('cjtewce-item-file');
						// Create file link
						fileLi.append($('<a href="#"></a>').data('filePath', file)
																							 .text(file.match(fileNameReg)[1])
																							 .click(on_clickFile)
																							 .addClass(getFileClass(file)));
					}
				}
			);
		};

		/**
		* 
		*/
		var renderList = function() {
			// Render Wordpress core files root directory
			// and all directories inside
			renderDirectory(listElement, (options.directorySeparator + options.directorySeparator), options.files);
		};

		// Render list
		renderList();
		
		// Select default file
		loadFileForEdit(options.defaultFile);
		
		// Returns
		return this;
	};
	
})(jQuery);