<nav id="sidebar" class="">
	<div id="header-wrapper">
		<form action="../common/search.php" method="get" id="search">
			<div class="keyword">
				<input type="text" name="word" placeholder="全ページ検索">
				<input class="btn-search" type="submit" value="検索">
			</div>
			<fieldset class="type-check">
				<input type="checkbox" id="word-case" name="case" checked>
				<label for="word-case">英大文字・小文字の両方検索</label>
			</fieldset>
		</form>
	</div>
	<div id="menu-wrap">
		<ul id="menu" class="side-link">
			<?php require 'menu_list.php' ?>
		</ul>
	</div>
</nav>