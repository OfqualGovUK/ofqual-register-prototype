const govukPrototypeKit = require("govuk-prototype-kit");

// Load JSON data sources
const qualsData = require('../data/quals-data-keyed-with-nulls.json');
const scopeData = require('../data/pearson_sor.json');
const qualsAutoComplete = require('../data/quals_autocomplete.json');
const qualsSearchResults = require('../data/quals_search_results.json');

const protoVer = 'alpha01';

module.exports = function (router) {
  const version = 'alpha01'
   
   //---------------------- Async Data Start ------------------------------//

  router.all('/getData/quals', function(req,res){
    res.json(qualsData)
  })

  router.all('/getData/scope', function(req,res){
    res.json(qualsData)
  })
   //---------------------- Async Data End --------------------------------//

   //---------------------- Routing Start ---------------------------------//
   
  router.get('/' + version + '/start', function (req, res) {
    res.render(version + '/start', { 'version': version })
  })
   
   //---------------------- Routing Compare Qualifications ------------------------//
  
  router.all('/' + version + '/routing/compare-quals-route', function (req,res)
  {
    if (req.session.data.ixVariant == 'compareQuals1')
    {
      //const qualsData = require('../data/quals-data-keyed-with-nulls.json');
      res.render('/' + version + '/compare-qualifications/compareOptions1', {'version': version, 'qualsData': qualsData});
    }
    else if ( req.session.data.ixVariant == 'compareQuals1a')
    {
      res.render('/' + version + '/compare-qualifications/compareOptions1a', {'version': version, 'qualsData': qualsData})
    }
    else if ( req.session.data.ixVariant == 'compareQuals2')
    {
      res.render('/' + version + '/compare-qualifications/compareOptions2', {'version': version, 'qualsData': qualsData})
    }
    else
    {
      res.render('/' + version + '/compare-qualifications/start', {'version': version})
    }
  })

  router.all('/' + version + '/compare-qualifications/start', function (req, res) {
    res.render(version + '/compare-qualifications/start', { 'version': version })
  })

  router.all('/' + version + '/compare-qualifications/search-results', function (req,res)
  {
    res.render('/' + version + '/compare-qualifications/search-results', { 'version': version })
  })

     //---------------------- Routing Search Qualifications ------------------------//

  router.all('/' + version + '/search-qualifications/search-results', function (req,res)
  {
    res.render('/' + version + '/search-qualifications/search-results', { 'version': version, 'qualsSearchResults': qualsSearchResults })
  })

  router.all('/' + version + '/search-qualifications/start', function (req, res) {
    res.render('/' + version + '/search-qualifications/start', { 'version': version })
  })

  router.all('/' + version + '/search-qualifications/results-pearson', function (req, res) {
    res.render('/' + version + '/search-qualifications/results-pearson', { 'version': version })
  })

  router.all('/' + version + '/search-qualifications/results', function (req, res) {
    res.render('/' + version + '/search-qualifications/results', { 'version': version })
  })

  router.all('/' + version + 'search-qualifications/search', function (req,res)
  {
    res.render('/' + version + '/search-qualifications/search', { 'version': version, 'qualsAutoComplete': qualsAutoComplete })
  })

  router.all('/' + version + 'search-qualifications/qualification-details', function (req,res)
  {
    res.render('/' + version + '/search-qualifications/qualification-details', { 'version': version })
  })
  
 //---------------------- Routing Search Organisaions -------------------------------//
  
  router.all('/' + version + '/search-organisations/organisation-details', function (req,res)
  {
    res.render('/' + version + '/search-organisations/organisation-details', { 'version': version, 'scopeData': scopeData })
  })

  router.all('/' + version + '/search-organisations/scope-of-recognition', function (req,res)
  {
    res.render('/' + version + '/search-organisations/scope-of-recognition', { 'version': version, 'scopeData': scopeData })
  })
  
  router.all('/' + version + '/search-organisations/search-results', function (req,res)
  {
    res.render('/' + version + '/search-organisations/search-results', { 'version': version })
  })

  router.all('/' + version + '/search-organisations/search', function (req,res)
  {
    res.render('/' + version + '/search-organisations/search', { 'version': version })
  })

}