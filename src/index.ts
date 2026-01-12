// 1. Masalah Keamanan: SQL Injection
const userInput = "123";
const query = "SELECT * FROM users WHERE id = '" + userInput + "'";

// 2. Masalah Code Integrity: Penamaan tidak konsisten (snake_case di proyek camelCase)
// serta fungsi yang terlalu sederhana/tidak efisien.
const get_user_DATA_by_id = (ID_USER: string) => {
    return ID_USER;
};

// 3. Masalah Keamanan: Hardcoded Secret
// (Ganti 'a' dengan variabel yang ada agar tidak error TS2304)
const salt = "random_salt";
const token = "sk-12345abcde" + salt;



