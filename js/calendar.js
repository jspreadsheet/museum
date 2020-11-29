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

var tempX = 0
var tempY = 0

function calendar (e, o)
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

		calendarBoard(e, 0, 0);
	}
	else
	{
		t = document.getElementById('_edition');

		document.getElementById('general').removeChild(t);
	}
}

function calendarBoard (e, y, m)
{
	// Checking for the actual value

	var today = 0;

	if ((oEdition.innerHTML) && (!y))
	{
		var data = oEdition.innerHTML.split('-');

		if (data.length > 0)
		{
			y = parseInt(data[0]);

			m = parseInt(data[1]);

			if (m < 0) m = 1;

			if (m > 12) m = 12;

			today = data[2];
		}
	}


	// Start date function

	var x = new Date();

	if (!y)
	{
		// Year

		y = x.getFullYear();

		today = x.getDate();
	}

	if (!m)
	{
		// Month

		m = x.getMonth() + 1;
	}

	w = 0;

	d = 1;


	// Mounting calendar board

	var _html = '';

	_html +=  '<div style="position:absolute;"><iframe style="border:1px;position:absolute;z-index:-1;width:160px;height:140px;float:left;" src="javascript:false;" frameBorder="0" scrolling="no"></iframe></div>';

	if (document.all) _html += '<div style="position:absolute;">';

	_html += '<table border="1" cellpadding="0" cellspacing="0" bordercolor="#e6e6dd" style="z-index:1px;font:8px Verdana; border-collapse: collapse; background-color:#ffffff; border:1px solid #aca899;cursor:pointer;width:160px;height:140px;">';

	_html += '<tr><td align="center" style="font:12px;padding:4px;background-color:#aca899;color:#ffffff">';

	_html += ' <table border="0" cellpadding="0" cellspacing="0" style="display:inline;"><td><select id="m" onchange="calendarBoard(\''+e+'\', document.getElementById(\'y\').value, this.value)"><option value="1">Janeiro</option><option value="2">Fevereiro</option><option value="3">Março</option><option value="4">Abril</option><option value="5">Maio</option><option value="6">Junho</option><option value="7">Julho</option><option value="8">Agosto</option><option value="9">Setembro</option><option value="10">Outubro</option><option value="11">Novembro</option><option value="12">Dezembro</option></select></td><td><select id="y" onchange="calendarBoard(\''+e+'\', this.value, document.getElementById(\'m\').value);"> ';

	for (i = 2020; i >= 1920; i--) _html += '<option value='+i+'>'+i+'</option>';

	_html += ' </select></td></table>';

	_html += '</td></tr><tr><td>';

	_html += '<table border="1" bordercolor="#e6e6dd" cellpadding="4" cellspacing="0" style="font-size:9px; border-collapse: collapse; cursor:pointer;">';
	_html += '<tr align="center" style=" font-size:10px">';
	_html += '<td>D</td>';
	_html += '<td>S</td>';
	_html += '<td>T</td>';
	_html += '<td>Q</td>';
	_html += '<td>Q</td>';
	_html += '<td>S</td>';
	_html += '<td>S</td>';
	_html += '</tr>';

	for (i = 0; i < 6; i++)
	{
		_html += '<tr align="center">';

		for (j = 0; j < 7; j++)
		{
			x = new Date (y, m-1, w+1);

			if ((d > x.getUTCDay()) && (m-1 == x.getMonth()))
			{
				w++;

				data = y.toString() + '-' + m.toString() + '-' + w.toString();

				if (today == w) _html += '<td bgcolor="#cfcfcf" onclick="oEdition.innerHTML = \''+data+'\'; '+e+'.setColumn(oEdition.innerHTML);">'+w+'</td>';
				else
				{
					_html += '<td bgcolor="#ffffff" onclick="oEdition.innerHTML = \''+data+'\'; '+e+'.setColumn(oEdition.innerHTML);">'+w+'</td>';
				}
			}
			else
			{
				_html += '<td bgcolor="#ffffff" onclick="" class=""></td>';
			}

			d++;
		}

		_html += '</tr>';
	}

	_html += '</table>';
	_html += '</td></tr></table>';

	if (document.all) _html += '</div>';

	document.getElementById('_edition').innerHTML =  _html;

	document.getElementById('y').value = x.getFullYear();

	document.getElementById('m').value = m;
}