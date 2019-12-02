<section class="uk-section">
	<div class="uk-container-expand">
		<div class="ap-margin fadey">
			<h1>Frequently Asked Questions</h1>
			<?php
			$Parser = new Parsedown();
			$files = get_files(APP . "/assets/faq");
			foreach ($files as $file) {
				echo "<h2 class='uk-heading-divider'>", $file["name"], "</h2>", PHP_EOL;
				echo "<div class='uk-text-justify'>", $Parser->text($file["contents"]), "</div>", PHP_EOL;
			}
			?>
		</div>
	</div>
</section>

<?php
function get_files($real_path) {
    $fold = new DirectoryIterator($real_path);
    $names = [];
    $files = [];
    foreach ($fold as $fi) {
        if ($fi->isDot()) continue;
        $fn = $fi->getFilename();
        if (stripos(strrev($fn), 'dm.') === 0) { // ends in .md
			$names[] = $fn;
		}
	}
	natcasesort($names); // natural order case insensitive sort; 1. foo, 2. bar, 10. baz
	foreach ($names as $name) {
		$files[] = [
			"name" => basename(preg_replace("/^\d{1,}[.]\s*/","", $name),'.md'),
			"contents" => file_get_contents("{$real_path}/{$name}")
		];
	}
    return $files;
}
?>