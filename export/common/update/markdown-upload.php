<?php
	//if (!empty($_POST['path']) && !empty($_POST['report'])){
	if (!empty($_POST['path'])){
		file_put_contents($_POST['path'], $_POST['report']);
	}
?>