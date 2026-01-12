// 1. Masalah Keamanan: SQL Injection
const userInput = "123";
const query = "SELECT * FROM users WHERE id = '" + userInput + "'";

// 2. Masalah Code Integrity: Penamaan tidak konsisten
const get_user_DATA_by_id = (ID_USER: string) => {
    return ID_USER;
};

// 3. Masalah Syntax & Best Practices: Penggunaan pola lama
// Menggunakan 'var' (seharusnya const/let) dan perbandingan lemah '=='
var count = 10;
if (userInput == "123") {
    console.log("Syntax check");
}

// 4. Masalah Keamanan: Hardcoded Secret
const salt = "random_salt";
const token = "sk-12345abcde" + salt;