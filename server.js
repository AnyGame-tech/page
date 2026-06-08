const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const session = require('express-session');
const svgCaptcha = require('svg-captcha');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Setup Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'super_secret_key_pu_result',
    resave: false,
    saveUninitialized: true
}));

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve result page under ASP.NET WebForms path
app.get('/frmShowResultDetail.aspx', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'result.html'));
});

// Serve detailed marks card under ASP.NET WebForms path
app.get('/frmShowDetailedMarksCard.aspx', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'detailed.html'));
});

// Setup Database
const db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) {
        console.error('Error opening database', err);
    } else {
        db.run(`CREATE TABLE IF NOT EXISTS results (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            roll_number TEXT UNIQUE,
            student_name TEXT,
            semester TEXT,
            marks TEXT,
            status TEXT,
            regd_no TEXT,
            father_name TEXT,
            mother_name TEXT,
            subjects TEXT,
            declaration_date TEXT
        )`);
    }
});

// Captcha Endpoint
app.get('/api/captcha', (req, res) => {
    const captcha = svgCaptcha.create({
        size: 5,
        ignoreChars: '0o1i',
        noise: 2,
        color: true,
        background: '#d3edef'
    });
    req.session.captcha = captcha.text;
    res.type('svg');
    res.status(200).send(captcha.data);
});

// Verify Captcha Only
app.post('/api/verify-captcha', (req, res) => {
    const { captcha } = req.body;
    if (!req.session.captcha || !captcha || req.session.captcha.toLowerCase() !== captcha.toLowerCase()) {
        return res.status(400).json({ success: false, message: 'Invalid captcha' });
    }
    req.session.captchaVerified = true;
    res.json({ success: true });
});

// Verify Captcha and Get Result
app.post('/api/result', (req, res) => {
    const { roll_number, captcha, semester } = req.body;
    
    if (!req.session.captchaVerified) {
        if (!req.session.captcha || !captcha || req.session.captcha.toLowerCase() !== captcha.toLowerCase()) {
            return res.status(400).json({ success: false, message: 'Invalid captcha' });
        }
    }

    let query = 'SELECT * FROM results WHERE roll_number = ?';
    let params = [roll_number];
    
    if (semester) {
        query = 'SELECT * FROM results WHERE roll_number = ? AND semester = ?';
        params = [roll_number, semester];
    }

    db.get(query, params, (err, row) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Database error' });
        }
        if (!row) {
            return res.status(404).json({ success: false, message: 'Result not found for this Roll Number and Semester' });
        }
        res.json({ success: true, data: row });
    });
});

// Admin API to add result
app.post('/api/admin/add', (req, res) => {
    const { id, roll_number, student_name, semester, marks, status, regd_no, father_name, mother_name, subjects, declaration_date } = req.body;
    
    if (id) {
        // Update existing record by ID
        db.run(`UPDATE results SET roll_number = ?, student_name = ?, semester = ?, marks = ?, status = ?, regd_no = ?, father_name = ?, mother_name = ?, subjects = ?, declaration_date = ? WHERE id = ?`,
            [roll_number, student_name, semester, marks, status, regd_no, father_name, mother_name, subjects, declaration_date, id],
            function(err) {
                if (err) {
                    return res.status(500).json({ success: false, message: err.message });
                }
                res.json({ success: true, message: 'Result updated successfully!' });
            }
        );
    } else {
        // Insert new record
        db.run(`INSERT OR REPLACE INTO results (roll_number, student_name, semester, marks, status, regd_no, father_name, mother_name, subjects, declaration_date) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
            [roll_number, student_name, semester, marks, status, regd_no, father_name, mother_name, subjects, declaration_date], 
            function(err) {
                if (err) {
                    return res.status(500).json({ success: false, message: err.message });
                }
                res.json({ success: true, message: 'Result added successfully!', id: this.lastID });
            }
        );
    }
});

// Admin API to get all results
app.get('/api/admin/results', (req, res) => {
    db.all('SELECT * FROM results', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ success: false, message: err.message });
        }
        res.json({ success: true, data: rows });
    });
});

// Admin API to delete result
app.delete('/api/admin/delete/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM results WHERE id = ?', [id], function(err) {
        if (err) {
            return res.status(500).json({ success: false, message: err.message });
        }
        res.json({ success: true, message: 'Result deleted successfully!' });
    });
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
