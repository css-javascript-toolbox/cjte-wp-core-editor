<?php
/*
Plugin Name: CJTe WP Core Editor
Plugin URI: http://css-javascript-toolbox.com/extensions/wp-core-editor/
Description: CJT-Extension plugin for turning Regular Wordpress Plugins editor into CJT Advanced plugins editor.
Version: 0.5
Author: Wipeout Media 
Author URI: http://css-javascript-toolbox.com

Copyright (c) 2011, Wipeout Media.
This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
*/

// Disallow direct access.
defined('ABSPATH') or die("Access denied");

/**
* Everything is defined cjte-wordpress-core-editor.class.php file!
* cjte-wordpress-core-editor.xml file definition file tells CSS & javascript Toolbox extensions
* loaded what events to bind to this extensions.
* 
* When a binded event is fired cjte-wordpress-core-editor.class.php file will loaded automatically!
* 
* This is great for deferring!
*/