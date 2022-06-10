drop database if exists from_now;/*今あるデータベースを削除します*/
create database from_now default character set utf8 collate utf8_general_ci;
grant all on from_now.* to 'staff'@'localhost' identified by 'password';
use from_now;


CREATE TABLE `admin_ip` (
  `id_admin` int(30) NOT NULL,
  `ip_address` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `admin_ip` (`id_admin`, `ip_address`) VALUES
(1, '::1');



-- --------------------------------------------------------

--
-- テーブルの構造 `locklist`
--

CREATE TABLE `locklist` (
  `id_lock` int(30) NOT NULL,
  `page` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
  MODIFY `id_lock` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;
