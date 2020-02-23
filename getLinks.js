module.exports = async function getLinksFile (links) {
    const promises = await(links);
  const arrayPromises = await Promise.all(promises)
  //console.log(arrayPromises );
  return arrayPromises;
  }
