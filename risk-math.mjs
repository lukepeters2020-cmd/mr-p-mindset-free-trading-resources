import {pathToFileURL} from 'node:url';

function number(value, name, allowZero=false) {
  if(typeof value!=='number'||!Number.isFinite(value)||(allowZero?value<0:value<=0))
    throw new RangeError(`${name} must be a finite ${allowZero?'nonnegative':'positive'} number.`);
  return value;
}

/** Teaching model only: cash-only long stock, one currency, whole shares. */
export function plannedStockSize({equity,riskFraction,entry,stop,roundTripCostPerShare=0,cashAvailable,entryCostPerShare=0}={}) {
  number(equity,'equity');number(riskFraction,'riskFraction');number(entry,'entry');number(stop,'stop');
  number(cashAvailable,'cashAvailable',true);number(roundTripCostPerShare,'roundTripCostPerShare',true);number(entryCostPerShare,'entryCostPerShare',true);
  if(riskFraction>1)throw new RangeError('riskFraction must be a fraction at most 1, not a percentage number.');
  if(stop>=entry)throw new RangeError('This long-stock model requires stop below entry.');
  if(entryCostPerShare>roundTripCostPerShare)throw new RangeError('Entry costs must be included in the round-trip cost assumption.');
  const budget=equity*riskFraction, distance=entry-stop, modelledLossPerShare=distance+roundTripCostPerShare;
  number(budget,'calculated risk budget');number(modelledLossPerShare,'calculated per-share loss');number(entry+entryCostPerShare,'calculated entry cost');
  const riskQuantity=Math.floor(budget/modelledLossPerShare),cashQuantity=Math.floor(cashAvailable/(entry+entryCostPerShare));
  const quantity=Math.min(riskQuantity,cashQuantity);
  if(!Number.isSafeInteger(quantity)||!Number.isSafeInteger(riskQuantity)||!Number.isSafeInteger(cashQuantity))throw new RangeError('Inputs exceed the supported whole-share calculation range.');
  return {budget,distance,modelledLossPerShare,riskQuantity,cashQuantity,quantity,notional:quantity*entry,estimatedEntryCash:quantity*(entry+entryCostPerShare),modelledLossAtAssumedExit:quantity*modelledLossPerShare,
    limitation:'Planned values only. Gaps, slippage and actual costs can increase loss. No real orders are placed.'};
}

/** Equity observations must exclude or separately adjust external cash flows. */
export function maximumDrawdown(equitySeries) {
  if(!Array.isArray(equitySeries)||equitySeries.length===0)throw new RangeError('Supply a nonempty equity series.');
  equitySeries.forEach((v,i)=>number(v,`equitySeries[${i}]`,true));
  let peak=number(equitySeries[0],'starting equity'),maximum=0;
  for(const value of equitySeries){peak=Math.max(peak,value);maximum=Math.max(maximum,(peak-value)/peak);}
  return maximum;
}

export function recoveryGain(lossFraction) {
  number(lossFraction,'lossFraction',true);
  if(lossFraction>1)throw new RangeError('lossFraction must be between 0 and 1.');
  return lossFraction===1?null:lossFraction/(1-lossFraction);
}

if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
  console.log(JSON.stringify(plannedStockSize({equity:10000,riskFraction:.01,entry:50,stop:48,roundTripCostPerShare:.10,cashAvailable:10000,entryCostPerShare:.05}),null,2));
}
