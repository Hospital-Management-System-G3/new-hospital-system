// Import the database pool from config
const pool = require('../config/db');

// Function to create the 'chats' table
const createChatsTable = async () => {
  const query = `
      CREATE TABLE IF NOT EXISTS public.chats (
        chat_id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        doctor_id INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        doctor_name VARCHAR(255),
        doctor_picture VARCHAR(255),
        user_name VARCHAR(255),
        user_picture VARCHAR(255),
        last_message VARCHAR(255),
        time_last_message VARCHAR(255)
      );
  `;

  try {
    await pool.query(query);
    console.log('Chats table created or already exists');
  } catch (error) {
    console.error('Error creating chats table:', error);
  }
};

// Function to create the 'messages' table
const createMessagesTable = async () => {
  const query = `
      CREATE TABLE IF NOT EXISTS public.messages (
        message_id SERIAL PRIMARY KEY,
        chat_id INTEGER NOT NULL REFERENCES public.chats(chat_id) ON DELETE CASCADE,
        text TEXT NOT NULL,
        sender VARCHAR(255) NOT NULL,
        "time" TIME NOT NULL
      );
  `;

  try {
    await pool.query(query);
    console.log('Messages table created or already exists');
  } catch (error) {
    console.error('Error creating messages table:', error);
  }
};

// Function to create the 'health_records' table
const createHealthRecordsTable = async () => {
  const query = `
      CREATE TABLE IF NOT EXISTS health_records (
        record_id SERIAL PRIMARY KEY,
        patient_id INTEGER NOT NULL REFERENCES patient_records(record_id) ON DELETE CASCADE,
        date DATE NOT NULL,
        temperature DECIMAL(4, 2) NOT NULL,
        blood_pressure INTEGER NOT NULL,
        weight INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        is_deleted BOOLEAN DEFAULT false
      );
  `;

  try {
    await pool.query(query);
    console.log('Health records table created or already exists');
  } catch (error) {
    console.error('Error creating health records table:', error);
  }
};

// Function to insert sample data into chats
const insertChats = async () => {
  const query = `
    INSERT INTO public.chats (user_id, doctor_id, doctor_name, doctor_picture, user_name, user_picture, last_message, time_last_message)
    VALUES
    (1, 1, 'Dr. John Doe', 'doctor1.jpg', 'Mike Jones', 'user3.jpg', 'Hello, how can I help you?', '10:00 AM'),
    (2, 2, 'Dr. Jane Smith', 'doctor2.jpg', 'Anna Taylor', 'user4.jpg', 'Looking forward to your appointment!', '10:15 AM'),
    (3, 1, 'Dr. John Doe', 'doctor1.jpg', 'Sara Connor', 'user5.jpg', 'I need to reschedule.', '10:30 AM'),
    (4, 2, 'Dr. Jane Smith', 'doctor2.jpg', 'Bob Brown', 'user7.jpg', 'Is the appointment confirmed?', '10:45 AM')
    RETURNING *;
  `;

  try {
    const result = await pool.query(query);
    console.log('Sample chats inserted:', result.rows);
  } catch (error) {
    console.error('Error inserting chats:', error);
  }
};

// Function to insert sample data into messages
const insertMessages = async () => {
  const query = `
    INSERT INTO public.messages (chat_id, text, sender, "time")
    VALUES
    (1, 'Hi, I have a question about my treatment.', 'user', '10:00'),
    (1, 'Sure, feel free to ask!', 'doctor', '10:01'),
    (2, 'Can I get an appointment for next week?', 'user', '10:10'),
    (2, 'Yes, I have slots available.', 'doctor', '10:11'),
    (3, 'What time is my rescheduled appointment?', 'user', '10:20'),
    (3, 'Your appointment is at 2 PM.', 'doctor', '10:21'),
    (4, 'Please confirm if the doctor is available.', 'user', '10:30'),
    (4, 'The appointment is confirmed.', 'doctor', '10:31')
    RETURNING *;
  `;

  try {
    const result = await pool.query(query);
    console.log('Sample messages inserted:', result.rows);
  } catch (error) {
    console.error('Error inserting messages:', error);
  }
};

// Function to insert sample data into health_records
const insertHealthRecords = async () => {
  const query = `
    INSERT INTO health_records (patient_id, date, temperature, blood_pressure, weight)
    VALUES
    (1, '2024-09-01', 36.6, 120, 75),
    (2, '2024-09-02', 37.0, 130, 68),
    (3, '2024-09-03', 36.8, 125, 70),
    (4, '2024-09-04', 38.1, 135, 80)
    RETURNING *;
  `;

  try {
    const result = await pool.query(query);
    console.log('Sample health records inserted:', result.rows);
  } catch (error) {
    console.error('Error inserting health records:', error);
  }
};

// Function to run the table creation and data insertion
const init = async () => {
  await createChatsTable();
  await createMessagesTable();
  await createHealthRecordsTable();
  await insertChats();
  await insertMessages();
  await insertHealthRecords();
  process.exit(); // Exit the process once the data is inserted
};

// Run the initialization
init();
