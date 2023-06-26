const Router = require("express").Router;
const {handleRequest, capitalize} = require("./handleRequest");

const router = Router();


// All elements
router.post('/elements', handleRequest)


// Elements by BLOCK                    
router.post("/elements/block/:block",  (req, res) => {
    // (['s', 'p', 'd', 'f'].
    // includes(req.params.block)) ?  :
    // res.status(400).send({msg: "Invalid block"})
    handleRequest(req, res, "block", "Invalid block")
});


// Elements by STATE
router.post("/elements/state/:standardState", (req, res) => {
    // (['gas', 'solid', 'liquid', 'unknown']
    // .includes(req.params.standardState)) ? handleRequest(req, res, 'standardState') :
    // res.status(400).send({msg: "Invalid State"});
    handleRequest(req, res, 'standardState', 'Invalid state')
});


// Elements by Group 
router.post("/elements/group/:group", (req, res) => {
    group = req.params.group
    !isNaN(group) && group > 0 && group <= 18 ? handleRequest(req, res, 'group') :
    res.status(400).send({msg: "invalid group"})
});


// Elements by Period
router.post("/elements/period/:period", (req, res) => {
    period = req.params.period
    !isNaN(period) && period > 0 && period <= 7 ? handleRequest(req, res, 'period') :
    res.status(400).send({msg: "Invalid period"})
});


// Elements by groupBlock
router.post("/elements/type/:groupBlock", (req, res) => {
    // // Solution 1: minimum 2ms required
    // [
    //   "post-transition metal", "alkali metal", "transition metal", "metal",
    //   "nonmetal","lanthanoid","metalloid","actinoid","noble gas","halogen",
    //   "alkaline earth metal"
    // ]
    // .includes(req.params.groupBlock) ? handleRequest(req, res, 'groupBlock') : res.status(400).send({msg: "Invalid Type"})
    
    // // Solution 2: 6 - 10ms required
    handleRequest(req, res, 'groupBlock', 'Invalid type by cms')
});


// Elements by bondingType
router.post("/elements/bondingType/:bondingType", (req, res) => {
    // ["atomic","diatomic","covalent network","metallic","unknown"]
    // .includes(req.params.bondingType) ? handleRequest(req, res, 'bondingType') :
    // res.status(400).send({msg: "Invalid bondingType"})
    handleRequest(req, res, 'bondingType', 'Invalid bondingType')
});



// Single Element

// Element by AtomicNumber
router.post("/element/atomicNumber/:atomicNumber", (req, res) => {
  an = req.params.atomicNumber
  !isNaN(an) && an > 0 && an <= 118 ? handleRequest(req, res, 'atomicNumber', "", true):
  res.status(400).send({msg: "Invalid atomicNumber"})

});


// Element by name
router.post("/element/name/:name", (req, res) => {
  req.params.name = capitalize(req.params.name)
  handleRequest(req, res, 'name', 'Invalid name', true)
});


// Element by symbol
router.post("/element/symbol/:symbol", (req, res) => {
  req.params.symbol = capitalize(req.params.symbol)
  handleRequest(req, res, 'symbol', 'Invalid symbol', true)
});

router.all("*", (req, res)=>{
  res.status(400).send({
    msg: (req.method == 'POST') ? "Invalid request" : "Invalid Method"})
})


module.exports = router;
