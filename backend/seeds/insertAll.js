// Import the database pool from config
const pool = require('../config/db');

// Function to insert sample data into users
const insertUsers = async () => {
  const query = `
    INSERT INTO users (username, password, email, role, profilepic)
    VALUES
    ('john_doe', 'password123', 'john@example.com', 'doctor', 'profile1.jpg'),  
    ('jane_smith', 'password123', 'jane@example.com', 'doctor', 'profile2.jpg'),
    ('mike_jones', 'password123', 'mike@example.com', 'user', 'profile3.jpg'),  
    ('anna_taylor', 'password123', 'anna@example.com', 'user', 'profile4.jpg'), 
    ('sara_connor', 'password123', 'sara@example.com', 'user', 'profile5.jpg'), 
    ('bob_brown', 'password123', 'bob@example.com', 'doctor', 'profile6.jpg'),  
    ('linda_white', 'password123', 'linda@example.com', 'user', 'profile7.jpg'),
    ('tom_hanks', 'password123', 'tom@example.com', 'doctor', 'profile8.jpg') ,
('Dr. John Smith', 'password123', 'john.smith@example.com', 'doctor', 'https://images.unsplash.com/photo-1506794778162-4c1e97d7a32c', false),
('Dr. Emily Johnson', 'password123', 'emily.johnson@example.com', 'doctor', 'https://images.unsplash.com/photo-1560302242-6d73578f5dbf', false),
('Dr. Michael Brown', 'password123', 'michael.brown@example.com', 'doctor', 'https://images.unsplash.com/photo-1580486761846-f91ef7d1441c', false),
('Dr. Sarah Davis', 'password123', 'sarah.davis@example.com', 'doctor', 'https://images.unsplash.com/photo-1517423218799-4d257e83f5c7', false),
('Dr. David Wilson', 'password123', 'david.wilson@example.com', 'doctor', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2', false),
('Dr. Jennifer Garcia', 'password123', 'jennifer.garcia@example.com', 'doctor', 'https://images.unsplash.com/photo-1579102803938-62b548b1429d', false),
('Dr. William Martinez', 'password123', 'william.martinez@example.com', 'doctor', 'https://images.unsplash.com/photo-1596495571994-0842f72f1f1a', false),
('Dr. Jessica Rodriguez', 'password123', 'jessica.rodriguez@example.com', 'doctor', 'https://images.unsplash.com/photo-1564541200-fcaec7d1cbe1', false),
('Dr. Charles Lee', 'password123', 'charles.lee@example.com', 'doctor', 'https://images.unsplash.com/photo-1504769624777-1c4f2b23e43d', false),
('Dr. Linda Gonzalez', 'password123', 'linda.gonzalez@example.com', 'doctor', 'https://images.unsplash.com/photo-1532062207466-15bdb430b3ff', false),


('Nurse Anna Thompson', 'password123', 'anna.thompson@example.com', 'nurse', 'https://images.unsplash.com/photo-1502767089024-e9pM8TEjV4A', false),
('Nurse Brian White', 'password123', 'brian.white@example.com', 'nurse', 'https://images.unsplash.com/photo-1582719472674-08f36a4e1f9f', false),
('Nurse Lisa Green', 'password123', 'lisa.green@example.com', 'nurse', 'https://images.unsplash.com/photo-1571894510650-49a5f4c3d60d', false),
('Nurse Mark Adams', 'password123', 'mark.adams@example.com', 'nurse', 'https://images.unsplash.com/photo-1596495416067-b330e1c97890', false),
('Nurse Susan Hall', 'password123', 'susan.hall@example.com', 'nurse', 'https://images.unsplash.com/photo-1607013058835-046c4405d1c4', false),
('Nurse Daniel Young', 'password123', 'daniel.young@example.com', 'nurse', 'https://images.unsplash.com/photo-1581232500137-e3eacb6e4e53', false),
('Nurse Emily King', 'password123', 'emily.king@example.com', 'nurse', 'https://images.unsplash.com/photo-1607013054206-8c9b8e2aedd2', false),
('Nurse Jason Wright', 'password123', 'jason.wright@example.com', 'nurse', 'https://images.unsplash.com/photo-1570973031998-01a2b4f643c0', false),
('Nurse Karen Scott', 'password123', 'karen.scott@example.com', 'nurse', 'https://images.unsplash.com/photo-1596495375435-31f2f7e8c6b8', false),
('Nurse Robert Lee', 'password123', 'robert.lee@example.com', 'nurse', 'https://images.unsplash.com/photo-1573031810348-1c45ef942b3b', false),
  
    RETURNING *;
  `;

  try {
    const result = await pool.query(query);
    console.log('Sample users inserted:', result.rows);
  } catch (error) {
    console.error('Error inserting users:', error);
  }
};

