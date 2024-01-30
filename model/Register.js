import conn from "../config/dataBaseConn.js";



const createRegistrationTable = () => {
    const createTable = `
      CREATE TABLE IF NOT EXISTS registration (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        phone_number VARCHAR(20),
        address VARCHAR(255) NOT NULL,
        dateOfBirth DATE
      );
    `;
    try{
      conn.query(createTable)
     }catch (error) {
       console.log(error)
     }
}

export default createRegistrationTable;
