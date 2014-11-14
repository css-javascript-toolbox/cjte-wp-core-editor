<?php
/**
* 
*/

// Disallow direct access.
defined('ABSPATH') or die("Access denied");

/**
* 
*/
class CJTBlocksBlockView extends CJTView {
	
	/**
	* put your comment there...
	* 
	*/
	public function __construct() {
		# Initialize view base
		parent::__construct(null);
	}	
};

/**
* 
*/
class CJTBlocksManagerView extends CJTView {
	
	/**
	* put your comment there...
	* 
	* @var mixed
	*/
	protected static $onloadglobalcomponents = array(
		'hookType' => CJTWordpressEvents::HOOK_FILTER,
		'parameters' => array('content')
	);

	/**
	* put your comment there...
	* 
	*/
	public function __construct() {
		# Initialize view base
		parent::__construct(null);
	}	
};

/**
* 
*/
class CJTEWCEAdvEditorView extends CJTView {

	/**
	* put your comment there...
	* 
	* @var mixed
	*/
	protected $defaultFile = 'wp-config.php';
	
	/**
	* put your comment there...
	* 
	* @var mixed
	*/
	protected $filesList;
	
	/**
	* put your comment there...
	* 
	* @var mixed
	*/
	protected $securityToken;

	/**
	* put your comment there...
	* 
	*/
	public function __construct($info) {
		# Initialize view base
		parent::__construct($info);
		// Dummy Block views for delegating static/live events!
		$dummyBlockView = new CJTBlocksBlockView();
		$dummyBlocksManagerView = new CJTBlocksManagerView();
		# Enqueue scripts and styles
		add_action('admin_print_styles', array(__CLASS__, 'enqueueStyles'));
		add_action('admin_enqueue_scripts', array(__CLASS__, 'enqueueScripts'));
		# Output Editor Toolbox HTML
		add_filter('print_footer_scripts', array($this, 'outputExtensionsHTML'));
	}
	
	/**
	* put your comment there...
	* 
	* @param mixed $tpl
	*/
	public function display($tpl = null) {
		// Initialize.
		
		// Cache view vars.
		$this->securityToken = cssJSToolbox::getSecurityToken();
		$this->filesList = $this->model->getFilesList();
		// Display view.
		echo $this->getTemplate($tpl);
	}

	/**
	* put your comment there...
	* 
	*/
	public static function enqueueScripts() {
		// Delegate extensions
		$allScripts = CJTBlocksBlockView::trigger('CJTBlocksBlockView.usescripts', array(
			'thickbox',
			'framework:js:hash:{CJT-}md5',
			'framework:js:ajax:{CJT-}cjt-server',
			'framework:js:ajax:{CJT-}cjt-module-server',
			'framework:js:ace(loadMethod=Tag, lookFor=ace)',
			'framework:js:cookies:{CJT-}jquery.cookies.2.2.0',
			'framework:js:ui:{CJT-}jquery.toolbox',
			'views:blocks:block:public:js:plugins:{CJT-}_dockmodule',
			'extension://cjte-wp-core-editor/views:adveditor:public:js:{CJTEWCE_Views_AdvEditor_View-}_dummycjtblock',
			'extension://cjte-wp-core-editor/views:adveditor:public:js:{CJTEWCE_Views_AdvEditor_View-}_extensiondefinition',
			'extension://cjte-wp-core-editor/views:adveditor:public:js:{CJTEWCE_Views_AdvEditor_View-}_fileslist.jquery',
			'extension://cjte-wp-core-editor/views:adveditor:public:js:{CJTEWCE_Views_AdvEditor_View-}_fileslist',
		));
		# Editor MAIN/CORE/LOADER module must be the latest script to run
		$allScripts[] = 'extension://cjte-wp-core-editor/views:adveditor:public:js:{CJTEWCE_Views_AdvEditor_View-}_editor';
		# Use related scripts.
		self::useScripts(__CLASS__, $allScripts);
	}
	
	/**
	* put your comment there...
	* 
	*/
	public static function enqueueStyles() {
		# Deletegate extensions
		$allStyles = CJTBlocksBlockView::trigger('CJTBlocksBlockView.usestyles', array(
			'thickbox',
			'framework:css:{CJT-}toolbox',
			'extension://cjte-wp-core-editor/views:adveditor:public:css:{CJTEWCE_Views_AdvEditor_View-}editor'
		));
		# Initialize style.
		self::useStyles(__CLASS__, $allStyles);
	}

	/**
	* put your comment there...
	* 
	* @param mixed $printScripts
	*/
	public function outputExtensionsHTML($printScripts) {
		// Output Markup for extension and for pariotipated extensions!
		$content = '<div id="cjt-inline-popup"></div><input type="hidden" id="cjt-security-token" value="' . cssJSToolbox::getSecurityToken() . '" />';
		echo CJTBlocksManagerView::trigger('CJTBlocksManagerView.loadglobalcomponents', $content);
		// Chaining!
		return $printScripts;
	}

} // End class.

CJTEWCEAdvEditorView::define('CJTEWCEAdvEditorView');