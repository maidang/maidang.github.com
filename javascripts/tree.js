window.onload = function() 
{
	$("generate").onclick = generateTree;
}

function generateTree(e)
{
	enterLoadState();
	
	// magic happens here
	var xmlStr = $("treeXml").value;
	if (!xmlStr)
	{
		leaveLoadState();
		return;
	}
	
	var parser = new DOMParser();
	var doc = parser.parseFromString(xmlStr, "application/xml");
	var root = doc.documentElement;
	
	var xPos = 0;
	var yPos = 0;

	drawFamily(doc, root, 0, 0);
	
	leaveLoadState();
}

function drawFamily(doc, root, xPos, yPos)
{
	// draw main person
	drawPerson(root, xPos, yPos);
	var spouseNodes = doc.evaluate("/person[@type='spouse']", root, null, XPathResult.STRING_TYPE, null);
	if (spouseNodes.length > 0)
	{
		//drawSpouse(spouseNode[0], xPos
	}
	
	var childNodes = doc.evaluate("/person[@type='child']", root, null, XPathResult.STRING_TYPE, null);
	
	for (var child in childNodes)
	{
		// identify if child or spouse
	}
}

function drawPerson(node, xPos, yPos)
{
	var person = document.createElement("div");
	person.addClassName("personNode");
	person.innerHTML = node.getAttribute("name");
	person.style.left = xPos + "px";
	person.style.top = yPos + "px";
	$("familytree").appendChild(person);
}

function drawSpouse(node, xPos, yPos)
{
	
}

function enterLoadState()
{
	$("generate").disabled = true;
	var loading = document.createElement("img");
	loading.id = "loading";
	loading.src = "../images/loader.gif";
	$("familytree").appendChild(loading);
}

function leaveLoadState()
{
	$("familytree").removeChild($("loading"));
	$("generate").disabled = false;
}