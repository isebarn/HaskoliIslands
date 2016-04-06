 model = changeRxnBounds(model,'EX_glc(e)',-18.5,'l');
 model = changeRxnBounds(model,'EX_o2(e)',-1000,'l'); %plenty of O2
 
 sol = optimizeCbModel(model);
 
[minFlux, maxFlux] = fluxVariability(model, 75);

rxnsFromMets = findRxnsFromMets(model, model.mets);
answer = [rxnsFromMets, num2cell(minFlux), num2cell(maxFlux)];
