<?php
/**
* @version $ Id; ?FILE_NAME ?DATE ?TIME ?AUTHOR $
*/

// Disallow direct access.
defined('ABSPATH') or die("Access denied");

// import dependencies.
cssJSToolbox::import('framework:mvc:controller-ajax.inc.php');

/**
* 
* DESCRIPTION
* 
* @author ??
* @version ??
*/
class CJTEWCEDefaultController extends CJTAjaxController {
	
	/**
	* 
	* Initialize new object.
	* 
	* @return void
	*/
	public function __construct($hasView = null, 
															$request = null, 
															$overrideControllerPath = null, 
															$overrideContollerPrefix = null) {
		// Initialize parent!
		parent::__construct($hasView, $request, $overrideControllerPath, $overrideContollerPrefix);
		// Add actions.
		$this->registryAction('downloadFile');
		$this->registryAction('saveFile');
	}

	/**
	* put your comment there...
	* 
	*/
	public function downloadFileAction() {
		# Initialize
		$model = new CJTEWCE_Models_CoreEditor();
		# File to download
		$file = $_GET['file'];
		$filePath = $model->getWPABSPath() . $file;
		$returnType = $_GET['returnType'] ? $_GET['returnType'] : 'application/octet-stream';
		# Set headers.
		$this->httpContentType = "{$returnType}";
		header('Content-Description: File Transfer');
		header('Content-Disposition: attachment; filename=' . basename($file) . '');
		header('Content-Transfer-Encoding: binary');
		header("Content-Length: " . filesize($filePath));
		# Sending for download.
		$this->response = file_get_contents($filePath);			
	}

	/**
	* put your comment there...
	* 
	*/
	public function saveFileAction() {
		# Initialize
		$model = new CJTEWCE_Models_CoreEditor();
		$absPath = $model->getWPABSPath();
		# File to download
		$file = filter_input(INPUT_POST, 'file', FILTER_UNSAFE_RAW);
		$data = filter_input(INPUT_POST, 'content', FILTER_UNSAFE_RAW);
		# Get full path, remove extra slashs
		$filePath = "{$absPath}{$file}";
		# Dont save if there is any error with file name
		if (($absPath == $filePath) || (is_dir($filePath)) || (strpos($filePath, $absPath) === FALSE)) {
			die('Access Denied');
		}
		# Save file
		$this->response = file_put_contents($filePath, $data);
	}

}