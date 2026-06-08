const fs = require('fs');

const originalHtml = `<!DOCTYPE html>
<!-- saved from url=(0104)https://results.puexam.in/ShowResultSemester.aspx?CL=PVbgPNRPB68%3D&SS=qRwW+GGKc3U%3D&Sem=0Zd0+cF3s5g%3D -->
<html xmlns="http://www.w3.org/1999/xhtml"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><title>
	Panjab University Result
</title>    
    <style type="text/css">
        .auto-style7 {
            width: 154px;
        }
        .auto-style8 {
            height: 19px;
        }
    </style>
    <link href="/images/style.css" rel="stylesheet" type="text/css"><meta name="robots" content="noindex">
    <script type="text/javascript">
        function blink() {
            var blinks = document.getElementsByTagName('blink');
            for (var i = blinks.length - 1; i >= 0; i--) {
                var s = blinks[i];
                s.style.visibility = (s.style.visibility === 'visible') ? 'hidden' : 'visible';
            }
            window.setTimeout(blink, 200);
        }
        if (document.addEventListener) document.addEventListener("DOMContentLoaded", blink, false);
        else if (window.addEventListener) window.addEventListener("load", blink, false);
        else if (window.attachEvent) window.attachEvent("onload", blink);
        else window.onload = blink;
</script>

</head>
<body>
    <form id="aspnetForm" style="height:100%" onsubmit="submitForm(event)">
<div>
</div>

<div>
</div>
    
        <div id="header">
            <div class="logo">
                 <img src="/images/logo7.jpg" alt="" style="border-radius: 50px">
            </div>
    <div id="topmenu"> <h1 style="color:white;">Panjab University,Chandigarh</h1>
        <h2 style="color:white">Examination Results</h2>
  <ul>
      <li><a href="#">Home</a></li>
    <li> <a id="ctl00_LinkButton_Entrance" href="#">Entrance Results</a></li>
      <li><a href="#">Environment Result</a></li>
    <li><a href="#">Contact Us</a></li>
  </ul>
        </div>
         
</div>
        <div style="clear:both;"></div>
        <div id="ctl00_div_menu" class="menu">
            <fieldset>
                                <legend>Semester Results</legend>
                                <ul>
                                     <li>
                                        <a href="#" class="MainLink">April/May,2026</a>
                                                </li><br>
                                     <li>
                                        <a href="#" class="MainLink">December,2025</a>
                                                </li><br>
                                     <li>
                                        <a href="#" class="MainLink">May,2025</a>
                                                </li><br>
                                </ul>
                            </fieldset>
          <fieldset>
                                <legend>Annual Results</legend>
                                <ul>
                                    <li>
                                        <a href="#" class="MainLink">October,2016</a>
                                    </li>
                                </ul>
                            </fieldset>
                           
         <fieldset>                                <legend>Login</legend>
                                <ul>
                                    <li>
                                        <a href="admin.html" class="MainLink">College Admin</a>
                                                </li><br>
                                                
                                    <li>
                                        <a href="admin.html" class="MainLink">Web Admin</a>
                                    </li>
                                </ul>
                               
                            </fieldset>
                            <fieldset>
                                <legend>Others</legend>
                                <ul>
                                    <li><a href="#" class="MainLink">Notifications</a></li><br>
                                </ul>
                            </fieldset>
            
        
 
    </div> 
          
         <div style="float:right;width:85%">
                            
    
  <div style="width:70%;   
    margin-left:10px;    
    margin-top:10px ">
        <div style=" background-image:url('/images/images/bg.jpg'); border-radius:10px 10px 0px 0px;background-repeat:repeat-x;padding:10px;
    font-size:medium;height:20px;color:white;
    font-weight:bold;">Semester Results
        </div>
    
   
     <div style="width:100%; margin:auto" id="mainContentArea">
         
           <table id="ctl00_cph1_tblCaptcha" style="width:100%;border:double;border-color:skyblue; cellpadding:5;height:200px">
	<tbody><tr>
		<td colspan="3" class="auto-style8"><span id="ctl00_cph1_lblCaptcha" color="" style="color:Red;font-weight:bold;"></span></td>
	</tr>
	<tr>
		<td class="arial_13_b333" height="28" align="center"><span class="arial_15_ba92519">* </span>
                            <b>Enter Text below:</b>
                        
                       
                            <div style="background-color:#d3edef;" id="captchaContainer">
                                <img src="/api/captcha" border="0" width="200" height="60" id="captchaImg">
                            </div>
                            <input name="captcha" type="text" maxlength="10" id="ctl00_cph1_txtCapcha" style="width:200px;" required>
                            <span id="ctl00_cph1_reqCapcha" style="color:Red;display:none;"></span>
                            <br><br>
                            <input type="submit" name="btnCaptcha" value="Verify you are not a Robot" id="ctl00_cph1_btnCaptcha" style="font-weight: 700">
                        </td>
	</tr>
</tbody></table>
  
   
    
                     
                 
        </div>
    </div>

             </div>

</form>
   
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
    
    // Check if we are in captcha step or roll number step
    const rollInput = document.getElementById('roll_number');
    
    if (!rollInput) {
        // Step 1: Verify Captcha
        const captcha = document.getElementById('ctl00_cph1_txtCapcha').value;
        fetch('/api/result', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ roll_number: 'verify_captcha_only', captcha })
        })
        .then(res => res.json())
        .then(data => {
            if (!data.success && data.message === 'Invalid captcha') {
                document.getElementById('ctl00_cph1_lblCaptcha').innerText = data.message;
                loadCaptcha();
                document.getElementById('ctl00_cph1_txtCapcha').value = '';
            } else {
                // Captcha successful, replace table content with Roll number input
                document.getElementById('mainContentArea').innerHTML = \`
                   <table style="width:100%;border:double;border-color:skyblue; cellpadding:5;height:100px">
                       <tr><td colspan="3"><span id="ctl00_cph1_lblCaptcha" style="color:Red;font-weight:bold;"></span></td></tr>
                       <tr>
                           <td class="arial_13_b333" height="28" align="center">
                               <span class="arial_15_ba92519">* </span><b>Enter Roll Number:</b>
                               <input type="text" id="roll_number" required style="width:200px;">
                               <input type="hidden" id="verified_captcha" value="\${captcha}">
                               <input type="submit" value="Show Result" style="font-weight: 700">
                           </td>
                       </tr>
                   </table>
                \`;
            }
        });
    } else {
        // Step 2: Fetch Result
        const roll_number = rollInput.value;
        const captcha = document.getElementById('verified_captcha').value;
        fetch('/api/result', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ roll_number, captcha })
        })
        .then(res => res.json())
        .then(data => {
            if (!data.success) {
                document.getElementById('ctl00_cph1_lblCaptcha').innerText = data.message;
            } else {
                document.getElementById('mainContentArea').innerHTML = \`
                    <table style="width:100%;border:double;border-color:skyblue; cellpadding:5;">
                       <tr><td style="padding:10px;">
                           <h3 style="margin-top:0">Result for \${data.data.roll_number}</h3>
                           <p><b>Name:</b> \${data.data.student_name}</p>
                           <p><b>Semester:</b> \${data.data.semester}</p>
                           <p><b>Marks:</b> \${data.data.marks}</p>
                           <p><b>Status:</b> \${data.data.status}</p>
                           <br>
                           <button onclick="location.reload()" style="font-weight:bold;">Back</button>
                       </td></tr>
                    </table>
                \`;
            }
        });
    }
}

window.onload = loadCaptcha;
</script>

</body></html>`;

fs.writeFileSync('public/index.html', originalHtml);
console.log('Rebuilt index.html with original UI structure');
