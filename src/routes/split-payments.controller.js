function splitPayment(req, res) {
  const { ID, Amount, SplitInfo } = req.body;

  let balance = Amount;
  console.log(`Initial balance is: ${balance}`);
  

  const orderedSplitInfo = splitInfoOrder(SplitInfo);
  //console.log(orderedSplitInfo);

}

// sort the entity types pf the request in the specified order
function splitInfoOrder(splitInfo) {
  let order = ["FLAT", "PERCENTAGE", "RATIO"];

  return splitInfo.sort((a, b) => {
    return order.indexOf(a.SplitType) - order.indexOf(b.SplitType);
  });
}


function calculateSplit() {}

export { splitPayment };
