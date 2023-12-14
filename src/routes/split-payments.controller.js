function splitPayment(req, res) {
  const { ID, Amount, SplitInfo } = req.body;

  let balance = Amount;
  console.log(`Initial balance is: ${balance}`);

  const orderedSplitInfo = splitInfoOrder(SplitInfo);

  const SplitBreakdown = orderedSplitInfo.map(splitInfo => {
    let split = calculateSplit(balance, splitInfo)
    balance -= split;

    return {
      SplitEntityId: splitInfo.SplitEntityId,
      Amount: split
    }
  })

  return res.json({
    ID,
    Balance: balance,
    SplitBreakdown
  })
}

// sort the entity types of the request in the specified order
function splitInfoOrder(splitInfo) {
  let order = ["FLAT", "PERCENTAGE", "RATIO"];

  return splitInfo.sort((a, b) => {
    return order.indexOf(a.SplitType) - order.indexOf(b.SplitType);
  });
}


function calculateSplit(balance, info) {
  let id = info.SplitEntityId;
  let value = info.SplitValue;
  let type = info.SplitType;

  // return split value if type is FLAT
  if(type === "FLAT") {
    console.log(`Split amount for "${id}": ${value}`);
    console.log(`Balance after split calculation for "${id}": (${balance} - ${value})`);
    console.log(balance - info.SplitValue);
    return info.SplitValue;
  }
  // return split value if type is PERCENTAGE
  if(type === "PERCENTAGE") {
    let SplitValue = (value / 100) * balance;
    console.log(`Split amount for "${id}": (${value} % OF ${balance}) = ${SplitValue}`);
    console.log(`Balance after split calculation for "${id}": (${balance} - (${SplitValue}))`);
    console.log(balance - SplitValue);
    return SplitValue;
  }
  // return split value if type is RATIO
  // if(splitType === "RATIO") {
  //   console.log("pending");
  // }
}

export { splitPayment };
