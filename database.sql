CREATE DATABASE IF NOT EXISTS lor_db;
USE lor_db;

DROP TABLE IF EXISTS lor_requests;
CREATE TABLE lor_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    program VARCHAR(50) NOT NULL,
    universities TEXT NOT NULL,
    deadline DATE NOT NULL,
    
    first_name VARCHAR(100) NOT NULL,
    middle_name VARCHAR(100),
    last_name VARCHAR(100) NOT NULL,
    contact_number VARCHAR(15) NOT NULL,
    gender VARCHAR(20) NOT NULL,
    
    role VARCHAR(50) NOT NULL,
    years_known INT NOT NULL,
    courses_taught TEXT,
    enrollment_batch VARCHAR(10) NOT NULL,
    program_enrolled VARCHAR(50) NOT NULL,
    passed_year VARCHAR(10) NOT NULL,
    
    final_percentage DECIMAL(5,2) NOT NULL,
    tentative_ranking VARCHAR(20) NOT NULL,
    final_year_project TEXT NOT NULL,
    other_research TEXT,
    publications TEXT,
    extracurricular TEXT,
    professional_experience TEXT,
    strong_points TEXT NOT NULL,
    weak_points TEXT NOT NULL,
    
    transcript_file LONGBLOB NOT NULL,
    transcript_filename VARCHAR(255) NOT NULL,
    cv_file LONGBLOB NOT NULL,
    cv_filename VARCHAR(255) NOT NULL,
    photo_file LONGBLOB NOT NULL,
    photo_filename VARCHAR(255) NOT NULL,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
SELECT * FROM lor_requests;