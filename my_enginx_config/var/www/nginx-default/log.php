<?
header("Content-Type: text/plain");
echo `tail -n 200 /var/log/nodejs.log`; // dont read too mucth
?>