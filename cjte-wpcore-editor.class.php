<?php
/**
* 
*/

// Disallow direct access.
defined('ABSPATH') or die("Access denied");

# Define Block Widget Linker extension autoloader.
CJT_Framework_Autoload_Loader::autoLoad('CJTEWCE', dirname(__FILE__));

/**
* 
*/
class CJTEWordpressCoreEditor {

	/**
	* put your comment there...
	* 
	*/
	public function getInvolved() {
		# Tool Menu Item
		$menuItem = new CJTEWCE_AccessPoints_MenuItem();
		$menuItem->listen();
	}

}