<?php
/**
* @version $ Id; ?FILE_NAME ?DATE ?TIME ?AUTHOR $
*/

// Disallow direct access.
defined('ABSPATH') or die("Access denied");

/**
* 
* DESCRIPTION
* 
* @author ??
* @version ??
*/
class CJTEWCE_Models_CoreEditor {

	/**
	* put your comment there...
	* 
	* @var mixed
	*/
	protected $wpABSPath;
	
	/**
	* 
	*/
	const FILES_LIST_CACHE_OPTIONS_VAR_NAME = 'cjtewc.files.list';

	/**
	* put your comment there...
	* 
	*/
	public function __construct() {
		# Getting Wordpress absolute path using System DIRECTORY Separator Character
		$this->wpABSPath = str_replace('/', DIRECTORY_SEPARATOR, ABSPATH);
	}

	/**
	* put your comment there...
	* 
	*/
	public function getWPABSPath() {
		return $this->wpABSPath;
	}
	
	/**
	* put your comment there...
	* 
	* @param mixed $directory
	* @param mixed $list
	*/
	protected function scrapeFilesList($directory, & $list) {
		# Getting all files / recusively get directories
		foreach (new DirectoryIterator($directory) as $file) {
			# Cache file
			if ($file->isFile()) {
				# Add to list
				$list[] = str_replace($this->wpABSPath, '', $file->getPathname());
			}
			else if ($file->isDir() && !$file->isDot()) {
				# Initialize files list
				$childsList = array();
				# Get directotry recursive
				$this->scrapeFilesList($file->getPathname(), $childsList);
				# Push list
				$list[str_replace($this->wpABSPath, '', $file->getPathname())] = $childsList;
			}
		}
		# Chaining
		return $this;
	}

	/**
	* put your comment there...
	* 
	*/
	public function getFilesList() {
		//return json_encode(array('file1', 'file2', 'file3', 'dir' => (object) array('filex')));
		# Getting cache
		$filesList = get_option(self::FILES_LIST_CACHE_OPTIONS_VAR_NAME, '');
		# Generate list if not yet cached
		if (!$filesList) {
			# Get files list
			$this->scrapeFilesList($this->wpABSPath, $filesList);
			# Remove wp-content folder as its being editable by other extensions
			unset($filesList['wp-content']);
			# Json Encode
			$filesList = json_encode($filesList);
			# Cache it
			//update_option(self::FILES_LIST_CACHE_OPTIONS_VAR_NAME, $filesList);
		}
		# Returns
		return $filesList;
	}

}