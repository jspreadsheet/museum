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

function colorpicker (e, o)
{
	oEdition = o;

	if (!document.getElementById('_edition'))
	{
		t = document.createElement('div');

		t.id = '_edition';

		t.style.position = 'absolute';

		t.style.left = posiX;

		t.style.top = posiY;

		document.getElementById('general').appendChild(t);

		colorpickerBoard(e);
	}
	else
	{
		t = document.getElementById('_edition');

		document.getElementById('general').removeChild(t);
	}
}

function colorpickerBoard (e)
{
	// Show the colorboard

	var _html = '';

	_html += '<table border="0" cellpadding="0" cellspacing="0" width="400" style="border-collapse:collapse;border:1px solid #000000;">';

	for (i = 5; i >= 0; i--)
	{
		_html += '<tr>';

		for (j = 0; j < 6; j++)
		{
			for (k = 0; k < 6; k++)
			{
				_html += '<td style="width:10px; height:10px; border:1px solid #000000;" bgcolor='+d2h(j*51)+d2h(i*51)+d2h(k*51)+' onclick="oEdition.parentNode.style.backgroundColor = \''+d2h(j*51)+d2h(i*51)+d2h(k*51)+'\'; oEdition.innerHTML = oEdition.parentNode.style.backgroundColor; '+e+'.setColumn(oEdition.parentNode.style.backgroundColor);"></td>';
			}
		}

		_html += '</tr>';
	}

	_html += '</table>';

	document.getElementById('_edition').innerHTML =  _html;
}

var hD = "0123456789ABCDEF";

function d2h (d)
{
	// Decimal to Hexdecimal

	var h = hD.substr(d&15,1);

	while (d > 15)
	{
		d >>= 4;

		h = hD.substr(d&15,1) + h;
	}

	h = '' + h;

	if (h.length == 1) h = '0' + h;

	return h;
}