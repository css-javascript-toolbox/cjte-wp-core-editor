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
class CJTEWCECoreEditorController extends CJTController {
	
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
		
	}

	/**
	* put your comment there...
	* 
	*/
	public function displayAction() {
		// Push model to view
		$this->view->setModel(new CJTEWCE_Models_CoreEditor());
		// Display
		echo parent::displayAction();
	}

}