/*

   HERCULES GRID <www.hercules-cms.org>

    Copyright (C) 2007  PAUL PIERRE HODEL <paul.hodel@hercules-cms.org; paul_hodel@hotmail.com>

    This library is free software; you can redistribute it and/or
    modify it under the terms of the GNU Library General Public
    License as published by the Free Software Foundation; either
    version 2 of the License, or (at your option) any later version.

    This library is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
    Library General Public License for more details.

    You should have received a copy of the GNU Library General Public
    License along with this library; if not, write to the Free
    Software Foundation, Inc., 675 Mass Ave, Cambridge, MA 02139, USA.

*/

function herculesGrid ()
{
	var _gridID;
	var _xmlSource;
	var _xslSource;
	var _rowID		= 0;
	var _rowIndex		= 0;
	var _allowResize	= 0;
	var _columnResize	= 0;
	var _combo		= new Array;
	var _XSLPage;

	this._combo		= _combo;

	this.init		= init;
	this.reload		= reload;
	this.order		= order;
	this.addRow		= addRow;
	this.delRow		= delRow;
	this.selectRow		= selectRow;
	this.editColumn		= editColumn;
	this.setColumn		= setColumn;
	this.resize		= resize;
	this.resizeBorder	= resizeBorder;
	this.resizeEnd		= resizeEnd;
	this.request		= request;
	this.requestDelete	= requestDelete;

	function init (gridID, XSLPage, XMLPage, gridCSS)
	{
		/*

		grid :: init

		Load the XML and the XSL style, transform and set the visible values

		*/

		// Setting the grid id up

		_gridID = gridID;


		// Setting the default XSLPage

		_XSLPage = XSLPage;


		// Checking useful general div for compontes

		if (!document.getElementById('general'))
		{
			document.write('<div id="general"></div>');
		}

		if (!document.getElementById('area'))
		{
			document.write('<div id="area" onmousemove="'+_gridID+'.resizeBorder()" onmouseup="'+_gridID+'.resizeEnd()" onselectstart="return false;"></div>');
		}

		// Create the main grid div box

		if (!gridCSS) gridCSS = 'herculesGrid';

		document.write('<div id="'+_gridID+'" class="'+gridCSS+'"></div>');


		// Loading grid content

		if (window.ActiveXObject)
		{
			_xmlSource = new ActiveXObject("Msxml2.DOMDocument");
			_xmlSource.async = false;
			_xmlSource.load(XMLPage);

			_xslSource = new ActiveXObject("Msxml2.DOMDocument");
			_xslSource.async = false;
			_xslSource.load(XSLPage);

			// Setting up the grid object name

			var objectName = _xslSource.documentElement.getElementsByTagName("xsl:variable")[0].attributes[1];

			objectName.text = "'"+_gridID+"'";

			document.getElementById(_gridID).innerHTML = _xmlSource.transformNode(_xslSource);
		}
		else if (window.XMLHttpRequest)
		{
			var xsltProcessor = new XSLTProcessor();

			var myXMLHTTPRequest = new XMLHttpRequest();
			myXMLHTTPRequest.open("GET", XSLPage, false);
			myXMLHTTPRequest.send(null);

			_xslSource = myXMLHTTPRequest.responseXML;

			var objectName = _xslSource.documentElement.getElementsByTagName("xsl:variable")[0].attributes[1];

			objectName.value = "'"+_gridID+"'";

			xsltProcessor.importStylesheet(_xslSource);

			myXMLHTTPRequest = new XMLHttpRequest();
			myXMLHTTPRequest.open("GET", XMLPage, false);
			myXMLHTTPRequest.send(null);

			_xmlSource = myXMLHTTPRequest.responseXML;

			var resultDocument = xsltProcessor.transformToFragment(_xmlSource, document);

			document.getElementById(_gridID).innerHTML = '';

			document.getElementById(_gridID).appendChild(resultDocument);
		}

		// Set column values

		setValue();
	}

	function reload (XMLPage)
	{
		/*

		grid :: reload

		Reload the XML

		*/

		// Loading grid content

		if (window.ActiveXObject)
		{
			_xmlSource = new ActiveXObject("Msxml2.DOMDocument");
			_xmlSource.async = false;
			_xmlSource.load(XMLPage);

			_xslSource = new ActiveXObject("Msxml2.DOMDocument");
			_xslSource.async = false;
			_xslSource.load(_XSLPage);

			// Setting up the grid object name

			var objectName = _xslSource.documentElement.getElementsByTagName("xsl:variable")[0].attributes[1];

			objectName.text = "'"+_gridID+"'";


			// Loading new content

			document.getElementById(_gridID).innerHTML = '';

			document.getElementById(_gridID).innerHTML = _xmlSource.transformNode(_xslSource);
		}
		else if (window.XMLHttpRequest)
		{
			var xsltProcessor = new XSLTProcessor();

			var myXMLHTTPRequest = new XMLHttpRequest();
			myXMLHTTPRequest.open("GET", _XSLPage, false);
			myXMLHTTPRequest.send(null);

			_xslSource = myXMLHTTPRequest.responseXML;

			var objectName = _xslSource.documentElement.getElementsByTagName("xsl:variable")[0].attributes[1];

			objectName.value = "'"+_gridID+"'";

			// Loading the new content

			xsltProcessor.importStylesheet(_xslSource);

			myXMLHTTPRequest = new XMLHttpRequest();
			myXMLHTTPRequest.open("GET", XMLPage, false);
			myXMLHTTPRequest.send(null);

			_xmlSource = myXMLHTTPRequest.responseXML;

			var resultDocument = xsltProcessor.transformToFragment(_xmlSource, document);

			document.getElementById(_gridID).innerHTML = '';

			document.getElementById(_gridID).appendChild(resultDocument);
		}

		// Set column values

		setValue();
	}

	function order (i, j)
	{
		/*

		grid :: order

		Set the new order attributes, tranform the XSL and set the default column values

		*/

		if (window.ActiveXObject)
		{
			_xslSource.documentElement.getElementsByTagName("tbody")[0].childNodes(0).childNodes(0).attributes(0).text = i;

			var type = _xslSource.documentElement.getElementsByTagName("tbody")[0].childNodes(0).childNodes(0).attributes(1);

			if (type.text == "ascending") type.text = "descending";
			else
			{
				type.text = "ascending";
			}
		
			document.getElementById(_gridID).innerHTML = _xmlSource.transformNode(_xslSource);

			if (type.text == "ascending") document.getElementById(_gridID+'_'+j).src = baseurl+'images/down.gif';
			else
			{
				document.getElementById(_gridID+'_'+j).src = baseurl+'images/up.gif';
			}
		}
		else if (window.XMLHttpRequest)
		{
			var xsltProcessor = new XSLTProcessor();

			_xslSource.documentElement.getElementsByTagName("tbody")[0].childNodes[1].childNodes[1].attributes[0].value = i;

			var type = _xslSource.documentElement.getElementsByTagName("tbody")[0].childNodes[1].childNodes[1].attributes[1];

			if (type.value == "ascending") type.value = "descending";
			else
			{
				type.value = "ascending";
			}

			xsltProcessor.importStylesheet(_xslSource);

			var resultDocument = xsltProcessor.transformToFragment(_xmlSource, document);

			document.getElementById(_gridID).innerHTML = '';

			document.getElementById(_gridID).appendChild(resultDocument);

			if (type.value == "ascending") document.getElementById(_gridID+'_'+j).src = baseurl+'images/down.gif';
			else
			{
				document.getElementById(_gridID+'_'+j).src = baseurl+'images/up.gif';
			}
		}

		// Set column values

		setValue();
	}

	function addRow (v)
	{
		/*

		grid :: addRow

		Add a XML new node, set id and index for the row and transform with XSL to make the new row visible and set the default values

		*/

		// Create a node row

		var index = 0;

		var record = _xmlSource.documentElement.getElementsByTagName("record")[0];

		for (i = 0; i < record.childNodes.length; i++)
		{
			if (record.childNodes[i].nodeType != 3)
			{
				if (index < record.childNodes[i].getAttribute("index"))
				{
					// Get the higher value of index in XML

					index = record.childNodes[i].getAttribute("index");
				}
			}
		}

		// Create row with the higher value of index

		var row = _xmlSource.createElement("row")

		row.setAttribute("id", 0);
		row.setAttribute("index", index + 1);


		// Add XML a new row

		var node;
		var text;

		var k = 0;

		var columns = _xmlSource.documentElement.getElementsByTagName("header")[0].childNodes;

		for (i = 0; i < columns.length; i++)
		{
			if (columns[i].nodeType != 3)
			{
				node = _xmlSource.createElement(columns[i].attributes[1].value);

				if (!v[k]) v[k] = '';

				text = _xmlSource.createTextNode(v[k]);

				node.appendChild(text);

				row.appendChild(node);

				k++;
			}
		}

		// Do insert new row

		record.insertBefore(row, record.firstChild);


		// Make sure the first row is the new record

		// TODO: TODO: _xslSource.documentElement.getElementsByTagName("tbody")[0].childNodes[1].childNodes[1].attributes[1].value = "ascending";


		// Update XSL Table

		if (window.ActiveXObject)
		{
			document.getElementById(_gridID).innerHTML = _xmlSource.transformNode(_xslSource);
		}
		else if (window.XMLHttpRequest)
		{
			var xsltProcessor = new XSLTProcessor();

			xsltProcessor.importStylesheet(_xslSource);

			var resultDocument = xsltProcessor.transformToFragment(_xmlSource, document);

			document.getElementById(_gridID).innerHTML = '';

			document.getElementById(_gridID).appendChild(resultDocument);
		}

		// Set column values

		setValue();
	}

	function delRow ()
	{
		/*

		grid :: delRow

		Delete a XML node, transform with XSL and set the default values

		*/

		if (!_rowIndex) alert('No row selected');
		else
		{
			// Delete rowIndex

			var record = _xmlSource.documentElement.getElementsByTagName("row");

			for (i = 0; i < record.length; i++)
			{
				if (_rowIndex == record[i].getAttribute("index"))
				{
					// Remotly delete

					requestDelete(record[i].getAttribute("id"));

					record[i].parentNode.removeChild(record[i]);
				}
			}

			// Update XSL Table

			if (window.ActiveXObject)
			{
				document.getElementById(_gridID).innerHTML = _xmlSource.transformNode(_xslSource);
			}
			else if (window.XMLHttpRequest)
			{
				var xsltProcessor = new XSLTProcessor();

				xsltProcessor.importStylesheet(_xslSource);

				var resultDocument = xsltProcessor.transformToFragment(_xmlSource, document);

				document.getElementById(_gridID).innerHTML = '';

				document.getElementById(_gridID).appendChild(resultDocument);
			}
		}

		// Set column values

		setValue();
	}

	function selectRow (o)
	{
		/*

		grid :: selectRow

		Unselect all the rows and select a new one, keep the row index and the row id

		*/

		var body = document.getElementById(_gridID).getElementsByTagName("tbody")[0].childNodes;

		for (i = 0; i < body.length; i++) body[i].style.backgroundColor = '';

		if (_rowIndex == o.getAttribute('index'))
		{
			o.style.backgroundColor = '';

			_rowID = 0;

			_rowIndex = 0;
		}
		else
		{
			o.style.backgroundColor = '#fff4a7';

			_rowID = o.getAttribute('id');

			_rowIndex = o.getAttribute('index');
		}

		// Row Function (IF EXISTS)

		var header = _xmlSource.documentElement.getElementsByTagName("header")[0];

		if (header.getAttribute("rowFunction")) eval(header.getAttribute("rowFunction")+'('+_rowID+')');
	}

	function setValue ()
	{
		/*

		grid :: setValue

		In each grid refresh need to set the visible values instead of the original values

		*/


		// Loadding combo arrays

		if (_xmlSource.documentElement.getElementsByTagName("combo")[0])
		{
			var select = _xmlSource.documentElement.getElementsByTagName("combo")[0].childNodes;

			for (x = 0; x < select.length; x++)
			{
				if (select[x].nodeName == "select")
				{
					// Create combo[index]

					index = select[x].getAttribute("column");

					_combo[index] = new Object();

					// Loading array values

					option = select[x].childNodes;

					for (y = 0; y < option.length; y++)
					{
						if (option[y].nodeType != 3)
						{
							_combo[index][option[y].getAttribute("value")] = option[y].firstChild.nodeValue;
						}
					}
				}
			}
		}

		// Loading colorpicker columns

		var i = 0;

		var _header = new Array;

		var header = _xmlSource.documentElement.getElementsByTagName("header")[0].childNodes;

		for (k = 0; k < header.length; k++)
		{
			if (header[k].nodeType != 3)
			{
				i++;

				_header[i] = header[k].getAttribute('type');
			}
		}

		// Setting visible values for especial columns (like combos, colorpicker, etc)

		var body = document.getElementById(_gridID).getElementsByTagName("div");


		// Changing values

		for (k = 0; k < body.length; k++)
		{
			if (body[k].className == "column")
			{
				i = body[k].getAttribute('i');

				if (_header[i] == 2)
				{
					// Update combo column

					if (_combo[i])
					{
						if (_combo[i][body[k].innerHTML]) body[k].innerHTML = _combo[i][body[k].innerHTML];
					}
				}
				else if (_header[i] == 4)
				{
					// Update colorpicker column

					body[k].parentNode.style.backgroundColor = body[k].innerHTML;
				}
				else if (_header[i] == 6)
				{
					// Update checkbox column

					if (body[k].innerHTML == 1) body[k].innerHTML = '<input type="checkbox" value="1" class="herculesInput" checked="checked" onclick="oEdition = this.parentNode; if (this.checked == true) '+_gridID+'.setColumn(1); else '+_gridID+'.setColumn(0);">';
					else
					{
						body[k].innerHTML = '<input type="checkbox" value="1" class="herculesInput" onclick="oEdition = this.parentNode; if (this.checked == true) '+_gridID+'.setColumn(1); else '+_gridID+'.setColumn(0);">';
					}

					body[k].style.textAlign = 'center';
				}
			}
		}
	}

	function editColumn (o)
	{
		/*

		grid :: editColumn

		Check in the XML header definion the type of the column and the open the respective component board

		*/

		// Close any oppenned boards

		if (t = document.getElementById('_edition'))
		{
			document.getElementById('general').removeChild(t);
		}

		// Column type

		var type = 0;


		// Get header attributes

		var node = o.getAttribute('name');

		var h = _xmlSource.documentElement.getElementsByTagName("header")[0].childNodes;

		for (i = 0; i < h.length; i++)
		{
			if (h[i].nodeType != 3)
			{
				if (h[i].getAttribute('name') == node)
				{
					type = h[i].getAttribute('type');
				}
			}
		}

		if (!type) alert('Column definition for '+node+' is not found in your XML header');
		else
		{
			if (type == 1) text(_gridID, o);
			if (type == 2) select(_gridID, o);
			if (type == 3) calendar(_gridID, o);
			if (type == 4) colorpicker(_gridID, o);
			if (type == 5) input(_gridID, o);
			if (type == 6) checkbox(_gridID, o);
		}
	}

	function setColumn (v)
	{
		/*

		grid :: setColumn

		Set the XML value and then update remotly

		*/

		// Close any oppenned boards

		if (t = document.getElementById('_edition'))
		{
			// Close Component Board

			document.getElementById('general').removeChild(t);
		}


		// Get Column Position Node

		var index = oEdition.parentNode.parentNode.getAttribute('index');

		var id = oEdition.parentNode.parentNode.getAttribute('id');

		var node = oEdition.getAttribute('name');

		var update = new Array();

		// Looking for a row with the specified index

		var row = _xmlSource.documentElement.getElementsByTagName("record")[0].childNodes;

		for (x = 0; x < row.length; x++)
		{
			if (row[x].nodeType != 3)
			{
				if (row[x].getAttribute("index") == index)
				{
					// Founded, now looking for all nodes

					for (y = 0; y < row[x].childNodes.length; y++)
					{
						// Founded, update its value

						if (row[x].childNodes[y].nodeName == node)
						{
							if (row[x].childNodes[y].firstChild) row[x].childNodes[y].firstChild.nodeValue = v;
							else
							{
								row[x].childNodes[y].appendChild(_xmlSource.createTextNode(v));
							}

							update[node] = v;
						}
						else
						{
							if ((id == 0) && (id != ''))
							{
								// if insert check all column

								if (row[x].childNodes[y].firstChild) update[row[x].childNodes[y].nodeName] = row[x].childNodes[y].firstChild.nodeValue;
								else
								{
									row[x].childNodes[y].appendChild(_xmlSource.createTextNode(''));
								}
							}
						}
					}
				}
			}
		}

		// Request Remotly Update

		request(update);
	}

	function resize (i)
	{
		/*

		grid :: resize

		In the onclick start the resizing

		*/

		_allowResize = 1;

		_columnResize = i;

		o = document.getElementById('h_'+_gridID+'_'+_columnResize);

		document.getElementById('area').style.top		= posiY + 20;
		document.getElementById('area').style.left		= posiX - parseInt(o.width) - 3;
		document.getElementById('area').style.width		= parseInt(o.width) + 1;
		document.getElementById('area').style.height		= 3;
	}

	function resizeBorder ()
	{
		/*

		grid :: resize

		In the onmousemove get the current mouse position and resize the table

		*/

		if (_allowResize == 1)
		{
			oWidth = posiX - parseInt(document.getElementById('area').style.left);

			if (oWidth < 1) oWidth = 1;

			document.getElementById('area').style.width = oWidth + 1;

			o = document.getElementById('h_'+_gridID+'_'+_columnResize);

			o.width = oWidth;

		}
	}

	function resizeEnd (i)
	{
		/*

		grid :: iframe :: resizeEnd

		In the onmouseup stop get the final width for the table

		*/

		if (_allowResize == 1)
		{
			// Resize Column

			_allowResize = 0;

			posiX = posiX + document.body.scrollLeft;

			oWidth = posiX - parseInt(document.getElementById('area').style.left);

			// Hide area field

			document.getElementById('area').style.top		= 0;
			document.getElementById('area').style.left		= 0;
			document.getElementById('area').style.width		= 0;
			document.getElementById('area').style.height		= 0;


			// Update width

			if (oWidth < 1) oWidth = 1;

			// Update TD width

			o = document.getElementById('h_'+_gridID+'_'+_columnResize);

			o.width = oWidth;


			// Update Column Width on XSL

			if (window.ActiveXObject)
			{
				var i = _columnResize;
			}
			else if (window.XMLHttpRequest)
			{
				// Mozilla Correction

				var i = (_columnResize * 2);
			}

			// Update XSL width attribute

			var h = _xmlSource.documentElement.getElementsByTagName("header")[0].childNodes[i-1];

			h.attributes[2].value = oWidth;
		}
	}

	function request (update)
	{
		/*

		grid :: requestUpdate

		Remotly update by ajax function go in the remote table and update the column value

		If the row has not ID yet, check the column values and send all XML column values

		If the row has ID, send only the column value

		*/

		try
		{
			xmlhttp = new XMLHttpRequest();
		}
		catch(ee)
		{
			try
			{
				xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
			}
			catch(e)
			{
				try
				{
					xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
				}
				catch(E)
				{
					xmlhttp = false;
				}
			}
		}

		var url;

		var header = _xmlSource.documentElement.getElementsByTagName("header")[0];

		if (header.getAttribute("remoteFile"))
		{
			file = header.getAttribute("remoteFile");

			table = header.getAttribute("tableName");

			key = header.getAttribute("primaryKey"); 

			id = oEdition.parentNode.parentNode.id;

			url = file+'?table[name]='+table+'&table[key]='+key+'&table[id]='+id;

			for (k in update)
			{
				// Loading update array

				url = url+'&record['+k+']='+update[k];
			}
		}

		if (url)
		{
			xmlhttp.open("POST", url, true);

			xmlhttp.onreadystatechange = function()
			{
				if (xmlhttp.readyState==4)
				{
					if (xmlhttp.responseText == 0)
					{
						// Warning border color

						oEdition.parentNode.style.border = '1px solid red';

						alert('Remotly update failed, please check your database access in your config.inc.php file or your XML table definition');
					}
					else
					{
						// Back to the successfully border color

						if (oEdition.parentNode.style.border == '1px solid red')
						{
							oEdition.parentNode.style.border = '1px solid transparent';
							oEdition.parentNode.style.borderBottom = '1px solid #f1efe2';
							oEdition.parentNode.style.borderRight = '1px solid #f1efe2';
						}

						// Update new row id

						if (oEdition.parentNode.parentNode.id == 0) oEdition.parentNode.parentNode.id = xmlhttp.responseText;
					}
				}
			}

			xmlhttp.send(null);
		}

		return true;
	}

	function requestDelete (id)
	{
		/*

		grid :: requestDelete

		Remotly delete by ajax function go in the remote table and update the column value

		*/

		try
		{
			xmlhttp = new XMLHttpRequest();
		}
		catch(ee)
		{
			try
			{
				xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
			}
			catch(e)
			{
				try
				{
					xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
				}
				catch(E)
				{
					xmlhttp = false;
				}
			}
		}

		var url;

		var header = _xmlSource.documentElement.getElementsByTagName("header")[0];

		if (header.getAttribute("remoteFile"))
		{
			file = header.getAttribute("remoteFile");

			table = header.getAttribute("tableName");

			key = header.getAttribute("primaryKey"); 

			url = file+'?table[name]='+table+'&table[key]='+key+'&table[id]='+id+'&table[delRow]=1';
		}

		if (url)
		{
			xmlhttp.open("POST", url, true);
	
			xmlhttp.onreadystatechange = function()
			{
				if (xmlhttp.readyState==4)
				{
					if (xmlhttp.responseText == 0)
					{
						alert('Remotly update failed, please check your database access in your config.inc.php file or your XML table definition');
					}
				}
			}

			xmlhttp.send(null);
		}

		return true;
	}
}