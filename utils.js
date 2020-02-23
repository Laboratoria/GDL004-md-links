const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const chalk = require('chalk');
let validLinks=[];
let wrongLinks=[];
let  UNIQUE=0;
let  BROKEN=0;
let TOTAL =0;

const mdLink = {

validateFile :  (pathUser) => {
    let extension = path.extname(pathUser);
    if (extension === '.md') {
      console.log(chalk.rgb(30, 166, 51).underline('Correct File extension: ' + extension));
      return pathUser;
    }else {
      console.error('File no valid extension: ' + extension)
    }
  },

  readFile : async(pathUser )=> {
    return new Promise ((resolve, reject)=>{
      fs.readFile(pathUser,'utf8', (err, data) => {
        if (err) throw err;
       // console.log(data);
       if(!err) {
        const expression = /(https?:\/\/[^\s\)]+)/g;
        const regex = new RegExp(expression);
         const links = data.match(regex);
         if(links){

          } else{ console.error('No URLs to validate')}
        resolve(links);
      } else {
        reject();
      }
      });
    })

  },

  validateLinks :  async (arr) => {
    return new Promise (async(resolve, reject)=>{
    const promises = arr.map( async url => {
      try{
      const  statusUrl = await fetch(url)
       if(statusUrl.status < 400){
        return validLinks.push( statusUrl.url)
       } else {
       return wrongLinks.push( statusUrl.url)
       }
      } catch (error){
       // console.error('No valido');
      }
    })
   const statusUrlsArray = await Promise.all(promises)
   resolve( {validLinks,wrongLinks}  );
    reject('buu');
  } )

  },

  statsLinks : async (arr) => {
    return new Promise (async(resolve, reject)=>{
    const promises = arr.map( async url => {
      try{
      const  statusUrl = await fetch(url)
      //return [statusUrl.status, statusUrl.url]
       if(statusUrl.status < 400){
        validLinks.push( statusUrl.url)
       UNIQUE= validLinks.length;
       return UNIQUE;

       } else {
        wrongLinks.push( statusUrl.url)
        BROKEN= wrongLinks.length;
        return BROKEN;
       }
      } catch (error){
       // console.error('No valido');
      }
    } )

   const statusUrlsArray = await Promise.all(promises)
   resolve({UNIQUE, BROKEN});
    reject('buu');
  } )
   return (
    ['Total: ' + arr.length + "   " +' Unique: '+ validLinks.length +"   " + ' Broken: '+ wrongLinks.length]
   );

  },
   statsValidLinks : async (arr) => {
    return new Promise (async(resolve, reject)=>{
      TOTAL = arr.length;
      console.log(validLinks);
      console.log(UNIQUE);
      const promises = arr.map( async url => {
        try{
        const  statusUrl = await fetch(url)
         if(statusUrl.status < 400){
          validLinks.push( statusUrl.url)
         UNIQUE= validLinks.length;
         return UNIQUE;

         } else {
          wrongLinks.push( statusUrl.url)
          BROKEN= wrongLinks.length;
          return BROKEN;
         }
        } catch (error){
          console.error('Could not find the IP address of the server: '+ url);
        }
      } )

     const statusUrlsArray = await Promise.all(promises)
     resolve({ TOTAL, UNIQUE, BROKEN});
      reject('buu');
    } )

  }

}

module.exports = mdLink;

