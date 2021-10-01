const { nanoid } = require('nanoid')
const fs = require('fs')
const path = require('path')

function createIngestFolder() {
    const id = nanoid(9)
    console.log(id)
    const foldername = path.join(__dirname + '/../public/streams/' + id)

    fs.mkdir(foldername, (err) => {
        if (err) {
            return console.error(err)
        }
    })
    return { message: `${id} directory created!` }
}

function deleteIngestFolder(id) {
    const foldername = path.join(__dirname + '/../public/streams/' + id)

    fs.rmdir(foldername, { recursive: true }, (err) => {
        if (err) {
            console.log('error')
            throw err
        }
    })
    return { message: `${id} directory deleted!` }
}

module.exports = { createIngestFolder, deleteIngestFolder }
