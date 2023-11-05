<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>XXE 0x01</title>
    <link href="../XXE/assets/bootstrap.min.css" rel="stylesheet">
    <link href="../XXE/assets/custom.css" rel="stylesheet">
</head>

<body>
    <main>
        <div class="container px-4 py-5" id="custom-cards">
            <h2 class="pb-2 border-bottom">XXE-XML External Entities (Hard)</h2>

            <div class="p-5 mb-4 bg-light rounded-3">
                <h2>XML File Upload</h2>
                <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post"
                    enctype="multipart/form-data">
                    <div class="mb-3">
                        <label for="formFile" class="form-label">Upload an XML file with the structure:<br>
                            &lt;creds&gt; &lt;user&gt;username&lt;/user&gt; &lt;password&gt;password&lt;/password&gt;
                            &lt;/creds&gt;
                        </label>
                        <input class="form-control" type="file" id="formFile" name="uploaded_file">
                    </div>
                    <div class="mb-3">
                        <button class=" btn btn-outline-secondary" type="submit">Upload</button>
                    </div>
                </form>

                <div>
                    <?php
                    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                        if (isset($_FILES['uploaded_file'])) {
                            $errors = array();
                            $file_name = $_FILES['uploaded_file']['name'];
                            $file_size = $_FILES['uploaded_file']['size'];
                            $file_tmp = $_FILES['uploaded_file']['tmp_name'];
                            $file_type = $_FILES['uploaded_file']['type'];
                            $file_ext = strtolower(end(explode('.', $_FILES['uploaded_file']['name'])));

                            $extensions = array("xml");

                            if (in_array($file_ext, $extensions) === false) {
                                $errors[] = "Extension not allowed, please choose an XML file.";
                            }

                            if (empty($errors) == true) {
                                libxml_disable_entity_loader(false); // vulnerable setting
                                $xmlfile = file_get_contents($file_tmp);
                                $dom = new DOMDocument();
                                $dom->loadXML($xmlfile, LIBXML_NOENT | LIBXML_DTDLOAD);
                                $creds = simplexml_import_dom($dom);
                                $user = $creds->user;
                                $password = $creds->password;

                                echo "<h2>File uploaded and parsed successfully:</h2>";
                                echo "User: $user <br>";
                                echo "Password: $password";
                            } else {
                                print_r($errors);
                            }
                        }
                    }
                    ?>
                </div>

            </div>
        </div>
    </main>
    <!--/etc/flag looks interesting--> 
    <script src="../XXE/assets/popper.min.js"></script>
    <script src="../XXE/assets/bootstrap.min.js"></script>
</body>

</html>