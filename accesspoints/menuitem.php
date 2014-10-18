<?php
/**
* 
*/

// Disallow direct access.
defined('ABSPATH') or die("Access denied");

/**
* 
*/
class CJTEWCE_AccessPoints_MenuItem extends CJTPageAccessPoint {

	/**
	* put your comment there...
	* 
	*/
	public function __construct() {
		// Initialize Access Point base!
		parent::__construct();
		// Set access point name!
		$this->name = 'cjt-wp-core-files-editor';
	}

	/**
	* put your comment there...
	* 
	*/
	protected function doListen() {
		add_action('admin_menu', array(&$this, 'menu'), 30);
	}
	
	/**
	* put your comment there...
	* 
	*/
	public function menu() {
		// Setup Page.
		$pageHookId = add_submenu_page(
			CJTPlugin::PLUGIN_REQUEST_ID,
			cssJSToolbox::getText('CJT Wordpress Core Files Editor'),
			cssJSToolbox::getText('WP Core Editor'), 
			'administrator', 
			(CJTPlugin::PLUGIN_REQUEST_ID . '-cjte-wp-core-files-editor'), 
			array(&$this->controller, '_doAction')
		);
		// Process when its installed!!
		add_action("load-{$pageHookId}", array($this, 'getPage'));
	}
	
	/**
	* put your comment there...
	* 
	*/
	public function route($loadView = null, $request = array('view' => 'adveditor')) {
		// Load package manager view  through the default controller.
		$this->controllerName = 'coreeditor';
		// Set MVC request parameters.
		parent::route($loadView, $request)
		// Fire 'display' action.
		->setAction('display');
	}
	
} // End class.

// Hookable!
CJTEWCE_AccessPoints_MenuItem::define('CJTEWCE_AccessPoints_MenuItem', array('hookType' => CJTWordpressEvents::HOOK_FILTER));