# Sharify
- It is a file sharing platform used to share files in a hassle free manner

# First Version
- Uses Multer to store the file in local system 

# Second Version (Under Dev.)
- Uses S3 bucket for file storage instead of local storage
- Uploads are done to files(docx|pdf|codes|....), images(png|jpg|....), or miscallenous folder
- Refactored the codebase to handle the whole process in a modular fashion.
- Migrated the code to associtae every file with a id and thus downloading is done by refering to the id ( previous was filename)
- Currently trying to compress the file before saving so as to save space
