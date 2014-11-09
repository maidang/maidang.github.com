window.onload = function() 
{
	$("generate").onclick = generateTree;
}

function generateTree(e)
{
	enterLoadState();
	
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

// Returns xPos of most recent descendant (the rightmost descendant)
function drawFamily(doc, root, xPos, yPos)
{
	if (!root)
	{
		return xPos;
	}
	
	var spouseXPos = xPos;
	var childXPos = xPos;
	
	// draw main person
	drawPerson(root, xPos, yPos);
	
	// draw spouse (if present)
	var spouseNodes = doc.evaluate("./person[@type='spouse']", root, null, 9, null);
	var spouse = spouseNodes.singleNodeValue;
	if (spouse)
	{
		spouseXPos = drawSpouse(spouse, xPos, yPos);
	}
	
	// draw children (if present)
	var childNodes = doc.evaluate("./person[@type='child']", root, null, 7, null);
	var hasChildren = childNodes.snapshotLength > 0;
	for (var i = 0; i < childNodes.snapshotLength; i++)
	{
		var updatedChildXPos = drawFamily(doc, childNodes.snapshotItem(i), childXPos, yPos + 160);//drawPerson(childNodes.snapshotItem(i), xPos, yPos + 160);
		
		var childBar = document.createElement("div");
		childBar.addClassName("treeBarVertical");
		childBar.style.left = (childXPos + 100) + "px";
		childBar.style.top = (yPos + 100) + "px";
		childBar.style.height = "50px";
		$("familytree").appendChild(childBar);
		
		childXPos = updatedChildXPos + 250;
	}
	
	if (hasChildren)
	{
		var hasOneChild = childNodes.snapshotLength == 1;
		var childrenBar = document.createElement("div");
		childrenBar.addClassName("treeBar");
		childrenBar.style.left = (xPos + 100) + "px";
		childrenBar.style.top = (yPos + 100) + "px";
		childrenBar.style.width = (childXPos - xPos - (hasOneChild ? 70 : 250)) + "px";
		$("familytree").appendChild(childrenBar);
		
		if (spouse)
		{
			// vertical line should stem from marriage
			var vBar = document.createElement("div");
			vBar.addClassName("treeBarVertical");
			vBar.style.left = (xPos + 200 + 70) + "px";
			vBar.style.top = (yPos + 30) + "px";
			vBar.style.height = "70px";
			$("familytree").appendChild(vBar);
		}
		else
		{
			
		}
	}
	
	return Math.max(spouseXPos, childXPos);
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
	var marriageBar = document.createElement("div");
	marriageBar.addClassName("treeBar");
	marriageBar.style.left = (xPos + 200 + 30) + "px";
	marriageBar.style.top = (yPos + 30) + "px";
	marriageBar.style.width = "100px"
	$("familytree").appendChild(marriageBar);
	
	var spouseXPos = xPos + 200 + 100 + 50;
	drawPerson(node, spouseXPos, yPos);
	return spouseXPos;
}

function enterLoadState()
{
	$("generate").disabled = true;
	
	var loading = document.createElement("img");
	loading.id = "loading";
	loading.src = "../images/loader.gif";
	$("familytree").innerHTML = "";
	$("familytree").appendChild(loading);
}

function leaveLoadState()
{
	$("familytree").removeChild($("loading"));
	$("generate").disabled = false;
}