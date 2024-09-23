const pool = require('../config/db'); // Database connection

// Function to fetch doctors and nurses
const getDoctorsAndNurses = async (req, res) => {
  const { role } = req.query; // نأخذ role من الـ query parameters

  // بناء الاستعلام الأساسي
  let query = `
    SELECT username, profilepic 
    FROM users
    WHERE role IN ('doctor', 'nurse') AND is_deleted = false
  `;

  // إضافة شرط الفلترة إذا كان هناك دور محدد
  if (role && role !== 'all') {
    query += ` AND role = $1`;
  }

  try {
    // تنفيذ الاستعلام مع أو بدون متغير الدور
    const { rows } = await pool.query(query, role && role !== 'all' ? [role] : []);
    res.status(200).json(rows); // إرسال النتيجة كرد JSON
  } catch (error) {
    console.error('Error fetching doctors and nurses:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getDoctorsAndNurses };
