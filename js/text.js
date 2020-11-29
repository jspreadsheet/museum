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

function text (e, o)
{
	if (!document.getElementById('_edition'))
	{
		oEdition = o;

		t = document.createElement('div');

		t.id = '_edition';

		t.style.position = 'absolute';

		t.style.left = posiX;

		t.style.top = posiY;

		document.getElementById('general').appendChild(t);

		textBoard(e);
	}
}

function textBoard (e)
{
	// Show the colorboard

	var _html = '';

	_html += '<table border="0" cellpadding="0" cellspacing="0">';

	_html += '<td><textarea style="width:300px;height:60px;" onblur="oEdition.innerHTML = this.value; '+e+'.setColumn(this.value);">'+oEdition.innerHTML+'</textarea></td>';

	_html += '</table>';

	document.getElementById('_edition').innerHTML =  _html;
}