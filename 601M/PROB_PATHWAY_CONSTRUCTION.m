PROB_PATHWAY_CONSTRUCTION := proc(metabolite, selectionScheme, pathway)
begin
    CONSTRUCT_PATH(metabolite, selectionScheme, pathway)
    model = changeRxnBounds(pathway, 'metabolite')
    sol = optimizeCbModel(pathway, 'max')
    if 
        
        
//metabolite sem býr til lysine
PROB_PATHWAY_CONSTRUCTION := proc(targetMetabolite, selectionScheme, pathway)
begin
	pathway = CONSTRUCT_PATH(targetMetabolite, selectionScheme, pathway)
	[minFlux, maxFlux] = fluxVariability(pathway) 
	[minFluxN, maxFluxN] = fluxVariability(model)

	if maxFlux < maxFluxN //þarf að finna max fyrir lysine í báðum vigrunum
		asdf
end

CONSTRUCT_PATH := proc(targetMetabolite, selectionScheme, pathway)
begin
	rWeighting = []
	pathway = []
	if pathway.length > 5
		pathway = []
        return
    end if

	for reaction in KEGG(metabolite)
		if reaction in pathway
			rWeight.add(0)
		else if
			rWeight.add(set(metabolite, selection scheme))

	nextReaction = random(rWeight)
	pathway.add(nextReaction)

	for metabolite in nextReaction
		if metabolite in pathway
			continue 
		else if
			pathway.add(construct(m, selection scheme, pathway))
end


procedure set(in metabolite, in selection scheme, out weight)
begin
	if selection scheme = highest concentration
		return weight
	else if selection scheme = lowest concentration
		return 1/weight
	else 
		return random(0,1]
    