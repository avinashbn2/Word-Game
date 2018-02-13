<?php
//php code to write the data posted to the test.txt file
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$score = $request->score;
$name = $request->name;

file_put_contents('test.txt', file_get_contents('php://input'));

?>
