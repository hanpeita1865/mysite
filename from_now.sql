-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- ホスト: 127.0.0.1
-- 生成日時: 2022-05-30 00:41:55
-- サーバのバージョン： 10.4.17-MariaDB
-- PHP のバージョン: 7.4.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- データベース: `from_now`
--

DELIMITER $$
--
-- 関数
--
CREATE DEFINER=`root`@`localhost` FUNCTION `STRIP_TAGS` (`x` LONGTEXT) RETURNS LONGTEXT CHARSET latin1 READS SQL DATA
BEGIN
	DECLARE sstart INT UNSIGNED;
	DECLARE ends INT UNSIGNED;
	
	IF x IS NOT NULL THEN
		SET sstart = LOCATE('<', x, 1);
		REPEAT
			SET ends = LOCATE('>', x, sstart);
			SET x = CONCAT(SUBSTRING( x, 1 ,sstart -1) ,SUBSTRING(x, ends +1 )) ;
			SET sstart = LOCATE('<', x, 1);
		UNTIL sstart < 1
		END REPEAT;
	END IF;
	
	RETURN x;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- テーブルの構造 `admin_ip`
--

CREATE TABLE `admin_ip` (
  `id_admin` int(30) NOT NULL,
  `ip_address` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- テーブルのデータのダンプ `admin_ip`
--

INSERT INTO `admin_ip` (`id_admin`, `ip_address`) VALUES
(1, '::1'),
(2, '10.203.1.68');

-- --------------------------------------------------------

--
-- テーブルの構造 `locklist`
--

CREATE TABLE `locklist` (
  `id_lock` int(30) NOT NULL,
  `page` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- テーブルのデータのダンプ `locklist`
--

INSERT INTO `locklist` (`id_lock`, `page`) VALUES
(8, 'p__morning'),
(10, 'p__morning_complete');

--
-- ダンプしたテーブルのインデックス
--

--
-- テーブルのインデックス `admin_ip`
--
ALTER TABLE `admin_ip`
  ADD PRIMARY KEY (`id_admin`);

--
-- テーブルのインデックス `locklist`
--
ALTER TABLE `locklist`
  ADD PRIMARY KEY (`id_lock`);

--
-- ダンプしたテーブルの AUTO_INCREMENT
--

--
-- テーブルの AUTO_INCREMENT `admin_ip`
--
ALTER TABLE `admin_ip`
  MODIFY `id_admin` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- テーブルの AUTO_INCREMENT `locklist`
--
ALTER TABLE `locklist`
  MODIFY `id_lock` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
