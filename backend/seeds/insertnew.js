// Import the database pool from config
const pool = require('../config/db');

// Function to insert sample data into all tables
const insertSampleData = async () => {
  try {
    // Insert sample users (doctors, patients, nurses, admin)
    const userInsertQuery = `
      INSERT INTO users (username, password, email, role, profilepic, is_deleted)
      VALUES
        ('admin1', '$2b$10$nOGSMN5xFs7IQtazYbylaeOjndYuhwx0UPHFixVOafI7SwUYEzDGC', 'admin1@example.com', 'admin', 'uploads/admin1_pic.jpg', false),
        ('doctor1', '$2b$10$nOGSMN5xFs7IQtazYbylaeOjndYuhwx0UPHFixVOafI7SwUYEzDGC', 'doctor1@example.com', 'doctor', 'uploads/doctor1_pic.jpg', false),
        ('doctor2', '$2b$10$nOGSMN5xFs7IQtazYbylaeOjndYuhwx0UPHFixVOafI7SwUYEzDGC', 'doctor2@example.com', 'doctor', 'uploads/doctor2_pic.jpg', false),
        ('patient1', '$2b$10$nOGSMN5xFs7IQtazYbylaeOjndYuhwx0UPHFixVOafI7SwUYEzDGC', 'patient1@example.com', 'user', 'uploads/patient1_pic.jpg', false),
        ('patient2', '$2b$10$nOGSMN5xFs7IQtazYbylaeOjndYuhwx0UPHFixVOafI7SwUYEzDGC', 'patient2@example.com', 'user', 'uploads/patient2_pic.jpg', false),
        ('nurse1', '$2b$10$nOGSMN5xFs7IQtazYbylaeOjndYuhwx0UPHFixVOafI7SwUYEzDGC', 'nurse1@example.com', 'nurse', 'uploads/nurse1_pic.jpg', false),
        ('nurse2', '$2b$10$nOGSMN5xFs7IQtazYbylaeOjndYuhwx0UPHFixVOafI7SwUYEzDGC', 'nurse2@example.com', 'nurse', 'uploads/nurse2_pic.jpg', false);
    `;
    
    // Insert sample patient records
    const patientRecordsInsertQuery = `
      INSERT INTO patient_records (user_id, medical_history, date_of_birth, phone, treatment_plan, date, notes, gender, height, weight, blood_type, allergies, temperature, blood_pressure)
      VALUES
        (4, 'Diabetes', '1985-05-21', '555-1234', 'Insulin therapy', '{2023-06-01}', 'Monitor sugar levels', 'male', 180, '{75}', 'O+', 'None', '{36.6}', '{120}'),
        (5, 'Hypertension', '1990-07-15', '555-5678', 'Medication for blood pressure', '{2023-06-05}', 'Regular blood pressure checks', 'female', 165, '{65}', 'A+', 'None', '{37.0}', '{130}');
    `;

    // Insert sample health records
    const healthRecordsInsertQuery = `
      INSERT INTO health_records (patient_id, date, temperature, blood_pressure, weight)
      VALUES
        (1, '2023-06-01', 36.6, 120, 75),
        (2, '2023-06-05', 37.0, 130, 65);
    `;

    // Insert sample feedback
    const feedbackInsertQuery = `
      INSERT INTO feedback (user_id, doctor_id, feedback_message)
      VALUES
        (4, 2, 'Great service from Dr. Smith.'),
        (5, 3, 'Very helpful and professional.');
    `;

    // Insert sample doctor availabilities
    const doctorAvailabilitiesInsertQuery = `
      INSERT INTO doctor_availabilities (doctor_id, available_date, available_time_from, available_time_to, status, is_booked, total_price, service_type)
      VALUES
        (2, '2023-06-10', '09:00', '12:00', 'active', false, 100.00, 'General Checkup'),
        (3, '2023-06-11', '13:00', '16:00', 'active', false, 150.00, 'Special Consultation');
    `;

    // Insert sample messages
    const messagesInsertQuery = `
      INSERT INTO messages (chat_id, text, sender, "time")
      VALUES
        (1, 'Hello doctor, I need help.', 'patient1', '12:30'),
        (1, 'Sure, let me assist you.', 'doctor1', '12:31');
    `;

    // Insert sample chats
    const chatsInsertQuery = `
      INSERT INTO chats (user_id, doctor_id, doctor_name, doctor_picture, user_name, user_picture, last_message, time_last_message)
      VALUES
        (4, 2, 'Dr. Smith', 'uploads/doctor1_pic.jpg', 'Patient 1', 'uploads/patient1_pic.jpg', 'Hello doctor, I need help.', '12:30');
    `;

    // Insert sample contacts
    const contactsInsertQuery = `
      INSERT INTO contacts (name, email, contact_message)
      VALUES
        ('John Doe', 'johndoe@example.com', 'Looking for more information about the services.'),
        ('Jane Smith', 'janesmith@example.com', 'How to book an appointment with Dr. Smith?');
    `;

    // Insert sample booking billing
    const bookingBillingInsertQuery = `
      INSERT INTO BookingBilling (booking_id, user_id, doctor_id, total_price, doctor_profit, hospital_profit)
      VALUES
        (1, 4, 2, 100.00, 70.00, 30.00),
        (2, 5, 3, 150.00, 100.00, 50.00);
    `;

    // Insert sample reports
    const reportInsertQuery = `
      INSERT INTO report (user_id, feedback_id, report_messege, is_deleted)
      VALUES
        (4, 1, 'Patient complaint about delay.', false),
        (5, 2, 'Patient reported incorrect diagnosis.', false);
    `;

    // Execute the queries in order
    // await pool.query(userInsertQuery);
    await pool.query(patientRecordsInsertQuery);
    await pool.query(healthRecordsInsertQuery);
    await pool.query(feedbackInsertQuery);
    await pool.query(doctorAvailabilitiesInsertQuery);
    await pool.query(chatsInsertQuery);
    await pool.query(messagesInsertQuery);
    await pool.query(contactsInsertQuery);
    await pool.query(bookingBillingInsertQuery);
    await pool.query(reportInsertQuery);

    console.log('Sample data inserted successfully into all tables');
  } catch (error) {
    console.error('Error inserting sample data:', error);
  } finally {
    process.exit();
  }
};

// Initialize the data insertion process
insertSampleData();
