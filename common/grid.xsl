<?xml version="1.0" encoding="ISO-8859-1"?>

<!-- paul@hodel.com.br -->

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/">

<xsl:variable name="object" select="'grid'" />

<div style="width:1px">

<table border="0" cellpadding="0" cellspacing="0" class="herculesTable">

<thead onselectstart="return false;"><xsl:attribute name="onmousemove"><xsl:value-of select="$object" />.resizeBorder()</xsl:attribute><xsl:attribute name="onmouseup"><xsl:value-of select="$object" />.resizeEnd()</xsl:attribute>

<tr>

 <td class="herculesHeader" width="20" style="text-align:center;">.</td>

 <xsl:for-each select="grid/config/header/column">

  <td class="herculesHeader"><xsl:attribute name="id">h_<xsl:value-of select="$object" />_<xsl:number value="position()" format="1"/></xsl:attribute><xsl:attribute name="width"><xsl:value-of select="@width"/></xsl:attribute>

   <div class="header" onmouseover="headerOver(this)" onmouseout="headerOut(this)"><xsl:attribute name="ondblclick"><xsl:value-of select="$object" />.order('<xsl:value-of select="@name"/>', <xsl:number value="position()-1" format="1"/>)</xsl:attribute>

    <div class="herculesResize"><xsl:attribute name="onmousedown"><xsl:value-of select="$object" />.resize(<xsl:number value="position()-1" format="1"/>)</xsl:attribute><img src="images/blank.gif" border="0" width="1" height="1" /></div>

    <div class="herculesTitle"><xsl:value-of select="@title"/></div>

    <div><img src="images/blank.gif" class="herculesOrder"><xsl:attribute name="id"><xsl:value-of select="$object" />_<xsl:number value="position()-1" format="1"/></xsl:attribute></img></div>

   </div>

  </td>

 </xsl:for-each>

</tr>

</thead>

<tbody>

<xsl:for-each select="grid/record/row">

  <xsl:sort select="id" order="ascending"/>

  <xsl:variable name="j" select="@index" />

  <tr class="herculesColumn" onmouseover="columnOver(this)" onmouseout="columnOut(this)"><xsl:attribute name="onclick"><xsl:value-of select="$object" />.selectRow(this)</xsl:attribute><xsl:attribute name="id"><xsl:value-of select="@id" /></xsl:attribute><xsl:attribute name="index"><xsl:value-of select="@index" /></xsl:attribute>

  <td><div class="index"><xsl:value-of select="position()" /></div></td>

  <xsl:for-each select="*">

    <td><div class="column" style="width:100%;height:16px;"><xsl:attribute name="name"><xsl:value-of select="name()"/></xsl:attribute><xsl:attribute name="i"><xsl:value-of select="position()"/></xsl:attribute><xsl:attribute name="j"><xsl:value-of select="$j" /></xsl:attribute><xsl:attribute name="ondblclick"><xsl:value-of select="$object" />.editColumn(this);</xsl:attribute><xsl:value-of select="."/></div></td>

  </xsl:for-each>

  </tr>

</xsl:for-each>

</tbody>

</table>

</div>

</xsl:template>

</xsl:stylesheet>
