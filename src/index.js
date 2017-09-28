'use strict';
require("babel-polyfill");
const fs = require('fs');
// import fs from "fs";
const root_path = process.argv[2];

class T {
  constructor(opt) {
    this.root = opt.root || ''
  }


  async getAllFiles() {
    let root = this.root;
    let res = [], files = fs.readdirSync(root);
    files.map(async (file) => {
      let pathname = root + '/' + file
        , stat = fs.lstatSync(pathname);
      if (!stat.isDirectory()) {
        res.push(pathname.replace(root_path, '.'));
      } else {
        //res = res.concat(await this.getAllFiles(pathname));
      }
    });
    return res

  }


  async mkDir(dirName) {
    let dir = `${this.root}/${dirName}`;
    fs.mkdirSync(dir);
    return dir
  }
  async hasDir(dirName) {
    let stat;
    try {
      stat = fs.lstatSync(this.root + '/' + dirName);
    }
    catch (e) {
      return false
    }
    return stat.isDirectory()
  }

  async getDirName(stat) {
    let date = new Date(stat.mtime);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    month = month.toString().length < 2 ? ('0' + month) : month;
    day = day.toString().length < 2 ? ('0' + day) : day;
    return `${year}${month}${day}`;
  }
  async init() {
    // 获取文件列表
    let list = await this.getAllFiles();

    //遍历
    for (let item of list) {
      let stat = fs.statSync(item);
      let dirName = await this.getDirName(stat);
      console.log(dirName);
      let isDir = await this.hasDir(dirName);

      //判断是否有文件夹

      if (!isDir) {
        //创建文件夹
        await this.mkDir(dirName);
      }
      let oldPath = item;
      let f = item.replace(new RegExp(this.root), '');
      let newPath = `${this.root}/${dirName}${f}`;
      console.log(oldPath, newPath);
      //剪切
      fs.renameSync(oldPath, newPath);
    }
    // list.map(async(item)=>{
    // });
  }
}

module.exports = T

// let t = new T();
// t.init();
