const fetch = require('node-fetch');
let validLinks=[];
let wrongLinks=[];
const arrayLinks = [
    'https://es.wikipedia.org/wiki/Markdown)',
    'https://nodejs.org/),',
    'https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg)',
    'https://nodejs.org/es/)',
    'https://developers.google.com/v8/).',
    'https://nodejs.org/en/).',
    'https://nodejs.org/docs/latest-v0.10.x/api/modules.html).',
    'https://nodejs.org/api/fs.html).',
    'https://nodejs.org/api/path.html).',
    'https://nodejs.org/api/http.html#http_http_get_options_callback).',
    'https://en.wikipedia.org/wiki/Parsing).',
    'https://daringfireball.net/projects/markdown/syntax).',
    'https://www.proyectobyte.com/windows/simbolo-del-sistema/uso-la-interfaz-linea-comandos).',
    'https://docs.npmjs.com/misc/scripts).',
    'https://semver.org/).',
    'https://jestjs.io/)',
    'http://algo.com/2/3/',
    'https://otra-cosa.net/algun-doc.html',
    'http://google.com/',
    'http://algo.com/2/3/',
    'https://otra-cosa.net/algun-doc.html',
    'http://google.com/',
    'https://docs.npmjs.com/cli/install).',
    'https://github.com/Laboratoria/course-parser)',
    'https://github.com/markdown-it/markdown-it),',
    'https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Regular_Expressions).',
    'https://github.com/markedjs/marked)',
    'https://github.com/jsdom/jsdom)',
    'https://github.com/cheeriojs/cheerio)',
    'https://github.com/markedjs/marked)',
    'http://community.laboratoria.la/c/js)',
    'https://github.com/workshopper/learnyounode)',
    'https://github.com/workshopper/how-to-npm)',
    'https://github.com/stevekane/promise-it-wont-hurt)',
    'https://nodejs.org/es/about/)',
    'https://nodejs.org/api/fs.html)',
    'https://nodejs.org/api/http.html#http_http_get_options_callback)',
    'https://es.wikipedia.org/wiki/Node.js)',
    'https://medium.freecodecamp.org/what-exactly-is-node-js-ae36e97449f5)',
    'https://www.drauta.com/que-es-nodejs-y-para-que-sirve)',
    'https://www.youtube.com/watch?v=WgSc1nv_4Gw)',
    'https://www.ibm.com/developerworks/ssa/opensource/library/os-nodejs/index.html)',
    'https://www.genbeta.com/desarrollo/node-js-y-npm)',
    'http://community.laboratoria.la/t/modulos-librerias-paquetes-frameworks-cual-es-la-diferencia/175)',
    'https://carlosazaustre.com/manejando-la-asincronia-en-javascript/)',
    'https://docs.npmjs.com/getting-started/what-is-npm)',
    'https://docs.npmjs.com/getting-started/publishing-npm-packages)',
    'https://docs.npmjs.com/getting-started/publishing-npm-packages)',
    'https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback)',
    'https://nodejs.org/api/fs.html#fs_fs_readdir_path_options_callback)',
    'https://nodejs.org/api/path.html)',
    'https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e)'
  ];

  const validosLinks = [
    'https://nodejs.org/api/http.html#http_http_get_options_callback)',
    'http://google.com/',
    'http://google.com/',
    'https://nodejs.org/api/http.html#http_http_get_options_callback)',
    'https://www.youtube.com/watch?v=WgSc1nv_4Gw)',
    'https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback)',
    'https://nodejs.org/api/fs.html#fs_fs_readdir_path_options_callback)',
    'https://developers.google.com/v8/)',
    'https://www.proyectobyte.com/windows/simbolo-del-sistema/uso-la-interfaz-linea-comandos)',
    'https://www.ibm.com/developerworks/ssa/opensource/library/os-nodejs/index.html)'
  ];


  async function validateLinks(arr) {
    return new Promise (async(resolve, reject)=>{
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
    })
   const statusUrlsArray = await Promise.all(promises)
    //console.log(validLinks);
   resolve({ validLinks, wrongLinks});
    reject('buu');
  } )

  }
  validateLinks(validosLinks).then(res=>console.log(res));





const mapLoop = async (arr) => {
  console.log('start map')

  const promises = arr.map( async url => {
    try{
    const  statusUrl = await fetch(url)

    return [statusUrl.status, statusUrl.url]
    } catch (error){

    }
  } )
 const statusUrls = await Promise.all(promises)
 console.table(statusUrls)
 console.log('End map')
}

mapLoop(arrayLinks);













  let arrResult =[];
  const testing = async (arg) =>{
    return new Promise ((resolve, reject) => {
     resolve(
     arg.map(async function (url){
      let response = await fetch(url);
      try{
      let result = await response;
      if (result.status < 400) {
      console.log(result.status, result.url);
      return arrResult.push([result.url , result.status]);
      } else {

      }
    } catch(error){
     // console.error('Error');
    }
      })
     )
     const error = new Error('Whoops!');
     reject(error);
    })
  }

  testing(arrayLinks).then((res)=> console.log('resultado'+ res))
   .catch( err=> console.error(err));

 // testing(validosLinks);

 //Promise.all([testing(validosLinks)]).then(res => console.log(res))










const arrayMap=[];

 async function probando (arg){
     return new Promise ( resolve => {
        arg.map(async function (element){
            fetch(element)
              .then(res => {
                if(res.status <=400){
               //  console.log(element + ' status code: '+ res.status);
             return arrayMap.push(element);

                }
          }) .catch((error)=> {
                console.log('hay error')
              });

           })
        });
        };

(async function resultadoMostrado(){
 const result = await probando(validosLinks);
 console.log(await arrayMap);

})();

// setTimeout(function(){
//     console.log(arrayMap)
// }, 3000);

function resolve(x) {
    return new Promise(resolve => {

        resolve( arg.map(async function (element){
            fetch(element)
              .then(res => {
                if(res.status <=400){
               //  console.log(element + ' status code: '+ res.status);
             return arrayMap.push(element);

                });

    });
  }
  async function add1() {
    const a = await resolve(' Joss');
    const b = await resolve(' Terminado 1');
    return   a + b;
  }
  add1().then(v => {
    console.log(v);  // prints 60 after 4 seconds.
  });


  async function add2(x) {
    const p_a = resolve(' Mariel');
    const p_b = resolve(' Fin de add2');
    return x + await p_a + await p_b;
  }

  add2('adios ').then(v => {
    console.log(v);  // prints 60 after 2 seconds.
  });


  /*-------------------------------
  readFile(){                                   loop promise
   getUrl()                                     loop async
  const  data= await validUrl()
  }

  printUrl(data){

  }
arr = [ [code, url],[code, url], [code, url], [code, url], [code, url]...]
            0             1         2            3            ....
          0     1     0     1
