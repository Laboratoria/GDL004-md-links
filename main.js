#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const process = require('process');
let pathUse= process.argv[2];
let validLinks=[];
let wrongLinks=[];



async function mdLinks( pathUser, options) {
    if (options.includes('--stats --validate')){
    return new Promise ((resolve, reject)=>{
      fs.readFile(pathUser,'utf8', (err, data) => {
        if (err) throw err;
       // console.log(data);
       if(!err) {
        const expression = /(https?:\/\/[^\s]+)/g;
        const regex = new RegExp(expression);
         const links = data.match(regex);
         if(links){
         // mapLoop(links);


          } else{ console.error('No URLs to validate')}
        resolve( statsValidLinks(links));
      } else {
        reject();
      }
      });
    })
  }
  else if(options.includes('--validate')){

return new Promise(function(resolve, reject) {
  fs.readFile(pathUser,'utf8', (err, data) => {
    if (err) throw err;
   // console.log(data);
   if(!err) {
    const expression = /(https?:\/\/[^\s]+)/g;
    const regex = new RegExp(expression);
     const links = data.match(regex);
     if(links){
     // mapLoop(links);


      } else{ console.error('No URLs to validate')}
    resolve( validateLinks(links));
  } else {
    reject();
  }
  });

});


  }

  else if (options.includes('--stats')){
    return new Promise ((resolve, reject)=>{
      fs.readFile(pathUser,'utf8', (err, data) => {
        if (err) throw err;
       // console.log(data);
       if(!err) {
        const expression = /(https?:\/\/[^\s]+)/g;
        const regex = new RegExp(expression);
         const links = data.match(regex);
         if(links){
         // mapLoop(links);


          } else{ console.error('No URLs to validate')}
        resolve( statsLinks(links));
      } else {
        reject();
      }
      });
    })
  }
}

mdLinks('README.md', '--validate')
  .then(res => console.log(res));


  const validateLinks = async (arr) => {
    const promises = arr.map( async url => {
      try{
      const  statusUrl = await fetch(url)
      //return [statusUrl.status, statusUrl.url]
       if(statusUrl.status < 400){
        return validLinks.push( statusUrl.url)
       } else {
       return wrongLinks.push( statusUrl.url)
       }
      } catch (error){
       // console.error('No valido');
      }
    } )

   const statusUrlsArray = await Promise.all(promises)
   return ({
     validLinks, wrongLinks
   });

  }
  const statsLinks = async (arr) => {
    const promises = arr.map( async url => {
      try{
      const  statusUrl = await fetch(url)
      //return [statusUrl.status, statusUrl.url]
       if(statusUrl.status < 400){
        validLinks.push( statusUrl.url)
        return validLinks.length;

       } else {
        wrongLinks.push( statusUrl.url)
        return  wrongLinks.length;

       }
      } catch (error){
       // console.error('No valido');
      }
    } )

   const statusUrlsArray = await Promise.all(promises)
   return (
    ['Total: ' + arr.length + "   " +' Unique: '+ validLinks.length +"   " + ' Broken: '+ wrongLinks.length]
   );

  }
  const statsValidLinks = async (arr) => {
    const promises = arr.map( async url => {
      try{
      const  statusUrl = await fetch(url)
      //return [statusUrl.status, statusUrl.url]
       if(statusUrl.status < 400){
        validLinks.push( statusUrl.url)
        return validLinks.length;

       } else {
        wrongLinks.push( statusUrl.url)
        return  wrongLinks.length;

       }
      } catch (error){
       // console.error('No valido');
      }
    } )

   const statusUrlsArray = await Promise.all(promises)
   return (
    ['STATS & VALIDATE ' +'Total: ' + arr.length + "   " +' Unique: '+ validLinks.length +"   " + ' Broken: '+ wrongLinks.length]
   );

  }
