<?php

abstract class ToScormUtilities {

	// deltree
	private static function rrmdir($src) {
	    if (file_exists($src)) {
	        $dir = opendir($src);
	        while (false !== ($file = readdir($dir))) {
	            if (($file != '.') && ($file != '..')) {
	                $full = $src . '/' . $file;
	                if (is_dir($full)) {
	                    self::rrmdir($full);
	                } else {
	                    unlink($full);
	                }
	            }
	        }
	        closedir($dir);
	        rmdir($src);
	    }
	}


	public static function getParam($name, $type = 'text', $default = null) {

		if (isset($_POST[$name])) {
			$source = $_POST[$name];
		} elseif (isset($_GET[$name])) {
			$source = $_GET[$name];
		} else {
			$source = null;
		}

		if (!is_null($source)) {
			switch ($type) {
				case 'bool':
				case 'boolean':
					return filter_var($source, FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE);
					break;

				case 'int':
				case 'integer':
				case 'number':
					return filter_var($source, FILTER_VALIDATE_INT, FILTER_NULL_ON_FAILURE);
					break;

				case 'project':
					$hash = self::getWorkspaceHash();
					$root = realpath('.');
					if (!file_exists($root.'/content/'.$hash)) {
						mkdir($root.'/content/'.$hash, 0775, true);
					}
					if (file_exists($root.'/content/'.$hash.'/'.$source)) {
						return $source;
					}
					break;

				case 'action':
					if (in_array($source, ['upload','download','create','delete','use'])) {
						return $source;
					}
					break;

				case 'text':
					if (!is_numeric($source) && !is_array($source) && strlen($source) > 0) {
						return $source;
					}
					break;

				case 'basename':
					if (strlen($source) > 0) return basename($source);
					break;

				case 'raw':
					if (strlen($source) > 0) return $source;
					break;
			}
		}

		return $default;

	}

	// full path for php up to but not including querystring
	public static function full_path() {
	    $s = &$_SERVER;
	    $ssl = (!empty($s['HTTPS']) && $s['HTTPS'] == 'on') ? true:false;
	    $sp = strtolower($s['SERVER_PROTOCOL']);
	    $protocol = substr($sp, 0, strpos($sp, '/')) . (($ssl) ? 's' : '');
	    $port = $s['SERVER_PORT'];
	    $port = ((!$ssl && $port=='80') || ($ssl && $port=='443')) ? '' : ':'.$port;
	    $host = isset($s['HTTP_X_FORWARDED_HOST']) ? $s['HTTP_X_FORWARDED_HOST'] : (isset($s['HTTP_HOST']) ? $s['HTTP_HOST'] : null);
	    $host = isset($host) ? $host : $s['SERVER_NAME'] . $port;
	    $uri = $protocol . '://' . $host . $s['REQUEST_URI'];
	    $segments = explode('?', $uri, 2);
	    $url = $segments[0];
	    return $url;
	}

	// get workspace folder, compatible with dev environment
	private static function getWorkspaceHash() {
		$hash = isset($_GET['hash']) ? $_GET['hash'] : self::full_path();
		return md5($hash);
	}

	public static function reLinkVideos($file) {
		return true;
	}

	// add and return the path of a workspace for this name
	public static function createProjectWorkspace($name) {
		$hash = self::getWorkspaceHash();
		$root = realpath('.');
		$folder = $root.'/content/'.$hash;
		if (!file_exists($folder)) {
			mkdir($folder, 0775, true);
		}
		$folder .= '/' . str_replace(array(" ", '"', "'", "&", "/", "\\", "?", "#"),'_', pathinfo($name,PATHINFO_FILENAME));
		while (file_exists($folder)) $folder .= "0";
		mkdir($folder,0775,true);
		return $folder;
	}

	// return a list of the workspace projects
	public static function getWorkspaceProjects() {
		$hash = self::getWorkspaceHash();
		$root = realpath('.');
		return glob($root.'/content/'.$hash.'/*',GLOB_ONLYDIR);
	}

	// delete this project in the workspace, if it exists
	public static function deleteProjectWorkspace($name) {
		$hash = self::getWorkspaceHash();
		$root = realpath('.');
		if (file_exists($root.'/content/'.$hash.'/'.$name)) {
			self::rrmdir($root.'/content/'.$hash.'/'.$name);
		}
		return true;
	}

	// delete the current workspace
	public static function deleteWorkspace() {
		$hash = self::getWorkspaceHash();
		$root = realpath('.');
		self::rrmdir($root.'/content/'.$hash);
	}

}