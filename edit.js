const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');

// Replace ASP.NET form open with normal div
html = html.replace(/<form name="aspnetForm"[\s\S]*?id="aspnetForm" style="height:100%">/, '<div id="main-container" style="height:100%">');

// Replace </form> with </div>
html = html.replace(/<\/form>/, '</div>');

// Replace captcha table with our custom form
const formHtml = `
<form id="resultForm" onsubmit="submitForm(event)">
    <table style="width:100%;border:double;border-color:skyblue; cellpadding:5;height:250px">
        <tr>
            <td colspan="3" class="auto-style8"><span id="errorMsg" style="color:Red;font-weight:bold;"></span></td>
        </tr>
        <tr>
            <td class="arial_13_b333" height="28" align="center">
                <div style="margin-bottom: 15px;">
                    <span class="arial_15_ba92519">* </span><b>Select Semester:</b><br/>
                    <select id="semester" required style="width:200px; padding: 5px;">
                        <option value="December,2025">December, 2025</option>
                        <option value="May,2025">May, 2025</option>
                    </select>
                </div>
                <div style="margin-bottom: 15px;">
                    <span class="arial_15_ba92519">* </span><b>Enter Roll Number:</b><br/>
                    <input type="text" id="roll_number" required style="width:200px; padding: 5px;">
                </div>
                <div style="margin-bottom: 15px;">
                    <span class="arial_15_ba92519">* </span><b>Enter Captcha:</b><br/>
                    <div style="background-color:#d3edef; display:inline-block;" id="captchaContainer">
                        <!-- Captcha image will go here -->
                    </div>
                    <button type="button" onclick="loadCaptcha()" style="margin-left: 10px; cursor: pointer;">↻ Refresh</button>
                    <br/>
                    <input type="text" id="captcha" maxlength="10" required style="width:200px; padding: 5px; margin-top: 5px;">
                </div>
                <button type="submit" id="btnSubmit" style="font-weight: 700; padding: 5px 15px; cursor:pointer;">Show Result</button>
            </td>
        </tr>
    </table>
</form>

<div id="resultDisplay" style="display:none; margin-top:20px; padding:15px; border:1px solid #ccc; background:#f9f9f9; border-radius:8px;">
    <h3 style="margin-top:0">Result Details</h3>
    <p><b>Name:</b> <span id="resName"></span></p>
    <p><b>Roll Number:</b> <span id="resRoll"></span></p>
    <p><b>Semester:</b> <span id="resSem"></span></p>
    <p><b>Marks:</b> <span id="resMarks"></span></p>
    <p><b>Status:</b> <span id="resStatus"></span></p>
    <button onclick="document.getElementById('resultDisplay').style.display='none'; document.getElementById('resultForm').style.display='block';" style="margin-top:10px;">Back</button>
</div>

<script>
function loadCaptcha() {
    fetch('/api/captcha')
        .then(res => res.text())
        .then(svg => {
            document.getElementById('captchaContainer').innerHTML = svg;
        });
}

function submitForm(e) {
    e.preventDefault();
    const roll_number = document.getElementById('roll_number').value;
    const captcha = document.getElementById('captcha').value;
    const semester = document.getElementById('semester').value;
    
    document.getElementById('errorMsg').innerText = '';
    
    fetch('/api/result', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roll_number, captcha, semester })
    })
    .then(res => res.json())
    .then(data => {
        if (!data.success) {
            document.getElementById('errorMsg').innerText = data.message;
            loadCaptcha();
            document.getElementById('captcha').value = '';
        } else {
            document.getElementById('resultForm').style.display = 'none';
            document.getElementById('resultDisplay').style.display = 'block';
            document.getElementById('resName').innerText = data.data.student_name;
            document.getElementById('resRoll').innerText = data.data.roll_number;
            document.getElementById('resSem').innerText = data.data.semester;
            document.getElementById('resMarks').innerText = data.data.marks;
            document.getElementById('resStatus').innerText = data.data.status;
        }
    })
    .catch(err => {
        document.getElementById('errorMsg').innerText = 'An error occurred';
    });
}

// Load captcha on page load
window.onload = loadCaptcha;
</script>
`;

html = html.replace(/<table id="ctl00_cph1_tblCaptcha"[\s\S]*?<\/table>/, formHtml);

fs.writeFileSync('public/index.html', html);
console.log('Modified index.html');
