const xss = require('xss')
const { exec } = require('../db/mysql')

const getlist = (author,keyword) => {
    let sql = `select * from blogs where 1=1 `//1=1 做容错
    if(author){
        sql += `and author='${author}' `
    }
    if(keyword){
        sql += `and title like '%${keyword}%' `
    }
    // sql +=`order by creatime desc;`
    return exec(sql)
}

const getDetail = (id)=>{
    const sql = `select * from blogs where id='${id}'`
    return exec(sql).then(rows=>{
        return rows[0]
    })
}

const newBlog = (blogData = {}) => {
    const {author,title,content} = blogData
    const createTime = Date.now();
    const sql = `
        insert into blogs (title,content,createtime,author) value ('${title}','${content}','${createTime}','${author}')
    `
    return exec(sql).then(insertData=>{
        return {
            id: insertData.insertId
        }
    })
}

const updataBlog = (id,blogData={}) => {
    const { title,content } = blogData
    const sql = `
        update blogs set title='${title}',content='${content}' where id='${id}'
    `
    return exec(sql).then(updateData=>{
        if(updateData.affectedRows > 0){
            return true
        }
        return false
    })
}

const delBlog = (id,author) => {
    const sql = `
        delete from blogs where id='${id}' and author='${author}'
    `
    return exec(sql).then(delData=>{
        if(delData.affectedRows>0){
            return true
        }
        return false
    })
}

module.exports = {
    getlist,
    getDetail,
    newBlog,
    updataBlog,
    delBlog
}