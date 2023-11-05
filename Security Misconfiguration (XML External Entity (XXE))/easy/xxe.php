<?php
libxml_disable_entity_loader (false);
$userinput = file_get_contents('php://input');
$model = new DOMDocument();
$model->loadXML($userinput, LIBXML_NOENT | LIBXML_DTDLOAD);
$importedxml = simplexml_import_dom($model);
$firstname = $importedxml->firstname;
$phonenumber = $importedxml->phonenumber;
$emailadd = $importedxml->emailadd;

echo "That is weird, $emailadd is not valid. Please try again!";

?>
