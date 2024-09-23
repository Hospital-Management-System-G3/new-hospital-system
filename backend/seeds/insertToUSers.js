// Import the database pool from config
const pool = require('../config/db');

// Function to insert sample users (doctor, user, nurse, admin)
const insertSampleData = async () => {
  const query = `
    INSERT INTO users (username, password, email, role, profilepic, is_deleted)
    VALUES
    -- Insert 10 patients
    ('patient1', 'password123', 'patient1@example.com', 'patient', 'uploads/patient1_pic.jpg', false),
    ('patient2', 'password123', 'patient2@example.com', 'patient', 'uploads/patient2_pic.jpg', false),
    ('patient3', 'password123', 'patient3@example.com', 'patient', 'uploads/patient3_pic.jpg', false),
    ('patient4', 'password123', 'patient4@example.com', 'patient', 'uploads/patient4_pic.jpg', false),
    ('patient5', 'password123', 'patient5@example.com', 'patient', 'uploads/patient5_pic.jpg', false),
    ('patient6', 'password123', 'patient6@example.com', 'patient', 'uploads/patient6_pic.jpg', false),
    ('patient7', 'password123', 'patient7@example.com', 'patient', 'uploads/patient7_pic.jpg', false),
    ('patient8', 'password123', 'patient8@example.com', 'patient', 'uploads/patient8_pic.jpg', false),
    ('patient9', 'password123', 'patient9@example.com', 'patient', 'uploads/patient9_pic.jpg', false),
    ('patient10', 'password123', 'patient10@example.com', 'patient', 'uploads/patient10_pic.jpg', false),

    -- Insert 10 doctors
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


 Insert 10 nurses
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

    -- Insert 2 admins
    ('admin1', 'password123', 'admin1@example.com', 'admin', 'uploads/admin1_pic.jpg', false),
    ('admin2', 'password123', 'admin2@example.com', 'admin', 'uploads/admin2_pic.jpg', false)
    RETURNING *;
  `;

  try {
    // Execute the query to insert sample data
    const result = await pool.query(query);
    console.log('Sample users inserted:', result.rows);
  } catch (error) {
    console.error('Error inserting sample users:', error);
  }
};

// Function to run the table creation and data insertion
const init = async () => {
  await insertSampleData();
  process.exit(); // Exit the process once the data is inserted
};

// Run the initialization
init();
