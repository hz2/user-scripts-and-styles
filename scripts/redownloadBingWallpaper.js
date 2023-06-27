const fs = require('fs');
const path = require('path');
os = require('os');
const {
    exec
} = require('child_process');

// node 18+

const [nodepath, jspath, workdir] = process.argv

const trytoMkdir = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, {
            recursive: true
        });
    }
}


function getReadableFileSizeString(fileSizeInBytes) {
    var i = -1;
    var byteUnits = [' kB', ' MB', ' GB', ' TB', 'PB', 'EB', 'ZB', 'YB'];
    do {
        fileSizeInBytes /= 1024;
        i++;
    } while (fileSizeInBytes > 1024);

    return Math.max(fileSizeInBytes, 0.1).toFixed(1) + byteUnits[i];
}

const getKey = str => str.match(/OHR.\w+\_\w+-[A-Z\d]+/g)


const openText = (objList) => {
    const header = `\nOld Files Count: ${ objList.length } \nNew Files Count: ${  objList.filter(x=>!x.exist).length  }\n`
    const c = header + `\n                  Old Files                        |      Size      |          Target Files      \n---------------------------------------------------|----------------|----------------------------------------------\n`
    const text = path.join(workdir, "/RD/info.txt");
    const data = c + objList.map(x => `${x.old.padEnd(50,' ')} |     ${ String( isNaN(x.size) ?  '-': getReadableFileSizeString(x.size) ).padEnd(8,' ') }   |   ${x.new || x.target }`).join('\n')
    fs.writeFile(text, data, (err) => {
        if (err) throw err;
        exec(text)
    });
}
const downImg = keyList => setTimeout(() => {
    const objList = keyList.map(x => ({
        old: x,
        key: getKey(x)
    }))
    const newPath = file => path.join(workdir, "RD", "new", file)
    keyList.forEach(async (x, i) => {
        const filename = getKey(x) + `_UHD.jpg`
        if (x.includes('_UHD.jpg')) {
            objList[i].new = filename;
            // objList[i].size = 'skip';
            objList[i].finish = true;
            console.log(`直接移动 ${filename}`);
            fs.readFileSync(path.join(workdir, 'RD', 'old', filename), (err, d) => {
                objList[i].size = d.length
                fs.writeFileSync(newPath(filename), d, (err) => {
                    if (err) throw err;
                    console.log(`${filename} 保存成功!`);
                });
            })
            if (objList.every(x => x.finish)) {
                openText(objList)
            }
            return
        }
        console.log(`正在下载 ${filename}`);
        const resp = await fetch(`https://www.bing.com/th?id=${filename}`)
        const blob = await resp.blob()
        const existIndex = objList.findIndex(y => y.size === blob.size)
        if (existIndex !== -1) {
            Object.assign(objList[i], {
                exist: true,
                target: objList[existIndex].new,
                finish: true
            })
            if (objList.every(x => x.finish)) {
                openText(objList)
            }
            return
        }
        objList[i].new = filename;
        objList[i].size = blob.size;
        const buffer = await blob.arrayBuffer()
        objList[i].finish = true;
        fs.writeFileSync(newPath(filename), Buffer.from(buffer), (err) => {
            if (err) throw err;
            console.log(`${filename} 保存成功!`);
        });
        if (objList.every(x => x.finish)) {
            openText(objList)
        }
    })
}, 120)


fs.readdir(workdir, (err, data) => {
    if (err) throw err;
    trytoMkdir(`${workdir}/RD`);
    trytoMkdir(`${workdir}/RD/old`);
    trytoMkdir(`${workdir}/RD/new`);
    data.forEach(x => {
        const key = getKey(x);
        if (key) {
            fs.renameSync(path.join(workdir, x), path.join(workdir, 'RD', 'old', x), function (err) {
                if (err) throw err
                console.log('Successfully moved!')
            })
        }
    })
    setTimeout(() => {
        fs.readdir(path.join(workdir, 'RD', 'old'), (err, data) => {
            if (err) throw err;
            downImg(data)
        })
    }, 1000)
})