// Function to insert sample data into patient_records
const insertPatientRecords = async () => {
  const query = `
    INSERT INTO patient_records (user_id, medical_history, date_of_birth, phone, treatment_plan, notes, gender, height, weight, blood_type, allergies)
    VALUES
    (3, 'No known allergies', '1990-05-15', '123-456-7890', 'Regular checkup', 'All good', 'male', 180, 75, 'O+', 'None'),
    (4, 'Asthma', '1985-08-25', '098-765-4321', 'Follow-up on asthma treatment', 'Needs regular medication', 'female', 165, 60, 'A-', 'Pollen'),
    (5, 'Diabetes', '1975-02-10', '555-123-4567', 'Diet control', 'Monitor blood sugar', 'female', 170, 65, 'B+', 'None'),
    (6, 'Hypertension', '1988-03-20', '666-234-5678', 'Medication required', 'Regular checkups', 'male', 175, 80, 'AB+', 'None'),
    (7, 'Recent surgery', '1992-11-30', '777-345-6789', 'Post-op care', 'Rehabilitation required', 'female', 160, 55, 'O-', 'Penicillin')
    RETURNING *;
  `;

  try {
    const result = await pool.query(query);
    console.log('Sample patient records inserted:', result.rows);
  } catch (error) {
    console.error('Error inserting patient records:', error);
  }
};

// Function to insert sample data into doctor_availabilities
const insertDoctorAvailabilities = async () => {
  const query = `
    INSERT INTO doctor_availabilities (doctor_id, available_date, available_time_from, available_time_to, total_price, service_type)
    VALUES
    (1, '2024-10-01', '09:00:00', '12:00:00', 100.00, 'Consultation'),       -- Doctor 1
    (2, '2024-10-02', '10:00:00', '14:00:00', 120.00, 'Chemotherapy'),        -- Doctor 2
    (1, '2024-10-03', '13:00:00', '17:00:00', 150.00, 'Follow-Up Appointment'), -- Doctor 1
    (2, '2024-10-04', '08:00:00', '11:00:00', 90.00, 'Surgery'),              -- Doctor 2
    (6, '2024-10-05', '11:00:00', '15:00:00', 110.00, 'Radiation Therapy'),   -- Doctor 6
    (8, '2024-10-06', '14:00:00', '17:00:00', 200.00, 'Consultation'),        -- Doctor 8
    (1, '2024-10-07', '09:00:00', '12:00:00', 130.00, 'Routine Checkup'),    -- Doctor 1
    (2, '2024-10-08', '08:00:00', '10:00:00', 80.00, 'Vaccination'),          -- Doctor 2
    (6, '2024-10-09', '10:00:00', '12:00:00', 95.00, 'Therapy Session'),      -- Doctor 6
    (8, '2024-10-10', '15:00:00', '18:00:00', 175.00, 'Specialist Consultation'), -- Doctor 8
        (11, '2024-10-01', '09:00:00', '12:00:00', 100.00, 'Consultation'), -- Doctor 1 available on 1st October from 9 AM to 12 PM
    (12, '2024-10-02', '10:00:00', '14:00:00', 120.00, 'Chemotherapy'), -- Doctor 2 available on 2nd October from 10 AM to 2 PM
    (11, '2024-10-03', '13:00:00', '17:00:00', 150.00, 'Follow-Up Appointment'), -- Doctor 1 available on 3rd October from 1 PM to 5 PM
    (13, '2024-10-04', '08:00:00', '11:00:00', 90.00, 'Surgery'),  -- Doctor 3 available on 4th October from 8 AM to 11 AM
    (12, '2024-10-06', '16:00:00', '17:30:00', 150.00, 'Surgery '),  -- Doctor 2 available on 5th October from 11 AM to 3 PM
    (12, '2024-10-05', '11:00:00', '15:00:00', 110.00, 'Radiation Therapy')  -- Doctor 2 available on 5th October from 11 AM to 3 PM
    RETURNING *;
  `;

  try {
    const result = await pool.query(query);
    console.log('Sample doctor availabilities inserted:', result.rows);
  } catch (error) {
    console.error('Error inserting doctor availabilities:', error);
  }
};

// Function to insert sample data into BookingBilling
const insertBookingBilling = async () => {
  const query = `
    INSERT INTO BookingBilling (booking_id, user_id, doctor_id, total_price, doctor_profit, hospital_profit)
    VALUES
    (1, 3, 1, 100.00, 70.00, 30.00),  
    (2, 4, 2, 120.00, 80.00, 40.00),   
    (3, 5, 1, 150.00, 100.00, 50.00),  
    (4, 6, 6, 200.00, 140.00, 60.00),  
    (5, 7, 8, 175.00, 130.00, 45.00)   
    RETURNING *;
  `;

  try {
    const result = await pool.query(query);
    console.log('Sample booking billing records inserted:', result.rows);
  } catch (error) {
    console.error('Error inserting booking billing records:', error);
  }
};

// Function to run the table creation and data insertion
const init = async () => {
  await insertUsers();
  await insertPatientRecords();
  await insertDoctorAvailabilities();
  await insertBookingBilling();
  process.exit(); // Exit the process once the data is inserted
};

// Run the initialization
init();
