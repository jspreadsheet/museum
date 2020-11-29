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

function input (e, o)
{
	if (!document.getElementById('_edition'))
	{
		oEdition = o;

		inputBoard(e);
	}
}

function inputBoard (e)
{
	// Show the colorboard

	var _default = oEdition.innerHTML;

	var _html = '';

	_html += '<input id="_edition" type="text" value="'+_default+'" style="border:0px;background-color:transparent;width:100%;" onblur="oEdition.innerHTML = this.value; '+e+'.setColumn(this.value);" />';

	oEdition.innerHTML = _html;

	document.getElementById('_edition').focus();
}
