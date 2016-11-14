import fs from 'fs';
import path from 'path';

export default function (dir) {
    if (fs.existsSync(dir)) {
        return
    }

    try {
        fs.mkdirSync(dir)
    } catch (err) {
        if (err.code == 'ENOENT') {
            myMkdirSync(path.dirname(dir)) //create parent dir
            myMkdirSync(dir) //create dir
        }
    }
}