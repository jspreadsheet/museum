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

var oEdition;
var posiX;
var posiY;

if (!baseurl)  var baseurl = './';

document.onclick = function(evt)
{
	evt = (evt || event);
	posiX = evt.clientX + document.body.scrollLeft;
	posiY = evt.clientY + document.body.scrollTop;
}

function headerOver (o)
{
	/*

	grid :: iframe :: headerOver

	Change the header style in the onmouseover

	*/

	o.style.backgroundColor = '#faf9f4';
	o.style.borderBottom = '1px solid #f9a900';
}

function headerOut (o)
{
	/*

	grid :: iframe :: headerout

	Back the original style in the onmouseout

	*/

	o.style.backgroundColor = '#ebeadb';
	o.style.borderBottom = '1px solid #e2decd';
}

function columnOver (o)
{
	/*

	grid :: iframe :: columnOver

	Change the column style in the onmouseover

	*/

	if (o.style.backgroundColor == "") o.style.backgroundColor = '#f6f6ee';
}

function columnOut (o)
{
	/*

	grid :: iframe :: columnOut

	Change the column style in the onmouseout

	*/

	if ((o.style.backgroundColor != "#fff4a7") && (o.style.backgroundColor != "rgb(255, 244, 167)")) o.style.backgroundColor = '';
}
