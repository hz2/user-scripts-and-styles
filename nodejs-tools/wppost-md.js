// #!/usr/bin/env node

import { userInfo } from 'os';
import { writeFile } from 'node:fs';
import path, { join } from 'node:path';
import { readdir, readFile } from 'fs';
import slug from "slug";
import unidecode from "unidecode";


const TextToSlug = (text) => slug(unidecode(text))

const regexp = /(?<=INSERT INTO `wp_posts`([ \(\)\A-Za-z`\_\,]+)VALUES[\n\r]*)([\s\S]+?)(?=[\n\r]*\-\- \-{5,}|INSERT|UNLOCK TABLES;)/gm

// const regexp = /(?<=INSERT INTO `wp_posts`([ \(\)\A-Za-z`\_\,]+)VALUES[\n\r]*)(\(?[\s\S]+?\?)(?=[\n\r]*\-\- \-{5,}|INSERT)/gm

//    (\(.*\),\n)+/g


/**  
 * Usage：
 * node  ./wppost-md.js  /path/to/sql/file/dir
 * Example：
 * node  ./wppost-md.js e:\software\history\HOST\SQL文件
 */



const [file] = process.argv.slice(2);

console.log('file', file);


const repeatList = []
const repeatFoundList = []

readdir(file, (err, f) => {
    if (err) throw err;
    console.log('f', f);
    f.forEach((ff, finex) => {
        if (!ff.endsWith('.sql')) return

        readFile(file + '/' + ff, 'utf-8', (err, data) => {
            if (err) throw err;
            const a = data.match(regexp)

            // console.log('a== start=>', a?.[0].substring(0, 10));
            // console.log('a== end=>', a?.[0].substring(a[0]?.length - 10));


            const list = a?.flatMap(x =>
                // x?.split(/(?<=\),)\n/)
                x?.split(/(?<=\([\s\S]+\)[\,\n](?=\([\s\S]+\)))/g)
                // x?.split(/\n/)
            )
            // list?.forEach((x, i) => {
            //     if (i < 3 || i > list?.length - 3) {


            //         console.log('\n\nx===>', i, x);
            //     }
            // })

            const kayMatch = data.match(/(?<=INSERT INTO `wp_posts` \()([ \(\)\A-Za-z`\_\,]+)(?=\) VALUES)/gm)
            let keyArr = kayMatch?.[0]?.split(',').map(x => x.trim().replace(/`/g, ''))
            if (!kayMatch) {
                // console.log('kayReg ', ff);
            }

            const r = list?.map(listItem => {
                const list = listItem
                    // .replace(/^\(|\);?$/g,'')
                    .replace(/^\(|[\);,]{0,2}$/g, '')
                    // .match(/('[\s\S]*?'(?=,)|\d+(?=,?))/g)
                    .match(/((?<!')'(?!')[\s\S]*?(?<!')'(?!')(?=,)|\d+(?=,?))/g)
                    // .split(/(?<='[\s\S]*?'),\ ?|(?<=\d+),\ ?|(?<=\d+)$/g)
                    ?.map(x => x.trim().replace(/^[\"\']|[\"\']$/g, ''))
                const keyArrDefalt = [`ID`, `post_author`, `post_date`, `post_date_gmt`, `post_content`, `post_title`, `post_excerpt`, `post_status`, `comment_status`, `ping_status`, `post_password`, `post_name`, `to_ping`, `pinged`, `post_modified`, `post_modified_gmt`, `post_content_filtered`, `post_parent`, `guid`, `menu_order`, `post_type`, `post_mime_type`, `comment_count`]
                if (!list) {
                    return {}
                }
                const obj = {
                    raw: listItem
                };
                (keyArr || keyArrDefalt).forEach((y, i) => {
                    Object.assign(obj, { [y]: list[i] })
                })
                return obj
            }).filter(x => x.post_title && x.post_content)

            // const j = JSON.stringify(r, null, 4)
            r?.forEach((x, i) => {

                x.post_content = x.post_content
                    ?.replace('&gt;', '>')
                    .replace('&lt;', '<')

                let filename = x.post_title;

                if (
                    !filename ||
                    filename?.includes('%') ||
                    filename === 'open' ||
                    filename === 'publish' ||
                    filename === 'revision' ||
                    filename === 'autosave'
                ) {
                    filename = TextToSlug(x.post_title)
                }

                filename += ('_' + finex + '_' + i + '.md')
                const findedItem = repeatList.find(y => y.post_content === x.post_content)

                if (findedItem) {
                    if (findedItem.post_date !== x.post_date || findedItem.post_modified !== x.post_modified)
                        repeatFoundList.push({
                            post_title: x.post_title,
                            post_content: x.post_content,
                            post_date: x.post_date,
                            post_modified: x.post_modified,
                        })
                    return
                } else {
                    repeatList.push(x)
                }

                const { post_content: content, post_excerpt, ...rest } = x;
                const newContent = (content )?.replace(/\\n/g, '\n')
                    .replace(/\\"/g, '"')
                    .replace(/\\'/g, "'")
                    .replace(/\\r/g, '\r')
                if (
                    x.post_title.includes('\\n') ||
                    x.post_type === 'attachment' ||
                    x.post_type === 'images' ||
                    x.post_title === 'inherit' ||
                    x.post_title === 'draft' ||
                    x.post_title?.includes('cropped')
                ) {
                    writeFile('./temp/review/' + filename, `---
title: ${x.post_title}
description: 'description'
updatedDate: '${x.post_modified ? new Date(x.post_modified).toLocaleDateString() : ""}'
createdDate: '${new Date(x.post_date).toLocaleDateString()}'
heroImage: ''
status: 'published'
visibility: 'public'
guid: '${x.guid}'
tags: ["tag"]
---

${newContent}

${JSON.stringify(rest, null, 4)}
`, 'utf8', (_r) => {
                    });
                } else {
                    writeFile('./temp/' + filename, `---
title: ${x.post_title}
description: 'description'
updatedDate: '${x.post_modified ? new Date(x.post_modified).toLocaleDateString() : ""}'
createdDate: '${new Date(x.post_date).toLocaleDateString()}'
heroImage: ''
status: 'published'
visibility: 'public'
guid: '${x.guid}'
tags: ["tag"]
---

${newContent}

                        `, 'utf8', (_r) => {
                    });
                }
            })

        });


    })

    if (repeatFoundList?.length) {
        writeFile('./' + repeatFoundList.json, JSON.stringify(repeatFoundList, null, 4), 'utf8', (_r) => {
        });
    }

})
