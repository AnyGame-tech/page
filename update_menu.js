const fs = require('fs');

const menuContent = `
            <fieldset>
                <legend>Semester Results</legend>
                <ul>
                    <li><a href="#" class="MainLink">April/May,2026</a></li><br>
                    <li><a href="#" class="MainLink">December,2025</a></li><br>
                    <li><a href="#" class="MainLink">May,2025</a></li><br>
                    <li><a href="#" class="MainLink">December,2024</a></li><br>
                    <li><a href="#" class="MainLink">May,2024</a></li><br>
                    <li><a href="#" class="MainLink">December,2023</a></li><br>
                    <li><a href="#" class="MainLink">May,2023</a></li><br>
                    <li><a href="#" class="MainLink">December,2022</a></li><br>
                    <li><a href="#" class="MainLink">June/July,2022</a></li><br>
                    <li><a href="#" class="MainLink">December,2021</a></li><br>
                    <li><a href="#" class="MainLink">May/June,2021</a></li><br>
                    <li><a href="#" class="MainLink">December,2020 /February,2021</a></li><br>
                    <li><a href="#" class="MainLink">September,2020 /January, 2021</a></li><br>
                    <li><a href="#" class="MainLink">December,2019</a></li><br>
                    <li><a href="#" class="MainLink">September,2019</a></li><br>
                    <li><a href="#" class="MainLink">May,2019</a></li><br>
                    <li><a href="#" class="MainLink">December,2018</a></li><br>
                    <li><a href="#" class="MainLink">November,2018</a></li><br>
                    <li><a href="#" class="MainLink">May,2018</a></li><br>
                    <li><a href="#" class="MainLink">December,2017</a></li><br>
                    <li><a href="#" class="MainLink">May,2017</a></li><br>
                    <li><a href="#" class="MainLink">December,2016</a></li><br>
                    <li><a href="#" class="MainLink">May,2016</a></li><br>
                    <li><a href="#" class="MainLink">December,2015</a></li><br>
                    <li><a href="#" class="MainLink">May,2015</a></li><br>
                    <li><a href="#" class="MainLink">December,2014</a></li><br>
                </ul>
            </fieldset>
            <fieldset>
                <legend>Annual Results</legend>
                <ul>
                    <li><a href="#" class="MainLink">October,2016</a></li><br>
                    <li><a href="#" class="MainLink">April,2016</a></li><br>
                    <li><a href="#" class="MainLink">April,2015</a></li><br>
                    <li><a href="#" class="MainLink">October,2015</a></li>
                </ul>
            </fieldset>
            <fieldset>
                <legend>Login</legend>
                <ul>
                    <li><a href="admin.html" class="MainLink">College Admin</a></li><br>
                    <li><a href="admin.html" class="MainLink">Web Admin</a></li>
                </ul>
            </fieldset>
            <fieldset>
                <legend>Others</legend>
                <ul>
                    <li><a href="#" class="MainLink">Notifications</a></li><br>
                    <li><a href="#" class="MainLink">Re-Evaluation Results</a></li><br>
                    <li><a href="#" class="MainLink">Annual Results</a></li><br>
                    <li><a href="#" class="MainLink">Special/Golden Chance-July,2016</a></li><br>
                    <li><a href="#" class="MainLink">Special/Golden Chance-July,2017</a></li><br>
                    <li><a href="#" class="MainLink">University Pass Percentage</a></li><br>
                </ul>
            </fieldset>
`;

const captchaHtml = `
                            <div style="background-color:#d3edef; display:inline-block; margin-bottom:10px;" id="captchaContainer">
                                <img src="/api/captcha" border="0" width="200" height="60" id="captchaImg">
                            </div>
                            <span id="ctl00_cph1_reqCapcha" style="color:Red;display:none;"></span>
                            <div style="display:flex; justify-content:center; align-items:center; gap:10px; margin-top:5px;">
                                <input name="captcha" type="text" maxlength="10" id="ctl00_cph1_txtCapcha" style="width:200px; padding:3px;" required>
                                <input type="submit" name="btnCaptcha" value="Verify you are not a Robot" id="ctl00_cph1_btnCaptcha" style="font-weight: 700; padding:4px 10px;">
                            </div>
`;

let html = fs.readFileSync('public/index.html', 'utf8');

// Replace menu
html = html.replace(/<fieldset>[\s\S]*?<legend>Semester Results<\/legend>[\s\S]*?<\/fieldset>\s*<fieldset>[\s\S]*?<legend>Annual Results<\/legend>[\s\S]*?<\/fieldset>\s*<fieldset>[\s\S]*?<legend>Login<\/legend>[\s\S]*?<\/fieldset>\s*<fieldset>[\s\S]*?<legend>Others<\/legend>[\s\S]*?<\/fieldset>/, menuContent);

// Replace captcha section
html = html.replace(/<div style="background-color:#d3edef;" id="captchaContainer">[\s\S]*?id="ctl00_cph1_btnCaptcha" style="font-weight: 700">/, captchaHtml);

fs.writeFileSync('public/index.html', html);
console.log('Menu and Captcha UI updated successfully!');
