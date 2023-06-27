const fs = require('fs');
const os = require('os');
const { exec } = require('child_process');

// 环境变量与对应的路径
// %ALLUSERSPROFILE%                 C:\ProgramData
// %APPDATA%                              C:\Users\用户名\AppData\Roaming
// %COMMONPROGRAMFILES%     C:\Program Files\Common Files
// %COMMONPROGRAMFILES(x86)%   C:\Program Files (x86)\Common Files
// %COMSPEC%                              C:\Windows\System32\cmd.exe
// %HOMEDRIVE%和%SystemDrive%      C:\
// %HOMEPATH%                           C:\Users\用户名
// %LOCALAPPDATA%                    C:\Users\用户名\AppData\Local
// %PROGRAMDATA%                    C:\ProgramData
// %PROGRAMFILES%                     C:\Program Files
// %PROGRAMFILES(X86)%             C:\Program Files (x86)
// %PUBLIC%                                 C:\UsersPublic
// %SystemRoot%                          C:\Windows
// %TEMP%和%TMP%                    C:\Users\用户名\AppData\LocalTemp
// %USERPROFILE%                        C:\Users用户名
// %WINDIR%                                C:\Window


const dir = `${os.homedir()}\\AppData\\Local\\Packages\\Microsoft.Windows.ContentDeliveryManager_cw5n1h2txyewy\\LocalState\\Assets`
const outdir = process.env.OneDrive + '\\图片'



// 新建输出目录；

fs.readdir(outdir, (err, data) => {
    if (err) throw err;
    // console.log(err);
    // console.log(data);
    if (data.indexOf('BingLockScreen') == -1) {
        fs.mkdirSync(`${outdir}/BingLockScreen`, (err, folder) => {
            if (err) throw err;
            console.log(folder);
        });
    } else {
        console.log('输出目录已存在！');
    }
})

fs.readdir(dir, (err, data) => {
    if (err) throw err;
    //    console.log(data);
    data.map(x => {
        fs.readFile(`${dir}/${x}`, (err, d) => {
            //    console.log(d.length);
            if (d.length > 1e5) {
                fs.writeFile(`${outdir}/BingLockScreen/${x}.jpg`, d, (err) => {
                    if (err) throw err;
                    console.log(x + '.jpg 保存成功!');
                });
            }
        })
    })
	exec('explorer %OneDrive%\\图片\\BingLockScreen')
});