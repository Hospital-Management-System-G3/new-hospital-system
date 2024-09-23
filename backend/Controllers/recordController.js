const pool = require("./../config/db");

exports.getRecord = async (req, res) => {
    console.log("inside record controller");
    try {
        const userId = req.user.id;
        const userRole = req.user.role;

        // console.log("----");
        // console.log(userId);
        // console.log(userRole);
        // console.log("----");

        const user = await pool.query("SELECT * FROM users WHERE user_id =$1", [userId]);
        const record = await pool.query("SELECT * FROM patient_records WHERE user_id =$1", [userId]);
        const bills = await pool.query("SELECT * FROM bookingbilling WHERE user_id =$1", [userId]);


        // Access the rows directly
        const userData = user.rows;
        const userRecord = record.rows;
        const userBills = bills.rows;


        // Log the rows to verify the output
        // console.log("User:", userData);
        // console.log("Record:", userRecord);
        // console.log("Bills:", userBills);
        // console.log("Health:", userHealthRecord);

        res.status(200).json({ userData, userRecord, userBills }); // Return the chats and messages
    } catch (err) {
        console.log("Server Error (chat controller):", err);
        res.status(500).json({ error: "Server Error (chat controller)" });
    }
};

