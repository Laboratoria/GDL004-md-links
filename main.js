#!/usr/bin/env node

const mdLink = require('./utils.js');
const process = require('process');
//const argv = require('./yargs.js').argv;
const options = process.argv[3];
let pathUser= process.argv[2];

async function mdLinks(pathUser, options){
  let pathFile = '';
  let getLinks = '';
  try {
      pathFile = await mdLink.validateFile(pathUser);
      getLinks = await mdLink.readFile(pathFile);
  } catch (e) {
      console.error(e);
  }
      switch (options) {
          case '--stats':
              const stats = await mdLink.statsLinks(getLinks)
              return new Promise (async(resolve, reject)=>{
                resolve(stats)
              })
              break;
          case '--validate':
               const validate = await mdLink.validateLinks(getLinks)
               return   new Promise (async(resolve, reject)=>{
                resolve(validate)
              })
              break;

          case '--validate--stats':
               const statsValid = await mdLink.statsValidLinks(getLinks)
               return new Promise (async(resolve, reject)=>{
                resolve(statsValid)
              })
              break;
          default:
              throw new Error(console.log('Flag unrecognized'));

              break;
      }
}
mdLinks(pathUser, options)
 .then(res => console.log(res));


