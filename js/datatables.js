/*
 * This combined file was created by the DataTables downloader builder:
 *   https://datatables.net/download
 *
 * To rebuild or modify this file with the latest versions of the included
 * software please visit:
 *   https://datatables.net/download/#bs4/dt-1.10.21/e-1.9.3
 *
 * Included libraries:
 *   DataTables 1.10.21, Editor 1.9.3
 */

/*! DataTables 1.10.21
 * ©2008-2020 SpryMedia Ltd - datatables.net/license
 */

/**
 * @summary     DataTables
 * @description Paginate, search and order HTML tables
 * @version     1.10.21
 * @file        jquery.dataTables.js
 * @author      SpryMedia Ltd
 * @contact     www.datatables.net
 * @copyright   Copyright 2008-2020 SpryMedia Ltd.
 *
 * This source file is free software, available under the following license:
 *   MIT license - http://datatables.net/license
 *
 * This source file is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 * or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.
 *
 * For details please refer to: http://www.datatables.net
 */

/*jslint evil: true, undef: true, browser: true */
/*globals $,require,jQuery,define,_selector_run,_selector_opts,_selector_first,_selector_row_indexes,_ext,_Api,_api_register,_api_registerPlural,_re_new_lines,_re_html,_re_formatted_numeric,_re_escape_regex,_empty,_intVal,_numToDecimal,_isNumber,_isHtml,_htmlNumeric,_pluck,_pluck_order,_range,_stripHtml,_unique,_fnBuildAjax,_fnAjaxUpdate,_fnAjaxParameters,_fnAjaxUpdateDraw,_fnAjaxDataSrc,_fnAddColumn,_fnColumnOptions,_fnAdjustColumnSizing,_fnVisibleToColumnIndex,_fnColumnIndexToVisible,_fnVisbleColumns,_fnGetColumns,_fnColumnTypes,_fnApplyColumnDefs,_fnHungarianMap,_fnCamelToHungarian,_fnLanguageCompat,_fnBrowserDetect,_fnAddData,_fnAddTr,_fnNodeToDataIndex,_fnNodeToColumnIndex,_fnGetCellData,_fnSetCellData,_fnSplitObjNotation,_fnGetObjectDataFn,_fnSetObjectDataFn,_fnGetDataMaster,_fnClearTable,_fnDeleteIndex,_fnInvalidate,_fnGetRowElements,_fnCreateTr,_fnBuildHead,_fnDrawHead,_fnDraw,_fnReDraw,_fnAddOptionsHtml,_fnDetectHeader,_fnGetUniqueThs,_fnFeatureHtmlFilter,_fnFilterComplete,_fnFilterCustom,_fnFilterColumn,_fnFilter,_fnFilterCreateSearch,_fnEscapeRegex,_fnFilterData,_fnFeatureHtmlInfo,_fnUpdateInfo,_fnInfoMacros,_fnInitialise,_fnInitComplete,_fnLengthChange,_fnFeatureHtmlLength,_fnFeatureHtmlPaginate,_fnPageChange,_fnFeatureHtmlProcessing,_fnProcessingDisplay,_fnFeatureHtmlTable,_fnScrollDraw,_fnApplyToChildren,_fnCalculateColumnWidths,_fnThrottle,_fnConvertToWidth,_fnGetWidestNode,_fnGetMaxLenString,_fnStringToCss,_fnSortFlatten,_fnSort,_fnSortAria,_fnSortListener,_fnSortAttachListener,_fnSortingClasses,_fnSortData,_fnSaveState,_fnLoadState,_fnSettingsFromNode,_fnLog,_fnMap,_fnBindAction,_fnCallbackReg,_fnCallbackFire,_fnLengthOverflow,_fnRenderer,_fnDataSource,_fnRowAttributes*/

(function( factory ) {
	"use strict";

	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( ['jquery'], function ( $ ) {
			return factory( $, window, document );
		} );
	}
	else if ( typeof exports === 'object' ) {
		// CommonJS
		module.exports = function (root, $) {
			if ( ! root ) {
				// CommonJS environments without a window global must pass a
				// root. This will give an error otherwise
				root = window;
			}

			if ( ! $ ) {
				$ = typeof window !== 'undefined' ? // jQuery's factory checks for a global window
					require('jquery') :
					require('jquery')( root );
			}

			return factory( $, root, root.document );
		};
	}
	else {
		// Browser
		factory( jQuery, window, document );
	}
}
(function( $, window, document, undefined ) {
	"use strict";

	/**
	 * DataTables is a plug-in for the jQuery Javascript library. It is a highly
	 * flexible tool, based upon the foundations of progressive enhancement,
	 * which will add advanced interaction controls to any HTML table. For a
	 * full list of features please refer to
	 * [DataTables.net](href="http://datatables.net).
	 *
	 * Note that the `DataTable` object is not a global variable but is aliased
	 * to `jQuery.fn.DataTable` and `jQuery.fn.dataTable` through which it may
	 * be  accessed.
	 *
	 *  @class
	 *  @param {object} [init={}] Configuration object for DataTables. Options
	 *    are defined by {@link DataTable.defaults}
	 *  @requires jQuery 1.7+
	 *
	 *  @example
	 *    // Basic initialisation
	 *    $(document).ready( function {
	 *      $('#example').dataTable();
	 *    } );
	 *
	 *  @example
	 *    // Initialisation with configuration options - in this case, disable
	 *    // pagination and sorting.
	 *    $(document).ready( function {
	 *      $('#example').dataTable( {
	 *        "paginate": false,
	 *        "sort": false
	 *      } );
	 *    } );
	 */
	var DataTable = function ( options )
	{
		/**
		 * Perform a jQuery selector action on the table's TR elements (from the tbody) and
		 * return the resulting jQuery object.
		 *  @param {string|node|jQuery} sSelector jQuery selector or node collection to act on
		 *  @param {object} [oOpts] Optional parameters for modifying the rows to be included
		 *  @param {string} [oOpts.filter=none] Select TR elements that meet the current filter
		 *    criterion ("applied") or all TR elements (i.e. no filter).
		 *  @param {string} [oOpts.order=current] Order of the TR elements in the processed array.
		 *    Can be either 'current', whereby the current sorting of the table is used, or
		 *    'original' whereby the original order the data was read into the table is used.
		 *  @param {string} [oOpts.page=all] Limit the selection to the currently displayed page
		 *    ("current") or not ("all"). If 'current' is given, then order is assumed to be
		 *    'current' and filter is 'applied', regardless of what they might be given as.
		 *  @returns {object} jQuery object, filtered by the given selector.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Highlight every second row
		 *      oTable.$('tr:odd').css('backgroundColor', 'blue');
		 *    } );
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Filter to rows with 'Webkit' in them, add a background colour and then
		 *      // remove the filter, thus highlighting the 'Webkit' rows only.
		 *      oTable.fnFilter('Webkit');
		 *      oTable.$('tr', {"search": "applied"}).css('backgroundColor', 'blue');
		 *      oTable.fnFilter('');
		 *    } );
		 */
		this.$ = function ( sSelector, oOpts )
		{
			return this.api(true).$( sSelector, oOpts );
		};
		
		
		/**
		 * Almost identical to $ in operation, but in this case returns the data for the matched
		 * rows - as such, the jQuery selector used should match TR row nodes or TD/TH cell nodes
		 * rather than any descendants, so the data can be obtained for the row/cell. If matching
		 * rows are found, the data returned is the original data array/object that was used to
		 * create the row (or a generated array if from a DOM source).
		 *
		 * This method is often useful in-combination with $ where both functions are given the
		 * same parameters and the array indexes will match identically.
		 *  @param {string|node|jQuery} sSelector jQuery selector or node collection to act on
		 *  @param {object} [oOpts] Optional parameters for modifying the rows to be included
		 *  @param {string} [oOpts.filter=none] Select elements that meet the current filter
		 *    criterion ("applied") or all elements (i.e. no filter).
		 *  @param {string} [oOpts.order=current] Order of the data in the processed array.
		 *    Can be either 'current', whereby the current sorting of the table is used, or
		 *    'original' whereby the original order the data was read into the table is used.
		 *  @param {string} [oOpts.page=all] Limit the selection to the currently displayed page
		 *    ("current") or not ("all"). If 'current' is given, then order is assumed to be
		 *    'current' and filter is 'applied', regardless of what they might be given as.
		 *  @returns {array} Data for the matched elements. If any elements, as a result of the
		 *    selector, were not TR, TD or TH elements in the DataTable, they will have a null
		 *    entry in the array.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Get the data from the first row in the table
		 *      var data = oTable._('tr:first');
		 *
		 *      // Do something useful with the data
		 *      alert( "First cell is: "+data[0] );
		 *    } );
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Filter to 'Webkit' and get all data for
		 *      oTable.fnFilter('Webkit');
		 *      var data = oTable._('tr', {"search": "applied"});
		 *
		 *      // Do something with the data
		 *      alert( data.length+" rows matched the search" );
		 *    } );
		 */
		this._ = function ( sSelector, oOpts )
		{
			return this.api(true).rows( sSelector, oOpts ).data();
		};
		
		
		/**
		 * Create a DataTables Api instance, with the currently selected tables for
		 * the Api's context.
		 * @param {boolean} [traditional=false] Set the API instance's context to be
		 *   only the table referred to by the `DataTable.ext.iApiIndex` option, as was
		 *   used in the API presented by DataTables 1.9- (i.e. the traditional mode),
		 *   or if all tables captured in the jQuery object should be used.
		 * @return {DataTables.Api}
		 */
		this.api = function ( traditional )
		{
			return traditional ?
				new _Api(
					_fnSettingsFromNode( this[ _ext.iApiIndex ] )
				) :
				new _Api( this );
		};
		
		
		/**
		 * Add a single new row or multiple rows of data to the table. Please note
		 * that this is suitable for client-side processing only - if you are using
		 * server-side processing (i.e. "bServerSide": true), then to add data, you
		 * must add it to the data source, i.e. the server-side, through an Ajax call.
		 *  @param {array|object} data The data to be added to the table. This can be:
		 *    <ul>
		 *      <li>1D array of data - add a single row with the data provided</li>
		 *      <li>2D array of arrays - add multiple rows in a single call</li>
		 *      <li>object - data object when using <i>mData</i></li>
		 *      <li>array of objects - multiple data objects when using <i>mData</i></li>
		 *    </ul>
		 *  @param {bool} [redraw=true] redraw the table or not
		 *  @returns {array} An array of integers, representing the list of indexes in
		 *    <i>aoData</i> ({@link DataTable.models.oSettings}) that have been added to
		 *    the table.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    // Global var for counter
		 *    var giCount = 2;
		 *
		 *    $(document).ready(function() {
		 *      $('#example').dataTable();
		 *    } );
		 *
		 *    function fnClickAddRow() {
		 *      $('#example').dataTable().fnAddData( [
		 *        giCount+".1",
		 *        giCount+".2",
		 *        giCount+".3",
		 *        giCount+".4" ]
		 *      );
		 *
		 *      giCount++;
		 *    }
		 */
		this.fnAddData = function( data, redraw )
		{
			var api = this.api( true );
		
			/* Check if we want to add multiple rows or not */
			var rows = $.isArray(data) && ( $.isArray(data[0]) || $.isPlainObject(data[0]) ) ?
				api.rows.add( data ) :
				api.row.add( data );
		
			if ( redraw === undefined || redraw ) {
				api.draw();
			}
		
			return rows.flatten().toArray();
		};
		
		
		/**
		 * This function will make DataTables recalculate the column sizes, based on the data
		 * contained in the table and the sizes applied to the columns (in the DOM, CSS or
		 * through the sWidth parameter). This can be useful when the width of the table's
		 * parent element changes (for example a window resize).
		 *  @param {boolean} [bRedraw=true] Redraw the table or not, you will typically want to
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable( {
		 *        "sScrollY": "200px",
		 *        "bPaginate": false
		 *      } );
		 *
		 *      $(window).on('resize', function () {
		 *        oTable.fnAdjustColumnSizing();
		 *      } );
		 *    } );
		 */
		this.fnAdjustColumnSizing = function ( bRedraw )
		{
			var api = this.api( true ).columns.adjust();
			var settings = api.settings()[0];
			var scroll = settings.oScroll;
		
			if ( bRedraw === undefined || bRedraw ) {
				api.draw( false );
			}
			else if ( scroll.sX !== "" || scroll.sY !== "" ) {
				/* If not redrawing, but scrolling, we want to apply the new column sizes anyway */
				_fnScrollDraw( settings );
			}
		};
		
		
		/**
		 * Quickly and simply clear a table
		 *  @param {bool} [bRedraw=true] redraw the table or not
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Immediately 'nuke' the current rows (perhaps waiting for an Ajax callback...)
		 *      oTable.fnClearTable();
		 *    } );
		 */
		this.fnClearTable = function( bRedraw )
		{
			var api = this.api( true ).clear();
		
			if ( bRedraw === undefined || bRedraw ) {
				api.draw();
			}
		};
		
		
		/**
		 * The exact opposite of 'opening' a row, this function will close any rows which
		 * are currently 'open'.
		 *  @param {node} nTr the table row to 'close'
		 *  @returns {int} 0 on success, or 1 if failed (can't find the row)
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable;
		 *
		 *      // 'open' an information row when a row is clicked on
		 *      $('#example tbody tr').click( function () {
		 *        if ( oTable.fnIsOpen(this) ) {
		 *          oTable.fnClose( this );
		 *        } else {
		 *          oTable.fnOpen( this, "Temporary row opened", "info_row" );
		 *        }
		 *      } );
		 *
		 *      oTable = $('#example').dataTable();
		 *    } );
		 */
		this.fnClose = function( nTr )
		{
			this.api( true ).row( nTr ).child.hide();
		};
		
		
		/**
		 * Remove a row for the table
		 *  @param {mixed} target The index of the row from aoData to be deleted, or
		 *    the TR element you want to delete
		 *  @param {function|null} [callBack] Callback function
		 *  @param {bool} [redraw=true] Redraw the table or not
		 *  @returns {array} The row that was deleted
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Immediately remove the first row
		 *      oTable.fnDeleteRow( 0 );
		 *    } );
		 */
		this.fnDeleteRow = function( target, callback, redraw )
		{
			var api = this.api( true );
			var rows = api.rows( target );
			var settings = rows.settings()[0];
			var data = settings.aoData[ rows[0][0] ];
		
			rows.remove();
		
			if ( callback ) {
				callback.call( this, settings, data );
			}
		
			if ( redraw === undefined || redraw ) {
				api.draw();
			}
		
			return data;
		};
		
		
		/**
		 * Restore the table to it's original state in the DOM by removing all of DataTables
		 * enhancements, alterations to the DOM structure of the table and event listeners.
		 *  @param {boolean} [remove=false] Completely remove the table from the DOM
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      // This example is fairly pointless in reality, but shows how fnDestroy can be used
		 *      var oTable = $('#example').dataTable();
		 *      oTable.fnDestroy();
		 *    } );
		 */
		this.fnDestroy = function ( remove )
		{
			this.api( true ).destroy( remove );
		};
		
		
		/**
		 * Redraw the table
		 *  @param {bool} [complete=true] Re-filter and resort (if enabled) the table before the draw.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Re-draw the table - you wouldn't want to do it here, but it's an example :-)
		 *      oTable.fnDraw();
		 *    } );
		 */
		this.fnDraw = function( complete )
		{
			// Note that this isn't an exact match to the old call to _fnDraw - it takes
			// into account the new data, but can hold position.
			this.api( true ).draw( complete );
		};
		
		
		/**
		 * Filter the input based on data
		 *  @param {string} sInput String to filter the table on
		 *  @param {int|null} [iColumn] Column to limit filtering to
		 *  @param {bool} [bRegex=false] Treat as regular expression or not
		 *  @param {bool} [bSmart=true] Perform smart filtering or not
		 *  @param {bool} [bShowGlobal=true] Show the input global filter in it's input box(es)
		 *  @param {bool} [bCaseInsensitive=true] Do case-insensitive matching (true) or not (false)
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Sometime later - filter...
		 *      oTable.fnFilter( 'test string' );
		 *    } );
		 */
		this.fnFilter = function( sInput, iColumn, bRegex, bSmart, bShowGlobal, bCaseInsensitive )
		{
			var api = this.api( true );
		
			if ( iColumn === null || iColumn === undefined ) {
				api.search( sInput, bRegex, bSmart, bCaseInsensitive );
			}
			else {
				api.column( iColumn ).search( sInput, bRegex, bSmart, bCaseInsensitive );
			}
		
			api.draw();
		};
		
		
		/**
		 * Get the data for the whole table, an individual row or an individual cell based on the
		 * provided parameters.
		 *  @param {int|node} [src] A TR row node, TD/TH cell node or an integer. If given as
		 *    a TR node then the data source for the whole row will be returned. If given as a
		 *    TD/TH cell node then iCol will be automatically calculated and the data for the
		 *    cell returned. If given as an integer, then this is treated as the aoData internal
		 *    data index for the row (see fnGetPosition) and the data for that row used.
		 *  @param {int} [col] Optional column index that you want the data of.
		 *  @returns {array|object|string} If mRow is undefined, then the data for all rows is
		 *    returned. If mRow is defined, just data for that row, and is iCol is
		 *    defined, only data for the designated cell is returned.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    // Row data
		 *    $(document).ready(function() {
		 *      oTable = $('#example').dataTable();
		 *
		 *      oTable.$('tr').click( function () {
		 *        var data = oTable.fnGetData( this );
		 *        // ... do something with the array / object of data for the row
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Individual cell data
		 *    $(document).ready(function() {
		 *      oTable = $('#example').dataTable();
		 *
		 *      oTable.$('td').click( function () {
		 *        var sData = oTable.fnGetData( this );
		 *        alert( 'The cell clicked on had the value of '+sData );
		 *      } );
		 *    } );
		 */
		this.fnGetData = function( src, col )
		{
			var api = this.api( true );
		
			if ( src !== undefined ) {
				var type = src.nodeName ? src.nodeName.toLowerCase() : '';
		
				return col !== undefined || type == 'td' || type == 'th' ?
					api.cell( src, col ).data() :
					api.row( src ).data() || null;
			}
		
			return api.data().toArray();
		};
		
		
		/**
		 * Get an array of the TR nodes that are used in the table's body. Note that you will
		 * typically want to use the '$' API method in preference to this as it is more
		 * flexible.
		 *  @param {int} [iRow] Optional row index for the TR element you want
		 *  @returns {array|node} If iRow is undefined, returns an array of all TR elements
		 *    in the table's body, or iRow is defined, just the TR element requested.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Get the nodes from the table
		 *      var nNodes = oTable.fnGetNodes( );
		 *    } );
		 */
		this.fnGetNodes = function( iRow )
		{
			var api = this.api( true );
		
			return iRow !== undefined ?
				api.row( iRow ).node() :
				api.rows().nodes().flatten().toArray();
		};
		
		
		/**
		 * Get the array indexes of a particular cell from it's DOM element
		 * and column index including hidden columns
		 *  @param {node} node this can either be a TR, TD or TH in the table's body
		 *  @returns {int} If nNode is given as a TR, then a single index is returned, or
		 *    if given as a cell, an array of [row index, column index (visible),
		 *    column index (all)] is given.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      $('#example tbody td').click( function () {
		 *        // Get the position of the current data from the node
		 *        var aPos = oTable.fnGetPosition( this );
		 *
		 *        // Get the data array for this row
		 *        var aData = oTable.fnGetData( aPos[0] );
		 *
		 *        // Update the data array and return the value
		 *        aData[ aPos[1] ] = 'clicked';
		 *        this.innerHTML = 'clicked';
		 *      } );
		 *
		 *      // Init DataTables
		 *      oTable = $('#example').dataTable();
		 *    } );
		 */
		this.fnGetPosition = function( node )
		{
			var api = this.api( true );
			var nodeName = node.nodeName.toUpperCase();
		
			if ( nodeName == 'TR' ) {
				return api.row( node ).index();
			}
			else if ( nodeName == 'TD' || nodeName == 'TH' ) {
				var cell = api.cell( node ).index();
		
				return [
					cell.row,
					cell.columnVisible,
					cell.column
				];
			}
			return null;
		};
		
		
		/**
		 * Check to see if a row is 'open' or not.
		 *  @param {node} nTr the table row to check
		 *  @returns {boolean} true if the row is currently open, false otherwise
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable;
		 *
		 *      // 'open' an information row when a row is clicked on
		 *      $('#example tbody tr').click( function () {
		 *        if ( oTable.fnIsOpen(this) ) {
		 *          oTable.fnClose( this );
		 *        } else {
		 *          oTable.fnOpen( this, "Temporary row opened", "info_row" );
		 *        }
		 *      } );
		 *
		 *      oTable = $('#example').dataTable();
		 *    } );
		 */
		this.fnIsOpen = function( nTr )
		{
			return this.api( true ).row( nTr ).child.isShown();
		};
		
		
		/**
		 * This function will place a new row directly after a row which is currently
		 * on display on the page, with the HTML contents that is passed into the
		 * function. This can be used, for example, to ask for confirmation that a
		 * particular record should be deleted.
		 *  @param {node} nTr The table row to 'open'
		 *  @param {string|node|jQuery} mHtml The HTML to put into the row
		 *  @param {string} sClass Class to give the new TD cell
		 *  @returns {node} The row opened. Note that if the table row passed in as the
		 *    first parameter, is not found in the table, this method will silently
		 *    return.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable;
		 *
		 *      // 'open' an information row when a row is clicked on
		 *      $('#example tbody tr').click( function () {
		 *        if ( oTable.fnIsOpen(this) ) {
		 *          oTable.fnClose( this );
		 *        } else {
		 *          oTable.fnOpen( this, "Temporary row opened", "info_row" );
		 *        }
		 *      } );
		 *
		 *      oTable = $('#example').dataTable();
		 *    } );
		 */
		this.fnOpen = function( nTr, mHtml, sClass )
		{
			return this.api( true )
				.row( nTr )
				.child( mHtml, sClass )
				.show()
				.child()[0];
		};
		
		
		/**
		 * Change the pagination - provides the internal logic for pagination in a simple API
		 * function. With this function you can have a DataTables table go to the next,
		 * previous, first or last pages.
		 *  @param {string|int} mAction Paging action to take: "first", "previous", "next" or "last"
		 *    or page number to jump to (integer), note that page 0 is the first page.
		 *  @param {bool} [bRedraw=true] Redraw the table or not
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *      oTable.fnPageChange( 'next' );
		 *    } );
		 */
		this.fnPageChange = function ( mAction, bRedraw )
		{
			var api = this.api( true ).page( mAction );
		
			if ( bRedraw === undefined || bRedraw ) {
				api.draw(false);
			}
		};
		
		
		/**
		 * Show a particular column
		 *  @param {int} iCol The column whose display should be changed
		 *  @param {bool} bShow Show (true) or hide (false) the column
		 *  @param {bool} [bRedraw=true] Redraw the table or not
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Hide the second column after initialisation
		 *      oTable.fnSetColumnVis( 1, false );
		 *    } );
		 */
		this.fnSetColumnVis = function ( iCol, bShow, bRedraw )
		{
			var api = this.api( true ).column( iCol ).visible( bShow );
		
			if ( bRedraw === undefined || bRedraw ) {
				api.columns.adjust().draw();
			}
		};
		
		
		/**
		 * Get the settings for a particular table for external manipulation
		 *  @returns {object} DataTables settings object. See
		 *    {@link DataTable.models.oSettings}
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *      var oSettings = oTable.fnSettings();
		 *
		 *      // Show an example parameter from the settings
		 *      alert( oSettings._iDisplayStart );
		 *    } );
		 */
		this.fnSettings = function()
		{
			return _fnSettingsFromNode( this[_ext.iApiIndex] );
		};
		
		
		/**
		 * Sort the table by a particular column
		 *  @param {int} iCol the data index to sort on. Note that this will not match the
		 *    'display index' if you have hidden data entries
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Sort immediately with columns 0 and 1
		 *      oTable.fnSort( [ [0,'asc'], [1,'asc'] ] );
		 *    } );
		 */
		this.fnSort = function( aaSort )
		{
			this.api( true ).order( aaSort ).draw();
		};
		
		
		/**
		 * Attach a sort listener to an element for a given column
		 *  @param {node} nNode the element to attach the sort listener to
		 *  @param {int} iColumn the column that a click on this node will sort on
		 *  @param {function} [fnCallback] callback function when sort is run
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Sort on column 1, when 'sorter' is clicked on
		 *      oTable.fnSortListener( document.getElementById('sorter'), 1 );
		 *    } );
		 */
		this.fnSortListener = function( nNode, iColumn, fnCallback )
		{
			this.api( true ).order.listener( nNode, iColumn, fnCallback );
		};
		
		
		/**
		 * Update a table cell or row - this method will accept either a single value to
		 * update the cell with, an array of values with one element for each column or
		 * an object in the same format as the original data source. The function is
		 * self-referencing in order to make the multi column updates easier.
		 *  @param {object|array|string} mData Data to update the cell/row with
		 *  @param {node|int} mRow TR element you want to update or the aoData index
		 *  @param {int} [iColumn] The column to update, give as null or undefined to
		 *    update a whole row.
		 *  @param {bool} [bRedraw=true] Redraw the table or not
		 *  @param {bool} [bAction=true] Perform pre-draw actions or not
		 *  @returns {int} 0 on success, 1 on error
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *      oTable.fnUpdate( 'Example update', 0, 0 ); // Single cell
		 *      oTable.fnUpdate( ['a', 'b', 'c', 'd', 'e'], $('tbody tr')[0] ); // Row
		 *    } );
		 */
		this.fnUpdate = function( mData, mRow, iColumn, bRedraw, bAction )
		{
			var api = this.api( true );
		
			if ( iColumn === undefined || iColumn === null ) {
				api.row( mRow ).data( mData );
			}
			else {
				api.cell( mRow, iColumn ).data( mData );
			}
		
			if ( bAction === undefined || bAction ) {
				api.columns.adjust();
			}
		
			if ( bRedraw === undefined || bRedraw ) {
				api.draw();
			}
			return 0;
		};
		
		
		/**
		 * Provide a common method for plug-ins to check the version of DataTables being used, in order
		 * to ensure compatibility.
		 *  @param {string} sVersion Version string to check for, in the format "X.Y.Z". Note that the
		 *    formats "X" and "X.Y" are also acceptable.
		 *  @returns {boolean} true if this version of DataTables is greater or equal to the required
		 *    version, or false if this version of DataTales is not suitable
		 *  @method
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *      alert( oTable.fnVersionCheck( '1.9.0' ) );
		 *    } );
		 */
		this.fnVersionCheck = _ext.fnVersionCheck;
		

		var _that = this;
		var emptyInit = options === undefined;
		var len = this.length;

		if ( emptyInit ) {
			options = {};
		}

		this.oApi = this.internal = _ext.internal;

		// Extend with old style plug-in API methods
		for ( var fn in DataTable.ext.internal ) {
			if ( fn ) {
				this[fn] = _fnExternApiFunc(fn);
			}
		}

		this.each(function() {
			// For each initialisation we want to give it a clean initialisation
			// object that can be bashed around
			var o = {};
			var oInit = len > 1 ? // optimisation for single table case
				_fnExtend( o, options, true ) :
				options;

			/*global oInit,_that,emptyInit*/
			var i=0, iLen, j, jLen, k, kLen;
			var sId = this.getAttribute( 'id' );
			var bInitHandedOff = false;
			var defaults = DataTable.defaults;
			var $this = $(this);
			
			
			/* Sanity check */
			if ( this.nodeName.toLowerCase() != 'table' )
			{
				_fnLog( null, 0, 'Non-table node initialisation ('+this.nodeName+')', 2 );
				return;
			}
			
			/* Backwards compatibility for the defaults */
			_fnCompatOpts( defaults );
			_fnCompatCols( defaults.column );
			
			/* Convert the camel-case defaults to Hungarian */
			_fnCamelToHungarian( defaults, defaults, true );
			_fnCamelToHungarian( defaults.column, defaults.column, true );
			
			/* Setting up the initialisation object */
			_fnCamelToHungarian( defaults, $.extend( oInit, $this.data() ), true );
			
			
			
			/* Check to see if we are re-initialising a table */
			var allSettings = DataTable.settings;
			for ( i=0, iLen=allSettings.length ; i<iLen ; i++ )
			{
				var s = allSettings[i];
			
				/* Base check on table node */
				if (
					s.nTable == this ||
					(s.nTHead && s.nTHead.parentNode == this) ||
					(s.nTFoot && s.nTFoot.parentNode == this)
				) {
					var bRetrieve = oInit.bRetrieve !== undefined ? oInit.bRetrieve : defaults.bRetrieve;
					var bDestroy = oInit.bDestroy !== undefined ? oInit.bDestroy : defaults.bDestroy;
			
					if ( emptyInit || bRetrieve )
					{
						return s.oInstance;
					}
					else if ( bDestroy )
					{
						s.oInstance.fnDestroy();
						break;
					}
					else
					{
						_fnLog( s, 0, 'Cannot reinitialise DataTable', 3 );
						return;
					}
				}
			
				/* If the element we are initialising has the same ID as a table which was previously
				 * initialised, but the table nodes don't match (from before) then we destroy the old
				 * instance by simply deleting it. This is under the assumption that the table has been
				 * destroyed by other methods. Anyone using non-id selectors will need to do this manually
				 */
				if ( s.sTableId == this.id )
				{
					allSettings.splice( i, 1 );
					break;
				}
			}
			
			/* Ensure the table has an ID - required for accessibility */
			if ( sId === null || sId === "" )
			{
				sId = "DataTables_Table_"+(DataTable.ext._unique++);
				this.id = sId;
			}
			
			/* Create the settings object for this table and set some of the default parameters */
			var oSettings = $.extend( true, {}, DataTable.models.oSettings, {
				"sDestroyWidth": $this[0].style.width,
				"sInstance":     sId,
				"sTableId":      sId
			} );
			oSettings.nTable = this;
			oSettings.oApi   = _that.internal;
			oSettings.oInit  = oInit;
			
			allSettings.push( oSettings );
			
			// Need to add the instance after the instance after the settings object has been added
			// to the settings array, so we can self reference the table instance if more than one
			oSettings.oInstance = (_that.length===1) ? _that : $this.dataTable();
			
			// Backwards compatibility, before we apply all the defaults
			_fnCompatOpts( oInit );
			_fnLanguageCompat( oInit.oLanguage );
			
			// If the length menu is given, but the init display length is not, use the length menu
			if ( oInit.aLengthMenu && ! oInit.iDisplayLength )
			{
				oInit.iDisplayLength = $.isArray( oInit.aLengthMenu[0] ) ?
					oInit.aLengthMenu[0][0] : oInit.aLengthMenu[0];
			}
			
			// Apply the defaults and init options to make a single init object will all
			// options defined from defaults and instance options.
			oInit = _fnExtend( $.extend( true, {}, defaults ), oInit );
			
			
			// Map the initialisation options onto the settings object
			_fnMap( oSettings.oFeatures, oInit, [
				"bPaginate",
				"bLengthChange",
				"bFilter",
				"bSort",
				"bSortMulti",
				"bInfo",
				"bProcessing",
				"bAutoWidth",
				"bSortClasses",
				"bServerSide",
				"bDeferRender"
			] );
			_fnMap( oSettings, oInit, [
				"asStripeClasses",
				"ajax",
				"fnServerData",
				"fnFormatNumber",
				"sServerMethod",
				"aaSorting",
				"aaSortingFixed",
				"aLengthMenu",
				"sPaginationType",
				"sAjaxSource",
				"sAjaxDataProp",
				"iStateDuration",
				"sDom",
				"bSortCellsTop",
				"iTabIndex",
				"fnStateLoadCallback",
				"fnStateSaveCallback",
				"renderer",
				"searchDelay",
				"rowId",
				[ "iCookieDuration", "iStateDuration" ], // backwards compat
				[ "oSearch", "oPreviousSearch" ],
				[ "aoSearchCols", "aoPreSearchCols" ],
				[ "iDisplayLength", "_iDisplayLength" ]
			] );
			_fnMap( oSettings.oScroll, oInit, [
				[ "sScrollX", "sX" ],
				[ "sScrollXInner", "sXInner" ],
				[ "sScrollY", "sY" ],
				[ "bScrollCollapse", "bCollapse" ]
			] );
			_fnMap( oSettings.oLanguage, oInit, "fnInfoCallback" );
			
			/* Callback functions which are array driven */
			_fnCallbackReg( oSettings, 'aoDrawCallback',       oInit.fnDrawCallback,      'user' );
			_fnCallbackReg( oSettings, 'aoServerParams',       oInit.fnServerParams,      'user' );
			_fnCallbackReg( oSettings, 'aoStateSaveParams',    oInit.fnStateSaveParams,   'user' );
			_fnCallbackReg( oSettings, 'aoStateLoadParams',    oInit.fnStateLoadParams,   'user' );
			_fnCallbackReg( oSettings, 'aoStateLoaded',        oInit.fnStateLoaded,       'user' );
			_fnCallbackReg( oSettings, 'aoRowCallback',        oInit.fnRowCallback,       'user' );
			_fnCallbackReg( oSettings, 'aoRowCreatedCallback', oInit.fnCreatedRow,        'user' );
			_fnCallbackReg( oSettings, 'aoHeaderCallback',     oInit.fnHeaderCallback,    'user' );
			_fnCallbackReg( oSettings, 'aoFooterCallback',     oInit.fnFooterCallback,    'user' );
			_fnCallbackReg( oSettings, 'aoInitComplete',       oInit.fnInitComplete,      'user' );
			_fnCallbackReg( oSettings, 'aoPreDrawCallback',    oInit.fnPreDrawCallback,   'user' );
			
			oSettings.rowIdFn = _fnGetObjectDataFn( oInit.rowId );
			
			/* Browser support detection */
			_fnBrowserDetect( oSettings );
			
			var oClasses = oSettings.oClasses;
			
			$.extend( oClasses, DataTable.ext.classes, oInit.oClasses );
			$this.addClass( oClasses.sTable );
			
			
			if ( oSettings.iInitDisplayStart === undefined )
			{
				/* Display start point, taking into account the save saving */
				oSettings.iInitDisplayStart = oInit.iDisplayStart;
				oSettings._iDisplayStart = oInit.iDisplayStart;
			}
			
			if ( oInit.iDeferLoading !== null )
			{
				oSettings.bDeferLoading = true;
				var tmp = $.isArray( oInit.iDeferLoading );
				oSettings._iRecordsDisplay = tmp ? oInit.iDeferLoading[0] : oInit.iDeferLoading;
				oSettings._iRecordsTotal = tmp ? oInit.iDeferLoading[1] : oInit.iDeferLoading;
			}
			
			/* Language definitions */
			var oLanguage = oSettings.oLanguage;
			$.extend( true, oLanguage, oInit.oLanguage );
			
			if ( oLanguage.sUrl )
			{
				/* Get the language definitions from a file - because this Ajax call makes the language
				 * get async to the remainder of this function we use bInitHandedOff to indicate that
				 * _fnInitialise will be fired by the returned Ajax handler, rather than the constructor
				 */
				$.ajax( {
					dataType: 'json',
					url: oLanguage.sUrl,
					success: function ( json ) {
						_fnLanguageCompat( json );
						_fnCamelToHungarian( defaults.oLanguage, json );
						$.extend( true, oLanguage, json );
						_fnInitialise( oSettings );
					},
					error: function () {
						// Error occurred loading language file, continue on as best we can
						_fnInitialise( oSettings );
					}
				} );
				bInitHandedOff = true;
			}
			
			/*
			 * Stripes
			 */
			if ( oInit.asStripeClasses === null )
			{
				oSettings.asStripeClasses =[
					oClasses.sStripeOdd,
					oClasses.sStripeEven
				];
			}
			
			/* Remove row stripe classes if they are already on the table row */
			var stripeClasses = oSettings.asStripeClasses;
			var rowOne = $this.children('tbody').find('tr').eq(0);
			if ( $.inArray( true, $.map( stripeClasses, function(el, i) {
				return rowOne.hasClass(el);
			} ) ) !== -1 ) {
				$('tbody tr', this).removeClass( stripeClasses.join(' ') );
				oSettings.asDestroyStripes = stripeClasses.slice();
			}
			
			/*
			 * Columns
			 * See if we should load columns automatically or use defined ones
			 */
			var anThs = [];
			var aoColumnsInit;
			var nThead = this.getElementsByTagName('thead');
			if ( nThead.length !== 0 )
			{
				_fnDetectHeader( oSettings.aoHeader, nThead[0] );
				anThs = _fnGetUniqueThs( oSettings );
			}
			
			/* If not given a column array, generate one with nulls */
			if ( oInit.aoColumns === null )
			{
				aoColumnsInit = [];
				for ( i=0, iLen=anThs.length ; i<iLen ; i++ )
				{
					aoColumnsInit.push( null );
				}
			}
			else
			{
				aoColumnsInit = oInit.aoColumns;
			}
			
			/* Add the columns */
			for ( i=0, iLen=aoColumnsInit.length ; i<iLen ; i++ )
			{
				_fnAddColumn( oSettings, anThs ? anThs[i] : null );
			}
			
			/* Apply the column definitions */
			_fnApplyColumnDefs( oSettings, oInit.aoColumnDefs, aoColumnsInit, function (iCol, oDef) {
				_fnColumnOptions( oSettings, iCol, oDef );
			} );
			
			/* HTML5 attribute detection - build an mData object automatically if the
			 * attributes are found
			 */
			if ( rowOne.length ) {
				var a = function ( cell, name ) {
					return cell.getAttribute( 'data-'+name ) !== null ? name : null;
				};
			
				$( rowOne[0] ).children('th, td').each( function (i, cell) {
					var col = oSettings.aoColumns[i];
			
					if ( col.mData === i ) {
						var sort = a( cell, 'sort' ) || a( cell, 'order' );
						var filter = a( cell, 'filter' ) || a( cell, 'search' );
			
						if ( sort !== null || filter !== null ) {
							col.mData = {
								_:      i+'.display',
								sort:   sort !== null   ? i+'.@data-'+sort   : undefined,
								type:   sort !== null   ? i+'.@data-'+sort   : undefined,
								filter: filter !== null ? i+'.@data-'+filter : undefined
							};
			
							_fnColumnOptions( oSettings, i );
						}
					}
				} );
			}
			
			var features = oSettings.oFeatures;
			var loadedInit = function () {
				/*
				 * Sorting
				 * @todo For modularisation (1.11) this needs to do into a sort start up handler
				 */
			
				// If aaSorting is not defined, then we use the first indicator in asSorting
				// in case that has been altered, so the default sort reflects that option
				if ( oInit.aaSorting === undefined ) {
					var sorting = oSettings.aaSorting;
					for ( i=0, iLen=sorting.length ; i<iLen ; i++ ) {
						sorting[i][1] = oSettings.aoColumns[ i ].asSorting[0];
					}
				}
			
				/* Do a first pass on the sorting classes (allows any size changes to be taken into
				 * account, and also will apply sorting disabled classes if disabled
				 */
				_fnSortingClasses( oSettings );
			
				if ( features.bSort ) {
					_fnCallbackReg( oSettings, 'aoDrawCallback', function () {
						if ( oSettings.bSorted ) {
							var aSort = _fnSortFlatten( oSettings );
							var sortedColumns = {};
			
							$.each( aSort, function (i, val) {
								sortedColumns[ val.src ] = val.dir;
							} );
			
							_fnCallbackFire( oSettings, null, 'order', [oSettings, aSort, sortedColumns] );
							_fnSortAria( oSettings );
						}
					} );
				}
			
				_fnCallbackReg( oSettings, 'aoDrawCallback', function () {
					if ( oSettings.bSorted || _fnDataSource( oSettings ) === 'ssp' || features.bDeferRender ) {
						_fnSortingClasses( oSettings );
					}
				}, 'sc' );
			
			
				/*
				 * Final init
				 * Cache the header, body and footer as required, creating them if needed
				 */
			
				// Work around for Webkit bug 83867 - store the caption-side before removing from doc
				var captions = $this.children('caption').each( function () {
					this._captionSide = $(this).css('caption-side');
				} );
			
				var thead = $this.children('thead');
				if ( thead.length === 0 ) {
					thead = $('<thead/>').appendTo($this);
				}
				oSettings.nTHead = thead[0];
			
				var tbody = $this.children('tbody');
				if ( tbody.length === 0 ) {
					tbody = $('<tbody/>').appendTo($this);
				}
				oSettings.nTBody = tbody[0];
			
				var tfoot = $this.children('tfoot');
				if ( tfoot.length === 0 && captions.length > 0 && (oSettings.oScroll.sX !== "" || oSettings.oScroll.sY !== "") ) {
					// If we are a scrolling table, and no footer has been given, then we need to create
					// a tfoot element for the caption element to be appended to
					tfoot = $('<tfoot/>').appendTo($this);
				}
			
				if ( tfoot.length === 0 || tfoot.children().length === 0 ) {
					$this.addClass( oClasses.sNoFooter );
				}
				else if ( tfoot.length > 0 ) {
					oSettings.nTFoot = tfoot[0];
					_fnDetectHeader( oSettings.aoFooter, oSettings.nTFoot );
				}
			
				/* Check if there is data passing into the constructor */
				if ( oInit.aaData ) {
					for ( i=0 ; i<oInit.aaData.length ; i++ ) {
						_fnAddData( oSettings, oInit.aaData[ i ] );
					}
				}
				else if ( oSettings.bDeferLoading || _fnDataSource( oSettings ) == 'dom' ) {
					/* Grab the data from the page - only do this when deferred loading or no Ajax
					 * source since there is no point in reading the DOM data if we are then going
					 * to replace it with Ajax data
					 */
					_fnAddTr( oSettings, $(oSettings.nTBody).children('tr') );
				}
			
				/* Copy the data index array */
				oSettings.aiDisplay = oSettings.aiDisplayMaster.slice();
			
				/* Initialisation complete - table can be drawn */
				oSettings.bInitialised = true;
			
				/* Check if we need to initialise the table (it might not have been handed off to the
				 * language processor)
				 */
				if ( bInitHandedOff === false ) {
					_fnInitialise( oSettings );
				}
			};
			
			/* Must be done after everything which can be overridden by the state saving! */
			if ( oInit.bStateSave )
			{
				features.bStateSave = true;
				_fnCallbackReg( oSettings, 'aoDrawCallback', _fnSaveState, 'state_save' );
				_fnLoadState( oSettings, oInit, loadedInit );
			}
			else {
				loadedInit();
			}
			
		} );
		_that = null;
		return this;
	};

	
	/*
	 * It is useful to have variables which are scoped locally so only the
	 * DataTables functions can access them and they don't leak into global space.
	 * At the same time these functions are often useful over multiple files in the
	 * core and API, so we list, or at least document, all variables which are used
	 * by DataTables as private variables here. This also ensures that there is no
	 * clashing of variable names and that they can easily referenced for reuse.
	 */
	
	
	// Defined else where
	//  _selector_run
	//  _selector_opts
	//  _selector_first
	//  _selector_row_indexes
	
	var _ext; // DataTable.ext
	var _Api; // DataTable.Api
	var _api_register; // DataTable.Api.register
	var _api_registerPlural; // DataTable.Api.registerPlural
	
	var _re_dic = {};
	var _re_new_lines = /[\r\n\u2028]/g;
	var _re_html = /<.*?>/g;
	
	// This is not strict ISO8601 - Date.parse() is quite lax, although
	// implementations differ between browsers.
	var _re_date = /^\d{2,4}[\.\/\-]\d{1,2}[\.\/\-]\d{1,2}([T ]{1}\d{1,2}[:\.]\d{2}([\.:]\d{2})?)?$/;
	
	// Escape regular expression special characters
	var _re_escape_regex = new RegExp( '(\\' + [ '/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\', '$', '^', '-' ].join('|\\') + ')', 'g' );
	
	// http://en.wikipedia.org/wiki/Foreign_exchange_market
	// - \u20BD - Russian ruble.
	// - \u20a9 - South Korean Won
	// - \u20BA - Turkish Lira
	// - \u20B9 - Indian Rupee
	// - R - Brazil (R$) and South Africa
	// - fr - Swiss Franc
	// - kr - Swedish krona, Norwegian krone and Danish krone
	// - \u2009 is thin space and \u202F is narrow no-break space, both used in many
	// - Ƀ - Bitcoin
	// - Ξ - Ethereum
	//   standards as thousands separators.
	var _re_formatted_numeric = /[',$£€¥%\u2009\u202F\u20BD\u20a9\u20BArfkɃΞ]/gi;
	
	
	var _empty = function ( d ) {
		return !d || d === true || d === '-' ? true : false;
	};
	
	
	var _intVal = function ( s ) {
		var integer = parseInt( s, 10 );
		return !isNaN(integer) && isFinite(s) ? integer : null;
	};
	
	// Convert from a formatted number with characters other than `.` as the
	// decimal place, to a Javascript number
	var _numToDecimal = function ( num, decimalPoint ) {
		// Cache created regular expressions for speed as this function is called often
		if ( ! _re_dic[ decimalPoint ] ) {
			_re_dic[ decimalPoint ] = new RegExp( _fnEscapeRegex( decimalPoint ), 'g' );
		}
		return typeof num === 'string' && decimalPoint !== '.' ?
			num.replace( /\./g, '' ).replace( _re_dic[ decimalPoint ], '.' ) :
			num;
	};
	
	
	var _isNumber = function ( d, decimalPoint, formatted ) {
		var strType = typeof d === 'string';
	
		// If empty return immediately so there must be a number if it is a
		// formatted string (this stops the string "k", or "kr", etc being detected
		// as a formatted number for currency
		if ( _empty( d ) ) {
			return true;
		}
	
		if ( decimalPoint && strType ) {
			d = _numToDecimal( d, decimalPoint );
		}
	
		if ( formatted && strType ) {
			d = d.replace( _re_formatted_numeric, '' );
		}
	
		return !isNaN( parseFloat(d) ) && isFinite( d );
	};
	
	
	// A string without HTML in it can be considered to be HTML still
	var _isHtml = function ( d ) {
		return _empty( d ) || typeof d === 'string';
	};
	
	
	var _htmlNumeric = function ( d, decimalPoint, formatted ) {
		if ( _empty( d ) ) {
			return true;
		}
	
		var html = _isHtml( d );
		return ! html ?
			null :
			_isNumber( _stripHtml( d ), decimalPoint, formatted ) ?
				true :
				null;
	};
	
	
	var _pluck = function ( a, prop, prop2 ) {
		var out = [];
		var i=0, ien=a.length;
	
		// Could have the test in the loop for slightly smaller code, but speed
		// is essential here
		if ( prop2 !== undefined ) {
			for ( ; i<ien ; i++ ) {
				if ( a[i] && a[i][ prop ] ) {
					out.push( a[i][ prop ][ prop2 ] );
				}
			}
		}
		else {
			for ( ; i<ien ; i++ ) {
				if ( a[i] ) {
					out.push( a[i][ prop ] );
				}
			}
		}
	
		return out;
	};
	
	
	// Basically the same as _pluck, but rather than looping over `a` we use `order`
	// as the indexes to pick from `a`
	var _pluck_order = function ( a, order, prop, prop2 )
	{
		var out = [];
		var i=0, ien=order.length;
	
		// Could have the test in the loop for slightly smaller code, but speed
		// is essential here
		if ( prop2 !== undefined ) {
			for ( ; i<ien ; i++ ) {
				if ( a[ order[i] ][ prop ] ) {
					out.push( a[ order[i] ][ prop ][ prop2 ] );
				}
			}
		}
		else {
			for ( ; i<ien ; i++ ) {
				out.push( a[ order[i] ][ prop ] );
			}
		}
	
		return out;
	};
	
	
	var _range = function ( len, start )
	{
		var out = [];
		var end;
	
		if ( start === undefined ) {
			start = 0;
			end = len;
		}
		else {
			end = start;
			start = len;
		}
	
		for ( var i=start ; i<end ; i++ ) {
			out.push( i );
		}
	
		return out;
	};
	
	
	var _removeEmpty = function ( a )
	{
		var out = [];
	
		for ( var i=0, ien=a.length ; i<ien ; i++ ) {
			if ( a[i] ) { // careful - will remove all falsy values!
				out.push( a[i] );
			}
		}
	
		return out;
	};
	
	
	var _stripHtml = function ( d ) {
		return d.replace( _re_html, '' );
	};
	
	
	/**
	 * Determine if all values in the array are unique. This means we can short
	 * cut the _unique method at the cost of a single loop. A sorted array is used
	 * to easily check the values.
	 *
	 * @param  {array} src Source array
	 * @return {boolean} true if all unique, false otherwise
	 * @ignore
	 */
	var _areAllUnique = function ( src ) {
		if ( src.length < 2 ) {
			return true;
		}
	
		var sorted = src.slice().sort();
		var last = sorted[0];
	
		for ( var i=1, ien=sorted.length ; i<ien ; i++ ) {
			if ( sorted[i] === last ) {
				return false;
			}
	
			last = sorted[i];
		}
	
		return true;
	};
	
	
	/**
	 * Find the unique elements in a source array.
	 *
	 * @param  {array} src Source array
	 * @return {array} Array of unique items
	 * @ignore
	 */
	var _unique = function ( src )
	{
		if ( _areAllUnique( src ) ) {
			return src.slice();
		}
	
		// A faster unique method is to use object keys to identify used values,
		// but this doesn't work with arrays or objects, which we must also
		// consider. See jsperf.com/compare-array-unique-versions/4 for more
		// information.
		var
			out = [],
			val,
			i, ien=src.length,
			j, k=0;
	
		again: for ( i=0 ; i<ien ; i++ ) {
			val = src[i];
	
			for ( j=0 ; j<k ; j++ ) {
				if ( out[j] === val ) {
					continue again;
				}
			}
	
			out.push( val );
			k++;
		}
	
		return out;
	};
	
	
	/**
	 * DataTables utility methods
	 * 
	 * This namespace provides helper methods that DataTables uses internally to
	 * create a DataTable, but which are not exclusively used only for DataTables.
	 * These methods can be used by extension authors to save the duplication of
	 * code.
	 *
	 *  @namespace
	 */
	DataTable.util = {
		/**
		 * Throttle the calls to a function. Arguments and context are maintained
		 * for the throttled function.
		 *
		 * @param {function} fn Function to be called
		 * @param {integer} freq Call frequency in mS
		 * @return {function} Wrapped function
		 */
		throttle: function ( fn, freq ) {
			var
				frequency = freq !== undefined ? freq : 200,
				last,
				timer;
	
			return function () {
				var
					that = this,
					now  = +new Date(),
					args = arguments;
	
				if ( last && now < last + frequency ) {
					clearTimeout( timer );
	
					timer = setTimeout( function () {
						last = undefined;
						fn.apply( that, args );
					}, frequency );
				}
				else {
					last = now;
					fn.apply( that, args );
				}
			};
		},
	
	
		/**
		 * Escape a string such that it can be used in a regular expression
		 *
		 *  @param {string} val string to escape
		 *  @returns {string} escaped string
		 */
		escapeRegex: function ( val ) {
			return val.replace( _re_escape_regex, '\\$1' );
		}
	};
	
	
	
	/**
	 * Create a mapping object that allows camel case parameters to be looked up
	 * for their Hungarian counterparts. The mapping is stored in a private
	 * parameter called `_hungarianMap` which can be accessed on the source object.
	 *  @param {object} o
	 *  @memberof DataTable#oApi
	 */
	function _fnHungarianMap ( o )
	{
		var
			hungarian = 'a aa ai ao as b fn i m o s ',
			match,
			newKey,
			map = {};
	
		$.each( o, function (key, val) {
			match = key.match(/^([^A-Z]+?)([A-Z])/);
	
			if ( match && hungarian.indexOf(match[1]+' ') !== -1 )
			{
				newKey = key.replace( match[0], match[2].toLowerCase() );
				map[ newKey ] = key;
	
				if ( match[1] === 'o' )
				{
					_fnHungarianMap( o[key] );
				}
			}
		} );
	
		o._hungarianMap = map;
	}
	
	
	/**
	 * Convert from camel case parameters to Hungarian, based on a Hungarian map
	 * created by _fnHungarianMap.
	 *  @param {object} src The model object which holds all parameters that can be
	 *    mapped.
	 *  @param {object} user The object to convert from camel case to Hungarian.
	 *  @param {boolean} force When set to `true`, properties which already have a
	 *    Hungarian value in the `user` object will be overwritten. Otherwise they
	 *    won't be.
	 *  @memberof DataTable#oApi
	 */
	function _fnCamelToHungarian ( src, user, force )
	{
		if ( ! src._hungarianMap ) {
			_fnHungarianMap( src );
		}
	
		var hungarianKey;
	
		$.each( user, function (key, val) {
			hungarianKey = src._hungarianMap[ key ];
	
			if ( hungarianKey !== undefined && (force || user[hungarianKey] === undefined) )
			{
				// For objects, we need to buzz down into the object to copy parameters
				if ( hungarianKey.charAt(0) === 'o' )
				{
					// Copy the camelCase options over to the hungarian
					if ( ! user[ hungarianKey ] ) {
						user[ hungarianKey ] = {};
					}
					$.extend( true, user[hungarianKey], user[key] );
	
					_fnCamelToHungarian( src[hungarianKey], user[hungarianKey], force );
				}
				else {
					user[hungarianKey] = user[ key ];
				}
			}
		} );
	}
	
	
	/**
	 * Language compatibility - when certain options are given, and others aren't, we
	 * need to duplicate the values over, in order to provide backwards compatibility
	 * with older language files.
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnLanguageCompat( lang )
	{
		// Note the use of the Hungarian notation for the parameters in this method as
		// this is called after the mapping of camelCase to Hungarian
		var defaults = DataTable.defaults.oLanguage;
	
		// Default mapping
		var defaultDecimal = defaults.sDecimal;
		if ( defaultDecimal ) {
			_addNumericSort( defaultDecimal );
		}
	
		if ( lang ) {
			var zeroRecords = lang.sZeroRecords;
	
			// Backwards compatibility - if there is no sEmptyTable given, then use the same as
			// sZeroRecords - assuming that is given.
			if ( ! lang.sEmptyTable && zeroRecords &&
				defaults.sEmptyTable === "No data available in table" )
			{
				_fnMap( lang, lang, 'sZeroRecords', 'sEmptyTable' );
			}
	
			// Likewise with loading records
			if ( ! lang.sLoadingRecords && zeroRecords &&
				defaults.sLoadingRecords === "Loading..." )
			{
				_fnMap( lang, lang, 'sZeroRecords', 'sLoadingRecords' );
			}
	
			// Old parameter name of the thousands separator mapped onto the new
			if ( lang.sInfoThousands ) {
				lang.sThousands = lang.sInfoThousands;
			}
	
			var decimal = lang.sDecimal;
			if ( decimal && defaultDecimal !== decimal ) {
				_addNumericSort( decimal );
			}
		}
	}
	
	
	/**
	 * Map one parameter onto another
	 *  @param {object} o Object to map
	 *  @param {*} knew The new parameter name
	 *  @param {*} old The old parameter name
	 */
	var _fnCompatMap = function ( o, knew, old ) {
		if ( o[ knew ] !== undefined ) {
			o[ old ] = o[ knew ];
		}
	};
	
	
	/**
	 * Provide backwards compatibility for the main DT options. Note that the new
	 * options are mapped onto the old parameters, so this is an external interface
	 * change only.
	 *  @param {object} init Object to map
	 */
	function _fnCompatOpts ( init )
	{
		_fnCompatMap( init, 'ordering',      'bSort' );
		_fnCompatMap( init, 'orderMulti',    'bSortMulti' );
		_fnCompatMap( init, 'orderClasses',  'bSortClasses' );
		_fnCompatMap( init, 'orderCellsTop', 'bSortCellsTop' );
		_fnCompatMap( init, 'order',         'aaSorting' );
		_fnCompatMap( init, 'orderFixed',    'aaSortingFixed' );
		_fnCompatMap( init, 'paging',        'bPaginate' );
		_fnCompatMap( init, 'pagingType',    'sPaginationType' );
		_fnCompatMap( init, 'pageLength',    'iDisplayLength' );
		_fnCompatMap( init, 'searching',     'bFilter' );
	
		// Boolean initialisation of x-scrolling
		if ( typeof init.sScrollX === 'boolean' ) {
			init.sScrollX = init.sScrollX ? '100%' : '';
		}
		if ( typeof init.scrollX === 'boolean' ) {
			init.scrollX = init.scrollX ? '100%' : '';
		}
	
		// Column search objects are in an array, so it needs to be converted
		// element by element
		var searchCols = init.aoSearchCols;
	
		if ( searchCols ) {
			for ( var i=0, ien=searchCols.length ; i<ien ; i++ ) {
				if ( searchCols[i] ) {
					_fnCamelToHungarian( DataTable.models.oSearch, searchCols[i] );
				}
			}
		}
	}
	
	
	/**
	 * Provide backwards compatibility for column options. Note that the new options
	 * are mapped onto the old parameters, so this is an external interface change
	 * only.
	 *  @param {object} init Object to map
	 */
	function _fnCompatCols ( init )
	{
		_fnCompatMap( init, 'orderable',     'bSortable' );
		_fnCompatMap( init, 'orderData',     'aDataSort' );
		_fnCompatMap( init, 'orderSequence', 'asSorting' );
		_fnCompatMap( init, 'orderDataType', 'sortDataType' );
	
		// orderData can be given as an integer
		var dataSort = init.aDataSort;
		if ( typeof dataSort === 'number' && ! $.isArray( dataSort ) ) {
			init.aDataSort = [ dataSort ];
		}
	}
	
	
	/**
	 * Browser feature detection for capabilities, quirks
	 *  @param {object} settings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnBrowserDetect( settings )
	{
		// We don't need to do this every time DataTables is constructed, the values
		// calculated are specific to the browser and OS configuration which we
		// don't expect to change between initialisations
		if ( ! DataTable.__browser ) {
			var browser = {};
			DataTable.__browser = browser;
	
			// Scrolling feature / quirks detection
			var n = $('<div/>')
				.css( {
					position: 'fixed',
					top: 0,
					left: $(window).scrollLeft()*-1, // allow for scrolling
					height: 1,
					width: 1,
					overflow: 'hidden'
				} )
				.append(
					$('<div/>')
						.css( {
							position: 'absolute',
							top: 1,
							left: 1,
							width: 100,
							overflow: 'scroll'
						} )
						.append(
							$('<div/>')
								.css( {
									width: '100%',
									height: 10
								} )
						)
				)
				.appendTo( 'body' );
	
			var outer = n.children();
			var inner = outer.children();
	
			// Numbers below, in order, are:
			// inner.offsetWidth, inner.clientWidth, outer.offsetWidth, outer.clientWidth
			//
			// IE6 XP:                           100 100 100  83
			// IE7 Vista:                        100 100 100  83
			// IE 8+ Windows:                     83  83 100  83
			// Evergreen Windows:                 83  83 100  83
			// Evergreen Mac with scrollbars:     85  85 100  85
			// Evergreen Mac without scrollbars: 100 100 100 100
	
			// Get scrollbar width
			browser.barWidth = outer[0].offsetWidth - outer[0].clientWidth;
	
			// IE6/7 will oversize a width 100% element inside a scrolling element, to
			// include the width of the scrollbar, while other browsers ensure the inner
			// element is contained without forcing scrolling
			browser.bScrollOversize = inner[0].offsetWidth === 100 && outer[0].clientWidth !== 100;
	
			// In rtl text layout, some browsers (most, but not all) will place the
			// scrollbar on the left, rather than the right.
			browser.bScrollbarLeft = Math.round( inner.offset().left ) !== 1;
	
			// IE8- don't provide height and width for getBoundingClientRect
			browser.bBounding = n[0].getBoundingClientRect().width ? true : false;
	
			n.remove();
		}
	
		$.extend( settings.oBrowser, DataTable.__browser );
		settings.oScroll.iBarWidth = DataTable.__browser.barWidth;
	}
	
	
	/**
	 * Array.prototype reduce[Right] method, used for browsers which don't support
	 * JS 1.6. Done this way to reduce code size, since we iterate either way
	 *  @param {object} settings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnReduce ( that, fn, init, start, end, inc )
	{
		var
			i = start,
			value,
			isSet = false;
	
		if ( init !== undefined ) {
			value = init;
			isSet = true;
		}
	
		while ( i !== end ) {
			if ( ! that.hasOwnProperty(i) ) {
				continue;
			}
	
			value = isSet ?
				fn( value, that[i], i, that ) :
				that[i];
	
			isSet = true;
			i += inc;
		}
	
		return value;
	}
	
	/**
	 * Add a column to the list used for the table with default values
	 *  @param {object} oSettings dataTables settings object
	 *  @param {node} nTh The th element for this column
	 *  @memberof DataTable#oApi
	 */
	function _fnAddColumn( oSettings, nTh )
	{
		// Add column to aoColumns array
		var oDefaults = DataTable.defaults.column;
		var iCol = oSettings.aoColumns.length;
		var oCol = $.extend( {}, DataTable.models.oColumn, oDefaults, {
			"nTh": nTh ? nTh : document.createElement('th'),
			"sTitle":    oDefaults.sTitle    ? oDefaults.sTitle    : nTh ? nTh.innerHTML : '',
			"aDataSort": oDefaults.aDataSort ? oDefaults.aDataSort : [iCol],
			"mData": oDefaults.mData ? oDefaults.mData : iCol,
			idx: iCol
		} );
		oSettings.aoColumns.push( oCol );
	
		// Add search object for column specific search. Note that the `searchCols[ iCol ]`
		// passed into extend can be undefined. This allows the user to give a default
		// with only some of the parameters defined, and also not give a default
		var searchCols = oSettings.aoPreSearchCols;
		searchCols[ iCol ] = $.extend( {}, DataTable.models.oSearch, searchCols[ iCol ] );
	
		// Use the default column options function to initialise classes etc
		_fnColumnOptions( oSettings, iCol, $(nTh).data() );
	}
	
	
	/**
	 * Apply options for a column
	 *  @param {object} oSettings dataTables settings object
	 *  @param {int} iCol column index to consider
	 *  @param {object} oOptions object with sType, bVisible and bSearchable etc
	 *  @memberof DataTable#oApi
	 */
	function _fnColumnOptions( oSettings, iCol, oOptions )
	{
		var oCol = oSettings.aoColumns[ iCol ];
		var oClasses = oSettings.oClasses;
		var th = $(oCol.nTh);
	
		// Try to get width information from the DOM. We can't get it from CSS
		// as we'd need to parse the CSS stylesheet. `width` option can override
		if ( ! oCol.sWidthOrig ) {
			// Width attribute
			oCol.sWidthOrig = th.attr('width') || null;
	
			// Style attribute
			var t = (th.attr('style') || '').match(/width:\s*(\d+[pxem%]+)/);
			if ( t ) {
				oCol.sWidthOrig = t[1];
			}
		}
	
		/* User specified column options */
		if ( oOptions !== undefined && oOptions !== null )
		{
			// Backwards compatibility
			_fnCompatCols( oOptions );
	
			// Map camel case parameters to their Hungarian counterparts
			_fnCamelToHungarian( DataTable.defaults.column, oOptions, true );
	
			/* Backwards compatibility for mDataProp */
			if ( oOptions.mDataProp !== undefined && !oOptions.mData )
			{
				oOptions.mData = oOptions.mDataProp;
			}
	
			if ( oOptions.sType )
			{
				oCol._sManualType = oOptions.sType;
			}
	
			// `class` is a reserved word in Javascript, so we need to provide
			// the ability to use a valid name for the camel case input
			if ( oOptions.className && ! oOptions.sClass )
			{
				oOptions.sClass = oOptions.className;
			}
			if ( oOptions.sClass ) {
				th.addClass( oOptions.sClass );
			}
	
			$.extend( oCol, oOptions );
			_fnMap( oCol, oOptions, "sWidth", "sWidthOrig" );
	
			/* iDataSort to be applied (backwards compatibility), but aDataSort will take
			 * priority if defined
			 */
			if ( oOptions.iDataSort !== undefined )
			{
				oCol.aDataSort = [ oOptions.iDataSort ];
			}
			_fnMap( oCol, oOptions, "aDataSort" );
		}
	
		/* Cache the data get and set functions for speed */
		var mDataSrc = oCol.mData;
		var mData = _fnGetObjectDataFn( mDataSrc );
		var mRender = oCol.mRender ? _fnGetObjectDataFn( oCol.mRender ) : null;
	
		var attrTest = function( src ) {
			return typeof src === 'string' && src.indexOf('@') !== -1;
		};
		oCol._bAttrSrc = $.isPlainObject( mDataSrc ) && (
			attrTest(mDataSrc.sort) || attrTest(mDataSrc.type) || attrTest(mDataSrc.filter)
		);
		oCol._setter = null;
	
		oCol.fnGetData = function (rowData, type, meta) {
			var innerData = mData( rowData, type, undefined, meta );
	
			return mRender && type ?
				mRender( innerData, type, rowData, meta ) :
				innerData;
		};
		oCol.fnSetData = function ( rowData, val, meta ) {
			return _fnSetObjectDataFn( mDataSrc )( rowData, val, meta );
		};
	
		// Indicate if DataTables should read DOM data as an object or array
		// Used in _fnGetRowElements
		if ( typeof mDataSrc !== 'number' ) {
			oSettings._rowReadObject = true;
		}
	
		/* Feature sorting overrides column specific when off */
		if ( !oSettings.oFeatures.bSort )
		{
			oCol.bSortable = false;
			th.addClass( oClasses.sSortableNone ); // Have to add class here as order event isn't called
		}
	
		/* Check that the class assignment is correct for sorting */
		var bAsc = $.inArray('asc', oCol.asSorting) !== -1;
		var bDesc = $.inArray('desc', oCol.asSorting) !== -1;
		if ( !oCol.bSortable || (!bAsc && !bDesc) )
		{
			oCol.sSortingClass = oClasses.sSortableNone;
			oCol.sSortingClassJUI = "";
		}
		else if ( bAsc && !bDesc )
		{
			oCol.sSortingClass = oClasses.sSortableAsc;
			oCol.sSortingClassJUI = oClasses.sSortJUIAscAllowed;
		}
		else if ( !bAsc && bDesc )
		{
			oCol.sSortingClass = oClasses.sSortableDesc;
			oCol.sSortingClassJUI = oClasses.sSortJUIDescAllowed;
		}
		else
		{
			oCol.sSortingClass = oClasses.sSortable;
			oCol.sSortingClassJUI = oClasses.sSortJUI;
		}
	}
	
	
	/**
	 * Adjust the table column widths for new data. Note: you would probably want to
	 * do a redraw after calling this function!
	 *  @param {object} settings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnAdjustColumnSizing ( settings )
	{
		/* Not interested in doing column width calculation if auto-width is disabled */
		if ( settings.oFeatures.bAutoWidth !== false )
		{
			var columns = settings.aoColumns;
	
			_fnCalculateColumnWidths( settings );
			for ( var i=0 , iLen=columns.length ; i<iLen ; i++ )
			{
				columns[i].nTh.style.width = columns[i].sWidth;
			}
		}
	
		var scroll = settings.oScroll;
		if ( scroll.sY !== '' || scroll.sX !== '')
		{
			_fnScrollDraw( settings );
		}
	
		_fnCallbackFire( settings, null, 'column-sizing', [settings] );
	}
	
	
	/**
	 * Covert the index of a visible column to the index in the data array (take account
	 * of hidden columns)
	 *  @param {object} oSettings dataTables settings object
	 *  @param {int} iMatch Visible column index to lookup
	 *  @returns {int} i the data index
	 *  @memberof DataTable#oApi
	 */
	function _fnVisibleToColumnIndex( oSettings, iMatch )
	{
		var aiVis = _fnGetColumns( oSettings, 'bVisible' );
	
		return typeof aiVis[iMatch] === 'number' ?
			aiVis[iMatch] :
			null;
	}
	
	
	/**
	 * Covert the index of an index in the data array and convert it to the visible
	 *   column index (take account of hidden columns)
	 *  @param {int} iMatch Column index to lookup
	 *  @param {object} oSettings dataTables settings object
	 *  @returns {int} i the data index
	 *  @memberof DataTable#oApi
	 */
	function _fnColumnIndexToVisible( oSettings, iMatch )
	{
		var aiVis = _fnGetColumns( oSettings, 'bVisible' );
		var iPos = $.inArray( iMatch, aiVis );
	
		return iPos !== -1 ? iPos : null;
	}
	
	
	/**
	 * Get the number of visible columns
	 *  @param {object} oSettings dataTables settings object
	 *  @returns {int} i the number of visible columns
	 *  @memberof DataTable#oApi
	 */
	function _fnVisbleColumns( oSettings )
	{
		var vis = 0;
	
		// No reduce in IE8, use a loop for now
		$.each( oSettings.aoColumns, function ( i, col ) {
			if ( col.bVisible && $(col.nTh).css('display') !== 'none' ) {
				vis++;
			}
		} );
	
		return vis;
	}
	
	
	/**
	 * Get an array of column indexes that match a given property
	 *  @param {object} oSettings dataTables settings object
	 *  @param {string} sParam Parameter in aoColumns to look for - typically
	 *    bVisible or bSearchable
	 *  @returns {array} Array of indexes with matched properties
	 *  @memberof DataTable#oApi
	 */
	function _fnGetColumns( oSettings, sParam )
	{
		var a = [];
	
		$.map( oSettings.aoColumns, function(val, i) {
			if ( val[sParam] ) {
				a.push( i );
			}
		} );
	
		return a;
	}
	
	
	/**
	 * Calculate the 'type' of a column
	 *  @param {object} settings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnColumnTypes ( settings )
	{
		var columns = settings.aoColumns;
		var data = settings.aoData;
		var types = DataTable.ext.type.detect;
		var i, ien, j, jen, k, ken;
		var col, cell, detectedType, cache;
	
		// For each column, spin over the 
		for ( i=0, ien=columns.length ; i<ien ; i++ ) {
			col = columns[i];
			cache = [];
	
			if ( ! col.sType && col._sManualType ) {
				col.sType = col._sManualType;
			}
			else if ( ! col.sType ) {
				for ( j=0, jen=types.length ; j<jen ; j++ ) {
					for ( k=0, ken=data.length ; k<ken ; k++ ) {
						// Use a cache array so we only need to get the type data
						// from the formatter once (when using multiple detectors)
						if ( cache[k] === undefined ) {
							cache[k] = _fnGetCellData( settings, k, i, 'type' );
						}
	
						detectedType = types[j]( cache[k], settings );
	
						// If null, then this type can't apply to this column, so
						// rather than testing all cells, break out. There is an
						// exception for the last type which is `html`. We need to
						// scan all rows since it is possible to mix string and HTML
						// types
						if ( ! detectedType && j !== types.length-1 ) {
							break;
						}
	
						// Only a single match is needed for html type since it is
						// bottom of the pile and very similar to string
						if ( detectedType === 'html' ) {
							break;
						}
					}
	
					// Type is valid for all data points in the column - use this
					// type
					if ( detectedType ) {
						col.sType = detectedType;
						break;
					}
				}
	
				// Fall back - if no type was detected, always use string
				if ( ! col.sType ) {
					col.sType = 'string';
				}
			}
		}
	}
	
	
	/**
	 * Take the column definitions and static columns arrays and calculate how
	 * they relate to column indexes. The callback function will then apply the
	 * definition found for a column to a suitable configuration object.
	 *  @param {object} oSettings dataTables settings object
	 *  @param {array} aoColDefs The aoColumnDefs array that is to be applied
	 *  @param {array} aoCols The aoColumns array that defines columns individually
	 *  @param {function} fn Callback function - takes two parameters, the calculated
	 *    column index and the definition for that column.
	 *  @memberof DataTable#oApi
	 */
	function _fnApplyColumnDefs( oSettings, aoColDefs, aoCols, fn )
	{
		var i, iLen, j, jLen, k, kLen, def;
		var columns = oSettings.aoColumns;
	
		// Column definitions with aTargets
		if ( aoColDefs )
		{
			/* Loop over the definitions array - loop in reverse so first instance has priority */
			for ( i=aoColDefs.length-1 ; i>=0 ; i-- )
			{
				def = aoColDefs[i];
	
				/* Each definition can target multiple columns, as it is an array */
				var aTargets = def.targets !== undefined ?
					def.targets :
					def.aTargets;
	
				if ( ! $.isArray( aTargets ) )
				{
					aTargets = [ aTargets ];
				}
	
				for ( j=0, jLen=aTargets.length ; j<jLen ; j++ )
				{
					if ( typeof aTargets[j] === 'number' && aTargets[j] >= 0 )
					{
						/* Add columns that we don't yet know about */
						while( columns.length <= aTargets[j] )
						{
							_fnAddColumn( oSettings );
						}
	
						/* Integer, basic index */
						fn( aTargets[j], def );
					}
					else if ( typeof aTargets[j] === 'number' && aTargets[j] < 0 )
					{
						/* Negative integer, right to left column counting */
						fn( columns.length+aTargets[j], def );
					}
					else if ( typeof aTargets[j] === 'string' )
					{
						/* Class name matching on TH element */
						for ( k=0, kLen=columns.length ; k<kLen ; k++ )
						{
							if ( aTargets[j] == "_all" ||
							     $(columns[k].nTh).hasClass( aTargets[j] ) )
							{
								fn( k, def );
							}
						}
					}
				}
			}
		}
	
		// Statically defined columns array
		if ( aoCols )
		{
			for ( i=0, iLen=aoCols.length ; i<iLen ; i++ )
			{
				fn( i, aoCols[i] );
			}
		}
	}
	
	/**
	 * Add a data array to the table, creating DOM node etc. This is the parallel to
	 * _fnGatherData, but for adding rows from a Javascript source, rather than a
	 * DOM source.
	 *  @param {object} oSettings dataTables settings object
	 *  @param {array} aData data array to be added
	 *  @param {node} [nTr] TR element to add to the table - optional. If not given,
	 *    DataTables will create a row automatically
	 *  @param {array} [anTds] Array of TD|TH elements for the row - must be given
	 *    if nTr is.
	 *  @returns {int} >=0 if successful (index of new aoData entry), -1 if failed
	 *  @memberof DataTable#oApi
	 */
	function _fnAddData ( oSettings, aDataIn, nTr, anTds )
	{
		/* Create the object for storing information about this new row */
		var iRow = oSettings.aoData.length;
		var oData = $.extend( true, {}, DataTable.models.oRow, {
			src: nTr ? 'dom' : 'data',
			idx: iRow
		} );
	
		oData._aData = aDataIn;
		oSettings.aoData.push( oData );
	
		/* Create the cells */
		var nTd, sThisType;
		var columns = oSettings.aoColumns;
	
		// Invalidate the column types as the new data needs to be revalidated
		for ( var i=0, iLen=columns.length ; i<iLen ; i++ )
		{
			columns[i].sType = null;
		}
	
		/* Add to the display array */
		oSettings.aiDisplayMaster.push( iRow );
	
		var id = oSettings.rowIdFn( aDataIn );
		if ( id !== undefined ) {
			oSettings.aIds[ id ] = oData;
		}
	
		/* Create the DOM information, or register it if already present */
		if ( nTr || ! oSettings.oFeatures.bDeferRender )
		{
			_fnCreateTr( oSettings, iRow, nTr, anTds );
		}
	
		return iRow;
	}
	
	
	/**
	 * Add one or more TR elements to the table. Generally we'd expect to
	 * use this for reading data from a DOM sourced table, but it could be
	 * used for an TR element. Note that if a TR is given, it is used (i.e.
	 * it is not cloned).
	 *  @param {object} settings dataTables settings object
	 *  @param {array|node|jQuery} trs The TR element(s) to add to the table
	 *  @returns {array} Array of indexes for the added rows
	 *  @memberof DataTable#oApi
	 */
	function _fnAddTr( settings, trs )
	{
		var row;
	
		// Allow an individual node to be passed in
		if ( ! (trs instanceof $) ) {
			trs = $(trs);
		}
	
		return trs.map( function (i, el) {
			row = _fnGetRowElements( settings, el );
			return _fnAddData( settings, row.data, el, row.cells );
		} );
	}
	
	
	/**
	 * Take a TR element and convert it to an index in aoData
	 *  @param {object} oSettings dataTables settings object
	 *  @param {node} n the TR element to find
	 *  @returns {int} index if the node is found, null if not
	 *  @memberof DataTable#oApi
	 */
	function _fnNodeToDataIndex( oSettings, n )
	{
		return (n._DT_RowIndex!==undefined) ? n._DT_RowIndex : null;
	}
	
	
	/**
	 * Take a TD element and convert it into a column data index (not the visible index)
	 *  @param {object} oSettings dataTables settings object
	 *  @param {int} iRow The row number the TD/TH can be found in
	 *  @param {node} n The TD/TH element to find
	 *  @returns {int} index if the node is found, -1 if not
	 *  @memberof DataTable#oApi
	 */
	function _fnNodeToColumnIndex( oSettings, iRow, n )
	{
		return $.inArray( n, oSettings.aoData[ iRow ].anCells );
	}
	
	
	/**
	 * Get the data for a given cell from the internal cache, taking into account data mapping
	 *  @param {object} settings dataTables settings object
	 *  @param {int} rowIdx aoData row id
	 *  @param {int} colIdx Column index
	 *  @param {string} type data get type ('display', 'type' 'filter' 'sort')
	 *  @returns {*} Cell data
	 *  @memberof DataTable#oApi
	 */
	function _fnGetCellData( settings, rowIdx, colIdx, type )
	{
		var draw           = settings.iDraw;
		var col            = settings.aoColumns[colIdx];
		var rowData        = settings.aoData[rowIdx]._aData;
		var defaultContent = col.sDefaultContent;
		var cellData       = col.fnGetData( rowData, type, {
			settings: settings,
			row:      rowIdx,
			col:      colIdx
		} );
	
		if ( cellData === undefined ) {
			if ( settings.iDrawError != draw && defaultContent === null ) {
				_fnLog( settings, 0, "Requested unknown parameter "+
					(typeof col.mData=='function' ? '{function}' : "'"+col.mData+"'")+
					" for row "+rowIdx+", column "+colIdx, 4 );
				settings.iDrawError = draw;
			}
			return defaultContent;
		}
	
		// When the data source is null and a specific data type is requested (i.e.
		// not the original data), we can use default column data
		if ( (cellData === rowData || cellData === null) && defaultContent !== null && type !== undefined ) {
			cellData = defaultContent;
		}
		else if ( typeof cellData === 'function' ) {
			// If the data source is a function, then we run it and use the return,
			// executing in the scope of the data object (for instances)
			return cellData.call( rowData );
		}
	
		if ( cellData === null && type == 'display' ) {
			return '';
		}
		return cellData;
	}
	
	
	/**
	 * Set the value for a specific cell, into the internal data cache
	 *  @param {object} settings dataTables settings object
	 *  @param {int} rowIdx aoData row id
	 *  @param {int} colIdx Column index
	 *  @param {*} val Value to set
	 *  @memberof DataTable#oApi
	 */
	function _fnSetCellData( settings, rowIdx, colIdx, val )
	{
		var col     = settings.aoColumns[colIdx];
		var rowData = settings.aoData[rowIdx]._aData;
	
		col.fnSetData( rowData, val, {
			settings: settings,
			row:      rowIdx,
			col:      colIdx
		}  );
	}
	
	
	// Private variable that is used to match action syntax in the data property object
	var __reArray = /\[.*?\]$/;
	var __reFn = /\(\)$/;
	
	/**
	 * Split string on periods, taking into account escaped periods
	 * @param  {string} str String to split
	 * @return {array} Split string
	 */
	function _fnSplitObjNotation( str )
	{
		return $.map( str.match(/(\\.|[^\.])+/g) || [''], function ( s ) {
			return s.replace(/\\\./g, '.');
		} );
	}
	
	
	/**
	 * Return a function that can be used to get data from a source object, taking
	 * into account the ability to use nested objects as a source
	 *  @param {string|int|function} mSource The data source for the object
	 *  @returns {function} Data get function
	 *  @memberof DataTable#oApi
	 */
	function _fnGetObjectDataFn( mSource )
	{
		if ( $.isPlainObject( mSource ) )
		{
			/* Build an object of get functions, and wrap them in a single call */
			var o = {};
			$.each( mSource, function (key, val) {
				if ( val ) {
					o[key] = _fnGetObjectDataFn( val );
				}
			} );
	
			return function (data, type, row, meta) {
				var t = o[type] || o._;
				return t !== undefined ?
					t(data, type, row, meta) :
					data;
			};
		}
		else if ( mSource === null )
		{
			/* Give an empty string for rendering / sorting etc */
			return function (data) { // type, row and meta also passed, but not used
				return data;
			};
		}
		else if ( typeof mSource === 'function' )
		{
			return function (data, type, row, meta) {
				return mSource( data, type, row, meta );
			};
		}
		else if ( typeof mSource === 'string' && (mSource.indexOf('.') !== -1 ||
			      mSource.indexOf('[') !== -1 || mSource.indexOf('(') !== -1) )
		{
			/* If there is a . in the source string then the data source is in a
			 * nested object so we loop over the data for each level to get the next
			 * level down. On each loop we test for undefined, and if found immediately
			 * return. This allows entire objects to be missing and sDefaultContent to
			 * be used if defined, rather than throwing an error
			 */
			var fetchData = function (data, type, src) {
				var arrayNotation, funcNotation, out, innerSrc;
	
				if ( src !== "" )
				{
					var a = _fnSplitObjNotation( src );
	
					for ( var i=0, iLen=a.length ; i<iLen ; i++ )
					{
						// Check if we are dealing with special notation
						arrayNotation = a[i].match(__reArray);
						funcNotation = a[i].match(__reFn);
	
						if ( arrayNotation )
						{
							// Array notation
							a[i] = a[i].replace(__reArray, '');
	
							// Condition allows simply [] to be passed in
							if ( a[i] !== "" ) {
								data = data[ a[i] ];
							}
							out = [];
	
							// Get the remainder of the nested object to get
							a.splice( 0, i+1 );
							innerSrc = a.join('.');
	
							// Traverse each entry in the array getting the properties requested
							if ( $.isArray( data ) ) {
								for ( var j=0, jLen=data.length ; j<jLen ; j++ ) {
									out.push( fetchData( data[j], type, innerSrc ) );
								}
							}
	
							// If a string is given in between the array notation indicators, that
							// is used to join the strings together, otherwise an array is returned
							var join = arrayNotation[0].substring(1, arrayNotation[0].length-1);
							data = (join==="") ? out : out.join(join);
	
							// The inner call to fetchData has already traversed through the remainder
							// of the source requested, so we exit from the loop
							break;
						}
						else if ( funcNotation )
						{
							// Function call
							a[i] = a[i].replace(__reFn, '');
							data = data[ a[i] ]();
							continue;
						}
	
						if ( data === null || data[ a[i] ] === undefined )
						{
							return undefined;
						}
						data = data[ a[i] ];
					}
				}
	
				return data;
			};
	
			return function (data, type) { // row and meta also passed, but not used
				return fetchData( data, type, mSource );
			};
		}
		else
		{
			/* Array or flat object mapping */
			return function (data, type) { // row and meta also passed, but not used
				return data[mSource];
			};
		}
	}
	
	
	/**
	 * Return a function that can be used to set data from a source object, taking
	 * into account the ability to use nested objects as a source
	 *  @param {string|int|function} mSource The data source for the object
	 *  @returns {function} Data set function
	 *  @memberof DataTable#oApi
	 */
	function _fnSetObjectDataFn( mSource )
	{
		if ( $.isPlainObject( mSource ) )
		{
			/* Unlike get, only the underscore (global) option is used for for
			 * setting data since we don't know the type here. This is why an object
			 * option is not documented for `mData` (which is read/write), but it is
			 * for `mRender` which is read only.
			 */
			return _fnSetObjectDataFn( mSource._ );
		}
		else if ( mSource === null )
		{
			/* Nothing to do when the data source is null */
			return function () {};
		}
		else if ( typeof mSource === 'function' )
		{
			return function (data, val, meta) {
				mSource( data, 'set', val, meta );
			};
		}
		else if ( typeof mSource === 'string' && (mSource.indexOf('.') !== -1 ||
			      mSource.indexOf('[') !== -1 || mSource.indexOf('(') !== -1) )
		{
			/* Like the get, we need to get data from a nested object */
			var setData = function (data, val, src) {
				var a = _fnSplitObjNotation( src ), b;
				var aLast = a[a.length-1];
				var arrayNotation, funcNotation, o, innerSrc;
	
				for ( var i=0, iLen=a.length-1 ; i<iLen ; i++ )
				{
					// Check if we are dealing with an array notation request
					arrayNotation = a[i].match(__reArray);
					funcNotation = a[i].match(__reFn);
	
					if ( arrayNotation )
					{
						a[i] = a[i].replace(__reArray, '');
						data[ a[i] ] = [];
	
						// Get the remainder of the nested object to set so we can recurse
						b = a.slice();
						b.splice( 0, i+1 );
						innerSrc = b.join('.');
	
						// Traverse each entry in the array setting the properties requested
						if ( $.isArray( val ) )
						{
							for ( var j=0, jLen=val.length ; j<jLen ; j++ )
							{
								o = {};
								setData( o, val[j], innerSrc );
								data[ a[i] ].push( o );
							}
						}
						else
						{
							// We've been asked to save data to an array, but it
							// isn't array data to be saved. Best that can be done
							// is to just save the value.
							data[ a[i] ] = val;
						}
	
						// The inner call to setData has already traversed through the remainder
						// of the source and has set the data, thus we can exit here
						return;
					}
					else if ( funcNotation )
					{
						// Function call
						a[i] = a[i].replace(__reFn, '');
						data = data[ a[i] ]( val );
					}
	
					// If the nested object doesn't currently exist - since we are
					// trying to set the value - create it
					if ( data[ a[i] ] === null || data[ a[i] ] === undefined )
					{
						data[ a[i] ] = {};
					}
					data = data[ a[i] ];
				}
	
				// Last item in the input - i.e, the actual set
				if ( aLast.match(__reFn ) )
				{
					// Function call
					data = data[ aLast.replace(__reFn, '') ]( val );
				}
				else
				{
					// If array notation is used, we just want to strip it and use the property name
					// and assign the value. If it isn't used, then we get the result we want anyway
					data[ aLast.replace(__reArray, '') ] = val;
				}
			};
	
			return function (data, val) { // meta is also passed in, but not used
				return setData( data, val, mSource );
			};
		}
		else
		{
			/* Array or flat object mapping */
			return function (data, val) { // meta is also passed in, but not used
				data[mSource] = val;
			};
		}
	}
	
	
	/**
	 * Return an array with the full table data
	 *  @param {object} oSettings dataTables settings object
	 *  @returns array {array} aData Master data array
	 *  @memberof DataTable#oApi
	 */
	function _fnGetDataMaster ( settings )
	{
		return _pluck( settings.aoData, '_aData' );
	}
	
	
	/**
	 * Nuke the table
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnClearTable( settings )
	{
		settings.aoData.length = 0;
		settings.aiDisplayMaster.length = 0;
		settings.aiDisplay.length = 0;
		settings.aIds = {};
	}
	
	
	 /**
	 * Take an array of integers (index array) and remove a target integer (value - not
	 * the key!)
	 *  @param {array} a Index array to target
	 *  @param {int} iTarget value to find
	 *  @memberof DataTable#oApi
	 */
	function _fnDeleteIndex( a, iTarget, splice )
	{
		var iTargetIndex = -1;
	
		for ( var i=0, iLen=a.length ; i<iLen ; i++ )
		{
			if ( a[i] == iTarget )
			{
				iTargetIndex = i;
			}
			else if ( a[i] > iTarget )
			{
				a[i]--;
			}
		}
	
		if ( iTargetIndex != -1 && splice === undefined )
		{
			a.splice( iTargetIndex, 1 );
		}
	}
	
	
	/**
	 * Mark cached data as invalid such that a re-read of the data will occur when
	 * the cached data is next requested. Also update from the data source object.
	 *
	 * @param {object} settings DataTables settings object
	 * @param {int}    rowIdx   Row index to invalidate
	 * @param {string} [src]    Source to invalidate from: undefined, 'auto', 'dom'
	 *     or 'data'
	 * @param {int}    [colIdx] Column index to invalidate. If undefined the whole
	 *     row will be invalidated
	 * @memberof DataTable#oApi
	 *
	 * @todo For the modularisation of v1.11 this will need to become a callback, so
	 *   the sort and filter methods can subscribe to it. That will required
	 *   initialisation options for sorting, which is why it is not already baked in
	 */
	function _fnInvalidate( settings, rowIdx, src, colIdx )
	{
		var row = settings.aoData[ rowIdx ];
		var i, ien;
		var cellWrite = function ( cell, col ) {
			// This is very frustrating, but in IE if you just write directly
			// to innerHTML, and elements that are overwritten are GC'ed,
			// even if there is a reference to them elsewhere
			while ( cell.childNodes.length ) {
				cell.removeChild( cell.firstChild );
			}
	
			cell.innerHTML = _fnGetCellData( settings, rowIdx, col, 'display' );
		};
	
		// Are we reading last data from DOM or the data object?
		if ( src === 'dom' || ((! src || src === 'auto') && row.src === 'dom') ) {
			// Read the data from the DOM
			row._aData = _fnGetRowElements(
					settings, row, colIdx, colIdx === undefined ? undefined : row._aData
				)
				.data;
		}
		else {
			// Reading from data object, update the DOM
			var cells = row.anCells;
	
			if ( cells ) {
				if ( colIdx !== undefined ) {
					cellWrite( cells[colIdx], colIdx );
				}
				else {
					for ( i=0, ien=cells.length ; i<ien ; i++ ) {
						cellWrite( cells[i], i );
					}
				}
			}
		}
	
		// For both row and cell invalidation, the cached data for sorting and
		// filtering is nulled out
		row._aSortData = null;
		row._aFilterData = null;
	
		// Invalidate the type for a specific column (if given) or all columns since
		// the data might have changed
		var cols = settings.aoColumns;
		if ( colIdx !== undefined ) {
			cols[ colIdx ].sType = null;
		}
		else {
			for ( i=0, ien=cols.length ; i<ien ; i++ ) {
				cols[i].sType = null;
			}
	
			// Update DataTables special `DT_*` attributes for the row
			_fnRowAttributes( settings, row );
		}
	}
	
	
	/**
	 * Build a data source object from an HTML row, reading the contents of the
	 * cells that are in the row.
	 *
	 * @param {object} settings DataTables settings object
	 * @param {node|object} TR element from which to read data or existing row
	 *   object from which to re-read the data from the cells
	 * @param {int} [colIdx] Optional column index
	 * @param {array|object} [d] Data source object. If `colIdx` is given then this
	 *   parameter should also be given and will be used to write the data into.
	 *   Only the column in question will be written
	 * @returns {object} Object with two parameters: `data` the data read, in
	 *   document order, and `cells` and array of nodes (they can be useful to the
	 *   caller, so rather than needing a second traversal to get them, just return
	 *   them from here).
	 * @memberof DataTable#oApi
	 */
	function _fnGetRowElements( settings, row, colIdx, d )
	{
		var
			tds = [],
			td = row.firstChild,
			name, col, o, i=0, contents,
			columns = settings.aoColumns,
			objectRead = settings._rowReadObject;
	
		// Allow the data object to be passed in, or construct
		d = d !== undefined ?
			d :
			objectRead ?
				{} :
				[];
	
		var attr = function ( str, td  ) {
			if ( typeof str === 'string' ) {
				var idx = str.indexOf('@');
	
				if ( idx !== -1 ) {
					var attr = str.substring( idx+1 );
					var setter = _fnSetObjectDataFn( str );
					setter( d, td.getAttribute( attr ) );
				}
			}
		};
	
		// Read data from a cell and store into the data object
		var cellProcess = function ( cell ) {
			if ( colIdx === undefined || colIdx === i ) {
				col = columns[i];
				contents = $.trim(cell.innerHTML);
	
				if ( col && col._bAttrSrc ) {
					var setter = _fnSetObjectDataFn( col.mData._ );
					setter( d, contents );
	
					attr( col.mData.sort, cell );
					attr( col.mData.type, cell );
					attr( col.mData.filter, cell );
				}
				else {
					// Depending on the `data` option for the columns the data can
					// be read to either an object or an array.
					if ( objectRead ) {
						if ( ! col._setter ) {
							// Cache the setter function
							col._setter = _fnSetObjectDataFn( col.mData );
						}
						col._setter( d, contents );
					}
					else {
						d[i] = contents;
					}
				}
			}
	
			i++;
		};
	
		if ( td ) {
			// `tr` element was passed in
			while ( td ) {
				name = td.nodeName.toUpperCase();
	
				if ( name == "TD" || name == "TH" ) {
					cellProcess( td );
					tds.push( td );
				}
	
				td = td.nextSibling;
			}
		}
		else {
			// Existing row object passed in
			tds = row.anCells;
	
			for ( var j=0, jen=tds.length ; j<jen ; j++ ) {
				cellProcess( tds[j] );
			}
		}
	
		// Read the ID from the DOM if present
		var rowNode = row.firstChild ? row : row.nTr;
	
		if ( rowNode ) {
			var id = rowNode.getAttribute( 'id' );
	
			if ( id ) {
				_fnSetObjectDataFn( settings.rowId )( d, id );
			}
		}
	
		return {
			data: d,
			cells: tds
		};
	}
	/**
	 * Create a new TR element (and it's TD children) for a row
	 *  @param {object} oSettings dataTables settings object
	 *  @param {int} iRow Row to consider
	 *  @param {node} [nTrIn] TR element to add to the table - optional. If not given,
	 *    DataTables will create a row automatically
	 *  @param {array} [anTds] Array of TD|TH elements for the row - must be given
	 *    if nTr is.
	 *  @memberof DataTable#oApi
	 */
	function _fnCreateTr ( oSettings, iRow, nTrIn, anTds )
	{
		var
			row = oSettings.aoData[iRow],
			rowData = row._aData,
			cells = [],
			nTr, nTd, oCol,
			i, iLen, create;
	
		if ( row.nTr === null )
		{
			nTr = nTrIn || document.createElement('tr');
	
			row.nTr = nTr;
			row.anCells = cells;
	
			/* Use a private property on the node to allow reserve mapping from the node
			 * to the aoData array for fast look up
			 */
			nTr._DT_RowIndex = iRow;
	
			/* Special parameters can be given by the data source to be used on the row */
			_fnRowAttributes( oSettings, row );
	
			/* Process each column */
			for ( i=0, iLen=oSettings.aoColumns.length ; i<iLen ; i++ )
			{
				oCol = oSettings.aoColumns[i];
				create = nTrIn ? false : true;
	
				nTd = create ? document.createElement( oCol.sCellType ) : anTds[i];
				nTd._DT_CellIndex = {
					row: iRow,
					column: i
				};
				
				cells.push( nTd );
	
				// Need to create the HTML if new, or if a rendering function is defined
				if ( create || ((!nTrIn || oCol.mRender || oCol.mData !== i) &&
					 (!$.isPlainObject(oCol.mData) || oCol.mData._ !== i+'.display')
				)) {
					nTd.innerHTML = _fnGetCellData( oSettings, iRow, i, 'display' );
				}
	
				/* Add user defined class */
				if ( oCol.sClass )
				{
					nTd.className += ' '+oCol.sClass;
				}
	
				// Visibility - add or remove as required
				if ( oCol.bVisible && ! nTrIn )
				{
					nTr.appendChild( nTd );
				}
				else if ( ! oCol.bVisible && nTrIn )
				{
					nTd.parentNode.removeChild( nTd );
				}
	
				if ( oCol.fnCreatedCell )
				{
					oCol.fnCreatedCell.call( oSettings.oInstance,
						nTd, _fnGetCellData( oSettings, iRow, i ), rowData, iRow, i
					);
				}
			}
	
			_fnCallbackFire( oSettings, 'aoRowCreatedCallback', null, [nTr, rowData, iRow, cells] );
		}
	
		// Remove once webkit bug 131819 and Chromium bug 365619 have been resolved
		// and deployed
		row.nTr.setAttribute( 'role', 'row' );
	}
	
	
	/**
	 * Add attributes to a row based on the special `DT_*` parameters in a data
	 * source object.
	 *  @param {object} settings DataTables settings object
	 *  @param {object} DataTables row object for the row to be modified
	 *  @memberof DataTable#oApi
	 */
	function _fnRowAttributes( settings, row )
	{
		var tr = row.nTr;
		var data = row._aData;
	
		if ( tr ) {
			var id = settings.rowIdFn( data );
	
			if ( id ) {
				tr.id = id;
			}
	
			if ( data.DT_RowClass ) {
				// Remove any classes added by DT_RowClass before
				var a = data.DT_RowClass.split(' ');
				row.__rowc = row.__rowc ?
					_unique( row.__rowc.concat( a ) ) :
					a;
	
				$(tr)
					.removeClass( row.__rowc.join(' ') )
					.addClass( data.DT_RowClass );
			}
	
			if ( data.DT_RowAttr ) {
				$(tr).attr( data.DT_RowAttr );
			}
	
			if ( data.DT_RowData ) {
				$(tr).data( data.DT_RowData );
			}
		}
	}
	
	
	/**
	 * Create the HTML header for the table
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnBuildHead( oSettings )
	{
		var i, ien, cell, row, column;
		var thead = oSettings.nTHead;
		var tfoot = oSettings.nTFoot;
		var createHeader = $('th, td', thead).length === 0;
		var classes = oSettings.oClasses;
		var columns = oSettings.aoColumns;
	
		if ( createHeader ) {
			row = $('<tr/>').appendTo( thead );
		}
	
		for ( i=0, ien=columns.length ; i<ien ; i++ ) {
			column = columns[i];
			cell = $( column.nTh ).addClass( column.sClass );
	
			if ( createHeader ) {
				cell.appendTo( row );
			}
	
			// 1.11 move into sorting
			if ( oSettings.oFeatures.bSort ) {
				cell.addClass( column.sSortingClass );
	
				if ( column.bSortable !== false ) {
					cell
						.attr( 'tabindex', oSettings.iTabIndex )
						.attr( 'aria-controls', oSettings.sTableId );
	
					_fnSortAttachListener( oSettings, column.nTh, i );
				}
			}
	
			if ( column.sTitle != cell[0].innerHTML ) {
				cell.html( column.sTitle );
			}
	
			_fnRenderer( oSettings, 'header' )(
				oSettings, cell, column, classes
			);
		}
	
		if ( createHeader ) {
			_fnDetectHeader( oSettings.aoHeader, thead );
		}
		
		/* ARIA role for the rows */
	 	$(thead).find('>tr').attr('role', 'row');
	
		/* Deal with the footer - add classes if required */
		$(thead).find('>tr>th, >tr>td').addClass( classes.sHeaderTH );
		$(tfoot).find('>tr>th, >tr>td').addClass( classes.sFooterTH );
	
		// Cache the footer cells. Note that we only take the cells from the first
		// row in the footer. If there is more than one row the user wants to
		// interact with, they need to use the table().foot() method. Note also this
		// allows cells to be used for multiple columns using colspan
		if ( tfoot !== null ) {
			var cells = oSettings.aoFooter[0];
	
			for ( i=0, ien=cells.length ; i<ien ; i++ ) {
				column = columns[i];
				column.nTf = cells[i].cell;
	
				if ( column.sClass ) {
					$(column.nTf).addClass( column.sClass );
				}
			}
		}
	}
	
	
	/**
	 * Draw the header (or footer) element based on the column visibility states. The
	 * methodology here is to use the layout array from _fnDetectHeader, modified for
	 * the instantaneous column visibility, to construct the new layout. The grid is
	 * traversed over cell at a time in a rows x columns grid fashion, although each
	 * cell insert can cover multiple elements in the grid - which is tracks using the
	 * aApplied array. Cell inserts in the grid will only occur where there isn't
	 * already a cell in that position.
	 *  @param {object} oSettings dataTables settings object
	 *  @param array {objects} aoSource Layout array from _fnDetectHeader
	 *  @param {boolean} [bIncludeHidden=false] If true then include the hidden columns in the calc,
	 *  @memberof DataTable#oApi
	 */
	function _fnDrawHead( oSettings, aoSource, bIncludeHidden )
	{
		var i, iLen, j, jLen, k, kLen, n, nLocalTr;
		var aoLocal = [];
		var aApplied = [];
		var iColumns = oSettings.aoColumns.length;
		var iRowspan, iColspan;
	
		if ( ! aoSource )
		{
			return;
		}
	
		if (  bIncludeHidden === undefined )
		{
			bIncludeHidden = false;
		}
	
		/* Make a copy of the master layout array, but without the visible columns in it */
		for ( i=0, iLen=aoSource.length ; i<iLen ; i++ )
		{
			aoLocal[i] = aoSource[i].slice();
			aoLocal[i].nTr = aoSource[i].nTr;
	
			/* Remove any columns which are currently hidden */
			for ( j=iColumns-1 ; j>=0 ; j-- )
			{
				if ( !oSettings.aoColumns[j].bVisible && !bIncludeHidden )
				{
					aoLocal[i].splice( j, 1 );
				}
			}
	
			/* Prep the applied array - it needs an element for each row */
			aApplied.push( [] );
		}
	
		for ( i=0, iLen=aoLocal.length ; i<iLen ; i++ )
		{
			nLocalTr = aoLocal[i].nTr;
	
			/* All cells are going to be replaced, so empty out the row */
			if ( nLocalTr )
			{
				while( (n = nLocalTr.firstChild) )
				{
					nLocalTr.removeChild( n );
				}
			}
	
			for ( j=0, jLen=aoLocal[i].length ; j<jLen ; j++ )
			{
				iRowspan = 1;
				iColspan = 1;
	
				/* Check to see if there is already a cell (row/colspan) covering our target
				 * insert point. If there is, then there is nothing to do.
				 */
				if ( aApplied[i][j] === undefined )
				{
					nLocalTr.appendChild( aoLocal[i][j].cell );
					aApplied[i][j] = 1;
	
					/* Expand the cell to cover as many rows as needed */
					while ( aoLocal[i+iRowspan] !== undefined &&
					        aoLocal[i][j].cell == aoLocal[i+iRowspan][j].cell )
					{
						aApplied[i+iRowspan][j] = 1;
						iRowspan++;
					}
	
					/* Expand the cell to cover as many columns as needed */
					while ( aoLocal[i][j+iColspan] !== undefined &&
					        aoLocal[i][j].cell == aoLocal[i][j+iColspan].cell )
					{
						/* Must update the applied array over the rows for the columns */
						for ( k=0 ; k<iRowspan ; k++ )
						{
							aApplied[i+k][j+iColspan] = 1;
						}
						iColspan++;
					}
	
					/* Do the actual expansion in the DOM */
					$(aoLocal[i][j].cell)
						.attr('rowspan', iRowspan)
						.attr('colspan', iColspan);
				}
			}
		}
	}
	
	
	/**
	 * Insert the required TR nodes into the table for display
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnDraw( oSettings )
	{
		/* Provide a pre-callback function which can be used to cancel the draw is false is returned */
		var aPreDraw = _fnCallbackFire( oSettings, 'aoPreDrawCallback', 'preDraw', [oSettings] );
		if ( $.inArray( false, aPreDraw ) !== -1 )
		{
			_fnProcessingDisplay( oSettings, false );
			return;
		}
	
		var i, iLen, n;
		var anRows = [];
		var iRowCount = 0;
		var asStripeClasses = oSettings.asStripeClasses;
		var iStripes = asStripeClasses.length;
		var iOpenRows = oSettings.aoOpenRows.length;
		var oLang = oSettings.oLanguage;
		var iInitDisplayStart = oSettings.iInitDisplayStart;
		var bServerSide = _fnDataSource( oSettings ) == 'ssp';
		var aiDisplay = oSettings.aiDisplay;
	
		oSettings.bDrawing = true;
	
		/* Check and see if we have an initial draw position from state saving */
		if ( iInitDisplayStart !== undefined && iInitDisplayStart !== -1 )
		{
			oSettings._iDisplayStart = bServerSide ?
				iInitDisplayStart :
				iInitDisplayStart >= oSettings.fnRecordsDisplay() ?
					0 :
					iInitDisplayStart;
	
			oSettings.iInitDisplayStart = -1;
		}
	
		var iDisplayStart = oSettings._iDisplayStart;
		var iDisplayEnd = oSettings.fnDisplayEnd();
	
		/* Server-side processing draw intercept */
		if ( oSettings.bDeferLoading )
		{
			oSettings.bDeferLoading = false;
			oSettings.iDraw++;
			_fnProcessingDisplay( oSettings, false );
		}
		else if ( !bServerSide )
		{
			oSettings.iDraw++;
		}
		else if ( !oSettings.bDestroying && !_fnAjaxUpdate( oSettings ) )
		{
			return;
		}
	
		if ( aiDisplay.length !== 0 )
		{
			var iStart = bServerSide ? 0 : iDisplayStart;
			var iEnd = bServerSide ? oSettings.aoData.length : iDisplayEnd;
	
			for ( var j=iStart ; j<iEnd ; j++ )
			{
				var iDataIndex = aiDisplay[j];
				var aoData = oSettings.aoData[ iDataIndex ];
				if ( aoData.nTr === null )
				{
					_fnCreateTr( oSettings, iDataIndex );
				}
	
				var nRow = aoData.nTr;
	
				/* Remove the old striping classes and then add the new one */
				if ( iStripes !== 0 )
				{
					var sStripe = asStripeClasses[ iRowCount % iStripes ];
					if ( aoData._sRowStripe != sStripe )
					{
						$(nRow).removeClass( aoData._sRowStripe ).addClass( sStripe );
						aoData._sRowStripe = sStripe;
					}
				}
	
				// Row callback functions - might want to manipulate the row
				// iRowCount and j are not currently documented. Are they at all
				// useful?
				_fnCallbackFire( oSettings, 'aoRowCallback', null,
					[nRow, aoData._aData, iRowCount, j, iDataIndex] );
	
				anRows.push( nRow );
				iRowCount++;
			}
		}
		else
		{
			/* Table is empty - create a row with an empty message in it */
			var sZero = oLang.sZeroRecords;
			if ( oSettings.iDraw == 1 &&  _fnDataSource( oSettings ) == 'ajax' )
			{
				sZero = oLang.sLoadingRecords;
			}
			else if ( oLang.sEmptyTable && oSettings.fnRecordsTotal() === 0 )
			{
				sZero = oLang.sEmptyTable;
			}
	
			anRows[ 0 ] = $( '<tr/>', { 'class': iStripes ? asStripeClasses[0] : '' } )
				.append( $('<td />', {
					'valign':  'top',
					'colSpan': _fnVisbleColumns( oSettings ),
					'class':   oSettings.oClasses.sRowEmpty
				} ).html( sZero ) )[0];
		}
	
		/* Header and footer callbacks */
		_fnCallbackFire( oSettings, 'aoHeaderCallback', 'header', [ $(oSettings.nTHead).children('tr')[0],
			_fnGetDataMaster( oSettings ), iDisplayStart, iDisplayEnd, aiDisplay ] );
	
		_fnCallbackFire( oSettings, 'aoFooterCallback', 'footer', [ $(oSettings.nTFoot).children('tr')[0],
			_fnGetDataMaster( oSettings ), iDisplayStart, iDisplayEnd, aiDisplay ] );
	
		var body = $(oSettings.nTBody);
	
		body.children().detach();
		body.append( $(anRows) );
	
		/* Call all required callback functions for the end of a draw */
		_fnCallbackFire( oSettings, 'aoDrawCallback', 'draw', [oSettings] );
	
		/* Draw is complete, sorting and filtering must be as well */
		oSettings.bSorted = false;
		oSettings.bFiltered = false;
		oSettings.bDrawing = false;
	}
	
	
	/**
	 * Redraw the table - taking account of the various features which are enabled
	 *  @param {object} oSettings dataTables settings object
	 *  @param {boolean} [holdPosition] Keep the current paging position. By default
	 *    the paging is reset to the first page
	 *  @memberof DataTable#oApi
	 */
	function _fnReDraw( settings, holdPosition )
	{
		var
			features = settings.oFeatures,
			sort     = features.bSort,
			filter   = features.bFilter;
	
		if ( sort ) {
			_fnSort( settings );
		}
	
		if ( filter ) {
			_fnFilterComplete( settings, settings.oPreviousSearch );
		}
		else {
			// No filtering, so we want to just use the display master
			settings.aiDisplay = settings.aiDisplayMaster.slice();
		}
	
		if ( holdPosition !== true ) {
			settings._iDisplayStart = 0;
		}
	
		// Let any modules know about the draw hold position state (used by
		// scrolling internally)
		settings._drawHold = holdPosition;
	
		_fnDraw( settings );
	
		settings._drawHold = false;
	}
	
	
	/**
	 * Add the options to the page HTML for the table
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnAddOptionsHtml ( oSettings )
	{
		var classes = oSettings.oClasses;
		var table = $(oSettings.nTable);
		var holding = $('<div/>').insertBefore( table ); // Holding element for speed
		var features = oSettings.oFeatures;
	
		// All DataTables are wrapped in a div
		var insert = $('<div/>', {
			id:      oSettings.sTableId+'_wrapper',
			'class': classes.sWrapper + (oSettings.nTFoot ? '' : ' '+classes.sNoFooter)
		} );
	
		oSettings.nHolding = holding[0];
		oSettings.nTableWrapper = insert[0];
		oSettings.nTableReinsertBefore = oSettings.nTable.nextSibling;
	
		/* Loop over the user set positioning and place the elements as needed */
		var aDom = oSettings.sDom.split('');
		var featureNode, cOption, nNewNode, cNext, sAttr, j;
		for ( var i=0 ; i<aDom.length ; i++ )
		{
			featureNode = null;
			cOption = aDom[i];
	
			if ( cOption == '<' )
			{
				/* New container div */
				nNewNode = $('<div/>')[0];
	
				/* Check to see if we should append an id and/or a class name to the container */
				cNext = aDom[i+1];
				if ( cNext == "'" || cNext == '"' )
				{
					sAttr = "";
					j = 2;
					while ( aDom[i+j] != cNext )
					{
						sAttr += aDom[i+j];
						j++;
					}
	
					/* Replace jQuery UI constants @todo depreciated */
					if ( sAttr == "H" )
					{
						sAttr = classes.sJUIHeader;
					}
					else if ( sAttr == "F" )
					{
						sAttr = classes.sJUIFooter;
					}
	
					/* The attribute can be in the format of "#id.class", "#id" or "class" This logic
					 * breaks the string into parts and applies them as needed
					 */
					if ( sAttr.indexOf('.') != -1 )
					{
						var aSplit = sAttr.split('.');
						nNewNode.id = aSplit[0].substr(1, aSplit[0].length-1);
						nNewNode.className = aSplit[1];
					}
					else if ( sAttr.charAt(0) == "#" )
					{
						nNewNode.id = sAttr.substr(1, sAttr.length-1);
					}
					else
					{
						nNewNode.className = sAttr;
					}
	
					i += j; /* Move along the position array */
				}
	
				insert.append( nNewNode );
				insert = $(nNewNode);
			}
			else if ( cOption == '>' )
			{
				/* End container div */
				insert = insert.parent();
			}
			// @todo Move options into their own plugins?
			else if ( cOption == 'l' && features.bPaginate && features.bLengthChange )
			{
				/* Length */
				featureNode = _fnFeatureHtmlLength( oSettings );
			}
			else if ( cOption == 'f' && features.bFilter )
			{
				/* Filter */
				featureNode = _fnFeatureHtmlFilter( oSettings );
			}
			else if ( cOption == 'r' && features.bProcessing )
			{
				/* pRocessing */
				featureNode = _fnFeatureHtmlProcessing( oSettings );
			}
			else if ( cOption == 't' )
			{
				/* Table */
				featureNode = _fnFeatureHtmlTable( oSettings );
			}
			else if ( cOption ==  'i' && features.bInfo )
			{
				/* Info */
				featureNode = _fnFeatureHtmlInfo( oSettings );
			}
			else if ( cOption == 'p' && features.bPaginate )
			{
				/* Pagination */
				featureNode = _fnFeatureHtmlPaginate( oSettings );
			}
			else if ( DataTable.ext.feature.length !== 0 )
			{
				/* Plug-in features */
				var aoFeatures = DataTable.ext.feature;
				for ( var k=0, kLen=aoFeatures.length ; k<kLen ; k++ )
				{
					if ( cOption == aoFeatures[k].cFeature )
					{
						featureNode = aoFeatures[k].fnInit( oSettings );
						break;
					}
				}
			}
	
			/* Add to the 2D features array */
			if ( featureNode )
			{
				var aanFeatures = oSettings.aanFeatures;
	
				if ( ! aanFeatures[cOption] )
				{
					aanFeatures[cOption] = [];
				}
	
				aanFeatures[cOption].push( featureNode );
				insert.append( featureNode );
			}
		}
	
		/* Built our DOM structure - replace the holding div with what we want */
		holding.replaceWith( insert );
		oSettings.nHolding = null;
	}
	
	
	/**
	 * Use the DOM source to create up an array of header cells. The idea here is to
	 * create a layout grid (array) of rows x columns, which contains a reference
	 * to the cell that that point in the grid (regardless of col/rowspan), such that
	 * any column / row could be removed and the new grid constructed
	 *  @param array {object} aLayout Array to store the calculated layout in
	 *  @param {node} nThead The header/footer element for the table
	 *  @memberof DataTable#oApi
	 */
	function _fnDetectHeader ( aLayout, nThead )
	{
		var nTrs = $(nThead).children('tr');
		var nTr, nCell;
		var i, k, l, iLen, jLen, iColShifted, iColumn, iColspan, iRowspan;
		var bUnique;
		var fnShiftCol = function ( a, i, j ) {
			var k = a[i];
	                while ( k[j] ) {
				j++;
			}
			return j;
		};
	
		aLayout.splice( 0, aLayout.length );
	
		/* We know how many rows there are in the layout - so prep it */
		for ( i=0, iLen=nTrs.length ; i<iLen ; i++ )
		{
			aLayout.push( [] );
		}
	
		/* Calculate a layout array */
		for ( i=0, iLen=nTrs.length ; i<iLen ; i++ )
		{
			nTr = nTrs[i];
			iColumn = 0;
	
			/* For every cell in the row... */
			nCell = nTr.firstChild;
			while ( nCell ) {
				if ( nCell.nodeName.toUpperCase() == "TD" ||
				     nCell.nodeName.toUpperCase() == "TH" )
				{
					/* Get the col and rowspan attributes from the DOM and sanitise them */
					iColspan = nCell.getAttribute('colspan') * 1;
					iRowspan = nCell.getAttribute('rowspan') * 1;
					iColspan = (!iColspan || iColspan===0 || iColspan===1) ? 1 : iColspan;
					iRowspan = (!iRowspan || iRowspan===0 || iRowspan===1) ? 1 : iRowspan;
	
					/* There might be colspan cells already in this row, so shift our target
					 * accordingly
					 */
					iColShifted = fnShiftCol( aLayout, i, iColumn );
	
					/* Cache calculation for unique columns */
					bUnique = iColspan === 1 ? true : false;
	
					/* If there is col / rowspan, copy the information into the layout grid */
					for ( l=0 ; l<iColspan ; l++ )
					{
						for ( k=0 ; k<iRowspan ; k++ )
						{
							aLayout[i+k][iColShifted+l] = {
								"cell": nCell,
								"unique": bUnique
							};
							aLayout[i+k].nTr = nTr;
						}
					}
				}
				nCell = nCell.nextSibling;
			}
		}
	}
	
	
	/**
	 * Get an array of unique th elements, one for each column
	 *  @param {object} oSettings dataTables settings object
	 *  @param {node} nHeader automatically detect the layout from this node - optional
	 *  @param {array} aLayout thead/tfoot layout from _fnDetectHeader - optional
	 *  @returns array {node} aReturn list of unique th's
	 *  @memberof DataTable#oApi
	 */
	function _fnGetUniqueThs ( oSettings, nHeader, aLayout )
	{
		var aReturn = [];
		if ( !aLayout )
		{
			aLayout = oSettings.aoHeader;
			if ( nHeader )
			{
				aLayout = [];
				_fnDetectHeader( aLayout, nHeader );
			}
		}
	
		for ( var i=0, iLen=aLayout.length ; i<iLen ; i++ )
		{
			for ( var j=0, jLen=aLayout[i].length ; j<jLen ; j++ )
			{
				if ( aLayout[i][j].unique &&
					 (!aReturn[j] || !oSettings.bSortCellsTop) )
				{
					aReturn[j] = aLayout[i][j].cell;
				}
			}
		}
	
		return aReturn;
	}
	
	/**
	 * Create an Ajax call based on the table's settings, taking into account that
	 * parameters can have multiple forms, and backwards compatibility.
	 *
	 * @param {object} oSettings dataTables settings object
	 * @param {array} data Data to send to the server, required by
	 *     DataTables - may be augmented by developer callbacks
	 * @param {function} fn Callback function to run when data is obtained
	 */
	function _fnBuildAjax( oSettings, data, fn )
	{
		// Compatibility with 1.9-, allow fnServerData and event to manipulate
		_fnCallbackFire( oSettings, 'aoServerParams', 'serverParams', [data] );
	
		// Convert to object based for 1.10+ if using the old array scheme which can
		// come from server-side processing or serverParams
		if ( data && $.isArray(data) ) {
			var tmp = {};
			var rbracket = /(.*?)\[\]$/;
	
			$.each( data, function (key, val) {
				var match = val.name.match(rbracket);
	
				if ( match ) {
					// Support for arrays
					var name = match[0];
	
					if ( ! tmp[ name ] ) {
						tmp[ name ] = [];
					}
					tmp[ name ].push( val.value );
				}
				else {
					tmp[val.name] = val.value;
				}
			} );
			data = tmp;
		}
	
		var ajaxData;
		var ajax = oSettings.ajax;
		var instance = oSettings.oInstance;
		var callback = function ( json ) {
			_fnCallbackFire( oSettings, null, 'xhr', [oSettings, json, oSettings.jqXHR] );
			fn( json );
		};
	
		if ( $.isPlainObject( ajax ) && ajax.data )
		{
			ajaxData = ajax.data;
	
			var newData = typeof ajaxData === 'function' ?
				ajaxData( data, oSettings ) :  // fn can manipulate data or return
				ajaxData;                      // an object object or array to merge
	
			// If the function returned something, use that alone
			data = typeof ajaxData === 'function' && newData ?
				newData :
				$.extend( true, data, newData );
	
			// Remove the data property as we've resolved it already and don't want
			// jQuery to do it again (it is restored at the end of the function)
			delete ajax.data;
		}
	
		var baseAjax = {
			"data": data,
			"success": function (json) {
				var error = json.error || json.sError;
				if ( error ) {
					_fnLog( oSettings, 0, error );
				}
	
				oSettings.json = json;
				callback( json );
			},
			"dataType": "json",
			"cache": false,
			"type": oSettings.sServerMethod,
			"error": function (xhr, error, thrown) {
				var ret = _fnCallbackFire( oSettings, null, 'xhr', [oSettings, null, oSettings.jqXHR] );
	
				if ( $.inArray( true, ret ) === -1 ) {
					if ( error == "parsererror" ) {
						_fnLog( oSettings, 0, 'Invalid JSON response', 1 );
					}
					else if ( xhr.readyState === 4 ) {
						_fnLog( oSettings, 0, 'Ajax error', 7 );
					}
				}
	
				_fnProcessingDisplay( oSettings, false );
			}
		};
	
		// Store the data submitted for the API
		oSettings.oAjaxData = data;
	
		// Allow plug-ins and external processes to modify the data
		_fnCallbackFire( oSettings, null, 'preXhr', [oSettings, data] );
	
		if ( oSettings.fnServerData )
		{
			// DataTables 1.9- compatibility
			oSettings.fnServerData.call( instance,
				oSettings.sAjaxSource,
				$.map( data, function (val, key) { // Need to convert back to 1.9 trad format
					return { name: key, value: val };
				} ),
				callback,
				oSettings
			);
		}
		else if ( oSettings.sAjaxSource || typeof ajax === 'string' )
		{
			// DataTables 1.9- compatibility
			oSettings.jqXHR = $.ajax( $.extend( baseAjax, {
				url: ajax || oSettings.sAjaxSource
			} ) );
		}
		else if ( typeof ajax === 'function' )
		{
			// Is a function - let the caller define what needs to be done
			oSettings.jqXHR = ajax.call( instance, data, callback, oSettings );
		}
		else
		{
			// Object to extend the base settings
			oSettings.jqXHR = $.ajax( $.extend( baseAjax, ajax ) );
	
			// Restore for next time around
			ajax.data = ajaxData;
		}
	}
	
	
	/**
	 * Update the table using an Ajax call
	 *  @param {object} settings dataTables settings object
	 *  @returns {boolean} Block the table drawing or not
	 *  @memberof DataTable#oApi
	 */
	function _fnAjaxUpdate( settings )
	{
		if ( settings.bAjaxDataGet ) {
			settings.iDraw++;
			_fnProcessingDisplay( settings, true );
	
			_fnBuildAjax(
				settings,
				_fnAjaxParameters( settings ),
				function(json) {
					_fnAjaxUpdateDraw( settings, json );
				}
			);
	
			return false;
		}
		return true;
	}
	
	
	/**
	 * Build up the parameters in an object needed for a server-side processing
	 * request. Note that this is basically done twice, is different ways - a modern
	 * method which is used by default in DataTables 1.10 which uses objects and
	 * arrays, or the 1.9- method with is name / value pairs. 1.9 method is used if
	 * the sAjaxSource option is used in the initialisation, or the legacyAjax
	 * option is set.
	 *  @param {object} oSettings dataTables settings object
	 *  @returns {bool} block the table drawing or not
	 *  @memberof DataTable#oApi
	 */
	function _fnAjaxParameters( settings )
	{
		var
			columns = settings.aoColumns,
			columnCount = columns.length,
			features = settings.oFeatures,
			preSearch = settings.oPreviousSearch,
			preColSearch = settings.aoPreSearchCols,
			i, data = [], dataProp, column, columnSearch,
			sort = _fnSortFlatten( settings ),
			displayStart = settings._iDisplayStart,
			displayLength = features.bPaginate !== false ?
				settings._iDisplayLength :
				-1;
	
		var param = function ( name, value ) {
			data.push( { 'name': name, 'value': value } );
		};
	
		// DataTables 1.9- compatible method
		param( 'sEcho',          settings.iDraw );
		param( 'iColumns',       columnCount );
		param( 'sColumns',       _pluck( columns, 'sName' ).join(',') );
		param( 'iDisplayStart',  displayStart );
		param( 'iDisplayLength', displayLength );
	
		// DataTables 1.10+ method
		var d = {
			draw:    settings.iDraw,
			columns: [],
			order:   [],
			start:   displayStart,
			length:  displayLength,
			search:  {
				value: preSearch.sSearch,
				regex: preSearch.bRegex
			}
		};
	
		for ( i=0 ; i<columnCount ; i++ ) {
			column = columns[i];
			columnSearch = preColSearch[i];
			dataProp = typeof column.mData=="function" ? 'function' : column.mData ;
	
			d.columns.push( {
				data:       dataProp,
				name:       column.sName,
				searchable: column.bSearchable,
				orderable:  column.bSortable,
				search:     {
					value: columnSearch.sSearch,
					regex: columnSearch.bRegex
				}
			} );
	
			param( "mDataProp_"+i, dataProp );
	
			if ( features.bFilter ) {
				param( 'sSearch_'+i,     columnSearch.sSearch );
				param( 'bRegex_'+i,      columnSearch.bRegex );
				param( 'bSearchable_'+i, column.bSearchable );
			}
	
			if ( features.bSort ) {
				param( 'bSortable_'+i, column.bSortable );
			}
		}
	
		if ( features.bFilter ) {
			param( 'sSearch', preSearch.sSearch );
			param( 'bRegex', preSearch.bRegex );
		}
	
		if ( features.bSort ) {
			$.each( sort, function ( i, val ) {
				d.order.push( { column: val.col, dir: val.dir } );
	
				param( 'iSortCol_'+i, val.col );
				param( 'sSortDir_'+i, val.dir );
			} );
	
			param( 'iSortingCols', sort.length );
		}
	
		// If the legacy.ajax parameter is null, then we automatically decide which
		// form to use, based on sAjaxSource
		var legacy = DataTable.ext.legacy.ajax;
		if ( legacy === null ) {
			return settings.sAjaxSource ? data : d;
		}
	
		// Otherwise, if legacy has been specified then we use that to decide on the
		// form
		return legacy ? data : d;
	}
	
	
	/**
	 * Data the data from the server (nuking the old) and redraw the table
	 *  @param {object} oSettings dataTables settings object
	 *  @param {object} json json data return from the server.
	 *  @param {string} json.sEcho Tracking flag for DataTables to match requests
	 *  @param {int} json.iTotalRecords Number of records in the data set, not accounting for filtering
	 *  @param {int} json.iTotalDisplayRecords Number of records in the data set, accounting for filtering
	 *  @param {array} json.aaData The data to display on this page
	 *  @param {string} [json.sColumns] Column ordering (sName, comma separated)
	 *  @memberof DataTable#oApi
	 */
	function _fnAjaxUpdateDraw ( settings, json )
	{
		// v1.10 uses camelCase variables, while 1.9 uses Hungarian notation.
		// Support both
		var compat = function ( old, modern ) {
			return json[old] !== undefined ? json[old] : json[modern];
		};
	
		var data = _fnAjaxDataSrc( settings, json );
		var draw            = compat( 'sEcho',                'draw' );
		var recordsTotal    = compat( 'iTotalRecords',        'recordsTotal' );
		var recordsFiltered = compat( 'iTotalDisplayRecords', 'recordsFiltered' );
	
		if ( draw !== undefined ) {
			// Protect against out of sequence returns
			if ( draw*1 < settings.iDraw ) {
				return;
			}
			settings.iDraw = draw * 1;
		}
	
		_fnClearTable( settings );
		settings._iRecordsTotal   = parseInt(recordsTotal, 10);
		settings._iRecordsDisplay = parseInt(recordsFiltered, 10);
	
		for ( var i=0, ien=data.length ; i<ien ; i++ ) {
			_fnAddData( settings, data[i] );
		}
		settings.aiDisplay = settings.aiDisplayMaster.slice();
	
		settings.bAjaxDataGet = false;
		_fnDraw( settings );
	
		if ( ! settings._bInitComplete ) {
			_fnInitComplete( settings, json );
		}
	
		settings.bAjaxDataGet = true;
		_fnProcessingDisplay( settings, false );
	}
	
	
	/**
	 * Get the data from the JSON data source to use for drawing a table. Using
	 * `_fnGetObjectDataFn` allows the data to be sourced from a property of the
	 * source object, or from a processing function.
	 *  @param {object} oSettings dataTables settings object
	 *  @param  {object} json Data source object / array from the server
	 *  @return {array} Array of data to use
	 */
	function _fnAjaxDataSrc ( oSettings, json )
	{
		var dataSrc = $.isPlainObject( oSettings.ajax ) && oSettings.ajax.dataSrc !== undefined ?
			oSettings.ajax.dataSrc :
			oSettings.sAjaxDataProp; // Compatibility with 1.9-.
	
		// Compatibility with 1.9-. In order to read from aaData, check if the
		// default has been changed, if not, check for aaData
		if ( dataSrc === 'data' ) {
			return json.aaData || json[dataSrc];
		}
	
		return dataSrc !== "" ?
			_fnGetObjectDataFn( dataSrc )( json ) :
			json;
	}
	
	/**
	 * Generate the node required for filtering text
	 *  @returns {node} Filter control element
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnFeatureHtmlFilter ( settings )
	{
		var classes = settings.oClasses;
		var tableId = settings.sTableId;
		var language = settings.oLanguage;
		var previousSearch = settings.oPreviousSearch;
		var features = settings.aanFeatures;
		var input = '<input type="search" class="'+classes.sFilterInput+'"/>';
	
		var str = language.sSearch;
		str = str.match(/_INPUT_/) ?
			str.replace('_INPUT_', input) :
			str+input;
	
		var filter = $('<div/>', {
				'id': ! features.f ? tableId+'_filter' : null,
				'class': classes.sFilter
			} )
			.append( $('<label/>' ).append( str ) );
	
		var searchFn = function() {
			/* Update all other filter input elements for the new display */
			var n = features.f;
			var val = !this.value ? "" : this.value; // mental IE8 fix :-(
	
			/* Now do the filter */
			if ( val != previousSearch.sSearch ) {
				_fnFilterComplete( settings, {
					"sSearch": val,
					"bRegex": previousSearch.bRegex,
					"bSmart": previousSearch.bSmart ,
					"bCaseInsensitive": previousSearch.bCaseInsensitive
				} );
	
				// Need to redraw, without resorting
				settings._iDisplayStart = 0;
				_fnDraw( settings );
			}
		};
	
		var searchDelay = settings.searchDelay !== null ?
			settings.searchDelay :
			_fnDataSource( settings ) === 'ssp' ?
				400 :
				0;
	
		var jqFilter = $('input', filter)
			.val( previousSearch.sSearch )
			.attr( 'placeholder', language.sSearchPlaceholder )
			.on(
				'keyup.DT search.DT input.DT paste.DT cut.DT',
				searchDelay ?
					_fnThrottle( searchFn, searchDelay ) :
					searchFn
			)
			.on( 'mouseup', function(e) {
				// Edge fix! Edge 17 does not trigger anything other than mouse events when clicking
				// on the clear icon (Edge bug 17584515). This is safe in other browsers as `searchFn`
				// checks the value to see if it has changed. In other browsers it won't have.
				setTimeout( function () {
					searchFn.call(jqFilter[0]);
				}, 10);
			} )
			.on( 'keypress.DT', function(e) {
				/* Prevent form submission */
				if ( e.keyCode == 13 ) {
					return false;
				}
			} )
			.attr('aria-controls', tableId);
	
		// Update the input elements whenever the table is filtered
		$(settings.nTable).on( 'search.dt.DT', function ( ev, s ) {
			if ( settings === s ) {
				// IE9 throws an 'unknown error' if document.activeElement is used
				// inside an iframe or frame...
				try {
					if ( jqFilter[0] !== document.activeElement ) {
						jqFilter.val( previousSearch.sSearch );
					}
				}
				catch ( e ) {}
			}
		} );
	
		return filter[0];
	}
	
	
	/**
	 * Filter the table using both the global filter and column based filtering
	 *  @param {object} oSettings dataTables settings object
	 *  @param {object} oSearch search information
	 *  @param {int} [iForce] force a research of the master array (1) or not (undefined or 0)
	 *  @memberof DataTable#oApi
	 */
	function _fnFilterComplete ( oSettings, oInput, iForce )
	{
		var oPrevSearch = oSettings.oPreviousSearch;
		var aoPrevSearch = oSettings.aoPreSearchCols;
		var fnSaveFilter = function ( oFilter ) {
			/* Save the filtering values */
			oPrevSearch.sSearch = oFilter.sSearch;
			oPrevSearch.bRegex = oFilter.bRegex;
			oPrevSearch.bSmart = oFilter.bSmart;
			oPrevSearch.bCaseInsensitive = oFilter.bCaseInsensitive;
		};
		var fnRegex = function ( o ) {
			// Backwards compatibility with the bEscapeRegex option
			return o.bEscapeRegex !== undefined ? !o.bEscapeRegex : o.bRegex;
		};
	
		// Resolve any column types that are unknown due to addition or invalidation
		// @todo As per sort - can this be moved into an event handler?
		_fnColumnTypes( oSettings );
	
		/* In server-side processing all filtering is done by the server, so no point hanging around here */
		if ( _fnDataSource( oSettings ) != 'ssp' )
		{
			/* Global filter */
			_fnFilter( oSettings, oInput.sSearch, iForce, fnRegex(oInput), oInput.bSmart, oInput.bCaseInsensitive );
			fnSaveFilter( oInput );
	
			/* Now do the individual column filter */
			for ( var i=0 ; i<aoPrevSearch.length ; i++ )
			{
				_fnFilterColumn( oSettings, aoPrevSearch[i].sSearch, i, fnRegex(aoPrevSearch[i]),
					aoPrevSearch[i].bSmart, aoPrevSearch[i].bCaseInsensitive );
			}
	
			/* Custom filtering */
			_fnFilterCustom( oSettings );
		}
		else
		{
			fnSaveFilter( oInput );
		}
	
		/* Tell the draw function we have been filtering */
		oSettings.bFiltered = true;
		_fnCallbackFire( oSettings, null, 'search', [oSettings] );
	}
	
	
	/**
	 * Apply custom filtering functions
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnFilterCustom( settings )
	{
		var filters = DataTable.ext.search;
		var displayRows = settings.aiDisplay;
		var row, rowIdx;
	
		for ( var i=0, ien=filters.length ; i<ien ; i++ ) {
			var rows = [];
	
			// Loop over each row and see if it should be included
			for ( var j=0, jen=displayRows.length ; j<jen ; j++ ) {
				rowIdx = displayRows[ j ];
				row = settings.aoData[ rowIdx ];
	
				if ( filters[i]( settings, row._aFilterData, rowIdx, row._aData, j ) ) {
					rows.push( rowIdx );
				}
			}
	
			// So the array reference doesn't break set the results into the
			// existing array
			displayRows.length = 0;
			$.merge( displayRows, rows );
		}
	}
	
	
	/**
	 * Filter the table on a per-column basis
	 *  @param {object} oSettings dataTables settings object
	 *  @param {string} sInput string to filter on
	 *  @param {int} iColumn column to filter
	 *  @param {bool} bRegex treat search string as a regular expression or not
	 *  @param {bool} bSmart use smart filtering or not
	 *  @param {bool} bCaseInsensitive Do case insenstive matching or not
	 *  @memberof DataTable#oApi
	 */
	function _fnFilterColumn ( settings, searchStr, colIdx, regex, smart, caseInsensitive )
	{
		if ( searchStr === '' ) {
			return;
		}
	
		var data;
		var out = [];
		var display = settings.aiDisplay;
		var rpSearch = _fnFilterCreateSearch( searchStr, regex, smart, caseInsensitive );
	
		for ( var i=0 ; i<display.length ; i++ ) {
			data = settings.aoData[ display[i] ]._aFilterData[ colIdx ];
	
			if ( rpSearch.test( data ) ) {
				out.push( display[i] );
			}
		}
	
		settings.aiDisplay = out;
	}
	
	
	/**
	 * Filter the data table based on user input and draw the table
	 *  @param {object} settings dataTables settings object
	 *  @param {string} input string to filter on
	 *  @param {int} force optional - force a research of the master array (1) or not (undefined or 0)
	 *  @param {bool} regex treat as a regular expression or not
	 *  @param {bool} smart perform smart filtering or not
	 *  @param {bool} caseInsensitive Do case insenstive matching or not
	 *  @memberof DataTable#oApi
	 */
	function _fnFilter( settings, input, force, regex, smart, caseInsensitive )
	{
		var rpSearch = _fnFilterCreateSearch( input, regex, smart, caseInsensitive );
		var prevSearch = settings.oPreviousSearch.sSearch;
		var displayMaster = settings.aiDisplayMaster;
		var display, invalidated, i;
		var filtered = [];
	
		// Need to take account of custom filtering functions - always filter
		if ( DataTable.ext.search.length !== 0 ) {
			force = true;
		}
	
		// Check if any of the rows were invalidated
		invalidated = _fnFilterData( settings );
	
		// If the input is blank - we just want the full data set
		if ( input.length <= 0 ) {
			settings.aiDisplay = displayMaster.slice();
		}
		else {
			// New search - start from the master array
			if ( invalidated ||
				 force ||
				 regex ||
				 prevSearch.length > input.length ||
				 input.indexOf(prevSearch) !== 0 ||
				 settings.bSorted // On resort, the display master needs to be
				                  // re-filtered since indexes will have changed
			) {
				settings.aiDisplay = displayMaster.slice();
			}
	
			// Search the display array
			display = settings.aiDisplay;
	
			for ( i=0 ; i<display.length ; i++ ) {
				if ( rpSearch.test( settings.aoData[ display[i] ]._sFilterRow ) ) {
					filtered.push( display[i] );
				}
			}
	
			settings.aiDisplay = filtered;
		}
	}
	
	
	/**
	 * Build a regular expression object suitable for searching a table
	 *  @param {string} sSearch string to search for
	 *  @param {bool} bRegex treat as a regular expression or not
	 *  @param {bool} bSmart perform smart filtering or not
	 *  @param {bool} bCaseInsensitive Do case insensitive matching or not
	 *  @returns {RegExp} constructed object
	 *  @memberof DataTable#oApi
	 */
	function _fnFilterCreateSearch( search, regex, smart, caseInsensitive )
	{
		search = regex ?
			search :
			_fnEscapeRegex( search );
		
		if ( smart ) {
			/* For smart filtering we want to allow the search to work regardless of
			 * word order. We also want double quoted text to be preserved, so word
			 * order is important - a la google. So this is what we want to
			 * generate:
			 * 
			 * ^(?=.*?\bone\b)(?=.*?\btwo three\b)(?=.*?\bfour\b).*$
			 */
			var a = $.map( search.match( /"[^"]+"|[^ ]+/g ) || [''], function ( word ) {
				if ( word.charAt(0) === '"' ) {
					var m = word.match( /^"(.*)"$/ );
					word = m ? m[1] : word;
				}
	
				return word.replace('"', '');
			} );
	
			search = '^(?=.*?'+a.join( ')(?=.*?' )+').*$';
		}
	
		return new RegExp( search, caseInsensitive ? 'i' : '' );
	}
	
	
	/**
	 * Escape a string such that it can be used in a regular expression
	 *  @param {string} sVal string to escape
	 *  @returns {string} escaped string
	 *  @memberof DataTable#oApi
	 */
	var _fnEscapeRegex = DataTable.util.escapeRegex;
	
	var __filter_div = $('<div>')[0];
	var __filter_div_textContent = __filter_div.textContent !== undefined;
	
	// Update the filtering data for each row if needed (by invalidation or first run)
	function _fnFilterData ( settings )
	{
		var columns = settings.aoColumns;
		var column;
		var i, j, ien, jen, filterData, cellData, row;
		var fomatters = DataTable.ext.type.search;
		var wasInvalidated = false;
	
		for ( i=0, ien=settings.aoData.length ; i<ien ; i++ ) {
			row = settings.aoData[i];
	
			if ( ! row._aFilterData ) {
				filterData = [];
	
				for ( j=0, jen=columns.length ; j<jen ; j++ ) {
					column = columns[j];
	
					if ( column.bSearchable ) {
						cellData = _fnGetCellData( settings, i, j, 'filter' );
	
						if ( fomatters[ column.sType ] ) {
							cellData = fomatters[ column.sType ]( cellData );
						}
	
						// Search in DataTables 1.10 is string based. In 1.11 this
						// should be altered to also allow strict type checking.
						if ( cellData === null ) {
							cellData = '';
						}
	
						if ( typeof cellData !== 'string' && cellData.toString ) {
							cellData = cellData.toString();
						}
					}
					else {
						cellData = '';
					}
	
					// If it looks like there is an HTML entity in the string,
					// attempt to decode it so sorting works as expected. Note that
					// we could use a single line of jQuery to do this, but the DOM
					// method used here is much faster http://jsperf.com/html-decode
					if ( cellData.indexOf && cellData.indexOf('&') !== -1 ) {
						__filter_div.innerHTML = cellData;
						cellData = __filter_div_textContent ?
							__filter_div.textContent :
							__filter_div.innerText;
					}
	
					if ( cellData.replace ) {
						cellData = cellData.replace(/[\r\n\u2028]/g, '');
					}
	
					filterData.push( cellData );
				}
	
				row._aFilterData = filterData;
				row._sFilterRow = filterData.join('  ');
				wasInvalidated = true;
			}
		}
	
		return wasInvalidated;
	}
	
	
	/**
	 * Convert from the internal Hungarian notation to camelCase for external
	 * interaction
	 *  @param {object} obj Object to convert
	 *  @returns {object} Inverted object
	 *  @memberof DataTable#oApi
	 */
	function _fnSearchToCamel ( obj )
	{
		return {
			search:          obj.sSearch,
			smart:           obj.bSmart,
			regex:           obj.bRegex,
			caseInsensitive: obj.bCaseInsensitive
		};
	}
	
	
	
	/**
	 * Convert from camelCase notation to the internal Hungarian. We could use the
	 * Hungarian convert function here, but this is cleaner
	 *  @param {object} obj Object to convert
	 *  @returns {object} Inverted object
	 *  @memberof DataTable#oApi
	 */
	function _fnSearchToHung ( obj )
	{
		return {
			sSearch:          obj.search,
			bSmart:           obj.smart,
			bRegex:           obj.regex,
			bCaseInsensitive: obj.caseInsensitive
		};
	}
	
	/**
	 * Generate the node required for the info display
	 *  @param {object} oSettings dataTables settings object
	 *  @returns {node} Information element
	 *  @memberof DataTable#oApi
	 */
	function _fnFeatureHtmlInfo ( settings )
	{
		var
			tid = settings.sTableId,
			nodes = settings.aanFeatures.i,
			n = $('<div/>', {
				'class': settings.oClasses.sInfo,
				'id': ! nodes ? tid+'_info' : null
			} );
	
		if ( ! nodes ) {
			// Update display on each draw
			settings.aoDrawCallback.push( {
				"fn": _fnUpdateInfo,
				"sName": "information"
			} );
	
			n
				.attr( 'role', 'status' )
				.attr( 'aria-live', 'polite' );
	
			// Table is described by our info div
			$(settings.nTable).attr( 'aria-describedby', tid+'_info' );
		}
	
		return n[0];
	}
	
	
	/**
	 * Update the information elements in the display
	 *  @param {object} settings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnUpdateInfo ( settings )
	{
		/* Show information about the table */
		var nodes = settings.aanFeatures.i;
		if ( nodes.length === 0 ) {
			return;
		}
	
		var
			lang  = settings.oLanguage,
			start = settings._iDisplayStart+1,
			end   = settings.fnDisplayEnd(),
			max   = settings.fnRecordsTotal(),
			total = settings.fnRecordsDisplay(),
			out   = total ?
				lang.sInfo :
				lang.sInfoEmpty;
	
		if ( total !== max ) {
			/* Record set after filtering */
			out += ' ' + lang.sInfoFiltered;
		}
	
		// Convert the macros
		out += lang.sInfoPostFix;
		out = _fnInfoMacros( settings, out );
	
		var callback = lang.fnInfoCallback;
		if ( callback !== null ) {
			out = callback.call( settings.oInstance,
				settings, start, end, max, total, out
			);
		}
	
		$(nodes).html( out );
	}
	
	
	function _fnInfoMacros ( settings, str )
	{
		// When infinite scrolling, we are always starting at 1. _iDisplayStart is used only
		// internally
		var
			formatter  = settings.fnFormatNumber,
			start      = settings._iDisplayStart+1,
			len        = settings._iDisplayLength,
			vis        = settings.fnRecordsDisplay(),
			all        = len === -1;
	
		return str.
			replace(/_START_/g, formatter.call( settings, start ) ).
			replace(/_END_/g,   formatter.call( settings, settings.fnDisplayEnd() ) ).
			replace(/_MAX_/g,   formatter.call( settings, settings.fnRecordsTotal() ) ).
			replace(/_TOTAL_/g, formatter.call( settings, vis ) ).
			replace(/_PAGE_/g,  formatter.call( settings, all ? 1 : Math.ceil( start / len ) ) ).
			replace(/_PAGES_/g, formatter.call( settings, all ? 1 : Math.ceil( vis / len ) ) );
	}
	
	
	
	/**
	 * Draw the table for the first time, adding all required features
	 *  @param {object} settings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnInitialise ( settings )
	{
		var i, iLen, iAjaxStart=settings.iInitDisplayStart;
		var columns = settings.aoColumns, column;
		var features = settings.oFeatures;
		var deferLoading = settings.bDeferLoading; // value modified by the draw
	
		/* Ensure that the table data is fully initialised */
		if ( ! settings.bInitialised ) {
			setTimeout( function(){ _fnInitialise( settings ); }, 200 );
			return;
		}
	
		/* Show the display HTML options */
		_fnAddOptionsHtml( settings );
	
		/* Build and draw the header / footer for the table */
		_fnBuildHead( settings );
		_fnDrawHead( settings, settings.aoHeader );
		_fnDrawHead( settings, settings.aoFooter );
	
		/* Okay to show that something is going on now */
		_fnProcessingDisplay( settings, true );
	
		/* Calculate sizes for columns */
		if ( features.bAutoWidth ) {
			_fnCalculateColumnWidths( settings );
		}
	
		for ( i=0, iLen=columns.length ; i<iLen ; i++ ) {
			column = columns[i];
	
			if ( column.sWidth ) {
				column.nTh.style.width = _fnStringToCss( column.sWidth );
			}
		}
	
		_fnCallbackFire( settings, null, 'preInit', [settings] );
	
		// If there is default sorting required - let's do it. The sort function
		// will do the drawing for us. Otherwise we draw the table regardless of the
		// Ajax source - this allows the table to look initialised for Ajax sourcing
		// data (show 'loading' message possibly)
		_fnReDraw( settings );
	
		// Server-side processing init complete is done by _fnAjaxUpdateDraw
		var dataSrc = _fnDataSource( settings );
		if ( dataSrc != 'ssp' || deferLoading ) {
			// if there is an ajax source load the data
			if ( dataSrc == 'ajax' ) {
				_fnBuildAjax( settings, [], function(json) {
					var aData = _fnAjaxDataSrc( settings, json );
	
					// Got the data - add it to the table
					for ( i=0 ; i<aData.length ; i++ ) {
						_fnAddData( settings, aData[i] );
					}
	
					// Reset the init display for cookie saving. We've already done
					// a filter, and therefore cleared it before. So we need to make
					// it appear 'fresh'
					settings.iInitDisplayStart = iAjaxStart;
	
					_fnReDraw( settings );
	
					_fnProcessingDisplay( settings, false );
					_fnInitComplete( settings, json );
				}, settings );
			}
			else {
				_fnProcessingDisplay( settings, false );
				_fnInitComplete( settings );
			}
		}
	}
	
	
	/**
	 * Draw the table for the first time, adding all required features
	 *  @param {object} oSettings dataTables settings object
	 *  @param {object} [json] JSON from the server that completed the table, if using Ajax source
	 *    with client-side processing (optional)
	 *  @memberof DataTable#oApi
	 */
	function _fnInitComplete ( settings, json )
	{
		settings._bInitComplete = true;
	
		// When data was added after the initialisation (data or Ajax) we need to
		// calculate the column sizing
		if ( json || settings.oInit.aaData ) {
			_fnAdjustColumnSizing( settings );
		}
	
		_fnCallbackFire( settings, null, 'plugin-init', [settings, json] );
		_fnCallbackFire( settings, 'aoInitComplete', 'init', [settings, json] );
	}
	
	
	function _fnLengthChange ( settings, val )
	{
		var len = parseInt( val, 10 );
		settings._iDisplayLength = len;
	
		_fnLengthOverflow( settings );
	
		// Fire length change event
		_fnCallbackFire( settings, null, 'length', [settings, len] );
	}
	
	
	/**
	 * Generate the node required for user display length changing
	 *  @param {object} settings dataTables settings object
	 *  @returns {node} Display length feature node
	 *  @memberof DataTable#oApi
	 */
	function _fnFeatureHtmlLength ( settings )
	{
		var
			classes  = settings.oClasses,
			tableId  = settings.sTableId,
			menu     = settings.aLengthMenu,
			d2       = $.isArray( menu[0] ),
			lengths  = d2 ? menu[0] : menu,
			language = d2 ? menu[1] : menu;
	
		var select = $('<select/>', {
			'name':          tableId+'_length',
			'aria-controls': tableId,
			'class':         classes.sLengthSelect
		} );
	
		for ( var i=0, ien=lengths.length ; i<ien ; i++ ) {
			select[0][ i ] = new Option(
				typeof language[i] === 'number' ?
					settings.fnFormatNumber( language[i] ) :
					language[i],
				lengths[i]
			);
		}
	
		var div = $('<div><label/></div>').addClass( classes.sLength );
		if ( ! settings.aanFeatures.l ) {
			div[0].id = tableId+'_length';
		}
	
		div.children().append(
			settings.oLanguage.sLengthMenu.replace( '_MENU_', select[0].outerHTML )
		);
	
		// Can't use `select` variable as user might provide their own and the
		// reference is broken by the use of outerHTML
		$('select', div)
			.val( settings._iDisplayLength )
			.on( 'change.DT', function(e) {
				_fnLengthChange( settings, $(this).val() );
				_fnDraw( settings );
			} );
	
		// Update node value whenever anything changes the table's length
		$(settings.nTable).on( 'length.dt.DT', function (e, s, len) {
			if ( settings === s ) {
				$('select', div).val( len );
			}
		} );
	
		return div[0];
	}
	
	
	
	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Note that most of the paging logic is done in
	 * DataTable.ext.pager
	 */
	
	/**
	 * Generate the node required for default pagination
	 *  @param {object} oSettings dataTables settings object
	 *  @returns {node} Pagination feature node
	 *  @memberof DataTable#oApi
	 */
	function _fnFeatureHtmlPaginate ( settings )
	{
		var
			type   = settings.sPaginationType,
			plugin = DataTable.ext.pager[ type ],
			modern = typeof plugin === 'function',
			redraw = function( settings ) {
				_fnDraw( settings );
			},
			node = $('<div/>').addClass( settings.oClasses.sPaging + type )[0],
			features = settings.aanFeatures;
	
		if ( ! modern ) {
			plugin.fnInit( settings, node, redraw );
		}
	
		/* Add a draw callback for the pagination on first instance, to update the paging display */
		if ( ! features.p )
		{
			node.id = settings.sTableId+'_paginate';
	
			settings.aoDrawCallback.push( {
				"fn": function( settings ) {
					if ( modern ) {
						var
							start      = settings._iDisplayStart,
							len        = settings._iDisplayLength,
							visRecords = settings.fnRecordsDisplay(),
							all        = len === -1,
							page = all ? 0 : Math.ceil( start / len ),
							pages = all ? 1 : Math.ceil( visRecords / len ),
							buttons = plugin(page, pages),
							i, ien;
	
						for ( i=0, ien=features.p.length ; i<ien ; i++ ) {
							_fnRenderer( settings, 'pageButton' )(
								settings, features.p[i], i, buttons, page, pages
							);
						}
					}
					else {
						plugin.fnUpdate( settings, redraw );
					}
				},
				"sName": "pagination"
			} );
		}
	
		return node;
	}
	
	
	/**
	 * Alter the display settings to change the page
	 *  @param {object} settings DataTables settings object
	 *  @param {string|int} action Paging action to take: "first", "previous",
	 *    "next" or "last" or page number to jump to (integer)
	 *  @param [bool] redraw Automatically draw the update or not
	 *  @returns {bool} true page has changed, false - no change
	 *  @memberof DataTable#oApi
	 */
	function _fnPageChange ( settings, action, redraw )
	{
		var
			start     = settings._iDisplayStart,
			len       = settings._iDisplayLength,
			records   = settings.fnRecordsDisplay();
	
		if ( records === 0 || len === -1 )
		{
			start = 0;
		}
		else if ( typeof action === "number" )
		{
			start = action * len;
	
			if ( start > records )
			{
				start = 0;
			}
		}
		else if ( action == "first" )
		{
			start = 0;
		}
		else if ( action == "previous" )
		{
			start = len >= 0 ?
				start - len :
				0;
	
			if ( start < 0 )
			{
			  start = 0;
			}
		}
		else if ( action == "next" )
		{
			if ( start + len < records )
			{
				start += len;
			}
		}
		else if ( action == "last" )
		{
			start = Math.floor( (records-1) / len) * len;
		}
		else
		{
			_fnLog( settings, 0, "Unknown paging action: "+action, 5 );
		}
	
		var changed = settings._iDisplayStart !== start;
		settings._iDisplayStart = start;
	
		if ( changed ) {
			_fnCallbackFire( settings, null, 'page', [settings] );
	
			if ( redraw ) {
				_fnDraw( settings );
			}
		}
	
		return changed;
	}
	
	
	
	/**
	 * Generate the node required for the processing node
	 *  @param {object} settings dataTables settings object
	 *  @returns {node} Processing element
	 *  @memberof DataTable#oApi
	 */
	function _fnFeatureHtmlProcessing ( settings )
	{
		return $('<div/>', {
				'id': ! settings.aanFeatures.r ? settings.sTableId+'_processing' : null,
				'class': settings.oClasses.sProcessing
			} )
			.html( settings.oLanguage.sProcessing )
			.insertBefore( settings.nTable )[0];
	}
	
	
	/**
	 * Display or hide the processing indicator
	 *  @param {object} settings dataTables settings object
	 *  @param {bool} show Show the processing indicator (true) or not (false)
	 *  @memberof DataTable#oApi
	 */
	function _fnProcessingDisplay ( settings, show )
	{
		if ( settings.oFeatures.bProcessing ) {
			$(settings.aanFeatures.r).css( 'display', show ? 'block' : 'none' );
		}
	
		_fnCallbackFire( settings, null, 'processing', [settings, show] );
	}
	
	/**
	 * Add any control elements for the table - specifically scrolling
	 *  @param {object} settings dataTables settings object
	 *  @returns {node} Node to add to the DOM
	 *  @memberof DataTable#oApi
	 */
	function _fnFeatureHtmlTable ( settings )
	{
		var table = $(settings.nTable);
	
		// Add the ARIA grid role to the table
		table.attr( 'role', 'grid' );
	
		// Scrolling from here on in
		var scroll = settings.oScroll;
	
		if ( scroll.sX === '' && scroll.sY === '' ) {
			return settings.nTable;
		}
	
		var scrollX = scroll.sX;
		var scrollY = scroll.sY;
		var classes = settings.oClasses;
		var caption = table.children('caption');
		var captionSide = caption.length ? caption[0]._captionSide : null;
		var headerClone = $( table[0].cloneNode(false) );
		var footerClone = $( table[0].cloneNode(false) );
		var footer = table.children('tfoot');
		var _div = '<div/>';
		var size = function ( s ) {
			return !s ? null : _fnStringToCss( s );
		};
	
		if ( ! footer.length ) {
			footer = null;
		}
	
		/*
		 * The HTML structure that we want to generate in this function is:
		 *  div - scroller
		 *    div - scroll head
		 *      div - scroll head inner
		 *        table - scroll head table
		 *          thead - thead
		 *    div - scroll body
		 *      table - table (master table)
		 *        thead - thead clone for sizing
		 *        tbody - tbody
		 *    div - scroll foot
		 *      div - scroll foot inner
		 *        table - scroll foot table
		 *          tfoot - tfoot
		 */
		var scroller = $( _div, { 'class': classes.sScrollWrapper } )
			.append(
				$(_div, { 'class': classes.sScrollHead } )
					.css( {
						overflow: 'hidden',
						position: 'relative',
						border: 0,
						width: scrollX ? size(scrollX) : '100%'
					} )
					.append(
						$(_div, { 'class': classes.sScrollHeadInner } )
							.css( {
								'box-sizing': 'content-box',
								width: scroll.sXInner || '100%'
							} )
							.append(
								headerClone
									.removeAttr('id')
									.css( 'margin-left', 0 )
									.append( captionSide === 'top' ? caption : null )
									.append(
										table.children('thead')
									)
							)
					)
			)
			.append(
				$(_div, { 'class': classes.sScrollBody } )
					.css( {
						position: 'relative',
						overflow: 'auto',
						width: size( scrollX )
					} )
					.append( table )
			);
	
		if ( footer ) {
			scroller.append(
				$(_div, { 'class': classes.sScrollFoot } )
					.css( {
						overflow: 'hidden',
						border: 0,
						width: scrollX ? size(scrollX) : '100%'
					} )
					.append(
						$(_div, { 'class': classes.sScrollFootInner } )
							.append(
								footerClone
									.removeAttr('id')
									.css( 'margin-left', 0 )
									.append( captionSide === 'bottom' ? caption : null )
									.append(
										table.children('tfoot')
									)
							)
					)
			);
		}
	
		var children = scroller.children();
		var scrollHead = children[0];
		var scrollBody = children[1];
		var scrollFoot = footer ? children[2] : null;
	
		// When the body is scrolled, then we also want to scroll the headers
		if ( scrollX ) {
			$(scrollBody).on( 'scroll.DT', function (e) {
				var scrollLeft = this.scrollLeft;
	
				scrollHead.scrollLeft = scrollLeft;
	
				if ( footer ) {
					scrollFoot.scrollLeft = scrollLeft;
				}
			} );
		}
	
		$(scrollBody).css('max-height', scrollY);
		if (! scroll.bCollapse) {
			$(scrollBody).css('height', scrollY);
		}
	
		settings.nScrollHead = scrollHead;
		settings.nScrollBody = scrollBody;
		settings.nScrollFoot = scrollFoot;
	
		// On redraw - align columns
		settings.aoDrawCallback.push( {
			"fn": _fnScrollDraw,
			"sName": "scrolling"
		} );
	
		return scroller[0];
	}
	
	
	
	/**
	 * Update the header, footer and body tables for resizing - i.e. column
	 * alignment.
	 *
	 * Welcome to the most horrible function DataTables. The process that this
	 * function follows is basically:
	 *   1. Re-create the table inside the scrolling div
	 *   2. Take live measurements from the DOM
	 *   3. Apply the measurements to align the columns
	 *   4. Clean up
	 *
	 *  @param {object} settings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnScrollDraw ( settings )
	{
		// Given that this is such a monster function, a lot of variables are use
		// to try and keep the minimised size as small as possible
		var
			scroll         = settings.oScroll,
			scrollX        = scroll.sX,
			scrollXInner   = scroll.sXInner,
			scrollY        = scroll.sY,
			barWidth       = scroll.iBarWidth,
			divHeader      = $(settings.nScrollHead),
			divHeaderStyle = divHeader[0].style,
			divHeaderInner = divHeader.children('div'),
			divHeaderInnerStyle = divHeaderInner[0].style,
			divHeaderTable = divHeaderInner.children('table'),
			divBodyEl      = settings.nScrollBody,
			divBody        = $(divBodyEl),
			divBodyStyle   = divBodyEl.style,
			divFooter      = $(settings.nScrollFoot),
			divFooterInner = divFooter.children('div'),
			divFooterTable = divFooterInner.children('table'),
			header         = $(settings.nTHead),
			table          = $(settings.nTable),
			tableEl        = table[0],
			tableStyle     = tableEl.style,
			footer         = settings.nTFoot ? $(settings.nTFoot) : null,
			browser        = settings.oBrowser,
			ie67           = browser.bScrollOversize,
			dtHeaderCells  = _pluck( settings.aoColumns, 'nTh' ),
			headerTrgEls, footerTrgEls,
			headerSrcEls, footerSrcEls,
			headerCopy, footerCopy,
			headerWidths=[], footerWidths=[],
			headerContent=[], footerContent=[],
			idx, correction, sanityWidth,
			zeroOut = function(nSizer) {
				var style = nSizer.style;
				style.paddingTop = "0";
				style.paddingBottom = "0";
				style.borderTopWidth = "0";
				style.borderBottomWidth = "0";
				style.height = 0;
			};
	
		// If the scrollbar visibility has changed from the last draw, we need to
		// adjust the column sizes as the table width will have changed to account
		// for the scrollbar
		var scrollBarVis = divBodyEl.scrollHeight > divBodyEl.clientHeight;
		
		if ( settings.scrollBarVis !== scrollBarVis && settings.scrollBarVis !== undefined ) {
			settings.scrollBarVis = scrollBarVis;
			_fnAdjustColumnSizing( settings );
			return; // adjust column sizing will call this function again
		}
		else {
			settings.scrollBarVis = scrollBarVis;
		}
	
		/*
		 * 1. Re-create the table inside the scrolling div
		 */
	
		// Remove the old minimised thead and tfoot elements in the inner table
		table.children('thead, tfoot').remove();
	
		if ( footer ) {
			footerCopy = footer.clone().prependTo( table );
			footerTrgEls = footer.find('tr'); // the original tfoot is in its own table and must be sized
			footerSrcEls = footerCopy.find('tr');
		}
	
		// Clone the current header and footer elements and then place it into the inner table
		headerCopy = header.clone().prependTo( table );
		headerTrgEls = header.find('tr'); // original header is in its own table
		headerSrcEls = headerCopy.find('tr');
		headerCopy.find('th, td').removeAttr('tabindex');
	
	
		/*
		 * 2. Take live measurements from the DOM - do not alter the DOM itself!
		 */
	
		// Remove old sizing and apply the calculated column widths
		// Get the unique column headers in the newly created (cloned) header. We want to apply the
		// calculated sizes to this header
		if ( ! scrollX )
		{
			divBodyStyle.width = '100%';
			divHeader[0].style.width = '100%';
		}
	
		$.each( _fnGetUniqueThs( settings, headerCopy ), function ( i, el ) {
			idx = _fnVisibleToColumnIndex( settings, i );
			el.style.width = settings.aoColumns[idx].sWidth;
		} );
	
		if ( footer ) {
			_fnApplyToChildren( function(n) {
				n.style.width = "";
			}, footerSrcEls );
		}
	
		// Size the table as a whole
		sanityWidth = table.outerWidth();
		if ( scrollX === "" ) {
			// No x scrolling
			tableStyle.width = "100%";
	
			// IE7 will make the width of the table when 100% include the scrollbar
			// - which is shouldn't. When there is a scrollbar we need to take this
			// into account.
			if ( ie67 && (table.find('tbody').height() > divBodyEl.offsetHeight ||
				divBody.css('overflow-y') == "scroll")
			) {
				tableStyle.width = _fnStringToCss( table.outerWidth() - barWidth);
			}
	
			// Recalculate the sanity width
			sanityWidth = table.outerWidth();
		}
		else if ( scrollXInner !== "" ) {
			// legacy x scroll inner has been given - use it
			tableStyle.width = _fnStringToCss(scrollXInner);
	
			// Recalculate the sanity width
			sanityWidth = table.outerWidth();
		}
	
		// Hidden header should have zero height, so remove padding and borders. Then
		// set the width based on the real headers
	
		// Apply all styles in one pass
		_fnApplyToChildren( zeroOut, headerSrcEls );
	
		// Read all widths in next pass
		_fnApplyToChildren( function(nSizer) {
			headerContent.push( nSizer.innerHTML );
			headerWidths.push( _fnStringToCss( $(nSizer).css('width') ) );
		}, headerSrcEls );
	
		// Apply all widths in final pass
		_fnApplyToChildren( function(nToSize, i) {
			// Only apply widths to the DataTables detected header cells - this
			// prevents complex headers from having contradictory sizes applied
			if ( $.inArray( nToSize, dtHeaderCells ) !== -1 ) {
				nToSize.style.width = headerWidths[i];
			}
		}, headerTrgEls );
	
		$(headerSrcEls).height(0);
	
		/* Same again with the footer if we have one */
		if ( footer )
		{
			_fnApplyToChildren( zeroOut, footerSrcEls );
	
			_fnApplyToChildren( function(nSizer) {
				footerContent.push( nSizer.innerHTML );
				footerWidths.push( _fnStringToCss( $(nSizer).css('width') ) );
			}, footerSrcEls );
	
			_fnApplyToChildren( function(nToSize, i) {
				nToSize.style.width = footerWidths[i];
			}, footerTrgEls );
	
			$(footerSrcEls).height(0);
		}
	
	
		/*
		 * 3. Apply the measurements
		 */
	
		// "Hide" the header and footer that we used for the sizing. We need to keep
		// the content of the cell so that the width applied to the header and body
		// both match, but we want to hide it completely. We want to also fix their
		// width to what they currently are
		_fnApplyToChildren( function(nSizer, i) {
			nSizer.innerHTML = '<div class="dataTables_sizing">'+headerContent[i]+'</div>';
			nSizer.childNodes[0].style.height = "0";
			nSizer.childNodes[0].style.overflow = "hidden";
			nSizer.style.width = headerWidths[i];
		}, headerSrcEls );
	
		if ( footer )
		{
			_fnApplyToChildren( function(nSizer, i) {
				nSizer.innerHTML = '<div class="dataTables_sizing">'+footerContent[i]+'</div>';
				nSizer.childNodes[0].style.height = "0";
				nSizer.childNodes[0].style.overflow = "hidden";
				nSizer.style.width = footerWidths[i];
			}, footerSrcEls );
		}
	
		// Sanity check that the table is of a sensible width. If not then we are going to get
		// misalignment - try to prevent this by not allowing the table to shrink below its min width
		if ( table.outerWidth() < sanityWidth )
		{
			// The min width depends upon if we have a vertical scrollbar visible or not */
			correction = ((divBodyEl.scrollHeight > divBodyEl.offsetHeight ||
				divBody.css('overflow-y') == "scroll")) ?
					sanityWidth+barWidth :
					sanityWidth;
	
			// IE6/7 are a law unto themselves...
			if ( ie67 && (divBodyEl.scrollHeight >
				divBodyEl.offsetHeight || divBody.css('overflow-y') == "scroll")
			) {
				tableStyle.width = _fnStringToCss( correction-barWidth );
			}
	
			// And give the user a warning that we've stopped the table getting too small
			if ( scrollX === "" || scrollXInner !== "" ) {
				_fnLog( settings, 1, 'Possible column misalignment', 6 );
			}
		}
		else
		{
			correction = '100%';
		}
	
		// Apply to the container elements
		divBodyStyle.width = _fnStringToCss( correction );
		divHeaderStyle.width = _fnStringToCss( correction );
	
		if ( footer ) {
			settings.nScrollFoot.style.width = _fnStringToCss( correction );
		}
	
	
		/*
		 * 4. Clean up
		 */
		if ( ! scrollY ) {
			/* IE7< puts a vertical scrollbar in place (when it shouldn't be) due to subtracting
			 * the scrollbar height from the visible display, rather than adding it on. We need to
			 * set the height in order to sort this. Don't want to do it in any other browsers.
			 */
			if ( ie67 ) {
				divBodyStyle.height = _fnStringToCss( tableEl.offsetHeight+barWidth );
			}
		}
	
		/* Finally set the width's of the header and footer tables */
		var iOuterWidth = table.outerWidth();
		divHeaderTable[0].style.width = _fnStringToCss( iOuterWidth );
		divHeaderInnerStyle.width = _fnStringToCss( iOuterWidth );
	
		// Figure out if there are scrollbar present - if so then we need a the header and footer to
		// provide a bit more space to allow "overflow" scrolling (i.e. past the scrollbar)
		var bScrolling = table.height() > divBodyEl.clientHeight || divBody.css('overflow-y') == "scroll";
		var padding = 'padding' + (browser.bScrollbarLeft ? 'Left' : 'Right' );
		divHeaderInnerStyle[ padding ] = bScrolling ? barWidth+"px" : "0px";
	
		if ( footer ) {
			divFooterTable[0].style.width = _fnStringToCss( iOuterWidth );
			divFooterInner[0].style.width = _fnStringToCss( iOuterWidth );
			divFooterInner[0].style[padding] = bScrolling ? barWidth+"px" : "0px";
		}
	
		// Correct DOM ordering for colgroup - comes before the thead
		table.children('colgroup').insertBefore( table.children('thead') );
	
		/* Adjust the position of the header in case we loose the y-scrollbar */
		divBody.trigger('scroll');
	
		// If sorting or filtering has occurred, jump the scrolling back to the top
		// only if we aren't holding the position
		if ( (settings.bSorted || settings.bFiltered) && ! settings._drawHold ) {
			divBodyEl.scrollTop = 0;
		}
	}
	
	
	
	/**
	 * Apply a given function to the display child nodes of an element array (typically
	 * TD children of TR rows
	 *  @param {function} fn Method to apply to the objects
	 *  @param array {nodes} an1 List of elements to look through for display children
	 *  @param array {nodes} an2 Another list (identical structure to the first) - optional
	 *  @memberof DataTable#oApi
	 */
	function _fnApplyToChildren( fn, an1, an2 )
	{
		var index=0, i=0, iLen=an1.length;
		var nNode1, nNode2;
	
		while ( i < iLen ) {
			nNode1 = an1[i].firstChild;
			nNode2 = an2 ? an2[i].firstChild : null;
	
			while ( nNode1 ) {
				if ( nNode1.nodeType === 1 ) {
					if ( an2 ) {
						fn( nNode1, nNode2, index );
					}
					else {
						fn( nNode1, index );
					}
	
					index++;
				}
	
				nNode1 = nNode1.nextSibling;
				nNode2 = an2 ? nNode2.nextSibling : null;
			}
	
			i++;
		}
	}
	
	
	
	var __re_html_remove = /<.*?>/g;
	
	
	/**
	 * Calculate the width of columns for the table
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnCalculateColumnWidths ( oSettings )
	{
		var
			table = oSettings.nTable,
			columns = oSettings.aoColumns,
			scroll = oSettings.oScroll,
			scrollY = scroll.sY,
			scrollX = scroll.sX,
			scrollXInner = scroll.sXInner,
			columnCount = columns.length,
			visibleColumns = _fnGetColumns( oSettings, 'bVisible' ),
			headerCells = $('th', oSettings.nTHead),
			tableWidthAttr = table.getAttribute('width'), // from DOM element
			tableContainer = table.parentNode,
			userInputs = false,
			i, column, columnIdx, width, outerWidth,
			browser = oSettings.oBrowser,
			ie67 = browser.bScrollOversize;
	
		var styleWidth = table.style.width;
		if ( styleWidth && styleWidth.indexOf('%') !== -1 ) {
			tableWidthAttr = styleWidth;
		}
	
		/* Convert any user input sizes into pixel sizes */
		for ( i=0 ; i<visibleColumns.length ; i++ ) {
			column = columns[ visibleColumns[i] ];
	
			if ( column.sWidth !== null ) {
				column.sWidth = _fnConvertToWidth( column.sWidthOrig, tableContainer );
	
				userInputs = true;
			}
		}
	
		/* If the number of columns in the DOM equals the number that we have to
		 * process in DataTables, then we can use the offsets that are created by
		 * the web- browser. No custom sizes can be set in order for this to happen,
		 * nor scrolling used
		 */
		if ( ie67 || ! userInputs && ! scrollX && ! scrollY &&
		     columnCount == _fnVisbleColumns( oSettings ) &&
		     columnCount == headerCells.length
		) {
			for ( i=0 ; i<columnCount ; i++ ) {
				var colIdx = _fnVisibleToColumnIndex( oSettings, i );
	
				if ( colIdx !== null ) {
					columns[ colIdx ].sWidth = _fnStringToCss( headerCells.eq(i).width() );
				}
			}
		}
		else
		{
			// Otherwise construct a single row, worst case, table with the widest
			// node in the data, assign any user defined widths, then insert it into
			// the DOM and allow the browser to do all the hard work of calculating
			// table widths
			var tmpTable = $(table).clone() // don't use cloneNode - IE8 will remove events on the main table
				.css( 'visibility', 'hidden' )
				.removeAttr( 'id' );
	
			// Clean up the table body
			tmpTable.find('tbody tr').remove();
			var tr = $('<tr/>').appendTo( tmpTable.find('tbody') );
	
			// Clone the table header and footer - we can't use the header / footer
			// from the cloned table, since if scrolling is active, the table's
			// real header and footer are contained in different table tags
			tmpTable.find('thead, tfoot').remove();
			tmpTable
				.append( $(oSettings.nTHead).clone() )
				.append( $(oSettings.nTFoot).clone() );
	
			// Remove any assigned widths from the footer (from scrolling)
			tmpTable.find('tfoot th, tfoot td').css('width', '');
	
			// Apply custom sizing to the cloned header
			headerCells = _fnGetUniqueThs( oSettings, tmpTable.find('thead')[0] );
	
			for ( i=0 ; i<visibleColumns.length ; i++ ) {
				column = columns[ visibleColumns[i] ];
	
				headerCells[i].style.width = column.sWidthOrig !== null && column.sWidthOrig !== '' ?
					_fnStringToCss( column.sWidthOrig ) :
					'';
	
				// For scrollX we need to force the column width otherwise the
				// browser will collapse it. If this width is smaller than the
				// width the column requires, then it will have no effect
				if ( column.sWidthOrig && scrollX ) {
					$( headerCells[i] ).append( $('<div/>').css( {
						width: column.sWidthOrig,
						margin: 0,
						padding: 0,
						border: 0,
						height: 1
					} ) );
				}
			}
	
			// Find the widest cell for each column and put it into the table
			if ( oSettings.aoData.length ) {
				for ( i=0 ; i<visibleColumns.length ; i++ ) {
					columnIdx = visibleColumns[i];
					column = columns[ columnIdx ];
	
					$( _fnGetWidestNode( oSettings, columnIdx ) )
						.clone( false )
						.append( column.sContentPadding )
						.appendTo( tr );
				}
			}
	
			// Tidy the temporary table - remove name attributes so there aren't
			// duplicated in the dom (radio elements for example)
			$('[name]', tmpTable).removeAttr('name');
	
			// Table has been built, attach to the document so we can work with it.
			// A holding element is used, positioned at the top of the container
			// with minimal height, so it has no effect on if the container scrolls
			// or not. Otherwise it might trigger scrolling when it actually isn't
			// needed
			var holder = $('<div/>').css( scrollX || scrollY ?
					{
						position: 'absolute',
						top: 0,
						left: 0,
						height: 1,
						right: 0,
						overflow: 'hidden'
					} :
					{}
				)
				.append( tmpTable )
				.appendTo( tableContainer );
	
			// When scrolling (X or Y) we want to set the width of the table as 
			// appropriate. However, when not scrolling leave the table width as it
			// is. This results in slightly different, but I think correct behaviour
			if ( scrollX && scrollXInner ) {
				tmpTable.width( scrollXInner );
			}
			else if ( scrollX ) {
				tmpTable.css( 'width', 'auto' );
				tmpTable.removeAttr('width');
	
				// If there is no width attribute or style, then allow the table to
				// collapse
				if ( tmpTable.width() < tableContainer.clientWidth && tableWidthAttr ) {
					tmpTable.width( tableContainer.clientWidth );
				}
			}
			else if ( scrollY ) {
				tmpTable.width( tableContainer.clientWidth );
			}
			else if ( tableWidthAttr ) {
				tmpTable.width( tableWidthAttr );
			}
	
			// Get the width of each column in the constructed table - we need to
			// know the inner width (so it can be assigned to the other table's
			// cells) and the outer width so we can calculate the full width of the
			// table. This is safe since DataTables requires a unique cell for each
			// column, but if ever a header can span multiple columns, this will
			// need to be modified.
			var total = 0;
			for ( i=0 ; i<visibleColumns.length ; i++ ) {
				var cell = $(headerCells[i]);
				var border = cell.outerWidth() - cell.width();
	
				// Use getBounding... where possible (not IE8-) because it can give
				// sub-pixel accuracy, which we then want to round up!
				var bounding = browser.bBounding ?
					Math.ceil( headerCells[i].getBoundingClientRect().width ) :
					cell.outerWidth();
	
				// Total is tracked to remove any sub-pixel errors as the outerWidth
				// of the table might not equal the total given here (IE!).
				total += bounding;
	
				// Width for each column to use
				columns[ visibleColumns[i] ].sWidth = _fnStringToCss( bounding - border );
			}
	
			table.style.width = _fnStringToCss( total );
	
			// Finished with the table - ditch it
			holder.remove();
		}
	
		// If there is a width attr, we want to attach an event listener which
		// allows the table sizing to automatically adjust when the window is
		// resized. Use the width attr rather than CSS, since we can't know if the
		// CSS is a relative value or absolute - DOM read is always px.
		if ( tableWidthAttr ) {
			table.style.width = _fnStringToCss( tableWidthAttr );
		}
	
		if ( (tableWidthAttr || scrollX) && ! oSettings._reszEvt ) {
			var bindResize = function () {
				$(window).on('resize.DT-'+oSettings.sInstance, _fnThrottle( function () {
					_fnAdjustColumnSizing( oSettings );
				} ) );
			};
	
			// IE6/7 will crash if we bind a resize event handler on page load.
			// To be removed in 1.11 which drops IE6/7 support
			if ( ie67 ) {
				setTimeout( bindResize, 1000 );
			}
			else {
				bindResize();
			}
	
			oSettings._reszEvt = true;
		}
	}
	
	
	/**
	 * Throttle the calls to a function. Arguments and context are maintained for
	 * the throttled function
	 *  @param {function} fn Function to be called
	 *  @param {int} [freq=200] call frequency in mS
	 *  @returns {function} wrapped function
	 *  @memberof DataTable#oApi
	 */
	var _fnThrottle = DataTable.util.throttle;
	
	
	/**
	 * Convert a CSS unit width to pixels (e.g. 2em)
	 *  @param {string} width width to be converted
	 *  @param {node} parent parent to get the with for (required for relative widths) - optional
	 *  @returns {int} width in pixels
	 *  @memberof DataTable#oApi
	 */
	function _fnConvertToWidth ( width, parent )
	{
		if ( ! width ) {
			return 0;
		}
	
		var n = $('<div/>')
			.css( 'width', _fnStringToCss( width ) )
			.appendTo( parent || document.body );
	
		var val = n[0].offsetWidth;
		n.remove();
	
		return val;
	}
	
	
	/**
	 * Get the widest node
	 *  @param {object} settings dataTables settings object
	 *  @param {int} colIdx column of interest
	 *  @returns {node} widest table node
	 *  @memberof DataTable#oApi
	 */
	function _fnGetWidestNode( settings, colIdx )
	{
		var idx = _fnGetMaxLenString( settings, colIdx );
		if ( idx < 0 ) {
			return null;
		}
	
		var data = settings.aoData[ idx ];
		return ! data.nTr ? // Might not have been created when deferred rendering
			$('<td/>').html( _fnGetCellData( settings, idx, colIdx, 'display' ) )[0] :
			data.anCells[ colIdx ];
	}
	
	
	/**
	 * Get the maximum strlen for each data column
	 *  @param {object} settings dataTables settings object
	 *  @param {int} colIdx column of interest
	 *  @returns {string} max string length for each column
	 *  @memberof DataTable#oApi
	 */
	function _fnGetMaxLenString( settings, colIdx )
	{
		var s, max=-1, maxIdx = -1;
	
		for ( var i=0, ien=settings.aoData.length ; i<ien ; i++ ) {
			s = _fnGetCellData( settings, i, colIdx, 'display' )+'';
			s = s.replace( __re_html_remove, '' );
			s = s.replace( /&nbsp;/g, ' ' );
	
			if ( s.length > max ) {
				max = s.length;
				maxIdx = i;
			}
		}
	
		return maxIdx;
	}
	
	
	/**
	 * Append a CSS unit (only if required) to a string
	 *  @param {string} value to css-ify
	 *  @returns {string} value with css unit
	 *  @memberof DataTable#oApi
	 */
	function _fnStringToCss( s )
	{
		if ( s === null ) {
			return '0px';
		}
	
		if ( typeof s == 'number' ) {
			return s < 0 ?
				'0px' :
				s+'px';
		}
	
		// Check it has a unit character already
		return s.match(/\d$/) ?
			s+'px' :
			s;
	}
	
	
	
	function _fnSortFlatten ( settings )
	{
		var
			i, iLen, k, kLen,
			aSort = [],
			aiOrig = [],
			aoColumns = settings.aoColumns,
			aDataSort, iCol, sType, srcCol,
			fixed = settings.aaSortingFixed,
			fixedObj = $.isPlainObject( fixed ),
			nestedSort = [],
			add = function ( a ) {
				if ( a.length && ! $.isArray( a[0] ) ) {
					// 1D array
					nestedSort.push( a );
				}
				else {
					// 2D array
					$.merge( nestedSort, a );
				}
			};
	
		// Build the sort array, with pre-fix and post-fix options if they have been
		// specified
		if ( $.isArray( fixed ) ) {
			add( fixed );
		}
	
		if ( fixedObj && fixed.pre ) {
			add( fixed.pre );
		}
	
		add( settings.aaSorting );
	
		if (fixedObj && fixed.post ) {
			add( fixed.post );
		}
	
		for ( i=0 ; i<nestedSort.length ; i++ )
		{
			srcCol = nestedSort[i][0];
			aDataSort = aoColumns[ srcCol ].aDataSort;
	
			for ( k=0, kLen=aDataSort.length ; k<kLen ; k++ )
			{
				iCol = aDataSort[k];
				sType = aoColumns[ iCol ].sType || 'string';
	
				if ( nestedSort[i]._idx === undefined ) {
					nestedSort[i]._idx = $.inArray( nestedSort[i][1], aoColumns[iCol].asSorting );
				}
	
				aSort.push( {
					src:       srcCol,
					col:       iCol,
					dir:       nestedSort[i][1],
					index:     nestedSort[i]._idx,
					type:      sType,
					formatter: DataTable.ext.type.order[ sType+"-pre" ]
				} );
			}
		}
	
		return aSort;
	}
	
	/**
	 * Change the order of the table
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 *  @todo This really needs split up!
	 */
	function _fnSort ( oSettings )
	{
		var
			i, ien, iLen, j, jLen, k, kLen,
			sDataType, nTh,
			aiOrig = [],
			oExtSort = DataTable.ext.type.order,
			aoData = oSettings.aoData,
			aoColumns = oSettings.aoColumns,
			aDataSort, data, iCol, sType, oSort,
			formatters = 0,
			sortCol,
			displayMaster = oSettings.aiDisplayMaster,
			aSort;
	
		// Resolve any column types that are unknown due to addition or invalidation
		// @todo Can this be moved into a 'data-ready' handler which is called when
		//   data is going to be used in the table?
		_fnColumnTypes( oSettings );
	
		aSort = _fnSortFlatten( oSettings );
	
		for ( i=0, ien=aSort.length ; i<ien ; i++ ) {
			sortCol = aSort[i];
	
			// Track if we can use the fast sort algorithm
			if ( sortCol.formatter ) {
				formatters++;
			}
	
			// Load the data needed for the sort, for each cell
			_fnSortData( oSettings, sortCol.col );
		}
	
		/* No sorting required if server-side or no sorting array */
		if ( _fnDataSource( oSettings ) != 'ssp' && aSort.length !== 0 )
		{
			// Create a value - key array of the current row positions such that we can use their
			// current position during the sort, if values match, in order to perform stable sorting
			for ( i=0, iLen=displayMaster.length ; i<iLen ; i++ ) {
				aiOrig[ displayMaster[i] ] = i;
			}
	
			/* Do the sort - here we want multi-column sorting based on a given data source (column)
			 * and sorting function (from oSort) in a certain direction. It's reasonably complex to
			 * follow on it's own, but this is what we want (example two column sorting):
			 *  fnLocalSorting = function(a,b){
			 *    var iTest;
			 *    iTest = oSort['string-asc']('data11', 'data12');
			 *      if (iTest !== 0)
			 *        return iTest;
			 *    iTest = oSort['numeric-desc']('data21', 'data22');
			 *    if (iTest !== 0)
			 *      return iTest;
			 *    return oSort['numeric-asc']( aiOrig[a], aiOrig[b] );
			 *  }
			 * Basically we have a test for each sorting column, if the data in that column is equal,
			 * test the next column. If all columns match, then we use a numeric sort on the row
			 * positions in the original data array to provide a stable sort.
			 *
			 * Note - I know it seems excessive to have two sorting methods, but the first is around
			 * 15% faster, so the second is only maintained for backwards compatibility with sorting
			 * methods which do not have a pre-sort formatting function.
			 */
			if ( formatters === aSort.length ) {
				// All sort types have formatting functions
				displayMaster.sort( function ( a, b ) {
					var
						x, y, k, test, sort,
						len=aSort.length,
						dataA = aoData[a]._aSortData,
						dataB = aoData[b]._aSortData;
	
					for ( k=0 ; k<len ; k++ ) {
						sort = aSort[k];
	
						x = dataA[ sort.col ];
						y = dataB[ sort.col ];
	
						test = x<y ? -1 : x>y ? 1 : 0;
						if ( test !== 0 ) {
							return sort.dir === 'asc' ? test : -test;
						}
					}
	
					x = aiOrig[a];
					y = aiOrig[b];
					return x<y ? -1 : x>y ? 1 : 0;
				} );
			}
			else {
				// Depreciated - remove in 1.11 (providing a plug-in option)
				// Not all sort types have formatting methods, so we have to call their sorting
				// methods.
				displayMaster.sort( function ( a, b ) {
					var
						x, y, k, l, test, sort, fn,
						len=aSort.length,
						dataA = aoData[a]._aSortData,
						dataB = aoData[b]._aSortData;
	
					for ( k=0 ; k<len ; k++ ) {
						sort = aSort[k];
	
						x = dataA[ sort.col ];
						y = dataB[ sort.col ];
	
						fn = oExtSort[ sort.type+"-"+sort.dir ] || oExtSort[ "string-"+sort.dir ];
						test = fn( x, y );
						if ( test !== 0 ) {
							return test;
						}
					}
	
					x = aiOrig[a];
					y = aiOrig[b];
					return x<y ? -1 : x>y ? 1 : 0;
				} );
			}
		}
	
		/* Tell the draw function that we have sorted the data */
		oSettings.bSorted = true;
	}
	
	
	function _fnSortAria ( settings )
	{
		var label;
		var nextSort;
		var columns = settings.aoColumns;
		var aSort = _fnSortFlatten( settings );
		var oAria = settings.oLanguage.oAria;
	
		// ARIA attributes - need to loop all columns, to update all (removing old
		// attributes as needed)
		for ( var i=0, iLen=columns.length ; i<iLen ; i++ )
		{
			var col = columns[i];
			var asSorting = col.asSorting;
			var sTitle = col.sTitle.replace( /<.*?>/g, "" );
			var th = col.nTh;
	
			// IE7 is throwing an error when setting these properties with jQuery's
			// attr() and removeAttr() methods...
			th.removeAttribute('aria-sort');
	
			/* In ARIA only the first sorting column can be marked as sorting - no multi-sort option */
			if ( col.bSortable ) {
				if ( aSort.length > 0 && aSort[0].col == i ) {
					th.setAttribute('aria-sort', aSort[0].dir=="asc" ? "ascending" : "descending" );
					nextSort = asSorting[ aSort[0].index+1 ] || asSorting[0];
				}
				else {
					nextSort = asSorting[0];
				}
	
				label = sTitle + ( nextSort === "asc" ?
					oAria.sSortAscending :
					oAria.sSortDescending
				);
			}
			else {
				label = sTitle;
			}
	
			th.setAttribute('aria-label', label);
		}
	}
	
	
	/**
	 * Function to run on user sort request
	 *  @param {object} settings dataTables settings object
	 *  @param {node} attachTo node to attach the handler to
	 *  @param {int} colIdx column sorting index
	 *  @param {boolean} [append=false] Append the requested sort to the existing
	 *    sort if true (i.e. multi-column sort)
	 *  @param {function} [callback] callback function
	 *  @memberof DataTable#oApi
	 */
	function _fnSortListener ( settings, colIdx, append, callback )
	{
		var col = settings.aoColumns[ colIdx ];
		var sorting = settings.aaSorting;
		var asSorting = col.asSorting;
		var nextSortIdx;
		var next = function ( a, overflow ) {
			var idx = a._idx;
			if ( idx === undefined ) {
				idx = $.inArray( a[1], asSorting );
			}
	
			return idx+1 < asSorting.length ?
				idx+1 :
				overflow ?
					null :
					0;
		};
	
		// Convert to 2D array if needed
		if ( typeof sorting[0] === 'number' ) {
			sorting = settings.aaSorting = [ sorting ];
		}
	
		// If appending the sort then we are multi-column sorting
		if ( append && settings.oFeatures.bSortMulti ) {
			// Are we already doing some kind of sort on this column?
			var sortIdx = $.inArray( colIdx, _pluck(sorting, '0') );
	
			if ( sortIdx !== -1 ) {
				// Yes, modify the sort
				nextSortIdx = next( sorting[sortIdx], true );
	
				if ( nextSortIdx === null && sorting.length === 1 ) {
					nextSortIdx = 0; // can't remove sorting completely
				}
	
				if ( nextSortIdx === null ) {
					sorting.splice( sortIdx, 1 );
				}
				else {
					sorting[sortIdx][1] = asSorting[ nextSortIdx ];
					sorting[sortIdx]._idx = nextSortIdx;
				}
			}
			else {
				// No sort on this column yet
				sorting.push( [ colIdx, asSorting[0], 0 ] );
				sorting[sorting.length-1]._idx = 0;
			}
		}
		else if ( sorting.length && sorting[0][0] == colIdx ) {
			// Single column - already sorting on this column, modify the sort
			nextSortIdx = next( sorting[0] );
	
			sorting.length = 1;
			sorting[0][1] = asSorting[ nextSortIdx ];
			sorting[0]._idx = nextSortIdx;
		}
		else {
			// Single column - sort only on this column
			sorting.length = 0;
			sorting.push( [ colIdx, asSorting[0] ] );
			sorting[0]._idx = 0;
		}
	
		// Run the sort by calling a full redraw
		_fnReDraw( settings );
	
		// callback used for async user interaction
		if ( typeof callback == 'function' ) {
			callback( settings );
		}
	}
	
	
	/**
	 * Attach a sort handler (click) to a node
	 *  @param {object} settings dataTables settings object
	 *  @param {node} attachTo node to attach the handler to
	 *  @param {int} colIdx column sorting index
	 *  @param {function} [callback] callback function
	 *  @memberof DataTable#oApi
	 */
	function _fnSortAttachListener ( settings, attachTo, colIdx, callback )
	{
		var col = settings.aoColumns[ colIdx ];
	
		_fnBindAction( attachTo, {}, function (e) {
			/* If the column is not sortable - don't to anything */
			if ( col.bSortable === false ) {
				return;
			}
	
			// If processing is enabled use a timeout to allow the processing
			// display to be shown - otherwise to it synchronously
			if ( settings.oFeatures.bProcessing ) {
				_fnProcessingDisplay( settings, true );
	
				setTimeout( function() {
					_fnSortListener( settings, colIdx, e.shiftKey, callback );
	
					// In server-side processing, the draw callback will remove the
					// processing display
					if ( _fnDataSource( settings ) !== 'ssp' ) {
						_fnProcessingDisplay( settings, false );
					}
				}, 0 );
			}
			else {
				_fnSortListener( settings, colIdx, e.shiftKey, callback );
			}
		} );
	}
	
	
	/**
	 * Set the sorting classes on table's body, Note: it is safe to call this function
	 * when bSort and bSortClasses are false
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnSortingClasses( settings )
	{
		var oldSort = settings.aLastSort;
		var sortClass = settings.oClasses.sSortColumn;
		var sort = _fnSortFlatten( settings );
		var features = settings.oFeatures;
		var i, ien, colIdx;
	
		if ( features.bSort && features.bSortClasses ) {
			// Remove old sorting classes
			for ( i=0, ien=oldSort.length ; i<ien ; i++ ) {
				colIdx = oldSort[i].src;
	
				// Remove column sorting
				$( _pluck( settings.aoData, 'anCells', colIdx ) )
					.removeClass( sortClass + (i<2 ? i+1 : 3) );
			}
	
			// Add new column sorting
			for ( i=0, ien=sort.length ; i<ien ; i++ ) {
				colIdx = sort[i].src;
	
				$( _pluck( settings.aoData, 'anCells', colIdx ) )
					.addClass( sortClass + (i<2 ? i+1 : 3) );
			}
		}
	
		settings.aLastSort = sort;
	}
	
	
	// Get the data to sort a column, be it from cache, fresh (populating the
	// cache), or from a sort formatter
	function _fnSortData( settings, idx )
	{
		// Custom sorting function - provided by the sort data type
		var column = settings.aoColumns[ idx ];
		var customSort = DataTable.ext.order[ column.sSortDataType ];
		var customData;
	
		if ( customSort ) {
			customData = customSort.call( settings.oInstance, settings, idx,
				_fnColumnIndexToVisible( settings, idx )
			);
		}
	
		// Use / populate cache
		var row, cellData;
		var formatter = DataTable.ext.type.order[ column.sType+"-pre" ];
	
		for ( var i=0, ien=settings.aoData.length ; i<ien ; i++ ) {
			row = settings.aoData[i];
	
			if ( ! row._aSortData ) {
				row._aSortData = [];
			}
	
			if ( ! row._aSortData[idx] || customSort ) {
				cellData = customSort ?
					customData[i] : // If there was a custom sort function, use data from there
					_fnGetCellData( settings, i, idx, 'sort' );
	
				row._aSortData[ idx ] = formatter ?
					formatter( cellData ) :
					cellData;
			}
		}
	}
	
	
	
	/**
	 * Save the state of a table
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnSaveState ( settings )
	{
		if ( !settings.oFeatures.bStateSave || settings.bDestroying )
		{
			return;
		}
	
		/* Store the interesting variables */
		var state = {
			time:    +new Date(),
			start:   settings._iDisplayStart,
			length:  settings._iDisplayLength,
			order:   $.extend( true, [], settings.aaSorting ),
			search:  _fnSearchToCamel( settings.oPreviousSearch ),
			columns: $.map( settings.aoColumns, function ( col, i ) {
				return {
					visible: col.bVisible,
					search: _fnSearchToCamel( settings.aoPreSearchCols[i] )
				};
			} )
		};
	
		_fnCallbackFire( settings, "aoStateSaveParams", 'stateSaveParams', [settings, state] );
	
		settings.oSavedState = state;
		settings.fnStateSaveCallback.call( settings.oInstance, settings, state );
	}
	
	
	/**
	 * Attempt to load a saved table state
	 *  @param {object} oSettings dataTables settings object
	 *  @param {object} oInit DataTables init object so we can override settings
	 *  @param {function} callback Callback to execute when the state has been loaded
	 *  @memberof DataTable#oApi
	 */
	function _fnLoadState ( settings, oInit, callback )
	{
		var i, ien;
		var columns = settings.aoColumns;
		var loaded = function ( s ) {
			if ( ! s || ! s.time ) {
				callback();
				return;
			}
	
			// Allow custom and plug-in manipulation functions to alter the saved data set and
			// cancelling of loading by returning false
			var abStateLoad = _fnCallbackFire( settings, 'aoStateLoadParams', 'stateLoadParams', [settings, s] );
			if ( $.inArray( false, abStateLoad ) !== -1 ) {
				callback();
				return;
			}
	
			// Reject old data
			var duration = settings.iStateDuration;
			if ( duration > 0 && s.time < +new Date() - (duration*1000) ) {
				callback();
				return;
			}
	
			// Number of columns have changed - all bets are off, no restore of settings
			if ( s.columns && columns.length !== s.columns.length ) {
				callback();
				return;
			}
	
			// Store the saved state so it might be accessed at any time
			settings.oLoadedState = $.extend( true, {}, s );
	
			// Restore key features - todo - for 1.11 this needs to be done by
			// subscribed events
			if ( s.start !== undefined ) {
				settings._iDisplayStart    = s.start;
				settings.iInitDisplayStart = s.start;
			}
			if ( s.length !== undefined ) {
				settings._iDisplayLength   = s.length;
			}
	
			// Order
			if ( s.order !== undefined ) {
				settings.aaSorting = [];
				$.each( s.order, function ( i, col ) {
					settings.aaSorting.push( col[0] >= columns.length ?
						[ 0, col[1] ] :
						col
					);
				} );
			}
	
			// Search
			if ( s.search !== undefined ) {
				$.extend( settings.oPreviousSearch, _fnSearchToHung( s.search ) );
			}
	
			// Columns
			//
			if ( s.columns ) {
				for ( i=0, ien=s.columns.length ; i<ien ; i++ ) {
					var col = s.columns[i];
	
					// Visibility
					if ( col.visible !== undefined ) {
						columns[i].bVisible = col.visible;
					}
	
					// Search
					if ( col.search !== undefined ) {
						$.extend( settings.aoPreSearchCols[i], _fnSearchToHung( col.search ) );
					}
				}
			}
	
			_fnCallbackFire( settings, 'aoStateLoaded', 'stateLoaded', [settings, s] );
			callback();
		};
	
		if ( ! settings.oFeatures.bStateSave ) {
			callback();
			return;
		}
	
		var state = settings.fnStateLoadCallback.call( settings.oInstance, settings, loaded );
	
		if ( state !== undefined ) {
			loaded( state );
		}
		// otherwise, wait for the loaded callback to be executed
	}
	
	
	/**
	 * Return the settings object for a particular table
	 *  @param {node} table table we are using as a dataTable
	 *  @returns {object} Settings object - or null if not found
	 *  @memberof DataTable#oApi
	 */
	function _fnSettingsFromNode ( table )
	{
		var settings = DataTable.settings;
		var idx = $.inArray( table, _pluck( settings, 'nTable' ) );
	
		return idx !== -1 ?
			settings[ idx ] :
			null;
	}
	
	
	/**
	 * Log an error message
	 *  @param {object} settings dataTables settings object
	 *  @param {int} level log error messages, or display them to the user
	 *  @param {string} msg error message
	 *  @param {int} tn Technical note id to get more information about the error.
	 *  @memberof DataTable#oApi
	 */
	function _fnLog( settings, level, msg, tn )
	{
		msg = 'DataTables warning: '+
			(settings ? 'table id='+settings.sTableId+' - ' : '')+msg;
	
		if ( tn ) {
			msg += '. For more information about this error, please see '+
			'http://datatables.net/tn/'+tn;
		}
	
		if ( ! level  ) {
			// Backwards compatibility pre 1.10
			var ext = DataTable.ext;
			var type = ext.sErrMode || ext.errMode;
	
			if ( settings ) {
				_fnCallbackFire( settings, null, 'error', [ settings, tn, msg ] );
			}
	
			if ( type == 'alert' ) {
				alert( msg );
			}
			else if ( type == 'throw' ) {
				throw new Error(msg);
			}
			else if ( typeof type == 'function' ) {
				type( settings, tn, msg );
			}
		}
		else if ( window.console && console.log ) {
			console.log( msg );
		}
	}
	
	
	/**
	 * See if a property is defined on one object, if so assign it to the other object
	 *  @param {object} ret target object
	 *  @param {object} src source object
	 *  @param {string} name property
	 *  @param {string} [mappedName] name to map too - optional, name used if not given
	 *  @memberof DataTable#oApi
	 */
	function _fnMap( ret, src, name, mappedName )
	{
		if ( $.isArray( name ) ) {
			$.each( name, function (i, val) {
				if ( $.isArray( val ) ) {
					_fnMap( ret, src, val[0], val[1] );
				}
				else {
					_fnMap( ret, src, val );
				}
			} );
	
			return;
		}
	
		if ( mappedName === undefined ) {
			mappedName = name;
		}
	
		if ( src[name] !== undefined ) {
			ret[mappedName] = src[name];
		}
	}
	
	
	/**
	 * Extend objects - very similar to jQuery.extend, but deep copy objects, and
	 * shallow copy arrays. The reason we need to do this, is that we don't want to
	 * deep copy array init values (such as aaSorting) since the dev wouldn't be
	 * able to override them, but we do want to deep copy arrays.
	 *  @param {object} out Object to extend
	 *  @param {object} extender Object from which the properties will be applied to
	 *      out
	 *  @param {boolean} breakRefs If true, then arrays will be sliced to take an
	 *      independent copy with the exception of the `data` or `aaData` parameters
	 *      if they are present. This is so you can pass in a collection to
	 *      DataTables and have that used as your data source without breaking the
	 *      references
	 *  @returns {object} out Reference, just for convenience - out === the return.
	 *  @memberof DataTable#oApi
	 *  @todo This doesn't take account of arrays inside the deep copied objects.
	 */
	function _fnExtend( out, extender, breakRefs )
	{
		var val;
	
		for ( var prop in extender ) {
			if ( extender.hasOwnProperty(prop) ) {
				val = extender[prop];
	
				if ( $.isPlainObject( val ) ) {
					if ( ! $.isPlainObject( out[prop] ) ) {
						out[prop] = {};
					}
					$.extend( true, out[prop], val );
				}
				else if ( breakRefs && prop !== 'data' && prop !== 'aaData' && $.isArray(val) ) {
					out[prop] = val.slice();
				}
				else {
					out[prop] = val;
				}
			}
		}
	
		return out;
	}
	
	
	/**
	 * Bind an event handers to allow a click or return key to activate the callback.
	 * This is good for accessibility since a return on the keyboard will have the
	 * same effect as a click, if the element has focus.
	 *  @param {element} n Element to bind the action to
	 *  @param {object} oData Data object to pass to the triggered function
	 *  @param {function} fn Callback function for when the event is triggered
	 *  @memberof DataTable#oApi
	 */
	function _fnBindAction( n, oData, fn )
	{
		$(n)
			.on( 'click.DT', oData, function (e) {
					$(n).trigger('blur'); // Remove focus outline for mouse users
					fn(e);
				} )
			.on( 'keypress.DT', oData, function (e){
					if ( e.which === 13 ) {
						e.preventDefault();
						fn(e);
					}
				} )
			.on( 'selectstart.DT', function () {
					/* Take the brutal approach to cancelling text selection */
					return false;
				} );
	}
	
	
	/**
	 * Register a callback function. Easily allows a callback function to be added to
	 * an array store of callback functions that can then all be called together.
	 *  @param {object} oSettings dataTables settings object
	 *  @param {string} sStore Name of the array storage for the callbacks in oSettings
	 *  @param {function} fn Function to be called back
	 *  @param {string} sName Identifying name for the callback (i.e. a label)
	 *  @memberof DataTable#oApi
	 */
	function _fnCallbackReg( oSettings, sStore, fn, sName )
	{
		if ( fn )
		{
			oSettings[sStore].push( {
				"fn": fn,
				"sName": sName
			} );
		}
	}
	
	
	/**
	 * Fire callback functions and trigger events. Note that the loop over the
	 * callback array store is done backwards! Further note that you do not want to
	 * fire off triggers in time sensitive applications (for example cell creation)
	 * as its slow.
	 *  @param {object} settings dataTables settings object
	 *  @param {string} callbackArr Name of the array storage for the callbacks in
	 *      oSettings
	 *  @param {string} eventName Name of the jQuery custom event to trigger. If
	 *      null no trigger is fired
	 *  @param {array} args Array of arguments to pass to the callback function /
	 *      trigger
	 *  @memberof DataTable#oApi
	 */
	function _fnCallbackFire( settings, callbackArr, eventName, args )
	{
		var ret = [];
	
		if ( callbackArr ) {
			ret = $.map( settings[callbackArr].slice().reverse(), function (val, i) {
				return val.fn.apply( settings.oInstance, args );
			} );
		}
	
		if ( eventName !== null ) {
			var e = $.Event( eventName+'.dt' );
	
			$(settings.nTable).trigger( e, args );
	
			ret.push( e.result );
		}
	
		return ret;
	}
	
	
	function _fnLengthOverflow ( settings )
	{
		var
			start = settings._iDisplayStart,
			end = settings.fnDisplayEnd(),
			len = settings._iDisplayLength;
	
		/* If we have space to show extra rows (backing up from the end point - then do so */
		if ( start >= end )
		{
			start = end - len;
		}
	
		// Keep the start record on the current page
		start -= (start % len);
	
		if ( len === -1 || start < 0 )
		{
			start = 0;
		}
	
		settings._iDisplayStart = start;
	}
	
	
	function _fnRenderer( settings, type )
	{
		var renderer = settings.renderer;
		var host = DataTable.ext.renderer[type];
	
		if ( $.isPlainObject( renderer ) && renderer[type] ) {
			// Specific renderer for this type. If available use it, otherwise use
			// the default.
			return host[renderer[type]] || host._;
		}
		else if ( typeof renderer === 'string' ) {
			// Common renderer - if there is one available for this type use it,
			// otherwise use the default
			return host[renderer] || host._;
		}
	
		// Use the default
		return host._;
	}
	
	
	/**
	 * Detect the data source being used for the table. Used to simplify the code
	 * a little (ajax) and to make it compress a little smaller.
	 *
	 *  @param {object} settings dataTables settings object
	 *  @returns {string} Data source
	 *  @memberof DataTable#oApi
	 */
	function _fnDataSource ( settings )
	{
		if ( settings.oFeatures.bServerSide ) {
			return 'ssp';
		}
		else if ( settings.ajax || settings.sAjaxSource ) {
			return 'ajax';
		}
		return 'dom';
	}
	

	
	
	/**
	 * Computed structure of the DataTables API, defined by the options passed to
	 * `DataTable.Api.register()` when building the API.
	 *
	 * The structure is built in order to speed creation and extension of the Api
	 * objects since the extensions are effectively pre-parsed.
	 *
	 * The array is an array of objects with the following structure, where this
	 * base array represents the Api prototype base:
	 *
	 *     [
	 *       {
	 *         name:      'data'                -- string   - Property name
	 *         val:       function () {},       -- function - Api method (or undefined if just an object
	 *         methodExt: [ ... ],              -- array    - Array of Api object definitions to extend the method result
	 *         propExt:   [ ... ]               -- array    - Array of Api object definitions to extend the property
	 *       },
	 *       {
	 *         name:     'row'
	 *         val:       {},
	 *         methodExt: [ ... ],
	 *         propExt:   [
	 *           {
	 *             name:      'data'
	 *             val:       function () {},
	 *             methodExt: [ ... ],
	 *             propExt:   [ ... ]
	 *           },
	 *           ...
	 *         ]
	 *       }
	 *     ]
	 *
	 * @type {Array}
	 * @ignore
	 */
	var __apiStruct = [];
	
	
	/**
	 * `Array.prototype` reference.
	 *
	 * @type object
	 * @ignore
	 */
	var __arrayProto = Array.prototype;
	
	
	/**
	 * Abstraction for `context` parameter of the `Api` constructor to allow it to
	 * take several different forms for ease of use.
	 *
	 * Each of the input parameter types will be converted to a DataTables settings
	 * object where possible.
	 *
	 * @param  {string|node|jQuery|object} mixed DataTable identifier. Can be one
	 *   of:
	 *
	 *   * `string` - jQuery selector. Any DataTables' matching the given selector
	 *     with be found and used.
	 *   * `node` - `TABLE` node which has already been formed into a DataTable.
	 *   * `jQuery` - A jQuery object of `TABLE` nodes.
	 *   * `object` - DataTables settings object
	 *   * `DataTables.Api` - API instance
	 * @return {array|null} Matching DataTables settings objects. `null` or
	 *   `undefined` is returned if no matching DataTable is found.
	 * @ignore
	 */
	var _toSettings = function ( mixed )
	{
		var idx, jq;
		var settings = DataTable.settings;
		var tables = $.map( settings, function (el, i) {
			return el.nTable;
		} );
	
		if ( ! mixed ) {
			return [];
		}
		else if ( mixed.nTable && mixed.oApi ) {
			// DataTables settings object
			return [ mixed ];
		}
		else if ( mixed.nodeName && mixed.nodeName.toLowerCase() === 'table' ) {
			// Table node
			idx = $.inArray( mixed, tables );
			return idx !== -1 ? [ settings[idx] ] : null;
		}
		else if ( mixed && typeof mixed.settings === 'function' ) {
			return mixed.settings().toArray();
		}
		else if ( typeof mixed === 'string' ) {
			// jQuery selector
			jq = $(mixed);
		}
		else if ( mixed instanceof $ ) {
			// jQuery object (also DataTables instance)
			jq = mixed;
		}
	
		if ( jq ) {
			return jq.map( function(i) {
				idx = $.inArray( this, tables );
				return idx !== -1 ? settings[idx] : null;
			} ).toArray();
		}
	};
	
	
	/**
	 * DataTables API class - used to control and interface with  one or more
	 * DataTables enhanced tables.
	 *
	 * The API class is heavily based on jQuery, presenting a chainable interface
	 * that you can use to interact with tables. Each instance of the API class has
	 * a "context" - i.e. the tables that it will operate on. This could be a single
	 * table, all tables on a page or a sub-set thereof.
	 *
	 * Additionally the API is designed to allow you to easily work with the data in
	 * the tables, retrieving and manipulating it as required. This is done by
	 * presenting the API class as an array like interface. The contents of the
	 * array depend upon the actions requested by each method (for example
	 * `rows().nodes()` will return an array of nodes, while `rows().data()` will
	 * return an array of objects or arrays depending upon your table's
	 * configuration). The API object has a number of array like methods (`push`,
	 * `pop`, `reverse` etc) as well as additional helper methods (`each`, `pluck`,
	 * `unique` etc) to assist your working with the data held in a table.
	 *
	 * Most methods (those which return an Api instance) are chainable, which means
	 * the return from a method call also has all of the methods available that the
	 * top level object had. For example, these two calls are equivalent:
	 *
	 *     // Not chained
	 *     api.row.add( {...} );
	 *     api.draw();
	 *
	 *     // Chained
	 *     api.row.add( {...} ).draw();
	 *
	 * @class DataTable.Api
	 * @param {array|object|string|jQuery} context DataTable identifier. This is
	 *   used to define which DataTables enhanced tables this API will operate on.
	 *   Can be one of:
	 *
	 *   * `string` - jQuery selector. Any DataTables' matching the given selector
	 *     with be found and used.
	 *   * `node` - `TABLE` node which has already been formed into a DataTable.
	 *   * `jQuery` - A jQuery object of `TABLE` nodes.
	 *   * `object` - DataTables settings object
	 * @param {array} [data] Data to initialise the Api instance with.
	 *
	 * @example
	 *   // Direct initialisation during DataTables construction
	 *   var api = $('#example').DataTable();
	 *
	 * @example
	 *   // Initialisation using a DataTables jQuery object
	 *   var api = $('#example').dataTable().api();
	 *
	 * @example
	 *   // Initialisation as a constructor
	 *   var api = new $.fn.DataTable.Api( 'table.dataTable' );
	 */
	_Api = function ( context, data )
	{
		if ( ! (this instanceof _Api) ) {
			return new _Api( context, data );
		}
	
		var settings = [];
		var ctxSettings = function ( o ) {
			var a = _toSettings( o );
			if ( a ) {
				settings.push.apply( settings, a );
			}
		};
	
		if ( $.isArray( context ) ) {
			for ( var i=0, ien=context.length ; i<ien ; i++ ) {
				ctxSettings( context[i] );
			}
		}
		else {
			ctxSettings( context );
		}
	
		// Remove duplicates
		this.context = _unique( settings );
	
		// Initial data
		if ( data ) {
			$.merge( this, data );
		}
	
		// selector
		this.selector = {
			rows: null,
			cols: null,
			opts: null
		};
	
		_Api.extend( this, this, __apiStruct );
	};
	
	DataTable.Api = _Api;
	
	// Don't destroy the existing prototype, just extend it. Required for jQuery 2's
	// isPlainObject.
	$.extend( _Api.prototype, {
		any: function ()
		{
			return this.count() !== 0;
		},
	
	
		concat:  __arrayProto.concat,
	
	
		context: [], // array of table settings objects
	
	
		count: function ()
		{
			return this.flatten().length;
		},
	
	
		each: function ( fn )
		{
			for ( var i=0, ien=this.length ; i<ien; i++ ) {
				fn.call( this, this[i], i, this );
			}
	
			return this;
		},
	
	
		eq: function ( idx )
		{
			var ctx = this.context;
	
			return ctx.length > idx ?
				new _Api( ctx[idx], this[idx] ) :
				null;
		},
	
	
		filter: function ( fn )
		{
			var a = [];
	
			if ( __arrayProto.filter ) {
				a = __arrayProto.filter.call( this, fn, this );
			}
			else {
				// Compatibility for browsers without EMCA-252-5 (JS 1.6)
				for ( var i=0, ien=this.length ; i<ien ; i++ ) {
					if ( fn.call( this, this[i], i, this ) ) {
						a.push( this[i] );
					}
				}
			}
	
			return new _Api( this.context, a );
		},
	
	
		flatten: function ()
		{
			var a = [];
			return new _Api( this.context, a.concat.apply( a, this.toArray() ) );
		},
	
	
		join:    __arrayProto.join,
	
	
		indexOf: __arrayProto.indexOf || function (obj, start)
		{
			for ( var i=(start || 0), ien=this.length ; i<ien ; i++ ) {
				if ( this[i] === obj ) {
					return i;
				}
			}
			return -1;
		},
	
		iterator: function ( flatten, type, fn, alwaysNew ) {
			var
				a = [], ret,
				i, ien, j, jen,
				context = this.context,
				rows, items, item,
				selector = this.selector;
	
			// Argument shifting
			if ( typeof flatten === 'string' ) {
				alwaysNew = fn;
				fn = type;
				type = flatten;
				flatten = false;
			}
	
			for ( i=0, ien=context.length ; i<ien ; i++ ) {
				var apiInst = new _Api( context[i] );
	
				if ( type === 'table' ) {
					ret = fn.call( apiInst, context[i], i );
	
					if ( ret !== undefined ) {
						a.push( ret );
					}
				}
				else if ( type === 'columns' || type === 'rows' ) {
					// this has same length as context - one entry for each table
					ret = fn.call( apiInst, context[i], this[i], i );
	
					if ( ret !== undefined ) {
						a.push( ret );
					}
				}
				else if ( type === 'column' || type === 'column-rows' || type === 'row' || type === 'cell' ) {
					// columns and rows share the same structure.
					// 'this' is an array of column indexes for each context
					items = this[i];
	
					if ( type === 'column-rows' ) {
						rows = _selector_row_indexes( context[i], selector.opts );
					}
	
					for ( j=0, jen=items.length ; j<jen ; j++ ) {
						item = items[j];
	
						if ( type === 'cell' ) {
							ret = fn.call( apiInst, context[i], item.row, item.column, i, j );
						}
						else {
							ret = fn.call( apiInst, context[i], item, i, j, rows );
						}
	
						if ( ret !== undefined ) {
							a.push( ret );
						}
					}
				}
			}
	
			if ( a.length || alwaysNew ) {
				var api = new _Api( context, flatten ? a.concat.apply( [], a ) : a );
				var apiSelector = api.selector;
				apiSelector.rows = selector.rows;
				apiSelector.cols = selector.cols;
				apiSelector.opts = selector.opts;
				return api;
			}
			return this;
		},
	
	
		lastIndexOf: __arrayProto.lastIndexOf || function (obj, start)
		{
			// Bit cheeky...
			return this.indexOf.apply( this.toArray.reverse(), arguments );
		},
	
	
		length:  0,
	
	
		map: function ( fn )
		{
			var a = [];
	
			if ( __arrayProto.map ) {
				a = __arrayProto.map.call( this, fn, this );
			}
			else {
				// Compatibility for browsers without EMCA-252-5 (JS 1.6)
				for ( var i=0, ien=this.length ; i<ien ; i++ ) {
					a.push( fn.call( this, this[i], i ) );
				}
			}
	
			return new _Api( this.context, a );
		},
	
	
		pluck: function ( prop )
		{
			return this.map( function ( el ) {
				return el[ prop ];
			} );
		},
	
		pop:     __arrayProto.pop,
	
	
		push:    __arrayProto.push,
	
	
		// Does not return an API instance
		reduce: __arrayProto.reduce || function ( fn, init )
		{
			return _fnReduce( this, fn, init, 0, this.length, 1 );
		},
	
	
		reduceRight: __arrayProto.reduceRight || function ( fn, init )
		{
			return _fnReduce( this, fn, init, this.length-1, -1, -1 );
		},
	
	
		reverse: __arrayProto.reverse,
	
	
		// Object with rows, columns and opts
		selector: null,
	
	
		shift:   __arrayProto.shift,
	
	
		slice: function () {
			return new _Api( this.context, this );
		},
	
	
		sort:    __arrayProto.sort, // ? name - order?
	
	
		splice:  __arrayProto.splice,
	
	
		toArray: function ()
		{
			return __arrayProto.slice.call( this );
		},
	
	
		to$: function ()
		{
			return $( this );
		},
	
	
		toJQuery: function ()
		{
			return $( this );
		},
	
	
		unique: function ()
		{
			return new _Api( this.context, _unique(this) );
		},
	
	
		unshift: __arrayProto.unshift
	} );
	
	
	_Api.extend = function ( scope, obj, ext )
	{
		// Only extend API instances and static properties of the API
		if ( ! ext.length || ! obj || ( ! (obj instanceof _Api) && ! obj.__dt_wrapper ) ) {
			return;
		}
	
		var
			i, ien,
			struct,
			methodScoping = function ( scope, fn, struc ) {
				return function () {
					var ret = fn.apply( scope, arguments );
	
					// Method extension
					_Api.extend( ret, ret, struc.methodExt );
					return ret;
				};
			};
	
		for ( i=0, ien=ext.length ; i<ien ; i++ ) {
			struct = ext[i];
	
			// Value
			obj[ struct.name ] = struct.type === 'function' ?
				methodScoping( scope, struct.val, struct ) :
				struct.type === 'object' ?
					{} :
					struct.val;
	
			obj[ struct.name ].__dt_wrapper = true;
	
			// Property extension
			_Api.extend( scope, obj[ struct.name ], struct.propExt );
		}
	};
	
	
	// @todo - Is there need for an augment function?
	// _Api.augment = function ( inst, name )
	// {
	// 	// Find src object in the structure from the name
	// 	var parts = name.split('.');
	
	// 	_Api.extend( inst, obj );
	// };
	
	
	//     [
	//       {
	//         name:      'data'                -- string   - Property name
	//         val:       function () {},       -- function - Api method (or undefined if just an object
	//         methodExt: [ ... ],              -- array    - Array of Api object definitions to extend the method result
	//         propExt:   [ ... ]               -- array    - Array of Api object definitions to extend the property
	//       },
	//       {
	//         name:     'row'
	//         val:       {},
	//         methodExt: [ ... ],
	//         propExt:   [
	//           {
	//             name:      'data'
	//             val:       function () {},
	//             methodExt: [ ... ],
	//             propExt:   [ ... ]
	//           },
	//           ...
	//         ]
	//       }
	//     ]
	
	_Api.register = _api_register = function ( name, val )
	{
		if ( $.isArray( name ) ) {
			for ( var j=0, jen=name.length ; j<jen ; j++ ) {
				_Api.register( name[j], val );
			}
			return;
		}
	
		var
			i, ien,
			heir = name.split('.'),
			struct = __apiStruct,
			key, method;
	
		var find = function ( src, name ) {
			for ( var i=0, ien=src.length ; i<ien ; i++ ) {
				if ( src[i].name === name ) {
					return src[i];
				}
			}
			return null;
		};
	
		for ( i=0, ien=heir.length ; i<ien ; i++ ) {
			method = heir[i].indexOf('()') !== -1;
			key = method ?
				heir[i].replace('()', '') :
				heir[i];
	
			var src = find( struct, key );
			if ( ! src ) {
				src = {
					name:      key,
					val:       {},
					methodExt: [],
					propExt:   [],
					type:      'object'
				};
				struct.push( src );
			}
	
			if ( i === ien-1 ) {
				src.val = val;
				src.type = typeof val === 'function' ?
					'function' :
					$.isPlainObject( val ) ?
						'object' :
						'other';
			}
			else {
				struct = method ?
					src.methodExt :
					src.propExt;
			}
		}
	};
	
	_Api.registerPlural = _api_registerPlural = function ( pluralName, singularName, val ) {
		_Api.register( pluralName, val );
	
		_Api.register( singularName, function () {
			var ret = val.apply( this, arguments );
	
			if ( ret === this ) {
				// Returned item is the API instance that was passed in, return it
				return this;
			}
			else if ( ret instanceof _Api ) {
				// New API instance returned, want the value from the first item
				// in the returned array for the singular result.
				return ret.length ?
					$.isArray( ret[0] ) ?
						new _Api( ret.context, ret[0] ) : // Array results are 'enhanced'
						ret[0] :
					undefined;
			}
	
			// Non-API return - just fire it back
			return ret;
		} );
	};
	
	
	/**
	 * Selector for HTML tables. Apply the given selector to the give array of
	 * DataTables settings objects.
	 *
	 * @param {string|integer} [selector] jQuery selector string or integer
	 * @param  {array} Array of DataTables settings objects to be filtered
	 * @return {array}
	 * @ignore
	 */
	var __table_selector = function ( selector, a )
	{
		if ( $.isArray(selector) ) {
			return $.map( selector, function (item) {
				return __table_selector(item, a);
			} );
		}
	
		// Integer is used to pick out a table by index
		if ( typeof selector === 'number' ) {
			return [ a[ selector ] ];
		}
	
		// Perform a jQuery selector on the table nodes
		var nodes = $.map( a, function (el, i) {
			return el.nTable;
		} );
	
		return $(nodes)
			.filter( selector )
			.map( function (i) {
				// Need to translate back from the table node to the settings
				var idx = $.inArray( this, nodes );
				return a[ idx ];
			} )
			.toArray();
	};
	
	
	
	/**
	 * Context selector for the API's context (i.e. the tables the API instance
	 * refers to.
	 *
	 * @name    DataTable.Api#tables
	 * @param {string|integer} [selector] Selector to pick which tables the iterator
	 *   should operate on. If not given, all tables in the current context are
	 *   used. This can be given as a jQuery selector (for example `':gt(0)'`) to
	 *   select multiple tables or as an integer to select a single table.
	 * @returns {DataTable.Api} Returns a new API instance if a selector is given.
	 */
	_api_register( 'tables()', function ( selector ) {
		// A new instance is created if there was a selector specified
		return selector !== undefined && selector !== null ?
			new _Api( __table_selector( selector, this.context ) ) :
			this;
	} );
	
	
	_api_register( 'table()', function ( selector ) {
		var tables = this.tables( selector );
		var ctx = tables.context;
	
		// Truncate to the first matched table
		return ctx.length ?
			new _Api( ctx[0] ) :
			tables;
	} );
	
	
	_api_registerPlural( 'tables().nodes()', 'table().node()' , function () {
		return this.iterator( 'table', function ( ctx ) {
			return ctx.nTable;
		}, 1 );
	} );
	
	
	_api_registerPlural( 'tables().body()', 'table().body()' , function () {
		return this.iterator( 'table', function ( ctx ) {
			return ctx.nTBody;
		}, 1 );
	} );
	
	
	_api_registerPlural( 'tables().header()', 'table().header()' , function () {
		return this.iterator( 'table', function ( ctx ) {
			return ctx.nTHead;
		}, 1 );
	} );
	
	
	_api_registerPlural( 'tables().footer()', 'table().footer()' , function () {
		return this.iterator( 'table', function ( ctx ) {
			return ctx.nTFoot;
		}, 1 );
	} );
	
	
	_api_registerPlural( 'tables().containers()', 'table().container()' , function () {
		return this.iterator( 'table', function ( ctx ) {
			return ctx.nTableWrapper;
		}, 1 );
	} );
	
	
	
	/**
	 * Redraw the tables in the current context.
	 */
	_api_register( 'draw()', function ( paging ) {
		return this.iterator( 'table', function ( settings ) {
			if ( paging === 'page' ) {
				_fnDraw( settings );
			}
			else {
				if ( typeof paging === 'string' ) {
					paging = paging === 'full-hold' ?
						false :
						true;
				}
	
				_fnReDraw( settings, paging===false );
			}
		} );
	} );
	
	
	
	/**
	 * Get the current page index.
	 *
	 * @return {integer} Current page index (zero based)
	 *//**
	 * Set the current page.
	 *
	 * Note that if you attempt to show a page which does not exist, DataTables will
	 * not throw an error, but rather reset the paging.
	 *
	 * @param {integer|string} action The paging action to take. This can be one of:
	 *  * `integer` - The page index to jump to
	 *  * `string` - An action to take:
	 *    * `first` - Jump to first page.
	 *    * `next` - Jump to the next page
	 *    * `previous` - Jump to previous page
	 *    * `last` - Jump to the last page.
	 * @returns {DataTables.Api} this
	 */
	_api_register( 'page()', function ( action ) {
		if ( action === undefined ) {
			return this.page.info().page; // not an expensive call
		}
	
		// else, have an action to take on all tables
		return this.iterator( 'table', function ( settings ) {
			_fnPageChange( settings, action );
		} );
	} );
	
	
	/**
	 * Paging information for the first table in the current context.
	 *
	 * If you require paging information for another table, use the `table()` method
	 * with a suitable selector.
	 *
	 * @return {object} Object with the following properties set:
	 *  * `page` - Current page index (zero based - i.e. the first page is `0`)
	 *  * `pages` - Total number of pages
	 *  * `start` - Display index for the first record shown on the current page
	 *  * `end` - Display index for the last record shown on the current page
	 *  * `length` - Display length (number of records). Note that generally `start
	 *    + length = end`, but this is not always true, for example if there are
	 *    only 2 records to show on the final page, with a length of 10.
	 *  * `recordsTotal` - Full data set length
	 *  * `recordsDisplay` - Data set length once the current filtering criterion
	 *    are applied.
	 */
	_api_register( 'page.info()', function ( action ) {
		if ( this.context.length === 0 ) {
			return undefined;
		}
	
		var
			settings   = this.context[0],
			start      = settings._iDisplayStart,
			len        = settings.oFeatures.bPaginate ? settings._iDisplayLength : -1,
			visRecords = settings.fnRecordsDisplay(),
			all        = len === -1;
	
		return {
			"page":           all ? 0 : Math.floor( start / len ),
			"pages":          all ? 1 : Math.ceil( visRecords / len ),
			"start":          start,
			"end":            settings.fnDisplayEnd(),
			"length":         len,
			"recordsTotal":   settings.fnRecordsTotal(),
			"recordsDisplay": visRecords,
			"serverSide":     _fnDataSource( settings ) === 'ssp'
		};
	} );
	
	
	/**
	 * Get the current page length.
	 *
	 * @return {integer} Current page length. Note `-1` indicates that all records
	 *   are to be shown.
	 *//**
	 * Set the current page length.
	 *
	 * @param {integer} Page length to set. Use `-1` to show all records.
	 * @returns {DataTables.Api} this
	 */
	_api_register( 'page.len()', function ( len ) {
		// Note that we can't call this function 'length()' because `length`
		// is a Javascript property of functions which defines how many arguments
		// the function expects.
		if ( len === undefined ) {
			return this.context.length !== 0 ?
				this.context[0]._iDisplayLength :
				undefined;
		}
	
		// else, set the page length
		return this.iterator( 'table', function ( settings ) {
			_fnLengthChange( settings, len );
		} );
	} );
	
	
	
	var __reload = function ( settings, holdPosition, callback ) {
		// Use the draw event to trigger a callback
		if ( callback ) {
			var api = new _Api( settings );
	
			api.one( 'draw', function () {
				callback( api.ajax.json() );
			} );
		}
	
		if ( _fnDataSource( settings ) == 'ssp' ) {
			_fnReDraw( settings, holdPosition );
		}
		else {
			_fnProcessingDisplay( settings, true );
	
			// Cancel an existing request
			var xhr = settings.jqXHR;
			if ( xhr && xhr.readyState !== 4 ) {
				xhr.abort();
			}
	
			// Trigger xhr
			_fnBuildAjax( settings, [], function( json ) {
				_fnClearTable( settings );
	
				var data = _fnAjaxDataSrc( settings, json );
				for ( var i=0, ien=data.length ; i<ien ; i++ ) {
					_fnAddData( settings, data[i] );
				}
	
				_fnReDraw( settings, holdPosition );
				_fnProcessingDisplay( settings, false );
			} );
		}
	};
	
	
	/**
	 * Get the JSON response from the last Ajax request that DataTables made to the
	 * server. Note that this returns the JSON from the first table in the current
	 * context.
	 *
	 * @return {object} JSON received from the server.
	 */
	_api_register( 'ajax.json()', function () {
		var ctx = this.context;
	
		if ( ctx.length > 0 ) {
			return ctx[0].json;
		}
	
		// else return undefined;
	} );
	
	
	/**
	 * Get the data submitted in the last Ajax request
	 */
	_api_register( 'ajax.params()', function () {
		var ctx = this.context;
	
		if ( ctx.length > 0 ) {
			return ctx[0].oAjaxData;
		}
	
		// else return undefined;
	} );
	
	
	/**
	 * Reload tables from the Ajax data source. Note that this function will
	 * automatically re-draw the table when the remote data has been loaded.
	 *
	 * @param {boolean} [reset=true] Reset (default) or hold the current paging
	 *   position. A full re-sort and re-filter is performed when this method is
	 *   called, which is why the pagination reset is the default action.
	 * @returns {DataTables.Api} this
	 */
	_api_register( 'ajax.reload()', function ( callback, resetPaging ) {
		return this.iterator( 'table', function (settings) {
			__reload( settings, resetPaging===false, callback );
		} );
	} );
	
	
	/**
	 * Get the current Ajax URL. Note that this returns the URL from the first
	 * table in the current context.
	 *
	 * @return {string} Current Ajax source URL
	 *//**
	 * Set the Ajax URL. Note that this will set the URL for all tables in the
	 * current context.
	 *
	 * @param {string} url URL to set.
	 * @returns {DataTables.Api} this
	 */
	_api_register( 'ajax.url()', function ( url ) {
		var ctx = this.context;
	
		if ( url === undefined ) {
			// get
			if ( ctx.length === 0 ) {
				return undefined;
			}
			ctx = ctx[0];
	
			return ctx.ajax ?
				$.isPlainObject( ctx.ajax ) ?
					ctx.ajax.url :
					ctx.ajax :
				ctx.sAjaxSource;
		}
	
		// set
		return this.iterator( 'table', function ( settings ) {
			if ( $.isPlainObject( settings.ajax ) ) {
				settings.ajax.url = url;
			}
			else {
				settings.ajax = url;
			}
			// No need to consider sAjaxSource here since DataTables gives priority
			// to `ajax` over `sAjaxSource`. So setting `ajax` here, renders any
			// value of `sAjaxSource` redundant.
		} );
	} );
	
	
	/**
	 * Load data from the newly set Ajax URL. Note that this method is only
	 * available when `ajax.url()` is used to set a URL. Additionally, this method
	 * has the same effect as calling `ajax.reload()` but is provided for
	 * convenience when setting a new URL. Like `ajax.reload()` it will
	 * automatically redraw the table once the remote data has been loaded.
	 *
	 * @returns {DataTables.Api} this
	 */
	_api_register( 'ajax.url().load()', function ( callback, resetPaging ) {
		// Same as a reload, but makes sense to present it for easy access after a
		// url change
		return this.iterator( 'table', function ( ctx ) {
			__reload( ctx, resetPaging===false, callback );
		} );
	} );
	
	
	
	
	var _selector_run = function ( type, selector, selectFn, settings, opts )
	{
		var
			out = [], res,
			a, i, ien, j, jen,
			selectorType = typeof selector;
	
		// Can't just check for isArray here, as an API or jQuery instance might be
		// given with their array like look
		if ( ! selector || selectorType === 'string' || selectorType === 'function' || selector.length === undefined ) {
			selector = [ selector ];
		}
	
		for ( i=0, ien=selector.length ; i<ien ; i++ ) {
			// Only split on simple strings - complex expressions will be jQuery selectors
			a = selector[i] && selector[i].split && ! selector[i].match(/[\[\(:]/) ?
				selector[i].split(',') :
				[ selector[i] ];
	
			for ( j=0, jen=a.length ; j<jen ; j++ ) {
				res = selectFn( typeof a[j] === 'string' ? $.trim(a[j]) : a[j] );
	
				if ( res && res.length ) {
					out = out.concat( res );
				}
			}
		}
	
		// selector extensions
		var ext = _ext.selector[ type ];
		if ( ext.length ) {
			for ( i=0, ien=ext.length ; i<ien ; i++ ) {
				out = ext[i]( settings, opts, out );
			}
		}
	
		return _unique( out );
	};
	
	
	var _selector_opts = function ( opts )
	{
		if ( ! opts ) {
			opts = {};
		}
	
		// Backwards compatibility for 1.9- which used the terminology filter rather
		// than search
		if ( opts.filter && opts.search === undefined ) {
			opts.search = opts.filter;
		}
	
		return $.extend( {
			search: 'none',
			order: 'current',
			page: 'all'
		}, opts );
	};
	
	
	var _selector_first = function ( inst )
	{
		// Reduce the API instance to the first item found
		for ( var i=0, ien=inst.length ; i<ien ; i++ ) {
			if ( inst[i].length > 0 ) {
				// Assign the first element to the first item in the instance
				// and truncate the instance and context
				inst[0] = inst[i];
				inst[0].length = 1;
				inst.length = 1;
				inst.context = [ inst.context[i] ];
	
				return inst;
			}
		}
	
		// Not found - return an empty instance
		inst.length = 0;
		return inst;
	};
	
	
	var _selector_row_indexes = function ( settings, opts )
	{
		var
			i, ien, tmp, a=[],
			displayFiltered = settings.aiDisplay,
			displayMaster = settings.aiDisplayMaster;
	
		var
			search = opts.search,  // none, applied, removed
			order  = opts.order,   // applied, current, index (original - compatibility with 1.9)
			page   = opts.page;    // all, current
	
		if ( _fnDataSource( settings ) == 'ssp' ) {
			// In server-side processing mode, most options are irrelevant since
			// rows not shown don't exist and the index order is the applied order
			// Removed is a special case - for consistency just return an empty
			// array
			return search === 'removed' ?
				[] :
				_range( 0, displayMaster.length );
		}
		else if ( page == 'current' ) {
			// Current page implies that order=current and fitler=applied, since it is
			// fairly senseless otherwise, regardless of what order and search actually
			// are
			for ( i=settings._iDisplayStart, ien=settings.fnDisplayEnd() ; i<ien ; i++ ) {
				a.push( displayFiltered[i] );
			}
		}
		else if ( order == 'current' || order == 'applied' ) {
			if ( search == 'none') {
				a = displayMaster.slice();
			}
			else if ( search == 'applied' ) {
				a = displayFiltered.slice();
			}
			else if ( search == 'removed' ) {
				// O(n+m) solution by creating a hash map
				var displayFilteredMap = {};
	
				for ( var i=0, ien=displayFiltered.length ; i<ien ; i++ ) {
					displayFilteredMap[displayFiltered[i]] = null;
				}
	
				a = $.map( displayMaster, function (el) {
					return ! displayFilteredMap.hasOwnProperty(el) ?
						el :
						null;
				} );
			}
		}
		else if ( order == 'index' || order == 'original' ) {
			for ( i=0, ien=settings.aoData.length ; i<ien ; i++ ) {
				if ( search == 'none' ) {
					a.push( i );
				}
				else { // applied | removed
					tmp = $.inArray( i, displayFiltered );
	
					if ((tmp === -1 && search == 'removed') ||
						(tmp >= 0   && search == 'applied') )
					{
						a.push( i );
					}
				}
			}
		}
	
		return a;
	};
	
	
	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Rows
	 *
	 * {}          - no selector - use all available rows
	 * {integer}   - row aoData index
	 * {node}      - TR node
	 * {string}    - jQuery selector to apply to the TR elements
	 * {array}     - jQuery array of nodes, or simply an array of TR nodes
	 *
	 */
	var __row_selector = function ( settings, selector, opts )
	{
		var rows;
		var run = function ( sel ) {
			var selInt = _intVal( sel );
			var i, ien;
			var aoData = settings.aoData;
	
			// Short cut - selector is a number and no options provided (default is
			// all records, so no need to check if the index is in there, since it
			// must be - dev error if the index doesn't exist).
			if ( selInt !== null && ! opts ) {
				return [ selInt ];
			}
	
			if ( ! rows ) {
				rows = _selector_row_indexes( settings, opts );
			}
	
			if ( selInt !== null && $.inArray( selInt, rows ) !== -1 ) {
				// Selector - integer
				return [ selInt ];
			}
			else if ( sel === null || sel === undefined || sel === '' ) {
				// Selector - none
				return rows;
			}
	
			// Selector - function
			if ( typeof sel === 'function' ) {
				return $.map( rows, function (idx) {
					var row = aoData[ idx ];
					return sel( idx, row._aData, row.nTr ) ? idx : null;
				} );
			}
	
			// Selector - node
			if ( sel.nodeName ) {
				var rowIdx = sel._DT_RowIndex;  // Property added by DT for fast lookup
				var cellIdx = sel._DT_CellIndex;
	
				if ( rowIdx !== undefined ) {
					// Make sure that the row is actually still present in the table
					return aoData[ rowIdx ] && aoData[ rowIdx ].nTr === sel ?
						[ rowIdx ] :
						[];
				}
				else if ( cellIdx ) {
					return aoData[ cellIdx.row ] && aoData[ cellIdx.row ].nTr === sel.parentNode ?
						[ cellIdx.row ] :
						[];
				}
				else {
					var host = $(sel).closest('*[data-dt-row]');
					return host.length ?
						[ host.data('dt-row') ] :
						[];
				}
			}
	
			// ID selector. Want to always be able to select rows by id, regardless
			// of if the tr element has been created or not, so can't rely upon
			// jQuery here - hence a custom implementation. This does not match
			// Sizzle's fast selector or HTML4 - in HTML5 the ID can be anything,
			// but to select it using a CSS selector engine (like Sizzle or
			// querySelect) it would need to need to be escaped for some characters.
			// DataTables simplifies this for row selectors since you can select
			// only a row. A # indicates an id any anything that follows is the id -
			// unescaped.
			if ( typeof sel === 'string' && sel.charAt(0) === '#' ) {
				// get row index from id
				var rowObj = settings.aIds[ sel.replace( /^#/, '' ) ];
				if ( rowObj !== undefined ) {
					return [ rowObj.idx ];
				}
	
				// need to fall through to jQuery in case there is DOM id that
				// matches
			}
			
			// Get nodes in the order from the `rows` array with null values removed
			var nodes = _removeEmpty(
				_pluck_order( settings.aoData, rows, 'nTr' )
			);
	
			// Selector - jQuery selector string, array of nodes or jQuery object/
			// As jQuery's .filter() allows jQuery objects to be passed in filter,
			// it also allows arrays, so this will cope with all three options
			return $(nodes)
				.filter( sel )
				.map( function () {
					return this._DT_RowIndex;
				} )
				.toArray();
		};
	
		return _selector_run( 'row', selector, run, settings, opts );
	};
	
	
	_api_register( 'rows()', function ( selector, opts ) {
		// argument shifting
		if ( selector === undefined ) {
			selector = '';
		}
		else if ( $.isPlainObject( selector ) ) {
			opts = selector;
			selector = '';
		}
	
		opts = _selector_opts( opts );
	
		var inst = this.iterator( 'table', function ( settings ) {
			return __row_selector( settings, selector, opts );
		}, 1 );
	
		// Want argument shifting here and in __row_selector?
		inst.selector.rows = selector;
		inst.selector.opts = opts;
	
		return inst;
	} );
	
	_api_register( 'rows().nodes()', function () {
		return this.iterator( 'row', function ( settings, row ) {
			return settings.aoData[ row ].nTr || undefined;
		}, 1 );
	} );
	
	_api_register( 'rows().data()', function () {
		return this.iterator( true, 'rows', function ( settings, rows ) {
			return _pluck_order( settings.aoData, rows, '_aData' );
		}, 1 );
	} );
	
	_api_registerPlural( 'rows().cache()', 'row().cache()', function ( type ) {
		return this.iterator( 'row', function ( settings, row ) {
			var r = settings.aoData[ row ];
			return type === 'search' ? r._aFilterData : r._aSortData;
		}, 1 );
	} );
	
	_api_registerPlural( 'rows().invalidate()', 'row().invalidate()', function ( src ) {
		return this.iterator( 'row', function ( settings, row ) {
			_fnInvalidate( settings, row, src );
		} );
	} );
	
	_api_registerPlural( 'rows().indexes()', 'row().index()', function () {
		return this.iterator( 'row', function ( settings, row ) {
			return row;
		}, 1 );
	} );
	
	_api_registerPlural( 'rows().ids()', 'row().id()', function ( hash ) {
		var a = [];
		var context = this.context;
	
		// `iterator` will drop undefined values, but in this case we want them
		for ( var i=0, ien=context.length ; i<ien ; i++ ) {
			for ( var j=0, jen=this[i].length ; j<jen ; j++ ) {
				var id = context[i].rowIdFn( context[i].aoData[ this[i][j] ]._aData );
				a.push( (hash === true ? '#' : '' )+ id );
			}
		}
	
		return new _Api( context, a );
	} );
	
	_api_registerPlural( 'rows().remove()', 'row().remove()', function () {
		var that = this;
	
		this.iterator( 'row', function ( settings, row, thatIdx ) {
			var data = settings.aoData;
			var rowData = data[ row ];
			var i, ien, j, jen;
			var loopRow, loopCells;
	
			data.splice( row, 1 );
	
			// Update the cached indexes
			for ( i=0, ien=data.length ; i<ien ; i++ ) {
				loopRow = data[i];
				loopCells = loopRow.anCells;
	
				// Rows
				if ( loopRow.nTr !== null ) {
					loopRow.nTr._DT_RowIndex = i;
				}
	
				// Cells
				if ( loopCells !== null ) {
					for ( j=0, jen=loopCells.length ; j<jen ; j++ ) {
						loopCells[j]._DT_CellIndex.row = i;
					}
				}
			}
	
			// Delete from the display arrays
			_fnDeleteIndex( settings.aiDisplayMaster, row );
			_fnDeleteIndex( settings.aiDisplay, row );
			_fnDeleteIndex( that[ thatIdx ], row, false ); // maintain local indexes
	
			// For server-side processing tables - subtract the deleted row from the count
			if ( settings._iRecordsDisplay > 0 ) {
				settings._iRecordsDisplay--;
			}
	
			// Check for an 'overflow' they case for displaying the table
			_fnLengthOverflow( settings );
	
			// Remove the row's ID reference if there is one
			var id = settings.rowIdFn( rowData._aData );
			if ( id !== undefined ) {
				delete settings.aIds[ id ];
			}
		} );
	
		this.iterator( 'table', function ( settings ) {
			for ( var i=0, ien=settings.aoData.length ; i<ien ; i++ ) {
				settings.aoData[i].idx = i;
			}
		} );
	
		return this;
	} );
	
	
	_api_register( 'rows.add()', function ( rows ) {
		var newRows = this.iterator( 'table', function ( settings ) {
				var row, i, ien;
				var out = [];
	
				for ( i=0, ien=rows.length ; i<ien ; i++ ) {
					row = rows[i];
	
					if ( row.nodeName && row.nodeName.toUpperCase() === 'TR' ) {
						out.push( _fnAddTr( settings, row )[0] );
					}
					else {
						out.push( _fnAddData( settings, row ) );
					}
				}
	
				return out;
			}, 1 );
	
		// Return an Api.rows() extended instance, so rows().nodes() etc can be used
		var modRows = this.rows( -1 );
		modRows.pop();
		$.merge( modRows, newRows );
	
		return modRows;
	} );
	
	
	
	
	
	/**
	 *
	 */
	_api_register( 'row()', function ( selector, opts ) {
		return _selector_first( this.rows( selector, opts ) );
	} );
	
	
	_api_register( 'row().data()', function ( data ) {
		var ctx = this.context;
	
		if ( data === undefined ) {
			// Get
			return ctx.length && this.length ?
				ctx[0].aoData[ this[0] ]._aData :
				undefined;
		}
	
		// Set
		var row = ctx[0].aoData[ this[0] ];
		row._aData = data;
	
		// If the DOM has an id, and the data source is an array
		if ( $.isArray( data ) && row.nTr && row.nTr.id ) {
			_fnSetObjectDataFn( ctx[0].rowId )( data, row.nTr.id );
		}
	
		// Automatically invalidate
		_fnInvalidate( ctx[0], this[0], 'data' );
	
		return this;
	} );
	
	
	_api_register( 'row().node()', function () {
		var ctx = this.context;
	
		return ctx.length && this.length ?
			ctx[0].aoData[ this[0] ].nTr || null :
			null;
	} );
	
	
	_api_register( 'row.add()', function ( row ) {
		// Allow a jQuery object to be passed in - only a single row is added from
		// it though - the first element in the set
		if ( row instanceof $ && row.length ) {
			row = row[0];
		}
	
		var rows = this.iterator( 'table', function ( settings ) {
			if ( row.nodeName && row.nodeName.toUpperCase() === 'TR' ) {
				return _fnAddTr( settings, row )[0];
			}
			return _fnAddData( settings, row );
		} );
	
		// Return an Api.rows() extended instance, with the newly added row selected
		return this.row( rows[0] );
	} );
	
	
	
	var __details_add = function ( ctx, row, data, klass )
	{
		// Convert to array of TR elements
		var rows = [];
		var addRow = function ( r, k ) {
			// Recursion to allow for arrays of jQuery objects
			if ( $.isArray( r ) || r instanceof $ ) {
				for ( var i=0, ien=r.length ; i<ien ; i++ ) {
					addRow( r[i], k );
				}
				return;
			}
	
			// If we get a TR element, then just add it directly - up to the dev
			// to add the correct number of columns etc
			if ( r.nodeName && r.nodeName.toLowerCase() === 'tr' ) {
				rows.push( r );
			}
			else {
				// Otherwise create a row with a wrapper
				var created = $('<tr><td/></tr>').addClass( k );
				$('td', created)
					.addClass( k )
					.html( r )
					[0].colSpan = _fnVisbleColumns( ctx );
	
				rows.push( created[0] );
			}
		};
	
		addRow( data, klass );
	
		if ( row._details ) {
			row._details.detach();
		}
	
		row._details = $(rows);
	
		// If the children were already shown, that state should be retained
		if ( row._detailsShow ) {
			row._details.insertAfter( row.nTr );
		}
	};
	
	
	var __details_remove = function ( api, idx )
	{
		var ctx = api.context;
	
		if ( ctx.length ) {
			var row = ctx[0].aoData[ idx !== undefined ? idx : api[0] ];
	
			if ( row && row._details ) {
				row._details.remove();
	
				row._detailsShow = undefined;
				row._details = undefined;
			}
		}
	};
	
	
	var __details_display = function ( api, show ) {
		var ctx = api.context;
	
		if ( ctx.length && api.length ) {
			var row = ctx[0].aoData[ api[0] ];
	
			if ( row._details ) {
				row._detailsShow = show;
	
				if ( show ) {
					row._details.insertAfter( row.nTr );
				}
				else {
					row._details.detach();
				}
	
				__details_events( ctx[0] );
			}
		}
	};
	
	
	var __details_events = function ( settings )
	{
		var api = new _Api( settings );
		var namespace = '.dt.DT_details';
		var drawEvent = 'draw'+namespace;
		var colvisEvent = 'column-visibility'+namespace;
		var destroyEvent = 'destroy'+namespace;
		var data = settings.aoData;
	
		api.off( drawEvent +' '+ colvisEvent +' '+ destroyEvent );
	
		if ( _pluck( data, '_details' ).length > 0 ) {
			// On each draw, insert the required elements into the document
			api.on( drawEvent, function ( e, ctx ) {
				if ( settings !== ctx ) {
					return;
				}
	
				api.rows( {page:'current'} ).eq(0).each( function (idx) {
					// Internal data grab
					var row = data[ idx ];
	
					if ( row._detailsShow ) {
						row._details.insertAfter( row.nTr );
					}
				} );
			} );
	
			// Column visibility change - update the colspan
			api.on( colvisEvent, function ( e, ctx, idx, vis ) {
				if ( settings !== ctx ) {
					return;
				}
	
				// Update the colspan for the details rows (note, only if it already has
				// a colspan)
				var row, visible = _fnVisbleColumns( ctx );
	
				for ( var i=0, ien=data.length ; i<ien ; i++ ) {
					row = data[i];
	
					if ( row._details ) {
						row._details.children('td[colspan]').attr('colspan', visible );
					}
				}
			} );
	
			// Table destroyed - nuke any child rows
			api.on( destroyEvent, function ( e, ctx ) {
				if ( settings !== ctx ) {
					return;
				}
	
				for ( var i=0, ien=data.length ; i<ien ; i++ ) {
					if ( data[i]._details ) {
						__details_remove( api, i );
					}
				}
			} );
		}
	};
	
	// Strings for the method names to help minification
	var _emp = '';
	var _child_obj = _emp+'row().child';
	var _child_mth = _child_obj+'()';
	
	// data can be:
	//  tr
	//  string
	//  jQuery or array of any of the above
	_api_register( _child_mth, function ( data, klass ) {
		var ctx = this.context;
	
		if ( data === undefined ) {
			// get
			return ctx.length && this.length ?
				ctx[0].aoData[ this[0] ]._details :
				undefined;
		}
		else if ( data === true ) {
			// show
			this.child.show();
		}
		else if ( data === false ) {
			// remove
			__details_remove( this );
		}
		else if ( ctx.length && this.length ) {
			// set
			__details_add( ctx[0], ctx[0].aoData[ this[0] ], data, klass );
		}
	
		return this;
	} );
	
	
	_api_register( [
		_child_obj+'.show()',
		_child_mth+'.show()' // only when `child()` was called with parameters (without
	], function ( show ) {   // it returns an object and this method is not executed)
		__details_display( this, true );
		return this;
	} );
	
	
	_api_register( [
		_child_obj+'.hide()',
		_child_mth+'.hide()' // only when `child()` was called with parameters (without
	], function () {         // it returns an object and this method is not executed)
		__details_display( this, false );
		return this;
	} );
	
	
	_api_register( [
		_child_obj+'.remove()',
		_child_mth+'.remove()' // only when `child()` was called with parameters (without
	], function () {           // it returns an object and this method is not executed)
		__details_remove( this );
		return this;
	} );
	
	
	_api_register( _child_obj+'.isShown()', function () {
		var ctx = this.context;
	
		if ( ctx.length && this.length ) {
			// _detailsShown as false or undefined will fall through to return false
			return ctx[0].aoData[ this[0] ]._detailsShow || false;
		}
		return false;
	} );
	
	
	
	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Columns
	 *
	 * {integer}           - column index (>=0 count from left, <0 count from right)
	 * "{integer}:visIdx"  - visible column index (i.e. translate to column index)  (>=0 count from left, <0 count from right)
	 * "{integer}:visible" - alias for {integer}:visIdx  (>=0 count from left, <0 count from right)
	 * "{string}:name"     - column name
	 * "{string}"          - jQuery selector on column header nodes
	 *
	 */
	
	// can be an array of these items, comma separated list, or an array of comma
	// separated lists
	
	var __re_column_selector = /^([^:]+):(name|visIdx|visible)$/;
	
	
	// r1 and r2 are redundant - but it means that the parameters match for the
	// iterator callback in columns().data()
	var __columnData = function ( settings, column, r1, r2, rows ) {
		var a = [];
		for ( var row=0, ien=rows.length ; row<ien ; row++ ) {
			a.push( _fnGetCellData( settings, rows[row], column ) );
		}
		return a;
	};
	
	
	var __column_selector = function ( settings, selector, opts )
	{
		var
			columns = settings.aoColumns,
			names = _pluck( columns, 'sName' ),
			nodes = _pluck( columns, 'nTh' );
	
		var run = function ( s ) {
			var selInt = _intVal( s );
	
			// Selector - all
			if ( s === '' ) {
				return _range( columns.length );
			}
	
			// Selector - index
			if ( selInt !== null ) {
				return [ selInt >= 0 ?
					selInt : // Count from left
					columns.length + selInt // Count from right (+ because its a negative value)
				];
			}
	
			// Selector = function
			if ( typeof s === 'function' ) {
				var rows = _selector_row_indexes( settings, opts );
	
				return $.map( columns, function (col, idx) {
					return s(
							idx,
							__columnData( settings, idx, 0, 0, rows ),
							nodes[ idx ]
						) ? idx : null;
				} );
			}
	
			// jQuery or string selector
			var match = typeof s === 'string' ?
				s.match( __re_column_selector ) :
				'';
	
			if ( match ) {
				switch( match[2] ) {
					case 'visIdx':
					case 'visible':
						var idx = parseInt( match[1], 10 );
						// Visible index given, convert to column index
						if ( idx < 0 ) {
							// Counting from the right
							var visColumns = $.map( columns, function (col,i) {
								return col.bVisible ? i : null;
							} );
							return [ visColumns[ visColumns.length + idx ] ];
						}
						// Counting from the left
						return [ _fnVisibleToColumnIndex( settings, idx ) ];
	
					case 'name':
						// match by name. `names` is column index complete and in order
						return $.map( names, function (name, i) {
							return name === match[1] ? i : null;
						} );
	
					default:
						return [];
				}
			}
	
			// Cell in the table body
			if ( s.nodeName && s._DT_CellIndex ) {
				return [ s._DT_CellIndex.column ];
			}
	
			// jQuery selector on the TH elements for the columns
			var jqResult = $( nodes )
				.filter( s )
				.map( function () {
					return $.inArray( this, nodes ); // `nodes` is column index complete and in order
				} )
				.toArray();
	
			if ( jqResult.length || ! s.nodeName ) {
				return jqResult;
			}
	
			// Otherwise a node which might have a `dt-column` data attribute, or be
			// a child or such an element
			var host = $(s).closest('*[data-dt-column]');
			return host.length ?
				[ host.data('dt-column') ] :
				[];
		};
	
		return _selector_run( 'column', selector, run, settings, opts );
	};
	
	
	var __setColumnVis = function ( settings, column, vis ) {
		var
			cols = settings.aoColumns,
			col  = cols[ column ],
			data = settings.aoData,
			row, cells, i, ien, tr;
	
		// Get
		if ( vis === undefined ) {
			return col.bVisible;
		}
	
		// Set
		// No change
		if ( col.bVisible === vis ) {
			return;
		}
	
		if ( vis ) {
			// Insert column
			// Need to decide if we should use appendChild or insertBefore
			var insertBefore = $.inArray( true, _pluck(cols, 'bVisible'), column+1 );
	
			for ( i=0, ien=data.length ; i<ien ; i++ ) {
				tr = data[i].nTr;
				cells = data[i].anCells;
	
				if ( tr ) {
					// insertBefore can act like appendChild if 2nd arg is null
					tr.insertBefore( cells[ column ], cells[ insertBefore ] || null );
				}
			}
		}
		else {
			// Remove column
			$( _pluck( settings.aoData, 'anCells', column ) ).detach();
		}
	
		// Common actions
		col.bVisible = vis;
	};
	
	
	_api_register( 'columns()', function ( selector, opts ) {
		// argument shifting
		if ( selector === undefined ) {
			selector = '';
		}
		else if ( $.isPlainObject( selector ) ) {
			opts = selector;
			selector = '';
		}
	
		opts = _selector_opts( opts );
	
		var inst = this.iterator( 'table', function ( settings ) {
			return __column_selector( settings, selector, opts );
		}, 1 );
	
		// Want argument shifting here and in _row_selector?
		inst.selector.cols = selector;
		inst.selector.opts = opts;
	
		return inst;
	} );
	
	_api_registerPlural( 'columns().header()', 'column().header()', function ( selector, opts ) {
		return this.iterator( 'column', function ( settings, column ) {
			return settings.aoColumns[column].nTh;
		}, 1 );
	} );
	
	_api_registerPlural( 'columns().footer()', 'column().footer()', function ( selector, opts ) {
		return this.iterator( 'column', function ( settings, column ) {
			return settings.aoColumns[column].nTf;
		}, 1 );
	} );
	
	_api_registerPlural( 'columns().data()', 'column().data()', function () {
		return this.iterator( 'column-rows', __columnData, 1 );
	} );
	
	_api_registerPlural( 'columns().dataSrc()', 'column().dataSrc()', function () {
		return this.iterator( 'column', function ( settings, column ) {
			return settings.aoColumns[column].mData;
		}, 1 );
	} );
	
	_api_registerPlural( 'columns().cache()', 'column().cache()', function ( type ) {
		return this.iterator( 'column-rows', function ( settings, column, i, j, rows ) {
			return _pluck_order( settings.aoData, rows,
				type === 'search' ? '_aFilterData' : '_aSortData', column
			);
		}, 1 );
	} );
	
	_api_registerPlural( 'columns().nodes()', 'column().nodes()', function () {
		return this.iterator( 'column-rows', function ( settings, column, i, j, rows ) {
			return _pluck_order( settings.aoData, rows, 'anCells', column ) ;
		}, 1 );
	} );
	
	_api_registerPlural( 'columns().visible()', 'column().visible()', function ( vis, calc ) {
		var that = this;
		var ret = this.iterator( 'column', function ( settings, column ) {
			if ( vis === undefined ) {
				return settings.aoColumns[ column ].bVisible;
			} // else
			__setColumnVis( settings, column, vis );
		} );
	
		// Group the column visibility changes
		if ( vis !== undefined ) {
			this.iterator( 'table', function ( settings ) {
				// Redraw the header after changes
				_fnDrawHead( settings, settings.aoHeader );
				_fnDrawHead( settings, settings.aoFooter );
		
				// Update colspan for no records display. Child rows and extensions will use their own
				// listeners to do this - only need to update the empty table item here
				if ( ! settings.aiDisplay.length ) {
					$(settings.nTBody).find('td[colspan]').attr('colspan', _fnVisbleColumns(settings));
				}
		
				_fnSaveState( settings );
	
				// Second loop once the first is done for events
				that.iterator( 'column', function ( settings, column ) {
					_fnCallbackFire( settings, null, 'column-visibility', [settings, column, vis, calc] );
				} );
	
				if ( calc === undefined || calc ) {
					that.columns.adjust();
				}
			});
		}
	
		return ret;
	} );
	
	_api_registerPlural( 'columns().indexes()', 'column().index()', function ( type ) {
		return this.iterator( 'column', function ( settings, column ) {
			return type === 'visible' ?
				_fnColumnIndexToVisible( settings, column ) :
				column;
		}, 1 );
	} );
	
	_api_register( 'columns.adjust()', function () {
		return this.iterator( 'table', function ( settings ) {
			_fnAdjustColumnSizing( settings );
		}, 1 );
	} );
	
	_api_register( 'column.index()', function ( type, idx ) {
		if ( this.context.length !== 0 ) {
			var ctx = this.context[0];
	
			if ( type === 'fromVisible' || type === 'toData' ) {
				return _fnVisibleToColumnIndex( ctx, idx );
			}
			else if ( type === 'fromData' || type === 'toVisible' ) {
				return _fnColumnIndexToVisible( ctx, idx );
			}
		}
	} );
	
	_api_register( 'column()', function ( selector, opts ) {
		return _selector_first( this.columns( selector, opts ) );
	} );
	
	
	
	var __cell_selector = function ( settings, selector, opts )
	{
		var data = settings.aoData;
		var rows = _selector_row_indexes( settings, opts );
		var cells = _removeEmpty( _pluck_order( data, rows, 'anCells' ) );
		var allCells = $( [].concat.apply([], cells) );
		var row;
		var columns = settings.aoColumns.length;
		var a, i, ien, j, o, host;
	
		var run = function ( s ) {
			var fnSelector = typeof s === 'function';
	
			if ( s === null || s === undefined || fnSelector ) {
				// All cells and function selectors
				a = [];
	
				for ( i=0, ien=rows.length ; i<ien ; i++ ) {
					row = rows[i];
	
					for ( j=0 ; j<columns ; j++ ) {
						o = {
							row: row,
							column: j
						};
	
						if ( fnSelector ) {
							// Selector - function
							host = data[ row ];
	
							if ( s( o, _fnGetCellData(settings, row, j), host.anCells ? host.anCells[j] : null ) ) {
								a.push( o );
							}
						}
						else {
							// Selector - all
							a.push( o );
						}
					}
				}
	
				return a;
			}
			
			// Selector - index
			if ( $.isPlainObject( s ) ) {
				// Valid cell index and its in the array of selectable rows
				return s.column !== undefined && s.row !== undefined && $.inArray( s.row, rows ) !== -1 ?
					[s] :
					[];
			}
	
			// Selector - jQuery filtered cells
			var jqResult = allCells
				.filter( s )
				.map( function (i, el) {
					return { // use a new object, in case someone changes the values
						row:    el._DT_CellIndex.row,
						column: el._DT_CellIndex.column
	 				};
				} )
				.toArray();
	
			if ( jqResult.length || ! s.nodeName ) {
				return jqResult;
			}
	
			// Otherwise the selector is a node, and there is one last option - the
			// element might be a child of an element which has dt-row and dt-column
			// data attributes
			host = $(s).closest('*[data-dt-row]');
			return host.length ?
				[ {
					row: host.data('dt-row'),
					column: host.data('dt-column')
				} ] :
				[];
		};
	
		return _selector_run( 'cell', selector, run, settings, opts );
	};
	
	
	
	
	_api_register( 'cells()', function ( rowSelector, columnSelector, opts ) {
		// Argument shifting
		if ( $.isPlainObject( rowSelector ) ) {
			// Indexes
			if ( rowSelector.row === undefined ) {
				// Selector options in first parameter
				opts = rowSelector;
				rowSelector = null;
			}
			else {
				// Cell index objects in first parameter
				opts = columnSelector;
				columnSelector = null;
			}
		}
		if ( $.isPlainObject( columnSelector ) ) {
			opts = columnSelector;
			columnSelector = null;
		}
	
		// Cell selector
		if ( columnSelector === null || columnSelector === undefined ) {
			return this.iterator( 'table', function ( settings ) {
				return __cell_selector( settings, rowSelector, _selector_opts( opts ) );
			} );
		}
	
		// The default built in options need to apply to row and columns
		var internalOpts = opts ? {
			page: opts.page,
			order: opts.order,
			search: opts.search
		} : {};
	
		// Row + column selector
		var columns = this.columns( columnSelector, internalOpts );
		var rows = this.rows( rowSelector, internalOpts );
		var i, ien, j, jen;
	
		var cellsNoOpts = this.iterator( 'table', function ( settings, idx ) {
			var a = [];
	
			for ( i=0, ien=rows[idx].length ; i<ien ; i++ ) {
				for ( j=0, jen=columns[idx].length ; j<jen ; j++ ) {
					a.push( {
						row:    rows[idx][i],
						column: columns[idx][j]
					} );
				}
			}
	
			return a;
		}, 1 );
	
		// There is currently only one extension which uses a cell selector extension
		// It is a _major_ performance drag to run this if it isn't needed, so this is
		// an extension specific check at the moment
		var cells = opts && opts.selected ?
			this.cells( cellsNoOpts, opts ) :
			cellsNoOpts;
	
		$.extend( cells.selector, {
			cols: columnSelector,
			rows: rowSelector,
			opts: opts
		} );
	
		return cells;
	} );
	
	
	_api_registerPlural( 'cells().nodes()', 'cell().node()', function () {
		return this.iterator( 'cell', function ( settings, row, column ) {
			var data = settings.aoData[ row ];
	
			return data && data.anCells ?
				data.anCells[ column ] :
				undefined;
		}, 1 );
	} );
	
	
	_api_register( 'cells().data()', function () {
		return this.iterator( 'cell', function ( settings, row, column ) {
			return _fnGetCellData( settings, row, column );
		}, 1 );
	} );
	
	
	_api_registerPlural( 'cells().cache()', 'cell().cache()', function ( type ) {
		type = type === 'search' ? '_aFilterData' : '_aSortData';
	
		return this.iterator( 'cell', function ( settings, row, column ) {
			return settings.aoData[ row ][ type ][ column ];
		}, 1 );
	} );
	
	
	_api_registerPlural( 'cells().render()', 'cell().render()', function ( type ) {
		return this.iterator( 'cell', function ( settings, row, column ) {
			return _fnGetCellData( settings, row, column, type );
		}, 1 );
	} );
	
	
	_api_registerPlural( 'cells().indexes()', 'cell().index()', function () {
		return this.iterator( 'cell', function ( settings, row, column ) {
			return {
				row: row,
				column: column,
				columnVisible: _fnColumnIndexToVisible( settings, column )
			};
		}, 1 );
	} );
	
	
	_api_registerPlural( 'cells().invalidate()', 'cell().invalidate()', function ( src ) {
		return this.iterator( 'cell', function ( settings, row, column ) {
			_fnInvalidate( settings, row, src, column );
		} );
	} );
	
	
	
	_api_register( 'cell()', function ( rowSelector, columnSelector, opts ) {
		return _selector_first( this.cells( rowSelector, columnSelector, opts ) );
	} );
	
	
	_api_register( 'cell().data()', function ( data ) {
		var ctx = this.context;
		var cell = this[0];
	
		if ( data === undefined ) {
			// Get
			return ctx.length && cell.length ?
				_fnGetCellData( ctx[0], cell[0].row, cell[0].column ) :
				undefined;
		}
	
		// Set
		_fnSetCellData( ctx[0], cell[0].row, cell[0].column, data );
		_fnInvalidate( ctx[0], cell[0].row, 'data', cell[0].column );
	
		return this;
	} );
	
	
	
	/**
	 * Get current ordering (sorting) that has been applied to the table.
	 *
	 * @returns {array} 2D array containing the sorting information for the first
	 *   table in the current context. Each element in the parent array represents
	 *   a column being sorted upon (i.e. multi-sorting with two columns would have
	 *   2 inner arrays). The inner arrays may have 2 or 3 elements. The first is
	 *   the column index that the sorting condition applies to, the second is the
	 *   direction of the sort (`desc` or `asc`) and, optionally, the third is the
	 *   index of the sorting order from the `column.sorting` initialisation array.
	 *//**
	 * Set the ordering for the table.
	 *
	 * @param {integer} order Column index to sort upon.
	 * @param {string} direction Direction of the sort to be applied (`asc` or `desc`)
	 * @returns {DataTables.Api} this
	 *//**
	 * Set the ordering for the table.
	 *
	 * @param {array} order 1D array of sorting information to be applied.
	 * @param {array} [...] Optional additional sorting conditions
	 * @returns {DataTables.Api} this
	 *//**
	 * Set the ordering for the table.
	 *
	 * @param {array} order 2D array of sorting information to be applied.
	 * @returns {DataTables.Api} this
	 */
	_api_register( 'order()', function ( order, dir ) {
		var ctx = this.context;
	
		if ( order === undefined ) {
			// get
			return ctx.length !== 0 ?
				ctx[0].aaSorting :
				undefined;
		}
	
		// set
		if ( typeof order === 'number' ) {
			// Simple column / direction passed in
			order = [ [ order, dir ] ];
		}
		else if ( order.length && ! $.isArray( order[0] ) ) {
			// Arguments passed in (list of 1D arrays)
			order = Array.prototype.slice.call( arguments );
		}
		// otherwise a 2D array was passed in
	
		return this.iterator( 'table', function ( settings ) {
			settings.aaSorting = order.slice();
		} );
	} );
	
	
	/**
	 * Attach a sort listener to an element for a given column
	 *
	 * @param {node|jQuery|string} node Identifier for the element(s) to attach the
	 *   listener to. This can take the form of a single DOM node, a jQuery
	 *   collection of nodes or a jQuery selector which will identify the node(s).
	 * @param {integer} column the column that a click on this node will sort on
	 * @param {function} [callback] callback function when sort is run
	 * @returns {DataTables.Api} this
	 */
	_api_register( 'order.listener()', function ( node, column, callback ) {
		return this.iterator( 'table', function ( settings ) {
			_fnSortAttachListener( settings, node, column, callback );
		} );
	} );
	
	
	_api_register( 'order.fixed()', function ( set ) {
		if ( ! set ) {
			var ctx = this.context;
			var fixed = ctx.length ?
				ctx[0].aaSortingFixed :
				undefined;
	
			return $.isArray( fixed ) ?
				{ pre: fixed } :
				fixed;
		}
	
		return this.iterator( 'table', function ( settings ) {
			settings.aaSortingFixed = $.extend( true, {}, set );
		} );
	} );
	
	
	// Order by the selected column(s)
	_api_register( [
		'columns().order()',
		'column().order()'
	], function ( dir ) {
		var that = this;
	
		return this.iterator( 'table', function ( settings, i ) {
			var sort = [];
	
			$.each( that[i], function (j, col) {
				sort.push( [ col, dir ] );
			} );
	
			settings.aaSorting = sort;
		} );
	} );
	
	
	
	_api_register( 'search()', function ( input, regex, smart, caseInsen ) {
		var ctx = this.context;
	
		if ( input === undefined ) {
			// get
			return ctx.length !== 0 ?
				ctx[0].oPreviousSearch.sSearch :
				undefined;
		}
	
		// set
		return this.iterator( 'table', function ( settings ) {
			if ( ! settings.oFeatures.bFilter ) {
				return;
			}
	
			_fnFilterComplete( settings, $.extend( {}, settings.oPreviousSearch, {
				"sSearch": input+"",
				"bRegex":  regex === null ? false : regex,
				"bSmart":  smart === null ? true  : smart,
				"bCaseInsensitive": caseInsen === null ? true : caseInsen
			} ), 1 );
		} );
	} );
	
	
	_api_registerPlural(
		'columns().search()',
		'column().search()',
		function ( input, regex, smart, caseInsen ) {
			return this.iterator( 'column', function ( settings, column ) {
				var preSearch = settings.aoPreSearchCols;
	
				if ( input === undefined ) {
					// get
					return preSearch[ column ].sSearch;
				}
	
				// set
				if ( ! settings.oFeatures.bFilter ) {
					return;
				}
	
				$.extend( preSearch[ column ], {
					"sSearch": input+"",
					"bRegex":  regex === null ? false : regex,
					"bSmart":  smart === null ? true  : smart,
					"bCaseInsensitive": caseInsen === null ? true : caseInsen
				} );
	
				_fnFilterComplete( settings, settings.oPreviousSearch, 1 );
			} );
		}
	);
	
	/*
	 * State API methods
	 */
	
	_api_register( 'state()', function () {
		return this.context.length ?
			this.context[0].oSavedState :
			null;
	} );
	
	
	_api_register( 'state.clear()', function () {
		return this.iterator( 'table', function ( settings ) {
			// Save an empty object
			settings.fnStateSaveCallback.call( settings.oInstance, settings, {} );
		} );
	} );
	
	
	_api_register( 'state.loaded()', function () {
		return this.context.length ?
			this.context[0].oLoadedState :
			null;
	} );
	
	
	_api_register( 'state.save()', function () {
		return this.iterator( 'table', function ( settings ) {
			_fnSaveState( settings );
		} );
	} );
	
	
	
	/**
	 * Provide a common method for plug-ins to check the version of DataTables being
	 * used, in order to ensure compatibility.
	 *
	 *  @param {string} version Version string to check for, in the format "X.Y.Z".
	 *    Note that the formats "X" and "X.Y" are also acceptable.
	 *  @returns {boolean} true if this version of DataTables is greater or equal to
	 *    the required version, or false if this version of DataTales is not
	 *    suitable
	 *  @static
	 *  @dtopt API-Static
	 *
	 *  @example
	 *    alert( $.fn.dataTable.versionCheck( '1.9.0' ) );
	 */
	DataTable.versionCheck = DataTable.fnVersionCheck = function( version )
	{
		var aThis = DataTable.version.split('.');
		var aThat = version.split('.');
		var iThis, iThat;
	
		for ( var i=0, iLen=aThat.length ; i<iLen ; i++ ) {
			iThis = parseInt( aThis[i], 10 ) || 0;
			iThat = parseInt( aThat[i], 10 ) || 0;
	
			// Parts are the same, keep comparing
			if (iThis === iThat) {
				continue;
			}
	
			// Parts are different, return immediately
			return iThis > iThat;
		}
	
		return true;
	};
	
	
	/**
	 * Check if a `<table>` node is a DataTable table already or not.
	 *
	 *  @param {node|jquery|string} table Table node, jQuery object or jQuery
	 *      selector for the table to test. Note that if more than more than one
	 *      table is passed on, only the first will be checked
	 *  @returns {boolean} true the table given is a DataTable, or false otherwise
	 *  @static
	 *  @dtopt API-Static
	 *
	 *  @example
	 *    if ( ! $.fn.DataTable.isDataTable( '#example' ) ) {
	 *      $('#example').dataTable();
	 *    }
	 */
	DataTable.isDataTable = DataTable.fnIsDataTable = function ( table )
	{
		var t = $(table).get(0);
		var is = false;
	
		if ( table instanceof DataTable.Api ) {
			return true;
		}
	
		$.each( DataTable.settings, function (i, o) {
			var head = o.nScrollHead ? $('table', o.nScrollHead)[0] : null;
			var foot = o.nScrollFoot ? $('table', o.nScrollFoot)[0] : null;
	
			if ( o.nTable === t || head === t || foot === t ) {
				is = true;
			}
		} );
	
		return is;
	};
	
	
	/**
	 * Get all DataTable tables that have been initialised - optionally you can
	 * select to get only currently visible tables.
	 *
	 *  @param {boolean} [visible=false] Flag to indicate if you want all (default)
	 *    or visible tables only.
	 *  @returns {array} Array of `table` nodes (not DataTable instances) which are
	 *    DataTables
	 *  @static
	 *  @dtopt API-Static
	 *
	 *  @example
	 *    $.each( $.fn.dataTable.tables(true), function () {
	 *      $(table).DataTable().columns.adjust();
	 *    } );
	 */
	DataTable.tables = DataTable.fnTables = function ( visible )
	{
		var api = false;
	
		if ( $.isPlainObject( visible ) ) {
			api = visible.api;
			visible = visible.visible;
		}
	
		var a = $.map( DataTable.settings, function (o) {
			if ( !visible || (visible && $(o.nTable).is(':visible')) ) {
				return o.nTable;
			}
		} );
	
		return api ?
			new _Api( a ) :
			a;
	};
	
	
	/**
	 * Convert from camel case parameters to Hungarian notation. This is made public
	 * for the extensions to provide the same ability as DataTables core to accept
	 * either the 1.9 style Hungarian notation, or the 1.10+ style camelCase
	 * parameters.
	 *
	 *  @param {object} src The model object which holds all parameters that can be
	 *    mapped.
	 *  @param {object} user The object to convert from camel case to Hungarian.
	 *  @param {boolean} force When set to `true`, properties which already have a
	 *    Hungarian value in the `user` object will be overwritten. Otherwise they
	 *    won't be.
	 */
	DataTable.camelToHungarian = _fnCamelToHungarian;
	
	
	
	/**
	 *
	 */
	_api_register( '$()', function ( selector, opts ) {
		var
			rows   = this.rows( opts ).nodes(), // Get all rows
			jqRows = $(rows);
	
		return $( [].concat(
			jqRows.filter( selector ).toArray(),
			jqRows.find( selector ).toArray()
		) );
	} );
	
	
	// jQuery functions to operate on the tables
	$.each( [ 'on', 'one', 'off' ], function (i, key) {
		_api_register( key+'()', function ( /* event, handler */ ) {
			var args = Array.prototype.slice.call(arguments);
	
			// Add the `dt` namespace automatically if it isn't already present
			args[0] = $.map( args[0].split( /\s/ ), function ( e ) {
				return ! e.match(/\.dt\b/) ?
					e+'.dt' :
					e;
				} ).join( ' ' );
	
			var inst = $( this.tables().nodes() );
			inst[key].apply( inst, args );
			return this;
		} );
	} );
	
	
	_api_register( 'clear()', function () {
		return this.iterator( 'table', function ( settings ) {
			_fnClearTable( settings );
		} );
	} );
	
	
	_api_register( 'settings()', function () {
		return new _Api( this.context, this.context );
	} );
	
	
	_api_register( 'init()', function () {
		var ctx = this.context;
		return ctx.length ? ctx[0].oInit : null;
	} );
	
	
	_api_register( 'data()', function () {
		return this.iterator( 'table', function ( settings ) {
			return _pluck( settings.aoData, '_aData' );
		} ).flatten();
	} );
	
	
	_api_register( 'destroy()', function ( remove ) {
		remove = remove || false;
	
		return this.iterator( 'table', function ( settings ) {
			var orig      = settings.nTableWrapper.parentNode;
			var classes   = settings.oClasses;
			var table     = settings.nTable;
			var tbody     = settings.nTBody;
			var thead     = settings.nTHead;
			var tfoot     = settings.nTFoot;
			var jqTable   = $(table);
			var jqTbody   = $(tbody);
			var jqWrapper = $(settings.nTableWrapper);
			var rows      = $.map( settings.aoData, function (r) { return r.nTr; } );
			var i, ien;
	
			// Flag to note that the table is currently being destroyed - no action
			// should be taken
			settings.bDestroying = true;
	
			// Fire off the destroy callbacks for plug-ins etc
			_fnCallbackFire( settings, "aoDestroyCallback", "destroy", [settings] );
	
			// If not being removed from the document, make all columns visible
			if ( ! remove ) {
				new _Api( settings ).columns().visible( true );
			}
	
			// Blitz all `DT` namespaced events (these are internal events, the
			// lowercase, `dt` events are user subscribed and they are responsible
			// for removing them
			jqWrapper.off('.DT').find(':not(tbody *)').off('.DT');
			$(window).off('.DT-'+settings.sInstance);
	
			// When scrolling we had to break the table up - restore it
			if ( table != thead.parentNode ) {
				jqTable.children('thead').detach();
				jqTable.append( thead );
			}
	
			if ( tfoot && table != tfoot.parentNode ) {
				jqTable.children('tfoot').detach();
				jqTable.append( tfoot );
			}
	
			settings.aaSorting = [];
			settings.aaSortingFixed = [];
			_fnSortingClasses( settings );
	
			$( rows ).removeClass( settings.asStripeClasses.join(' ') );
	
			$('th, td', thead).removeClass( classes.sSortable+' '+
				classes.sSortableAsc+' '+classes.sSortableDesc+' '+classes.sSortableNone
			);
	
			// Add the TR elements back into the table in their original order
			jqTbody.children().detach();
			jqTbody.append( rows );
	
			// Remove the DataTables generated nodes, events and classes
			var removedMethod = remove ? 'remove' : 'detach';
			jqTable[ removedMethod ]();
			jqWrapper[ removedMethod ]();
	
			// If we need to reattach the table to the document
			if ( ! remove && orig ) {
				// insertBefore acts like appendChild if !arg[1]
				orig.insertBefore( table, settings.nTableReinsertBefore );
	
				// Restore the width of the original table - was read from the style property,
				// so we can restore directly to that
				jqTable
					.css( 'width', settings.sDestroyWidth )
					.removeClass( classes.sTable );
	
				// If the were originally stripe classes - then we add them back here.
				// Note this is not fool proof (for example if not all rows had stripe
				// classes - but it's a good effort without getting carried away
				ien = settings.asDestroyStripes.length;
	
				if ( ien ) {
					jqTbody.children().each( function (i) {
						$(this).addClass( settings.asDestroyStripes[i % ien] );
					} );
				}
			}
	
			/* Remove the settings object from the settings array */
			var idx = $.inArray( settings, DataTable.settings );
			if ( idx !== -1 ) {
				DataTable.settings.splice( idx, 1 );
			}
		} );
	} );
	
	
	// Add the `every()` method for rows, columns and cells in a compact form
	$.each( [ 'column', 'row', 'cell' ], function ( i, type ) {
		_api_register( type+'s().every()', function ( fn ) {
			var opts = this.selector.opts;
			var api = this;
	
			return this.iterator( type, function ( settings, arg1, arg2, arg3, arg4 ) {
				// Rows and columns:
				//  arg1 - index
				//  arg2 - table counter
				//  arg3 - loop counter
				//  arg4 - undefined
				// Cells:
				//  arg1 - row index
				//  arg2 - column index
				//  arg3 - table counter
				//  arg4 - loop counter
				fn.call(
					api[ type ](
						arg1,
						type==='cell' ? arg2 : opts,
						type==='cell' ? opts : undefined
					),
					arg1, arg2, arg3, arg4
				);
			} );
		} );
	} );
	
	
	// i18n method for extensions to be able to use the language object from the
	// DataTable
	_api_register( 'i18n()', function ( token, def, plural ) {
		var ctx = this.context[0];
		var resolved = _fnGetObjectDataFn( token )( ctx.oLanguage );
	
		if ( resolved === undefined ) {
			resolved = def;
		}
	
		if ( plural !== undefined && $.isPlainObject( resolved ) ) {
			resolved = resolved[ plural ] !== undefined ?
				resolved[ plural ] :
				resolved._;
		}
	
		return resolved.replace( '%d', plural ); // nb: plural might be undefined,
	} );
	/**
	 * Version string for plug-ins to check compatibility. Allowed format is
	 * `a.b.c-d` where: a:int, b:int, c:int, d:string(dev|beta|alpha). `d` is used
	 * only for non-release builds. See http://semver.org/ for more information.
	 *  @member
	 *  @type string
	 *  @default Version number
	 */
	DataTable.version = "1.10.21";

	/**
	 * Private data store, containing all of the settings objects that are
	 * created for the tables on a given page.
	 *
	 * Note that the `DataTable.settings` object is aliased to
	 * `jQuery.fn.dataTableExt` through which it may be accessed and
	 * manipulated, or `jQuery.fn.dataTable.settings`.
	 *  @member
	 *  @type array
	 *  @default []
	 *  @private
	 */
	DataTable.settings = [];

	/**
	 * Object models container, for the various models that DataTables has
	 * available to it. These models define the objects that are used to hold
	 * the active state and configuration of the table.
	 *  @namespace
	 */
	DataTable.models = {};
	
	
	
	/**
	 * Template object for the way in which DataTables holds information about
	 * search information for the global filter and individual column filters.
	 *  @namespace
	 */
	DataTable.models.oSearch = {
		/**
		 * Flag to indicate if the filtering should be case insensitive or not
		 *  @type boolean
		 *  @default true
		 */
		"bCaseInsensitive": true,
	
		/**
		 * Applied search term
		 *  @type string
		 *  @default <i>Empty string</i>
		 */
		"sSearch": "",
	
		/**
		 * Flag to indicate if the search term should be interpreted as a
		 * regular expression (true) or not (false) and therefore and special
		 * regex characters escaped.
		 *  @type boolean
		 *  @default false
		 */
		"bRegex": false,
	
		/**
		 * Flag to indicate if DataTables is to use its smart filtering or not.
		 *  @type boolean
		 *  @default true
		 */
		"bSmart": true
	};
	
	
	
	
	/**
	 * Template object for the way in which DataTables holds information about
	 * each individual row. This is the object format used for the settings
	 * aoData array.
	 *  @namespace
	 */
	DataTable.models.oRow = {
		/**
		 * TR element for the row
		 *  @type node
		 *  @default null
		 */
		"nTr": null,
	
		/**
		 * Array of TD elements for each row. This is null until the row has been
		 * created.
		 *  @type array nodes
		 *  @default []
		 */
		"anCells": null,
	
		/**
		 * Data object from the original data source for the row. This is either
		 * an array if using the traditional form of DataTables, or an object if
		 * using mData options. The exact type will depend on the passed in
		 * data from the data source, or will be an array if using DOM a data
		 * source.
		 *  @type array|object
		 *  @default []
		 */
		"_aData": [],
	
		/**
		 * Sorting data cache - this array is ostensibly the same length as the
		 * number of columns (although each index is generated only as it is
		 * needed), and holds the data that is used for sorting each column in the
		 * row. We do this cache generation at the start of the sort in order that
		 * the formatting of the sort data need be done only once for each cell
		 * per sort. This array should not be read from or written to by anything
		 * other than the master sorting methods.
		 *  @type array
		 *  @default null
		 *  @private
		 */
		"_aSortData": null,
	
		/**
		 * Per cell filtering data cache. As per the sort data cache, used to
		 * increase the performance of the filtering in DataTables
		 *  @type array
		 *  @default null
		 *  @private
		 */
		"_aFilterData": null,
	
		/**
		 * Filtering data cache. This is the same as the cell filtering cache, but
		 * in this case a string rather than an array. This is easily computed with
		 * a join on `_aFilterData`, but is provided as a cache so the join isn't
		 * needed on every search (memory traded for performance)
		 *  @type array
		 *  @default null
		 *  @private
		 */
		"_sFilterRow": null,
	
		/**
		 * Cache of the class name that DataTables has applied to the row, so we
		 * can quickly look at this variable rather than needing to do a DOM check
		 * on className for the nTr property.
		 *  @type string
		 *  @default <i>Empty string</i>
		 *  @private
		 */
		"_sRowStripe": "",
	
		/**
		 * Denote if the original data source was from the DOM, or the data source
		 * object. This is used for invalidating data, so DataTables can
		 * automatically read data from the original source, unless uninstructed
		 * otherwise.
		 *  @type string
		 *  @default null
		 *  @private
		 */
		"src": null,
	
		/**
		 * Index in the aoData array. This saves an indexOf lookup when we have the
		 * object, but want to know the index
		 *  @type integer
		 *  @default -1
		 *  @private
		 */
		"idx": -1
	};
	
	
	/**
	 * Template object for the column information object in DataTables. This object
	 * is held in the settings aoColumns array and contains all the information that
	 * DataTables needs about each individual column.
	 *
	 * Note that this object is related to {@link DataTable.defaults.column}
	 * but this one is the internal data store for DataTables's cache of columns.
	 * It should NOT be manipulated outside of DataTables. Any configuration should
	 * be done through the initialisation options.
	 *  @namespace
	 */
	DataTable.models.oColumn = {
		/**
		 * Column index. This could be worked out on-the-fly with $.inArray, but it
		 * is faster to just hold it as a variable
		 *  @type integer
		 *  @default null
		 */
		"idx": null,
	
		/**
		 * A list of the columns that sorting should occur on when this column
		 * is sorted. That this property is an array allows multi-column sorting
		 * to be defined for a column (for example first name / last name columns
		 * would benefit from this). The values are integers pointing to the
		 * columns to be sorted on (typically it will be a single integer pointing
		 * at itself, but that doesn't need to be the case).
		 *  @type array
		 */
		"aDataSort": null,
	
		/**
		 * Define the sorting directions that are applied to the column, in sequence
		 * as the column is repeatedly sorted upon - i.e. the first value is used
		 * as the sorting direction when the column if first sorted (clicked on).
		 * Sort it again (click again) and it will move on to the next index.
		 * Repeat until loop.
		 *  @type array
		 */
		"asSorting": null,
	
		/**
		 * Flag to indicate if the column is searchable, and thus should be included
		 * in the filtering or not.
		 *  @type boolean
		 */
		"bSearchable": null,
	
		/**
		 * Flag to indicate if the column is sortable or not.
		 *  @type boolean
		 */
		"bSortable": null,
	
		/**
		 * Flag to indicate if the column is currently visible in the table or not
		 *  @type boolean
		 */
		"bVisible": null,
	
		/**
		 * Store for manual type assignment using the `column.type` option. This
		 * is held in store so we can manipulate the column's `sType` property.
		 *  @type string
		 *  @default null
		 *  @private
		 */
		"_sManualType": null,
	
		/**
		 * Flag to indicate if HTML5 data attributes should be used as the data
		 * source for filtering or sorting. True is either are.
		 *  @type boolean
		 *  @default false
		 *  @private
		 */
		"_bAttrSrc": false,
	
		/**
		 * Developer definable function that is called whenever a cell is created (Ajax source,
		 * etc) or processed for input (DOM source). This can be used as a compliment to mRender
		 * allowing you to modify the DOM element (add background colour for example) when the
		 * element is available.
		 *  @type function
		 *  @param {element} nTd The TD node that has been created
		 *  @param {*} sData The Data for the cell
		 *  @param {array|object} oData The data for the whole row
		 *  @param {int} iRow The row index for the aoData data store
		 *  @default null
		 */
		"fnCreatedCell": null,
	
		/**
		 * Function to get data from a cell in a column. You should <b>never</b>
		 * access data directly through _aData internally in DataTables - always use
		 * the method attached to this property. It allows mData to function as
		 * required. This function is automatically assigned by the column
		 * initialisation method
		 *  @type function
		 *  @param {array|object} oData The data array/object for the array
		 *    (i.e. aoData[]._aData)
		 *  @param {string} sSpecific The specific data type you want to get -
		 *    'display', 'type' 'filter' 'sort'
		 *  @returns {*} The data for the cell from the given row's data
		 *  @default null
		 */
		"fnGetData": null,
	
		/**
		 * Function to set data for a cell in the column. You should <b>never</b>
		 * set the data directly to _aData internally in DataTables - always use
		 * this method. It allows mData to function as required. This function
		 * is automatically assigned by the column initialisation method
		 *  @type function
		 *  @param {array|object} oData The data array/object for the array
		 *    (i.e. aoData[]._aData)
		 *  @param {*} sValue Value to set
		 *  @default null
		 */
		"fnSetData": null,
	
		/**
		 * Property to read the value for the cells in the column from the data
		 * source array / object. If null, then the default content is used, if a
		 * function is given then the return from the function is used.
		 *  @type function|int|string|null
		 *  @default null
		 */
		"mData": null,
	
		/**
		 * Partner property to mData which is used (only when defined) to get
		 * the data - i.e. it is basically the same as mData, but without the
		 * 'set' option, and also the data fed to it is the result from mData.
		 * This is the rendering method to match the data method of mData.
		 *  @type function|int|string|null
		 *  @default null
		 */
		"mRender": null,
	
		/**
		 * Unique header TH/TD element for this column - this is what the sorting
		 * listener is attached to (if sorting is enabled.)
		 *  @type node
		 *  @default null
		 */
		"nTh": null,
	
		/**
		 * Unique footer TH/TD element for this column (if there is one). Not used
		 * in DataTables as such, but can be used for plug-ins to reference the
		 * footer for each column.
		 *  @type node
		 *  @default null
		 */
		"nTf": null,
	
		/**
		 * The class to apply to all TD elements in the table's TBODY for the column
		 *  @type string
		 *  @default null
		 */
		"sClass": null,
	
		/**
		 * When DataTables calculates the column widths to assign to each column,
		 * it finds the longest string in each column and then constructs a
		 * temporary table and reads the widths from that. The problem with this
		 * is that "mmm" is much wider then "iiii", but the latter is a longer
		 * string - thus the calculation can go wrong (doing it properly and putting
		 * it into an DOM object and measuring that is horribly(!) slow). Thus as
		 * a "work around" we provide this option. It will append its value to the
		 * text that is found to be the longest string for the column - i.e. padding.
		 *  @type string
		 */
		"sContentPadding": null,
	
		/**
		 * Allows a default value to be given for a column's data, and will be used
		 * whenever a null data source is encountered (this can be because mData
		 * is set to null, or because the data source itself is null).
		 *  @type string
		 *  @default null
		 */
		"sDefaultContent": null,
	
		/**
		 * Name for the column, allowing reference to the column by name as well as
		 * by index (needs a lookup to work by name).
		 *  @type string
		 */
		"sName": null,
	
		/**
		 * Custom sorting data type - defines which of the available plug-ins in
		 * afnSortData the custom sorting will use - if any is defined.
		 *  @type string
		 *  @default std
		 */
		"sSortDataType": 'std',
	
		/**
		 * Class to be applied to the header element when sorting on this column
		 *  @type string
		 *  @default null
		 */
		"sSortingClass": null,
	
		/**
		 * Class to be applied to the header element when sorting on this column -
		 * when jQuery UI theming is used.
		 *  @type string
		 *  @default null
		 */
		"sSortingClassJUI": null,
	
		/**
		 * Title of the column - what is seen in the TH element (nTh).
		 *  @type string
		 */
		"sTitle": null,
	
		/**
		 * Column sorting and filtering type
		 *  @type string
		 *  @default null
		 */
		"sType": null,
	
		/**
		 * Width of the column
		 *  @type string
		 *  @default null
		 */
		"sWidth": null,
	
		/**
		 * Width of the column when it was first "encountered"
		 *  @type string
		 *  @default null
		 */
		"sWidthOrig": null
	};
	
	
	/*
	 * Developer note: The properties of the object below are given in Hungarian
	 * notation, that was used as the interface for DataTables prior to v1.10, however
	 * from v1.10 onwards the primary interface is camel case. In order to avoid
	 * breaking backwards compatibility utterly with this change, the Hungarian
	 * version is still, internally the primary interface, but is is not documented
	 * - hence the @name tags in each doc comment. This allows a Javascript function
	 * to create a map from Hungarian notation to camel case (going the other direction
	 * would require each property to be listed, which would at around 3K to the size
	 * of DataTables, while this method is about a 0.5K hit.
	 *
	 * Ultimately this does pave the way for Hungarian notation to be dropped
	 * completely, but that is a massive amount of work and will break current
	 * installs (therefore is on-hold until v2).
	 */
	
	/**
	 * Initialisation options that can be given to DataTables at initialisation
	 * time.
	 *  @namespace
	 */
	DataTable.defaults = {
		/**
		 * An array of data to use for the table, passed in at initialisation which
		 * will be used in preference to any data which is already in the DOM. This is
		 * particularly useful for constructing tables purely in Javascript, for
		 * example with a custom Ajax call.
		 *  @type array
		 *  @default null
		 *
		 *  @dtopt Option
		 *  @name DataTable.defaults.data
		 *
		 *  @example
		 *    // Using a 2D array data source
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "data": [
		 *          ['Trident', 'Internet Explorer 4.0', 'Win 95+', 4, 'X'],
		 *          ['Trident', 'Internet Explorer 5.0', 'Win 95+', 5, 'C'],
		 *        ],
		 *        "columns": [
		 *          { "title": "Engine" },
		 *          { "title": "Browser" },
		 *          { "title": "Platform" },
		 *          { "title": "Version" },
		 *          { "title": "Grade" }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using an array of objects as a data source (`data`)
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "data": [
		 *          {
		 *            "engine":   "Trident",
		 *            "browser":  "Internet Explorer 4.0",
		 *            "platform": "Win 95+",
		 *            "version":  4,
		 *            "grade":    "X"
		 *          },
		 *          {
		 *            "engine":   "Trident",
		 *            "browser":  "Internet Explorer 5.0",
		 *            "platform": "Win 95+",
		 *            "version":  5,
		 *            "grade":    "C"
		 *          }
		 *        ],
		 *        "columns": [
		 *          { "title": "Engine",   "data": "engine" },
		 *          { "title": "Browser",  "data": "browser" },
		 *          { "title": "Platform", "data": "platform" },
		 *          { "title": "Version",  "data": "version" },
		 *          { "title": "Grade",    "data": "grade" }
		 *        ]
		 *      } );
		 *    } );
		 */
		"aaData": null,
	
	
		/**
		 * If ordering is enabled, then DataTables will perform a first pass sort on
		 * initialisation. You can define which column(s) the sort is performed
		 * upon, and the sorting direction, with this variable. The `sorting` array
		 * should contain an array for each column to be sorted initially containing
		 * the column's index and a direction string ('asc' or 'desc').
		 *  @type array
		 *  @default [[0,'asc']]
		 *
		 *  @dtopt Option
		 *  @name DataTable.defaults.order
		 *
		 *  @example
		 *    // Sort by 3rd column first, and then 4th column
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "order": [[2,'asc'], [3,'desc']]
		 *      } );
		 *    } );
		 *
		 *    // No initial sorting
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "order": []
		 *      } );
		 *    } );
		 */
		"aaSorting": [[0,'asc']],
	
	
		/**
		 * This parameter is basically identical to the `sorting` parameter, but
		 * cannot be overridden by user interaction with the table. What this means
		 * is that you could have a column (visible or hidden) which the sorting
		 * will always be forced on first - any sorting after that (from the user)
		 * will then be performed as required. This can be useful for grouping rows
		 * together.
		 *  @type array
		 *  @default null
		 *
		 *  @dtopt Option
		 *  @name DataTable.defaults.orderFixed
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "orderFixed": [[0,'asc']]
		 *      } );
		 *    } )
		 */
		"aaSortingFixed": [],
	
	
		/**
		 * DataTables can be instructed to load data to display in the table from a
		 * Ajax source. This option defines how that Ajax call is made and where to.
		 *
		 * The `ajax` property has three different modes of operation, depending on
		 * how it is defined. These are:
		 *
		 * * `string` - Set the URL from where the data should be loaded from.
		 * * `object` - Define properties for `jQuery.ajax`.
		 * * `function` - Custom data get function
		 *
		 * `string`
		 * --------
		 *
		 * As a string, the `ajax` property simply defines the URL from which
		 * DataTables will load data.
		 *
		 * `object`
		 * --------
		 *
		 * As an object, the parameters in the object are passed to
		 * [jQuery.ajax](http://api.jquery.com/jQuery.ajax/) allowing fine control
		 * of the Ajax request. DataTables has a number of default parameters which
		 * you can override using this option. Please refer to the jQuery
		 * documentation for a full description of the options available, although
		 * the following parameters provide additional options in DataTables or
		 * require special consideration:
		 *
		 * * `data` - As with jQuery, `data` can be provided as an object, but it
		 *   can also be used as a function to manipulate the data DataTables sends
		 *   to the server. The function takes a single parameter, an object of
		 *   parameters with the values that DataTables has readied for sending. An
		 *   object may be returned which will be merged into the DataTables
		 *   defaults, or you can add the items to the object that was passed in and
		 *   not return anything from the function. This supersedes `fnServerParams`
		 *   from DataTables 1.9-.
		 *
		 * * `dataSrc` - By default DataTables will look for the property `data` (or
		 *   `aaData` for compatibility with DataTables 1.9-) when obtaining data
		 *   from an Ajax source or for server-side processing - this parameter
		 *   allows that property to be changed. You can use Javascript dotted
		 *   object notation to get a data source for multiple levels of nesting, or
		 *   it my be used as a function. As a function it takes a single parameter,
		 *   the JSON returned from the server, which can be manipulated as
		 *   required, with the returned value being that used by DataTables as the
		 *   data source for the table. This supersedes `sAjaxDataProp` from
		 *   DataTables 1.9-.
		 *
		 * * `success` - Should not be overridden it is used internally in
		 *   DataTables. To manipulate / transform the data returned by the server
		 *   use `ajax.dataSrc`, or use `ajax` as a function (see below).
		 *
		 * `function`
		 * ----------
		 *
		 * As a function, making the Ajax call is left up to yourself allowing
		 * complete control of the Ajax request. Indeed, if desired, a method other
		 * than Ajax could be used to obtain the required data, such as Web storage
		 * or an AIR database.
		 *
		 * The function is given four parameters and no return is required. The
		 * parameters are:
		 *
		 * 1. _object_ - Data to send to the server
		 * 2. _function_ - Callback function that must be executed when the required
		 *    data has been obtained. That data should be passed into the callback
		 *    as the only parameter
		 * 3. _object_ - DataTables settings object for the table
		 *
		 * Note that this supersedes `fnServerData` from DataTables 1.9-.
		 *
		 *  @type string|object|function
		 *  @default null
		 *
		 *  @dtopt Option
		 *  @name DataTable.defaults.ajax
		 *  @since 1.10.0
		 *
		 * @example
		 *   // Get JSON data from a file via Ajax.
		 *   // Note DataTables expects data in the form `{ data: [ ...data... ] }` by default).
		 *   $('#example').dataTable( {
		 *     "ajax": "data.json"
		 *   } );
		 *
		 * @example
		 *   // Get JSON data from a file via Ajax, using `dataSrc` to change
		 *   // `data` to `tableData` (i.e. `{ tableData: [ ...data... ] }`)
		 *   $('#example').dataTable( {
		 *     "ajax": {
		 *       "url": "data.json",
		 *       "dataSrc": "tableData"
		 *     }
		 *   } );
		 *
		 * @example
		 *   // Get JSON data from a file via Ajax, using `dataSrc` to read data
		 *   // from a plain array rather than an array in an object
		 *   $('#example').dataTable( {
		 *     "ajax": {
		 *       "url": "data.json",
		 *       "dataSrc": ""
		 *     }
		 *   } );
		 *
		 * @example
		 *   // Manipulate the data returned from the server - add a link to data
		 *   // (note this can, should, be done using `render` for the column - this
		 *   // is just a simple example of how the data can be manipulated).
		 *   $('#example').dataTable( {
		 *     "ajax": {
		 *       "url": "data.json",
		 *       "dataSrc": function ( json ) {
		 *         for ( var i=0, ien=json.length ; i<ien ; i++ ) {
		 *           json[i][0] = '<a href="/message/'+json[i][0]+'>View message</a>';
		 *         }
		 *         return json;
		 *       }
		 *     }
		 *   } );
		 *
		 * @example
		 *   // Add data to the request
		 *   $('#example').dataTable( {
		 *     "ajax": {
		 *       "url": "data.json",
		 *       "data": function ( d ) {
		 *         return {
		 *           "extra_search": $('#extra').val()
		 *         };
		 *       }
		 *     }
		 *   } );
		 *
		 * @example
		 *   // Send request as POST
		 *   $('#example').dataTable( {
		 *     "ajax": {
		 *       "url": "data.json",
		 *       "type": "POST"
		 *     }
		 *   } );
		 *
		 * @example
		 *   // Get the data from localStorage (could interface with a form for
		 *   // adding, editing and removing rows).
		 *   $('#example').dataTable( {
		 *     "ajax": function (data, callback, settings) {
		 *       callback(
		 *         JSON.parse( localStorage.getItem('dataTablesData') )
		 *       );
		 *     }
		 *   } );
		 */
		"ajax": null,
	
	
		/**
		 * This parameter allows you to readily specify the entries in the length drop
		 * down menu that DataTables shows when pagination is enabled. It can be
		 * either a 1D array of options which will be used for both the displayed
		 * option and the value, or a 2D array which will use the array in the first
		 * position as the value, and the array in the second position as the
		 * displayed options (useful for language strings such as 'All').
		 *
		 * Note that the `pageLength` property will be automatically set to the
		 * first value given in this array, unless `pageLength` is also provided.
		 *  @type array
		 *  @default [ 10, 25, 50, 100 ]
		 *
		 *  @dtopt Option
		 *  @name DataTable.defaults.lengthMenu
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]]
		 *      } );
		 *    } );
		 */
		"aLengthMenu": [ 10, 25, 50, 100 ],
	
	
		/**
		 * The `columns` option in the initialisation parameter allows you to define
		 * details about the way individual columns behave. For a full list of
		 * column options that can be set, please see
		 * {@link DataTable.defaults.column}. Note that if you use `columns` to
		 * define your columns, you must have an entry in the array for every single
		 * column that you have in your table (these can be null if you don't which
		 * to specify any options).
		 *  @member
		 *
		 *  @name DataTable.defaults.column
		 */
		"aoColumns": null,
	
		/**
		 * Very similar to `columns`, `columnDefs` allows you to target a specific
		 * column, multiple columns, or all columns, using the `targets` property of
		 * each object in the array. This allows great flexibility when creating
		 * tables, as the `columnDefs` arrays can be of any length, targeting the
		 * columns you specifically want. `columnDefs` may use any of the column
		 * options available: {@link DataTable.defaults.column}, but it _must_
		 * have `targets` defined in each object in the array. Values in the `targets`
		 * array may be:
		 *   <ul>
		 *     <li>a string - class name will be matched on the TH for the column</li>
		 *     <li>0 or a positive integer - column index counting from the left</li>
		 *     <li>a negative integer - column index counting from the right</li>
		 *     <li>the string "_all" - all columns (i.e. assign a default)</li>
		 *   </ul>
		 *  @member
		 *
		 *  @name DataTable.defaults.columnDefs
		 */
		"aoColumnDefs": null,
	
	
		/**
		 * Basically the same as `search`, this parameter defines the individual column
		 * filtering state at initialisation time. The array must be of the same size
		 * as the number of columns, and each element be an object with the parameters
		 * `search` and `escapeRegex` (the latter is optional). 'null' is also
		 * accepted and the default will be used.
		 *  @type array
		 *  @default []
		 *
		 *  @dtopt Option
		 *  @name DataTable.defaults.searchCols
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "searchCols": [
		 *          null,
		 *          { "search": "My filter" },
		 *          null,
		 *          { "search": "^[0-9]", "escapeRegex": false }
		 *        ]
		 *      } );
		 *    } )
		 */
		"aoSearchCols": [],
	
	
		/**
		 * An array of CSS classes that should be applied to displayed rows. This
		 * array may be of any length, and DataTables will apply each class
		 * sequentially, looping when required.
		 *  @type array
		 *  @default null <i>Will take the values determined by the `oClasses.stripe*`
		 *    options</i>
		 *
		 *  @dtopt Option
		 *  @name DataTable.defaults.stripeClasses
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "stripeClasses": [ 'strip1', 'strip2', 'strip3' ]
		 *      } );
		 *    } )
		 */
		"asStripeClasses": null,
	
	
		/**
		 * Enable or disable automatic column width calculation. This can be disabled
		 * as an optimisation (it takes some time to calculate the widths) if the
		 * tables widths are passed in using `columns`.
		 *  @type boolean
		 *  @default true
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.autoWidth
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "autoWidth": false
		 *      } );
		 *    } );
		 */
		"bAutoWidth": true,
	
	
		/**
		 * Deferred rendering can provide DataTables with a huge speed boost when you
		 * are using an Ajax or JS data source for the table. This option, when set to
		 * true, will cause DataTables to defer the creation of the table elements for
		 * each row until they are needed for a draw - saving a significant amount of
		 * time.
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.deferRender
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "ajax": "sources/arrays.txt",
		 *        "deferRender": true
		 *      } );
		 *    } );
		 */
		"bDeferRender": false,
	
	
		/**
		 * Replace a DataTable which matches the given selector and replace it with
		 * one which has the properties of the new initialisation object passed. If no
		 * table matches the selector, then the new DataTable will be constructed as
		 * per normal.
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.destroy
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "srollY": "200px",
		 *        "paginate": false
		 *      } );
		 *
		 *      // Some time later....
		 *      $('#example').dataTable( {
		 *        "filter": false,
		 *        "destroy": true
		 *      } );
		 *    } );
		 */
		"bDestroy": false,
	
	
		/**
		 * Enable or disable filtering of data. Filtering in DataTables is "smart" in
		 * that it allows the end user to input multiple words (space separated) and
		 * will match a row containing those words, even if not in the order that was
		 * specified (this allow matching across multiple columns). Note that if you
		 * wish to use filtering in DataTables this must remain 'true' - to remove the
		 * default filtering input box and retain filtering abilities, please use
		 * {@link DataTable.defaults.dom}.
		 *  @type boolean
		 *  @default true
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.searching
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "searching": false
		 *      } );
		 *    } );
		 */
		"bFilter": true,
	
	
		/**
		 * Enable or disable the table information display. This shows information
		 * about the data that is currently visible on the page, including information
		 * about filtered data if that action is being performed.
		 *  @type boolean
		 *  @default true
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.info
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "info": false
		 *      } );
		 *    } );
		 */
		"bInfo": true,
	
	
		/**
		 * Allows the end user to select the size of a formatted page from a select
		 * menu (sizes are 10, 25, 50 and 100). Requires pagination (`paginate`).
		 *  @type boolean
		 *  @default true
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.lengthChange
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "lengthChange": false
		 *      } );
		 *    } );
		 */
		"bLengthChange": true,
	
	
		/**
		 * Enable or disable pagination.
		 *  @type boolean
		 *  @default true
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.paging
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "paging": false
		 *      } );
		 *    } );
		 */
		"bPaginate": true,
	
	
		/**
		 * Enable or disable the display of a 'processing' indicator when the table is
		 * being processed (e.g. a sort). This is particularly useful for tables with
		 * large amounts of data where it can take a noticeable amount of time to sort
		 * the entries.
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.processing
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "processing": true
		 *      } );
		 *    } );
		 */
		"bProcessing": false,
	
	
		/**
		 * Retrieve the DataTables object for the given selector. Note that if the
		 * table has already been initialised, this parameter will cause DataTables
		 * to simply return the object that has already been set up - it will not take
		 * account of any changes you might have made to the initialisation object
		 * passed to DataTables (setting this parameter to true is an acknowledgement
		 * that you understand this). `destroy` can be used to reinitialise a table if
		 * you need.
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.retrieve
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      initTable();
		 *      tableActions();
		 *    } );
		 *
		 *    function initTable ()
		 *    {
		 *      return $('#example').dataTable( {
		 *        "scrollY": "200px",
		 *        "paginate": false,
		 *        "retrieve": true
		 *      } );
		 *    }
		 *
		 *    function tableActions ()
		 *    {
		 *      var table = initTable();
		 *      // perform API operations with oTable
		 *    }
		 */
		"bRetrieve": false,
	
	
		/**
		 * When vertical (y) scrolling is enabled, DataTables will force the height of
		 * the table's viewport to the given height at all times (useful for layout).
		 * However, this can look odd when filtering data down to a small data set,
		 * and the footer is left "floating" further down. This parameter (when
		 * enabled) will cause DataTables to collapse the table's viewport down when
		 * the result set will fit within the given Y height.
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.scrollCollapse
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "scrollY": "200",
		 *        "scrollCollapse": true
		 *      } );
		 *    } );
		 */
		"bScrollCollapse": false,
	
	
		/**
		 * Configure DataTables to use server-side processing. Note that the
		 * `ajax` parameter must also be given in order to give DataTables a
		 * source to obtain the required data for each draw.
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Features
		 *  @dtopt Server-side
		 *  @name DataTable.defaults.serverSide
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "serverSide": true,
		 *        "ajax": "xhr.php"
		 *      } );
		 *    } );
		 */
		"bServerSide": false,
	
	
		/**
		 * Enable or disable sorting of columns. Sorting of individual columns can be
		 * disabled by the `sortable` option for each column.
		 *  @type boolean
		 *  @default true
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.ordering
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "ordering": false
		 *      } );
		 *    } );
		 */
		"bSort": true,
	
	
		/**
		 * Enable or display DataTables' ability to sort multiple columns at the
		 * same time (activated by shift-click by the user).
		 *  @type boolean
		 *  @default true
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.orderMulti
		 *
		 *  @example
		 *    // Disable multiple column sorting ability
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "orderMulti": false
		 *      } );
		 *    } );
		 */
		"bSortMulti": true,
	
	
		/**
		 * Allows control over whether DataTables should use the top (true) unique
		 * cell that is found for a single column, or the bottom (false - default).
		 * This is useful when using complex headers.
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.orderCellsTop
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "orderCellsTop": true
		 *      } );
		 *    } );
		 */
		"bSortCellsTop": false,
	
	
		/**
		 * Enable or disable the addition of the classes `sorting\_1`, `sorting\_2` and
		 * `sorting\_3` to the columns which are currently being sorted on. This is
		 * presented as a feature switch as it can increase processing time (while
		 * classes are removed and added) so for large data sets you might want to
		 * turn this off.
		 *  @type boolean
		 *  @default true
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.orderClasses
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "orderClasses": false
		 *      } );
		 *    } );
		 */
		"bSortClasses": true,
	
	
		/**
		 * Enable or disable state saving. When enabled HTML5 `localStorage` will be
		 * used to save table display information such as pagination information,
		 * display length, filtering and sorting. As such when the end user reloads
		 * the page the display display will match what thy had previously set up.
		 *
		 * Due to the use of `localStorage` the default state saving is not supported
		 * in IE6 or 7. If state saving is required in those browsers, use
		 * `stateSaveCallback` to provide a storage solution such as cookies.
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.stateSave
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "stateSave": true
		 *      } );
		 *    } );
		 */
		"bStateSave": false,
	
	
		/**
		 * This function is called when a TR element is created (and all TD child
		 * elements have been inserted), or registered if using a DOM source, allowing
		 * manipulation of the TR element (adding classes etc).
		 *  @type function
		 *  @param {node} row "TR" element for the current row
		 *  @param {array} data Raw data array for this row
		 *  @param {int} dataIndex The index of this row in the internal aoData array
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.createdRow
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "createdRow": function( row, data, dataIndex ) {
		 *          // Bold the grade for all 'A' grade browsers
		 *          if ( data[4] == "A" )
		 *          {
		 *            $('td:eq(4)', row).html( '<b>A</b>' );
		 *          }
		 *        }
		 *      } );
		 *    } );
		 */
		"fnCreatedRow": null,
	
	
		/**
		 * This function is called on every 'draw' event, and allows you to
		 * dynamically modify any aspect you want about the created DOM.
		 *  @type function
		 *  @param {object} settings DataTables settings object
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.drawCallback
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "drawCallback": function( settings ) {
		 *          alert( 'DataTables has redrawn the table' );
		 *        }
		 *      } );
		 *    } );
		 */
		"fnDrawCallback": null,
	
	
		/**
		 * Identical to fnHeaderCallback() but for the table footer this function
		 * allows you to modify the table footer on every 'draw' event.
		 *  @type function
		 *  @param {node} foot "TR" element for the footer
		 *  @param {array} data Full table data (as derived from the original HTML)
		 *  @param {int} start Index for the current display starting point in the
		 *    display array
		 *  @param {int} end Index for the current display ending point in the
		 *    display array
		 *  @param {array int} display Index array to translate the visual position
		 *    to the full data array
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.footerCallback
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "footerCallback": function( tfoot, data, start, end, display ) {
		 *          tfoot.getElementsByTagName('th')[0].innerHTML = "Starting index is "+start;
		 *        }
		 *      } );
		 *    } )
		 */
		"fnFooterCallback": null,
	
	
		/**
		 * When rendering large numbers in the information element for the table
		 * (i.e. "Showing 1 to 10 of 57 entries") DataTables will render large numbers
		 * to have a comma separator for the 'thousands' units (e.g. 1 million is
		 * rendered as "1,000,000") to help readability for the end user. This
		 * function will override the default method DataTables uses.
		 *  @type function
		 *  @member
		 *  @param {int} toFormat number to be formatted
		 *  @returns {string} formatted string for DataTables to show the number
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.formatNumber
		 *
		 *  @example
		 *    // Format a number using a single quote for the separator (note that
		 *    // this can also be done with the language.thousands option)
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "formatNumber": function ( toFormat ) {
		 *          return toFormat.toString().replace(
		 *            /\B(?=(\d{3})+(?!\d))/g, "'"
		 *          );
		 *        };
		 *      } );
		 *    } );
		 */
		"fnFormatNumber": function ( toFormat ) {
			return toFormat.toString().replace(
				/\B(?=(\d{3})+(?!\d))/g,
				this.oLanguage.sThousands
			);
		},
	
	
		/**
		 * This function is called on every 'draw' event, and allows you to
		 * dynamically modify the header row. This can be used to calculate and
		 * display useful information about the table.
		 *  @type function
		 *  @param {node} head "TR" element for the header
		 *  @param {array} data Full table data (as derived from the original HTML)
		 *  @param {int} start Index for the current display starting point in the
		 *    display array
		 *  @param {int} end Index for the current display ending point in the
		 *    display array
		 *  @param {array int} display Index array to translate the visual position
		 *    to the full data array
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.headerCallback
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "fheaderCallback": function( head, data, start, end, display ) {
		 *          head.getElementsByTagName('th')[0].innerHTML = "Displaying "+(end-start)+" records";
		 *        }
		 *      } );
		 *    } )
		 */
		"fnHeaderCallback": null,
	
	
		/**
		 * The information element can be used to convey information about the current
		 * state of the table. Although the internationalisation options presented by
		 * DataTables are quite capable of dealing with most customisations, there may
		 * be times where you wish to customise the string further. This callback
		 * allows you to do exactly that.
		 *  @type function
		 *  @param {object} oSettings DataTables settings object
		 *  @param {int} start Starting position in data for the draw
		 *  @param {int} end End position in data for the draw
		 *  @param {int} max Total number of rows in the table (regardless of
		 *    filtering)
		 *  @param {int} total Total number of rows in the data set, after filtering
		 *  @param {string} pre The string that DataTables has formatted using it's
		 *    own rules
		 *  @returns {string} The string to be displayed in the information element.
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.infoCallback
		 *
		 *  @example
		 *    $('#example').dataTable( {
		 *      "infoCallback": function( settings, start, end, max, total, pre ) {
		 *        return start +" to "+ end;
		 *      }
		 *    } );
		 */
		"fnInfoCallback": null,
	
	
		/**
		 * Called when the table has been initialised. Normally DataTables will
		 * initialise sequentially and there will be no need for this function,
		 * however, this does not hold true when using external language information
		 * since that is obtained using an async XHR call.
		 *  @type function
		 *  @param {object} settings DataTables settings object
		 *  @param {object} json The JSON object request from the server - only
		 *    present if client-side Ajax sourced data is used
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.initComplete
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "initComplete": function(settings, json) {
		 *          alert( 'DataTables has finished its initialisation.' );
		 *        }
		 *      } );
		 *    } )
		 */
		"fnInitComplete": null,
	
	
		/**
		 * Called at the very start of each table draw and can be used to cancel the
		 * draw by returning false, any other return (including undefined) results in
		 * the full draw occurring).
		 *  @type function
		 *  @param {object} settings DataTables settings object
		 *  @returns {boolean} False will cancel the draw, anything else (including no
		 *    return) will allow it to complete.
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.preDrawCallback
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "preDrawCallback": function( settings ) {
		 *          if ( $('#test').val() == 1 ) {
		 *            return false;
		 *          }
		 *        }
		 *      } );
		 *    } );
		 */
		"fnPreDrawCallback": null,
	
	
		/**
		 * This function allows you to 'post process' each row after it have been
		 * generated for each table draw, but before it is rendered on screen. This
		 * function might be used for setting the row class name etc.
		 *  @type function
		 *  @param {node} row "TR" element for the current row
		 *  @param {array} data Raw data array for this row
		 *  @param {int} displayIndex The display index for the current table draw
		 *  @param {int} displayIndexFull The index of the data in the full list of
		 *    rows (after filtering)
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.rowCallback
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "rowCallback": function( row, data, displayIndex, displayIndexFull ) {
		 *          // Bold the grade for all 'A' grade browsers
		 *          if ( data[4] == "A" ) {
		 *            $('td:eq(4)', row).html( '<b>A</b>' );
		 *          }
		 *        }
		 *      } );
		 *    } );
		 */
		"fnRowCallback": null,
	
	
		/**
		 * __Deprecated__ The functionality provided by this parameter has now been
		 * superseded by that provided through `ajax`, which should be used instead.
		 *
		 * This parameter allows you to override the default function which obtains
		 * the data from the server so something more suitable for your application.
		 * For example you could use POST data, or pull information from a Gears or
		 * AIR database.
		 *  @type function
		 *  @member
		 *  @param {string} source HTTP source to obtain the data from (`ajax`)
		 *  @param {array} data A key/value pair object containing the data to send
		 *    to the server
		 *  @param {function} callback to be called on completion of the data get
		 *    process that will draw the data on the page.
		 *  @param {object} settings DataTables settings object
		 *
		 *  @dtopt Callbacks
		 *  @dtopt Server-side
		 *  @name DataTable.defaults.serverData
		 *
		 *  @deprecated 1.10. Please use `ajax` for this functionality now.
		 */
		"fnServerData": null,
	
	
		/**
		 * __Deprecated__ The functionality provided by this parameter has now been
		 * superseded by that provided through `ajax`, which should be used instead.
		 *
		 *  It is often useful to send extra data to the server when making an Ajax
		 * request - for example custom filtering information, and this callback
		 * function makes it trivial to send extra information to the server. The
		 * passed in parameter is the data set that has been constructed by
		 * DataTables, and you can add to this or modify it as you require.
		 *  @type function
		 *  @param {array} data Data array (array of objects which are name/value
		 *    pairs) that has been constructed by DataTables and will be sent to the
		 *    server. In the case of Ajax sourced data with server-side processing
		 *    this will be an empty array, for server-side processing there will be a
		 *    significant number of parameters!
		 *  @returns {undefined} Ensure that you modify the data array passed in,
		 *    as this is passed by reference.
		 *
		 *  @dtopt Callbacks
		 *  @dtopt Server-side
		 *  @name DataTable.defaults.serverParams
		 *
		 *  @deprecated 1.10. Please use `ajax` for this functionality now.
		 */
		"fnServerParams": null,
	
	
		/**
		 * Load the table state. With this function you can define from where, and how, the
		 * state of a table is loaded. By default DataTables will load from `localStorage`
		 * but you might wish to use a server-side database or cookies.
		 *  @type function
		 *  @member
		 *  @param {object} settings DataTables settings object
		 *  @param {object} callback Callback that can be executed when done. It
		 *    should be passed the loaded state object.
		 *  @return {object} The DataTables state object to be loaded
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.stateLoadCallback
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "stateSave": true,
		 *        "stateLoadCallback": function (settings, callback) {
		 *          $.ajax( {
		 *            "url": "/state_load",
		 *            "dataType": "json",
		 *            "success": function (json) {
		 *              callback( json );
		 *            }
		 *          } );
		 *        }
		 *      } );
		 *    } );
		 */
		"fnStateLoadCallback": function ( settings ) {
			try {
				return JSON.parse(
					(settings.iStateDuration === -1 ? sessionStorage : localStorage).getItem(
						'DataTables_'+settings.sInstance+'_'+location.pathname
					)
				);
			} catch (e) {
				return {};
			}
		},
	
	
		/**
		 * Callback which allows modification of the saved state prior to loading that state.
		 * This callback is called when the table is loading state from the stored data, but
		 * prior to the settings object being modified by the saved state. Note that for
		 * plug-in authors, you should use the `stateLoadParams` event to load parameters for
		 * a plug-in.
		 *  @type function
		 *  @param {object} settings DataTables settings object
		 *  @param {object} data The state object that is to be loaded
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.stateLoadParams
		 *
		 *  @example
		 *    // Remove a saved filter, so filtering is never loaded
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "stateSave": true,
		 *        "stateLoadParams": function (settings, data) {
		 *          data.oSearch.sSearch = "";
		 *        }
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Disallow state loading by returning false
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "stateSave": true,
		 *        "stateLoadParams": function (settings, data) {
		 *          return false;
		 *        }
		 *      } );
		 *    } );
		 */
		"fnStateLoadParams": null,
	
	
		/**
		 * Callback that is called when the state has been loaded from the state saving method
		 * and the DataTables settings object has been modified as a result of the loaded state.
		 *  @type function
		 *  @param {object} settings DataTables settings object
		 *  @param {object} data The state object that was loaded
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.stateLoaded
		 *
		 *  @example
		 *    // Show an alert with the filtering value that was saved
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "stateSave": true,
		 *        "stateLoaded": function (settings, data) {
		 *          alert( 'Saved filter was: '+data.oSearch.sSearch );
		 *        }
		 *      } );
		 *    } );
		 */
		"fnStateLoaded": null,
	
	
		/**
		 * Save the table state. This function allows you to define where and how the state
		 * information for the table is stored By default DataTables will use `localStorage`
		 * but you might wish to use a server-side database or cookies.
		 *  @type function
		 *  @member
		 *  @param {object} settings DataTables settings object
		 *  @param {object} data The state object to be saved
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.stateSaveCallback
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "stateSave": true,
		 *        "stateSaveCallback": function (settings, data) {
		 *          // Send an Ajax request to the server with the state object
		 *          $.ajax( {
		 *            "url": "/state_save",
		 *            "data": data,
		 *            "dataType": "json",
		 *            "method": "POST"
		 *            "success": function () {}
		 *          } );
		 *        }
		 *      } );
		 *    } );
		 */
		"fnStateSaveCallback": function ( settings, data ) {
			try {
				(settings.iStateDuration === -1 ? sessionStorage : localStorage).setItem(
					'DataTables_'+settings.sInstance+'_'+location.pathname,
					JSON.stringify( data )
				);
			} catch (e) {}
		},
	
	
		/**
		 * Callback which allows modification of the state to be saved. Called when the table
		 * has changed state a new state save is required. This method allows modification of
		 * the state saving object prior to actually doing the save, including addition or
		 * other state properties or modification. Note that for plug-in authors, you should
		 * use the `stateSaveParams` event to save parameters for a plug-in.
		 *  @type function
		 *  @param {object} settings DataTables settings object
		 *  @param {object} data The state object to be saved
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.stateSaveParams
		 *
		 *  @example
		 *    // Remove a saved filter, so filtering is never saved
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "stateSave": true,
		 *        "stateSaveParams": function (settings, data) {
		 *          data.oSearch.sSearch = "";
		 *        }
		 *      } );
		 *    } );
		 */
		"fnStateSaveParams": null,
	
	
		/**
		 * Duration for which the saved state information is considered valid. After this period
		 * has elapsed the state will be returned to the default.
		 * Value is given in seconds.
		 *  @type int
		 *  @default 7200 <i>(2 hours)</i>
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.stateDuration
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "stateDuration": 60*60*24; // 1 day
		 *      } );
		 *    } )
		 */
		"iStateDuration": 7200,
	
	
		/**
		 * When enabled DataTables will not make a request to the server for the first
		 * page draw - rather it will use the data already on the page (no sorting etc
		 * will be applied to it), thus saving on an XHR at load time. `deferLoading`
		 * is used to indicate that deferred loading is required, but it is also used
		 * to tell DataTables how many records there are in the full table (allowing
		 * the information element and pagination to be displayed correctly). In the case
		 * where a filtering is applied to the table on initial load, this can be
		 * indicated by giving the parameter as an array, where the first element is
		 * the number of records available after filtering and the second element is the
		 * number of records without filtering (allowing the table information element
		 * to be shown correctly).
		 *  @type int | array
		 *  @default null
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.deferLoading
		 *
		 *  @example
		 *    // 57 records available in the table, no filtering applied
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "serverSide": true,
		 *        "ajax": "scripts/server_processing.php",
		 *        "deferLoading": 57
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // 57 records after filtering, 100 without filtering (an initial filter applied)
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "serverSide": true,
		 *        "ajax": "scripts/server_processing.php",
		 *        "deferLoading": [ 57, 100 ],
		 *        "search": {
		 *          "search": "my_filter"
		 *        }
		 *      } );
		 *    } );
		 */
		"iDeferLoading": null,
	
	
		/**
		 * Number of rows to display on a single page when using pagination. If
		 * feature enabled (`lengthChange`) then the end user will be able to override
		 * this to a custom setting using a pop-up menu.
		 *  @type int
		 *  @default 10
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.pageLength
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "pageLength": 50
		 *      } );
		 *    } )
		 */
		"iDisplayLength": 10,
	
	
		/**
		 * Define the starting point for data display when using DataTables with
		 * pagination. Note that this parameter is the number of records, rather than
		 * the page number, so if you have 10 records per page and want to start on
		 * the third page, it should be "20".
		 *  @type int
		 *  @default 0
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.displayStart
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "displayStart": 20
		 *      } );
		 *    } )
		 */
		"iDisplayStart": 0,
	
	
		/**
		 * By default DataTables allows keyboard navigation of the table (sorting, paging,
		 * and filtering) by adding a `tabindex` attribute to the required elements. This
		 * allows you to tab through the controls and press the enter key to activate them.
		 * The tabindex is default 0, meaning that the tab follows the flow of the document.
		 * You can overrule this using this parameter if you wish. Use a value of -1 to
		 * disable built-in keyboard navigation.
		 *  @type int
		 *  @default 0
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.tabIndex
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "tabIndex": 1
		 *      } );
		 *    } );
		 */
		"iTabIndex": 0,
	
	
		/**
		 * Classes that DataTables assigns to the various components and features
		 * that it adds to the HTML table. This allows classes to be configured
		 * during initialisation in addition to through the static
		 * {@link DataTable.ext.oStdClasses} object).
		 *  @namespace
		 *  @name DataTable.defaults.classes
		 */
		"oClasses": {},
	
	
		/**
		 * All strings that DataTables uses in the user interface that it creates
		 * are defined in this object, allowing you to modified them individually or
		 * completely replace them all as required.
		 *  @namespace
		 *  @name DataTable.defaults.language
		 */
		"oLanguage": {
			/**
			 * Strings that are used for WAI-ARIA labels and controls only (these are not
			 * actually visible on the page, but will be read by screenreaders, and thus
			 * must be internationalised as well).
			 *  @namespace
			 *  @name DataTable.defaults.language.aria
			 */
			"oAria": {
				/**
				 * ARIA label that is added to the table headers when the column may be
				 * sorted ascending by activing the column (click or return when focused).
				 * Note that the column header is prefixed to this string.
				 *  @type string
				 *  @default : activate to sort column ascending
				 *
				 *  @dtopt Language
				 *  @name DataTable.defaults.language.aria.sortAscending
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "language": {
				 *          "aria": {
				 *            "sortAscending": " - click/return to sort ascending"
				 *          }
				 *        }
				 *      } );
				 *    } );
				 */
				"sSortAscending": ": activate to sort column ascending",
	
				/**
				 * ARIA label that is added to the table headers when the column may be
				 * sorted descending by activing the column (click or return when focused).
				 * Note that the column header is prefixed to this string.
				 *  @type string
				 *  @default : activate to sort column ascending
				 *
				 *  @dtopt Language
				 *  @name DataTable.defaults.language.aria.sortDescending
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "language": {
				 *          "aria": {
				 *            "sortDescending": " - click/return to sort descending"
				 *          }
				 *        }
				 *      } );
				 *    } );
				 */
				"sSortDescending": ": activate to sort column descending"
			},
	
			/**
			 * Pagination string used by DataTables for the built-in pagination
			 * control types.
			 *  @namespace
			 *  @name DataTable.defaults.language.paginate
			 */
			"oPaginate": {
				/**
				 * Text to use when using the 'full_numbers' type of pagination for the
				 * button to take the user to the first page.
				 *  @type string
				 *  @default First
				 *
				 *  @dtopt Language
				 *  @name DataTable.defaults.language.paginate.first
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "language": {
				 *          "paginate": {
				 *            "first": "First page"
				 *          }
				 *        }
				 *      } );
				 *    } );
				 */
				"sFirst": "First",
	
	
				/**
				 * Text to use when using the 'full_numbers' type of pagination for the
				 * button to take the user to the last page.
				 *  @type string
				 *  @default Last
				 *
				 *  @dtopt Language
				 *  @name DataTable.defaults.language.paginate.last
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "language": {
				 *          "paginate": {
				 *            "last": "Last page"
				 *          }
				 *        }
				 *      } );
				 *    } );
				 */
				"sLast": "Last",
	
	
				/**
				 * Text to use for the 'next' pagination button (to take the user to the
				 * next page).
				 *  @type string
				 *  @default Next
				 *
				 *  @dtopt Language
				 *  @name DataTable.defaults.language.paginate.next
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "language": {
				 *          "paginate": {
				 *            "next": "Next page"
				 *          }
				 *        }
				 *      } );
				 *    } );
				 */
				"sNext": "Next",
	
	
				/**
				 * Text to use for the 'previous' pagination button (to take the user to
				 * the previous page).
				 *  @type string
				 *  @default Previous
				 *
				 *  @dtopt Language
				 *  @name DataTable.defaults.language.paginate.previous
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "language": {
				 *          "paginate": {
				 *            "previous": "Previous page"
				 *          }
				 *        }
				 *      } );
				 *    } );
				 */
				"sPrevious": "Previous"
			},
	
			/**
			 * This string is shown in preference to `zeroRecords` when the table is
			 * empty of data (regardless of filtering). Note that this is an optional
			 * parameter - if it is not given, the value of `zeroRecords` will be used
			 * instead (either the default or given value).
			 *  @type string
			 *  @default No data available in table
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.emptyTable
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "emptyTable": "No data available in table"
			 *        }
			 *      } );
			 *    } );
			 */
			"sEmptyTable": "No data available in table",
	
	
			/**
			 * This string gives information to the end user about the information
			 * that is current on display on the page. The following tokens can be
			 * used in the string and will be dynamically replaced as the table
			 * display updates. This tokens can be placed anywhere in the string, or
			 * removed as needed by the language requires:
			 *
			 * * `\_START\_` - Display index of the first record on the current page
			 * * `\_END\_` - Display index of the last record on the current page
			 * * `\_TOTAL\_` - Number of records in the table after filtering
			 * * `\_MAX\_` - Number of records in the table without filtering
			 * * `\_PAGE\_` - Current page number
			 * * `\_PAGES\_` - Total number of pages of data in the table
			 *
			 *  @type string
			 *  @default Showing _START_ to _END_ of _TOTAL_ entries
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.info
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "info": "Showing page _PAGE_ of _PAGES_"
			 *        }
			 *      } );
			 *    } );
			 */
			"sInfo": "Showing _START_ to _END_ of _TOTAL_ entries",
	
	
			/**
			 * Display information string for when the table is empty. Typically the
			 * format of this string should match `info`.
			 *  @type string
			 *  @default Showing 0 to 0 of 0 entries
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.infoEmpty
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "infoEmpty": "No entries to show"
			 *        }
			 *      } );
			 *    } );
			 */
			"sInfoEmpty": "Showing 0 to 0 of 0 entries",
	
	
			/**
			 * When a user filters the information in a table, this string is appended
			 * to the information (`info`) to give an idea of how strong the filtering
			 * is. The variable _MAX_ is dynamically updated.
			 *  @type string
			 *  @default (filtered from _MAX_ total entries)
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.infoFiltered
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "infoFiltered": " - filtering from _MAX_ records"
			 *        }
			 *      } );
			 *    } );
			 */
			"sInfoFiltered": "(filtered from _MAX_ total entries)",
	
	
			/**
			 * If can be useful to append extra information to the info string at times,
			 * and this variable does exactly that. This information will be appended to
			 * the `info` (`infoEmpty` and `infoFiltered` in whatever combination they are
			 * being used) at all times.
			 *  @type string
			 *  @default <i>Empty string</i>
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.infoPostFix
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "infoPostFix": "All records shown are derived from real information."
			 *        }
			 *      } );
			 *    } );
			 */
			"sInfoPostFix": "",
	
	
			/**
			 * This decimal place operator is a little different from the other
			 * language options since DataTables doesn't output floating point
			 * numbers, so it won't ever use this for display of a number. Rather,
			 * what this parameter does is modify the sort methods of the table so
			 * that numbers which are in a format which has a character other than
			 * a period (`.`) as a decimal place will be sorted numerically.
			 *
			 * Note that numbers with different decimal places cannot be shown in
			 * the same table and still be sortable, the table must be consistent.
			 * However, multiple different tables on the page can use different
			 * decimal place characters.
			 *  @type string
			 *  @default 
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.decimal
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "decimal": ","
			 *          "thousands": "."
			 *        }
			 *      } );
			 *    } );
			 */
			"sDecimal": "",
	
	
			/**
			 * DataTables has a build in number formatter (`formatNumber`) which is
			 * used to format large numbers that are used in the table information.
			 * By default a comma is used, but this can be trivially changed to any
			 * character you wish with this parameter.
			 *  @type string
			 *  @default ,
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.thousands
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "thousands": "'"
			 *        }
			 *      } );
			 *    } );
			 */
			"sThousands": ",",
	
	
			/**
			 * Detail the action that will be taken when the drop down menu for the
			 * pagination length option is changed. The '_MENU_' variable is replaced
			 * with a default select list of 10, 25, 50 and 100, and can be replaced
			 * with a custom select box if required.
			 *  @type string
			 *  @default Show _MENU_ entries
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.lengthMenu
			 *
			 *  @example
			 *    // Language change only
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "lengthMenu": "Display _MENU_ records"
			 *        }
			 *      } );
			 *    } );
			 *
			 *  @example
			 *    // Language and options change
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "lengthMenu": 'Display <select>'+
			 *            '<option value="10">10</option>'+
			 *            '<option value="20">20</option>'+
			 *            '<option value="30">30</option>'+
			 *            '<option value="40">40</option>'+
			 *            '<option value="50">50</option>'+
			 *            '<option value="-1">All</option>'+
			 *            '</select> records'
			 *        }
			 *      } );
			 *    } );
			 */
			"sLengthMenu": "Show _MENU_ entries",
	
	
			/**
			 * When using Ajax sourced data and during the first draw when DataTables is
			 * gathering the data, this message is shown in an empty row in the table to
			 * indicate to the end user the the data is being loaded. Note that this
			 * parameter is not used when loading data by server-side processing, just
			 * Ajax sourced data with client-side processing.
			 *  @type string
			 *  @default Loading...
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.loadingRecords
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "loadingRecords": "Please wait - loading..."
			 *        }
			 *      } );
			 *    } );
			 */
			"sLoadingRecords": "Loading...",
	
	
			/**
			 * Text which is displayed when the table is processing a user action
			 * (usually a sort command or similar).
			 *  @type string
			 *  @default Processing...
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.processing
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "processing": "DataTables is currently busy"
			 *        }
			 *      } );
			 *    } );
			 */
			"sProcessing": "Processing...",
	
	
			/**
			 * Details the actions that will be taken when the user types into the
			 * filtering input text box. The variable "_INPUT_", if used in the string,
			 * is replaced with the HTML text box for the filtering input allowing
			 * control over where it appears in the string. If "_INPUT_" is not given
			 * then the input box is appended to the string automatically.
			 *  @type string
			 *  @default Search:
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.search
			 *
			 *  @example
			 *    // Input text box will be appended at the end automatically
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "search": "Filter records:"
			 *        }
			 *      } );
			 *    } );
			 *
			 *  @example
			 *    // Specify where the filter should appear
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "search": "Apply filter _INPUT_ to table"
			 *        }
			 *      } );
			 *    } );
			 */
			"sSearch": "Search:",
	
	
			/**
			 * Assign a `placeholder` attribute to the search `input` element
			 *  @type string
			 *  @default 
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.searchPlaceholder
			 */
			"sSearchPlaceholder": "",
	
	
			/**
			 * All of the language information can be stored in a file on the
			 * server-side, which DataTables will look up if this parameter is passed.
			 * It must store the URL of the language file, which is in a JSON format,
			 * and the object has the same properties as the oLanguage object in the
			 * initialiser object (i.e. the above parameters). Please refer to one of
			 * the example language files to see how this works in action.
			 *  @type string
			 *  @default <i>Empty string - i.e. disabled</i>
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.url
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "url": "http://www.sprymedia.co.uk/dataTables/lang.txt"
			 *        }
			 *      } );
			 *    } );
			 */
			"sUrl": "",
	
	
			/**
			 * Text shown inside the table records when the is no information to be
			 * displayed after filtering. `emptyTable` is shown when there is simply no
			 * information in the table at all (regardless of filtering).
			 *  @type string
			 *  @default No matching records found
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.zeroRecords
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "zeroRecords": "No records to display"
			 *        }
			 *      } );
			 *    } );
			 */
			"sZeroRecords": "No matching records found"
		},
	
	
		/**
		 * This parameter allows you to have define the global filtering state at
		 * initialisation time. As an object the `search` parameter must be
		 * defined, but all other parameters are optional. When `regex` is true,
		 * the search string will be treated as a regular expression, when false
		 * (default) it will be treated as a straight string. When `smart`
		 * DataTables will use it's smart filtering methods (to word match at
		 * any point in the data), when false this will not be done.
		 *  @namespace
		 *  @extends DataTable.models.oSearch
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.search
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "search": {"search": "Initial search"}
		 *      } );
		 *    } )
		 */
		"oSearch": $.extend( {}, DataTable.models.oSearch ),
	
	
		/**
		 * __Deprecated__ The functionality provided by this parameter has now been
		 * superseded by that provided through `ajax`, which should be used instead.
		 *
		 * By default DataTables will look for the property `data` (or `aaData` for
		 * compatibility with DataTables 1.9-) when obtaining data from an Ajax
		 * source or for server-side processing - this parameter allows that
		 * property to be changed. You can use Javascript dotted object notation to
		 * get a data source for multiple levels of nesting.
		 *  @type string
		 *  @default data
		 *
		 *  @dtopt Options
		 *  @dtopt Server-side
		 *  @name DataTable.defaults.ajaxDataProp
		 *
		 *  @deprecated 1.10. Please use `ajax` for this functionality now.
		 */
		"sAjaxDataProp": "data",
	
	
		/**
		 * __Deprecated__ The functionality provided by this parameter has now been
		 * superseded by that provided through `ajax`, which should be used instead.
		 *
		 * You can instruct DataTables to load data from an external
		 * source using this parameter (use aData if you want to pass data in you
		 * already have). Simply provide a url a JSON object can be obtained from.
		 *  @type string
		 *  @default null
		 *
		 *  @dtopt Options
		 *  @dtopt Server-side
		 *  @name DataTable.defaults.ajaxSource
		 *
		 *  @deprecated 1.10. Please use `ajax` for this functionality now.
		 */
		"sAjaxSource": null,
	
	
		/**
		 * This initialisation variable allows you to specify exactly where in the
		 * DOM you want DataTables to inject the various controls it adds to the page
		 * (for example you might want the pagination controls at the top of the
		 * table). DIV elements (with or without a custom class) can also be added to
		 * aid styling. The follow syntax is used:
		 *   <ul>
		 *     <li>The following options are allowed:
		 *       <ul>
		 *         <li>'l' - Length changing</li>
		 *         <li>'f' - Filtering input</li>
		 *         <li>'t' - The table!</li>
		 *         <li>'i' - Information</li>
		 *         <li>'p' - Pagination</li>
		 *         <li>'r' - pRocessing</li>
		 *       </ul>
		 *     </li>
		 *     <li>The following constants are allowed:
		 *       <ul>
		 *         <li>'H' - jQueryUI theme "header" classes ('fg-toolbar ui-widget-header ui-corner-tl ui-corner-tr ui-helper-clearfix')</li>
		 *         <li>'F' - jQueryUI theme "footer" classes ('fg-toolbar ui-widget-header ui-corner-bl ui-corner-br ui-helper-clearfix')</li>
		 *       </ul>
		 *     </li>
		 *     <li>The following syntax is expected:
		 *       <ul>
		 *         <li>'&lt;' and '&gt;' - div elements</li>
		 *         <li>'&lt;"class" and '&gt;' - div with a class</li>
		 *         <li>'&lt;"#id" and '&gt;' - div with an ID</li>
		 *       </ul>
		 *     </li>
		 *     <li>Examples:
		 *       <ul>
		 *         <li>'&lt;"wrapper"flipt&gt;'</li>
		 *         <li>'&lt;lf&lt;t&gt;ip&gt;'</li>
		 *       </ul>
		 *     </li>
		 *   </ul>
		 *  @type string
		 *  @default lfrtip <i>(when `jQueryUI` is false)</i> <b>or</b>
		 *    <"H"lfr>t<"F"ip> <i>(when `jQueryUI` is true)</i>
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.dom
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "dom": '&lt;"top"i&gt;rt&lt;"bottom"flp&gt;&lt;"clear"&gt;'
		 *      } );
		 *    } );
		 */
		"sDom": "lfrtip",
	
	
		/**
		 * Search delay option. This will throttle full table searches that use the
		 * DataTables provided search input element (it does not effect calls to
		 * `dt-api search()`, providing a delay before the search is made.
		 *  @type integer
		 *  @default 0
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.searchDelay
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "searchDelay": 200
		 *      } );
		 *    } )
		 */
		"searchDelay": null,
	
	
		/**
		 * DataTables features six different built-in options for the buttons to
		 * display for pagination control:
		 *
		 * * `numbers` - Page number buttons only
		 * * `simple` - 'Previous' and 'Next' buttons only
		 * * 'simple_numbers` - 'Previous' and 'Next' buttons, plus page numbers
		 * * `full` - 'First', 'Previous', 'Next' and 'Last' buttons
		 * * `full_numbers` - 'First', 'Previous', 'Next' and 'Last' buttons, plus page numbers
		 * * `first_last_numbers` - 'First' and 'Last' buttons, plus page numbers
		 *  
		 * Further methods can be added using {@link DataTable.ext.oPagination}.
		 *  @type string
		 *  @default simple_numbers
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.pagingType
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "pagingType": "full_numbers"
		 *      } );
		 *    } )
		 */
		"sPaginationType": "simple_numbers",
	
	
		/**
		 * Enable horizontal scrolling. When a table is too wide to fit into a
		 * certain layout, or you have a large number of columns in the table, you
		 * can enable x-scrolling to show the table in a viewport, which can be
		 * scrolled. This property can be `true` which will allow the table to
		 * scroll horizontally when needed, or any CSS unit, or a number (in which
		 * case it will be treated as a pixel measurement). Setting as simply `true`
		 * is recommended.
		 *  @type boolean|string
		 *  @default <i>blank string - i.e. disabled</i>
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.scrollX
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "scrollX": true,
		 *        "scrollCollapse": true
		 *      } );
		 *    } );
		 */
		"sScrollX": "",
	
	
		/**
		 * This property can be used to force a DataTable to use more width than it
		 * might otherwise do when x-scrolling is enabled. For example if you have a
		 * table which requires to be well spaced, this parameter is useful for
		 * "over-sizing" the table, and thus forcing scrolling. This property can by
		 * any CSS unit, or a number (in which case it will be treated as a pixel
		 * measurement).
		 *  @type string
		 *  @default <i>blank string - i.e. disabled</i>
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.scrollXInner
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "scrollX": "100%",
		 *        "scrollXInner": "110%"
		 *      } );
		 *    } );
		 */
		"sScrollXInner": "",
	
	
		/**
		 * Enable vertical scrolling. Vertical scrolling will constrain the DataTable
		 * to the given height, and enable scrolling for any data which overflows the
		 * current viewport. This can be used as an alternative to paging to display
		 * a lot of data in a small area (although paging and scrolling can both be
		 * enabled at the same time). This property can be any CSS unit, or a number
		 * (in which case it will be treated as a pixel measurement).
		 *  @type string
		 *  @default <i>blank string - i.e. disabled</i>
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.scrollY
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "scrollY": "200px",
		 *        "paginate": false
		 *      } );
		 *    } );
		 */
		"sScrollY": "",
	
	
		/**
		 * __Deprecated__ The functionality provided by this parameter has now been
		 * superseded by that provided through `ajax`, which should be used instead.
		 *
		 * Set the HTTP method that is used to make the Ajax call for server-side
		 * processing or Ajax sourced data.
		 *  @type string
		 *  @default GET
		 *
		 *  @dtopt Options
		 *  @dtopt Server-side
		 *  @name DataTable.defaults.serverMethod
		 *
		 *  @deprecated 1.10. Please use `ajax` for this functionality now.
		 */
		"sServerMethod": "GET",
	
	
		/**
		 * DataTables makes use of renderers when displaying HTML elements for
		 * a table. These renderers can be added or modified by plug-ins to
		 * generate suitable mark-up for a site. For example the Bootstrap
		 * integration plug-in for DataTables uses a paging button renderer to
		 * display pagination buttons in the mark-up required by Bootstrap.
		 *
		 * For further information about the renderers available see
		 * DataTable.ext.renderer
		 *  @type string|object
		 *  @default null
		 *
		 *  @name DataTable.defaults.renderer
		 *
		 */
		"renderer": null,
	
	
		/**
		 * Set the data property name that DataTables should use to get a row's id
		 * to set as the `id` property in the node.
		 *  @type string
		 *  @default DT_RowId
		 *
		 *  @name DataTable.defaults.rowId
		 */
		"rowId": "DT_RowId"
	};
	
	_fnHungarianMap( DataTable.defaults );
	
	
	
	/*
	 * Developer note - See note in model.defaults.js about the use of Hungarian
	 * notation and camel case.
	 */
	
	/**
	 * Column options that can be given to DataTables at initialisation time.
	 *  @namespace
	 */
	DataTable.defaults.column = {
		/**
		 * Define which column(s) an order will occur on for this column. This
		 * allows a column's ordering to take multiple columns into account when
		 * doing a sort or use the data from a different column. For example first
		 * name / last name columns make sense to do a multi-column sort over the
		 * two columns.
		 *  @type array|int
		 *  @default null <i>Takes the value of the column index automatically</i>
		 *
		 *  @name DataTable.defaults.column.orderData
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "orderData": [ 0, 1 ], "targets": [ 0 ] },
		 *          { "orderData": [ 1, 0 ], "targets": [ 1 ] },
		 *          { "orderData": 2, "targets": [ 2 ] }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "orderData": [ 0, 1 ] },
		 *          { "orderData": [ 1, 0 ] },
		 *          { "orderData": 2 },
		 *          null,
		 *          null
		 *        ]
		 *      } );
		 *    } );
		 */
		"aDataSort": null,
		"iDataSort": -1,
	
	
		/**
		 * You can control the default ordering direction, and even alter the
		 * behaviour of the sort handler (i.e. only allow ascending ordering etc)
		 * using this parameter.
		 *  @type array
		 *  @default [ 'asc', 'desc' ]
		 *
		 *  @name DataTable.defaults.column.orderSequence
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "orderSequence": [ "asc" ], "targets": [ 1 ] },
		 *          { "orderSequence": [ "desc", "asc", "asc" ], "targets": [ 2 ] },
		 *          { "orderSequence": [ "desc" ], "targets": [ 3 ] }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          null,
		 *          { "orderSequence": [ "asc" ] },
		 *          { "orderSequence": [ "desc", "asc", "asc" ] },
		 *          { "orderSequence": [ "desc" ] },
		 *          null
		 *        ]
		 *      } );
		 *    } );
		 */
		"asSorting": [ 'asc', 'desc' ],
	
	
		/**
		 * Enable or disable filtering on the data in this column.
		 *  @type boolean
		 *  @default true
		 *
		 *  @name DataTable.defaults.column.searchable
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "searchable": false, "targets": [ 0 ] }
		 *        ] } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "searchable": false },
		 *          null,
		 *          null,
		 *          null,
		 *          null
		 *        ] } );
		 *    } );
		 */
		"bSearchable": true,
	
	
		/**
		 * Enable or disable ordering on this column.
		 *  @type boolean
		 *  @default true
		 *
		 *  @name DataTable.defaults.column.orderable
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "orderable": false, "targets": [ 0 ] }
		 *        ] } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "orderable": false },
		 *          null,
		 *          null,
		 *          null,
		 *          null
		 *        ] } );
		 *    } );
		 */
		"bSortable": true,
	
	
		/**
		 * Enable or disable the display of this column.
		 *  @type boolean
		 *  @default true
		 *
		 *  @name DataTable.defaults.column.visible
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "visible": false, "targets": [ 0 ] }
		 *        ] } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "visible": false },
		 *          null,
		 *          null,
		 *          null,
		 *          null
		 *        ] } );
		 *    } );
		 */
		"bVisible": true,
	
	
		/**
		 * Developer definable function that is called whenever a cell is created (Ajax source,
		 * etc) or processed for input (DOM source). This can be used as a compliment to mRender
		 * allowing you to modify the DOM element (add background colour for example) when the
		 * element is available.
		 *  @type function
		 *  @param {element} td The TD node that has been created
		 *  @param {*} cellData The Data for the cell
		 *  @param {array|object} rowData The data for the whole row
		 *  @param {int} row The row index for the aoData data store
		 *  @param {int} col The column index for aoColumns
		 *
		 *  @name DataTable.defaults.column.createdCell
		 *  @dtopt Columns
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [ {
		 *          "targets": [3],
		 *          "createdCell": function (td, cellData, rowData, row, col) {
		 *            if ( cellData == "1.7" ) {
		 *              $(td).css('color', 'blue')
		 *            }
		 *          }
		 *        } ]
		 *      });
		 *    } );
		 */
		"fnCreatedCell": null,
	
	
		/**
		 * This parameter has been replaced by `data` in DataTables to ensure naming
		 * consistency. `dataProp` can still be used, as there is backwards
		 * compatibility in DataTables for this option, but it is strongly
		 * recommended that you use `data` in preference to `dataProp`.
		 *  @name DataTable.defaults.column.dataProp
		 */
	
	
		/**
		 * This property can be used to read data from any data source property,
		 * including deeply nested objects / properties. `data` can be given in a
		 * number of different ways which effect its behaviour:
		 *
		 * * `integer` - treated as an array index for the data source. This is the
		 *   default that DataTables uses (incrementally increased for each column).
		 * * `string` - read an object property from the data source. There are
		 *   three 'special' options that can be used in the string to alter how
		 *   DataTables reads the data from the source object:
		 *    * `.` - Dotted Javascript notation. Just as you use a `.` in
		 *      Javascript to read from nested objects, so to can the options
		 *      specified in `data`. For example: `browser.version` or
		 *      `browser.name`. If your object parameter name contains a period, use
		 *      `\\` to escape it - i.e. `first\\.name`.
		 *    * `[]` - Array notation. DataTables can automatically combine data
		 *      from and array source, joining the data with the characters provided
		 *      between the two brackets. For example: `name[, ]` would provide a
		 *      comma-space separated list from the source array. If no characters
		 *      are provided between the brackets, the original array source is
		 *      returned.
		 *    * `()` - Function notation. Adding `()` to the end of a parameter will
		 *      execute a function of the name given. For example: `browser()` for a
		 *      simple function on the data source, `browser.version()` for a
		 *      function in a nested property or even `browser().version` to get an
		 *      object property if the function called returns an object. Note that
		 *      function notation is recommended for use in `render` rather than
		 *      `data` as it is much simpler to use as a renderer.
		 * * `null` - use the original data source for the row rather than plucking
		 *   data directly from it. This action has effects on two other
		 *   initialisation options:
		 *    * `defaultContent` - When null is given as the `data` option and
		 *      `defaultContent` is specified for the column, the value defined by
		 *      `defaultContent` will be used for the cell.
		 *    * `render` - When null is used for the `data` option and the `render`
		 *      option is specified for the column, the whole data source for the
		 *      row is used for the renderer.
		 * * `function` - the function given will be executed whenever DataTables
		 *   needs to set or get the data for a cell in the column. The function
		 *   takes three parameters:
		 *    * Parameters:
		 *      * `{array|object}` The data source for the row
		 *      * `{string}` The type call data requested - this will be 'set' when
		 *        setting data or 'filter', 'display', 'type', 'sort' or undefined
		 *        when gathering data. Note that when `undefined` is given for the
		 *        type DataTables expects to get the raw data for the object back<
		 *      * `{*}` Data to set when the second parameter is 'set'.
		 *    * Return:
		 *      * The return value from the function is not required when 'set' is
		 *        the type of call, but otherwise the return is what will be used
		 *        for the data requested.
		 *
		 * Note that `data` is a getter and setter option. If you just require
		 * formatting of data for output, you will likely want to use `render` which
		 * is simply a getter and thus simpler to use.
		 *
		 * Note that prior to DataTables 1.9.2 `data` was called `mDataProp`. The
		 * name change reflects the flexibility of this property and is consistent
		 * with the naming of mRender. If 'mDataProp' is given, then it will still
		 * be used by DataTables, as it automatically maps the old name to the new
		 * if required.
		 *
		 *  @type string|int|function|null
		 *  @default null <i>Use automatically calculated column index</i>
		 *
		 *  @name DataTable.defaults.column.data
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Read table data from objects
		 *    // JSON structure for each row:
		 *    //   {
		 *    //      "engine": {value},
		 *    //      "browser": {value},
		 *    //      "platform": {value},
		 *    //      "version": {value},
		 *    //      "grade": {value}
		 *    //   }
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "ajaxSource": "sources/objects.txt",
		 *        "columns": [
		 *          { "data": "engine" },
		 *          { "data": "browser" },
		 *          { "data": "platform" },
		 *          { "data": "version" },
		 *          { "data": "grade" }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Read information from deeply nested objects
		 *    // JSON structure for each row:
		 *    //   {
		 *    //      "engine": {value},
		 *    //      "browser": {value},
		 *    //      "platform": {
		 *    //         "inner": {value}
		 *    //      },
		 *    //      "details": [
		 *    //         {value}, {value}
		 *    //      ]
		 *    //   }
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "ajaxSource": "sources/deep.txt",
		 *        "columns": [
		 *          { "data": "engine" },
		 *          { "data": "browser" },
		 *          { "data": "platform.inner" },
		 *          { "data": "details.0" },
		 *          { "data": "details.1" }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `data` as a function to provide different information for
		 *    // sorting, filtering and display. In this case, currency (price)
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [ {
		 *          "targets": [ 0 ],
		 *          "data": function ( source, type, val ) {
		 *            if (type === 'set') {
		 *              source.price = val;
		 *              // Store the computed dislay and filter values for efficiency
		 *              source.price_display = val=="" ? "" : "$"+numberFormat(val);
		 *              source.price_filter  = val=="" ? "" : "$"+numberFormat(val)+" "+val;
		 *              return;
		 *            }
		 *            else if (type === 'display') {
		 *              return source.price_display;
		 *            }
		 *            else if (type === 'filter') {
		 *              return source.price_filter;
		 *            }
		 *            // 'sort', 'type' and undefined all just use the integer
		 *            return source.price;
		 *          }
		 *        } ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using default content
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [ {
		 *          "targets": [ 0 ],
		 *          "data": null,
		 *          "defaultContent": "Click to edit"
		 *        } ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using array notation - outputting a list from an array
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [ {
		 *          "targets": [ 0 ],
		 *          "data": "name[, ]"
		 *        } ]
		 *      } );
		 *    } );
		 *
		 */
		"mData": null,
	
	
		/**
		 * This property is the rendering partner to `data` and it is suggested that
		 * when you want to manipulate data for display (including filtering,
		 * sorting etc) without altering the underlying data for the table, use this
		 * property. `render` can be considered to be the the read only companion to
		 * `data` which is read / write (then as such more complex). Like `data`
		 * this option can be given in a number of different ways to effect its
		 * behaviour:
		 *
		 * * `integer` - treated as an array index for the data source. This is the
		 *   default that DataTables uses (incrementally increased for each column).
		 * * `string` - read an object property from the data source. There are
		 *   three 'special' options that can be used in the string to alter how
		 *   DataTables reads the data from the source object:
		 *    * `.` - Dotted Javascript notation. Just as you use a `.` in
		 *      Javascript to read from nested objects, so to can the options
		 *      specified in `data`. For example: `browser.version` or
		 *      `browser.name`. If your object parameter name contains a period, use
		 *      `\\` to escape it - i.e. `first\\.name`.
		 *    * `[]` - Array notation. DataTables can automatically combine data
		 *      from and array source, joining the data with the characters provided
		 *      between the two brackets. For example: `name[, ]` would provide a
		 *      comma-space separated list from the source array. If no characters
		 *      are provided between the brackets, the original array source is
		 *      returned.
		 *    * `()` - Function notation. Adding `()` to the end of a parameter will
		 *      execute a function of the name given. For example: `browser()` for a
		 *      simple function on the data source, `browser.version()` for a
		 *      function in a nested property or even `browser().version` to get an
		 *      object property if the function called returns an object.
		 * * `object` - use different data for the different data types requested by
		 *   DataTables ('filter', 'display', 'type' or 'sort'). The property names
		 *   of the object is the data type the property refers to and the value can
		 *   defined using an integer, string or function using the same rules as
		 *   `render` normally does. Note that an `_` option _must_ be specified.
		 *   This is the default value to use if you haven't specified a value for
		 *   the data type requested by DataTables.
		 * * `function` - the function given will be executed whenever DataTables
		 *   needs to set or get the data for a cell in the column. The function
		 *   takes three parameters:
		 *    * Parameters:
		 *      * {array|object} The data source for the row (based on `data`)
		 *      * {string} The type call data requested - this will be 'filter',
		 *        'display', 'type' or 'sort'.
		 *      * {array|object} The full data source for the row (not based on
		 *        `data`)
		 *    * Return:
		 *      * The return value from the function is what will be used for the
		 *        data requested.
		 *
		 *  @type string|int|function|object|null
		 *  @default null Use the data source value.
		 *
		 *  @name DataTable.defaults.column.render
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Create a comma separated list from an array of objects
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "ajaxSource": "sources/deep.txt",
		 *        "columns": [
		 *          { "data": "engine" },
		 *          { "data": "browser" },
		 *          {
		 *            "data": "platform",
		 *            "render": "[, ].name"
		 *          }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Execute a function to obtain data
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [ {
		 *          "targets": [ 0 ],
		 *          "data": null, // Use the full data source object for the renderer's source
		 *          "render": "browserName()"
		 *        } ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // As an object, extracting different data for the different types
		 *    // This would be used with a data source such as:
		 *    //   { "phone": 5552368, "phone_filter": "5552368 555-2368", "phone_display": "555-2368" }
		 *    // Here the `phone` integer is used for sorting and type detection, while `phone_filter`
		 *    // (which has both forms) is used for filtering for if a user inputs either format, while
		 *    // the formatted phone number is the one that is shown in the table.
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [ {
		 *          "targets": [ 0 ],
		 *          "data": null, // Use the full data source object for the renderer's source
		 *          "render": {
		 *            "_": "phone",
		 *            "filter": "phone_filter",
		 *            "display": "phone_display"
		 *          }
		 *        } ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Use as a function to create a link from the data source
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [ {
		 *          "targets": [ 0 ],
		 *          "data": "download_link",
		 *          "render": function ( data, type, full ) {
		 *            return '<a href="'+data+'">Download</a>';
		 *          }
		 *        } ]
		 *      } );
		 *    } );
		 */
		"mRender": null,
	
	
		/**
		 * Change the cell type created for the column - either TD cells or TH cells. This
		 * can be useful as TH cells have semantic meaning in the table body, allowing them
		 * to act as a header for a row (you may wish to add scope='row' to the TH elements).
		 *  @type string
		 *  @default td
		 *
		 *  @name DataTable.defaults.column.cellType
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Make the first column use TH cells
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [ {
		 *          "targets": [ 0 ],
		 *          "cellType": "th"
		 *        } ]
		 *      } );
		 *    } );
		 */
		"sCellType": "td",
	
	
		/**
		 * Class to give to each cell in this column.
		 *  @type string
		 *  @default <i>Empty string</i>
		 *
		 *  @name DataTable.defaults.column.class
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "class": "my_class", "targets": [ 0 ] }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "class": "my_class" },
		 *          null,
		 *          null,
		 *          null,
		 *          null
		 *        ]
		 *      } );
		 *    } );
		 */
		"sClass": "",
	
		/**
		 * When DataTables calculates the column widths to assign to each column,
		 * it finds the longest string in each column and then constructs a
		 * temporary table and reads the widths from that. The problem with this
		 * is that "mmm" is much wider then "iiii", but the latter is a longer
		 * string - thus the calculation can go wrong (doing it properly and putting
		 * it into an DOM object and measuring that is horribly(!) slow). Thus as
		 * a "work around" we provide this option. It will append its value to the
		 * text that is found to be the longest string for the column - i.e. padding.
		 * Generally you shouldn't need this!
		 *  @type string
		 *  @default <i>Empty string<i>
		 *
		 *  @name DataTable.defaults.column.contentPadding
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          null,
		 *          null,
		 *          null,
		 *          {
		 *            "contentPadding": "mmm"
		 *          }
		 *        ]
		 *      } );
		 *    } );
		 */
		"sContentPadding": "",
	
	
		/**
		 * Allows a default value to be given for a column's data, and will be used
		 * whenever a null data source is encountered (this can be because `data`
		 * is set to null, or because the data source itself is null).
		 *  @type string
		 *  @default null
		 *
		 *  @name DataTable.defaults.column.defaultContent
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          {
		 *            "data": null,
		 *            "defaultContent": "Edit",
		 *            "targets": [ -1 ]
		 *          }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          null,
		 *          null,
		 *          null,
		 *          {
		 *            "data": null,
		 *            "defaultContent": "Edit"
		 *          }
		 *        ]
		 *      } );
		 *    } );
		 */
		"sDefaultContent": null,
	
	
		/**
		 * This parameter is only used in DataTables' server-side processing. It can
		 * be exceptionally useful to know what columns are being displayed on the
		 * client side, and to map these to database fields. When defined, the names
		 * also allow DataTables to reorder information from the server if it comes
		 * back in an unexpected order (i.e. if you switch your columns around on the
		 * client-side, your server-side code does not also need updating).
		 *  @type string
		 *  @default <i>Empty string</i>
		 *
		 *  @name DataTable.defaults.column.name
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "name": "engine", "targets": [ 0 ] },
		 *          { "name": "browser", "targets": [ 1 ] },
		 *          { "name": "platform", "targets": [ 2 ] },
		 *          { "name": "version", "targets": [ 3 ] },
		 *          { "name": "grade", "targets": [ 4 ] }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "name": "engine" },
		 *          { "name": "browser" },
		 *          { "name": "platform" },
		 *          { "name": "version" },
		 *          { "name": "grade" }
		 *        ]
		 *      } );
		 *    } );
		 */
		"sName": "",
	
	
		/**
		 * Defines a data source type for the ordering which can be used to read
		 * real-time information from the table (updating the internally cached
		 * version) prior to ordering. This allows ordering to occur on user
		 * editable elements such as form inputs.
		 *  @type string
		 *  @default std
		 *
		 *  @name DataTable.defaults.column.orderDataType
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "orderDataType": "dom-text", "targets": [ 2, 3 ] },
		 *          { "type": "numeric", "targets": [ 3 ] },
		 *          { "orderDataType": "dom-select", "targets": [ 4 ] },
		 *          { "orderDataType": "dom-checkbox", "targets": [ 5 ] }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          null,
		 *          null,
		 *          { "orderDataType": "dom-text" },
		 *          { "orderDataType": "dom-text", "type": "numeric" },
		 *          { "orderDataType": "dom-select" },
		 *          { "orderDataType": "dom-checkbox" }
		 *        ]
		 *      } );
		 *    } );
		 */
		"sSortDataType": "std",
	
	
		/**
		 * The title of this column.
		 *  @type string
		 *  @default null <i>Derived from the 'TH' value for this column in the
		 *    original HTML table.</i>
		 *
		 *  @name DataTable.defaults.column.title
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "title": "My column title", "targets": [ 0 ] }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "title": "My column title" },
		 *          null,
		 *          null,
		 *          null,
		 *          null
		 *        ]
		 *      } );
		 *    } );
		 */
		"sTitle": null,
	
	
		/**
		 * The type allows you to specify how the data for this column will be
		 * ordered. Four types (string, numeric, date and html (which will strip
		 * HTML tags before ordering)) are currently available. Note that only date
		 * formats understood by Javascript's Date() object will be accepted as type
		 * date. For example: "Mar 26, 2008 5:03 PM". May take the values: 'string',
		 * 'numeric', 'date' or 'html' (by default). Further types can be adding
		 * through plug-ins.
		 *  @type string
		 *  @default null <i>Auto-detected from raw data</i>
		 *
		 *  @name DataTable.defaults.column.type
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "type": "html", "targets": [ 0 ] }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "type": "html" },
		 *          null,
		 *          null,
		 *          null,
		 *          null
		 *        ]
		 *      } );
		 *    } );
		 */
		"sType": null,
	
	
		/**
		 * Defining the width of the column, this parameter may take any CSS value
		 * (3em, 20px etc). DataTables applies 'smart' widths to columns which have not
		 * been given a specific width through this interface ensuring that the table
		 * remains readable.
		 *  @type string
		 *  @default null <i>Automatic</i>
		 *
		 *  @name DataTable.defaults.column.width
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "width": "20%", "targets": [ 0 ] }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "width": "20%" },
		 *          null,
		 *          null,
		 *          null,
		 *          null
		 *        ]
		 *      } );
		 *    } );
		 */
		"sWidth": null
	};
	
	_fnHungarianMap( DataTable.defaults.column );
	
	
	
	/**
	 * DataTables settings object - this holds all the information needed for a
	 * given table, including configuration, data and current application of the
	 * table options. DataTables does not have a single instance for each DataTable
	 * with the settings attached to that instance, but rather instances of the
	 * DataTable "class" are created on-the-fly as needed (typically by a
	 * $().dataTable() call) and the settings object is then applied to that
	 * instance.
	 *
	 * Note that this object is related to {@link DataTable.defaults} but this
	 * one is the internal data store for DataTables's cache of columns. It should
	 * NOT be manipulated outside of DataTables. Any configuration should be done
	 * through the initialisation options.
	 *  @namespace
	 *  @todo Really should attach the settings object to individual instances so we
	 *    don't need to create new instances on each $().dataTable() call (if the
	 *    table already exists). It would also save passing oSettings around and
	 *    into every single function. However, this is a very significant
	 *    architecture change for DataTables and will almost certainly break
	 *    backwards compatibility with older installations. This is something that
	 *    will be done in 2.0.
	 */
	DataTable.models.oSettings = {
		/**
		 * Primary features of DataTables and their enablement state.
		 *  @namespace
		 */
		"oFeatures": {
	
			/**
			 * Flag to say if DataTables should automatically try to calculate the
			 * optimum table and columns widths (true) or not (false).
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bAutoWidth": null,
	
			/**
			 * Delay the creation of TR and TD elements until they are actually
			 * needed by a driven page draw. This can give a significant speed
			 * increase for Ajax source and Javascript source data, but makes no
			 * difference at all fro DOM and server-side processing tables.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bDeferRender": null,
	
			/**
			 * Enable filtering on the table or not. Note that if this is disabled
			 * then there is no filtering at all on the table, including fnFilter.
			 * To just remove the filtering input use sDom and remove the 'f' option.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bFilter": null,
	
			/**
			 * Table information element (the 'Showing x of y records' div) enable
			 * flag.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bInfo": null,
	
			/**
			 * Present a user control allowing the end user to change the page size
			 * when pagination is enabled.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bLengthChange": null,
	
			/**
			 * Pagination enabled or not. Note that if this is disabled then length
			 * changing must also be disabled.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bPaginate": null,
	
			/**
			 * Processing indicator enable flag whenever DataTables is enacting a
			 * user request - typically an Ajax request for server-side processing.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bProcessing": null,
	
			/**
			 * Server-side processing enabled flag - when enabled DataTables will
			 * get all data from the server for every draw - there is no filtering,
			 * sorting or paging done on the client-side.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bServerSide": null,
	
			/**
			 * Sorting enablement flag.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bSort": null,
	
			/**
			 * Multi-column sorting
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bSortMulti": null,
	
			/**
			 * Apply a class to the columns which are being sorted to provide a
			 * visual highlight or not. This can slow things down when enabled since
			 * there is a lot of DOM interaction.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bSortClasses": null,
	
			/**
			 * State saving enablement flag.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bStateSave": null
		},
	
	
		/**
		 * Scrolling settings for a table.
		 *  @namespace
		 */
		"oScroll": {
			/**
			 * When the table is shorter in height than sScrollY, collapse the
			 * table container down to the height of the table (when true).
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bCollapse": null,
	
			/**
			 * Width of the scrollbar for the web-browser's platform. Calculated
			 * during table initialisation.
			 *  @type int
			 *  @default 0
			 */
			"iBarWidth": 0,
	
			/**
			 * Viewport width for horizontal scrolling. Horizontal scrolling is
			 * disabled if an empty string.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type string
			 */
			"sX": null,
	
			/**
			 * Width to expand the table to when using x-scrolling. Typically you
			 * should not need to use this.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type string
			 *  @deprecated
			 */
			"sXInner": null,
	
			/**
			 * Viewport height for vertical scrolling. Vertical scrolling is disabled
			 * if an empty string.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type string
			 */
			"sY": null
		},
	
		/**
		 * Language information for the table.
		 *  @namespace
		 *  @extends DataTable.defaults.oLanguage
		 */
		"oLanguage": {
			/**
			 * Information callback function. See
			 * {@link DataTable.defaults.fnInfoCallback}
			 *  @type function
			 *  @default null
			 */
			"fnInfoCallback": null
		},
	
		/**
		 * Browser support parameters
		 *  @namespace
		 */
		"oBrowser": {
			/**
			 * Indicate if the browser incorrectly calculates width:100% inside a
			 * scrolling element (IE6/7)
			 *  @type boolean
			 *  @default false
			 */
			"bScrollOversize": false,
	
			/**
			 * Determine if the vertical scrollbar is on the right or left of the
			 * scrolling container - needed for rtl language layout, although not
			 * all browsers move the scrollbar (Safari).
			 *  @type boolean
			 *  @default false
			 */
			"bScrollbarLeft": false,
	
			/**
			 * Flag for if `getBoundingClientRect` is fully supported or not
			 *  @type boolean
			 *  @default false
			 */
			"bBounding": false,
	
			/**
			 * Browser scrollbar width
			 *  @type integer
			 *  @default 0
			 */
			"barWidth": 0
		},
	
	
		"ajax": null,
	
	
		/**
		 * Array referencing the nodes which are used for the features. The
		 * parameters of this object match what is allowed by sDom - i.e.
		 *   <ul>
		 *     <li>'l' - Length changing</li>
		 *     <li>'f' - Filtering input</li>
		 *     <li>'t' - The table!</li>
		 *     <li>'i' - Information</li>
		 *     <li>'p' - Pagination</li>
		 *     <li>'r' - pRocessing</li>
		 *   </ul>
		 *  @type array
		 *  @default []
		 */
		"aanFeatures": [],
	
		/**
		 * Store data information - see {@link DataTable.models.oRow} for detailed
		 * information.
		 *  @type array
		 *  @default []
		 */
		"aoData": [],
	
		/**
		 * Array of indexes which are in the current display (after filtering etc)
		 *  @type array
		 *  @default []
		 */
		"aiDisplay": [],
	
		/**
		 * Array of indexes for display - no filtering
		 *  @type array
		 *  @default []
		 */
		"aiDisplayMaster": [],
	
		/**
		 * Map of row ids to data indexes
		 *  @type object
		 *  @default {}
		 */
		"aIds": {},
	
		/**
		 * Store information about each column that is in use
		 *  @type array
		 *  @default []
		 */
		"aoColumns": [],
	
		/**
		 * Store information about the table's header
		 *  @type array
		 *  @default []
		 */
		"aoHeader": [],
	
		/**
		 * Store information about the table's footer
		 *  @type array
		 *  @default []
		 */
		"aoFooter": [],
	
		/**
		 * Store the applied global search information in case we want to force a
		 * research or compare the old search to a new one.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @namespace
		 *  @extends DataTable.models.oSearch
		 */
		"oPreviousSearch": {},
	
		/**
		 * Store the applied search for each column - see
		 * {@link DataTable.models.oSearch} for the format that is used for the
		 * filtering information for each column.
		 *  @type array
		 *  @default []
		 */
		"aoPreSearchCols": [],
	
		/**
		 * Sorting that is applied to the table. Note that the inner arrays are
		 * used in the following manner:
		 * <ul>
		 *   <li>Index 0 - column number</li>
		 *   <li>Index 1 - current sorting direction</li>
		 * </ul>
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type array
		 *  @todo These inner arrays should really be objects
		 */
		"aaSorting": null,
	
		/**
		 * Sorting that is always applied to the table (i.e. prefixed in front of
		 * aaSorting).
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type array
		 *  @default []
		 */
		"aaSortingFixed": [],
	
		/**
		 * Classes to use for the striping of a table.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type array
		 *  @default []
		 */
		"asStripeClasses": null,
	
		/**
		 * If restoring a table - we should restore its striping classes as well
		 *  @type array
		 *  @default []
		 */
		"asDestroyStripes": [],
	
		/**
		 * If restoring a table - we should restore its width
		 *  @type int
		 *  @default 0
		 */
		"sDestroyWidth": 0,
	
		/**
		 * Callback functions array for every time a row is inserted (i.e. on a draw).
		 *  @type array
		 *  @default []
		 */
		"aoRowCallback": [],
	
		/**
		 * Callback functions for the header on each draw.
		 *  @type array
		 *  @default []
		 */
		"aoHeaderCallback": [],
	
		/**
		 * Callback function for the footer on each draw.
		 *  @type array
		 *  @default []
		 */
		"aoFooterCallback": [],
	
		/**
		 * Array of callback functions for draw callback functions
		 *  @type array
		 *  @default []
		 */
		"aoDrawCallback": [],
	
		/**
		 * Array of callback functions for row created function
		 *  @type array
		 *  @default []
		 */
		"aoRowCreatedCallback": [],
	
		/**
		 * Callback functions for just before the table is redrawn. A return of
		 * false will be used to cancel the draw.
		 *  @type array
		 *  @default []
		 */
		"aoPreDrawCallback": [],
	
		/**
		 * Callback functions for when the table has been initialised.
		 *  @type array
		 *  @default []
		 */
		"aoInitComplete": [],
	
	
		/**
		 * Callbacks for modifying the settings to be stored for state saving, prior to
		 * saving state.
		 *  @type array
		 *  @default []
		 */
		"aoStateSaveParams": [],
	
		/**
		 * Callbacks for modifying the settings that have been stored for state saving
		 * prior to using the stored values to restore the state.
		 *  @type array
		 *  @default []
		 */
		"aoStateLoadParams": [],
	
		/**
		 * Callbacks for operating on the settings object once the saved state has been
		 * loaded
		 *  @type array
		 *  @default []
		 */
		"aoStateLoaded": [],
	
		/**
		 * Cache the table ID for quick access
		 *  @type string
		 *  @default <i>Empty string</i>
		 */
		"sTableId": "",
	
		/**
		 * The TABLE node for the main table
		 *  @type node
		 *  @default null
		 */
		"nTable": null,
	
		/**
		 * Permanent ref to the thead element
		 *  @type node
		 *  @default null
		 */
		"nTHead": null,
	
		/**
		 * Permanent ref to the tfoot element - if it exists
		 *  @type node
		 *  @default null
		 */
		"nTFoot": null,
	
		/**
		 * Permanent ref to the tbody element
		 *  @type node
		 *  @default null
		 */
		"nTBody": null,
	
		/**
		 * Cache the wrapper node (contains all DataTables controlled elements)
		 *  @type node
		 *  @default null
		 */
		"nTableWrapper": null,
	
		/**
		 * Indicate if when using server-side processing the loading of data
		 * should be deferred until the second draw.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type boolean
		 *  @default false
		 */
		"bDeferLoading": false,
	
		/**
		 * Indicate if all required information has been read in
		 *  @type boolean
		 *  @default false
		 */
		"bInitialised": false,
	
		/**
		 * Information about open rows. Each object in the array has the parameters
		 * 'nTr' and 'nParent'
		 *  @type array
		 *  @default []
		 */
		"aoOpenRows": [],
	
		/**
		 * Dictate the positioning of DataTables' control elements - see
		 * {@link DataTable.model.oInit.sDom}.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type string
		 *  @default null
		 */
		"sDom": null,
	
		/**
		 * Search delay (in mS)
		 *  @type integer
		 *  @default null
		 */
		"searchDelay": null,
	
		/**
		 * Which type of pagination should be used.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type string
		 *  @default two_button
		 */
		"sPaginationType": "two_button",
	
		/**
		 * The state duration (for `stateSave`) in seconds.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type int
		 *  @default 0
		 */
		"iStateDuration": 0,
	
		/**
		 * Array of callback functions for state saving. Each array element is an
		 * object with the following parameters:
		 *   <ul>
		 *     <li>function:fn - function to call. Takes two parameters, oSettings
		 *       and the JSON string to save that has been thus far created. Returns
		 *       a JSON string to be inserted into a json object
		 *       (i.e. '"param": [ 0, 1, 2]')</li>
		 *     <li>string:sName - name of callback</li>
		 *   </ul>
		 *  @type array
		 *  @default []
		 */
		"aoStateSave": [],
	
		/**
		 * Array of callback functions for state loading. Each array element is an
		 * object with the following parameters:
		 *   <ul>
		 *     <li>function:fn - function to call. Takes two parameters, oSettings
		 *       and the object stored. May return false to cancel state loading</li>
		 *     <li>string:sName - name of callback</li>
		 *   </ul>
		 *  @type array
		 *  @default []
		 */
		"aoStateLoad": [],
	
		/**
		 * State that was saved. Useful for back reference
		 *  @type object
		 *  @default null
		 */
		"oSavedState": null,
	
		/**
		 * State that was loaded. Useful for back reference
		 *  @type object
		 *  @default null
		 */
		"oLoadedState": null,
	
		/**
		 * Source url for AJAX data for the table.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type string
		 *  @default null
		 */
		"sAjaxSource": null,
	
		/**
		 * Property from a given object from which to read the table data from. This
		 * can be an empty string (when not server-side processing), in which case
		 * it is  assumed an an array is given directly.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type string
		 */
		"sAjaxDataProp": null,
	
		/**
		 * Note if draw should be blocked while getting data
		 *  @type boolean
		 *  @default true
		 */
		"bAjaxDataGet": true,
	
		/**
		 * The last jQuery XHR object that was used for server-side data gathering.
		 * This can be used for working with the XHR information in one of the
		 * callbacks
		 *  @type object
		 *  @default null
		 */
		"jqXHR": null,
	
		/**
		 * JSON returned from the server in the last Ajax request
		 *  @type object
		 *  @default undefined
		 */
		"json": undefined,
	
		/**
		 * Data submitted as part of the last Ajax request
		 *  @type object
		 *  @default undefined
		 */
		"oAjaxData": undefined,
	
		/**
		 * Function to get the server-side data.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type function
		 */
		"fnServerData": null,
	
		/**
		 * Functions which are called prior to sending an Ajax request so extra
		 * parameters can easily be sent to the server
		 *  @type array
		 *  @default []
		 */
		"aoServerParams": [],
	
		/**
		 * Send the XHR HTTP method - GET or POST (could be PUT or DELETE if
		 * required).
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type string
		 */
		"sServerMethod": null,
	
		/**
		 * Format numbers for display.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type function
		 */
		"fnFormatNumber": null,
	
		/**
		 * List of options that can be used for the user selectable length menu.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type array
		 *  @default []
		 */
		"aLengthMenu": null,
	
		/**
		 * Counter for the draws that the table does. Also used as a tracker for
		 * server-side processing
		 *  @type int
		 *  @default 0
		 */
		"iDraw": 0,
	
		/**
		 * Indicate if a redraw is being done - useful for Ajax
		 *  @type boolean
		 *  @default false
		 */
		"bDrawing": false,
	
		/**
		 * Draw index (iDraw) of the last error when parsing the returned data
		 *  @type int
		 *  @default -1
		 */
		"iDrawError": -1,
	
		/**
		 * Paging display length
		 *  @type int
		 *  @default 10
		 */
		"_iDisplayLength": 10,
	
		/**
		 * Paging start point - aiDisplay index
		 *  @type int
		 *  @default 0
		 */
		"_iDisplayStart": 0,
	
		/**
		 * Server-side processing - number of records in the result set
		 * (i.e. before filtering), Use fnRecordsTotal rather than
		 * this property to get the value of the number of records, regardless of
		 * the server-side processing setting.
		 *  @type int
		 *  @default 0
		 *  @private
		 */
		"_iRecordsTotal": 0,
	
		/**
		 * Server-side processing - number of records in the current display set
		 * (i.e. after filtering). Use fnRecordsDisplay rather than
		 * this property to get the value of the number of records, regardless of
		 * the server-side processing setting.
		 *  @type boolean
		 *  @default 0
		 *  @private
		 */
		"_iRecordsDisplay": 0,
	
		/**
		 * The classes to use for the table
		 *  @type object
		 *  @default {}
		 */
		"oClasses": {},
	
		/**
		 * Flag attached to the settings object so you can check in the draw
		 * callback if filtering has been done in the draw. Deprecated in favour of
		 * events.
		 *  @type boolean
		 *  @default false
		 *  @deprecated
		 */
		"bFiltered": false,
	
		/**
		 * Flag attached to the settings object so you can check in the draw
		 * callback if sorting has been done in the draw. Deprecated in favour of
		 * events.
		 *  @type boolean
		 *  @default false
		 *  @deprecated
		 */
		"bSorted": false,
	
		/**
		 * Indicate that if multiple rows are in the header and there is more than
		 * one unique cell per column, if the top one (true) or bottom one (false)
		 * should be used for sorting / title by DataTables.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type boolean
		 */
		"bSortCellsTop": null,
	
		/**
		 * Initialisation object that is used for the table
		 *  @type object
		 *  @default null
		 */
		"oInit": null,
	
		/**
		 * Destroy callback functions - for plug-ins to attach themselves to the
		 * destroy so they can clean up markup and events.
		 *  @type array
		 *  @default []
		 */
		"aoDestroyCallback": [],
	
	
		/**
		 * Get the number of records in the current record set, before filtering
		 *  @type function
		 */
		"fnRecordsTotal": function ()
		{
			return _fnDataSource( this ) == 'ssp' ?
				this._iRecordsTotal * 1 :
				this.aiDisplayMaster.length;
		},
	
		/**
		 * Get the number of records in the current record set, after filtering
		 *  @type function
		 */
		"fnRecordsDisplay": function ()
		{
			return _fnDataSource( this ) == 'ssp' ?
				this._iRecordsDisplay * 1 :
				this.aiDisplay.length;
		},
	
		/**
		 * Get the display end point - aiDisplay index
		 *  @type function
		 */
		"fnDisplayEnd": function ()
		{
			var
				len      = this._iDisplayLength,
				start    = this._iDisplayStart,
				calc     = start + len,
				records  = this.aiDisplay.length,
				features = this.oFeatures,
				paginate = features.bPaginate;
	
			if ( features.bServerSide ) {
				return paginate === false || len === -1 ?
					start + records :
					Math.min( start+len, this._iRecordsDisplay );
			}
			else {
				return ! paginate || calc>records || len===-1 ?
					records :
					calc;
			}
		},
	
		/**
		 * The DataTables object for this table
		 *  @type object
		 *  @default null
		 */
		"oInstance": null,
	
		/**
		 * Unique identifier for each instance of the DataTables object. If there
		 * is an ID on the table node, then it takes that value, otherwise an
		 * incrementing internal counter is used.
		 *  @type string
		 *  @default null
		 */
		"sInstance": null,
	
		/**
		 * tabindex attribute value that is added to DataTables control elements, allowing
		 * keyboard navigation of the table and its controls.
		 */
		"iTabIndex": 0,
	
		/**
		 * DIV container for the footer scrolling table if scrolling
		 */
		"nScrollHead": null,
	
		/**
		 * DIV container for the footer scrolling table if scrolling
		 */
		"nScrollFoot": null,
	
		/**
		 * Last applied sort
		 *  @type array
		 *  @default []
		 */
		"aLastSort": [],
	
		/**
		 * Stored plug-in instances
		 *  @type object
		 *  @default {}
		 */
		"oPlugins": {},
	
		/**
		 * Function used to get a row's id from the row's data
		 *  @type function
		 *  @default null
		 */
		"rowIdFn": null,
	
		/**
		 * Data location where to store a row's id
		 *  @type string
		 *  @default null
		 */
		"rowId": null
	};

	/**
	 * Extension object for DataTables that is used to provide all extension
	 * options.
	 *
	 * Note that the `DataTable.ext` object is available through
	 * `jQuery.fn.dataTable.ext` where it may be accessed and manipulated. It is
	 * also aliased to `jQuery.fn.dataTableExt` for historic reasons.
	 *  @namespace
	 *  @extends DataTable.models.ext
	 */
	
	
	/**
	 * DataTables extensions
	 * 
	 * This namespace acts as a collection area for plug-ins that can be used to
	 * extend DataTables capabilities. Indeed many of the build in methods
	 * use this method to provide their own capabilities (sorting methods for
	 * example).
	 *
	 * Note that this namespace is aliased to `jQuery.fn.dataTableExt` for legacy
	 * reasons
	 *
	 *  @namespace
	 */
	DataTable.ext = _ext = {
		/**
		 * Buttons. For use with the Buttons extension for DataTables. This is
		 * defined here so other extensions can define buttons regardless of load
		 * order. It is _not_ used by DataTables core.
		 *
		 *  @type object
		 *  @default {}
		 */
		buttons: {},
	
	
		/**
		 * Element class names
		 *
		 *  @type object
		 *  @default {}
		 */
		classes: {},
	
	
		/**
		 * DataTables build type (expanded by the download builder)
		 *
		 *  @type string
		 */
		build:"bs4/dt-1.10.21/e-1.9.3",
	
	
		/**
		 * Error reporting.
		 * 
		 * How should DataTables report an error. Can take the value 'alert',
		 * 'throw', 'none' or a function.
		 *
		 *  @type string|function
		 *  @default alert
		 */
		errMode: "alert",
	
	
		/**
		 * Feature plug-ins.
		 * 
		 * This is an array of objects which describe the feature plug-ins that are
		 * available to DataTables. These feature plug-ins are then available for
		 * use through the `dom` initialisation option.
		 * 
		 * Each feature plug-in is described by an object which must have the
		 * following properties:
		 * 
		 * * `fnInit` - function that is used to initialise the plug-in,
		 * * `cFeature` - a character so the feature can be enabled by the `dom`
		 *   instillation option. This is case sensitive.
		 *
		 * The `fnInit` function has the following input parameters:
		 *
		 * 1. `{object}` DataTables settings object: see
		 *    {@link DataTable.models.oSettings}
		 *
		 * And the following return is expected:
		 * 
		 * * {node|null} The element which contains your feature. Note that the
		 *   return may also be void if your plug-in does not require to inject any
		 *   DOM elements into DataTables control (`dom`) - for example this might
		 *   be useful when developing a plug-in which allows table control via
		 *   keyboard entry
		 *
		 *  @type array
		 *
		 *  @example
		 *    $.fn.dataTable.ext.features.push( {
		 *      "fnInit": function( oSettings ) {
		 *        return new TableTools( { "oDTSettings": oSettings } );
		 *      },
		 *      "cFeature": "T"
		 *    } );
		 */
		feature: [],
	
	
		/**
		 * Row searching.
		 * 
		 * This method of searching is complimentary to the default type based
		 * searching, and a lot more comprehensive as it allows you complete control
		 * over the searching logic. Each element in this array is a function
		 * (parameters described below) that is called for every row in the table,
		 * and your logic decides if it should be included in the searching data set
		 * or not.
		 *
		 * Searching functions have the following input parameters:
		 *
		 * 1. `{object}` DataTables settings object: see
		 *    {@link DataTable.models.oSettings}
		 * 2. `{array|object}` Data for the row to be processed (same as the
		 *    original format that was passed in as the data source, or an array
		 *    from a DOM data source
		 * 3. `{int}` Row index ({@link DataTable.models.oSettings.aoData}), which
		 *    can be useful to retrieve the `TR` element if you need DOM interaction.
		 *
		 * And the following return is expected:
		 *
		 * * {boolean} Include the row in the searched result set (true) or not
		 *   (false)
		 *
		 * Note that as with the main search ability in DataTables, technically this
		 * is "filtering", since it is subtractive. However, for consistency in
		 * naming we call it searching here.
		 *
		 *  @type array
		 *  @default []
		 *
		 *  @example
		 *    // The following example shows custom search being applied to the
		 *    // fourth column (i.e. the data[3] index) based on two input values
		 *    // from the end-user, matching the data in a certain range.
		 *    $.fn.dataTable.ext.search.push(
		 *      function( settings, data, dataIndex ) {
		 *        var min = document.getElementById('min').value * 1;
		 *        var max = document.getElementById('max').value * 1;
		 *        var version = data[3] == "-" ? 0 : data[3]*1;
		 *
		 *        if ( min == "" && max == "" ) {
		 *          return true;
		 *        }
		 *        else if ( min == "" && version < max ) {
		 *          return true;
		 *        }
		 *        else if ( min < version && "" == max ) {
		 *          return true;
		 *        }
		 *        else if ( min < version && version < max ) {
		 *          return true;
		 *        }
		 *        return false;
		 *      }
		 *    );
		 */
		search: [],
	
	
		/**
		 * Selector extensions
		 *
		 * The `selector` option can be used to extend the options available for the
		 * selector modifier options (`selector-modifier` object data type) that
		 * each of the three built in selector types offer (row, column and cell +
		 * their plural counterparts). For example the Select extension uses this
		 * mechanism to provide an option to select only rows, columns and cells
		 * that have been marked as selected by the end user (`{selected: true}`),
		 * which can be used in conjunction with the existing built in selector
		 * options.
		 *
		 * Each property is an array to which functions can be pushed. The functions
		 * take three attributes:
		 *
		 * * Settings object for the host table
		 * * Options object (`selector-modifier` object type)
		 * * Array of selected item indexes
		 *
		 * The return is an array of the resulting item indexes after the custom
		 * selector has been applied.
		 *
		 *  @type object
		 */
		selector: {
			cell: [],
			column: [],
			row: []
		},
	
	
		/**
		 * Internal functions, exposed for used in plug-ins.
		 * 
		 * Please note that you should not need to use the internal methods for
		 * anything other than a plug-in (and even then, try to avoid if possible).
		 * The internal function may change between releases.
		 *
		 *  @type object
		 *  @default {}
		 */
		internal: {},
	
	
		/**
		 * Legacy configuration options. Enable and disable legacy options that
		 * are available in DataTables.
		 *
		 *  @type object
		 */
		legacy: {
			/**
			 * Enable / disable DataTables 1.9 compatible server-side processing
			 * requests
			 *
			 *  @type boolean
			 *  @default null
			 */
			ajax: null
		},
	
	
		/**
		 * Pagination plug-in methods.
		 * 
		 * Each entry in this object is a function and defines which buttons should
		 * be shown by the pagination rendering method that is used for the table:
		 * {@link DataTable.ext.renderer.pageButton}. The renderer addresses how the
		 * buttons are displayed in the document, while the functions here tell it
		 * what buttons to display. This is done by returning an array of button
		 * descriptions (what each button will do).
		 *
		 * Pagination types (the four built in options and any additional plug-in
		 * options defined here) can be used through the `paginationType`
		 * initialisation parameter.
		 *
		 * The functions defined take two parameters:
		 *
		 * 1. `{int} page` The current page index
		 * 2. `{int} pages` The number of pages in the table
		 *
		 * Each function is expected to return an array where each element of the
		 * array can be one of:
		 *
		 * * `first` - Jump to first page when activated
		 * * `last` - Jump to last page when activated
		 * * `previous` - Show previous page when activated
		 * * `next` - Show next page when activated
		 * * `{int}` - Show page of the index given
		 * * `{array}` - A nested array containing the above elements to add a
		 *   containing 'DIV' element (might be useful for styling).
		 *
		 * Note that DataTables v1.9- used this object slightly differently whereby
		 * an object with two functions would be defined for each plug-in. That
		 * ability is still supported by DataTables 1.10+ to provide backwards
		 * compatibility, but this option of use is now decremented and no longer
		 * documented in DataTables 1.10+.
		 *
		 *  @type object
		 *  @default {}
		 *
		 *  @example
		 *    // Show previous, next and current page buttons only
		 *    $.fn.dataTableExt.oPagination.current = function ( page, pages ) {
		 *      return [ 'previous', page, 'next' ];
		 *    };
		 */
		pager: {},
	
	
		renderer: {
			pageButton: {},
			header: {}
		},
	
	
		/**
		 * Ordering plug-ins - custom data source
		 * 
		 * The extension options for ordering of data available here is complimentary
		 * to the default type based ordering that DataTables typically uses. It
		 * allows much greater control over the the data that is being used to
		 * order a column, but is necessarily therefore more complex.
		 * 
		 * This type of ordering is useful if you want to do ordering based on data
		 * live from the DOM (for example the contents of an 'input' element) rather
		 * than just the static string that DataTables knows of.
		 * 
		 * The way these plug-ins work is that you create an array of the values you
		 * wish to be ordering for the column in question and then return that
		 * array. The data in the array much be in the index order of the rows in
		 * the table (not the currently ordering order!). Which order data gathering
		 * function is run here depends on the `dt-init columns.orderDataType`
		 * parameter that is used for the column (if any).
		 *
		 * The functions defined take two parameters:
		 *
		 * 1. `{object}` DataTables settings object: see
		 *    {@link DataTable.models.oSettings}
		 * 2. `{int}` Target column index
		 *
		 * Each function is expected to return an array:
		 *
		 * * `{array}` Data for the column to be ordering upon
		 *
		 *  @type array
		 *
		 *  @example
		 *    // Ordering using `input` node values
		 *    $.fn.dataTable.ext.order['dom-text'] = function  ( settings, col )
		 *    {
		 *      return this.api().column( col, {order:'index'} ).nodes().map( function ( td, i ) {
		 *        return $('input', td).val();
		 *      } );
		 *    }
		 */
		order: {},
	
	
		/**
		 * Type based plug-ins.
		 *
		 * Each column in DataTables has a type assigned to it, either by automatic
		 * detection or by direct assignment using the `type` option for the column.
		 * The type of a column will effect how it is ordering and search (plug-ins
		 * can also make use of the column type if required).
		 *
		 * @namespace
		 */
		type: {
			/**
			 * Type detection functions.
			 *
			 * The functions defined in this object are used to automatically detect
			 * a column's type, making initialisation of DataTables super easy, even
			 * when complex data is in the table.
			 *
			 * The functions defined take two parameters:
			 *
		     *  1. `{*}` Data from the column cell to be analysed
		     *  2. `{settings}` DataTables settings object. This can be used to
		     *     perform context specific type detection - for example detection
		     *     based on language settings such as using a comma for a decimal
		     *     place. Generally speaking the options from the settings will not
		     *     be required
			 *
			 * Each function is expected to return:
			 *
			 * * `{string|null}` Data type detected, or null if unknown (and thus
			 *   pass it on to the other type detection functions.
			 *
			 *  @type array
			 *
			 *  @example
			 *    // Currency type detection plug-in:
			 *    $.fn.dataTable.ext.type.detect.push(
			 *      function ( data, settings ) {
			 *        // Check the numeric part
			 *        if ( ! data.substring(1).match(/[0-9]/) ) {
			 *          return null;
			 *        }
			 *
			 *        // Check prefixed by currency
			 *        if ( data.charAt(0) == '$' || data.charAt(0) == '&pound;' ) {
			 *          return 'currency';
			 *        }
			 *        return null;
			 *      }
			 *    );
			 */
			detect: [],
	
	
			/**
			 * Type based search formatting.
			 *
			 * The type based searching functions can be used to pre-format the
			 * data to be search on. For example, it can be used to strip HTML
			 * tags or to de-format telephone numbers for numeric only searching.
			 *
			 * Note that is a search is not defined for a column of a given type,
			 * no search formatting will be performed.
			 * 
			 * Pre-processing of searching data plug-ins - When you assign the sType
			 * for a column (or have it automatically detected for you by DataTables
			 * or a type detection plug-in), you will typically be using this for
			 * custom sorting, but it can also be used to provide custom searching
			 * by allowing you to pre-processing the data and returning the data in
			 * the format that should be searched upon. This is done by adding
			 * functions this object with a parameter name which matches the sType
			 * for that target column. This is the corollary of <i>afnSortData</i>
			 * for searching data.
			 *
			 * The functions defined take a single parameter:
			 *
		     *  1. `{*}` Data from the column cell to be prepared for searching
			 *
			 * Each function is expected to return:
			 *
			 * * `{string|null}` Formatted string that will be used for the searching.
			 *
			 *  @type object
			 *  @default {}
			 *
			 *  @example
			 *    $.fn.dataTable.ext.type.search['title-numeric'] = function ( d ) {
			 *      return d.replace(/\n/g," ").replace( /<.*?>/g, "" );
			 *    }
			 */
			search: {},
	
	
			/**
			 * Type based ordering.
			 *
			 * The column type tells DataTables what ordering to apply to the table
			 * when a column is sorted upon. The order for each type that is defined,
			 * is defined by the functions available in this object.
			 *
			 * Each ordering option can be described by three properties added to
			 * this object:
			 *
			 * * `{type}-pre` - Pre-formatting function
			 * * `{type}-asc` - Ascending order function
			 * * `{type}-desc` - Descending order function
			 *
			 * All three can be used together, only `{type}-pre` or only
			 * `{type}-asc` and `{type}-desc` together. It is generally recommended
			 * that only `{type}-pre` is used, as this provides the optimal
			 * implementation in terms of speed, although the others are provided
			 * for compatibility with existing Javascript sort functions.
			 *
			 * `{type}-pre`: Functions defined take a single parameter:
			 *
		     *  1. `{*}` Data from the column cell to be prepared for ordering
			 *
			 * And return:
			 *
			 * * `{*}` Data to be sorted upon
			 *
			 * `{type}-asc` and `{type}-desc`: Functions are typical Javascript sort
			 * functions, taking two parameters:
			 *
		     *  1. `{*}` Data to compare to the second parameter
		     *  2. `{*}` Data to compare to the first parameter
			 *
			 * And returning:
			 *
			 * * `{*}` Ordering match: <0 if first parameter should be sorted lower
			 *   than the second parameter, ===0 if the two parameters are equal and
			 *   >0 if the first parameter should be sorted height than the second
			 *   parameter.
			 * 
			 *  @type object
			 *  @default {}
			 *
			 *  @example
			 *    // Numeric ordering of formatted numbers with a pre-formatter
			 *    $.extend( $.fn.dataTable.ext.type.order, {
			 *      "string-pre": function(x) {
			 *        a = (a === "-" || a === "") ? 0 : a.replace( /[^\d\-\.]/g, "" );
			 *        return parseFloat( a );
			 *      }
			 *    } );
			 *
			 *  @example
			 *    // Case-sensitive string ordering, with no pre-formatting method
			 *    $.extend( $.fn.dataTable.ext.order, {
			 *      "string-case-asc": function(x,y) {
			 *        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
			 *      },
			 *      "string-case-desc": function(x,y) {
			 *        return ((x < y) ? 1 : ((x > y) ? -1 : 0));
			 *      }
			 *    } );
			 */
			order: {}
		},
	
		/**
		 * Unique DataTables instance counter
		 *
		 * @type int
		 * @private
		 */
		_unique: 0,
	
	
		//
		// Depreciated
		// The following properties are retained for backwards compatiblity only.
		// The should not be used in new projects and will be removed in a future
		// version
		//
	
		/**
		 * Version check function.
		 *  @type function
		 *  @depreciated Since 1.10
		 */
		fnVersionCheck: DataTable.fnVersionCheck,
	
	
		/**
		 * Index for what 'this' index API functions should use
		 *  @type int
		 *  @deprecated Since v1.10
		 */
		iApiIndex: 0,
	
	
		/**
		 * jQuery UI class container
		 *  @type object
		 *  @deprecated Since v1.10
		 */
		oJUIClasses: {},
	
	
		/**
		 * Software version
		 *  @type string
		 *  @deprecated Since v1.10
		 */
		sVersion: DataTable.version
	};
	
	
	//
	// Backwards compatibility. Alias to pre 1.10 Hungarian notation counter parts
	//
	$.extend( _ext, {
		afnFiltering: _ext.search,
		aTypes:       _ext.type.detect,
		ofnSearch:    _ext.type.search,
		oSort:        _ext.type.order,
		afnSortData:  _ext.order,
		aoFeatures:   _ext.feature,
		oApi:         _ext.internal,
		oStdClasses:  _ext.classes,
		oPagination:  _ext.pager
	} );
	
	
	$.extend( DataTable.ext.classes, {
		"sTable": "dataTable",
		"sNoFooter": "no-footer",
	
		/* Paging buttons */
		"sPageButton": "paginate_button",
		"sPageButtonActive": "current",
		"sPageButtonDisabled": "disabled",
	
		/* Striping classes */
		"sStripeOdd": "odd",
		"sStripeEven": "even",
	
		/* Empty row */
		"sRowEmpty": "dataTables_empty",
	
		/* Features */
		"sWrapper": "dataTables_wrapper",
		"sFilter": "dataTables_filter",
		"sInfo": "dataTables_info",
		"sPaging": "dataTables_paginate paging_", /* Note that the type is postfixed */
		"sLength": "dataTables_length",
		"sProcessing": "dataTables_processing",
	
		/* Sorting */
		"sSortAsc": "sorting_asc",
		"sSortDesc": "sorting_desc",
		"sSortable": "sorting", /* Sortable in both directions */
		"sSortableAsc": "sorting_asc_disabled",
		"sSortableDesc": "sorting_desc_disabled",
		"sSortableNone": "sorting_disabled",
		"sSortColumn": "sorting_", /* Note that an int is postfixed for the sorting order */
	
		/* Filtering */
		"sFilterInput": "",
	
		/* Page length */
		"sLengthSelect": "",
	
		/* Scrolling */
		"sScrollWrapper": "dataTables_scroll",
		"sScrollHead": "dataTables_scrollHead",
		"sScrollHeadInner": "dataTables_scrollHeadInner",
		"sScrollBody": "dataTables_scrollBody",
		"sScrollFoot": "dataTables_scrollFoot",
		"sScrollFootInner": "dataTables_scrollFootInner",
	
		/* Misc */
		"sHeaderTH": "",
		"sFooterTH": "",
	
		// Deprecated
		"sSortJUIAsc": "",
		"sSortJUIDesc": "",
		"sSortJUI": "",
		"sSortJUIAscAllowed": "",
		"sSortJUIDescAllowed": "",
		"sSortJUIWrapper": "",
		"sSortIcon": "",
		"sJUIHeader": "",
		"sJUIFooter": ""
	} );
	
	
	var extPagination = DataTable.ext.pager;
	
	function _numbers ( page, pages ) {
		var
			numbers = [],
			buttons = extPagination.numbers_length,
			half = Math.floor( buttons / 2 ),
			i = 1;
	
		if ( pages <= buttons ) {
			numbers = _range( 0, pages );
		}
		else if ( page <= half ) {
			numbers = _range( 0, buttons-2 );
			numbers.push( 'ellipsis' );
			numbers.push( pages-1 );
		}
		else if ( page >= pages - 1 - half ) {
			numbers = _range( pages-(buttons-2), pages );
			numbers.splice( 0, 0, 'ellipsis' ); // no unshift in ie6
			numbers.splice( 0, 0, 0 );
		}
		else {
			numbers = _range( page-half+2, page+half-1 );
			numbers.push( 'ellipsis' );
			numbers.push( pages-1 );
			numbers.splice( 0, 0, 'ellipsis' );
			numbers.splice( 0, 0, 0 );
		}
	
		numbers.DT_el = 'span';
		return numbers;
	}
	
	
	$.extend( extPagination, {
		simple: function ( page, pages ) {
			return [ 'previous', 'next' ];
		},
	
		full: function ( page, pages ) {
			return [  'first', 'previous', 'next', 'last' ];
		},
	
		numbers: function ( page, pages ) {
			return [ _numbers(page, pages) ];
		},
	
		simple_numbers: function ( page, pages ) {
			return [ 'previous', _numbers(page, pages), 'next' ];
		},
	
		full_numbers: function ( page, pages ) {
			return [ 'first', 'previous', _numbers(page, pages), 'next', 'last' ];
		},
		
		first_last_numbers: function (page, pages) {
	 		return ['first', _numbers(page, pages), 'last'];
	 	},
	
		// For testing and plug-ins to use
		_numbers: _numbers,
	
		// Number of number buttons (including ellipsis) to show. _Must be odd!_
		numbers_length: 7
	} );
	
	
	$.extend( true, DataTable.ext.renderer, {
		pageButton: {
			_: function ( settings, host, idx, buttons, page, pages ) {
				var classes = settings.oClasses;
				var lang = settings.oLanguage.oPaginate;
				var aria = settings.oLanguage.oAria.paginate || {};
				var btnDisplay, btnClass, counter=0;
	
				var attach = function( container, buttons ) {
					var i, ien, node, button, tabIndex;
					var disabledClass = classes.sPageButtonDisabled;
					var clickHandler = function ( e ) {
						_fnPageChange( settings, e.data.action, true );
					};
	
					for ( i=0, ien=buttons.length ; i<ien ; i++ ) {
						button = buttons[i];
	
						if ( $.isArray( button ) ) {
							var inner = $( '<'+(button.DT_el || 'div')+'/>' )
								.appendTo( container );
							attach( inner, button );
						}
						else {
							btnDisplay = null;
							btnClass = button;
							tabIndex = settings.iTabIndex;
	
							switch ( button ) {
								case 'ellipsis':
									container.append('<span class="ellipsis">&#x2026;</span>');
									break;
	
								case 'first':
									btnDisplay = lang.sFirst;
	
									if ( page === 0 ) {
										tabIndex = -1;
										btnClass += ' ' + disabledClass;
									}
									break;
	
								case 'previous':
									btnDisplay = lang.sPrevious;
	
									if ( page === 0 ) {
										tabIndex = -1;
										btnClass += ' ' + disabledClass;
									}
									break;
	
								case 'next':
									btnDisplay = lang.sNext;
	
									if ( pages === 0 || page === pages-1 ) {
										tabIndex = -1;
										btnClass += ' ' + disabledClass;
									}
									break;
	
								case 'last':
									btnDisplay = lang.sLast;
	
									if ( page === pages-1 ) {
										tabIndex = -1;
										btnClass += ' ' + disabledClass;
									}
									break;
	
								default:
									btnDisplay = button + 1;
									btnClass = page === button ?
										classes.sPageButtonActive : '';
									break;
							}
	
							if ( btnDisplay !== null ) {
								node = $('<a>', {
										'class': classes.sPageButton+' '+btnClass,
										'aria-controls': settings.sTableId,
										'aria-label': aria[ button ],
										'data-dt-idx': counter,
										'tabindex': tabIndex,
										'id': idx === 0 && typeof button === 'string' ?
											settings.sTableId +'_'+ button :
											null
									} )
									.html( btnDisplay )
									.appendTo( container );
	
								_fnBindAction(
									node, {action: button}, clickHandler
								);
	
								counter++;
							}
						}
					}
				};
	
				// IE9 throws an 'unknown error' if document.activeElement is used
				// inside an iframe or frame. Try / catch the error. Not good for
				// accessibility, but neither are frames.
				var activeEl;
	
				try {
					// Because this approach is destroying and recreating the paging
					// elements, focus is lost on the select button which is bad for
					// accessibility. So we want to restore focus once the draw has
					// completed
					activeEl = $(host).find(document.activeElement).data('dt-idx');
				}
				catch (e) {}
	
				attach( $(host).empty(), buttons );
	
				if ( activeEl !== undefined ) {
					$(host).find( '[data-dt-idx='+activeEl+']' ).trigger('focus');
				}
			}
		}
	} );
	
	
	
	// Built in type detection. See model.ext.aTypes for information about
	// what is required from this methods.
	$.extend( DataTable.ext.type.detect, [
		// Plain numbers - first since V8 detects some plain numbers as dates
		// e.g. Date.parse('55') (but not all, e.g. Date.parse('22')...).
		function ( d, settings )
		{
			var decimal = settings.oLanguage.sDecimal;
			return _isNumber( d, decimal ) ? 'num'+decimal : null;
		},
	
		// Dates (only those recognised by the browser's Date.parse)
		function ( d, settings )
		{
			// V8 tries _very_ hard to make a string passed into `Date.parse()`
			// valid, so we need to use a regex to restrict date formats. Use a
			// plug-in for anything other than ISO8601 style strings
			if ( d && !(d instanceof Date) && ! _re_date.test(d) ) {
				return null;
			}
			var parsed = Date.parse(d);
			return (parsed !== null && !isNaN(parsed)) || _empty(d) ? 'date' : null;
		},
	
		// Formatted numbers
		function ( d, settings )
		{
			var decimal = settings.oLanguage.sDecimal;
			return _isNumber( d, decimal, true ) ? 'num-fmt'+decimal : null;
		},
	
		// HTML numeric
		function ( d, settings )
		{
			var decimal = settings.oLanguage.sDecimal;
			return _htmlNumeric( d, decimal ) ? 'html-num'+decimal : null;
		},
	
		// HTML numeric, formatted
		function ( d, settings )
		{
			var decimal = settings.oLanguage.sDecimal;
			return _htmlNumeric( d, decimal, true ) ? 'html-num-fmt'+decimal : null;
		},
	
		// HTML (this is strict checking - there must be html)
		function ( d, settings )
		{
			return _empty( d ) || (typeof d === 'string' && d.indexOf('<') !== -1) ?
				'html' : null;
		}
	] );
	
	
	
	// Filter formatting functions. See model.ext.ofnSearch for information about
	// what is required from these methods.
	// 
	// Note that additional search methods are added for the html numbers and
	// html formatted numbers by `_addNumericSort()` when we know what the decimal
	// place is
	
	
	$.extend( DataTable.ext.type.search, {
		html: function ( data ) {
			return _empty(data) ?
				data :
				typeof data === 'string' ?
					data
						.replace( _re_new_lines, " " )
						.replace( _re_html, "" ) :
					'';
		},
	
		string: function ( data ) {
			return _empty(data) ?
				data :
				typeof data === 'string' ?
					data.replace( _re_new_lines, " " ) :
					data;
		}
	} );
	
	
	
	var __numericReplace = function ( d, decimalPlace, re1, re2 ) {
		if ( d !== 0 && (!d || d === '-') ) {
			return -Infinity;
		}
	
		// If a decimal place other than `.` is used, it needs to be given to the
		// function so we can detect it and replace with a `.` which is the only
		// decimal place Javascript recognises - it is not locale aware.
		if ( decimalPlace ) {
			d = _numToDecimal( d, decimalPlace );
		}
	
		if ( d.replace ) {
			if ( re1 ) {
				d = d.replace( re1, '' );
			}
	
			if ( re2 ) {
				d = d.replace( re2, '' );
			}
		}
	
		return d * 1;
	};
	
	
	// Add the numeric 'deformatting' functions for sorting and search. This is done
	// in a function to provide an easy ability for the language options to add
	// additional methods if a non-period decimal place is used.
	function _addNumericSort ( decimalPlace ) {
		$.each(
			{
				// Plain numbers
				"num": function ( d ) {
					return __numericReplace( d, decimalPlace );
				},
	
				// Formatted numbers
				"num-fmt": function ( d ) {
					return __numericReplace( d, decimalPlace, _re_formatted_numeric );
				},
	
				// HTML numeric
				"html-num": function ( d ) {
					return __numericReplace( d, decimalPlace, _re_html );
				},
	
				// HTML numeric, formatted
				"html-num-fmt": function ( d ) {
					return __numericReplace( d, decimalPlace, _re_html, _re_formatted_numeric );
				}
			},
			function ( key, fn ) {
				// Add the ordering method
				_ext.type.order[ key+decimalPlace+'-pre' ] = fn;
	
				// For HTML types add a search formatter that will strip the HTML
				if ( key.match(/^html\-/) ) {
					_ext.type.search[ key+decimalPlace ] = _ext.type.search.html;
				}
			}
		);
	}
	
	
	// Default sort methods
	$.extend( _ext.type.order, {
		// Dates
		"date-pre": function ( d ) {
			var ts = Date.parse( d );
			return isNaN(ts) ? -Infinity : ts;
		},
	
		// html
		"html-pre": function ( a ) {
			return _empty(a) ?
				'' :
				a.replace ?
					a.replace( /<.*?>/g, "" ).toLowerCase() :
					a+'';
		},
	
		// string
		"string-pre": function ( a ) {
			// This is a little complex, but faster than always calling toString,
			// http://jsperf.com/tostring-v-check
			return _empty(a) ?
				'' :
				typeof a === 'string' ?
					a.toLowerCase() :
					! a.toString ?
						'' :
						a.toString();
		},
	
		// string-asc and -desc are retained only for compatibility with the old
		// sort methods
		"string-asc": function ( x, y ) {
			return ((x < y) ? -1 : ((x > y) ? 1 : 0));
		},
	
		"string-desc": function ( x, y ) {
			return ((x < y) ? 1 : ((x > y) ? -1 : 0));
		}
	} );
	
	
	// Numeric sorting types - order doesn't matter here
	_addNumericSort( '' );
	
	
	$.extend( true, DataTable.ext.renderer, {
		header: {
			_: function ( settings, cell, column, classes ) {
				// No additional mark-up required
				// Attach a sort listener to update on sort - note that using the
				// `DT` namespace will allow the event to be removed automatically
				// on destroy, while the `dt` namespaced event is the one we are
				// listening for
				$(settings.nTable).on( 'order.dt.DT', function ( e, ctx, sorting, columns ) {
					if ( settings !== ctx ) { // need to check this this is the host
						return;               // table, not a nested one
					}
	
					var colIdx = column.idx;
	
					cell
						.removeClass(
							column.sSortingClass +' '+
							classes.sSortAsc +' '+
							classes.sSortDesc
						)
						.addClass( columns[ colIdx ] == 'asc' ?
							classes.sSortAsc : columns[ colIdx ] == 'desc' ?
								classes.sSortDesc :
								column.sSortingClass
						);
				} );
			},
	
			jqueryui: function ( settings, cell, column, classes ) {
				$('<div/>')
					.addClass( classes.sSortJUIWrapper )
					.append( cell.contents() )
					.append( $('<span/>')
						.addClass( classes.sSortIcon+' '+column.sSortingClassJUI )
					)
					.appendTo( cell );
	
				// Attach a sort listener to update on sort
				$(settings.nTable).on( 'order.dt.DT', function ( e, ctx, sorting, columns ) {
					if ( settings !== ctx ) {
						return;
					}
	
					var colIdx = column.idx;
	
					cell
						.removeClass( classes.sSortAsc +" "+classes.sSortDesc )
						.addClass( columns[ colIdx ] == 'asc' ?
							classes.sSortAsc : columns[ colIdx ] == 'desc' ?
								classes.sSortDesc :
								column.sSortingClass
						);
	
					cell
						.find( 'span.'+classes.sSortIcon )
						.removeClass(
							classes.sSortJUIAsc +" "+
							classes.sSortJUIDesc +" "+
							classes.sSortJUI +" "+
							classes.sSortJUIAscAllowed +" "+
							classes.sSortJUIDescAllowed
						)
						.addClass( columns[ colIdx ] == 'asc' ?
							classes.sSortJUIAsc : columns[ colIdx ] == 'desc' ?
								classes.sSortJUIDesc :
								column.sSortingClassJUI
						);
				} );
			}
		}
	} );
	
	/*
	 * Public helper functions. These aren't used internally by DataTables, or
	 * called by any of the options passed into DataTables, but they can be used
	 * externally by developers working with DataTables. They are helper functions
	 * to make working with DataTables a little bit easier.
	 */
	
	var __htmlEscapeEntities = function ( d ) {
		return typeof d === 'string' ?
			d
				.replace(/&/g, '&amp;')
				.replace(/</g, '&lt;')
				.replace(/>/g, '&gt;')
				.replace(/"/g, '&quot;') :
			d;
	};
	
	/**
	 * Helpers for `columns.render`.
	 *
	 * The options defined here can be used with the `columns.render` initialisation
	 * option to provide a display renderer. The following functions are defined:
	 *
	 * * `number` - Will format numeric data (defined by `columns.data`) for
	 *   display, retaining the original unformatted data for sorting and filtering.
	 *   It takes 5 parameters:
	 *   * `string` - Thousands grouping separator
	 *   * `string` - Decimal point indicator
	 *   * `integer` - Number of decimal points to show
	 *   * `string` (optional) - Prefix.
	 *   * `string` (optional) - Postfix (/suffix).
	 * * `text` - Escape HTML to help prevent XSS attacks. It has no optional
	 *   parameters.
	 *
	 * @example
	 *   // Column definition using the number renderer
	 *   {
	 *     data: "salary",
	 *     render: $.fn.dataTable.render.number( '\'', '.', 0, '$' )
	 *   }
	 *
	 * @namespace
	 */
	DataTable.render = {
		number: function ( thousands, decimal, precision, prefix, postfix ) {
			return {
				display: function ( d ) {
					if ( typeof d !== 'number' && typeof d !== 'string' ) {
						return d;
					}
	
					var negative = d < 0 ? '-' : '';
					var flo = parseFloat( d );
	
					// If NaN then there isn't much formatting that we can do - just
					// return immediately, escaping any HTML (this was supposed to
					// be a number after all)
					if ( isNaN( flo ) ) {
						return __htmlEscapeEntities( d );
					}
	
					flo = flo.toFixed( precision );
					d = Math.abs( flo );
	
					var intPart = parseInt( d, 10 );
					var floatPart = precision ?
						decimal+(d - intPart).toFixed( precision ).substring( 2 ):
						'';
	
					return negative + (prefix||'') +
						intPart.toString().replace(
							/\B(?=(\d{3})+(?!\d))/g, thousands
						) +
						floatPart +
						(postfix||'');
				}
			};
		},
	
		text: function () {
			return {
				display: __htmlEscapeEntities,
				filter: __htmlEscapeEntities
			};
		}
	};
	
	
	/*
	 * This is really a good bit rubbish this method of exposing the internal methods
	 * publicly... - To be fixed in 2.0 using methods on the prototype
	 */
	
	
	/**
	 * Create a wrapper function for exporting an internal functions to an external API.
	 *  @param {string} fn API function name
	 *  @returns {function} wrapped function
	 *  @memberof DataTable#internal
	 */
	function _fnExternApiFunc (fn)
	{
		return function() {
			var args = [_fnSettingsFromNode( this[DataTable.ext.iApiIndex] )].concat(
				Array.prototype.slice.call(arguments)
			);
			return DataTable.ext.internal[fn].apply( this, args );
		};
	}
	
	
	/**
	 * Reference to internal functions for use by plug-in developers. Note that
	 * these methods are references to internal functions and are considered to be
	 * private. If you use these methods, be aware that they are liable to change
	 * between versions.
	 *  @namespace
	 */
	$.extend( DataTable.ext.internal, {
		_fnExternApiFunc: _fnExternApiFunc,
		_fnBuildAjax: _fnBuildAjax,
		_fnAjaxUpdate: _fnAjaxUpdate,
		_fnAjaxParameters: _fnAjaxParameters,
		_fnAjaxUpdateDraw: _fnAjaxUpdateDraw,
		_fnAjaxDataSrc: _fnAjaxDataSrc,
		_fnAddColumn: _fnAddColumn,
		_fnColumnOptions: _fnColumnOptions,
		_fnAdjustColumnSizing: _fnAdjustColumnSizing,
		_fnVisibleToColumnIndex: _fnVisibleToColumnIndex,
		_fnColumnIndexToVisible: _fnColumnIndexToVisible,
		_fnVisbleColumns: _fnVisbleColumns,
		_fnGetColumns: _fnGetColumns,
		_fnColumnTypes: _fnColumnTypes,
		_fnApplyColumnDefs: _fnApplyColumnDefs,
		_fnHungarianMap: _fnHungarianMap,
		_fnCamelToHungarian: _fnCamelToHungarian,
		_fnLanguageCompat: _fnLanguageCompat,
		_fnBrowserDetect: _fnBrowserDetect,
		_fnAddData: _fnAddData,
		_fnAddTr: _fnAddTr,
		_fnNodeToDataIndex: _fnNodeToDataIndex,
		_fnNodeToColumnIndex: _fnNodeToColumnIndex,
		_fnGetCellData: _fnGetCellData,
		_fnSetCellData: _fnSetCellData,
		_fnSplitObjNotation: _fnSplitObjNotation,
		_fnGetObjectDataFn: _fnGetObjectDataFn,
		_fnSetObjectDataFn: _fnSetObjectDataFn,
		_fnGetDataMaster: _fnGetDataMaster,
		_fnClearTable: _fnClearTable,
		_fnDeleteIndex: _fnDeleteIndex,
		_fnInvalidate: _fnInvalidate,
		_fnGetRowElements: _fnGetRowElements,
		_fnCreateTr: _fnCreateTr,
		_fnBuildHead: _fnBuildHead,
		_fnDrawHead: _fnDrawHead,
		_fnDraw: _fnDraw,
		_fnReDraw: _fnReDraw,
		_fnAddOptionsHtml: _fnAddOptionsHtml,
		_fnDetectHeader: _fnDetectHeader,
		_fnGetUniqueThs: _fnGetUniqueThs,
		_fnFeatureHtmlFilter: _fnFeatureHtmlFilter,
		_fnFilterComplete: _fnFilterComplete,
		_fnFilterCustom: _fnFilterCustom,
		_fnFilterColumn: _fnFilterColumn,
		_fnFilter: _fnFilter,
		_fnFilterCreateSearch: _fnFilterCreateSearch,
		_fnEscapeRegex: _fnEscapeRegex,
		_fnFilterData: _fnFilterData,
		_fnFeatureHtmlInfo: _fnFeatureHtmlInfo,
		_fnUpdateInfo: _fnUpdateInfo,
		_fnInfoMacros: _fnInfoMacros,
		_fnInitialise: _fnInitialise,
		_fnInitComplete: _fnInitComplete,
		_fnLengthChange: _fnLengthChange,
		_fnFeatureHtmlLength: _fnFeatureHtmlLength,
		_fnFeatureHtmlPaginate: _fnFeatureHtmlPaginate,
		_fnPageChange: _fnPageChange,
		_fnFeatureHtmlProcessing: _fnFeatureHtmlProcessing,
		_fnProcessingDisplay: _fnProcessingDisplay,
		_fnFeatureHtmlTable: _fnFeatureHtmlTable,
		_fnScrollDraw: _fnScrollDraw,
		_fnApplyToChildren: _fnApplyToChildren,
		_fnCalculateColumnWidths: _fnCalculateColumnWidths,
		_fnThrottle: _fnThrottle,
		_fnConvertToWidth: _fnConvertToWidth,
		_fnGetWidestNode: _fnGetWidestNode,
		_fnGetMaxLenString: _fnGetMaxLenString,
		_fnStringToCss: _fnStringToCss,
		_fnSortFlatten: _fnSortFlatten,
		_fnSort: _fnSort,
		_fnSortAria: _fnSortAria,
		_fnSortListener: _fnSortListener,
		_fnSortAttachListener: _fnSortAttachListener,
		_fnSortingClasses: _fnSortingClasses,
		_fnSortData: _fnSortData,
		_fnSaveState: _fnSaveState,
		_fnLoadState: _fnLoadState,
		_fnSettingsFromNode: _fnSettingsFromNode,
		_fnLog: _fnLog,
		_fnMap: _fnMap,
		_fnBindAction: _fnBindAction,
		_fnCallbackReg: _fnCallbackReg,
		_fnCallbackFire: _fnCallbackFire,
		_fnLengthOverflow: _fnLengthOverflow,
		_fnRenderer: _fnRenderer,
		_fnDataSource: _fnDataSource,
		_fnRowAttributes: _fnRowAttributes,
		_fnExtend: _fnExtend,
		_fnCalculateEnd: function () {} // Used by a lot of plug-ins, but redundant
		                                // in 1.10, so this dead-end function is
		                                // added to prevent errors
	} );
	

	// jQuery access
	$.fn.dataTable = DataTable;

	// Provide access to the host jQuery object (circular reference)
	DataTable.$ = $;

	// Legacy aliases
	$.fn.dataTableSettings = DataTable.settings;
	$.fn.dataTableExt = DataTable.ext;

	// With a capital `D` we return a DataTables API instance rather than a
	// jQuery object
	$.fn.DataTable = function ( opts ) {
		return $(this).dataTable( opts ).api();
	};

	// All properties that are available to $.fn.dataTable should also be
	// available on $.fn.DataTable
	$.each( DataTable, function ( prop, val ) {
		$.fn.DataTable[ prop ] = val;
	} );


	// Information about events fired by DataTables - for documentation.
	/**
	 * Draw event, fired whenever the table is redrawn on the page, at the same
	 * point as fnDrawCallback. This may be useful for binding events or
	 * performing calculations when the table is altered at all.
	 *  @name DataTable#draw.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
	 */

	/**
	 * Search event, fired when the searching applied to the table (using the
	 * built-in global search, or column filters) is altered.
	 *  @name DataTable#search.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
	 */

	/**
	 * Page change event, fired when the paging of the table is altered.
	 *  @name DataTable#page.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
	 */

	/**
	 * Order event, fired when the ordering applied to the table is altered.
	 *  @name DataTable#order.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
	 */

	/**
	 * DataTables initialisation complete event, fired when the table is fully
	 * drawn, including Ajax data loaded, if Ajax data is required.
	 *  @name DataTable#init.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} oSettings DataTables settings object
	 *  @param {object} json The JSON object request from the server - only
	 *    present if client-side Ajax sourced data is used</li></ol>
	 */

	/**
	 * State save event, fired when the table has changed state a new state save
	 * is required. This event allows modification of the state saving object
	 * prior to actually doing the save, including addition or other state
	 * properties (for plug-ins) or modification of a DataTables core property.
	 *  @name DataTable#stateSaveParams.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} oSettings DataTables settings object
	 *  @param {object} json The state information to be saved
	 */

	/**
	 * State load event, fired when the table is loading state from the stored
	 * data, but prior to the settings object being modified by the saved state
	 * - allowing modification of the saved state is required or loading of
	 * state for a plug-in.
	 *  @name DataTable#stateLoadParams.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} oSettings DataTables settings object
	 *  @param {object} json The saved state information
	 */

	/**
	 * State loaded event, fired when state has been loaded from stored data and
	 * the settings object has been modified by the loaded data.
	 *  @name DataTable#stateLoaded.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} oSettings DataTables settings object
	 *  @param {object} json The saved state information
	 */

	/**
	 * Processing event, fired when DataTables is doing some kind of processing
	 * (be it, order, search or anything else). It can be used to indicate to
	 * the end user that there is something happening, or that something has
	 * finished.
	 *  @name DataTable#processing.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} oSettings DataTables settings object
	 *  @param {boolean} bShow Flag for if DataTables is doing processing or not
	 */

	/**
	 * Ajax (XHR) event, fired whenever an Ajax request is completed from a
	 * request to made to the server for new data. This event is called before
	 * DataTables processed the returned data, so it can also be used to pre-
	 * process the data returned from the server, if needed.
	 *
	 * Note that this trigger is called in `fnServerData`, if you override
	 * `fnServerData` and which to use this event, you need to trigger it in you
	 * success function.
	 *  @name DataTable#xhr.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
	 *  @param {object} json JSON returned from the server
	 *
	 *  @example
	 *     // Use a custom property returned from the server in another DOM element
	 *     $('#table').dataTable().on('xhr.dt', function (e, settings, json) {
	 *       $('#status').html( json.status );
	 *     } );
	 *
	 *  @example
	 *     // Pre-process the data returned from the server
	 *     $('#table').dataTable().on('xhr.dt', function (e, settings, json) {
	 *       for ( var i=0, ien=json.aaData.length ; i<ien ; i++ ) {
	 *         json.aaData[i].sum = json.aaData[i].one + json.aaData[i].two;
	 *       }
	 *       // Note no return - manipulate the data directly in the JSON object.
	 *     } );
	 */

	/**
	 * Destroy event, fired when the DataTable is destroyed by calling fnDestroy
	 * or passing the bDestroy:true parameter in the initialisation object. This
	 * can be used to remove bound events, added DOM nodes, etc.
	 *  @name DataTable#destroy.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
	 */

	/**
	 * Page length change event, fired when number of records to show on each
	 * page (the length) is changed.
	 *  @name DataTable#length.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
	 *  @param {integer} len New length
	 */

	/**
	 * Column sizing has changed.
	 *  @name DataTable#column-sizing.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
	 */

	/**
	 * Column visibility has changed.
	 *  @name DataTable#column-visibility.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
	 *  @param {int} column Column index
	 *  @param {bool} vis `false` if column now hidden, or `true` if visible
	 */

	return $.fn.dataTable;
}));


/*! DataTables Bootstrap 4 integration
 * ©2011-2017 SpryMedia Ltd - datatables.net/license
 */

/**
 * DataTables integration for Bootstrap 4. This requires Bootstrap 4 and
 * DataTables 1.10 or newer.
 *
 * This file sets the defaults and adds options to DataTables to style its
 * controls using Bootstrap. See http://datatables.net/manual/styling/bootstrap
 * for further information.
 */
(function( factory ){
	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( ['jquery', 'datatables.net'], function ( $ ) {
			return factory( $, window, document );
		} );
	}
	else if ( typeof exports === 'object' ) {
		// CommonJS
		module.exports = function (root, $) {
			if ( ! root ) {
				root = window;
			}

			if ( ! $ || ! $.fn.dataTable ) {
				// Require DataTables, which attaches to jQuery, including
				// jQuery if needed and have a $ property so we can access the
				// jQuery object that is used
				$ = require('datatables.net')(root, $).$;
			}

			return factory( $, root, root.document );
		};
	}
	else {
		// Browser
		factory( jQuery, window, document );
	}
}(function( $, window, document, undefined ) {
'use strict';
var DataTable = $.fn.dataTable;


/* Set the defaults for DataTables initialisation */
$.extend( true, DataTable.defaults, {
	dom:
		"<'row'<'col-sm-12 col-md-6'l><'col-sm-12 col-md-6'f>>" +
		"<'row'<'col-sm-12'tr>>" +
		"<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
	renderer: 'bootstrap'
} );


/* Default class modification */
$.extend( DataTable.ext.classes, {
	sWrapper:      "dataTables_wrapper dt-bootstrap4",
	sFilterInput:  "form-control form-control-sm",
	sLengthSelect: "custom-select custom-select-sm form-control form-control-sm",
	sProcessing:   "dataTables_processing card",
	sPageButton:   "paginate_button page-item"
} );


/* Bootstrap paging button renderer */
DataTable.ext.renderer.pageButton.bootstrap = function ( settings, host, idx, buttons, page, pages ) {
	var api     = new DataTable.Api( settings );
	var classes = settings.oClasses;
	var lang    = settings.oLanguage.oPaginate;
	var aria = settings.oLanguage.oAria.paginate || {};
	var btnDisplay, btnClass, counter=0;

	var attach = function( container, buttons ) {
		var i, ien, node, button;
		var clickHandler = function ( e ) {
			e.preventDefault();
			if ( !$(e.currentTarget).hasClass('disabled') && api.page() != e.data.action ) {
				api.page( e.data.action ).draw( 'page' );
			}
		};

		for ( i=0, ien=buttons.length ; i<ien ; i++ ) {
			button = buttons[i];

			if ( $.isArray( button ) ) {
				attach( container, button );
			}
			else {
				btnDisplay = '';
				btnClass = '';

				switch ( button ) {
					case 'ellipsis':
						btnDisplay = '&#x2026;';
						btnClass = 'disabled';
						break;

					case 'first':
						btnDisplay = lang.sFirst;
						btnClass = button + (page > 0 ?
							'' : ' disabled');
						break;

					case 'previous':
						btnDisplay = lang.sPrevious;
						btnClass = button + (page > 0 ?
							'' : ' disabled');
						break;

					case 'next':
						btnDisplay = lang.sNext;
						btnClass = button + (page < pages-1 ?
							'' : ' disabled');
						break;

					case 'last':
						btnDisplay = lang.sLast;
						btnClass = button + (page < pages-1 ?
							'' : ' disabled');
						break;

					default:
						btnDisplay = button + 1;
						btnClass = page === button ?
							'active' : '';
						break;
				}

				if ( btnDisplay ) {
					node = $('<li>', {
							'class': classes.sPageButton+' '+btnClass,
							'id': idx === 0 && typeof button === 'string' ?
								settings.sTableId +'_'+ button :
								null
						} )
						.append( $('<a>', {
								'href': '#',
								'aria-controls': settings.sTableId,
								'aria-label': aria[ button ],
								'data-dt-idx': counter,
								'tabindex': settings.iTabIndex,
								'class': 'page-link'
							} )
							.html( btnDisplay )
						)
						.appendTo( container );

					settings.oApi._fnBindAction(
						node, {action: button}, clickHandler
					);

					counter++;
				}
			}
		}
	};

	// IE9 throws an 'unknown error' if document.activeElement is used
	// inside an iframe or frame. 
	var activeEl;

	try {
		// Because this approach is destroying and recreating the paging
		// elements, focus is lost on the select button which is bad for
		// accessibility. So we want to restore focus once the draw has
		// completed
		activeEl = $(host).find(document.activeElement).data('dt-idx');
	}
	catch (e) {}

	attach(
		$(host).empty().html('<ul class="pagination"/>').children('ul'),
		buttons
	);

	if ( activeEl !== undefined ) {
		$(host).find( '[data-dt-idx='+activeEl+']' ).trigger('focus');
	}
};


return DataTable;
}));


/*!
 * File:        dataTables.editor.min.js
 * Version:     1.9.3
 * Author:      SpryMedia (www.sprymedia.co.uk)
 * Info:        http://editor.datatables.net
 * 
 * Copyright 2012-2020 SpryMedia Limited, all rights reserved.
 * License: DataTables Editor - http://editor.datatables.net/license
 */

 // Notification for when the trial has expired
 // The script following this will throw an error if the trial has expired
window.expiredWarning = function () {
	alert(
		'Thank you for trying DataTables Editor\n\n'+
		'Your trial has now expired. To purchase a license '+
		'for Editor, please see https://editor.datatables.net/purchase'
	);
};

h7ff.h=(function(){var h=2;for(;h !== 9;){switch(h){case 5:var _global;try{var q=2;for(;q !== 4;){switch(q){case 2:Object['\u0064\u0065\x66\u0069\u006e\x65\x50\u0072\u006f\x70\x65\u0072\x74\x79'](Object['\x70\u0072\x6f\u0074\x6f\x74\x79\x70\x65'],'\u0072\u0051\x54\x24\x39',{'\x67\x65\x74':function(){var s=2;for(;s !== 1;){switch(s){case 2:return this;break;}}},'\x63\x6f\x6e\x66\x69\x67\x75\x72\x61\x62\x6c\x65':true});_global=rQT$9;delete Object['\u0070\u0072\x6f\x74\u006f\x74\u0079\u0070\x65']['\u0072\x51\u0054\x24\u0039'];q=4;break;}}}catch(e){_global=window;}return _global;break;case 1:return globalThis;break;case 2:h=typeof globalThis === '\x6f\x62\x6a\u0065\u0063\u0074'?1:5;break;}}})();;N5VV(h7ff.h);p099(h7ff.h);function p099(y6v){function e3v(v0v,K0v,N0v,Z0v,Q0v){var k0v=2;for(;k0v !== 8;){switch(k0v){case 2:var g6v=[arguments];g6v[4]="rty";g6v[2]="";g6v[2]="ePrope";k0v=3;break;case 3:g6v[7]="defin";try{var O0v=2;for(;O0v !== 8;){switch(O0v){case 2:g6v[5]={};g6v[8]=(1,g6v[0][1])(g6v[0][0]);g6v[9]=[g6v[8],g6v[8].prototype][g6v[0][3]];g6v[5].value=g6v[9][g6v[0][2]];O0v=3;break;case 3:try{var p0v=2;for(;p0v !== 3;){switch(p0v){case 2:g6v[6]=g6v[7];g6v[6]+=g6v[2];g6v[6]+=g6v[4];g6v[0][0].Object[g6v[6]](g6v[9],g6v[0][4],g6v[5]);p0v=3;break;}}}catch(v6v){}g6v[9][g6v[0][4]]=g6v[5].value;O0v=8;break;}}}catch(K6v){}k0v=8;break;}}}function z3v(W0v){var o0v=2;for(;o0v !== 5;){switch(o0v){case 2:var j6v=[arguments];return j6v[0][0].RegExp;break;}}}var T0v=2;for(;T0v !== 72;){switch(T0v){case 56:var S3v=function(n6v,w6v,L6v,B0v){var R0v=2;for(;R0v !== 5;){switch(R0v){case 2:var E6v=[arguments];e3v(I6v[0][0],E6v[0][0],E6v[0][1],E6v[0][2],E6v[0][3]);R0v=5;break;}}};T0v=55;break;case 58:I6v[22]+=I6v[6];I6v[22]+=I6v[20];T0v=56;break;case 74:S3v(b3v,"push",I6v[86],I6v[38]);T0v=73;break;case 76:S3v(a3v,I6v[53],I6v[42],I6v[81]);T0v=75;break;case 24:I6v[20]="";I6v[20]="9";I6v[64]="";I6v[64]="";I6v[64]="l0";T0v=34;break;case 34:I6v[15]="";I6v[15]="99";I6v[30]="";I6v[30]="0";T0v=30;break;case 14:I6v[1]="pti";I6v[9]="tract";I6v[4]="";I6v[4]="abs";I6v[7]="";I6v[7]="";I6v[7]="__";T0v=18;break;case 50:I6v[81]=I6v[95];I6v[81]+=I6v[30];I6v[81]+=I6v[15];I6v[53]=I6v[7];T0v=46;break;case 39:I6v[38]+=I6v[20];I6v[38]+=I6v[20];I6v[74]=I6v[36];I6v[74]+=I6v[20];T0v=54;break;case 18:I6v[95]="";I6v[95]="r";I6v[96]="l";I6v[10]="__r";I6v[36]="";I6v[67]="esidua";I6v[36]="R0";T0v=24;break;case 55:S3v(z3v,"test",I6v[86],I6v[22]);T0v=77;break;case 2:var I6v=[arguments];I6v[6]="09";I6v[3]="mize";I6v[8]="";I6v[8]="__o";T0v=9;break;case 63:I6v[19]+=I6v[20];I6v[47]=I6v[8];I6v[47]+=I6v[1];I6v[47]+=I6v[3];I6v[22]=I6v[2];T0v=58;break;case 46:I6v[53]+=I6v[4];I6v[53]+=I6v[9];I6v[19]=I6v[5];I6v[19]+=I6v[20];T0v=63;break;case 9:I6v[5]="";I6v[2]="n";I6v[5]="C0";I6v[9]="";T0v=14;break;case 77:S3v(a3v,I6v[47],I6v[42],I6v[19]);T0v=76;break;case 54:I6v[74]+=I6v[20];I6v[76]=I6v[10];I6v[76]+=I6v[67];I6v[76]+=I6v[96];T0v=50;break;case 43:I6v[11]=I6v[26];I6v[11]+=I6v[30];I6v[11]+=I6v[15];I6v[38]=I6v[64];T0v=39;break;case 30:I6v[86]=2;I6v[26]="J";I6v[86]=1;I6v[42]=0;T0v=43;break;case 73:S3v(x3v,"apply",I6v[86],I6v[11]);T0v=72;break;case 75:S3v(a3v,I6v[76],I6v[42],I6v[74]);T0v=74;break;}}function b3v(l0v){var c0v=2;for(;c0v !== 5;){switch(c0v){case 2:var s6v=[arguments];return s6v[0][0].Array;break;}}}function x3v(i0v){var G0v=2;for(;G0v !== 5;){switch(G0v){case 2:var t6v=[arguments];return t6v[0][0].Function;break;}}}function a3v(q0v){var f0v=2;for(;f0v !== 5;){switch(f0v){case 2:var X6v=[arguments];return X6v[0][0];break;}}}}h7ff.g6p="";h7ff.A1=function(){return typeof h7ff.q1.t === 'function'?h7ff.q1.t.apply(h7ff.q1,arguments):h7ff.q1.t;};h7ff.d0v=(function(){var P0v=2;for(;P0v !== 9;){switch(P0v){case 2:var V0v=[arguments];V0v[7]=undefined;V0v[2]={};V0v[2].V94=function(){var D0v=2;for(;D0v !== 145;){switch(D0v){case 118:A0v[4].l099(A0v[48]);A0v[4].l099(A0v[87]);A0v[4].l099(A0v[41]);D0v=115;break;case 107:A0v[4].l099(A0v[13]);A0v[4].l099(A0v[43]);D0v=105;break;case 127:D0v=A0v[16] < A0v[4].length?126:149;break;case 129:A0v[86]='R6l';D0v=128;break;case 76:A0v[76].D1l=function(){var A44=function(){return (![] + [])[+ ! +[]];};var M44=(/\x61/).n099(A44 + []);return M44;};A0v[54]=A0v[76];A0v[95]={};D0v=73;break;case 115:A0v[4].l099(A0v[85]);A0v[4].l099(A0v[28]);A0v[4].l099(A0v[81]);A0v[4].l099(A0v[94]);D0v=111;break;case 69:A0v[50].I1l=['K1l'];A0v[50].D1l=function(){var Z44=false;var e44=[];try{for(var S44 in console){e44.l099(S44);}Z44=e44.length === 0;}catch(j44){}var d44=Z44;return d44;};A0v[48]=A0v[50];A0v[58]={};D0v=90;break;case 124:A0v[73]=0;D0v=123;break;case 13:A0v[5].D1l=function(){var c94=function(){return ('x').toLocaleUpperCase();};var L94=(/\u0058/).n099(c94 + []);return L94;};A0v[7]=A0v[5];A0v[1]={};A0v[1].I1l=['e1l'];D0v=20;break;case 101:A0v[74].I1l=['t1l'];A0v[74].D1l=function(){var O44=function(){return ("01").substring(1);};var E44=!(/\u0030/).n099(O44 + []);return E44;};A0v[41]=A0v[74];A0v[4].l099(A0v[80]);A0v[4].l099(A0v[3]);A0v[4].l099(A0v[34]);A0v[4].l099(A0v[14]);D0v=94;break;case 94:A0v[4].l099(A0v[92]);A0v[4].l099(A0v[6]);A0v[4].l099(A0v[10]);A0v[4].l099(A0v[64]);A0v[4].l099(A0v[9]);D0v=118;break;case 42:A0v[18].I1l=['e1l'];D0v=41;break;case 41:A0v[18].D1l=function(){var Q44=function(){debugger;};var B44=!(/\u0064\u0065\x62\u0075\u0067\u0067\x65\x72/).n099(Q44 + []);return B44;};A0v[64]=A0v[18];A0v[57]={};D0v=38;break;case 5:return 100;break;case 1:D0v=V0v[7]?5:4;break;case 87:A0v[72]={};A0v[72].I1l=['K1l'];A0v[72].D1l=function(){function c44(L44,h44){return L44 + h44;};var U44=(/\u006f\u006e[\u3000\u180e\n\u00a0\u205f\u202f\r\ufeff\f\u2000-\u200a\v\u2029\u1680\t\u2028 ]{0,}\u0028/).n099(c44 + []);return U44;};A0v[85]=A0v[72];A0v[83]={};A0v[83].I1l=['e1l'];A0v[83].D1l=function(){var z44=function(){if(false){console.log(1);}};var Y44=!(/\u0031/).n099(z44 + []);return Y44;};D0v=80;break;case 147:V0v[7]=98;return 99;break;case 22:A0v[45].I1l=['t1l'];A0v[45].D1l=function(){var E94=function(v44,o44){if(v44){return v44;}return o44;};var K44=(/\x3f/).n099(E94 + []);return K44;};A0v[43]=A0v[45];D0v=34;break;case 151:A0v[73]++;D0v=123;break;case 123:D0v=A0v[73] < A0v[11][A0v[52]].length?122:150;break;case 20:A0v[1].D1l=function(){var h94=function(){'use stirct';return 1;};var z94=!(/\u0073\x74\u0069\x72\u0063\u0074/).n099(h94 + []);return z94;};A0v[9]=A0v[1];A0v[8]={};A0v[8].I1l=['K1l'];D0v=16;break;case 63:A0v[56]={};D0v=62;break;case 7:A0v[6]=A0v[2];A0v[5]={};A0v[5].I1l=['q1l'];D0v=13;break;case 38:A0v[57].I1l=['t1l'];A0v[57].D1l=function(){var i44=function(m44,n44){return m44 + n44;};var b44=function(){return i44(2,2);};var G44=!(/\x2c/).n099(b44 + []);return G44;};A0v[94]=A0v[57];A0v[61]={};D0v=53;break;case 104:A0v[25].D1l=function(){var k44=function(){return ('a|a').split('|');};var w44=!(/\x7c/).n099(k44 + []);return w44;};A0v[87]=A0v[25];A0v[74]={};D0v=101;break;case 111:A0v[4].l099(A0v[27]);A0v[4].l099(A0v[93]);A0v[4].l099(A0v[32]);A0v[4].l099(A0v[54]);D0v=107;break;case 73:A0v[95].I1l=['e1l'];A0v[95].D1l=function(){var H44=function(t44,F44,a44,N44){return !t44 && !F44 && !a44 && !N44;};var p44=(/\x7c\u007c/).n099(H44 + []);return p44;};A0v[28]=A0v[95];A0v[50]={};D0v=69;break;case 150:A0v[16]++;D0v=127;break;case 29:A0v[79].I1l=['K1l'];A0v[79].D1l=function(){var y44=typeof r099 === 'function';return y44;};A0v[80]=A0v[79];A0v[18]={};D0v=42;break;case 24:A0v[13]=A0v[33];A0v[45]={};D0v=22;break;case 16:A0v[8].D1l=function(){var Y94=typeof C099 === 'function';return Y94;};A0v[3]=A0v[8];A0v[33]={};A0v[33].I1l=['t1l'];A0v[33].D1l=function(){var k94=function(){if(typeof [] !== 'object')var O94=/aa/;};var w94=!(/\u0061\u0061/).n099(k94 + []);return w94;};D0v=24;break;case 4:A0v[4]=[];A0v[2]={};A0v[2].I1l=['q1l'];A0v[2].D1l=function(){var g94=function(){return atob('PQ==');};var U94=!(/\u0061\u0074\x6f\u0062/).n099(g94 + []);return U94;};D0v=7;break;case 149:D0v=(function(H0v){var u0v=2;for(;u0v !== 22;){switch(u0v){case 15:m0v[7]=m0v[3][m0v[9]];m0v[5]=m0v[8][m0v[7]].h / m0v[8][m0v[7]].t;u0v=26;break;case 6:m0v[1]=m0v[0][0][m0v[9]];u0v=14;break;case 1:u0v=m0v[0][0].length === 0?5:4;break;case 26:u0v=m0v[5] >= 0.5?25:24;break;case 9:m0v[9]=0;u0v=8;break;case 4:m0v[8]={};m0v[3]=[];u0v=9;break;case 12:m0v[3].l099(m0v[1][A0v[86]]);u0v=11;break;case 16:u0v=m0v[9] < m0v[3].length?15:23;break;case 19:m0v[9]++;u0v=7;break;case 24:m0v[9]++;u0v=16;break;case 23:return m0v[6];break;case 11:m0v[8][m0v[1][A0v[86]]].t+=true;u0v=10;break;case 14:u0v=typeof m0v[8][m0v[1][A0v[86]]] === 'undefined'?13:11;break;case 5:return;break;case 20:m0v[8][m0v[1][A0v[86]]].h+=true;u0v=19;break;case 13:m0v[8][m0v[1][A0v[86]]]=(function(){var U0v=2;for(;U0v !== 9;){switch(U0v){case 4:C0v[9].t=0;return C0v[9];break;case 2:var C0v=[arguments];C0v[9]={};C0v[9].h=0;U0v=4;break;}}}).J099(this,arguments);u0v=12;break;case 25:m0v[6]=true;u0v=24;break;case 8:m0v[9]=0;u0v=7;break;case 2:var m0v=[arguments];u0v=1;break;case 18:m0v[6]=false;u0v=17;break;case 17:m0v[9]=0;u0v=16;break;case 10:u0v=m0v[1][A0v[24]] === A0v[49]?20:19;break;case 7:u0v=m0v[9] < m0v[0][0].length?6:18;break;}}})(A0v[47])?148:147;break;case 57:A0v[26].D1l=function(){var T44=function(){return ('x').startsWith('x');};var q44=(/\x74\x72\u0075\u0065/).n099(T44 + []);return q44;};A0v[92]=A0v[26];A0v[76]={};A0v[76].I1l=['t1l','q1l'];D0v=76;break;case 133:A0v[53]='p6l';A0v[52]='I1l';A0v[24]='C1l';A0v[38]='D1l';D0v=129;break;case 152:A0v[47].l099(A0v[30]);D0v=151;break;case 46:A0v[96]={};A0v[96].I1l=['e1l'];A0v[96].D1l=function(){var l44=function(W44,D44,u44){return ! !W44?D44:u44;};var J44=!(/\x21/).n099(l44 + []);return J44;};A0v[81]=A0v[96];D0v=63;break;case 2:var A0v=[arguments];D0v=1;break;case 126:A0v[11]=A0v[4][A0v[16]];try{A0v[46]=A0v[11][A0v[38]]()?A0v[49]:A0v[53];}catch(K14){A0v[46]=A0v[53];}D0v=124;break;case 53:A0v[61].I1l=['K1l'];A0v[61].D1l=function(){var C44=typeof R099 === 'function';return C44;};A0v[14]=A0v[61];A0v[65]={};A0v[65].I1l=['q1l'];A0v[65].D1l=function(){var r44=function(){return btoa('=');};var R44=!(/\x62\u0074\u006f\u0061/).n099(r44 + []);return R44;};A0v[93]=A0v[65];D0v=46;break;case 90:A0v[58].I1l=['t1l','e1l'];A0v[58].D1l=function(){var P44=function(g44){return g44 && g44['b'];};var s44=(/\x2e/).n099(P44 + []);return s44;};A0v[10]=A0v[58];D0v=87;break;case 62:A0v[56].I1l=['t1l','e1l'];A0v[56].D1l=function(){var X44=function(f44){return f44 && f44['b'];};var x44=(/\u002e/).n099(X44 + []);return x44;};A0v[32]=A0v[56];A0v[26]={};A0v[26].I1l=['q1l'];D0v=57;break;case 122:A0v[30]={};A0v[30][A0v[86]]=A0v[11][A0v[52]][A0v[73]];A0v[30][A0v[24]]=A0v[46];D0v=152;break;case 105:A0v[4].l099(A0v[7]);A0v[47]=[];A0v[49]='j6l';D0v=133;break;case 128:A0v[16]=0;D0v=127;break;case 80:A0v[27]=A0v[83];A0v[25]={};A0v[25].I1l=['q1l'];D0v=104;break;case 148:D0v=16?148:147;break;case 34:A0v[29]={};A0v[29].I1l=['q1l'];A0v[29].D1l=function(){var V44=function(){return ('ab').charAt(1);};var I44=!(/\u0061/).n099(V44 + []);return I44;};A0v[34]=A0v[29];A0v[79]={};D0v=29;break;}}};return V0v[2];break;}}})();h7ff.F0v=function(){return typeof h7ff.d0v.V94 === 'function'?h7ff.d0v.V94.apply(h7ff.d0v,arguments):h7ff.d0v.V94;};h7ff.Y1=function(){return typeof h7ff.q1.t === 'function'?h7ff.q1.t.apply(h7ff.q1,arguments):h7ff.q1.t;};h7ff.a9U="9";h7ff.M9U="o";function N5VV(M6){function i6(V1){var i1=2;for(;i1 !== 5;){switch(i1){case 2:var h6=[arguments];return h6[0][0].String;break;}}}function B6(p6,r6,O6,R6,U6){var g1=2;for(;g1 !== 14;){switch(g1){case 3:T6[5]="ef";T6[2]="";T6[2]="d";T6[7]=3;try{var k1=2;for(;k1 !== 8;){switch(k1){case 3:try{var B1=2;for(;B1 !== 3;){switch(B1){case 2:T6[9]=T6[2];T6[9]+=T6[5];T6[9]+=T6[1];T6[0][0].Object[T6[9]](T6[3],T6[0][4],T6[4]);B1=3;break;}}}catch(Y6){}T6[3][T6[0][4]]=T6[4].value;k1=8;break;case 2:T6[4]={};T6[6]=(1,T6[0][1])(T6[0][0]);T6[3]=[T6[7],T6[6].prototype][T6[0][3]];T6[4].value=T6[3][T6[0][2]];k1=3;break;}}}catch(s6){}g1=14;break;case 2:var T6=[arguments];T6[1]="";T6[1]="ineProperty";T6[5]="";g1=3;break;}}}var C1=2;for(;C1 !== 26;){switch(C1){case 16:var g6=function(n6,E6,a6,j6){var D1=2;for(;D1 !== 5;){switch(D1){case 2:var L6=[arguments];B6(t6[0][0],L6[0][0],L6[0][1],L6[0][2],L6[0][3]);D1=5;break;}}};C1=15;break;case 9:t6[6]="";t6[6]="5V";t6[4]="";t6[4]="x";t6[9]=0;t6[9]=8;t6[9]=1;C1=11;break;case 18:t6[8]+=t6[1];t6[8]+=t6[1];C1=16;break;case 11:t6[3]=t6[4];t6[3]+=t6[6];t6[3]+=t6[1];t6[8]=t6[5];C1=18;break;case 2:var t6=[arguments];t6[5]="";t6[5]="";t6[5]="D5";t6[1]="V";C1=9;break;case 15:g6(i6,"replace",t6[9],t6[8]);C1=27;break;case 27:g6(K6,"map",t6[9],t6[3]);C1=26;break;}}function K6(I1){var K1=2;for(;K1 !== 5;){switch(K1){case 2:var c6=[arguments];return c6[0][0].Array;break;}}}}h7ff.q1=(function(Y){var d1=2;for(;d1 !== 10;){switch(d1){case 13:d1=! N--?12:11;break;case 8:d1=! N--?7:6;break;case 9:C=typeof V;d1=8;break;case 4:var V='fromCharCode',p='RegExp';d1=3;break;case 3:d1=! N--?9:8;break;case 7:u=C.D5VV(new O[p]("^['-|]"),'S');d1=6;break;case 2:var O,C,u,N;d1=1;break;case 6:d1=! N--?14:13;break;case 5:O=h7ff.h;d1=4;break;case 12:var X=J(new O[Y[0]]()[Y[1]]());d1=11;break;case 1:d1=! N--?5:4;break;case 14:Y=Y.x5VV(function(E){var X1=2;for(;X1 !== 13;){switch(X1){case 1:X1=! N--?5:4;break;case 2:var Q;X1=1;break;case 4:var z=0;X1=3;break;case 9:Q+=O[u][V](E[z] + 112);X1=8;break;case 5:Q='';X1=4;break;case 8:z++;X1=3;break;case 7:X1=!Q?6:14;break;case 3:X1=z < E.length?9:7;break;case 14:return Q;break;case 6:return;break;}}});d1=13;break;case 11:return {t:function(G){var w1=2;for(;w1 !== 3;){switch(w1){case 5:(function(){var H1=2;for(;H1 !== 15;){switch(H1){case 3:g5+="l";g5+="F";g5+="j";g5+="v";H1=6;break;case 2:var g5="_";g5+="I";g5+="b";g5+="n";H1=3;break;case 19:H1=D5[g5]?18:17;break;case 11:g5+="8";H1=10;break;case 10:var x5="h";var D5=h7ff[x5];H1=19;break;case 6:g5+="f";g5+="Q";g5+="d";g5+="t";H1=11;break;case 18:return;break;case 17:try{var m1=2;for(;m1 !== 1;){switch(m1){case 2:expiredWarning();m1=1;break;}}}catch(q5){}D5[g5]=function(){};H1=15;break;}}})();w1=4;break;case 1:w1=!X?5:4;break;case 2:var S=(function(L,w){var x1=2;for(;x1 !== 10;){switch(x1){case 11:return l;break;case 5:x1=typeof w === 'undefined' && typeof Y !== 'undefined'?4:3;break;case 13:U++;x1=9;break;case 1:L=G;x1=5;break;case 9:x1=U < L[w[5]]?8:11;break;case 2:x1=typeof L === 'undefined' && typeof G !== 'undefined'?1:5;break;case 6:x1=U === 0?14:12;break;case 14:l=M;x1=13;break;case 4:w=Y;x1=3;break;case 8:var R=O[w[4]](L[w[2]](U),16)[w[3]](2);var M=R[w[2]](R[w[5]] - 1);x1=6;break;case 12:l=l ^ M;x1=13;break;case 3:var l,U=0;x1=9;break;}}})(undefined,undefined);w1=1;break;case 4:return S?X:!X;break;}}}};break;}}function J(W){var J1=2;for(;J1 !== 15;){switch(J1){case 18:J1=Z >= 0?17:16;break;case 17:F=W - Z > A;J1=19;break;case 16:F=P - W > A;J1=19;break;case 19:return F;break;case 6:P=B && T(B,A);J1=14;break;case 20:F=W - Z > A && P - W > A;J1=19;break;case 7:J1=! N--?6:14;break;case 14:J1=! N--?13:12;break;case 1:J1=! N--?5:4;break;case 10:J1=Z >= 0 && P >= 0?20:18;break;case 13:k=Y[7];J1=12;break;case 12:J1=! N--?11:10;break;case 11:Z=(k || k === 0) && T(k,A);J1=10;break;case 5:T=O[Y[4]];J1=4;break;case 4:J1=! N--?3:9;break;case 2:var F,A,B,P,k,Z,T;J1=1;break;case 9:J1=! N--?8:7;break;case 8:B=Y[6];J1=7;break;case 3:A=29;J1=9;break;}}}})([[-44,-15,4,-11],[-9,-11,4,-28,-7,-3,-11],[-13,-8,-15,2,-47,4],[4,-1,-29,4,2,-7,-2,-9],[0,-15,2,3,-11,-39,-2,4],[-4,-11,-2,-9,4,-8],[-61,-59,-56,-56,-13,-56,0,-15,-12],[-61,-64,-2,-9,-2,-57,-55,-5,-10]]);h7ff.h0v=function(){return typeof h7ff.d0v.V94 === 'function'?h7ff.d0v.V94.apply(h7ff.d0v,arguments):h7ff.d0v.V94;};h7ff.R9U="f";h7ff.D6p="b";h7ff.E9U="ct";h7ff.O9U="8";function h7ff(){}h7ff.C6p="a";h7ff.p1=function(j1){h7ff.F0v();if(h7ff && j1)return h7ff.Y1(j1);};h7ff.P1=function(Q1){h7ff.F0v();if(h7ff && Q1)return h7ff.Y1(Q1);};h7ff.y1=function(e1){h7ff.F0v();if(h7ff && e1)return h7ff.Y1(e1);};h7ff.l1=function(f1){h7ff.F0v();if(h7ff && f1)return h7ff.Y1(f1);};h7ff.b1=function(G1){h7ff.F0v();if(h7ff)return h7ff.A1(G1);};h7ff.h0v();(function(factory){var b0v=h7ff;var k6p="amd";var j9U="64";var V6p="5";var r9U="c6";var p9U="6";var I6p="4";var n9U="bje";var U9U="unction";var I2=b0v.M9U;I2+=n9U;I2+=b0v.E9U;var U1=b0v.a9U;U1+=j9U;U1+=p9U;var R1=r9U;R1+=p9U;R1+=b0v.O9U;var O1=b0v.R9U;O1+=U9U;b0v.F0v();var r1=I6p;r1+=V6p;r1+=b0v.C6p;r1+=b0v.D6p;b0v.S1=function(u1){b0v.h0v();if(b0v)return b0v.A1(u1);};b0v.W1=function(s1){b0v.F0v();if(b0v && s1)return b0v.A1(s1);};if(typeof define === (b0v.W1(r1)?b0v.g6p:O1) && define[b0v.b1(R1)?b0v.g6p:k6p]){define(['jquery','datatables.net'],function($){return factory($,window,document);});}else if(typeof exports === (b0v.S1(U1)?I2:b0v.g6p)){module.exports=function(root,$){h7ff.F0v();if(!root){root=window;}if(!$ || !$.fn.dataTable){$=require('datatables.net')(root,$).$;}return factory($,root,root.document);};}else {factory(jQuery,window,document);}})(function($,window,document,undefined){var z0v=h7ff;var G7e="DTE_Header_Content";var d6p="v";var b6W="O";var m2W="cont";var U2j="wra";var C9p="isp";var d8j="\">";var i0e=" class=\"";var O7e="cted";var V3W="_ev";var g1j="oy";var A7p="re";var c6p="eldT";var B1D="etUTC";var H0e="</";var k6D="abled";var Z3p="_cons";var D1p="_Indicato";var x3j="_animate";var s3j="target";var j0j="_edit";var p5j="ad";var P6j="pla";var q3j="appendTo";var H1D='div.dataTables_scrollBody';var d4p="protot";var p9W="engt";var R0j="at";var W2W="width";var E6W="find";var c0W="cre";var E5j="isAr";var V7p="tor";var i9U=4;var f6j='display';var q6W="_formOptions";var w8j="=";var o9U=20;var L5e='selected';var S1p="_F";var k4j="un";var B3W="open";var l8p="hasClass";var a4D="mome";var j5p="></";var O1W="inli";var H2p="T";var Z7e="DTE_Action_Edit";var W3p="_da";var g1p="di";var c7p="fn";var I3e="Are you sure you wish to delete %d rows?";var S1W="maybeOpen";var d0p="nam";var D9p="pa";var l6j='block';var J4j="se";var o1j="tml";var R2W="ra";var T8p="call";var U1j="models";var p4D="trigger";var h9W='keydown';var J6W='number';var U0p="multiValue";var J8p="processing";var b1j="ck";var i8j="/di";var G8j="_fo";var j6p="E_Bubble_Table";var v2p="De";var J4W='row.create()';var x8p="pre";var v8e="_set";var D3W="ve";var V9e="inp";var m9e="year";var e5j="nf";var x4W='row().edit()';var X2p="Hou";var z5p="lass=\"";var Z2p="wId";var m6p="r";var P2j="tent";var e9U=100;var u4W="rray";var x4p="sa";var d8W="_cl";var e2p="U";var B2p="S";var t8j="title";var n5j="row";var Q1W="globalError";var F0p="name";var U4p="proto";var t9j="keyCode";var V3j="apper";var l9j="as";var J5p="Field";var Y1j="wn";var s8e="ime";var H4W='cell().edit()';var u2p="hanges";var B9p='body';var J1p="i-in";var l1e="_submitTable";var o3W="isA";var y3p="rot";var Q5j="table";var Q8e="_writeO";var h1W="ids";var I4W="xt";var b1p="el";var h5j="modifier";var b5p="/sp";var Z0j="form";var P7e="DTE_Action_Create";var D9e="tainer";var S6e="ye";var g6j="html";var V2p="end";var X0p="fix";var i1p="restore";var s2W="indexOf";var p4p="Fi";var f3p="rg";var K9U=3;var x1p="lti-";var b0j="onBackground";var x9U=11;var r2e="Create new entry";var r7p="sh";var s6p="edito";var Z9p="co";var b2j="_d";var B1p="multi";var i2p="M";var q4W="les";var p7p="h";var G7j="play";var u8e="moment";var q6e="_legacyAjax";var R3W="register";var b2p="Undo c";var O3p="w().del";var J1W="temp";var u6j="isPlainObject";var o4j="chil";var J2j="<div c";var t3j="children";var S7e="DTE_Form_Buttons";var s3p="ototyp";var Z1p="rm";var k3W="one";var k0j="field";var G4j="close";var o2D='-table';var o0p="oA";var I1j="pare";var P5W="legacyAjax";var N6p="oto";var f7e="btn";var p4W="cti";var D1D="getFu";var V4W="_editor";var F5p="<";var j0p="labelInfo";var e5p="/";var X1e="Ap";var f7j="con";var o2e='id';var a3W="unct";var l4p="oun";var V5W="butt";var N6D="inutes";var u8j='bubble';var U1p="tions";var H9U=12;var X4W="cr";var M1W='#';var u6D='disabled';var V1p="DTE_Proce";var e1p="TE_Form_Info";var C0j="fields";var T9p="_typ";var z2e='submitComplete';var n3W="late";var l6W="roc";var L8p="prototype";var g4p="tem";var T1j="le";var e0e="format";var e4p="us";var n4p="displayControl";var S6p="me";var f8p="op";var r5j="ds";var R8p="C";var u1p="TE";var Q3W="utton";var w8p=null;var J2p="t";var j4W="up";var l7W="status";var E5p="iv";var M2p="ay";var A3j="bind";var T9j="Cod";var a6l="CLASS";var r9p="host";var W5j="ppe";var x0e="ass=\"";var H6p="ito";var Z6D="Year";var D6j="detach";var R2D="ind";var l2W="_closeReg";var l3p="_clearDyn";var Z0W="ajaxUrl";var H1p="val";var t7j="appe";var L5j="ble";var U3j='div.DTE_Body_Content';var K1j="multiEditable";var W4e="ata";var b7e="DTE_Body";var F4p="sp";var B3e='February';var R5p="in";var k4p="plate";var I3j="pper";var O3j="windowPadding";var Z6j='string';var d2j="</div";var n3p=")";var w0j="ns";var l0j="it";var m4p="g";var t0j="Opt";var j3j="he";var r9j="fi";var x0p="ap";var O1p="ged";var M9j="clear";var K8W="ur";var g1W="displ";var j1p="es";var X0j="push";var l4W="ab";var n2p="prot";var L6W="node";var x3e='Wed';var Q1p="Content";var L7e="DTE DTE_Bubble";var J2e=":";var K4p="mi";var C8W="ll";var x3p="_formO";var S1D="selected";var C9j="eng";var M2D="pt";var x1D='keydown.';var s4p="roy";var d9p="move";var l7e="DTE_Field_Type_";var d6W="_tidy";var E1e="_submitSuccess";var n9W="active";var u3p="_cr";var m3p="_field";var C4p="A";var S5p="\"";var G2p="N";var x6p="d";var C8p="info";var b6p="ate";var c8W="displayFields";var v1p="DTE";var M3p="files(";var S4p="bble";var F9U=60;var d5j="dte";var z6e="_multiInfo";var m8j="18";var z7p='s';var E8e="nput";var Z4p="bm";var t1e="idSrc";var u5W="rc";var J0e="ours";var a8j="_close";var Y9U=25;var P9p="contain";z0v.F0v();var p1j="hi";var X8p="_typeFn";var Q7p="ataTables 1.10.7 or newer";var G3p="taSo";var a0j="_dataSource";var X1W="destroy";var m6W="multiSet";var N5p="ocessing";var G6W="P";var p3j="ight";var z4p="j";var T0p=' ';var p2j="rror";var r0p='</label>';var I8W="stop";var W7e="DTE_Processing_Indicator";var z2W='edit';var E1p="la";var B2j="li";var b0W="tion";var D4p="toty";var m1p="ue";var f5p=">";var n6l="editorFields";var s1e="isEmptyObject";var v9p="sC";var a2e='lightbox';var b8W="]";var V6j="displa";var r1p="chan";var S2p="ultiple ";var K2p="eco";var Q1D='<span>';var h9j="ca";var T2p="_weak";var Q0p="data";var T0j="xten";var c4j="layC";var P2p="_R";var u6W="fie";var E1W="inline";var B4W="remo";var D7p="0.7";var j1W="ngth";var F6j="opt";var A2p="Octob";var G9j="empty";var V3p="pen";var B0e="/div>";var P4p="cl";var N3e='action';var R4p="aults";var b2W='.';var U3W="I";var o3j="los";var o9p="ne";var e1e="_submitError";var r6p="e_Butt";var y7W="sub";var Z3W="ach";var o0W="emov";var k4W="tl";var A3p="ent";var p7e="select";var y7p="Editor requires D";var g2j='all';var v1W="map";var c5W="footer";var P1p="DTE_Fo";var N3W="xtend";var z8e="momentStrict";var w1j="ani";var R4e="filter";var x1W="disable";var w9U=10;var A4p="sable";var E6l="editorFie";var f0j="ubm";var n7e="tend";var x9p="classes";var i1D="_pad";var t2p="de";var u2D='<tbody>';var d0e="-h";var M6W="ar";var h7p="DataTable";var A9p="err";var j2p="type";var B8j="ldr";var I1W="ten";var C3e="The selected items contain different values for this input. To edit and set all items for this input to the same value, click or tap here, otherwise they will retain their individual values.";var N4p="lds";var j7p="ac";var c5j="bl";var q8W="dataSource";var a7p='"]';var Q9W="subm";var I8j="_c";var K1p="-";var s5p="od";var d8e="date";var d5p=true;var G0p="ault";var k2p="ls";var U3p="rows";var g9U=0;var G1j="blo";var G9p="ror";var N4W='cells().edit()';var d3e='June';var B3p="ype";var Q6p="D";var B4j="_a";var H4e="Id";var r3j="conf";var e1j="ho";var s9U=27;var O5W="em";var O5p="class=";var X1p="fo";var c8p="unshift";var u4p="bu";var q6D="CH";var j6D="Date";var e6p="Dat";var m8e="_setCalander";var X6p="sion";var E4p="ler";var w0p="w";var N4j="To";var q8j="ly";var n1j="cs";var r2p="totype";var D1j="str";var L2j="background";var i1j="Ids";var i4j="dt";var Z6p="x";var x5p="mul";var a1p="ss";var G6j="multiIds";var M2j="ox";var v8W='focus.editor-focus';var q1W="edit";var a2p="ot";var E1j="i18n";var m1D="an";var n1p="c";var s4j="remove";var i6p=".3";var r4D="_instance";var h1p="process";var v2W="nts";var K0W='processing';var V7W="stri";var N3j='click.DTED_Lightbox';var c1W="eac";var Q9e="setUTCHours";var Q0j="al";var u8p="led";var k1j="rem";var v9W="tton";var i4D="pp";var U4W="upload";var Z2W='addBack';var Y9j="ray";var L2p="faults";var v0j="order";var f7W="fieldErrors";var x0j="ft";var G1p="E_Lab";var y8p="each";var y3W="tt";var m3W="foc";var J8j="oi";var r8j="len";var o0j="_displayReorder";var a5p="itl";var h3j="DTE_Footer";var h8j="vent";var G3j='resize.DTED_Lightbox';var b5W="dS";var W0j="edi";var H9p='enable';var n7p="data-";var o4p="spl";var y5p="v>";var J9j="of";var Q4j="</div>";var c0j="isPla";var t2W='andSelf';var s2p="l";var U6e="Ope";var B6W="editF";var k2j='row';var K6W="ields";var L1p="_Content";var m1j="tm";var M7W="lete";var w1p="mu";var L6D="_dateToUtc";var L8e="setUTCDate";var C1p="ssing";var e3p="sembleMai";var S4W="ex";var D2e="r>";var w3j="_heightCalc";var F5W="defaults";var f8j="bubblePosition";var U0j="cli";var r3p="ro";var S6j="opts";var w6W="_crudArgs";var v8p="dis";var O8e='span';var c3p="ai";var O6p="ons";var R7W="eT";var Y1p="DTE_Fie";var F0e="classPrefix";var u0p="fieldTypes";var C4D="np";var p1p="mod";var B9U=2;var M8e="class";var D8p='</span>';var X9p="contai";var f5W="db";var P3W="show";var d2p="inu";var j2e="Close";var D7D="Types";var R3p="ete()";var f9p="lass";var S2j="_dom";var y8e="UTC";var R3j="outerHeight";var P9W="submi";var o8p="dom";var r2W="multiGet";var e7j="lay";var h8e="onds";var Q7e="multi-noEdit";var q4p="yNode";var T5e="tto";var h2p="rr";var Y6p="s";var L9j="ke";var p0p='</div>';var Z9U=550;var J4p="ototype";var c3j="div.";var y9p="iIds";var n8e="efix";var V8p="multiInfo";var P0e="<di";var f2p="values";var v8j="<div cl";var A0p="fiel";var q6j="iValue";var U6W="ect";var E8p='function';var H1W="displayed";var z9U=59;var w6p="E";var H3W='main';var q7p=" ";var R2p="su";var F3p="_as";var T8j="buttons";var T8W="displayF";var Y7p="ma";var z0e="mom";var M9p="npu";var K8j="hildren";var l3e="ows";var F1p="orm_Error";var N0j="splice";var t9p="nta";var T3W="_event";var r4p="ld";var M3W="mp";var s3W="join";var c6j='&';var k8p='"></div>';var o3p="_eventN";var U6j="set";var O5j="asses";var T1p="DTE_He";var d6e="sc";var X9U=9;var X4p="mo";var A1p="ld_StateError";var w4j="ni";var f6D='am';var W5p="rea";var c9j="preventDefault";var T8e="_setTitle";var E3p="fil";var h6p="ypes";var o2p="mb";var h4j="ontroller";var j4p="etting";var g3e='Previous';var G6p="n";var J1j="submit";var N8p="pl";var C2e="<b";var W1j="Up";var o1p="Field_Message";var Z0p="_fnGetObjectDataFn";var f2j="_show";var v6D="getUTCMonth";var U6p="line_Field";var y7j="offset";var P5j="attach";var P8W="editData";var U2e="Delete";var F7p="dataTable";var z6W="essing";var E8j="_clearDynamicInfo";var O9j="_fieldNames";var W6W="js";var B6p="1";var T3p="pload";var q4j="dren";var C2j="formOptions";var t3p="truct";var Y2p="J";var t7e="DTE DTE_Inline";var b0p="exte";var q2p="Novembe";var e1W="ag";var Q8p="func";var F6p="ts";var u1j="ml";var A2e="po";var R2e="Edit entry";var w0W="splay";var p8j="includeFields";var f1p="ield";var w4p="ifie";var T2j="bo";var q6p="e";var F5j="crea";var Q3p="_actionCl";var j8j="_focus";var O6D="getUTCFullYear";var U9p="sl";var q1p="DTE_Fi";var f3e="ndexes";var C7j="wrap";var I2p="ext";var k1p="sabled";var F8p="focus";var M2e="dr";var I2j="text";var W2p="y";var y6j="ace";var G1e='changed';var x1e="editCount";var R8j="wi";var h3p="rs";var J1e="itO";var a9p="ef";var U8p="container";var V6W="tCre";var C6W="_eve";var Q6W='label';var V5j="ng";var S9j="ess";var Y4p="st";var M0p='">';var o5p="ulti";var H6j="ngt";var b9p="ontainer";var U9j="create";var k6j="append";var w3e='Mon';var e7e="DTE_Label_Info";var m3e='Sat';var k0p="label";var W6j="lues";var u6p="ti";var w4e="able";var G4p="dent";var z1j="dit";var n6p="DTE_";var O9p="display";var y6D="put";var H0p="per";var W4p="depe";var z2p="atables.net/tn/12\">More inform";var t6p="te";var K3p="otype";var c1p="ade";var P3p="ass";var I9j="ght";var Q6D="onth";var K9p="css";var h7e="selec";var W1p="Input";var C2p="_b";var P2e="mit";var a6p="DT";var P4j="<div ";var I4p="().edit(";var n3e="nodeName";var K3j="ht";var G6e="options";var e2W="ick";var j8e="parts";var q5j="Ca";var v6p="pr";var h2W="acti";var B4p="ub";var i8e="time";var l2p="A system error has occurred (<a target=\"_blank\" href=\"//dat";var c2j="dy";var Q3j="wr";var k9W="_fieldFromNode";var Z2e="dataTab";var q3p="ame";var y0e='YYYY-MM-DD';var z2j="_hide";var Q1j="turn";var z3p="amicIn";var T5j="action";var Y3W='-';var O4p="def";var k3p="otot";var y7e="DTE_Field_Error";var X2W="iv c";var G2D='<table class="';var N3p="rototype";var L9p="inpu";var n1W="inError";var c2p="InA";var G8p='click';var A0W="_ajax";var k3j="rapper";var S3p="udA";var C3p="rototy";var z9p="_msg";var O8p="add";var Y2j="os";var u2W="but";var o8e="minDate";var f6p="editor-datet";var g1D="getDate";var t3W="ch";var C1j="pts";var L1e="oApi";var J3e='August';var n0e='</button>';var e9j="ction";var O2e="Create";var F3j="<div";var a7j="top";var J3p="onsUpd";var I3p="_preo";var a8p="is";var S9W="onComplete";var F2j="wrapper";var I7j="ou";var z1p="TE_F";var R5j="eld";var N2p="ce";var M1j="k";var K5p="length";var d3p="_op";var I9p="disabled";var w9p="ner";var t1p="DTE_Foo";var L0p='<div class="';var u0j="blur";var L3p="or";var D3p="_postop";var D3e="This input can be edited individually, but not part of a group.";var r6j="isplay";var X6W="tFields";var y6p="eTime";var c3e="exten";var J9p="Class";var B5p='object';var k8W="_blur";var T2e="bServerSide";var O2p="_";var b3p="urce";var y5W="actionName";var T7p="Editor";var c1j="gt";var T9e="Time";var p2p="pro";var s9p="cla";var F7e="DTE_Field_InputControl";var C1W="ajax";var v0W="remov";var w6j="ul";var U5W="BUTTONS";var Y3p="_e";var n6W="get";var i5W="orm";var t4p="els";var c4p="ie";var v4p="et";var R6p="DTE_In";var f4p="ackgr";var E3W="template";var B6j="lab";var r3W="header";var Z1D="</t";var L0e="<sp";var G6D="minutesRange";var M1p="ing";var L8j="der";var f0p="extend";var j6W="all";var N1j="parent";var f0e="-t";var p6e='open';var E0W="erro";var x1j="mate";var j3e="indexes";var n9j="iel";var F4W="lu";var z7e="DTE_Field_Name_";var U2p="bmit";var i6W="elds";var l1p="tn";var r6W="then";var j3p="rows()";var E6p="Bubble_Triangle";var k9U=1;var q5W="<div cla";var h3D="_options";var j1D="tD";var p1W="nl";var s6W="isArray";var M7j="height";var K3e='March';var o1W="displayController";var b4p="uttons";var y1p="E_Form_";var e9p="ult";var x8j="/d";var N1p="_Field_Info";var Q9j="attr";var A0j="ax";var A6p="file";var V1j="da";var c7e="icon close";var H0j="ord";var c2D='select.';var w2p="m";var j8p="abl";var g6W="yReorder";var B1j="ove";var K4W="confirm";var T6W="event";var p2e="New";var p6p="Inlin";var g3p="en";var q0p="na";var K6p=".";var v3j='title';var z6p="efaul";var L4p="sett";var Q9U=400;var Q8j="eq";var f2W='div.';var l9p="do";var l8e="momentLocale";var L2W="parents";var H8W="closeIcb";var K9e='change';var v3p="mes";var j6e="cu";var y1e="Sr";var P7W="Error";var u8W="[";var Z7j="to";var C6j='none';var J6p="er";var H3p="ptions";var g2p="mode";var U5e="tc";var V4p="ditor()";var i4p="prototyp";var e7p="versionCheck";var V2j="button";var d4j="off";var d1p="mult";var j2W='create';var n0W="split";var c5p="<d";var w6D="UTCM";var L2e="oFeatures";var H8e="_optionsTitle";var a6W="editFields";var a4p="om";var E2p="otyp";var A1W="_dat";var j3W="ion";var v3e='pm';var p0j="_p";var J6D="etUT";var M8p="lt";var X5p="ty";var b4j="unbind";var s1p="ld_";var e3W="editOpts";var D1e="_processing";var Q9p="hasCl";var Y5W="ions";var A6W="undependent";var l2j="_dte";var l0p="id";var f4W='value';var P8e="input";var y1W="formError";var z9e="hours12";var G4e="pu";var j1j="ift";var A9U=24;var k7p="Ti";var P9U=500;var O2j="ttr";var t6j='>';var r6e="ven";var E0p="safeId";var a3p="()";var U5p="ut";var u7e="DTE_Body_Content";var K7j="style";var P5p="ss=\"";var x4e="any";var l7p='';var J9U=7;var L6p="nd";var m2p="u";var Z9j='keyup';var i3e='April';var D5p="am";var V3e="Are you sure you wish to delete 1 row?";var X2e="ush";var z1W="error";var N9p="las";var H8j="div>";var M4p="dels";var n5p="</d";var z4W="va";var r7j="animate";var Q6j="epl";var I1p="DTE_Action_Remov";var V1W="url";var X3p="prototy";var C8j="for";var S0j='submit';var o8j="=\"";var m5j="ntent";var P0p="valFromData";var D1W="ff";var i3p="message";var Y0W="Bod";var Z3j="und";var A2j="_init";var y2p="p";var i4e="columns";var N9j="removeClass";var T4p="ings";var p3p="delete()";var H4p="ge";var o1D="<butt";var u9p="addClass";var s5e="be";var I5p="files";var H3e='Thu';var X2D="<t";var s2j="app";var U1D="maxDate";var D0p="s=\"";var c8j="ed";var L0j="io";var X3e='September';var j7j="offsetHeight";var P7j="th";var o6p="typ";var H9j="ow";var q0j="aj";var t5j="ead";var t5p="iv>";var W6p="rFields";var O0p="inputControl";var w3p="pe";var r1j="slice";var o9e="ont";var F2p="ation</a>).";var i5p=false;var x6D="nth";var g9p="nt";var R9j="_clo";var C0p="\" clas";var g4W="i1";var i8p="fieldInfo";var T1W="hide";var z4j="disp";var T7e="DTE_Bubble_Liner";var i1W="ea";var t0W='remove';var I7p="Edi";var k2W="oc";var b6j="inArray";var C7p=".1";var o4W='xhr.dt';var Q4p="lo";var y4p="clo";var j4j="content";var l6p="im";var T4D="ide";var q7W="Pr";var k2D="_h";var B5j="bod";var m1W='close';var F9p="leng";var k3e='January';var G7W="upl";var m9p="ha";var w1W="unique";var D2p="asic";var M6p="DTE_Bubble_Backgrou";var o6D="setU";var f1W="enable";var Z8p="Fn";var a5j="gth";var q7j="tr";var D4j="click";var W0W="fu";var x2p="F";var y5j="Api";var Q2p="dat";var h4p="ldType";var f3j="appen";var V9p="no";var a1D="irs";var D2j='blur';var W4j="ta";var T6p="i";var L4W="fun";var A9j="Ar";var j5e="DateTime";var t8p="lice";var m9U=13;var T6j="replace";var R1p="formOp";var P6p="ateT";var W8p="on";var D9U=B6p;D9U+=K6p;D9U+=z0v.a9U;D9U+=i6p;var C9U=d6p;C9U+=J6p;C9U+=X6p;var V9U=w6p;V9U+=x6p;V9U+=H6p;V9U+=m6p;var I9U=v6p;I9U+=N6p;I9U+=o6p;I9U+=q6p;var U8U=A6p;U8U+=Y6p;var R8U=s6p;R8U+=W6p;var F1U=q6p;F1U+=G6p;var z1U=x6p;z1U+=b6p;z1U+=u6p;z1U+=S6p;var l1U=f6p;l1U+=l6p;l1U+=q6p;var f1U=x6p;f1U+=z6p;f1U+=F6p;var S1U=e6p;S1U+=y6p;var k7x=Q6p;k7x+=P6p;k7x+=l6p;k7x+=q6p;var g7x=q6p;g7x+=Z6p;g7x+=t6p;g7x+=L6p;var k4x=z0v.R9U;k4x+=T6p;k4x+=c6p;k4x+=h6p;var N2x=M6p;N2x+=L6p;var v2x=n6p;v2x+=E6p;var m2x=a6p;m2x+=j6p;var H2x=n6p;H2x+=p6p;H2x+=r6p;H2x+=O6p;var x2x=R6p;x2x+=U6p;var w2x=I1p;w2x+=q6p;var X2x=V1p;X2x+=C1p;X2x+=D1p;X2x+=m6p;var J2x=g1p;J2x+=k1p;var d2x=B1p;d2x+=K1p;d2x+=i1p;var i2x=d1p;i2x+=J1p;i2x+=X1p;var K2x=w1p;K2x+=x1p;K2x+=H1p;K2x+=m1p;var B2x=v1p;B2x+=N1p;var k2x=n6p;k2x+=o1p;var g2x=q1p;g2x+=q6p;g2x+=A1p;var D2x=Y1p;D2x+=s1p;D2x+=W1p;var C2x=a6p;C2x+=G1p;C2x+=b1p;var V2x=Q6p;V2x+=u1p;V2x+=S1p;V2x+=f1p;var I2x=z0v.D6p;I2x+=l1p;var U1x=Q6p;U1x+=z1p;U1x+=F1p;var R1x=Q6p;R1x+=e1p;var O1x=a6p;O1x+=y1p;O1x+=Q1p;var r1x=P1p;r1x+=Z1p;var p1x=t1p;p1x+=t6p;p1x+=m6p;p1x+=L1p;var j1x=T1p;j1x+=c1p;j1x+=m6p;var a1x=h1p;a1x+=M1p;var E1x=a6p;E1x+=w6p;var n1x=n1p;n1x+=E1p;n1x+=a1p;n1x+=j1p;var B9O=p1p;B9O+=b1p;B9O+=Y6p;var k9O=r1p;k9O+=O1p;var g9O=R1p;g9O+=U1p;var D9O=I2p;D9O+=V2p;var C9O=C2p;C9O+=D2p;var V9O=g2p;V9O+=k2p;var I9O=B2p;I9O+=K2p;I9O+=G6p;I9O+=x6p;var U8O=i2p;U8O+=d2p;U8O+=J2p;U8O+=q6p;var R8O=X2p;R8O+=m6p;var O8O=z0v.C6p;O8O+=w2p;var r8O=x2p;r8O+=m6p;r8O+=T6p;var p8O=H2p;p8O+=m1p;var j8O=B2p;j8O+=m2p;j8O+=G6p;var a8O=v2p;a8O+=N2p;a8O+=o2p;a8O+=J6p;var E8O=q2p;E8O+=m6p;var n8O=A2p;n8O+=J6p;var M8O=Y2p;M8O+=m2p;M8O+=s2p;M8O+=W2p;var h8O=i2p;h8O+=z0v.C6p;h8O+=W2p;var c8O=G2p;c8O+=q6p;c8O+=Z6p;c8O+=J2p;var T8O=b2p;T8O+=u2p;var L8O=i2p;L8O+=S2p;L8O+=f2p;var t8O=l2p;t8O+=z2p;t8O+=F2p;var Z8O=Q6p;Z8O+=b1p;Z8O+=q6p;Z8O+=t6p;var P8O=e2p;P8O+=y2p;P8O+=Q2p;P8O+=q6p;var Q8O=w6p;Q8O+=g1p;Q8O+=J2p;var y8O=a6p;y8O+=P2p;y8O+=z0v.M9U;y8O+=Z2p;var e8O=t2p;e8O+=L2p;var F8O=T2p;F8O+=c2p;F8O+=h2p;F8O+=M2p;var z8O=n2p;z8O+=E2p;z8O+=q6p;var d0O=v6p;d0O+=a2p;d0O+=z0v.M9U;d0O+=j2p;var p5O=p2p;p5O+=r2p;var A5O=O2p;A5O+=R2p;A5O+=U2p;var J5O=I3p;J5O+=V3p;var d5O=y2p;d5O+=C3p;d5O+=y2p;d5O+=q6p;var R7O=D3p;R7O+=g3p;var O7O=v6p;O7O+=k3p;O7O+=B3p;var n7O=n2p;n7O+=K3p;var z7O=O2p;z7O+=i3p;var S7O=d3p;S7O+=u6p;S7O+=J3p;S7O+=b6p;var u7O=X3p;u7O+=w3p;var o4O=x3p;o4O+=H3p;var K4O=m3p;K4O+=G2p;K4O+=z0v.C6p;K4O+=v3p;var g4O=y2p;g4O+=N3p;var V4O=o3p;V4O+=q3p;var E3O=O2p;E3O+=q6p;E3O+=d6p;E3O+=A3p;var Y3O=Y3p;Y3O+=g1p;Y3O+=J2p;var A3O=v6p;A3O+=s3p;A3O+=q6p;var I3O=W3p;I3O+=G3p;I3O+=b3p;var r2O=u3p;r2O+=S3p;r2O+=f3p;r2O+=Y6p;var j2O=v6p;j2O+=s3p;j2O+=q6p;var y2O=l3p;y2O+=z3p;y2O+=X1p;var e2O=X3p;e2O+=w3p;var b2O=y2p;b2O+=N3p;var v2O=F3p;v2O+=e3p;v2O+=G6p;var m2O=y2p;m2O+=y3p;m2O+=a2p;m2O+=B3p;var J2O=y2p;J2O+=N3p;var z1O=v6p;z1O+=k3p;z1O+=B3p;var o1O=Q3p;o1O+=P3p;var N1O=y2p;N1O+=y3p;N1O+=a2p;N1O+=B3p;var r9c=Z3p;r9c+=t3p;r9c+=L3p;var M8c=m2p;M8c+=T3p;var e8c=y2p;e8c+=c3p;e8c+=h3p;var b8c=M3p;b8c+=n3p;var G8c=E3p;G8c+=q6p;G8c+=a3p;var o8c=j3p;o8c+=K6p;o8c+=p3p;var v8c=r3p;v8c+=O3p;v8c+=R3p;var H8c=U3p;H8c+=I4p;H8c+=n3p;var J8c=q6p;J8c+=V4p;var U0c=C4p;U0c+=y2p;U0c+=T6p;var r0c=d6p;r0c+=z0v.C6p;r0c+=s2p;var p0c=p2p;p0c+=D4p;p0c+=w3p;var t0c=y2p;t0c+=C3p;t0c+=w3p;var P0c=g4p;P0c+=k4p;var Q0c=p2p;Q0c+=J2p;Q0c+=z0v.M9U;Q0c+=j2p;var G0c=Y6p;G0c+=B4p;G0c+=K4p;G0c+=J2p;var A0c=y2p;A0c+=m6p;A0c+=z0v.M9U;A0c+=r2p;var U5c=i4p;U5c+=q6p;var z5c=z0v.M9U;z5c+=G6p;z5c+=q6p;var f5c=n2p;f5c+=z0v.M9U;f5c+=j2p;var u5c=z0v.M9U;u5c+=z0v.R9U;u5c+=z0v.R9U;var b5c=d4p;b5c+=B3p;var s5c=v6p;s5c+=J4p;var x5c=X4p;x5c+=x6p;x5c+=w4p;x5c+=m6p;var i5c=v3p;i5c+=x4p;i5c+=H4p;var x7c=v6p;x7c+=J4p;var K7c=m4p;K7c+=v4p;var k7c=z0v.R9U;k7c+=T6p;k7c+=q6p;k7c+=N4p;var D7c=y2p;D7c+=y3p;D7c+=z0v.M9U;D7c+=j2p;var U4c=y2p;U4c+=C3p;U4c+=y2p;U4c+=q6p;var O4c=n2p;O4c+=K3p;var M4c=n2p;M4c+=z0v.M9U;M4c+=o6p;M4c+=q6p;var c4c=g1p;c4c+=o4p;c4c+=z0v.C6p;c4c+=q4p;var T4c=d4p;T4c+=W2p;T4c+=w3p;var Q4c=g1p;Q4c+=A4p;var W4c=x6p;W4c+=q6p;W4c+=Y4p;W4c+=s4p;var s4c=d4p;s4c+=W2p;s4c+=w3p;var j3c=W4p;j3c+=G6p;j3c+=G4p;var a3c=n2p;a3c+=E2p;a3c+=q6p;var A3c=v6p;A3c+=k3p;A3c+=B3p;var o3c=v6p;o3c+=a2p;o3c+=E2p;o3c+=q6p;var J3c=n2p;J3c+=z0v.M9U;J3c+=o6p;J3c+=q6p;var T2c=z0v.D6p;T2c+=b4p;var x2c=y2p;x2c+=r3p;x2c+=r2p;var o1c=u4p;o1c+=S4p;var N1c=v6p;N1c+=s3p;N1c+=q6p;var J1c=z0v.D6p;J1c+=f4p;J1c+=l4p;J1c+=x6p;var K1c=z0v.C6p;K1c+=z4p;K1c+=z0v.C6p;K1c+=Z6p;var c6c=z0v.C6p;c6c+=x6p;c6c+=x6p;var T5=g1p;T5+=F4p;T5+=s2p;T5+=M2p;var L5=X1p;L5+=n1p;L5+=e4p;var t5=y4p;t5+=Y6p;t5+=q6p;var Z5=n1p;Z5+=Q4p;Z5+=Y6p;Z5+=q6p;var P5=P4p;P5+=z0v.M9U;P5+=Y6p;P5+=q6p;var Q5=R2p;Q5+=Z4p;Q5+=T6p;Q5+=J2p;var y5=p1p;y5+=t4p;var e5=L4p;e5+=T4p;var F5=z0v.R9U;F5+=c4p;F5+=h4p;var z5=X4p;z5+=M4p;var l5=n4p;l5+=E4p;var f5=x6p;f5+=a4p;var S5=X4p;S5+=x6p;S5+=q6p;S5+=k2p;var u5=Y6p;u5+=j4p;u5+=Y6p;var b5=p4p;b5+=q6p;b5+=r4p;var G5=O4p;G5+=R4p;var P3=U4p;P3+=j2p;var w2=I7p;w2+=V7p;var i2=B6p;i2+=C7p;i2+=D7p;var K2=z0v.R9U;K2+=G6p;'use strict';z0v.T1=function(L1){z0v.h0v();if(z0v && L1)return z0v.Y1(L1);};(function(){var f7p=' day';var B7p="a18f";var m7p="ae64";var o7p='Editor - Trial expired';z0v.h0v();var S7p="43b3";var X7p="c362";var i7p=7240458072;var H7p='Thank you for trying DataTables Editor\n\n';var T9U=2488;var L9U=1000;var G7p="or trial info - ";var K7p="2d97";var u7p="log";var w7p="75";var N7p='for Editor, please see https://editor.datatables.net/purchase';var s7p="ining";var b7p="d372";var x7p="2768";var h9U=1591920000;var g7p="cbc";var J7p="getTime";var d7p="739a";var v7p='Your trial has now expired. To purchase a license ';var W7p="DataTables Edit";var g2=z0v.O9U;g2+=g7p;var C2=m4p;C2+=v4p;C2+=k7p;C2+=S6p;var V2=n1p;V2+=q6p;V2+=T6p;V2+=s2p;z0v.a1=function(E1){if(z0v && E1)return z0v.A1(E1);};z0v.n1=function(M1){z0v.F0v();if(z0v && M1)return z0v.Y1(M1);};z0v.h1=function(c1){if(z0v && c1)return z0v.A1(c1);};z0v.F1=function(z1){z0v.F0v();if(z0v && z1)return z0v.Y1(z1);};var remaining=Math[z0v.l1(B7p)?z0v.g6p:V2]((new Date((z0v.F1(K7p)?h9U:i7p) * L9U)[C2]() - new Date()[z0v.y1(d7p)?J7p:z0v.g6p]()) / ((z0v.P1(X7p)?L9U:T9U) * F9U * F9U * A9U));if(remaining <= g9U){var D2=w7p;D2+=z0v.O9U;D2+=x6p;z0v.t1=function(Z1){z0v.F0v();if(z0v)return z0v.A1(Z1);};alert((z0v.t1(x7p)?H7p:z0v.g6p) + (z0v.T1(m7p)?z0v.g6p:v7p) + (z0v.h1(D2)?N7p:z0v.g6p));throw o7p;}else if(remaining <= (z0v.n1(g2)?J9U:X9U)){var B2=q7p;B2+=A7p;B2+=Y7p;B2+=s7p;var k2=W7p;k2+=G7p;console[z0v.a1(b7p)?u7p:z0v.g6p]((z0v.p1(S7p)?k2:z0v.g6p) + remaining + f7p + (remaining === k9U?l7p:z7p) + B2);}})();var DataTable=$[K2][F7p];if(!DataTable || !DataTable[e7p] || !DataTable[e7p](i2)){var d2=y7p;d2+=Q7p;throw new Error(d2);}var Editor=function(opts){var t7p="initiali";var Z7p="DataTables Editor must be ";var L7p="sed as a 'new' instance'";var P7p="ructo";var X2=Z3p;z0v.h0v();X2+=J2p;X2+=P7p;X2+=m6p;if(!(this instanceof Editor)){var J2=Z7p;J2+=t7p;J2+=L7p;alert(J2);}this[X2](opts);};DataTable[T7p]=Editor;$[c7p][h7p][w2]=Editor;var _editor_el=function(dis,ctx){var E7p="dte-e=\"";var M7p="*[";var x2=M7p;x2+=n7p;x2+=E7p;if(ctx === undefined){ctx=document;}return $(x2 + dis + a7p,ctx);};var __inlineCounter=g9U;var _pluck=function(a,prop){var H2=q6p;H2+=j7p;H2+=p7p;var out=[];$[H2](a,function(idx,el){var m2=y2p;m2+=m2p;m2+=r7p;out[m2](el[prop]);});return out;};var _api_file=function(name,id){var U7p=' in table ';z0v.F0v();var R7p='Unknown file id ';var O7p="il";var v2=z0v.R9U;v2+=O7p;v2+=q6p;v2+=Y6p;var table=this[v2](name);var file=table[id];if(!file){throw R7p + id + U7p + name;}return table[id];};var _api_files=function(name){var V5p="Unknown file tab";z0v.h0v();var g5p="e: ";var C5p="le n";if(!name){var N2=A6p;N2+=Y6p;return Editor[N2];}var table=Editor[I5p][name];if(!table){var q2=V5p;q2+=C5p;q2+=D5p;q2+=g5p;throw q2 + name;}return table;};var _objectKeys=function(o){var k5p="hasOwnProperty";z0v.h0v();var out=[];for(var key in o){if(o[k5p](key)){var A2=y2p;A2+=m2p;A2+=Y6p;A2+=p7p;out[A2](key);}}return out;};var _deepCompare=function(o1,o2){if(typeof o1 !== B5p || typeof o2 !== B5p){return o1 == o2;}var o1Props=_objectKeys(o1);var o2Props=_objectKeys(o2);if(o1Props[K5p] !== o2Props[K5p]){return i5p;}for(var i=g9U,ien=o1Props[K5p];i < ien;i++){var propName=o1Props[i];if(typeof o1[propName] === B5p){if(!_deepCompare(o1[propName],o2[propName])){return i5p;}}else if(o1[propName] != o2[propName]){return i5p;}}return d5p;};Editor[J5p]=function(opts,classes,host){var p5p="<div data-dte-e=\"input";var Z5p="sg-error";var z0p='DTE_Field_';var A5p="msg-me";var Y8p='msg-error';var r5p="-control\" ";var H8p="input-con";var m5p="tur";var m8p="trol";var R0p='<div data-dte-e="multi-value" class="';var K0p="r=";var Y0p="dTy";var A8p='msg-label';var d8p='<div data-dte-e="field-processing" class="';var V0p="te-e=\"input";var G5p="\"><span><";var s0p="pes";var g0p="msg-";var w5p="lick";var B0p="\" f";var Y5p="ssa";var v0p="bjectData";var y0p="dataPro";var M5p="a-dte-e=\"msg-multi\" class=\"";var I0p="<div data-d";var q8p='input-control';var i0p="labe";var B8p='msg-message';var N0p="ToData";var h5p="iv dat";var L5p="Res";var K8p='msg-info';var m0p="_fnSetO";var I8p='<span data-dte-e="multi-info" class="';var g8p='<div data-dte-e="msg-error" class="';var e0p="dataProp";var Q5p="<div data-dte-e=\"msg-message\" cl";var s8p='msg-multi';var v5p="field-pr";var S0p="Error adding field - unknown field type ";var J0p="ePr";var n0p='<label data-dte-e="label" class="';var c0p="typePrefix";var W0p="yp";var a0p='<div data-dte-e="msg-label" class="';var q5p="-value";var h0p="className";var l5p="<div data-dte-e=\"msg-info\" c";var H5p="tiRe";var u5p="an></div>";var T5p="tore";var z3=X5p;z3+=y2p;z3+=q6p;var l3=n1p;l3+=w5p;var f3=x5p;f3+=H5p;f3+=m5p;f3+=G6p;var W3=v5p;W3+=N5p;var s3=d1p;s3+=J1p;s3+=X1p;var Y3=w2p;Y3+=o5p;Y3+=q5p;var A3=A5p;A3+=Y5p;A3+=H4p;var q3=E1p;q3+=z0v.D6p;q3+=b1p;var o3=x6p;o3+=z0v.M9U;o3+=w2p;var N3=w2p;N3+=s5p;N3+=q6p;N3+=k2p;var X3=n1p;X3+=W5p;X3+=J2p;X3+=q6p;var J3=G5p;J3+=b5p;J3+=u5p;var d3=S5p;d3+=f5p;var i3=l5p;i3+=z5p;var K3=F5p;K3+=e5p;K3+=g1p;K3+=y5p;var B3=S5p;B3+=f5p;z0v.F0v();var k3=Q5p;k3+=z0v.C6p;k3+=P5p;var g3=w2p;g3+=Z5p;var D3=F5p;D3+=e5p;D3+=x6p;D3+=t5p;var C3=S5p;C3+=f5p;var V3=B1p;V3+=L5p;V3+=T5p;var I3=c5p;I3+=h5p;I3+=M5p;var U2=n5p;U2+=E5p;U2+=f5p;var R2=S5p;R2+=f5p;var O2=J2p;O2+=a5p;O2+=q6p;var r2=S5p;r2+=j5p;r2+=g1p;r2+=y5p;var p2=p5p;p2+=r5p;p2+=O5p;p2+=S5p;var j2=R5p;j2+=y2p;j2+=U5p;var a2=I0p;a2+=V0p;a2+=C0p;a2+=D0p;var E2=S5p;E2+=f5p;var n2=g0p;n2+=k0p;var M2=T6p;M2+=x6p;var h2=B0p;h2+=z0v.M9U;h2+=K0p;h2+=S5p;var c2=i0p;c2+=s2p;var T2=d0p;T2+=J0p;T2+=q6p;T2+=X0p;var L2=J2p;L2+=W2p;L2+=w3p;var t2=w0p;t2+=m6p;t2+=x0p;t2+=H0p;var Z2=m0p;Z2+=v0p;Z2+=x2p;Z2+=G6p;var P2=H1p;P2+=N0p;var Q2=o0p;Q2+=y2p;Q2+=T6p;var l2=q0p;l2+=S6p;var f2=J2p;f2+=W2p;f2+=y2p;f2+=q6p;var S2=A0p;S2+=Y0p;S2+=s0p;var u2=L4p;u2+=T4p;var G2=J2p;G2+=W0p;G2+=q6p;var W2=t2p;W2+=z0v.R9U;W2+=G0p;W2+=Y6p;var s2=b0p;s2+=L6p;var Y2=T6p;Y2+=B6p;Y2+=z0v.O9U;Y2+=G6p;var that=this;var multiI18n=host[Y2][B1p];opts=$[s2](d5p,{},Editor[J5p][W2],opts);if(!Editor[u0p][opts[G2]]){var b2=J2p;b2+=W2p;b2+=y2p;b2+=q6p;throw S0p + opts[b2];}this[Y6p]=$[f0p]({},Editor[J5p][u2],{type:Editor[S2][opts[f2]],name:opts[l2],classes:classes,host:host,opts:opts,multiValue:i5p});if(!opts[l0p]){var z2=T6p;z2+=x6p;opts[z2]=z0p + opts[F0p];}if(opts[e0p]){var F2=y0p;F2+=y2p;opts[Q0p]=opts[F2];}if(opts[Q0p] === l7p){var y2=G6p;y2+=z0v.C6p;y2+=w2p;y2+=q6p;var e2=x6p;e2+=z0v.C6p;e2+=J2p;e2+=z0v.C6p;opts[e2]=opts[y2];}var dtPrivateApi=DataTable[I2p][Q2];this[P0p]=function(d){var t0p='editor';return dtPrivateApi[Z0p](opts[Q0p])(d,t0p);};this[P2]=dtPrivateApi[Z2](opts[Q0p]);var template=$(L0p + classes[t2] + T0p + classes[c0p] + opts[L2] + T0p + classes[T2] + opts[F0p] + T0p + opts[h0p] + M0p + n0p + classes[c2] + h2 + Editor[E0p](opts[M2]) + M0p + opts[k0p] + a0p + classes[n2] + E2 + opts[j0p] + p0p + r0p + a2 + classes[j2] + M0p + p2 + classes[O0p] + r2 + R0p + classes[U0p] + M0p + multiI18n[O2] + I8p + classes[V8p] + R2 + multiI18n[C8p] + D8p + U2 + I3 + classes[V3] + C3 + multiI18n[i1p] + D3 + g8p + classes[g3] + k8p + k3 + classes[B8p] + B3 + opts[i3p] + K3 + i3 + classes[K8p] + d3 + opts[i8p] + p0p + p0p + d8p + classes[J8p] + J3 + p0p);var input=this[X8p](X3,opts);if(input !== w8p){var x3=x8p;x3+=y2p;x3+=V2p;var w3=H8p;w3+=m8p;_editor_el(w3,template)[x3](input);}else {var v3=G6p;v3+=z0v.M9U;v3+=G6p;v3+=q6p;var m3=v8p;m3+=N8p;m3+=M2p;var H3=n1p;H3+=Y6p;H3+=Y6p;template[H3](m3,v3);}this[o8p]=$[f0p](d5p,{},Editor[J5p][N3][o3],{container:template,inputControl:_editor_el(q8p,template),label:_editor_el(q3,template),fieldInfo:_editor_el(K8p,template),labelInfo:_editor_el(A8p,template),fieldError:_editor_el(Y8p,template),fieldMessage:_editor_el(A3,template),multi:_editor_el(Y3,template),multiReturn:_editor_el(s8p,template),multiInfo:_editor_el(s3,template),processing:_editor_el(W3,template)});this[o8p][B1p][W8p](G8p,function(){var z8p='readonly';var b8p="sab";var S8p="Editable";var S3=X5p;z0v.F0v();S3+=w3p;var u3=g1p;u3+=b8p;u3+=u8p;var b3=x5p;b3+=J2p;b3+=T6p;b3+=S8p;var G3=f8p;G3+=F6p;if(that[Y6p][G3][b3] && !template[l8p](classes[u3]) && opts[S3] !== z8p){that[H1p](l7p);that[F8p]();}});this[o8p][f3][W8p](l3,function(){var e8p="multiRestore";that[e8p]();});$[y8p](this[Y6p][z3],function(name,fn){var F3=Q8p;F3+=u6p;F3+=W8p;if(typeof fn === F3 && that[name] === undefined){that[name]=function(){var P8p="_t";var Q3=x0p;Q3+=N8p;Q3+=W2p;var y3=P8p;y3+=W0p;y3+=q6p;y3+=Z8p;var e3=Y6p;e3+=t8p;var args=Array[L8p][e3][T8p](arguments);z0v.F0v();args[c8p](name);var ret=that[y3][Q3](that,args);return ret === undefined?that:ret;};}});};Editor[J5p][P3]={def:function(set){var n8p='default';var h8p="fau";z0v.F0v();var L3=x6p;L3+=q6p;L3+=z0v.R9U;var Z3=f8p;Z3+=F6p;var opts=this[Y6p][Z3];if(set === undefined){var t3=t2p;t3+=h8p;t3+=M8p;var def=opts[n8p] !== undefined?opts[t3]:opts[O4p];return typeof def === E8p?def():def;}opts[L3]=set;return this;},disable:function(){var r8p="lasses";var p8p="_ty";var M3=x6p;M3+=a8p;M3+=j8p;M3+=q6p;var h3=p8p;h3+=w3p;h3+=Z8p;var c3=n1p;c3+=r8p;var T3=O8p;T3+=R8p;T3+=E1p;T3+=a1p;this[o8p][U8p][T3](this[Y6p][c3][I9p]);this[h3](M3);return this;},displayed:function(){var k9p="ontaine";var p3=V9p;p3+=G6p;p3+=q6p;var j3=x6p;j3+=C9p;j3+=E1p;j3+=W2p;var a3=D9p;a3+=A7p;a3+=g9p;a3+=Y6p;var E3=n1p;E3+=k9p;E3+=m6p;var n3=x6p;n3+=z0v.M9U;n3+=w2p;var container=this[n3][E3];return container[a3](B9p)[K5p] && container[K9p](j3) != p3?d5p:i5p;},enable:function(){z0v.h0v();var i9p="peFn";var R3=O2p;R3+=X5p;R3+=i9p;var O3=A7p;O3+=d9p;O3+=J9p;var r3=X9p;r3+=w9p;this[o8p][r3][O3](this[Y6p][x9p][I9p]);this[R3](H9p);return this;},enabled:function(){z0v.F0v();var I4=m9p;I4+=v9p;I4+=N9p;I4+=Y6p;var U3=X9p;U3+=o9p;U3+=m6p;return this[o8p][U3][I4](this[Y6p][x9p][I9p]) === i5p;},error:function(msg,fn){var q9p="ieldE";var S9p="removeC";var Y9p="rMessag";var W9p="ses";var X4=z0v.R9U;X4+=q9p;X4+=h2p;X4+=L3p;var J4=x6p;J4+=z0v.M9U;J4+=w2p;var d4=A9p;d4+=z0v.M9U;d4+=Y9p;d4+=q6p;var i4=O2p;i4+=J2p;i4+=B3p;i4+=Z8p;var V4=s9p;V4+=Y6p;V4+=W9p;var classes=this[Y6p][V4];if(msg){var g4=q6p;g4+=m6p;g4+=G9p;var D4=n1p;D4+=b9p;var C4=x6p;C4+=z0v.M9U;C4+=w2p;this[C4][D4][u9p](classes[g4]);}else {var K4=J6p;K4+=m6p;K4+=L3p;var B4=S9p;B4+=f9p;var k4=l9p;k4+=w2p;this[k4][U8p][B4](classes[K4]);}this[i4](d4,msg);return this[z9p](this[J4][X4],msg,fn);},fieldInfo:function(msg){var w4=x6p;w4+=z0v.M9U;w4+=w2p;return this[z9p](this[w4][i8p],msg);},isMultiValue:function(){var H4=F9p;H4+=J2p;H4+=p7p;var x4=w2p;x4+=e9p;z0v.F0v();x4+=y9p;return this[Y6p][U0p] && this[Y6p][x4][H4] !== k9U;},inError:function(){var q4=A9p;q4+=L3p;var o4=P4p;o4+=z0v.C6p;o4+=a1p;o4+=j1p;var N4=Q9p;N4+=z0v.C6p;N4+=a1p;var v4=P9p;v4+=J6p;var m4=x6p;m4+=a4p;return this[m4][v4][N4](this[Y6p][o4][q4]);},input:function(){z0v.h0v();var c9p='input, select, textarea';var G4=Z9p;G4+=t9p;G4+=R5p;G4+=J6p;var W4=L9p;W4+=J2p;var s4=T9p;s4+=q6p;s4+=Z8p;var Y4=R5p;Y4+=y2p;Y4+=m2p;Y4+=J2p;var A4=J2p;A4+=W2p;A4+=w3p;return this[Y6p][A4][Y4]?this[s4](W4):$(c9p,this[o8p][G4]);},focus:function(){var n9p="t, select, t";var h9p="onta";var E9p="extarea";var b4=X1p;b4+=n1p;b4+=m2p;b4+=Y6p;if(this[Y6p][j2p][b4]){var u4=z0v.R9U;u4+=z0v.M9U;u4+=n1p;u4+=e4p;this[X8p](u4);}else {var l4=n1p;l4+=h9p;l4+=T6p;l4+=w9p;var f4=x6p;f4+=z0v.M9U;f4+=w2p;var S4=T6p;S4+=M9p;S4+=n9p;S4+=E9p;$(S4,this[f4][l4])[F8p]();}z0v.h0v();return this;},get:function(){z0v.F0v();var p9p='get';var j9p="isMultiValue";var z4=x6p;z4+=a9p;if(this[j9p]()){return undefined;}var val=this[X8p](p9p);return val !== undefined?val:this[z4]();},hide:function(animate){var R9p="slideUp";var I6j="eUp";var e4=z0v.R9U;e4+=G6p;var F4=n1p;F4+=b9p;var el=this[o8p][F4];if(animate === undefined){animate=d5p;}if(this[Y6p][r9p][O9p]() && animate && $[e4][R9p]){var y4=U9p;y4+=T6p;y4+=x6p;y4+=I6j;el[y4]();}else {var P4=V6j;P4+=W2p;var Q4=n1p;Q4+=Y6p;Q4+=Y6p;el[Q4](P4,C6j);}return this;},label:function(str){var L4=p7p;L4+=J2p;L4+=w2p;L4+=s2p;z0v.F0v();var t4=x6p;t4+=a4p;var Z4=x6p;Z4+=z0v.M9U;Z4+=w2p;var label=this[Z4][k0p];var labelInfo=this[t4][j0p][D6j]();if(str === undefined){return label[g6j]();}label[L4](str);label[k6j](labelInfo);return this;},labelInfo:function(msg){var K6j="elIn";var c4=B6j;c4+=K6j;c4+=z0v.R9U;c4+=z0v.M9U;var T4=x6p;T4+=z0v.M9U;T4+=w2p;return this[z9p](this[T4][c4],msg);},message:function(msg,fn){z0v.h0v();var i6j="fieldMessage";var M4=x6p;M4+=z0v.M9U;M4+=w2p;var h4=O2p;h4+=w2p;h4+=Y6p;h4+=m4p;return this[h4](this[M4][i6j],msg,fn);},multiGet:function(id){var d6j="Multi";var x6j="tiValues";var J6j="V";var X6j="alue";var a4=a8p;a4+=d6j;a4+=J6j;a4+=X6j;var E4=w2p;E4+=e9p;E4+=y9p;var n4=w2p;n4+=w6j;n4+=x6j;var value;var multiValues=this[Y6p][n4];var multiIds=this[Y6p][E4];var isMultiValue=this[a4]();if(id === undefined){var j4=s2p;j4+=q6p;j4+=H6j;j4+=p7p;var fieldVal=this[H1p]();value={};for(var i=g9U;i < multiIds[j4];i++){value[multiIds[i]]=isMultiValue?multiValues[multiIds[i]]:fieldVal;}}else if(isMultiValue){value=multiValues[id];}else {value=this[H1p]();}return value;},multiRestore:function(){var m6j="_mult";var v6j="iV";var N6j="alueC";var o6j="heck";var r4=m6j;r4+=v6j;r4+=N6j;r4+=o6j;var p4=d1p;p4+=q6j;this[Y6p][p4]=d5p;this[r4]();},multiSet:function(id,val){var Y6j="ueCheck";var A6j="_multiVal";var s6j="ltiVa";var I7=A6j;I7+=Y6j;var U4=x5p;U4+=J2p;U4+=q6j;var O4=w2p;O4+=m2p;O4+=s6j;O4+=W6j;var multiValues=this[Y6p][O4];var multiIds=this[Y6p][G6j];if(val === undefined){val=id;id=undefined;}var set=function(idSrc,val){z0v.h0v();if($[b6j](multiIds) === -k9U){var R4=y2p;R4+=m2p;R4+=Y6p;R4+=p7p;multiIds[R4](idSrc);}multiValues[idSrc]=val;};if($[u6j](val) && id === undefined){$[y8p](val,function(idSrc,innerVal){set(idSrc,innerVal);});}else if(id === undefined){$[y8p](multiIds,function(i,idSrc){z0v.F0v();set(idSrc,val);});}else {set(id,val);}this[Y6p][U4]=d5p;this[I7]();return this;},name:function(){return this[Y6p][S6j][F0p];},node:function(){var V7=l9p;V7+=w2p;return this[V7][U8p][g9U];},processing:function(set){var g7=G6p;g7+=z0v.M9U;g7+=G6p;g7+=q6p;var D7=v6p;D7+=N5p;var C7=x6p;C7+=z0v.M9U;C7+=w2p;this[C7][D7][K9p](f6j,set?l6j:g7);return this;},set:function(val,multiCheck){var a6j="entityDecode";var p6j="_multiValueCheck";var j6j='set';var z6j="eFn";var J7=T9p;J7+=z6j;var i7=F6j;i7+=Y6p;var decodeFn=function(d){var E6j='\n';var M6j='£';var L6j='<';var h6j='"';var n6j='\'';var e6j="repl";var K7=e6j;K7+=y6j;var B7=m6p;B7+=Q6j;B7+=y6j;var k7=A7p;k7+=P6j;k7+=N2p;return typeof d !== Z6j?d:d[k7](/&gt;/g,t6j)[B7](/&lt;/g,L6j)[T6j](/&amp;/g,c6j)[T6j](/&quot;/g,h6j)[T6j](/&#163;/g,M6j)[T6j](/&#39;/g,n6j)[K7](/&#10;/g,E6j);};this[Y6p][U0p]=i5p;var decode=this[Y6p][i7][a6j];if(decode === undefined || decode === d5p){var d7=a8p;d7+=C4p;d7+=h2p;d7+=M2p;if($[d7](val)){for(var i=g9U,ien=val[K5p];i < ien;i++){val[i]=decodeFn(val[i]);}}else {val=decodeFn(val);}}this[J7](j6j,val);if(multiCheck === undefined || multiCheck === d5p){this[p6j]();}return this;},show:function(animate){var R6j="slideDown";var O6j="ntainer";var x7=z0v.R9U;x7+=G6p;var w7=x6p;w7+=r6j;var X7=Z9p;X7+=O6j;var el=this[o8p][X7];if(animate === undefined){animate=d5p;}if(this[Y6p][r9p][w7]() && animate && $[x7][R6j]){el[R6j]();}else {el[K9p](f6j,l7p);;}return this;},val:function(val){z0v.F0v();var H7=H4p;H7+=J2p;return val === undefined?this[H7]():this[U6j](val);},compare:function(value,original){var v7=Z9p;v7+=w2p;v7+=I1j;var m7=z0v.M9U;m7+=y2p;m7+=J2p;m7+=Y6p;var compare=this[Y6p][m7][v7] || _deepCompare;return compare(value,original);},dataSrc:function(){var o7=V1j;o7+=J2p;o7+=z0v.C6p;var N7=z0v.M9U;N7+=C1j;return this[Y6p][N7][o7];},destroy:function(){z0v.h0v();var Y7=x6p;Y7+=q6p;Y7+=D1j;Y7+=g1j;var A7=k1j;A7+=B1j;var q7=x6p;q7+=a4p;this[q7][U8p][A7]();this[X8p](Y7);return this;},multiEditable:function(){z0v.F0v();return this[Y6p][S6j][K1j];},multiIds:function(){var s7=B1p;s7+=i1j;return this[Y6p][s7];},multiInfoShown:function(show){var W7=l9p;W7+=w2p;this[W7][V8p][K9p]({display:show?l6j:C6j});},multiReset:function(){var d1j="tiVa";var G7=w2p;G7+=w6j;G7+=d1j;G7+=W6j;this[Y6p][G6j]=[];this[Y6p][G7]={};},submittable:function(){var b7=z0v.M9U;b7+=y2p;z0v.F0v();b7+=J2p;b7+=Y6p;return this[Y6p][b7][J1j];},valFromData:w8p,valToData:w8p,_errorNode:function(){var X1j="dErr";z0v.h0v();var u7=A0p;u7+=X1j;u7+=z0v.M9U;u7+=m6p;return this[o8p][u7];},_msg:function(el,msg,fn){var H1j=":visib";var q1j="slid";z0v.F0v();var A1j="eDo";var v1j="tab";var s1j="slide";var y7=w1j;y7+=x1j;var e7=H1j;e7+=s2p;e7+=q6p;var F7=T6p;F7+=Y6p;if(msg === undefined){var S7=p7p;S7+=m1j;S7+=s2p;return el[S7]();}if(typeof msg === E8p){var z7=v1j;z7+=s2p;z7+=q6p;var l7=C4p;l7+=y2p;l7+=T6p;var f7=p7p;f7+=z0v.M9U;f7+=Y6p;f7+=J2p;var editor=this[Y6p][f7];msg=msg(editor,new DataTable[l7](editor[Y6p][z7]));}if(el[N1j]()[F7](e7) && $[c7p][y7]){var Q7=p7p;Q7+=o1j;el[Q7](msg);if(msg){var P7=q1j;P7+=A1j;P7+=Y1j;el[P7](fn);;}else {var Z7=s1j;Z7+=W1j;el[Z7](fn);}}else {var c7=G1j;c7+=b1j;var T7=v8p;T7+=N8p;T7+=M2p;var L7=n1p;L7+=Y6p;L7+=Y6p;var t7=p7p;t7+=J2p;t7+=u1j;el[t7](msg || l7p)[L7](T7,msg?c7:C6j);if(fn){fn();}}return this;},_multiValueCheck:function(){var F1j="toggleCl";var P1j="isM";var h1j="bloc";var Z1j="ultiValue";var L1j="multiValues";var y1j="iRe";var a1j="noMulti";var t1j="ultiEditable";var l1j="multiNoE";var f1j="Info";var S1j="_multi";var v5=S1j;v5+=f1j;var m5=l1j;m5+=z1j;var H5=F1j;H5+=z0v.C6p;H5+=a1p;var w5=d1p;w5+=T6p;var X5=l9p;X5+=w2p;var J5=x6p;J5+=z0v.M9U;J5+=w2p;var d5=w2p;d5+=o5p;var i5=e1j;i5+=Y6p;i5+=J2p;var K5=G6p;K5+=z0v.M9U;K5+=G6p;K5+=q6p;var B5=n1p;B5+=Y6p;B5+=Y6p;var k5=d1p;k5+=y1j;k5+=Q1j;var C5=x6p;C5+=a4p;var E7=P1j;E7+=Z1j;z0v.F0v();var M7=w2p;M7+=t1j;var h7=z0v.M9U;h7+=C1j;var last;var ids=this[Y6p][G6j];var values=this[Y6p][L1j];var isMultiValue=this[Y6p][U0p];var isMultiEditable=this[Y6p][h7][M7];var val;var different=i5p;if(ids){var n7=T1j;n7+=G6p;n7+=c1j;n7+=p7p;for(var i=g9U;i < ids[n7];i++){val=values[ids[i]];if(i > g9U && !_deepCompare(val,last)){different=d5p;break;}last=val;}}if(different && isMultiValue || !isMultiEditable && this[E7]()){var p7=h1j;p7+=M1j;var j7=n1j;j7+=Y6p;var a7=x6p;a7+=z0v.M9U;a7+=w2p;this[o8p][O0p][K9p]({display:C6j});this[a7][B1p][j7]({display:p7});}else {var I5=G6p;I5+=z0v.M9U;I5+=G6p;I5+=q6p;var U7=n1p;U7+=Y6p;U7+=Y6p;var R7=w1p;R7+=s2p;R7+=J2p;R7+=T6p;var O7=x6p;O7+=z0v.M9U;O7+=w2p;var r7=x6p;r7+=a4p;this[r7][O0p][K9p]({display:l6j});this[O7][R7][U7]({display:I5});if(isMultiValue && !different){var V5=Y6p;V5+=q6p;V5+=J2p;this[V5](last,i5p);}}this[C5][k5][B5]({display:ids && ids[K5p] > k9U && different && !isMultiValue?l6j:K5});var i18n=this[Y6p][i5][E1j][d5];this[J5][V8p][g6j](isMultiEditable?i18n[C8p]:i18n[a1j]);this[X5][w5][H5](this[Y6p][x9p][m5],!isMultiEditable);this[Y6p][r9p][v5]();return d5p;},_typeFn:function(name){var R1j="ply";z0v.F0v();var O1j="ost";var Y5=m2p;Y5+=G6p;Y5+=r7p;Y5+=j1j;var A5=Y6p;A5+=p1j;A5+=z0v.R9U;A5+=J2p;var o5=n1p;o5+=z0v.C6p;o5+=s2p;o5+=s2p;var N5=U4p;N5+=X5p;N5+=w3p;var args=Array[N5][r1j][o5](arguments);args[A5]();args[Y5](this[Y6p][S6j]);var fn=this[Y6p][j2p][name];if(fn){var W5=p7p;W5+=O1j;var s5=x0p;s5+=R1j;return fn[s5](this[Y6p][W5],args);}}};Editor[J5p][U1j]={};Editor[J5p][G5]={"className":z0v.g6p,"data":z0v.g6p,"def":z0v.g6p,"fieldInfo":z0v.g6p,"id":z0v.g6p,"label":z0v.g6p,"labelInfo":z0v.g6p,"name":w8p,"type":I2j,"message":z0v.g6p,"multiEditable":d5p,"submit":d5p};Editor[b5][U1j][u5]={type:w8p,name:w8p,classes:w8p,opts:w8p,host:w8p};Editor[J5p][S5][f5]={container:w8p,label:w8p,labelInfo:w8p,fieldInfo:w8p,fieldError:w8p,fieldMessage:w8p};Editor[U1j]={};Editor[U1j][l5]={"init":function(dte){},"open":function(dte,append,fn){},"close":function(dte,fn){}};Editor[z5][F5]={"create":function(conf){},"get":function(conf){},"set":function(conf,val){},"enable":function(conf){},"disable":function(conf){}};Editor[U1j][e5]={"ajaxUrl":w8p,"ajax":w8p,"dataSource":w8p,"domTable":w8p,"opts":w8p,"displayController":w8p,"fields":{},"order":[],"id":-k9U,"displayed":i5p,"processing":i5p,"modifier":w8p,"action":w8p,"idSrc":w8p,"unique":g9U};Editor[U1j][V2j]={"label":w8p,"fn":w8p,"className":w8p};Editor[y5][C2j]={onReturn:Q5,onBlur:P5,onBackground:D2j,onComplete:Z5,onEsc:t5,onFieldError:L5,submit:g2j,focus:g9U,buttons:d5p,title:d5p,message:d5p,drawType:i5p,scope:k2j};Editor[T5]={};(function(){var S4j='<div class="DTED_Lightbox_Content">';var b3j="_scrollTop";var o2j="ller";var q2j="lightbox";z0v.h0v();var l4j='<div class="DTED_Lightbox_Close"></div>';var u4j='<div class="DTED_Lightbox_Content_Wrapper">';var N2j="displayCont";var w2j="_Conta";var K2j="gh";var v2j="er\">";var m2j="rapp";var i2j="box";var H2j="<div class=\"DTED DTED_Lightbox_W";var X2j="lass=\"DTED_Lightbox";var u3j="scrollTop";var f4j='<div class="DTED_Lightbox_Background"><div></div></div>';var x2j="iner\">";var Y3j='div.DTED_Lightbox_Content_Wrapper';var u2j="_shown";var q8=n1p;q8+=z0v.M9U;q8+=G6p;q8+=z0v.R9U;var o8=B2j;o8+=K2j;o8+=J2p;o8+=i2j;var N8=d2j;N8+=f5p;var v8=J2j;v8+=X2j;v8+=w2j;v8+=x2j;var m8=H2j;m8+=m2j;m8+=v2j;var M5=N2j;M5+=m6p;M5+=z0v.M9U;M5+=o2j;var h5=X4p;h5+=t2p;h5+=k2p;var c5=x6p;c5+=C9p;c5+=s2p;c5+=M2p;var self;Editor[c5][q2j]=$[f0p](d5p,{},Editor[h5][M5],{"init":function(dte){z0v.h0v();self[A2j]();return self;},"open":function(dte,append,callback){var W2j="tac";var G2j="child";var r5=n1p;r5+=s2p;r5+=Y2j;r5+=q6p;var p5=s2j;p5+=q6p;z0v.F0v();p5+=G6p;p5+=x6p;var j5=x6p;j5+=q6p;j5+=W2j;j5+=p7p;var a5=G2j;a5+=A7p;a5+=G6p;var E5=n1p;E5+=z0v.M9U;E5+=g9p;E5+=A3p;var n5=b2j;n5+=t6p;if(self[u2j]){if(callback){callback();}return;}self[n5]=dte;var content=self[S2j][E5];content[a5]()[j5]();content[p5](append)[k6j](self[S2j][r5]);self[u2j]=d5p;self[f2j](callback);},"close":function(dte,callback){if(!self[u2j]){if(callback){callback();}return;}self[l2j]=dte;self[z2j](callback);self[u2j]=i5p;},node:function(dte){var O5=b2j;O5+=a4p;z0v.F0v();return self[O5][F2j][g9U];},"_init":function(){var t2j='div.DTED_Lightbox_Content';var y2j="cit";var Q2j="wrappe";var e2j="opaci";var Z2j="_ready";var g0=e2j;g0+=J2p;g0+=W2p;var D0=n1j;D0+=Y6p;var C0=f8p;C0+=z0v.C6p;C0+=y2j;C0+=W2p;var V0=n1p;V0+=Y6p;V0+=Y6p;var I0=Q2j;I0+=m6p;var U5=Z9p;U5+=G6p;U5+=P2j;var R5=b2j;z0v.h0v();R5+=a4p;if(self[Z2j]){return;}var dom=self[R5];dom[U5]=$(t2j,self[S2j][I0]);dom[F2j][V0](C0,g9U);dom[L2j][D0](g0,g9U);},"_show":function(callback){var e3j=" class=\"DTED_Lightb";var P3j="ackgro";var n2j="ba";var z3j="box_Shown";var h2j="click.DTED_Lightb";var L3j="not";var X3j="bile";var J3j="ox_Mo";var d3j="DTED_Lightb";var r2j="ose";var i3j="entati";var l3j="div.DTED_Light";var g3j="Ani";var E2j="kgroun";var a2j="dyContent";var D3j="ffset";var S3j="orientation";var C3j="ody";var j2j="formE";var y3j="ox_Shown\"></div>";var R2j="ackground";var B3j="hei";var Z0=T2j;Z0+=c2j;var P0=h2j;P0+=M2j;var Q0=z0v.D6p;Q0+=T6p;Q0+=L6p;var y0=n2j;y0+=n1p;y0+=E2j;y0+=x6p;var e0=T2j;e0+=a2j;var F0=j2j;F0+=p2j;var f0=z0v.D6p;f0+=T6p;f0+=L6p;var S0=P4p;S0+=r2j;var u0=z0v.C6p;u0+=O2j;var b0=y4p;b0+=Y6p;b0+=q6p;var W0=z0v.D6p;W0+=R2j;var s0=U2j;s0+=I3j;var Y0=O2p;Y0+=x6p;Y0+=J2p;Y0+=q6p;var A0=w0p;A0+=m6p;A0+=V3j;var q0=O2p;q0+=x6p;q0+=z0v.M9U;q0+=w2p;var o0=x0p;o0+=V3p;o0+=x6p;var N0=b2j;N0+=z0v.M9U;N0+=w2p;var v0=z0v.D6p;v0+=C3j;var m0=z0v.M9U;m0+=D3j;m0+=g3j;var H0=n1p;H0+=z0v.M9U;H0+=G6p;H0+=z0v.R9U;var x0=n1p;x0+=Y6p;x0+=Y6p;var w0=w0p;w0+=k3j;var X0=z0v.C6p;X0+=m2p;X0+=J2p;X0+=z0v.M9U;var J0=B3j;J0+=m4p;J0+=K3j;var d0=n1j;d0+=Y6p;var i0=n1p;i0+=z0v.M9U;i0+=g9p;i0+=A3p;var k0=L3p;k0+=T6p;k0+=i3j;k0+=W8p;var that=this;var dom=self[S2j];if(window[k0] !== undefined){var K0=d3j;K0+=J3j;K0+=X3j;var B0=O8p;B0+=R8p;B0+=E1p;B0+=a1p;$(B9p)[B0](K0);}dom[i0][d0](J0,X0);dom[w0][x0]({top:-self[H0][m0]});$(v0)[k6j](self[N0][L2j])[o0](self[q0][A0]);self[w3j]();self[Y0][x3j](dom[s0],{opacity:k9U,top:g9U},callback);self[l2j][x3j](dom[W0],{opacity:k9U});setTimeout(function(){var m3j='text-indent';var H3j='div.DTE_Footer';var G0=n1p;G0+=Y6p;G0+=Y6p;z0v.h0v();$(H3j)[G0](m3j,-k9U);},w9U);dom[b0][u0](v3j,self[l2j][E1j][S0])[f0](N3j,function(e){var z0=n1p;z0+=o3j;z0+=q6p;var l0=O2p;l0+=x6p;z0v.h0v();l0+=J2p;l0+=q6p;self[l0][z0]();});$(self[l2j][o8p][F0])[q3j](self[l2j][o8p][e0]);dom[y0][A3j](N3j,function(e){z0v.h0v();self[l2j][L2j]();});$(Y3j,dom[F2j])[Q0](P0,function(e){z0v.h0v();var W3j='DTED_Lightbox_Content_Wrapper';if($(e[s3j])[l8p](W3j)){self[l2j][L2j]();}});$(window)[A3j](G3j,function(){self[w3j]();});self[b3j]=$(Z0)[u3j]();if(window[S3j] !== undefined){var n0=f3j;n0+=x6p;var M0=l3j;M0+=z3j;var h0=F3j;h0+=e3j;h0+=y3j;var c0=Q3j;c0+=x0p;c0+=y2p;c0+=J6p;var T0=G6p;T0+=z0v.M9U;T0+=J2p;var L0=z0v.D6p;L0+=P3j;L0+=Z3j;var t0=z0v.D6p;t0+=C3j;var kids=$(t0)[t3j]()[L3j](dom[L0])[T0](dom[c0]);$(B9p)[k6j](h0);$(M0)[n0](kids);}},"_heightCalc":function(){var a3j="ader";var M3j="uter";var E3j="div.DTE_He";var n3j="Height";var T3j="maxHei";var R0=T3j;R0+=K2j;R0+=J2p;var O0=n1p;O0+=Y6p;O0+=Y6p;var r0=c3j;r0+=h3j;var p0=z0v.M9U;p0+=M3j;p0+=n3j;var j0=E3j;j0+=a3j;var a0=j3j;a0+=p3j;var E0=b2j;E0+=z0v.M9U;E0+=w2p;var dom=self[E0];var maxHeight=$(window)[a0]() - self[r3j][O3j] * B9U - $(j0,dom[F2j])[p0]() - $(r0,dom[F2j])[R3j]();$(U3j,dom[F2j])[O0](R0,maxHeight);},"_hide":function(callback){var I4j="resize.DTED_";var v4j="rienta";var Y4j="_Sho";var C4j="unb";var K4j="nimate";var A4j="DTED_Lightbox";var m4j="moveCla";var x4j="DTED_L";var X4j="tA";var g4j=".DTED_Lightb";var H4j="ightbox_Mobile";var V4j="Lightbox";z0v.h0v();var H8=I4j;H8+=V4j;var x8=w0p;x8+=m2j;x8+=J6p;var w8=C4j;w8+=T6p;w8+=L6p;var X8=D4j;X8+=g4j;X8+=M2j;var J8=k4j;J8+=z0v.D6p;J8+=R5p;J8+=x6p;var d8=B4j;d8+=K4j;var i8=O2p;i8+=i4j;i8+=q6p;var B8=d4j;B8+=J4j;B8+=X4j;B8+=w4j;var k8=x4j;k8+=H4j;var g8=A7p;g8+=m4j;g8+=a1p;var D8=T2j;D8+=x6p;D8+=W2p;var U0=z0v.M9U;U0+=v4j;U0+=u6p;U0+=W8p;var dom=self[S2j];if(!callback){callback=function(){};}if(window[U0] !== undefined){var C8=x0p;C8+=y2p;C8+=V2p;C8+=N4j;var V8=o4j;V8+=q4j;var I8=c3j;I8+=A4j;I8+=Y4j;I8+=Y1j;var show=$(I8);show[V8]()[C8](B9p);show[s4j]();}$(D8)[g8](k8)[u3j](self[b3j]);self[l2j][x3j](dom[F2j],{opacity:g9U,top:self[r3j][B8]},function(){var K8=t2p;z0v.h0v();K8+=W4j;K8+=n1p;K8+=p7p;$(this)[K8]();callback();});self[i8][d8](dom[L2j],{opacity:g9U},function(){$(this)[D6j]();});dom[G4j][J8](X8);dom[L2j][w8](N3j);$(Y3j,dom[x8])[b4j](N3j);$(window)[b4j](H8);},"_dte":w8p,"_ready":i5p,"_shown":i5p,"_dom":{"wrapper":$(m8 + v8 + u4j + S4j + p0p + N8 + p0p + p0p),"background":$(f4j),"close":$(l4j),"content":w8p}});self=Editor[O9p][o8];self[q8]={"offsetAni":Y9U,"windowPadding":Y9U};})();(function(){var t4j="tainer\"></div>";var T4j="Shadow\"></div>";var F4j="<div class=\"DTED_Envelope_Close\">";var U4j="backgr";var u7j="backgro";var y4j="<div class=\"DTED_Envelope_Background\"><div></div>";var m7j="ntent_Wrapper";var M5j='<div class="DTED DTED_Envelope_Wrapper">';var L4j="<div class=\"DTED_Envelope_";var l9U=50;var Z4j="class=\"DTED_Envelope_Con";var e4j="&times;</d";var a4j="ontent";var t9U=600;var M4j="envelope";var T6c=z4j;T6c+=s2p;T6c+=M2p;var L6c=F4j;L6c+=e4j;L6c+=t5p;var t6c=y4j;t6c+=Q4j;var Z6c=F5p;Z6c+=e5p;Z6c+=g1p;Z6c+=y5p;var P6c=P4j;P6c+=Z4j;P6c+=t4j;var Q6c=L4j;Q6c+=T4j;var W8=z4j;W8+=c4j;W8+=h4j;var s8=X4p;s8+=x6p;s8+=q6p;s8+=k2p;var Y8=b0p;Y8+=G6p;Y8+=x6p;var A8=v8p;A8+=y2p;A8+=s2p;A8+=M2p;var self;Editor[A8][M4j]=$[Y8](d5p,{},Editor[s8][W8],{"init":function(dte){self[l2j]=dte;z0v.F0v();self[A2j]();return self;},"open":function(dte,append,callback){var E4j="ren";var n4j="dChild";var p4j="appendChild";var f8=O2p;f8+=l9p;f8+=w2p;var S8=s2j;S8+=g3p;S8+=n4j;var u8=O2p;u8+=x6p;u8+=z0v.M9U;u8+=w2p;var b8=o4j;b8+=x6p;b8+=E4j;var G8=n1p;G8+=a4j;self[l2j]=dte;$(self[S2j][G8])[b8]()[D6j]();self[S2j][j4j][p4j](append);self[u8][j4j][S8](self[f8][G4j]);self[f2j](callback);},"close":function(dte,callback){var l8=O2p;l8+=x6p;z0v.F0v();l8+=J2p;l8+=q6p;self[l8]=dte;self[z2j](callback);},node:function(dte){var z8=O2p;z8+=x6p;z8+=z0v.M9U;z8+=w2p;z0v.h0v();return self[z8][F2j][g9U];},"_init":function(){var V7j="den";var k7j="ntain";var R4j="ispl";var d7j="_cssBackgroundOpacity";var r4j="yle";var g7j="velope_Co";var X7j='visible';var i7j="visbility";var J7j='opacity';var B7j="ady";var O4j="non";var D7j="div.DTED_En";var n8=Y4p;n8+=r4j;var M8=O4j;M8+=q6p;var h8=x6p;h8+=R4j;h8+=M2p;var c8=U4j;c8+=I7j;c8+=L6p;var T8=O2p;T8+=o8p;var L8=V6j;L8+=W2p;var t8=p1j;t8+=x6p;t8+=V7j;var Z8=O2p;Z8+=x6p;Z8+=z0v.M9U;Z8+=w2p;var P8=C7j;P8+=y2p;P8+=q6p;P8+=m6p;var Q8=O2p;Q8+=o8p;var y8=D7j;y8+=g7j;y8+=k7j;y8+=J6p;var e8=O2p;e8+=x6p;e8+=z0v.M9U;z0v.h0v();e8+=w2p;var F8=O2p;F8+=m6p;F8+=q6p;F8+=B7j;if(self[F8]){return;}self[e8][j4j]=$(y8,self[Q8][P8])[g9U];self[Z8][L2j][K7j][i7j]=t8;self[S2j][L2j][K7j][L8]=l6j;self[d7j]=$(self[T8][L2j])[K9p](J7j);self[S2j][c8][K7j][h8]=M8;self[S2j][L2j][n8][i7j]=X7j;},"_show":function(callback){var Q7j="Wid";var w7j="bi";var C5j="offse";var x7j="div.DTE";var l7j="rginL";var N7j="click.DTED_E";var b7j="ity";var U7j="window";var L7j="dC";var K5j='click.DTED_Envelope';var T7j="hild";var c7j="ound";var z7j="eft";var E7j="_findAttachRow";var I5j="Pad";var H7j="D_Lightbox_Co";var k5j="html,";var n7j="opacity";var S7j="styl";var O7j="fadeIn";var h7j="ndC";var Y7j="rou";var W7j="loc";var F7j="sty";var s7j="ndOpacity";var D5j="tHeight";var v7j="kground";var o7j="nvelope";var A7j="_cssBackg";var g5j="offs";var p7j="px";var R7j="windowScroll";var J5j='resize.DTED_Envelope';var r9=z0v.D6p;r9+=T6p;r9+=G6p;r9+=x6p;var j9=w7j;j9+=G6p;j9+=x6p;var a9=O2p;a9+=x6p;a9+=z0v.M9U;a9+=w2p;var E9=x7j;E9+=H7j;E9+=m7j;var n9=z0v.D6p;n9+=T6p;n9+=L6p;var M9=z0v.D6p;M9+=j7p;M9+=v7j;var c9=N7j;c9+=o7j;var T9=T6p;T9+=B6p;T9+=z0v.O9U;T9+=G6p;var L9=b2j;L9+=J2p;L9+=q6p;var t9=z0v.C6p;t9+=J2p;t9+=q7j;var Z9=n1p;Z9+=s2p;Z9+=Y2j;Z9+=q6p;var S9=G6p;S9+=L3p;S9+=Y7p;S9+=s2p;var u9=A7j;u9+=Y7j;u9+=s7j;var b9=z0v.D6p;b9+=W7j;b9+=M1j;var G9=x6p;G9+=T6p;G9+=Y6p;G9+=G7j;var W9=Y6p;W9+=X5p;W9+=s2p;W9+=q6p;var s9=O2p;s9+=o8p;var Y9=f8p;Y9+=j7p;Y9+=b7j;var A9=u7j;A9+=m2p;A9+=L6p;var q9=O2p;q9+=x6p;q9+=z0v.M9U;q9+=w2p;var o9=S7j;o9+=q6p;var N9=f7j;N9+=J2p;N9+=q6p;N9+=g9p;var v9=b2j;v9+=z0v.M9U;v9+=w2p;var m9=y2p;m9+=Z6p;var H9=J2p;H9+=z0v.M9U;H9+=y2p;var x9=O2p;x9+=x6p;x9+=z0v.M9U;x9+=w2p;var w9=y2p;w9+=Z6p;var X9=w2p;X9+=z0v.C6p;X9+=l7j;X9+=z7j;var J9=w0p;J9+=m6p;J9+=z0v.C6p;J9+=I3j;var d9=O2p;d9+=l9p;d9+=w2p;var i9=y2p;i9+=Z6p;var K9=w0p;K9+=l0p;K9+=J2p;K9+=p7p;var B9=F7j;B9+=T1j;var k9=G6p;k9+=z0v.M9U;k9+=G6p;k9+=q6p;var g9=x6p;g9+=C9p;g9+=e7j;var D9=y7j;D9+=Q7j;D9+=P7j;var C9=x6p;C9+=r6j;var V9=S7j;z0v.F0v();V9+=q6p;var I9=U2j;I9+=I3j;var U8=z0v.C6p;U8+=m2p;U8+=Z7j;var R8=O2p;R8+=l9p;R8+=w2p;var O8=O2p;O8+=x6p;O8+=z0v.M9U;O8+=w2p;var r8=t7j;r8+=G6p;r8+=L7j;r8+=T7j;var p8=z0v.D6p;p8+=z0v.M9U;p8+=x6p;p8+=W2p;var j8=U4j;j8+=c7j;var a8=t7j;a8+=h7j;a8+=T7j;var E8=T2j;E8+=x6p;E8+=W2p;var that=this;var formHeight;if(!callback){callback=function(){};}document[E8][a8](self[S2j][j8]);document[p8][r8](self[O8][F2j]);self[R8][j4j][K7j][M7j]=U8;var style=self[S2j][I9][V9];style[n7j]=g9U;style[C9]=l6j;var targetRow=self[E7j]();var height=self[w3j]();var width=targetRow[D9];style[g9]=k9;style[n7j]=k9U;self[S2j][F2j][B9][K9]=width + i9;self[d9][J9][K7j][X9]=-(width / B9U) + w9;self[x9][F2j][K7j][a7j]=$(targetRow)[y7j]()[H9] + targetRow[j7j] + m9;self[v9][N9][o9][a7j]=-k9U * height - o9U + p7j;self[q9][A9][K7j][Y9]=g9U;self[s9][L2j][W9][G9]=b9;$(self[S2j][L2j])[r7j]({'opacity':self[u9]},S9);$(self[S2j][F2j])[O7j]();if(self[r3j][R7j]){var F9=U7j;F9+=I5j;F9+=g1p;F9+=V5j;var z9=C5j;z9+=D5j;var l9=g5j;l9+=v4p;var f9=k5j;f9+=B5j;f9+=W2p;$(f9)[r7j]({"scrollTop":$(targetRow)[l9]()[a7j] + targetRow[z9] - self[r3j][F9]},function(){z0v.h0v();var y9=z0v.C6p;y9+=w4j;y9+=x1j;var e9=O2p;e9+=x6p;e9+=z0v.M9U;e9+=w2p;$(self[e9][j4j])[y9]({"top":g9U},t9U,callback);});}else {var P9=n1p;P9+=a4j;var Q9=O2p;Q9+=l9p;Q9+=w2p;$(self[Q9][P9])[r7j]({"top":g9U},t9U,callback);}$(self[S2j][Z9])[t9](v3j,self[L9][T9][G4j])[A3j](c9,function(e){var h9=O2p;h9+=x6p;h9+=J2p;z0v.F0v();h9+=q6p;self[h9][G4j]();});$(self[S2j][M9])[n9](K5j,function(e){self[l2j][L2j]();});$(E9,self[a9][F2j])[j9](K5j,function(e){var i5j='DTED_Envelope_Content_Wrapper';if($(e[s3j])[l8p](i5j)){var p9=O2p;p9+=d5j;self[p9][L2j]();}});$(window)[r9](J5j,function(){self[w3j]();});},"_heightCalc":function(){var X5j="outerHeig";var w5j="div.DTE_";var A5j='div.DTE_Header';var x5j="Footer";var o5j="alc";var H5j="outerHe";var v5j="ei";var Y5j='maxHeight';var N5j="ghtC";var J6c=X5j;J6c+=K3j;var d6c=x6p;d6c+=z0v.M9U;d6c+=w2p;var i6c=O2p;i6c+=x6p;i6c+=J2p;i6c+=q6p;var K6c=n1p;K6c+=Y6p;K6c+=Y6p;var B6c=O2p;B6c+=o8p;var k6c=w0p;k6c+=k3j;var g6c=b2j;g6c+=z0v.M9U;g6c+=w2p;z0v.F0v();var D6c=w5j;D6c+=x5j;var C6c=H5j;C6c+=p3j;var V6c=j3j;V6c+=T6p;V6c+=m4p;V6c+=K3j;var I6c=Z9p;I6c+=m5j;var U9=w0p;U9+=m6p;U9+=V3j;var R9=p7p;R9+=v5j;R9+=N5j;R9+=o5j;var O9=M7j;O9+=q5j;O9+=s2p;O9+=n1p;var formHeight;formHeight=self[r3j][O9]?self[r3j][R9](self[S2j][U9]):$(self[S2j][I6c])[t3j]()[M7j]();var maxHeight=$(window)[V6c]() - self[r3j][O3j] * B9U - $(A5j,self[S2j][F2j])[C6c]() - $(D6c,self[g6c][k6c])[R3j]();$(U3j,self[B6c][F2j])[K6c](Y5j,maxHeight);return $(self[i6c][d6c][F2j])[J6c]();},"_hide":function(callback){var S5j="nima";var s5j="nb";var u5j="_Co";var b5j="_Lightbox";var G5j="div.DTED";var s6c=m2p;s6c+=s5j;s6c+=R5p;s6c+=x6p;var Y6c=Q3j;Y6c+=z0v.C6p;Y6c+=W5j;Y6c+=m6p;var A6c=O2p;A6c+=x6p;z0v.h0v();A6c+=a4p;var q6c=G5j;q6c+=b5j;q6c+=u5j;q6c+=m7j;var o6c=U4j;o6c+=z0v.M9U;o6c+=Z3j;var w6c=O2p;w6c+=o8p;var X6c=z0v.C6p;X6c+=S5j;X6c+=t6p;if(!callback){callback=function(){};}$(self[S2j][j4j])[X6c]({"top":-(self[w6c][j4j][j7j] + l9U)},t9U,function(){var l5j="fad";var z5j="eOut";var f5j="rmal";var v6c=V9p;v6c+=f5j;var m6c=l5j;m6c+=z5j;var H6c=u7j;H6c+=k4j;H6c+=x6p;var x6c=w0p;x6c+=m6p;x6c+=z0v.C6p;x6c+=I3j;$([self[S2j][x6c],self[S2j][H6c]])[m6c](v6c,function(){var N6c=m6p;N6c+=q6p;N6c+=w2p;N6c+=B1j;z0v.F0v();$(this)[N6c]();callback();});});$(self[S2j][G4j])[b4j](N3j);$(self[S2j][o6c])[b4j](N3j);$(q6c,self[A6c][Y6c])[s6c](N3j);$(window)[b4j](G3j);},"_findAttachRow":function(){var Z5j='head';var f6c=F5j;f6c+=t6p;var S6c=O2p;S6c+=x6p;S6c+=t6p;var G6c=Z9p;G6c+=e5j;var W6c=z0v.R9U;W6c+=G6p;var dt=new $[W6c][F7p][y5j](self[l2j][Y6p][Q5j]);z0v.F0v();if(self[G6c][P5j] === Z5j){var u6c=p7p;u6c+=t5j;u6c+=J6p;var b6c=J2p;b6c+=z0v.C6p;b6c+=L5j;return dt[b6c]()[u6c]();}else if(self[S6c][Y6p][T5j] === f6c){var z6c=j3j;z6c+=z0v.C6p;z6c+=x6p;z6c+=J6p;var l6c=J2p;l6c+=z0v.C6p;l6c+=c5j;l6c+=q6p;return dt[l6c]()[z6c]();}else {var y6c=G6p;y6c+=s5p;y6c+=q6p;var e6c=b2j;e6c+=t6p;var F6c=m6p;F6c+=z0v.M9U;F6c+=w0p;return dt[F6c](self[e6c][Y6p][h5j])[y6c]();}},"_dte":w8p,"_ready":i5p,"_cssBackgroundOpacity":k9U,"_dom":{"wrapper":$(M5j + Q6c + P6c + Z6c)[g9U],"background":$(t6c)[g9U],"close":$(L6c)[g9U],"content":w8p}});self=Editor[T6c][M4j];self[r3j]={"windowPadding":l9U,"heightCalc":w8p,"attach":n5j,"windowScroll":d5p};})();Editor[L8p][c6c]=function(cfg,after){var B0j="editFiel";var J0j="rd";var m0j="nArr";var D0j="Error adding field '";z0v.F0v();var I0j="dataSour";var V0j="Error adding field. The field requires a `name` option";var j5j="reverse";var K0j="multiReset";var U5j="initFi";var g0j="'. A field already exists with this name";var h6c=E5j;h6c+=m6p;h6c+=M2p;if($[h6c](cfg)){var M6c=T1j;M6c+=G6p;M6c+=a5j;if(after !== undefined){cfg[j5j]();}for(var i=g9U;i < cfg[M6c];i++){var n6c=p5j;n6c+=x6p;this[n6c](cfg[i],after);}}else {var V1c=A0p;V1c+=r5j;var r6c=P4p;r6c+=O5j;var p6c=p4p;p6c+=R5j;var j6c=U5j;j6c+=R5j;var a6c=O2p;a6c+=I0j;a6c+=n1p;a6c+=q6p;var E6c=G6p;E6c+=D5p;E6c+=q6p;var name=cfg[E6c];if(name === undefined){throw V0j;}if(this[Y6p][C0j][name]){throw D0j + name + g0j;}this[a6c](j6c,cfg);var field=new Editor[p6c](cfg,this[r6c][k0j],this);if(this[Y6p][g2p]){var O6c=B0j;O6c+=r5j;var editFields=this[Y6p][O6c];field[K0j]();$[y8p](editFields,function(idSrc,edit){var i0j="iSet";var d0j="alFromDa";var I1c=x6p;I1c+=q6p;I1c+=z0v.R9U;var U6c=d1p;U6c+=i0j;var val;if(edit[Q0p]){var R6c=d6p;R6c+=d0j;R6c+=W4j;val=field[R6c](edit[Q0p]);}field[U6c](idSrc,val !== undefined?val:field[I1c]());});}this[Y6p][V1c][name]=field;if(after === undefined){var C1c=z0v.M9U;C1c+=J0j;C1c+=q6p;C1c+=m6p;this[Y6p][C1c][X0j](name);}else if(after === w8p){var g1c=m2p;g1c+=w0j;g1c+=p1j;g1c+=x0j;var D1c=H0j;D1c+=J6p;this[Y6p][D1c][g1c](name);}else {var B1c=z0v.M9U;B1c+=m6p;B1c+=x6p;B1c+=J6p;var k1c=T6p;k1c+=m0j;k1c+=M2p;var idx=$[k1c](after,this[Y6p][v0j]);this[Y6p][B1c][N0j](idx + k9U,g9U,name);}}this[o0j](this[v0j]());return this;};Editor[L8p][K1c]=function(newAjax){var d1c=q0j;d1c+=A0j;if(newAjax){var i1c=z0v.C6p;i1c+=z4p;i1c+=z0v.C6p;i1c+=Z6p;this[Y6p][i1c]=newAjax;return this;}return this[Y6p][d1c];};Editor[L8p][J1c]=function(){var G0j="tOpts";var Y0j="lose";var s0j="nction";var x1c=n1p;x1c+=Y0j;var w1c=z0v.R9U;w1c+=m2p;w1c+=s0j;var X1c=W0j;X1c+=G0j;var onBackground=this[Y6p][X1c][b0j];if(typeof onBackground === w1c){onBackground(this);}else if(onBackground === D2j){this[u0j]();}else if(onBackground === x1c){var H1c=y4p;H1c+=Y6p;H1c+=q6p;this[H1c]();}else if(onBackground === S0j){var m1c=Y6p;m1c+=f0j;m1c+=l0j;this[m1c]();}return this;};Editor[L8p][u0j]=function(){var z0j="_blu";var v1c=z0j;v1c+=m6p;this[v1c]();return this;};Editor[N1c][o1c]=function(cells,fieldNames,show,opts){var F0j="bub";var n0j="bubble";var y0j="du";var h0j="inObjec";var P0j="bubb";var M0j="_ti";var E0j='boolean';var e0j="ndivi";var b1c=F0j;b1c+=z0v.D6p;b1c+=s2p;z0v.F0v();b1c+=q6p;var G1c=T6p;G1c+=e0j;G1c+=y0j;G1c+=Q0j;var W1c=P0j;W1c+=T1j;var s1c=Z0j;s1c+=t0j;s1c+=L0j;s1c+=w0j;var Y1c=q6p;Y1c+=T0j;Y1c+=x6p;var A1c=c0j;A1c+=h0j;A1c+=J2p;var q1c=M0j;q1c+=x6p;q1c+=W2p;var that=this;if(this[q1c](function(){that[n0j](cells,fieldNames,opts);})){return this;}if($[A1c](fieldNames)){opts=fieldNames;fieldNames=undefined;show=d5p;}else if(typeof fieldNames === E0j){show=fieldNames;fieldNames=undefined;opts=undefined;}if($[u6j](show)){opts=show;show=d5p;}if(show === undefined){show=d5p;}opts=$[Y1c]({},this[Y6p][s1c][W1c],opts);var editFields=this[a0j](G1c,cells,fieldNames);this[j0j](cells,editFields,b1c,opts,function(){var b8j="rmO";var O0j="_anim";var y8j='<div class="DTE_Processing_Indicator"><span></div>';var r0j="ostopen";var S8j='resize.';var k8j="chi";var s8j="Nodes";var Z8j="prepend";var e8j='" title="';var g8j="ormErr";var X8j="div class";var F8j='"><div></div></div>';var V8j="eReg";var z8j="bg";var W8j="preope";var A8j="ncat";var D8j="pend";var Y8j="ubble";var l8j='attach';var N8j="wrapp";var P8j="formI";var w2c=p0j;w2c+=r0j;var X2c=O0j;X2c+=R0j;X2c+=q6p;var J2c=U0j;J2c+=b1j;var g2c=I8j;g2c+=s2p;g2c+=Y2j;g2c+=V8j;var U1c=C8j;U1c+=w2p;var R1c=x8p;R1c+=D8j;var O1c=z0v.R9U;O1c+=g8j;O1c+=z0v.M9U;O1c+=m6p;var r1c=x6p;r1c+=a4p;var p1c=k8j;p1c+=B8j;p1c+=g3p;var j1c=n1p;j1c+=K8j;var E1c=F5p;E1c+=i8j;E1c+=y5p;var n1c=d8j;n1c+=d2j;n1c+=f5p;var M1c=y2p;M1c+=J8j;M1c+=g9p;M1c+=J6p;var h1c=F5p;h1c+=X8j;h1c+=w8j;h1c+=S5p;var c1c=F5p;c1c+=x8j;c1c+=t5p;var T1c=d8j;T1c+=F5p;T1c+=e5p;T1c+=H8j;var L1c=T6p;L1c+=m8j;L1c+=G6p;var t1c=v8j;t1c+=z0v.C6p;t1c+=P5p;var Z1c=s2p;Z1c+=R5p;Z1c+=q6p;Z1c+=m6p;var P1c=P4j;P1c+=O5p;P1c+=S5p;var Q1c=S5p;Q1c+=f5p;var y1c=N8j;y1c+=J6p;var e1c=v8j;e1c+=z0v.C6p;e1c+=a1p;e1c+=o8j;var F1c=z0v.C6p;F1c+=y2p;F1c+=y2p;F1c+=q8j;var z1c=n1p;z1c+=z0v.M9U;z1c+=A8j;var l1c=z0v.D6p;l1c+=Y8j;l1c+=s8j;var f1c=z0v.M9U;f1c+=G6p;var S1c=O2p;S1c+=W8j;S1c+=G6p;var u1c=G8j;u1c+=b8j;u1c+=y2p;u1c+=U1p;var namespace=that[u1c](opts);var ret=that[S1c](u8j);if(!ret){return that;}$(window)[f1c](S8j + namespace,function(){z0v.F0v();that[f8j]();});var nodes=[];that[Y6p][l1c]=nodes[z1c][F1c](nodes,_pluck(editFields,l8j));var classes=that[x9p][n0j];var background=$(L0p + classes[z8j] + F8j);var container=$(e1c + classes[y1c] + Q1c + P1c + classes[Z1c] + M0p + L0p + classes[Q5j] + M0p + t1c + classes[G4j] + e8j + that[L1c][G4j] + T1c + y8j + p0p + c1c + h1c + classes[M1c] + n1c + E1c);if(show){var a1c=z0v.D6p;a1c+=z0v.M9U;a1c+=c2j;container[q3j](B9p);background[q3j](a1c);}var liner=container[t3j]()[Q8j](g9U);var table=liner[j1c]();var close=table[p1c]();liner[k6j](that[r1c][O1c]);table[R1c](that[o8p][U1c]);if(opts[i3p]){var I2c=P8j;I2c+=e5j;I2c+=z0v.M9U;liner[Z8j](that[o8p][I2c]);}if(opts[t8j]){var C2c=p7p;C2c+=q6p;C2c+=z0v.C6p;C2c+=L8j;var V2c=v6p;V2c+=q6p;V2c+=w3p;V2c+=L6p;liner[V2c](that[o8p][C2c]);}if(opts[T8j]){var D2c=x0p;D2c+=y2p;D2c+=g3p;D2c+=x6p;table[D2c](that[o8p][T8j]);}var pair=$()[O8p](container)[O8p](background);that[g2c](function(submitComplete){z0v.F0v();that[x3j](pair,{opacity:g9U},function(){var n8j="tach";var M8j="ize";z0v.F0v();if(this === container[g9U]){var d2c=F0j;d2c+=z0v.D6p;d2c+=T1j;var i2c=P4p;i2c+=Y2j;i2c+=c8j;var K2c=Y3p;K2c+=h8j;var B2c=m6p;B2c+=j1p;B2c+=M8j;B2c+=K6p;var k2c=t2p;k2c+=n8j;pair[k2c]();$(window)[d4j](B2c + namespace);that[E8j]();that[K2c](i2c,[d2c]);}});});background[J2c](function(){that[u0j]();});close[D4j](function(){z0v.h0v();that[a8j]();});that[f8j]();that[X2c](pair,{opacity:k9U});that[j8j](that[Y6p][p8j],opts[F8p]);that[w2c](u8j,d5p);});return this;};Editor[x2c][f8j]=function(){var v9j="bottom";var q9j='left';var V9j="botto";var m9j='top';var O8j="asse";var k9j="bubbleNodes";var N9U=15;var o9j='below';var g9j='div.DTE_Bubble_Liner';var x9j="right";var D9j="div.DTE_Bub";var U8j="outerW";var P2c=J2p;P2c+=z0v.M9U;P2c+=y2p;var Q2c=r8j;Q2c+=c1j;Q2c+=p7p;var y2c=u4p;y2c+=z0v.D6p;y2c+=z0v.D6p;y2c+=T1j;var e2c=P4p;e2c+=O8j;e2c+=Y6p;var F2c=R8j;F2c+=x6p;F2c+=J2p;F2c+=p7p;var z2c=U8j;z2c+=T6p;z2c+=i4j;z2c+=p7p;var l2c=m6p;l2c+=T6p;l2c+=I9j;var f2c=s2p;f2c+=a9p;f2c+=J2p;var S2c=r8j;S2c+=a5j;var u2c=V9j;u2c+=w2p;var b2c=T1j;b2c+=H6j;b2c+=p7p;var G2c=s2p;G2c+=C9j;G2c+=J2p;G2c+=p7p;var W2c=s2p;W2c+=q6p;W2c+=x0j;var H2c=D9j;H2c+=L5j;var wrapper=$(H2c),liner=$(g9j),nodes=this[Y6p][k9j];var position={top:g9U,left:g9U,right:g9U,bottom:g9U};$[y8p](nodes,function(i,node){var d9j="ri";var w9j="left";var B9j="bot";var X9j="fs";z0v.F0v();var K9j="tom";var i9j="setWidth";var s2c=B9j;s2c+=K9j;var Y2c=d4j;Y2c+=i9j;var A2c=T1j;A2c+=x0j;var q2c=d9j;q2c+=m4p;q2c+=K3j;var o2c=s2p;o2c+=q6p;o2c+=z0v.R9U;o2c+=J2p;var N2c=J2p;N2c+=z0v.M9U;N2c+=y2p;var v2c=m4p;v2c+=q6p;v2c+=J2p;var m2c=J9j;m2c+=X9j;m2c+=v4p;var pos=$(node)[m2c]();node=$(node)[v2c](g9U);position[a7j]+=pos[N2c];position[w9j]+=pos[o2c];position[q2c]+=pos[A2c] + node[Y2c];position[s2c]+=pos[a7j] + node[j7j];});position[a7j]/=nodes[K5p];position[W2c]/=nodes[G2c];position[x9j]/=nodes[b2c];position[u2c]/=nodes[S2c];var top=position[a7j],left=(position[f2c] + position[l2c]) / B9U,width=liner[z2c](),visLeft=left - width / B9U,visRight=visLeft + width,docWidth=$(window)[F2c](),padding=N9U,classes=this[e2c][y2c];wrapper[K9p]({top:top,left:left});if(liner[Q2c] && liner[y7j]()[P2c] < g9U){var Z2c=z0v.D6p;Z2c+=q6p;Z2c+=s2p;Z2c+=H9j;wrapper[K9p](m9j,position[v9j])[u9p](Z2c);}else {wrapper[N9j](o9j);}if(visRight + padding > docWidth){var t2c=n1p;t2c+=Y6p;t2c+=Y6p;var diff=visRight - docWidth;liner[t2c](q9j,visLeft < padding?-(visLeft - padding):-(diff + padding));}else {var L2c=s2p;L2c+=q6p;L2c+=x0j;liner[K9p](L2c,visLeft < padding?-(visLeft - padding):g9U);}return this;};Editor[L8p][T2c]=function(buttons){var W9j="sic";var s9j="_ba";var E2c=x6p;E2c+=z0v.M9U;E2c+=w2p;var n2c=a8p;n2c+=A9j;n2c+=Y9j;var c2c=s9j;z0v.F0v();c2c+=W9j;var that=this;if(buttons === c2c){var M2c=Y6p;M2c+=B4p;M2c+=K4p;M2c+=J2p;var h2c=z0v.C6p;h2c+=z0v.E9U;h2c+=L0j;h2c+=G6p;buttons=[{text:this[E1j][this[Y6p][h2c]][M2c],action:function(){z0v.h0v();this[J1j]();}}];}else if(!$[n2c](buttons)){buttons=[buttons];}$(this[E2c][T8j])[G9j]();$[y8p](buttons,function(i,btn){var y9j='<button></button>';var u9j="eyp";var F9j="sName";var z9j="sNa";var P9j="tabIndex";var b9j="ic";var f9j="bindex";var d3c=z0v.D6p;d3c+=U5p;d3c+=Z7j;d3c+=w0j;var i3c=l9p;i3c+=w2p;var B3c=P4p;B3c+=b9j;B3c+=M1j;var k3c=z0v.M9U;k3c+=G6p;var D3c=M1j;D3c+=u9j;D3c+=m6p;D3c+=S9j;var V3c=W4j;V3c+=f9j;var I3c=p7p;I3c+=o1j;var U2c=P4p;U2c+=l9j;U2c+=z9j;U2c+=S6p;var R2c=n1p;R2c+=N9p;R2c+=F9j;var O2c=z0v.R9U;O2c+=z0v.M9U;O2c+=m6p;O2c+=w2p;var r2c=P4p;r2c+=P3p;r2c+=j1p;var p2c=z0v.C6p;p2c+=e9j;var j2c=B6j;j2c+=q6p;j2c+=s2p;var a2c=D1j;a2c+=M1p;if(typeof btn === a2c){btn={text:btn,action:function(){z0v.F0v();this[J1j]();}};}var text=btn[I2j] || btn[j2c];var action=btn[p2c] || btn[c7p];$(y9j,{'class':that[r2c][O2c][V2j] + (btn[R2c]?T0p + btn[U2c]:l7p)})[I3c](typeof text === E8p?text(that):text || l7p)[Q9j](V3c,btn[P9j] !== undefined?btn[P9j]:g9U)[W8p](Z9j,function(e){if(e[t9j] === m9U && action){var C3c=n1p;C3c+=z0v.C6p;C3c+=s2p;C3c+=s2p;action[C3c](that);}})[W8p](D3c,function(e){var g3c=L9j;g3c+=W2p;z0v.F0v();g3c+=T9j;g3c+=q6p;if(e[g3c] === m9U){e[c9j]();}})[k3c](B3c,function(e){e[c9j]();if(action){var K3c=h9j;K3c+=s2p;K3c+=s2p;action[K3c](that,e);}})[q3j](that[i3c][d3c]);});return this;};Editor[J3c][M9j]=function(fieldName){var E9j="incl";var j9j="Fields";var a9j="ude";var p9j="Arra";var X3c=z0v.R9U;X3c+=n9j;X3c+=x6p;z0v.F0v();X3c+=Y6p;var that=this;var fields=this[Y6p][X3c];if(typeof fieldName === Z6j){var v3c=E9j;v3c+=a9j;v3c+=j9j;var m3c=L3p;m3c+=t2p;m3c+=m6p;var H3c=R5p;H3c+=p9j;H3c+=W2p;var x3c=x6p;x3c+=q6p;x3c+=D1j;x3c+=g1j;var w3c=r9j;w3c+=q6p;w3c+=r4p;that[w3c](fieldName)[x3c]();delete fields[fieldName];var orderIdx=$[H3c](fieldName,this[Y6p][v0j]);this[Y6p][m3c][N0j](orderIdx,k9U);var includeIdx=$[b6j](fieldName,this[Y6p][v3c]);if(includeIdx !== -k9U){var N3c=F4p;N3c+=t8p;this[Y6p][p8j][N3c](includeIdx,k9U);}}else {$[y8p](this[O9j](fieldName),function(i,name){that[M9j](name);});}return this;};Editor[o3c][G4j]=function(){var q3c=R9j;q3c+=J4j;z0v.F0v();this[q3c](i5p);return this;};Editor[A3c][U9j]=function(arg1,arg2,arg3,arg4){var I6W="ini";var x6W="_actionClass";var k6W="ifier";var D6W="_displa";var t3c=I6W;t3c+=V6W;t3c+=R0j;z0v.F0v();t3c+=q6p;var Z3c=C6W;Z3c+=G6p;Z3c+=J2p;var e3c=D6W;e3c+=g6W;var F3c=G1j;F3c+=b1j;var z3c=v8p;z3c+=G7j;var l3c=Y6p;l3c+=X5p;l3c+=T1j;var f3c=z0v.R9U;f3c+=L3p;f3c+=w2p;var S3c=p1p;S3c+=k6W;var u3c=j7p;u3c+=J2p;u3c+=L0j;u3c+=G6p;var b3c=Y7p;b3c+=T6p;b3c+=G6p;var G3c=w2p;G3c+=z0v.M9U;G3c+=t2p;var s3c=B6W;s3c+=K6W;var Y3c=r9j;Y3c+=i6W;var that=this;var fields=this[Y6p][Y3c];var count=k9U;if(this[d6W](function(){that[U9j](arg1,arg2,arg3,arg4);})){return this;}if(typeof arg1 === J6W){count=arg1;arg1=arg2;arg2=arg3;}this[Y6p][s3c]={};for(var i=g9U;i < count;i++){var W3c=c8j;W3c+=T6p;W3c+=X6W;this[Y6p][W3c][i]={fields:this[Y6p][C0j]};}var argOpts=this[w6W](arg1,arg2,arg3,arg4);this[Y6p][G3c]=b3c;this[Y6p][u3c]=U9j;this[Y6p][S3c]=w8p;this[o8p][f3c][l3c][z3c]=F3c;this[x6W]();this[e3c](this[C0j]());$[y8p](fields,function(name,field){var H6W="tiReset";var P3c=x6p;P3c+=a9p;var Q3c=Y6p;Q3c+=q6p;Q3c+=J2p;var y3c=x5p;y3c+=H6W;field[y3c]();for(var i=g9U;i < count;i++){field[m6W](i,field[O4p]());}field[Q3c](field[P3c]());});this[Z3c](t3c,w8p,function(){var v6W="maybeO";var N6W="_assemb";var o6W="leMain";var T3c=v6W;T3c+=V3p;var L3c=N6W;L3c+=o6W;z0v.F0v();that[L3c]();that[q6W](argOpts[S6j]);argOpts[T3c]();});return this;};Editor[L8p][A6W]=function(parent){var Y6W=".e";var E3c=Y6W;z0v.h0v();E3c+=x6p;E3c+=q6p;E3c+=y2p;var n3c=J9j;n3c+=z0v.R9U;var M3c=G6p;M3c+=z0v.M9U;M3c+=t2p;var h3c=z0v.R9U;h3c+=T6p;h3c+=R5j;if($[s6W](parent)){var c3c=s2p;c3c+=q6p;c3c+=G6p;c3c+=a5j;for(var i=g9U,ien=parent[c3c];i < ien;i++){this[A6W](parent[i]);}return this;}var field=this[h3c](parent);$(field[M3c]())[n3c](E3c);return this;};Editor[a3c][j3c]=function(parent,url,opts){var f6W="dependent";var c6W='.edep';var S6W="Arr";var I4c=r1p;I4c+=m4p;I4c+=q6p;var U3c=W6W;z0v.F0v();U3c+=W8p;var R3c=G6W;R3c+=b6W;R3c+=B2p;R3c+=H2p;var O3c=u6W;O3c+=s2p;O3c+=x6p;var p3c=a8p;p3c+=S6W;p3c+=z0v.C6p;p3c+=W2p;if($[p3c](parent)){var r3c=T1j;r3c+=V5j;r3c+=P7j;for(var i=g9U,ien=parent[r3c];i < ien;i++){this[f6W](parent[i],url,opts);}return this;}var that=this;var field=this[O3c](parent);var ajaxOpts={type:R3c,dataType:U3c};opts=$[f0p]({event:I4c,data:w8p,preUpdate:w8p,postUpdate:w8p},opts);var update=function(json){var P6W='update';var e6W="messag";var y6W="preUpdate";var F6W="post";var t6W="postUpdate";var Z6W='disable';var d4c=y2p;d4c+=l6W;d4c+=z6W;var i4c=F6W;i4c+=W1j;i4c+=x6p;i4c+=b6p;var B4c=Y6p;B4c+=e1j;B4c+=w0p;var k4c=p1j;k4c+=x6p;k4c+=q6p;var D4c=q6p;D4c+=p2j;var C4c=e6W;C4c+=q6p;var V4c=d6p;V4c+=z0v.C6p;V4c+=s2p;if(opts[y6W]){opts[y6W](json);}$[y8p]({labels:Q6W,options:P6W,values:V4c,messages:C4c,errors:D4c},function(jsonProp,fieldFn){z0v.F0v();if(json[jsonProp]){var g4c=q6p;g4c+=z0v.C6p;g4c+=n1p;g4c+=p7p;$[g4c](json[jsonProp],function(field,val){z0v.h0v();that[k0j](field)[fieldFn](val);});}});$[y8p]([k4c,B4c,H9p,Z6W],function(i,key){if(json[key]){var K4c=w1j;K4c+=x1j;that[key](json[key],json[K4c]);}});if(opts[i4c]){opts[t6W](json);}field[d4c](i5p);};$(field[L6W]())[W8p](opts[T6W] + c6W,function(e){var p6W="the";var O6W="xte";var R6W="lainObj";var h6W="ditF";var H4c=x6p;H4c+=z0v.C6p;H4c+=J2p;H4c+=z0v.C6p;var x4c=x6p;x4c+=z0v.C6p;x4c+=J2p;x4c+=z0v.C6p;var w4c=q6p;w4c+=h6W;w4c+=K6W;var X4c=r8j;X4c+=a5j;var J4c=J2p;J4c+=M6W;J4c+=n6W;if($(field[L6W]())[E6W](e[J4c])[X4c] === g9U){return;}field[J8p](d5p);var data={};data[U3p]=that[Y6p][a6W]?_pluck(that[Y6p][w4c],x4c):w8p;data[n5j]=data[U3p]?data[U3p][g9U]:w8p;data[f2p]=that[H1p]();if(opts[H4c]){var m4c=x6p;m4c+=z0v.C6p;m4c+=J2p;m4c+=z0v.C6p;var ret=opts[m4c](data);if(ret){var v4c=V1j;v4c+=J2p;v4c+=z0v.C6p;opts[v4c]=ret;}}if(typeof url === E8p){var N4c=n1p;N4c+=j6W;var o=url[N4c](that,field[H1p](),data,update);if(o){var o4c=p6W;o4c+=G6p;if(typeof o === B5p && typeof o[o4c] === E8p){o[r6W](function(resolved){z0v.F0v();if(resolved){update(resolved);}});}else {update(o);}}}else {var Y4c=q6p;Y4c+=O6W;Y4c+=L6p;var q4c=a8p;q4c+=G6W;q4c+=R6W;q4c+=U6W;if($[q4c](url)){var A4c=q6p;A4c+=Z6p;A4c+=I1W;A4c+=x6p;$[A4c](ajaxOpts,url);}else {ajaxOpts[V1W]=url;}$[C1W]($[Y4c](ajaxOpts,{url:url,data:data,success:update}));}});return this;};Editor[s4c][W4c]=function(){var k1W="ayCont";var K1W="mpla";var B1W="roller";var d1W="playe";var y4c=x6p;y4c+=z0v.M9U;y4c+=w2p;var e4c=K6p;e4c+=d5j;var F4c=z0v.M9U;F4c+=D1W;var z4c=g1W;z4c+=k1W;z4c+=B1W;var S4c=t6p;S4c+=K1W;S4c+=t6p;var u4c=n1p;u4c+=s2p;u4c+=i1W;u4c+=m6p;var G4c=v8p;z0v.h0v();G4c+=d1W;G4c+=x6p;if(this[Y6p][G4c]){var b4c=n1p;b4c+=Q4p;b4c+=J4j;this[b4c]();}this[u4c]();if(this[Y6p][S4c]){var l4c=J1W;l4c+=s2p;l4c+=b6p;var f4c=x0p;f4c+=y2p;f4c+=V2p;$(B9p)[f4c](this[Y6p][l4c]);}var controller=this[Y6p][z4c];if(controller[X1W]){controller[X1W](this);}$(document)[F4c](e4c + this[Y6p][w1W]);this[y4c]=w8p;this[Y6p]=w8p;};Editor[L8p][Q4c]=function(name){var that=this;$[y8p](this[O9j](name),function(i,n){var P4c=z0v.R9U;z0v.h0v();P4c+=f1p;that[P4c](n)[x1W]();});z0v.h0v();return this;};Editor[L8p][O9p]=function(show){var Z4c=f8p;z0v.h0v();Z4c+=q6p;Z4c+=G6p;if(show === undefined){return this[Y6p][H1W];}return this[show?Z4c:m1W]();};Editor[L8p][H1W]=function(){var t4c=r9j;t4c+=q6p;z0v.h0v();t4c+=N4p;return $[v1W](this[Y6p][t4c],function(field,name){var N1W="ayed";var L4c=x6p;L4c+=T6p;L4c+=o4p;L4c+=N1W;return field[L4c]()?name:w8p;});};Editor[T4c][c4c]=function(){var h4c=V9p;h4c+=x6p;h4c+=q6p;z0v.F0v();return this[Y6p][o1W][h4c](this);};Editor[M4c][q1W]=function(items,arg1,arg2,arg3,arg4){var W1W="dA";var G1W="rgs";var s1W="_cru";var Y1W="aSo";var p4c=z0v.M9U;p4c+=C1j;var j4c=Y7p;j4c+=R5p;var a4c=k0j;a4c+=Y6p;var E4c=A1W;E4c+=Y1W;E4c+=b3p;var n4c=s1W;n4c+=W1W;n4c+=G1W;var that=this;if(this[d6W](function(){that[q1W](items,arg1,arg2,arg3,arg4);})){return this;}z0v.h0v();var argOpts=this[n4c](arg1,arg2,arg3,arg4);this[j0j](items,this[E4c](a4c,items),j4c,argOpts[p4c],function(){var b1W="semble";var u1W="Ma";var r4c=F3p;r4c+=b1W;r4c+=u1W;r4c+=R5p;that[r4c]();that[q6W](argOpts[S6j]);argOpts[S1W]();});return this;};Editor[O4c][f1W]=function(name){z0v.F0v();var l1W="fieldNames";var R4c=O2p;R4c+=l1W;var that=this;$[y8p](this[R4c](name),function(i,n){z0v.h0v();that[k0j](n)[f1W]();});return this;};Editor[U4c][z1W]=function(name,msg){z0v.h0v();var F1W="_mes";if(msg === undefined){var V7c=x6p;V7c+=z0v.M9U;V7c+=w2p;var I7c=F1W;I7c+=Y6p;I7c+=e1W;I7c+=q6p;this[I7c](this[V7c][y1W],name);this[Y6p][Q1W]=name;}else {var C7c=r9j;C7c+=q6p;C7c+=r4p;this[C7c](name)[z1W](msg);}return this;};Editor[D7c][k0j]=function(name){var t1W=" n";var P1W="Unknow";var Z1W="n field";var L1W="ame - ";var fields=this[Y6p][C0j];if(!fields[name]){var g7c=P1W;g7c+=Z1W;g7c+=t1W;g7c+=L1W;throw g7c + name;}return fields[name];};Editor[L8p][k7c]=function(){var B7c=z0v.R9U;B7c+=T6p;B7c+=i6W;return $[v1W](this[Y6p][B7c],function(field,name){z0v.h0v();return name;});};Editor[L8p][A6p]=_api_file;Editor[L8p][I5p]=_api_files;Editor[L8p][K7c]=function(name){var J7c=H4p;J7c+=J2p;var d7c=r9j;d7c+=q6p;d7c+=s2p;d7c+=x6p;var that=this;if(!name){name=this[C0j]();}if($[s6W](name)){var out={};$[y8p](name,function(i,n){var i7c=m4p;i7c+=q6p;i7c+=J2p;z0v.h0v();out[n]=that[k0j](n)[i7c]();});return out;}return this[d7c](name)[J7c]();};Editor[L8p][T1W]=function(names,animate){var X7c=c1W;X7c+=p7p;var that=this;$[X7c](this[O9j](names),function(i,n){z0v.F0v();var w7c=u6W;w7c+=r4p;that[w7c](n)[T1W](animate);});z0v.F0v();return this;};Editor[x7c][h1W]=function(includeHash){var H7c=w2p;H7c+=z0v.C6p;H7c+=y2p;return $[H7c](this[Y6p][a6W],function(edit,idSrc){z0v.F0v();return includeHash === d5p?M1W + idSrc:idSrc;});};Editor[L8p][n1W]=function(inNames){var m7c=s2p;m7c+=q6p;m7c+=G6p;m7c+=a5j;var formError=$(this[o8p][y1W]);if(this[Y6p][Q1W]){return d5p;}var names=this[O9j](inNames);for(var i=g9U,ien=names[m7c];i < ien;i++){if(this[k0j](names[i])[n1W]()){return d5p;}}return i5p;};Editor[L8p][E1W]=function(cell,fieldName,opts){var D2W='div.DTE_Field';var R1W='individual';var r1W="_dataSour";var a1W="line";z0v.F0v();var u7c=R5p;u7c+=a1W;var G7c=s2p;G7c+=q6p;G7c+=j1W;var A7c=c1W;A7c+=p7p;var q7c=T6p;q7c+=p1W;q7c+=T6p;q7c+=o9p;var o7c=r1W;o7c+=N2p;var N7c=O1W;N7c+=o9p;var v7c=I2p;v7c+=q6p;v7c+=L6p;var that=this;if($[u6j](fieldName)){opts=fieldName;fieldName=undefined;}opts=$[v7c]({},this[Y6p][C2j][N7c],opts);var editFields=this[o7c](R1W,cell,fieldName);var node,field;var countOuter=g9U,countInner;var closed=i5p;var classes=this[x9p][q7c];$[A7c](editFields,function(i,editField){var I2W="Cannot edit more than one row ";var U1W="displayFiel";var V2W="inline at a time";var W7c=U1W;W7c+=r5j;var s7c=R0j;s7c+=W4j;s7c+=n1p;z0v.h0v();s7c+=p7p;if(countOuter > g9U){var Y7c=I2W;Y7c+=V2W;throw Y7c;}node=$(editField[s7c][g9U]);countInner=g9U;$[y8p](editField[W7c],function(j,f){var C2W='Cannot edit more than one field inline at a time';if(countInner > g9U){throw C2W;}field=f;z0v.F0v();countInner++;});countOuter++;;});if($(D2W,node)[G7c]){return this;}if(this[d6W](function(){var g2W="lin";var b7c=T6p;b7c+=G6p;b7c+=g2W;b7c+=q6p;that[b7c](cell,fieldName,opts);})){return this;}this[j0j](cell,editFields,u7c,opts,function(){var i2W="ng_";var G2W="liner";var Y2W="userAgent";var d2W="Indicator\"><span></span></div>";var K2W="<div class=\"DTE_Processi";var B2W="eplace";var q2W="eo";var w2W="style=\"widt";var A2W="mOptio";var x2W="h:";var H2W="Ed";var S2W="tons";var J2W="class=\"";var o2W="_pr";var N2W="ine";var K5c=O1W;K5c+=o9p;var B5c=D3p;z0v.F0v();B5c+=q6p;B5c+=G6p;var k5c=z0v.R9U;k5c+=k2W;k5c+=e4p;var g5c=O2p;g5c+=X1p;g5c+=n1p;g5c+=e4p;var E7c=z0v.C6p;E7c+=W5j;E7c+=L6p;var n7c=m6p;n7c+=B2W;var M7c=s2p;M7c+=T6p;M7c+=G6p;M7c+=J6p;var h7c=x6p;h7c+=T6p;h7c+=d6p;h7c+=K6p;var c7c=d8j;c7c+=n5p;c7c+=T6p;c7c+=y5p;var T7c=F5p;T7c+=i8j;T7c+=y5p;var L7c=K2W;L7c+=i2W;L7c+=d2W;var t7c=S5p;t7c+=q7p;var Z7c=F3j;Z7c+=q7p;Z7c+=J2W;var P7c=c5p;P7c+=X2W;P7c+=N9p;P7c+=D0p;var Q7c=s2j;Q7c+=V2p;var y7c=y2p;y7c+=Z6p;y7c+=S5p;var e7c=w2W;e7c+=x2W;var F7c=H2W;F7c+=m4p;F7c+=q6p;F7c+=e5p;var z7c=m2W;z7c+=q6p;z7c+=v2W;var l7c=T6p;l7c+=p1W;l7c+=N2W;var f7c=o2W;f7c+=q2W;f7c+=V3p;var S7c=G8j;S7c+=m6p;S7c+=A2W;S7c+=w0j;var namespace=that[S7c](opts);var ret=that[f7c](l7c);if(!ret){return that;}var children=node[z7c]()[D6j]();var style=navigator[Y2W][s2W](F7c) !== -k9U?e7c + node[W2W]() + y7c:l7p;node[Q7c]($(P7c + classes[F2j] + M0p + Z7c + classes[G2W] + t7c + style + t6j + L7c + T7c + L0p + classes[T8j] + c7c + p0p));node[E6W](h7c + classes[M7c][n7c](/ /g,b2W))[k6j](field[L6W]())[E7c](that[o8p][y1W]);if(opts[T8j]){var p7c=u2W;p7c+=S2W;var j7c=s2j;j7c+=V2p;var a7c=A7p;a7c+=N8p;a7c+=z0v.C6p;a7c+=N2p;node[E6W](f2W + classes[T8j][a7c](/ /g,b2W))[j7c](that[o8p][p7c]);}that[l2W](function(submitComplete,action){var F2W="contents";var r7c=R5p;r7c+=s2p;r7c+=R5p;r7c+=q6p;closed=d5p;$(document)[d4j](G8p + namespace);if(!submitComplete || action !== z2W){node[F2W]()[D6j]();node[k6j](children);}that[E8j]();return r7c;;});setTimeout(function(){var O7c=P4p;z0v.h0v();O7c+=e2W;if(closed){return;}$(document)[W8p](O7c + namespace,function(e){var y2W="inArr";var P2W="B";var Q2W="ypeF";var D5c=y2W;D5c+=M2p;var C5c=W4j;C5c+=f3p;C5c+=q6p;C5c+=J2p;var V5c=z0v.M9U;V5c+=w0p;V5c+=G6p;V5c+=Y6p;var I5c=O2p;I5c+=J2p;I5c+=Q2W;I5c+=G6p;var U7c=O8p;U7c+=P2W;U7c+=z0v.C6p;U7c+=b1j;var R7c=z0v.R9U;R7c+=G6p;var back=$[R7c][U7c]?Z2W:t2W;if(!field[I5c](V5c,e[C5c]) && $[D5c](node[g9U],$(e[s3j])[L2W]()[back]()) === -k9U){that[u0j]();}});},g9U);that[g5c]([field],opts[k5c]);that[B5c](K5c,d5p);});return this;};Editor[L8p][i5c]=function(name,msg){var c2W="_message";var T2W="formIn";if(msg === undefined){var d5c=T2W;d5c+=X1p;this[c2W](this[o8p][d5c],name);}else {this[k0j](name)[i3p](msg);}return this;};Editor[L8p][g2p]=function(mode){var a2W=" editing mode";var M2W="Not cu";var E2W="ly in an";var n2W="rrent";var p2W='Changing from create mode is not supported';z0v.F0v();var w5c=z0v.C6p;w5c+=e9j;if(!mode){var J5c=h2W;J5c+=z0v.M9U;J5c+=G6p;return this[Y6p][J5c];}if(!this[Y6p][T5j]){var X5c=M2W;X5c+=n2W;X5c+=E2W;X5c+=a2W;throw new Error(X5c);}else if(this[Y6p][T5j] === j2W && mode !== j2W){throw new Error(p2W);}this[Y6p][w5c]=mode;return this;};Editor[L8p][x5c]=function(){z0v.h0v();return this[Y6p][h5j];};Editor[L8p][r2W]=function(fieldNames){var O2W="sAr";var H5c=T6p;H5c+=O2W;H5c+=R2W;H5c+=W2p;var that=this;if(fieldNames === undefined){fieldNames=this[C0j]();}z0v.h0v();if($[H5c](fieldNames)){var m5c=i1W;m5c+=n1p;m5c+=p7p;var out={};$[m5c](fieldNames,function(i,name){var v5c=z0v.R9U;v5c+=f1p;z0v.F0v();out[name]=that[v5c](name)[r2W]();});return out;}return this[k0j](fieldNames)[r2W]();};Editor[L8p][m6W]=function(fieldNames,val){var U2W="lainObject";var N5c=T6p;N5c+=Y6p;N5c+=G6W;N5c+=U2W;var that=this;if($[N5c](fieldNames) && val === undefined){var o5c=q6p;o5c+=j7p;o5c+=p7p;$[o5c](fieldNames,function(name,value){var I3W="multiSe";var A5c=I3W;z0v.F0v();A5c+=J2p;var q5c=A0p;q5c+=x6p;that[q5c](name)[A5c](value);});}else {var Y5c=A0p;Y5c+=x6p;this[Y5c](fieldNames)[m6W](val);}return this;};Editor[s5c][L6W]=function(name){var G5c=r9j;G5c+=q6p;G5c+=s2p;G5c+=x6p;var W5c=w2p;W5c+=z0v.C6p;W5c+=y2p;var that=this;if(!name){name=this[v0j]();}return $[s6W](name)?$[W5c](name,function(n){z0v.F0v();return that[k0j](n)[L6W]();}):this[G5c](name)[L6W]();};Editor[b5c][u5c]=function(name,fn){var S5c=V3W;S5c+=A3p;S5c+=G2p;S5c+=q3p;z0v.h0v();$(this)[d4j](this[S5c](name),fn);return this;};Editor[f5c][W8p]=function(name,fn){var C3W="_eventName";var l5c=z0v.M9U;l5c+=G6p;z0v.h0v();$(this)[l5c](this[C3W](name),fn);return this;};Editor[L8p][z5c]=function(name,fn){var g3W="ntNam";z0v.F0v();var F5c=Y3p;F5c+=D3W;F5c+=g3W;F5c+=q6p;$(this)[k3W](this[F5c](name),fn);return this;};Editor[L8p][B3W]=function(){var K3W="seR";var i3W="_di";var x3W="_preopen";var d3W="splayRe";z0v.h0v();var v3W="_postopen";var L5c=l9p;L5c+=w2p;var y5c=R9j;y5c+=K3W;y5c+=q6p;y5c+=m4p;var e5c=i3W;e5c+=d3W;e5c+=H0j;e5c+=J6p;var that=this;this[e5c]();this[y5c](function(){var Q5c=x6p;Q5c+=C9p;Q5c+=c4j;Q5c+=h4j;that[Y6p][Q5c][G4j](that,function(){var J3W="learDynam";var X3W="cInfo";var w3W='closed';var t5c=w2p;t5c+=z0v.C6p;t5c+=R5p;var Z5c=Y3p;Z5c+=d6p;Z5c+=g3p;Z5c+=J2p;var P5c=I8j;P5c+=J3W;P5c+=T6p;P5c+=X3W;that[P5c]();that[Z5c](w3W,[t5c]);});});var ret=this[x3W](H3W);if(!ret){return this;}this[Y6p][o1W][B3W](this,this[L5c][F2j],function(){var E5c=w2p;E5c+=z0v.C6p;E5c+=T6p;E5c+=G6p;var n5c=z0v.M9U;n5c+=V3p;n5c+=c8j;var M5c=Y3p;M5c+=h8j;var h5c=q6p;h5c+=z1j;h5c+=b6W;h5c+=C1j;z0v.F0v();var c5c=w2p;c5c+=z0v.C6p;c5c+=y2p;var T5c=O2p;T5c+=m3W;T5c+=e4p;that[T5c]($[c5c](that[Y6p][v0j],function(name){z0v.h0v();return that[Y6p][C0j][name];}),that[Y6p][h5c][F8p]);that[M5c](n5c,[E5c,that[Y6p][T5j]]);});this[v3W](H3W,i5p);return this;};Editor[L8p][v0j]=function(set){var A3W="sort";var q3W="rra";var W3W="All fields, and no additional fields, must be provided for ordering.";var R5c=q6p;R5c+=N3W;var O5c=Y6p;O5c+=L3p;O5c+=J2p;var r5c=U9p;r5c+=T6p;r5c+=n1p;r5c+=q6p;var p5c=z4p;p5c+=J8j;p5c+=G6p;var a5c=o3W;a5c+=q3W;a5c+=W2p;if(!set){return this[Y6p][v0j];}if(arguments[K5p] && !$[a5c](set)){var j5c=n1p;j5c+=z0v.C6p;j5c+=s2p;j5c+=s2p;set=Array[L8p][r1j][j5c](arguments);}if(this[Y6p][v0j][r1j]()[A3W]()[p5c](Y3W) !== set[r5c]()[O5c]()[s3W](Y3W)){throw W3W;}$[R5c](this[Y6p][v0j],set);this[o0j]();return this;};Editor[U5c][s4j]=function(items,arg1,arg2,arg3,arg4){var u3W="nCla";var S3W="_data";var G3W="nitRemove";var b3W="actio";var J0c=x6p;J0c+=R0j;J0c+=z0v.C6p;var d0c=G6p;d0c+=z0v.M9U;d0c+=x6p;d0c+=q6p;var i0c=T6p;i0c+=G3W;var K0c=Y3p;K0c+=h8j;var B0c=O2p;B0c+=b3W;B0c+=u3W;B0c+=a1p;var k0c=G6p;k0c+=z0v.M9U;k0c+=G6p;k0c+=q6p;var g0c=z0v.R9U;g0c+=L3p;g0c+=w2p;var D0c=B6W;D0c+=T6p;D0c+=q6p;D0c+=N4p;var C0c=p1p;C0c+=w4p;C0c+=m6p;var V0c=z0v.R9U;V0c+=T6p;V0c+=b1p;V0c+=r5j;var I0c=S3W;I0c+=B2p;I0c+=z0v.M9U;I0c+=b3p;var that=this;if(this[d6W](function(){that[s4j](items,arg1,arg2,arg3,arg4);})){return this;}if(items[K5p] === undefined){items=[items];}var argOpts=this[w6W](arg1,arg2,arg3,arg4);var editFields=this[I0c](V0c,items);this[Y6p][T5j]=s4j;this[Y6p][C0c]=items;this[Y6p][D0c]=editFields;this[o8p][g0c][K7j][O9p]=k0c;this[B0c]();this[K0c](i0c,[_pluck(editFields,d0c),_pluck(editFields,J0c),items],function(){var f3W='initMultiRemove';var X0c=Y3p;X0c+=d6p;X0c+=q6p;X0c+=g9p;that[X0c](f3W,[editFields,items],function(){var z3W="_ass";var F3W="embleMain";var l3W="Options";var m0c=m3W;m0c+=m2p;m0c+=Y6p;var H0c=z0v.M9U;H0c+=y2p;H0c+=J2p;H0c+=Y6p;var x0c=G8j;x0c+=m6p;x0c+=w2p;x0c+=l3W;var w0c=z3W;w0c+=F3W;that[w0c]();that[x0c](argOpts[H0c]);argOpts[S1W]();var opts=that[Y6p][e3W];if(opts[m0c] !== w8p){var q0c=m3W;q0c+=m2p;q0c+=Y6p;var o0c=z0v.D6p;o0c+=m2p;o0c+=y3W;o0c+=O6p;var N0c=l9p;N0c+=w2p;var v0c=z0v.D6p;v0c+=Q3W;$(v0c,that[N0c][o0c])[Q8j](opts[q0c])[F8p]();}});});return this;};Editor[A0c][U6j]=function(set,val){var Y0c=q6p;Y0c+=z0v.C6p;Y0c+=n1p;Y0c+=p7p;var that=this;if(!$[u6j](set)){var o={};o[set]=val;set=o;}$[Y0c](set,function(n,v){z0v.F0v();var s0c=A0p;s0c+=x6p;that[s0c](n)[U6j](v);});return this;};Editor[L8p][P3W]=function(names,animate){var W0c=q6p;W0c+=Z3W;var that=this;$[W0c](this[O9j](names),function(i,n){z0v.F0v();that[k0j](n)[P3W](animate);});return this;};Editor[L8p][G0c]=function(successCallback,errorCallback,formatdata,hide){var e0c=q6p;e0c+=z0v.C6p;e0c+=t3W;var F0c=J6p;F0c+=G9p;var u0c=O2p;u0c+=v6p;u0c+=k2W;u0c+=z6W;var b0c=A0p;b0c+=r5j;var that=this,fields=this[Y6p][b0c],errorFields=[],errorReady=g9U,sent=i5p;if(this[Y6p][J8p] || !this[Y6p][T5j]){return this;}this[u0c](d5p);var send=function(){var L3W="initSubm";var l0c=h2W;l0c+=z0v.M9U;l0c+=G6p;var f0c=L3W;f0c+=l0j;z0v.F0v();var S0c=T1j;S0c+=H6j;S0c+=p7p;if(errorFields[S0c] !== errorReady || sent){return;}that[T3W](f0c,[that[Y6p][l0c]],function(result){var h3W="_submit";z0v.h0v();var c3W="proc";if(result === i5p){var z0c=O2p;z0c+=c3W;z0c+=q6p;z0c+=C1p;that[z0c](i5p);return;}sent=d5p;that[h3W](successCallback,errorCallback,formatdata,hide);});};this[F0c]();$[y8p](fields,function(name,field){if(field[n1W]()){errorFields[X0j](name);}});$[e0c](errorFields,function(i,name){var y0c=J6p;z0v.h0v();y0c+=m6p;y0c+=L3p;fields[name][y0c](l7p,function(){errorReady++;send();});});z0v.F0v();send();return this;};Editor[Q0c][P0c]=function(set){var Z0c=t6p;Z0c+=M3W;Z0c+=n3W;if(set === undefined){return this[Y6p][E3W];}this[Y6p][Z0c]=set === w8p?w8p:$(set);return this;};Editor[t0c][t8j]=function(title){var p3W="hil";var j0c=p7p;j0c+=m1j;j0c+=s2p;var n0c=z0v.R9U;n0c+=a3W;n0c+=j3W;var M0c=Z9p;M0c+=m5j;var h0c=n1p;h0c+=s2p;h0c+=P3p;h0c+=j1p;var c0c=n1p;c0c+=p3W;c0c+=q4j;var T0c=p7p;T0c+=t5j;T0c+=J6p;var L0c=x6p;L0c+=z0v.M9U;L0c+=w2p;var header=$(this[L0c][T0c])[c0c](f2W + this[h0c][r3W][M0c]);if(title === undefined){return header[g6j]();}if(typeof title === n0c){var a0c=W4j;a0c+=z0v.D6p;a0c+=s2p;a0c+=q6p;var E0c=C4p;E0c+=y2p;E0c+=T6p;title=title(this,new DataTable[E0c](this[Y6p][a0c]));}header[j0c](title);return this;};Editor[p0c][r0c]=function(field,value){var O3W="inObject";var R0c=m4p;R0c+=q6p;R0c+=J2p;var O0c=c0j;O0c+=O3W;if(value !== undefined || $[O0c](field)){return this[U6j](field,value);}return this[R0c](field);;};var apiRegister=DataTable[U0c][R3W];function __getInst(api){var C8c=q6p;C8c+=g1p;C8c+=V7p;var V8c=z0v.M9U;V8c+=U3W;V8c+=G6p;V8c+=l0j;var I8c=f7j;I8c+=t6p;I8c+=I4W;var ctx=api[I8c][g9U];return ctx[V8c][C8c] || ctx[V4W];}function __setBasic(inst,opts,type,plural){var D4W="tit";var C4W='_basic';var d4W='1';var i4W=/%d/;var D8c=V2j;D8c+=Y6p;if(!opts){opts={};}z0v.F0v();if(opts[D8c] === undefined){opts[T8j]=C4W;}if(opts[t8j] === undefined){var B8c=D4W;B8c+=T1j;var k8c=g4W;k8c+=z0v.O9U;k8c+=G6p;var g8c=J2p;g8c+=T6p;g8c+=k4W;g8c+=q6p;opts[g8c]=inst[k8c][type][B8c];}if(opts[i3p] === undefined){var K8c=B4W;K8c+=D3W;if(type === K8c){var d8c=m6p;d8c+=Q6j;d8c+=y6j;var i8c=T6p;i8c+=B6p;i8c+=z0v.O9U;i8c+=G6p;var confirm=inst[i8c][type][K4W];opts[i3p]=plural !== k9U?confirm[O2p][d8c](i4W,plural):confirm[d4W];}else {opts[i3p]=l7p;}}return opts;}apiRegister(J8c,function(){z0v.h0v();return __getInst(this);});apiRegister(J4W,function(opts){var w4W="eat";var w8c=n1p;w8c+=W5p;z0v.h0v();w8c+=t6p;var X8c=X4W;X8c+=w4W;X8c+=q6p;var inst=__getInst(this);inst[X8c](__setBasic(inst,opts,w8c));return this;});apiRegister(x4W,function(opts){z0v.F0v();var x8c=q6p;x8c+=x6p;x8c+=T6p;x8c+=J2p;var inst=__getInst(this);inst[q1W](this[g9U][g9U],__setBasic(inst,opts,x8c));return this;});apiRegister(H8c,function(opts){var m8c=q6p;m8c+=g1p;m8c+=J2p;z0v.h0v();var inst=__getInst(this);inst[m8c](this[g9U],__setBasic(inst,opts,z2W));return this;});apiRegister(v8c,function(opts){var N8c=A7p;N8c+=d9p;var inst=__getInst(this);inst[s4j](this[g9U][g9U],__setBasic(inst,opts,N8c,k9U));z0v.F0v();return this;});apiRegister(o8c,function(opts){var q8c=m6p;q8c+=q6p;q8c+=X4p;q8c+=D3W;var inst=__getInst(this);inst[s4j](this[g9U],__setBasic(inst,opts,q8c,this[g9U][K5p]));z0v.F0v();return this;});apiRegister(H4W,function(type,opts){var m4W="isPl";var v4W="ainObject";var Y8c=m4W;z0v.F0v();Y8c+=v4W;if(!type){var A8c=T6p;A8c+=p1W;A8c+=T6p;A8c+=o9p;type=A8c;}else if($[Y8c](type)){var s8c=O1W;s8c+=o9p;opts=type;type=s8c;}__getInst(this)[type](this[g9U][g9U],opts);return this;});apiRegister(N4W,function(opts){var W8c=u4p;W8c+=z0v.D6p;W8c+=z0v.D6p;W8c+=T1j;__getInst(this)[W8c](this[g9U],opts);return this;});apiRegister(G8c,_api_file);apiRegister(b8c,_api_files);$(document)[W8p](o4W,function(e,ctx,json){var s4W='dt';var A4W="ames";var Y4W="pac";var S8c=r9j;S8c+=q4W;var u8c=G6p;u8c+=A4W;u8c+=Y4W;z0v.h0v();u8c+=q6p;if(e[u8c] !== s4W){return;}if(json && json[S8c]){$[y8p](json[I5p],function(name,files){var W4W="iles";var z8c=z0v.R9U;z8c+=T6p;z8c+=s2p;z8c+=j1p;var l8c=I2p;l8c+=g3p;l8c+=x6p;if(!Editor[I5p][name]){var f8c=z0v.R9U;f8c+=W4W;Editor[f8c][name]={};}z0v.h0v();$[l8c](Editor[z8c][name],files);});}});Editor[z1W]=function(msg,tn){var G4W=" For more information, please refer to https://datatables.ne";var b4W="t/tn";var F8c=G4W;z0v.h0v();F8c+=b4W;F8c+=e5p;throw tn?msg + F8c + tn:msg;};Editor[e8c]=function(data,props,fn){var Q8c=o3W;Q8c+=u4W;var y8c=S4W;y8c+=J2p;y8c+=g3p;y8c+=x6p;var i,ien,dataPoint;props=$[y8c]({label:Q6W,value:f4W},props);z0v.F0v();if($[Q8c](data)){var P8c=F9p;P8c+=J2p;P8c+=p7p;for((i=g9U,ien=data[P8c]);i < ien;i++){dataPoint=data[i];if($[u6j](dataPoint)){var c8c=z0v.C6p;c8c+=J2p;c8c+=J2p;c8c+=m6p;var T8c=s2p;T8c+=l4W;T8c+=q6p;T8c+=s2p;var L8c=z4W;L8c+=s2p;L8c+=m2p;L8c+=q6p;var t8c=E1p;t8c+=z0v.D6p;t8c+=b1p;var Z8c=z4W;Z8c+=F4W;Z8c+=q6p;fn(dataPoint[props[Z8c]] === undefined?dataPoint[props[t8c]]:dataPoint[props[L8c]],dataPoint[props[T8c]],i,dataPoint[c8c]);}else {fn(dataPoint,dataPoint,i);}}}else {var h8c=i1W;h8c+=t3W;i=g9U;$[h8c](data,function(key,val){fn(val,key,i);z0v.h0v();i++;});}};Editor[E0p]=function(id){return id[T6j](/\./g,Y3W);};Editor[M8c]=function(editor,conf,files,progressCallback,completeCallback){var Z4W=">Uploading fi";var c4W='A server error occurred while uploading the file';var T4W="ja";var L7W="tLeft";var e4W="dAsData";var Q4W="_limitLef";var T7W="pli";var h4W="fileReadText";var t7W="limi";var P4W="<i";var y4W="URL";var t4W="le</i";var p9c=W5p;p9c+=e4W;p9c+=y4W;var n9c=Q4W;n9c+=J2p;var O8c=W8p;O8c+=s2p;O8c+=z0v.M9U;O8c+=p5j;var r8c=P4W;r8c+=Z4W;r8c+=t4W;r8c+=f5p;var a8c=L4W;a8c+=e9j;var E8c=z0v.C6p;E8c+=T4W;E8c+=Z6p;var n8c=q6p;n8c+=m6p;n8c+=r3p;n8c+=m6p;var reader=new FileReader();var counter=g9U;var ids=[];var generalError=c4W;editor[n8c](conf[F0p],l7p);if(typeof conf[E8c] === a8c){var j8c=z0v.C6p;j8c+=z4p;j8c+=A0j;conf[j8c](files,function(ids){z0v.h0v();var p8c=n1p;p8c+=z0v.C6p;p8c+=s2p;p8c+=s2p;completeCallback[p8c](editor,ids);});return;}progressCallback(conf,conf[h4W] || r8c);reader[O8c]=function(e){var x7W="uplo";var E4W="nO";var O4W='uploadField';var K7W='post';var I7W='No Ajax option specified for upload plug-in';var n4W="isPlai";var g7W=" function instead.";var R4W="ajaxData";var M4W="preUplo";var D7W="ax.data` with an object. Please use it as a";var C7W="Upload feature cannot use `aj";var r4W='upload';var B7W='preSubmit.DTE_Upload';var a4W="bject";var k7W="readAsDataURL";var d9c=W6W;d9c+=W8p;var K9c=M4W;K9c+=p5j;var k9c=n4W;k9c+=E4W;k9c+=a4W;var V9c=z0v.C6p;V9c+=T4W;V9c+=Z6p;var U8c=j4W;U8c+=s2p;U8c+=z0v.M9U;U8c+=p5j;var R8c=z0v.C6p;R8c+=p4W;R8c+=z0v.M9U;R8c+=G6p;var data=new FormData();var ajax;data[k6j](R8c,r4W);data[k6j](O4W,conf[F0p]);z0v.F0v();data[k6j](U8c,files[counter]);if(conf[R4W]){conf[R4W](data,files[counter],counter);}if(conf[C1W]){var I9c=z0v.C6p;I9c+=z4p;I9c+=z0v.C6p;I9c+=Z6p;ajax=conf[I9c];}else if($[u6j](editor[Y6p][V9c])){var C9c=q0j;C9c+=z0v.C6p;C9c+=Z6p;ajax=editor[Y6p][C1W][U4W]?editor[Y6p][C9c][U4W]:editor[Y6p][C1W];}else if(typeof editor[Y6p][C1W] === Z6j){ajax=editor[Y6p][C1W];}if(!ajax){throw new Error(I7W);}if(typeof ajax === Z6j){ajax={url:ajax};}if(typeof ajax[Q0p] === E8p){var g9c=q6p;g9c+=z0v.C6p;g9c+=n1p;g9c+=p7p;var D9c=V7W;D9c+=G6p;D9c+=m4p;var d={};var ret=ajax[Q0p](d);if(ret !== undefined && typeof ret !== D9c){d=ret;}$[g9c](d,function(key,value){z0v.h0v();data[k6j](key,value);});}else if($[k9c](ajax[Q0p])){var B9c=C7W;B9c+=D7W;B9c+=g7W;throw new Error(B9c);}var preRet=editor[T3W](K9c,[conf[F0p],files[counter],data]);if(preRet === i5p){if(counter < files[K5p] - k9U){counter++;reader[k7W](files[counter]);}else {var i9c=n1p;i9c+=Q0j;i9c+=s2p;completeCallback[i9c](editor,ids);}return;}var submit=i5p;editor[W8p](B7W,function(){submit=d5p;z0v.F0v();return i5p;});$[C1W]($[f0p]({},ajax,{type:K7W,data:data,dataType:d9c,contentType:i5p,processData:i5p,xhr:function(){var X7W="onp";var J7W="onloaden";var i7W="axS";var d7W="ettings";var w7W="rogr";var X9c=Z6p;X9c+=p7p;X9c+=m6p;var J9c=q0j;J9c+=i7W;z0v.F0v();J9c+=d7W;var xhr=$[J9c][X9c]();if(xhr[U4W]){var o9c=J7W;o9c+=x6p;var x9c=X7W;x9c+=w7W;x9c+=j1p;x9c+=Y6p;var w9c=x7W;w9c+=p5j;xhr[w9c][x9c]=function(e){var N7W="%";var H7W="lengthComputable";var m7W="oFix";var o7W=':';var v7W="tal";if(e[H7W]){var N9c=T1j;N9c+=G6p;N9c+=c1j;N9c+=p7p;var v9c=J2p;v9c+=m7W;v9c+=c8j;var m9c=Z7j;m9c+=v7W;var H9c=Q4p;H9c+=z0v.C6p;H9c+=x6p;H9c+=c8j;var percent=(e[H9c] / e[m9c] * e9U)[v9c](g9U) + N7W;progressCallback(conf,files[N9c] === k9U?percent:counter + o7W + files[K5p] + T0p + percent);}};xhr[U4W][o9c]=function(e){var s7W="gText";z0v.F0v();var Y7W="ocessin";var A7W="ocess";var A9c=q7W;A9c+=A7W;A9c+=T6p;A9c+=V5j;var q9c=y2p;q9c+=m6p;q9c+=Y7W;q9c+=s7W;progressCallback(conf,conf[q9c] || A9c);};}return xhr;},success:function(json){var S7W="ploadXhrSuccess";var W7W="uploa";var e7W="taURL";var u7W="dErro";var F7W="sDa";var z7W="readA";var b7W="oad";var f9c=W7W;f9c+=x6p;var S9c=G7W;S9c+=b7W;var b9c=J6p;b9c+=m6p;b9c+=z0v.M9U;b9c+=m6p;var G9c=r8j;G9c+=a5j;var W9c=z0v.R9U;W9c+=n9j;W9c+=u7W;W9c+=h3p;var s9c=G6p;s9c+=z0v.C6p;s9c+=w2p;s9c+=q6p;var Y9c=m2p;Y9c+=S7W;editor[d4j](B7W);editor[T3W](Y9c,[conf[s9c],json]);if(json[W9c] && json[f7W][G9c]){var errors=json[f7W];for(var i=g9U,ien=errors[K5p];i < ien;i++){editor[z1W](errors[i][F0p],errors[i][l7W]);}}else if(json[b9c]){var u9c=A9p;u9c+=z0v.M9U;u9c+=m6p;editor[z1W](json[u9c]);}else if(!json[S9c] || !json[f9c][l0p]){var l9c=q0p;l9c+=w2p;l9c+=q6p;editor[z1W](conf[l9c],generalError);}else {var Z9c=G7W;Z9c+=b7W;var z9c=z0v.R9U;z9c+=T6p;z9c+=T1j;z9c+=Y6p;if(json[z9c]){var e9c=A6p;e9c+=Y6p;var F9c=q6p;F9c+=z0v.C6p;F9c+=n1p;F9c+=p7p;$[F9c](json[e9c],function(table,files){var P9c=q6p;P9c+=N3W;var y9c=r9j;y9c+=q4W;if(!Editor[y9c][table]){var Q9c=r9j;Q9c+=q4W;Editor[Q9c][table]={};}$[P9c](Editor[I5p][table],files);});}ids[X0j](json[Z9c][l0p]);if(counter < files[K5p] - k9U){var t9c=z7W;t9c+=F7W;t9c+=e7W;counter++;reader[t9c](files[counter]);}else {completeCallback[T8p](editor,ids);if(submit){var L9c=y7W;L9c+=w2p;L9c+=T6p;L9c+=J2p;editor[L9c]();}}}progressCallback(conf);},error:function(xhr){var Z7W="rro";var Q7W="adXh";var M9c=x7W;M9c+=Q7W;M9c+=m6p;M9c+=P7W;var h9c=Y3p;h9c+=h8j;var c9c=G6p;c9c+=z0v.C6p;c9c+=w2p;c9c+=q6p;z0v.h0v();var T9c=q6p;T9c+=Z7W;T9c+=m6p;editor[T9c](conf[c9c],generalError);editor[h9c](M9c,[conf[F0p],xhr]);progressCallback(conf);}}));};files=$[v1W](files,function(val){z0v.h0v();return val;});if(conf[n9c] !== undefined){var j9c=r8j;j9c+=a5j;var a9c=O2p;a9c+=t7W;a9c+=L7W;var E9c=Y6p;E9c+=T7W;E9c+=n1p;E9c+=q6p;files[E9c](conf[a9c],files[j9c]);}reader[p9c](files[g9U]);};Editor[L8p][r9c]=function(init){var j7W="dt.dte";var T5W='<div data-dte-e="body_content" class="';var w5W="nten";var B5W="ta-dte-e=\"head\" class=\"";var p5W='"></div></div>';var G5W="omTable";var A5W="formO";var Z5W="indicator";var k0W="bodyContent";var h7W="nitComp";var C5W="heade";var v5W=" data-dte";var W5W="aSources";var H5W="an></spa";var m0W='initEditor';var B0W='body_content';var t5W='<div data-dte-e="body" class="';var K5W="\"><";var c7W="igger";var n5W='<div data-dte-e="form_content" class="';var m5W="n></div";var S5W="ajaxUr";var r5W='<div data-dte-e="form_buttons" class="';var I5W="Table";var k5W="head";var z5W="mTable";var M5W="tag";var N5W="-e";var r7W="ev";var h5W='<form data-dte-e="form" class="';var g0W='form_content';var o5W="=\"processing\" class=\"";var a5W='<div data-dte-e="form_error" class="';var J5W="<div data-";var E5W='</form>';var X0W="init";var j5W='<div data-dte-e="form_info" class="';var D5W="\"><div";var a7W="it.";var L5W="body";var d5W="foo";var l5W="Tab";var i0W='xhr.dt.dte';var p7W="Cont";var X5W="dte-e=\"foot\" class=\"";var O7W="Tabl";var g5W=" clas";var R5W="TableTool";var Q5W="dataSources";var E7W="que";var x5W="\"><sp";var s5W="dataTa";var e5W="settings";var U7W="oo";var n7W="uni";var v1O=J2p;v1O+=m6p;v1O+=c7W;var m1O=T6p;m1O+=h7W;m1O+=M7W;var H1O=C6W;H1O+=G6p;H1O+=J2p;var K1O=n7W;K1O+=E7W;var B1O=z0v.M9U;B1O+=G6p;var D1O=R5p;D1O+=a7W;D1O+=j7W;var C1O=z0v.M9U;C1O+=G6p;var V1O=z0v.D6p;V1O+=z0v.M9U;V1O+=x6p;V1O+=W2p;var I1O=z0v.R9U;I1O+=z0v.M9U;I1O+=a2p;var U6O=Z0j;U6O+=p7W;U6O+=A3p;var R6O=U2j;R6O+=I3j;var j6O=r7W;j6O+=g3p;j6O+=J2p;j6O+=Y6p;var t6O=O7W;t6O+=R7W;t6O+=U7W;t6O+=k2p;var Z6O=Q0p;Z6O+=I5W;var P6O=z0v.R9U;P6O+=G6p;var Q6O=V5W;Q6O+=z0v.M9U;Q6O+=w0j;var y6O=Z9p;y6O+=m5j;var e6O=C5W;e6O+=m6p;var F6O=D5W;F6O+=g5W;F6O+=D0p;var z6O=Q3j;z6O+=V3j;var l6O=k5W;l6O+=q6p;l6O+=m6p;var f6O=F3j;f6O+=q7p;f6O+=V1j;f6O+=B5W;var S6O=z0v.R9U;S6O+=z0v.M9U;S6O+=Z1p;var u6O=K5W;u6O+=x8j;u6O+=t5p;var b6O=J6p;b6O+=m6p;b6O+=z0v.M9U;b6O+=m6p;var G6O=z0v.R9U;G6O+=z0v.M9U;G6O+=m6p;G6O+=w2p;var W6O=S5p;W6O+=f5p;var s6O=z0v.R9U;s6O+=i5W;var Y6O=n5p;Y6O+=E5p;Y6O+=f5p;var A6O=S5p;A6O+=j5p;A6O+=H8j;var q6O=S5p;q6O+=f5p;var o6O=Q3j;o6O+=V3j;var N6O=d5W;N6O+=t6p;N6O+=m6p;var v6O=J5W;v6O+=X5W;var m6O=S5p;m6O+=f5p;m6O+=Q4j;var H6O=Z9p;H6O+=w5W;H6O+=J2p;var x6O=x5W;x6O+=H5W;x6O+=m5W;x6O+=f5p;var w6O=h1p;w6O+=T6p;w6O+=V5j;var X6O=F3j;X6O+=v5W;X6O+=N5W;X6O+=o5W;var J6O=q5W;J6O+=P5p;var d6O=g2p;d6O+=k2p;var i6O=T6p;i6O+=B6p;i6O+=z0v.O9U;i6O+=G6p;var K6O=P4p;K6O+=O5j;var B6O=J1W;B6O+=n3W;var k6O=A5W;k6O+=y2p;k6O+=J2p;k6O+=Y5W;var g6O=p7p;g6O+=J2p;g6O+=w2p;g6O+=s2p;var D6O=s5W;D6O+=c5j;D6O+=q6p;var C6O=Q2p;C6O+=W5W;var V6O=x6p;V6O+=G5W;var I6O=T6p;I6O+=b5W;I6O+=u5W;var U9c=S5W;U9c+=s2p;var R9c=f5W;R9c+=l5W;R9c+=T1j;var O9c=l9p;O9c+=z5W;init=$[f0p](d5p,{},Editor[F5W],init);this[Y6p]=$[f0p](d5p,{},Editor[U1j][e5W],{actionName:init[y5W],table:init[O9c] || init[Q5j],dbTable:init[R9c] || w8p,ajaxUrl:init[U9c],ajax:init[C1W],idSrc:init[I6O],dataSource:init[V6O] || init[Q5j]?Editor[C6O][D6O]:Editor[Q5W][g6O],formOptions:init[k6O],legacyAjax:init[P5W],template:init[B6O]?$(init[E3W])[D6j]():w8p});this[K6O]=$[f0p](d5p,{},Editor[x9p]);this[i6O]=init[E1j];Editor[d6O][e5W][w1W]++;var that=this;var classes=this[x9p];this[o8p]={"wrapper":$(J6O + classes[F2j] + M0p + X6O + classes[w6O][Z5W] + x6O + t5W + classes[L5W][F2j] + M0p + T5W + classes[L5W][H6O] + m6O + p0p + v6O + classes[N6O][o6O] + q6O + L0p + classes[c5W][j4j] + A6O + p0p + Y6O)[g9U],"form":$(h5W + classes[s6O][M5W] + W6O + n5W + classes[G6O][j4j] + k8p + E5W)[g9U],"formError":$(a5W + classes[Z0j][b6O] + u6O)[g9U],"formInfo":$(j5W + classes[S6O][C8p] + k8p)[g9U],"header":$(f6O + classes[l6O][z6O] + F6O + classes[e6O][y6O] + p5W)[g9U],"buttons":$(r5W + classes[Z0j][Q6O] + k8p)[g9U]};if($[P6O][Z6O][t6O]){var n6O=m6p;n6O+=O5W;n6O+=B1j;var M6O=q6p;M6O+=g1p;M6O+=J2p;var h6O=n1p;h6O+=m6p;h6O+=q6p;h6O+=b6p;var c6O=i1W;c6O+=n1p;c6O+=p7p;var T6O=R5W;T6O+=Y6p;var L6O=z0v.R9U;L6O+=G6p;var ttButtons=$[L6O][F7p][T6O][U5W];var i18n=this[E1j];$[c6O]([h6O,M6O,n6O],function(i,val){var C0W='editor_';var V0W="onT";var I0W="sButt";var a6O=z0v.D6p;z0v.h0v();a6O+=Q3W;var E6O=I0W;E6O+=V0W;E6O+=I2p;ttButtons[C0W + val][E6O]=i18n[val][a6O];});}$[y8p](init[j6O],function(evt,fn){that[W8p](evt,function(){var D0W="apply";var O6O=r7p;O6O+=T6p;O6O+=x0j;var r6O=n1p;r6O+=z0v.C6p;r6O+=s2p;r6O+=s2p;var p6O=U9p;p6O+=T6p;p6O+=n1p;p6O+=q6p;z0v.F0v();var args=Array[L8p][p6O][r6O](arguments);args[O6O]();fn[D0W](that,args);});});var dom=this[o8p];var wrapper=dom[R6O];dom[U6O]=_editor_el(g0W,dom[Z0j])[g9U];dom[c5W]=_editor_el(I1O,wrapper)[g9U];dom[L5W]=_editor_el(V1O,wrapper)[g9U];dom[k0W]=_editor_el(B0W,wrapper)[g9U];dom[J8p]=_editor_el(K0W,wrapper)[g9U];if(init[C0j]){this[O8p](init[C0j]);}$(document)[C1O](D1O + this[Y6p][w1W],function(e,settings,json){var k1O=G6p;k1O+=H2p;k1O+=j8p;z0v.F0v();k1O+=q6p;var g1O=W4j;g1O+=c5j;g1O+=q6p;if(that[Y6p][g1O] && settings[k1O] === $(that[Y6p][Q5j])[n6W](g9U)){settings[V4W]=that;}})[B1O](i0W + this[Y6p][K1O],function(e,settings,json){var J0W="_optionsUp";var d0W="nTable";var J1O=m4p;J1O+=v4p;var d1O=J2p;d1O+=l4W;z0v.h0v();d1O+=s2p;d1O+=q6p;var i1O=J2p;i1O+=l4W;i1O+=s2p;i1O+=q6p;if(json && that[Y6p][i1O] && settings[d0W] === $(that[Y6p][d1O])[J1O](g9U)){var X1O=J0W;X1O+=V1j;X1O+=t6p;that[X1O](json);}});try{this[Y6p][o1W]=Editor[O9p][init[O9p]][X0W](this);}catch(e){var H0W="find display controller ";var x0W="Cannot ";var x1O=g1p;x1O+=w0W;var w1O=x0W;w1O+=H0W;throw w1O + init[x1O];}this[H1O](m1O,[]);$(document)[v1O](m0W,[this]);};Editor[N1O][o1O]=function(){var N0W="eClas";var q0W="addCl";var u1O=F5j;u1O+=t6p;var b1O=X4W;b1O+=i1W;b1O+=t6p;var G1O=v0W;G1O+=N0W;G1O+=Y6p;var W1O=C7j;W1O+=y2p;W1O+=J6p;var s1O=l9p;s1O+=w2p;var Y1O=j7p;Y1O+=u6p;Y1O+=W8p;var A1O=T5j;A1O+=Y6p;var q1O=s9p;q1O+=a1p;q1O+=j1p;var classesActions=this[q1O][A1O];var action=this[Y6p][Y1O];var wrapper=$(this[s1O][W1O]);wrapper[G1O]([classesActions[b1O],classesActions[q1W],classesActions[s4j]][s3W](T0p));if(action === u1O){wrapper[u9p](classesActions[U9j]);}else if(action === q1W){var S1O=c8j;S1O+=l0j;wrapper[u9p](classesActions[S1O]);}else if(action === s4j){var l1O=m6p;l1O+=o0W;l1O+=q6p;var f1O=q0W;f1O+=P3p;wrapper[f1O](classesActions[l1O]);}};Editor[z1O][A0W]=function(data,success,error,submitParams){var M0W=/_id_/;var h0W="Url";var j0W="comple";var a0W="complete";var O0W='DELETE';var r0W="functio";var T0W="dex";var S0W="OST";var p0W="uns";var R0W="param";var s0W="deleteBod";var u0W="idSr";var U0W='?';var L0W=',';var G0W="nc";var f0W='json';var d2O=z0v.C6p;d2O+=z4p;d2O+=z0v.C6p;d2O+=Z6p;var K2O=t2p;K2O+=M7W;K2O+=Y0W;K2O+=W2p;var B2O=s0W;B2O+=W2p;var V2O=x6p;V2O+=z0v.C6p;V2O+=J2p;V2O+=z0v.C6p;var c1O=W0W;c1O+=G0W;c1O+=b0W;var L1O=o3W;L1O+=h2p;L1O+=M2p;var t1O=u0W;t1O+=n1p;var F1O=G6W;F1O+=S0W;var that=this;var action=this[Y6p][T5j];var thrown;var opts={type:F1O,dataType:f0W,data:w8p,error:[function(xhr,text,err){z0v.F0v();thrown=err;}],success:[],complete:[function(xhr,text){var y9U=204;var l0W="resp";var e0W="esponseJSO";var F0W="ponseText";var y0W="responseJSON";var z0W="onseT";var P0W="sta";var Q0W="parseJSON";var y1O=G6p;y1O+=w6j;y1O+=s2p;var e1O=l0W;e1O+=z0W;e1O+=I2p;var json=w8p;if(xhr[l7W] === y9U || xhr[e1O] === y1O){json={};}else {try{var P1O=A7p;P1O+=Y6p;P1O+=F0W;var Q1O=m6p;Q1O+=e0W;Q1O+=G2p;json=xhr[y0W]?xhr[Q1O]:$[Q0W](xhr[P1O]);}catch(e){}}if($[u6j](json) || $[s6W](json)){var Z1O=P0W;Z1O+=J2p;Z1O+=e4p;success(json,xhr[Z1O] >= Q9U,xhr);}else {error(xhr,text,thrown);}}]};var a;var ajaxSrc=this[Y6p][C1W] || this[Y6p][Z0W];var id=action === z2W || action === t0W?_pluck(this[Y6p][a6W],t1O):w8p;if($[L1O](id)){var T1O=z4p;T1O+=z0v.M9U;T1O+=R5p;id=id[T1O](L0W);}if($[u6j](ajaxSrc) && ajaxSrc[action]){ajaxSrc=ajaxSrc[action];}if(typeof ajaxSrc === c1O){var uri=w8p;var method=w8p;if(this[Y6p][Z0W]){var a1O=A7p;a1O+=P6j;a1O+=N2p;var n1O=R5p;n1O+=T0W;n1O+=b6W;n1O+=z0v.R9U;var M1O=c0W;M1O+=R0j;M1O+=q6p;var h1O=C1W;h1O+=h0W;var url=this[Y6p][h1O];if(url[M1O]){uri=url[action];}if(uri[n1O](T0p) !== -k9U){var E1O=F4p;E1O+=B2j;E1O+=J2p;a=uri[E1O](T0p);method=a[g9U];uri=a[k9U];}uri=uri[a1O](M0W,id);}ajaxSrc(method,uri,data,success,error);return;}else if(typeof ajaxSrc === Z6j){if(ajaxSrc[s2W](T0p) !== -k9U){var j1O=m2p;j1O+=m6p;j1O+=s2p;a=ajaxSrc[n0W](T0p);opts[j2p]=a[g9U];opts[j1O]=a[k9U];}else {opts[V1W]=ajaxSrc;}}else {var I2O=q6p;I2O+=Z6p;I2O+=I1W;I2O+=x6p;var O1O=E0W;O1O+=m6p;var optsCopy=$[f0p]({},ajaxSrc || ({}));if(optsCopy[a0W]){var r1O=j0W;r1O+=t6p;var p1O=p0W;p1O+=p1j;p1O+=x0j;opts[a0W][p1O](optsCopy[a0W]);delete optsCopy[r1O];}if(optsCopy[O1O]){var U1O=J6p;U1O+=r3p;U1O+=m6p;var R1O=J6p;R1O+=m6p;R1O+=z0v.M9U;R1O+=m6p;opts[R1O][c8p](optsCopy[z1W]);delete optsCopy[U1O];}opts=$[I2O]({},opts,optsCopy);}opts[V1W]=opts[V1W][T6j](M0W,id);if(opts[V2O]){var k2O=S4W;k2O+=J2p;k2O+=V2p;var g2O=x6p;g2O+=z0v.C6p;g2O+=J2p;g2O+=z0v.C6p;var D2O=r0W;D2O+=G6p;var C2O=V1j;C2O+=J2p;C2O+=z0v.C6p;var isFn=typeof opts[C2O] === D2O;var newData=isFn?opts[g2O](data):opts[Q0p];data=isFn && newData?newData:$[k2O](d5p,data,newData);}opts[Q0p]=data;if(opts[j2p] === O0W && (opts[B2O] === undefined || opts[K2O] === d5p)){var i2O=m2p;i2O+=m6p;i2O+=s2p;var params=$[R0W](opts[Q0p]);opts[i2O]+=opts[V1W][s2W](U0W) === -k9U?U0W + params:c6j + params;delete opts[Q0p];}$[d2O](opts);};Editor[J2O][x3j]=function(target,style,time,callback){var V8W="ctio";if($[c7p][r7j]){var X2O=w1j;X2O+=x1j;target[I8W]()[X2O](style,time,callback);}else {var w2O=L4W;w2O+=V8W;w2O+=G6p;target[K9p](style);if(typeof time === w2O){var x2O=h9j;x2O+=C8W;time[x2O](target);}else if(callback){var H2O=h9j;H2O+=C8W;callback[H2O](target);}}};Editor[m2O][v2O]=function(){var g8W="formInfo";var D8W="dyCont";z0v.h0v();var G2O=z0v.R9U;G2O+=z0v.M9U;G2O+=Z1p;var W2O=z0v.C6p;W2O+=y2p;W2O+=y2p;W2O+=V2p;var s2O=T2j;s2O+=D8W;s2O+=A3p;var Y2O=V5W;Y2O+=O6p;var A2O=t7j;A2O+=G6p;A2O+=x6p;var q2O=y2p;q2O+=A7p;q2O+=y2p;q2O+=V2p;var o2O=C7j;o2O+=H0p;var N2O=x6p;N2O+=a4p;var dom=this[N2O];$(dom[o2O])[q2O](dom[r3W]);$(dom[c5W])[A2O](dom[y1W])[k6j](dom[Y2O]);$(dom[s2O])[W2O](dom[g8W])[k6j](dom[G2O]);};Editor[b2O][k8W]=function(){var i8W="onBlur";var B8W="Bl";var z2O=P4p;z2O+=z0v.M9U;z2O+=Y6p;z2O+=q6p;var f2O=Y6p;f2O+=B4p;f2O+=K4p;f2O+=J2p;z0v.h0v();var S2O=v6p;S2O+=q6p;S2O+=B8W;S2O+=K8W;var u2O=O2p;u2O+=q6p;u2O+=d6p;u2O+=A3p;var opts=this[Y6p][e3W];var onBlur=opts[i8W];if(this[u2O](S2O) === i5p){return;}if(typeof onBlur === E8p){onBlur(this);}else if(onBlur === f2O){var l2O=R2p;l2O+=U2p;this[l2O]();}else if(onBlur === z2O){var F2O=d8W;F2O+=Y2j;F2O+=q6p;this[F2O]();}};Editor[e2O][y2O]=function(){var J8W="v.";var L2O=v3p;L2O+=Y6p;L2O+=e1W;L2O+=q6p;var t2O=q6p;t2O+=h2p;t2O+=z0v.M9U;t2O+=m6p;var Z2O=g1p;Z2O+=J8W;var P2O=z0v.R9U;P2O+=T6p;P2O+=R5j;var Q2O=P4p;Q2O+=P3p;Q2O+=q6p;Q2O+=Y6p;z0v.F0v();if(!this[Y6p]){return;}var errorClass=this[Q2O][P2O][z1W];var fields=this[Y6p][C0j];$(Z2O + errorClass,this[o8p][F2j])[N9j](errorClass);$[y8p](fields,function(name,field){field[z1W](l7p)[i3p](l7p);});this[t2O](l7p)[L2O](l7p);};Editor[L8p][a8j]=function(submitComplete,mode){var w8W="closeCb";var x8W="loseCb";var X8W='preClose';var m8W="closeI";var E2O=V3W;E2O+=q6p;E2O+=g9p;var n2O=x6p;n2O+=r6j;n2O+=q6p;n2O+=x6p;var M2O=z0v.M9U;M2O+=D1W;var h2O=z0v.D6p;h2O+=z0v.M9U;h2O+=c2j;var closed;if(this[T3W](X8W) === i5p){return;}if(this[Y6p][w8W]){var T2O=n1p;T2O+=x8W;closed=this[Y6p][w8W](submitComplete,mode);this[Y6p][T2O]=w8p;}if(this[Y6p][H8W]){var c2O=m8W;c2O+=n1p;c2O+=z0v.D6p;this[Y6p][H8W]();this[Y6p][c2O]=w8p;}$(h2O)[M2O](v8W);this[Y6p][n2O]=i5p;this[E2O](m1W);if(closed){var a2O=n1p;a2O+=o3j;a2O+=q6p;a2O+=x6p;this[T3W](a2O,[closed]);}};Editor[j2O][l2W]=function(fn){var N8W="closeC";var p2O=N8W;p2O+=z0v.D6p;this[Y6p][p2O]=fn;};Editor[L8p][r2O]=function(arg1,arg2,arg3,arg4){var o8W="bool";var R2O=w2p;R2O+=c3p;R2O+=G6p;var O2O=o8W;O2O+=i1W;z0v.F0v();O2O+=G6p;var that=this;var title;var buttons;var show;var opts;if($[u6j](arg1)){opts=arg1;}else if(typeof arg1 === O2O){show=arg1;opts=arg2;;}else {title=arg1;buttons=arg2;show=arg3;opts=arg4;;}if(show === undefined){show=d5p;}if(title){that[t8j](title);}if(buttons){that[T8j](buttons);}return {opts:$[f0p]({},this[Y6p][C2j][R2O],opts),maybeOpen:function(){if(show){var U2O=f8p;U2O+=q6p;U2O+=G6p;that[U2O]();}}};};Editor[L8p][I3O]=function(name){var V3O=Y6p;V3O+=p7p;V3O+=j1j;var args=Array[L8p][r1j][T8p](arguments);args[V3O]();var fn=this[Y6p][q8W][name];if(fn){var C3O=s2j;C3O+=q8j;return fn[C3O](this,args);}};Editor[L8p][o0j]=function(includeFields){var s8W="rde";var Y8W="templa";var z8W="ndTo";var W8W="rmCo";var A8W="ayOrder";var q3O=x6p;q3O+=T6p;q3O+=o4p;q3O+=A8W;var N3O=w2p;N3O+=z0v.C6p;N3O+=T6p;N3O+=G6p;var d3O=c1W;d3O+=p7p;var i3O=n1p;i3O+=p1j;i3O+=B8j;i3O+=g3p;var K3O=Y8W;K3O+=t6p;var B3O=z0v.M9U;B3O+=s8W;B3O+=m6p;var k3O=z0v.R9U;k3O+=c4p;k3O+=s2p;k3O+=r5j;var g3O=X1p;g3O+=W8W;g3O+=G6p;g3O+=P2j;var D3O=x6p;D3O+=z0v.M9U;D3O+=w2p;var that=this;var formContent=$(this[D3O][g3O]);var fields=this[Y6p][k3O];var order=this[Y6p][B3O];var template=this[Y6p][K3O];var mode=this[Y6p][g2p] || H3W;if(includeFields){this[Y6p][p8j]=includeFields;}else {includeFields=this[Y6p][p8j];}formContent[i3O]()[D6j]();$[d3O](order,function(i,fieldOrName){z0v.h0v();var S8W="-editor-template=";var f8W="aft";var G8W="_weakInArray";var l8W='editor-field[name="';var J3O=x2p;J3O+=T6p;J3O+=R5j;var name=fieldOrName instanceof Editor[J3O]?fieldOrName[F0p]():fieldOrName;if(that[G8W](name,includeFields) !== -k9U){var X3O=Y7p;X3O+=T6p;X3O+=G6p;if(template && mode === X3O){var v3O=f3j;v3O+=x6p;var m3O=S5p;m3O+=b8W;var H3O=u8W;H3O+=Q0p;H3O+=S8W;H3O+=S5p;var x3O=G6p;x3O+=z0v.M9U;x3O+=x6p;x3O+=q6p;var w3O=f8W;w3O+=J6p;template[E6W](l8W + name + a7p)[w3O](fields[name][x3O]());template[E6W](H3O + name + m3O)[v3O](fields[name][L6W]());}else {formContent[k6j](fields[name][L6W]());}}});if(template && mode === N3O){var o3O=x0p;o3O+=w3p;o3O+=z8W;template[o3O](formContent);}this[T3W](q3O,[this[Y6p][H1W],this[Y6p][T5j],formContent]);};Editor[A3O][Y3O]=function(items,editFields,type,formOptions,setupDone){var a8W='data';var Q8W="odifi";var e8W="orde";var E8W='initEdit';var F8W="_disp";var n8W="toString";var y8W="onCla";var M3O=V9p;M3O+=t2p;var h3O=F8W;h3O+=E1p;h3O+=g6W;var T3O=T1j;T3O+=H6j;T3O+=p7p;var L3O=Y6p;L3O+=t8p;var t3O=e8W;t3O+=m6p;var S3O=c1W;S3O+=p7p;var u3O=B4j;u3O+=p4W;u3O+=y8W;u3O+=a1p;var b3O=X4p;b3O+=t2p;var G3O=z0v.C6p;G3O+=z0v.E9U;G3O+=j3W;var W3O=w2p;W3O+=Q8W;z0v.h0v();W3O+=J6p;var s3O=W0j;s3O+=X6W;var that=this;var fields=this[Y6p][C0j];var usedFields=[];var includeInOrder;var editData={};this[Y6p][s3O]=editFields;this[Y6p][P8W]=editData;this[Y6p][W3O]=items;this[Y6p][G3O]=q1W;this[o8p][Z0j][K7j][O9p]=l6j;this[Y6p][b3O]=type;this[u3O]();$[S3O](fields,function(name,field){z0v.h0v();var Z8W="multiR";var t8W="eset";var f3O=Z8W;f3O+=t8W;field[f3O]();includeInOrder=i5p;editData[name]={};$[y8p](editFields,function(idSrc,edit){var L8W="scope";var M8W="isplayFi";z0v.F0v();var h8W="yFie";var l3O=z0v.R9U;l3O+=T6p;l3O+=i6W;if(edit[l3O][name]){var F3O=m6p;F3O+=H9j;var z3O=Y6p;z3O+=s2p;z3O+=T6p;z3O+=N2p;var val=field[P0p](edit[Q0p]);editData[name][idSrc]=val === w8p?l7p:$[s6W](val)?val[z3O]():val;if(!formOptions || formOptions[L8W] === F3O){var y3O=T8W;y3O+=c4p;y3O+=N4p;var e3O=x6p;e3O+=q6p;e3O+=z0v.R9U;field[m6W](idSrc,val !== undefined?val:field[e3O]());if(!edit[y3O] || edit[c8W][name]){includeInOrder=d5p;}}else {var P3O=V6j;P3O+=h8W;P3O+=r4p;P3O+=Y6p;var Q3O=x6p;Q3O+=M8W;Q3O+=i6W;if(!edit[Q3O] || edit[P3O][name]){field[m6W](idSrc,val !== undefined?val:field[O4p]());includeInOrder=d5p;}}}});if(field[G6j]()[K5p] !== g9U && includeInOrder){var Z3O=y2p;Z3O+=m2p;Z3O+=r7p;usedFields[Z3O](name);}});var currOrder=this[t3O]()[L3O]();for(var i=currOrder[T3O] - k9U;i >= g9U;i--){var c3O=R5p;c3O+=C4p;c3O+=u4W;if($[c3O](currOrder[i][n8W](),usedFields) === -k9U){currOrder[N0j](i,k9U);}}this[h3O](currOrder);this[T3W](E8W,[_pluck(editFields,M3O)[g9U],_pluck(editFields,a8W)[g9U],items,type],function(){var j8W='initMultiEdit';var n3O=V3W;n3O+=g3p;n3O+=J2p;that[n3O](j8W,[editFields,items,type],function(){setupDone();});});};Editor[L8p][E3O]=function(trigger,args,promiseComplete){var V9W="res";z0v.F0v();var I9W="ob";var r8W="triggerHandler";var p8W="Event";var O8W="result";var R8W="Can";var U8W="hen";var a3O=E5j;a3O+=R2W;a3O+=W2p;if(!args){args=[];}if($[a3O](trigger)){var j3O=T1j;j3O+=j1W;for(var i=g9U,ien=trigger[j3O];i < ien;i++){this[T3W](trigger[i],args);}}else {var p3O=y2p;p3O+=m6p;p3O+=q6p;var e=$[p8W](trigger);$(this)[r8W](e,args);if(trigger[s2W](p3O) === g9U && e[O8W] === i5p){var r3O=R8W;r3O+=N2p;r3O+=C8W;r3O+=c8j;$(this)[r8W]($[p8W](trigger + r3O),args);}if(promiseComplete){var U3O=J2p;U3O+=U8W;var R3O=I9W;R3O+=z4p;R3O+=U6W;var O3O=V9W;O3O+=e9p;if(e[O3O] && typeof e[O8W] === R3O && e[O8W][U3O]){e[O8W][r6W](promiseComplete);}else {var I4O=A7p;I4O+=R2p;I4O+=s2p;I4O+=J2p;promiseComplete(e[I4O]);}}return e[O8W];}};Editor[L8p][V4O]=function(input){var D9W="oLowerC";var g9W="substring";var C9W=/^on([A-Z])/;var name;var names=input[n0W](T0p);for(var i=g9U,ien=names[K5p];i < ien;i++){var C4O=w2p;C4O+=z0v.C6p;C4O+=J2p;C4O+=t3W;name=names[i];var onStyle=name[C4O](C9W);if(onStyle){var D4O=J2p;D4O+=D9W;D4O+=z0v.C6p;D4O+=J4j;name=onStyle[k9U][D4O]() + name[g9W](K9U);}names[i]=name;}return names[s3W](T0p);};Editor[g4O][k9W]=function(node){var foundField=w8p;$[y8p](this[Y6p][C0j],function(name,field){var B4O=s2p;B4O+=g3p;B4O+=c1j;B4O+=p7p;var k4O=V9p;k4O+=x6p;z0v.F0v();k4O+=q6p;if($(field[k4O]())[E6W](node)[B4O]){foundField=field;}});return foundField;};Editor[L8p][K4O]=function(fieldNames){if(fieldNames === undefined){var i4O=z0v.R9U;i4O+=T6p;i4O+=i6W;return this[i4O]();}else if(!$[s6W](fieldNames)){return [fieldNames];}z0v.F0v();return fieldNames;};Editor[L8p][j8j]=function(fieldsIn,focus){var J9W="replac";var X9W='div.DTE ';var x9W="veEleme";var i9W="ndexOf";var B9W="setF";var H9W="ocu";var d9W='jq:';var w9W=/^jq:/;var v4O=B9W;v4O+=k2W;v4O+=e4p;var d4O=w2p;d4O+=x0p;var that=this;var field;var fields=$[d4O](fieldsIn,function(fieldOrName){var K9W="tri";var X4O=r9j;z0v.F0v();X4O+=q6p;X4O+=N4p;var J4O=Y6p;J4O+=K9W;J4O+=V5j;return typeof fieldOrName === J4O?that[Y6p][X4O][fieldOrName]:fieldOrName;});if(typeof focus === J6W){field=fields[focus];}else if(focus){var w4O=T6p;w4O+=i9W;if(focus[w4O](d9W) === g9U){var x4O=J9W;x4O+=q6p;field=$(X9W + focus[x4O](w9W,l7p));}else {var H4O=z0v.R9U;H4O+=c4p;H4O+=r4p;H4O+=Y6p;field=this[Y6p][H4O][focus];}}else {var m4O=j7p;m4O+=u6p;m4O+=x9W;m4O+=g9p;document[m4O][u0j]();}this[Y6p][v4O]=field;if(field){var N4O=z0v.R9U;N4O+=H9W;N4O+=Y6p;field[N4O]();}};Editor[L8p][o4O]=function(opts){var q9W="unc";var W9W="ete";var T9W="rn";var j9W="canReturnSubmit";var Z9W="tOnReturn";var N9W="functi";var l9W="bmi";var e9W="onB";var b9W="clos";var t9W="Re";var L9W="tu";var y9W="submitOnReturn";var u9W="eOnComplete";var s9W="closeOnComp";var A9W="itle";var c9W="blurOnBackground";var z9W="tOnB";var F9W="lur";var m9W="ool";var G9W='.dteInline';var o9W="messa";var Y9W="unt";var f9W="submitOnBlur";var h4O=z0v.D6p;h4O+=m9W;h4O+=i1W;h4O+=G6p;var c4O=u4p;c4O+=v9W;c4O+=Y6p;var T4O=N9W;T4O+=W8p;var L4O=o9W;L4O+=H4p;var Q4O=z0v.R9U;Q4O+=q9W;Q4O+=u6p;Q4O+=W8p;var y4O=J2p;y4O+=A9W;var e4O=J2p;e4O+=l0j;e4O+=s2p;e4O+=q6p;var F4O=q1W;F4O+=R8p;F4O+=z0v.M9U;F4O+=Y9W;var z4O=q1W;z4O+=t0j;z4O+=Y6p;var q4O=s9W;q4O+=s2p;q4O+=W9W;var that=this;var inlineCount=__inlineCounter++;var namespace=G9W + inlineCount;if(opts[q4O] !== undefined){var Y4O=y4p;Y4O+=Y6p;Y4O+=q6p;var A4O=b9W;A4O+=u9W;opts[S9W]=opts[A4O]?Y4O:C6j;}z0v.F0v();if(opts[f9W] !== undefined){var b4O=b9W;b4O+=q6p;var G4O=Y6p;G4O+=m2p;G4O+=U2p;var W4O=R2p;W4O+=l9W;W4O+=z9W;W4O+=F9W;var s4O=e9W;s4O+=F9W;opts[s4O]=opts[W4O]?G4O:b4O;}if(opts[y9W] !== undefined){var f4O=Q9W;f4O+=l0j;var S4O=P9W;S4O+=Z9W;var u4O=W8p;u4O+=t9W;u4O+=L9W;u4O+=T9W;opts[u4O]=opts[S4O]?f4O:C6j;}if(opts[c9W] !== undefined){var l4O=z0v.D6p;l4O+=s2p;l4O+=m2p;l4O+=m6p;opts[b0j]=opts[c9W]?l4O:C6j;}this[Y6p][z4O]=opts;this[Y6p][F4O]=inlineCount;if(typeof opts[e4O] === Z6j || typeof opts[y4O] === Q4O){var t4O=J2p;t4O+=l0j;t4O+=T1j;var Z4O=J2p;Z4O+=a5p;Z4O+=q6p;var P4O=J2p;P4O+=l0j;P4O+=s2p;P4O+=q6p;this[P4O](opts[Z4O]);opts[t4O]=d5p;}if(typeof opts[L4O] === Z6j || typeof opts[i3p] === T4O){this[i3p](opts[i3p]);opts[i3p]=d5p;}if(typeof opts[c4O] !== h4O){var M4O=u2W;M4O+=J2p;M4O+=O6p;this[T8j](opts[T8j]);opts[M4O]=d5p;}$(document)[W8p](h9W + namespace,function(e){var M9W="played";var E9W="Ele";var a9W="men";var n4O=v8p;n4O+=M9W;if(e[t9j] === m9U && that[Y6p][n4O]){var E4O=n9W;E4O+=E9W;E4O+=a9W;E4O+=J2p;var el=$(document[E4O]);if(el){var a4O=W0W;a4O+=G6p;a4O+=z0v.E9U;a4O+=j3W;var field=that[k9W](el);if(field && typeof field[j9W] === a4O && field[j9W](el)){e[c9j]();}}}});$(document)[W8p](Z9j + namespace,function(e){var D6e="R";var I6e="yCod";var N6e="next";var w6e="efault";var X6e="ventD";var r9W="rent";var K6e="urn";var B6e="onRet";var C6e="onRetur";var i6e="Esc";var m6e="eyCo";var g6e="ventDef";var x6e="onEsc";var R9W="ode";var H6e='.DTE_Form_Buttons';var S9U=37;var v6e="prev";var f9U=39;var V6e="activeElement";var U9W="layed";var J6e="Es";var O9W="ey";var k6e="aul";var J7O=s2p;J7O+=p9W;J7O+=p7p;var d7O=y2p;d7O+=z0v.C6p;d7O+=r9W;d7O+=Y6p;var I7O=M1j;I7O+=O9W;I7O+=R8p;z0v.F0v();I7O+=R9W;var p4O=z4j;p4O+=U9W;var j4O=L9j;j4O+=I6e;j4O+=q6p;var el=$(document[V6e]);if(e[j4O] === m9U && that[Y6p][p4O]){var field=that[k9W](el);if(field && typeof field[j9W] === E8p && field[j9W](el)){var R4O=C6e;R4O+=G6p;var r4O=W8p;r4O+=D6e;r4O+=q6p;r4O+=Q1j;if(opts[r4O] === S0j){var O4O=x8p;O4O+=g6e;O4O+=k6e;O4O+=J2p;e[O4O]();that[J1j]();}else if(typeof opts[R4O] === E8p){var U4O=B6e;U4O+=K6e;e[c9j]();opts[U4O](that,e);}}}else if(e[I7O] === s9U){var K7O=y7W;K7O+=w2p;K7O+=l0j;var B7O=W8p;B7O+=i6e;var g7O=W8p;g7O+=w6p;g7O+=d6e;var C7O=z0v.M9U;C7O+=G6p;C7O+=J6e;C7O+=n1p;var V7O=y2p;V7O+=A7p;V7O+=X6e;V7O+=w6e;e[V7O]();if(typeof opts[C7O] === E8p){opts[x6e](that,e);}else if(opts[x6e] === D2j){var D7O=z0v.D6p;D7O+=s2p;D7O+=m2p;D7O+=m6p;that[D7O]();}else if(opts[g7O] === m1W){var k7O=P4p;k7O+=z0v.M9U;k7O+=J4j;that[k7O]();}else if(opts[B7O] === K7O){var i7O=R2p;i7O+=z0v.D6p;i7O+=w2p;i7O+=l0j;that[i7O]();}}else if(el[d7O](H6e)[J7O]){var X7O=M1j;X7O+=m6e;X7O+=t2p;if(e[X7O] === S9U){var w7O=z0v.D6p;w7O+=Q3W;el[v6e](w7O)[F8p]();}else if(e[t9j] === f9U){var x7O=z0v.D6p;x7O+=m2p;x7O+=v9W;el[N6e](x7O)[F8p]();}}});this[Y6p][H8W]=function(){var o6e="keyu";var m7O=o6e;m7O+=y2p;var H7O=z0v.M9U;H7O+=z0v.R9U;H7O+=z0v.R9U;$(document)[H7O](h9W + namespace);$(document)[d4j](m7O + namespace);};return namespace;};Editor[L8p][q6e]=function(direction,action,data){var A6e='send';if(!this[Y6p][P5W] || !data){return;}if(direction === A6e){var v7O=q6p;v7O+=x6p;v7O+=l0j;if(action === j2W || action === v7O){var A7O=c8j;A7O+=l0j;var o7O=x6p;o7O+=z0v.C6p;o7O+=J2p;o7O+=z0v.C6p;var N7O=q6p;N7O+=z0v.C6p;N7O+=n1p;N7O+=p7p;var id;$[N7O](data[o7O],function(rowId,values){var s6e="ported by ";var W6e="the legacy Ajax data format";var Y6e="Editor: Multi-row editing is not sup";if(id !== undefined){var q7O=Y6e;q7O+=s6e;q7O+=W6e;throw q7O;}z0v.F0v();id=rowId;});data[Q0p]=data[Q0p][id];if(action === A7O){var Y7O=T6p;Y7O+=x6p;data[Y7O]=id;}}else {var G7O=V1j;G7O+=J2p;G7O+=z0v.C6p;var W7O=w2p;W7O+=x0p;var s7O=T6p;s7O+=x6p;data[s7O]=$[W7O](data[Q0p],function(values,id){z0v.h0v();return id;});delete data[G7O];}}else {var b7O=x6p;b7O+=z0v.C6p;b7O+=W4j;if(!data[b7O] && data[n5j]){data[Q0p]=[data[n5j]];}else if(!data[Q0p]){data[Q0p]=[];}}};Editor[u7O][S7O]=function(json){var that=this;if(json[G6e]){$[y8p](this[Y6p][C0j],function(name,field){var b6e="update";var f7O=z0v.M9U;f7O+=y2p;f7O+=J2p;f7O+=Y5W;if(json[f7O][name] !== undefined){var l7O=u6W;l7O+=r4p;var fieldInst=that[l7O](name);if(fieldInst && fieldInst[b6e]){fieldInst[b6e](json[G6e][name]);}}});}};Editor[L8p][z7O]=function(el,msg){var u6e="fade";var f6e="adeIn";var l6e="ock";var F7O=z0v.R9U;F7O+=a3W;F7O+=T6p;F7O+=W8p;z0v.h0v();var canAnimate=$[c7p][r7j]?d5p:i5p;if(typeof msg === F7O){var y7O=W4j;y7O+=z0v.D6p;y7O+=T1j;var e7O=C4p;e7O+=y2p;e7O+=T6p;msg=msg(this,new DataTable[e7O](this[Y6p][y7O]));}el=$(el);if(canAnimate){el[I8W]();}if(!msg){if(this[Y6p][H1W] && canAnimate){var Q7O=u6e;Q7O+=b6W;Q7O+=U5p;el[Q7O](function(){el[g6j](l7p);});}else {var t7O=V9p;t7O+=G6p;t7O+=q6p;var Z7O=n1p;Z7O+=Y6p;Z7O+=Y6p;var P7O=p7p;P7O+=m1j;P7O+=s2p;el[P7O](l7p)[Z7O](f6j,t7O);}}else {var L7O=g1W;L7O+=z0v.C6p;L7O+=S6e;L7O+=x6p;if(this[Y6p][L7O] && canAnimate){var T7O=z0v.R9U;T7O+=f6e;el[g6j](msg)[T7O]();}else {var M7O=c5j;M7O+=l6e;var h7O=g1p;h7O+=w0W;var c7O=n1p;c7O+=Y6p;c7O+=Y6p;el[g6j](msg)[c7O](h7O,M7O);}}};Editor[n7O][z6e]=function(){var Z6e="iVal";var P6e="isMult";z0v.h0v();var Q6e="isMultiVal";var y6e="eFi";var F6e="lengt";var e6e="includ";var t6e="multiInfoShown";var j7O=F6e;j7O+=p7p;var a7O=e6e;a7O+=y6e;a7O+=b1p;a7O+=r5j;var E7O=A0p;E7O+=x6p;E7O+=Y6p;var fields=this[Y6p][E7O];var include=this[Y6p][a7O];var show=d5p;var state;if(!include){return;}for(var i=g9U,ien=include[j7O];i < ien;i++){var r7O=Q6e;r7O+=m1p;var p7O=P6e;p7O+=Z6e;p7O+=m1p;var field=fields[include[i]];var multiEditable=field[K1j]();if(field[p7O]() && multiEditable && show){state=d5p;show=i5p;}else if(field[r7O]() && !multiEditable){state=d5p;}else {state=i5p;}fields[include[i]][t6e](state);}};Editor[O7O][R7O]=function(type,immediate){var c6e='submit.editor-internal';var L6e="captu";var T6e="reFocus";var B5O=j7p;B5O+=J2p;B5O+=T6p;B5O+=W8p;var V5O=z0v.M9U;V5O+=G6p;var I5O=X1p;I5O+=m6p;I5O+=w2p;var U7O=L6e;U7O+=T6e;var that=this;var focusCapture=this[Y6p][o1W][U7O];if(focusCapture === undefined){focusCapture=d5p;}$(this[o8p][I5O])[d4j](c6e)[V5O](c6e,function(e){z0v.F0v();e[c9j]();});if(focusCapture && (type === H3W || type === u8j)){$(B9p)[W8p](v8W,function(){var M6e="ement";var a6e="setFocus";var E6e='.DTED';var h6e="activeElem";var n6e='.DTE';var g5O=h6e;g5O+=A3p;var D5O=s2p;D5O+=g3p;D5O+=c1j;D5O+=p7p;var C5O=n9W;C5O+=w6p;C5O+=s2p;C5O+=M6e;if($(document[C5O])[L2W](n6e)[D5O] === g9U && $(document[g5O])[L2W](E6e)[K5p] === g9U){if(that[Y6p][a6e]){var k5O=z0v.R9U;k5O+=z0v.M9U;k5O+=j6e;k5O+=Y6p;that[Y6p][a6e][k5O]();}}});}this[z6e]();this[T3W](p6e,[type,this[Y6p][B5O]]);if(immediate){var i5O=B3W;i5O+=q6p;i5O+=x6p;var K5O=O2p;K5O+=q6p;K5O+=r6e;K5O+=J2p;this[K5O](i5O,[type,this[Y6p][T5j]]);}return d5p;};Editor[d5O][J5O]=function(type){var O6e="eO";var I1e="_clearDynam";var V1e="icInfo";var R6e="cance";var C1e='inline';var w5O=z0v.C6p;w5O+=z0v.E9U;w5O+=j3W;var X5O=v6p;X5O+=O6e;X5O+=V3p;if(this[T3W](X5O,[type,this[Y6p][w5O]]) === i5p){var m5O=R6e;m5O+=s2p;m5O+=U6e;m5O+=G6p;var H5O=O2p;H5O+=T6W;var x5O=I1e;x5O+=V1e;this[x5O]();this[H5O](m5O,[type,this[Y6p][T5j]]);if((this[Y6p][g2p] === C1e || this[Y6p][g2p] === u8j) && this[Y6p][H8W]){this[Y6p][H8W]();}this[Y6p][H8W]=w8p;return i5p;}this[Y6p][H1W]=type;return d5p;};Editor[L8p][D1e]=function(processing){var k1e="ctive";var g1e="processin";var B1e='div.DTE';var K1e="toggleClass";var q5O=g1e;q5O+=m4p;var o5O=w0p;o5O+=m6p;o5O+=x0p;o5O+=H0p;var N5O=x6p;N5O+=z0v.M9U;N5O+=w2p;var v5O=z0v.C6p;v5O+=k1e;var procClass=this[x9p][J8p][v5O];$([B1e,this[N5O][o5O]])[K1e](procClass,processing);this[Y6p][q5O]=processing;this[T3W](K0W,[processing]);};Editor[L8p][A5O]=function(successCallback,errorCallback,formatdata,hide){var W1e='allIfChanged';var f1e="omp";var H1e="Ta";var S1e="onC";var w1e="_fnSetObjectDataFn";var b1e="submitC";var d1e="dbTa";var i1e="preS";var u1e="mplete";var n5O=z0v.C6p;n5O+=z4p;n5O+=A0j;var M5O=i1e;M5O+=f0j;M5O+=T6p;M5O+=J2p;var h5O=Y6p;h5O+=q6p;h5O+=G6p;h5O+=x6p;var G5O=d1e;G5O+=z0v.D6p;G5O+=s2p;G5O+=q6p;var W5O=c8j;W5O+=J1e;z0v.h0v();W5O+=y2p;W5O+=F6p;var s5O=k0j;s5O+=Y6p;var Y5O=z0v.M9U;Y5O+=X1e;Y5O+=T6p;var that=this;var i,iLen,eventRet,errorNodes;var changed=i5p,allData={},changedData={};var setBuilder=DataTable[I2p][Y5O][w1e];var dataSource=this[Y6p][q8W];var fields=this[Y6p][s5O];var editCount=this[Y6p][x1e];var modifier=this[Y6p][h5j];var editFields=this[Y6p][a6W];var editData=this[Y6p][P8W];var opts=this[Y6p][W5O];var changedSubmit=opts[J1j];var submitParamsLocal;var action=this[Y6p][T5j];var submitParams={"data":{}};submitParams[this[Y6p][y5W]]=action;if(this[Y6p][G5O]){var u5O=f5W;u5O+=H1e;u5O+=z0v.D6p;u5O+=T1j;var b5O=J2p;b5O+=l4W;b5O+=T1j;submitParams[b5O]=this[Y6p][u5O];}if(action === U9j || action === q1W){var Q5O=X4W;Q5O+=q6p;Q5O+=b6p;$[y8p](editFields,function(idSrc,edit){var v1e="mptyOb";var N1e="ject";var m1e="sE";var y5O=T6p;y5O+=m1e;y5O+=v1e;y5O+=N1e;var allRowData={};var changedRowData={};$[y8p](fields,function(name,field){var o1e="submittable";var q1e="mpare";var Y1e='-many-count';var A1e=/\[.*$/;var S5O=r9j;S5O+=b1p;S5O+=r5j;if(edit[S5O][name] && field[o1e]()){var e5O=Z9p;e5O+=q1e;var F5O=q6p;F5O+=g1p;F5O+=J2p;var l5O=u8W;l5O+=b8W;var multiGet=field[r2W]();var builder=setBuilder(name);if(multiGet[idSrc] === undefined){var f5O=x6p;f5O+=z0v.C6p;f5O+=J2p;f5O+=z0v.C6p;var originalVal=field[P0p](edit[f5O]);builder(allRowData,originalVal);return;}var value=multiGet[idSrc];var manyBuilder=$[s6W](value) && name[s2W](l5O) !== -k9U?setBuilder(name[T6j](A1e,l7p) + Y1e):w8p;builder(allRowData,value);if(manyBuilder){var z5O=T1j;z5O+=V5j;z5O+=P7j;manyBuilder(allRowData,value[z5O]);}if(action === F5O && (!editData[name] || !field[e5O](value,editData[name][idSrc]))){builder(changedRowData,value);changed=d5p;if(manyBuilder){manyBuilder(changedRowData,value[K5p]);}}}});if(!$[s1e](allRowData)){allData[idSrc]=allRowData;}if(!$[y5O](changedRowData)){changedData[idSrc]=changedRowData;}});if(action === Q5O || changedSubmit === g2j || changedSubmit === W1e && changed){submitParams[Q0p]=allData;}else if(changedSubmit === G1e && changed){submitParams[Q0p]=changedData;}else {var T5O=b1e;T5O+=z0v.M9U;T5O+=u1e;var L5O=O2p;L5O+=J8p;var Z5O=S1e;Z5O+=f1e;Z5O+=T1j;Z5O+=t6p;var P5O=j7p;P5O+=J2p;P5O+=j3W;this[Y6p][P5O]=w8p;if(opts[Z5O] === m1W && (hide === undefined || hide)){var t5O=d8W;t5O+=Y2j;t5O+=q6p;this[t5O](i5p);}else if(typeof opts[S9W] === E8p){opts[S9W](this);}if(successCallback){successCallback[T8p](this);}this[L5O](i5p);this[T3W](T5O);return;}}else if(action === s4j){$[y8p](editFields,function(idSrc,edit){var c5O=x6p;c5O+=R0j;c5O+=z0v.C6p;z0v.F0v();submitParams[c5O][idSrc]=edit[Q0p];});}this[q6e](h5O,action,submitParams);submitParamsLocal=$[f0p](d5p,{},submitParams);if(formatdata){formatdata(submitParams);}if(this[T3W](M5O,[submitParams,action]) === i5p){this[D1e](i5p);return;}var submitWire=this[Y6p][n5O] || this[Y6p][Z0W]?this[A0W]:this[l1e];submitWire[T8p](this,submitParams,function(json,notGood,xhr){var F1e="itSucce";var z1e="_subm";var a5O=j7p;a5O+=u6p;a5O+=z0v.M9U;a5O+=G6p;var E5O=z1e;E5O+=F1e;E5O+=a1p;that[E5O](json,notGood,submitParams,submitParamsLocal,that[Y6p][a5O],editCount,hide,successCallback,errorCallback,xhr);},function(xhr,err,thrown){var j5O=z0v.C6p;j5O+=n1p;j5O+=J2p;j5O+=j3W;z0v.h0v();that[e1e](xhr,err,thrown,errorCallback,submitParams,that[Y6p][j5O]);},submitParams);};Editor[p5O][l1e]=function(data,success,error,submitParams){var Q1e="fnSe";var T1e="individua";var Z1e="ectDataFn";var c1e="Source";var P1e="tObj";var h1e='fields';var U5O=m6p;U5O+=o0W;U5O+=q6p;var R5O=T6p;R5O+=x6p;R5O+=y1e;R5O+=n1p;var O5O=O2p;O5O+=Q1e;O5O+=P1e;O5O+=Z1e;var r5O=z0v.M9U;r5O+=C4p;r5O+=y2p;r5O+=T6p;var that=this;var action=data[T5j];var out={data:[]};var idGet=DataTable[I2p][r5O][Z0p](this[Y6p][t1e]);z0v.h0v();var idSet=DataTable[I2p][L1e][O5O](this[Y6p][R5O]);if(action !== U5O){var g0O=V1j;g0O+=W4j;var D0O=T1e;D0O+=s2p;var C0O=O2p;C0O+=Q0p;C0O+=c1e;var V0O=w2p;V0O+=z0v.C6p;V0O+=T6p;V0O+=G6p;var I0O=w2p;I0O+=s5p;I0O+=q6p;var originalData=this[Y6p][I0O] === V0O?this[C0O](h1e,this[h5j]()):this[a0j](D0O,this[h5j]());$[y8p](data[g0O],function(key,vals){var M1e="_fnE";var n1e="dataTableExt";var i0O=Q2p;i0O+=z0v.C6p;var B0O=M1e;B0O+=I4W;B0O+=V2p;var k0O=z0v.M9U;k0O+=C4p;k0O+=y2p;k0O+=T6p;var toSave;var extender=$[c7p][n1e][k0O][B0O];if(action === z2W){var K0O=x6p;K0O+=z0v.C6p;K0O+=J2p;K0O+=z0v.C6p;var rowData=originalData[key][K0O];toSave=extender({},rowData,d5p);toSave=extender(toSave,vals,d5p);}else {toSave=extender({},vals,d5p);}var overrideId=idGet(toSave);if(action === j2W && overrideId === undefined){idSet(toSave,+new Date() + l7p + key);}else {idSet(toSave,overrideId);}out[i0O][X0j](toSave);});}success(out);};Editor[d0O][E1e]=function(json,notGood,submitParams,submitParamsLocal,action,editCount,hide,successCallback,errorCallback,xhr){var H2e='prep';var q2e='setData';var j1e="ldE";var W2e='postEdit';var N2e="rce";var b2e='postRemove';var l2e='submitSuccess';var v2e="_dataSou";var O1e='receive';var I2e="submitUnsucc";var f2e="onComp";var U1e="fieldError";var s2e='preEdit';var a1e="_processi";var x2e="aSour";var S2e="onComple";var r1e="editOpt";var w2e="com";var G2e='preRemove';var R1e='postSubmit';var u2e='commit';var V2e="essful";var Y2e='preCreate';var p1e="rrors";var m2e="eve";var K8O=a1e;K8O+=V5j;var o0O=s2p;o0O+=g3p;o0O+=a5j;var N0O=u6W;N0O+=j1e;N0O+=p1e;var v0O=q6p;v0O+=h2p;v0O+=L3p;var x0O=O2p;x0O+=T6W;var w0O=p1p;w0O+=w4p;w0O+=m6p;var X0O=r1e;X0O+=Y6p;var J0O=u6W;z0v.F0v();J0O+=s2p;J0O+=r5j;var that=this;var setData;var fields=this[Y6p][J0O];var opts=this[Y6p][X0O];var modifier=this[Y6p][w0O];this[q6e](O1e,action,json);this[x0O](R1e,[json,submitParams,action,xhr]);if(!json[z1W]){var H0O=q6p;H0O+=m6p;H0O+=m6p;H0O+=L3p;json[H0O]=z0v.g6p;}if(!json[f7W]){var m0O=U1e;m0O+=Y6p;json[m0O]=[];}if(notGood || json[v0O] || json[N0O][o0O]){var P0O=I2e;P0O+=V2e;var Q0O=C2e;Q0O+=D2e;var y0O=z4p;y0O+=z0v.M9U;y0O+=T6p;y0O+=G6p;var globalError=[];if(json[z1W]){var q0O=y2p;q0O+=m2p;q0O+=Y6p;q0O+=p7p;globalError[q0O](json[z1W]);}$[y8p](json[f7W],function(i,err){var i2e="yConten";z0v.h0v();var d2e="onFieldError";var k2e="onFieldE";var g2e='Unknown field: ';var K2e="posit";var B2e="FieldE";var A0O=G6p;A0O+=z0v.C6p;A0O+=w2p;A0O+=q6p;var field=fields[err[A0O]];if(!field){throw new Error(g2e + err[F0p]);}else if(field[H1W]()){var Y0O=A9p;Y0O+=z0v.M9U;Y0O+=m6p;field[Y0O](err[l7W] || P7W);if(i === g9U){var l0O=k2e;l0O+=p2j;var W0O=z0v.R9U;W0O+=z0v.M9U;W0O+=j6e;W0O+=Y6p;var s0O=W8p;s0O+=B2e;s0O+=p2j;if(opts[s0O] === W0O){var f0O=X1p;f0O+=n1p;f0O+=m2p;f0O+=Y6p;var S0O=K2e;S0O+=j3W;var u0O=G6p;u0O+=z0v.M9U;u0O+=t2p;var b0O=Q3j;b0O+=x0p;b0O+=w3p;b0O+=m6p;var G0O=T2j;G0O+=x6p;G0O+=i2e;G0O+=J2p;that[x3j]($(that[o8p][G0O],that[Y6p][b0O]),{scrollTop:$(field[u0O]())[S0O]()[a7j]},P9U);field[f0O]();}else if(typeof opts[l0O] === E8p){opts[d2e](that,err);}}}else {var e0O=w6p;e0O+=h2p;e0O+=L3p;var F0O=J2e;F0O+=q7p;var z0O=y2p;z0O+=X2e;globalError[z0O](field[F0p]() + F0O + (err[l7W] || e0O));}});this[z1W](globalError[y0O](Q0O));this[T3W](P0O,[json]);if(errorCallback){var Z0O=n1p;Z0O+=z0v.C6p;Z0O+=s2p;Z0O+=s2p;errorCallback[Z0O](that,json);}}else {var V8O=B4W;V8O+=D3W;var L0O=q6p;L0O+=x6p;L0O+=T6p;L0O+=J2p;var t0O=n1p;t0O+=m6p;t0O+=i1W;t0O+=t6p;var store={};if(json[Q0p] && (action === t0O || action === L0O)){var I8O=V1j;I8O+=J2p;I8O+=z0v.C6p;var U0O=w2e;U0O+=w2p;U0O+=l0j;var R0O=W3p;R0O+=J2p;R0O+=x2e;R0O+=N2p;var c0O=x6p;c0O+=z0v.C6p;c0O+=W4j;var T0O=A1W;T0O+=x2e;T0O+=N2p;this[T0O](H2e,action,modifier,submitParamsLocal,json,store);for(var i=g9U;i < json[c0O][K5p];i++){var r0O=q6p;r0O+=x6p;r0O+=l0j;var n0O=n1p;n0O+=m6p;n0O+=q6p;n0O+=b6p;var M0O=O2p;M0O+=m2e;M0O+=g9p;var h0O=v2e;h0O+=N2e;setData=json[Q0p][i];var id=this[h0O](o2e,setData);this[M0O](q2e,[json,setData,action]);if(action === n0O){var p0O=A2e;p0O+=Y6p;p0O+=V6W;p0O+=b6p;var j0O=c0W;j0O+=R0j;j0O+=q6p;var a0O=n1p;a0O+=A7p;a0O+=R0j;a0O+=q6p;var E0O=Y3p;E0O+=r6e;E0O+=J2p;this[E0O](Y2e,[json,setData,id]);this[a0j](a0O,fields,setData,store);this[T3W]([j0O,p0O],[json,setData,id]);}else if(action === r0O){var O0O=q6p;O0O+=x6p;O0O+=T6p;O0O+=J2p;this[T3W](s2e,[json,setData,id]);this[a0j](z2W,modifier,fields,setData,store);this[T3W]([O0O,W2e],[json,setData,id]);}}this[R0O](U0O,action,modifier,json[I8O],store);}else if(action === V8O){var D8O=l0p;D8O+=Y6p;var C8O=V3W;C8O+=q6p;C8O+=g9p;this[a0j](H2e,action,modifier,submitParamsLocal,json,store);this[C8O](G2e,[json,this[D8O]()]);this[a0j](t0W,modifier,fields,store);this[T3W]([t0W,b2e],[json,this[h1W]()]);this[a0j](u2e,action,modifier,json[Q0p],store);}if(editCount === this[Y6p][x1e]){var B8O=S2e;B8O+=t6p;var g8O=f2e;g8O+=M7W;var action=this[Y6p][T5j];this[Y6p][T5j]=w8p;if(opts[g8O] === m1W && (hide === undefined || hide)){var k8O=O2p;k8O+=n1p;k8O+=o3j;k8O+=q6p;this[k8O](json[Q0p]?d5p:i5p,action);}else if(typeof opts[B8O] === E8p){opts[S9W](this);}}if(successCallback){successCallback[T8p](that,json);}this[T3W](l2e,[json,setData,action]);}this[K8O](i5p);this[T3W](z2e,[json,setData,action]);};Editor[L8p][e1e]=function(xhr,err,thrown,errorCallback,submitParams,action){var e2e="sy";var F2e="submitEr";var Q2e="tSub";var y2e="stem";var H8O=F2e;H8O+=G9p;var w8O=e2e;w8O+=y2e;var X8O=A9p;X8O+=L3p;z0v.h0v();var J8O=E0W;J8O+=m6p;var d8O=A2e;d8O+=Y6p;d8O+=Q2e;d8O+=P2e;var i8O=V3W;i8O+=A3p;this[i8O](d8O,[w8p,submitParams,action,xhr]);this[J8O](this[E1j][X8O][w8O]);this[D1e](i5p);if(errorCallback){var x8O=n1p;x8O+=z0v.C6p;x8O+=C8W;errorCallback[x8O](this,xhr,err,thrown);}this[T3W]([H8O,z2e],[xhr,err,thrown,submitParams]);};Editor[L8p][d6W]=function(fn){var c2e="tCom";var t2e="gs";var h2e="plet";var G8O=z0v.D6p;G8O+=m2p;G8O+=z0v.D6p;G8O+=L5j;var W8O=T6p;W8O+=p1W;W8O+=R5p;W8O+=q6p;var q8O=h1p;q8O+=M1p;var N8O=Z2e;N8O+=T1j;var v8O=z0v.R9U;v8O+=G6p;var m8O=W4j;m8O+=L5j;var that=this;var dt=this[Y6p][m8O]?new $[v8O][N8O][y5j](this[Y6p][Q5j]):w8p;var ssp=i5p;if(dt){var o8O=L4p;o8O+=R5p;o8O+=t2e;ssp=dt[o8O]()[g9U][L2e][T2e];}if(this[Y6p][q8O]){var Y8O=P9W;Y8O+=c2e;Y8O+=h2e;Y8O+=q6p;var A8O=z0v.M9U;A8O+=G6p;A8O+=q6p;this[A8O](Y8O,function(){var n2e="aw";if(ssp){var s8O=M2e;s8O+=n2e;dt[k3W](s8O,fn);}else {setTimeout(function(){z0v.F0v();fn();},w9U);}});return d5p;}else if(this[O9p]() === W8O || this[O9p]() === G8O){var l8O=z0v.D6p;l8O+=s2p;l8O+=K8W;this[k3W](m1W,function(){var E2e="sing";z0v.h0v();var b8O=p2p;b8O+=N2p;b8O+=Y6p;b8O+=E2e;if(!that[Y6p][b8O]){setTimeout(function(){z0v.h0v();if(that[Y6p]){fn();}},w9U);}else {var u8O=W8p;u8O+=q6p;that[u8O](z2e,function(e,json){if(ssp && json){var f8O=M2e;f8O+=z0v.C6p;f8O+=w0p;var S8O=z0v.M9U;S8O+=G6p;S8O+=q6p;dt[S8O](f8O,fn);}else {setTimeout(function(){z0v.F0v();if(that[Y6p]){fn();}},w9U);}});}})[l8O]();return d5p;}return i5p;};Editor[z8O][F8O]=function(name,arr){z0v.F0v();for(var i=g9U,ien=arr[K5p];i < ien;i++){if(name == arr[i]){return i;}}return -k9U;};Editor[e8O]={"table":w8p,"ajaxUrl":w8p,"fields":[],"display":a2e,"ajax":w8p,"idSrc":y8O,"events":{},"i18n":{"close":j2e,"create":{"button":p2e,"title":r2e,"submit":O2e},"edit":{"button":Q8O,"title":R2e,"submit":P8O},"remove":{"button":Z8O,"title":U2e,"submit":U2e,"confirm":{"_":I3e,"1":V3e}},"error":{"system":t8O},multi:{title:L8O,info:C3e,restore:T8O,noMulti:D3e},datetime:{previous:g3e,next:c8O,months:[k3e,B3e,K3e,i3e,h8O,d3e,M8O,J3e,X3e,n8O,E8O,a8O],weekdays:[j8O,w3e,p8O,x3e,H3e,r8O,m3e],amPm:[O8O,v3e],hours:R8O,minutes:U8O,seconds:I9O,unknown:Y3W}},formOptions:{bubble:$[f0p]({},Editor[V9O][C2j],{title:i5p,message:i5p,buttons:C9O,submit:G1e}),inline:$[D9O]({},Editor[U1j][g9O],{buttons:i5p,submit:k9O}),main:$[f0p]({},Editor[B9O][C2j])},legacyAjax:i5p,actionName:N3e};(function(){var q3e="ources";var J4e="Opts";var V4e="taFn";var Z4e='keyless';var A3e="drawType";var X4e="dataT";var o3e="dataS";var Q3e="ngs";var K9O=o3e;K9O+=q3e;var __dataSources=Editor[K9O]={};var __dtIsSsp=function(dt,editor){var d9O=c8j;d9O+=J1e;d9O+=y2p;d9O+=F6p;var i9O=L4p;i9O+=T6p;i9O+=V5j;i9O+=Y6p;return dt[i9O]()[g9U][L2e][T2e] && editor[Y6p][d9O][A3e] !== C6j;};var __dtApi=function(table){var Y3e="aTab";var J9O=e6p;J9O+=Y3e;J9O+=s2p;z0v.F0v();J9O+=q6p;return $(table)[J9O]();};var __dtHighlight=function(node){z0v.h0v();node=$(node);setTimeout(function(){var s3e="ighli";var W3e="ddC";var w9O=p7p;w9O+=s3e;w9O+=I9j;var X9O=z0v.C6p;X9O+=W3e;X9O+=f9p;node[X9O](w9O);setTimeout(function(){var G3e="oveC";var b3e='noHighlight';var u3e='highlight';var H9O=k1j;H9O+=G3e;H9O+=f9p;var x9O=p5j;x9O+=x6p;z0v.F0v();x9O+=J9p;node[x9O](b3e)[H9O](u3e);setTimeout(function(){var S3e="eC";var m9O=v0W;m9O+=S3e;m9O+=f9p;node[m9O](b3e);},Z9U);},P9U);},o9U);};var __dtRowSelector=function(out,dt,identifier,fields,idFn){var N9O=T6p;N9O+=f3e;var v9O=m6p;v9O+=l3e;dt[v9O](identifier)[N9O]()[y8p](function(idx){var z3e='Unable to find row identifier';var v9U=14;var q9O=m6p;q9O+=H9j;var o9O=V1j;o9O+=J2p;o9O+=z0v.C6p;var row=dt[n5j](idx);var data=row[o9O]();var idSrc=idFn(data);z0v.h0v();if(idSrc === undefined){Editor[z1W](z3e,v9U);}out[idSrc]={idSrc:idSrc,data:data,node:row[L6W](),fields:fields,type:q9O};});};var __dtFieldsFromIdx=function(dt,fields,idx){var Z3e="mData";var e3e="aoColum";var L3e='Unable to automatically determine field from source. Please specify the field name.';var y3e="setti";var P3e="editField";var F3e="editFie";var s9O=F3e;s9O+=r4p;var Y9O=e3e;Y9O+=G6p;Y9O+=Y6p;var A9O=y3e;A9O+=Q3e;var field;var col=dt[A9O]()[g9U][Y9O][idx];var dataSrc=col[P3e] !== undefined?col[s9O]:col[Z3e];var resolvedFields={};var run=function(field,dataSrc){var W9O=G6p;W9O+=q3p;if(field[W9O]() === dataSrc){var G9O=G6p;G9O+=z0v.C6p;G9O+=w2p;G9O+=q6p;resolvedFields[field[G9O]()]=field;}};$[y8p](fields,function(name,fieldInst){z0v.F0v();var t3e="sA";var b9O=T6p;b9O+=t3e;b9O+=u4W;if($[b9O](dataSrc)){for(var i=g9U;i < dataSrc[K5p];i++){run(fieldInst,dataSrc[i]);}}else {run(fieldInst,dataSrc);}});if($[s1e](resolvedFields)){Editor[z1W](L3e,x9U);}return resolvedFields;};var __dtCellSelector=function(out,dt,identifier,allFields,idFn,forceFields){var T3e="xes";var S9O=R5p;S9O+=x6p;S9O+=q6p;S9O+=T3e;var u9O=n1p;z0v.F0v();u9O+=b1p;u9O+=s2p;u9O+=Y6p;dt[u9O](identifier)[S9O]()[y8p](function(idx){var h3e="splayFields";var M3e="column";var E3e="tta";var a3e="fixedNode";var y9O=T8W;y9O+=c4p;y9O+=N4p;var e9O=c3e;e9O+=x6p;var F9O=g1p;F9O+=h3e;var z9O=m4p;z9O+=v4p;var f9O=n1p;f9O+=q6p;f9O+=C8W;var cell=dt[f9O](idx);var row=dt[n5j](idx[n5j]);var data=row[Q0p]();var idSrc=idFn(data);var fields=forceFields || __dtFieldsFromIdx(dt,allFields,idx[M3e]);var isNode=typeof identifier === B5p && identifier[n3e] || identifier instanceof $;var prevDisplayFields,prevAttach;if(out[idSrc]){var l9O=z0v.C6p;l9O+=E3e;l9O+=n1p;l9O+=p7p;prevAttach=out[idSrc][l9O];prevDisplayFields=out[idSrc][c8W];}__dtRowSelector(out,dt,idx[n5j],allFields,idFn);out[idSrc][P5j]=prevAttach || [];out[idSrc][P5j][X0j](isNode?$(identifier)[z9O](g9U):cell[a3e]?cell[a3e]():cell[L6W]());out[idSrc][F9O]=prevDisplayFields || ({});$[e9O](out[idSrc][y9O],fields);});};var __dtColumnSelector=function(out,dt,identifier,fields,idFn){var P9O=i1W;P9O+=n1p;P9O+=p7p;z0v.F0v();var Q9O=n1p;Q9O+=b1p;Q9O+=s2p;Q9O+=Y6p;dt[Q9O](w8p,identifier)[j3e]()[P9O](function(idx){z0v.F0v();__dtCellSelector(out,dt,idx,fields,idFn);});};var __dtjqId=function(id){var r3e='\\$1';z0v.h0v();var p3e="tring";var t9O=A7p;t9O+=P6j;t9O+=n1p;t9O+=q6p;var Z9O=Y6p;Z9O+=p3e;return typeof id === Z9O?M1W + id[t9O](/(:|\.|\[|\]|,)/g,r3e):M1W + id;};__dataSources[F7p]={id:function(data){z0v.h0v();var U3e="ctDataFn";var R3e="_fnGetObje";var O3e="dSrc";var T9O=T6p;T9O+=O3e;var L9O=R3e;L9O+=U3e;var idFn=DataTable[I2p][L1e][L9O](this[Y6p][T9O]);return idFn(data);},individual:function(identifier,fieldNames){var C4e="oAp";z0v.h0v();var I4e="_fnGetObjectDa";var D4e="Array";var n9O=W4j;n9O+=L5j;var M9O=T6p;M9O+=x6p;M9O+=y1e;M9O+=n1p;var h9O=I4e;h9O+=V4e;var c9O=C4e;c9O+=T6p;var idFn=DataTable[I2p][c9O][h9O](this[Y6p][M9O]);var dt=__dtApi(this[Y6p][n9O]);var fields=this[Y6p][C0j];var out={};var forceFields;var responsiveNode;if(fieldNames){var a9O=q6p;a9O+=z0v.C6p;a9O+=n1p;a9O+=p7p;var E9O=a8p;E9O+=D4e;if(!$[E9O](fieldNames)){fieldNames=[fieldNames];}forceFields={};$[a9O](fieldNames,function(i,name){forceFields[name]=fields[name];});}__dtCellSelector(out,dt,identifier,fields,idFn,forceFields);return out;},fields:function(identifier){var B4e="bjectDa";var d4e="cells";var K4e="pi";var k4e="etO";var g4e="_fnG";var I6x=n1p;I6x+=b1p;I6x+=k2p;var U9O=m6p;U9O+=z0v.M9U;U9O+=w0p;z0v.F0v();U9O+=Y6p;var R9O=J2p;R9O+=l4W;R9O+=s2p;R9O+=q6p;var O9O=T6p;O9O+=b5W;O9O+=u5W;var r9O=g4e;r9O+=k4e;r9O+=B4e;r9O+=V4e;var p9O=z0v.M9U;p9O+=C4p;p9O+=K4e;var j9O=q6p;j9O+=I4W;var idFn=DataTable[j9O][p9O][r9O](this[Y6p][O9O]);var dt=__dtApi(this[Y6p][R9O]);var fields=this[Y6p][C0j];var out={};if($[u6j](identifier) && (identifier[U9O] !== undefined || identifier[i4e] !== undefined || identifier[I6x] !== undefined)){var V6x=n1p;V6x+=b1p;V6x+=s2p;V6x+=Y6p;if(identifier[U3p] !== undefined){__dtRowSelector(out,dt,identifier[U3p],fields,idFn);}if(identifier[i4e] !== undefined){__dtColumnSelector(out,dt,identifier[i4e],fields,idFn);}if(identifier[V6x] !== undefined){__dtCellSelector(out,dt,identifier[d4e],fields,idFn);}}else {__dtRowSelector(out,dt,identifier,fields,idFn);}return out;},create:function(fields,data){var dt=__dtApi(this[Y6p][Q5j]);z0v.F0v();if(!__dtIsSsp(dt,this)){var D6x=G6p;D6x+=z0v.M9U;D6x+=x6p;D6x+=q6p;var C6x=z0v.C6p;C6x+=x6p;C6x+=x6p;var row=dt[n5j][C6x](data);__dtHighlight(row[D6x]());}},edit:function(identifier,fields,data,store){var v4e="_fnExt";var N4e="ableExt";var m4e="owI";z0v.F0v();var B6x=G6p;B6x+=k3W;var k6x=q1W;k6x+=J4e;var g6x=J2p;g6x+=z0v.C6p;g6x+=L5j;var that=this;var dt=__dtApi(this[Y6p][g6x]);if(!__dtIsSsp(dt,this) || this[Y6p][k6x][A3e] === B6x){var J6x=z0v.C6p;J6x+=G6p;J6x+=W2p;var K6x=X4e;K6x+=w4e;var rowId=__dataSources[K6x][l0p][T8p](this,data);var row;try{var i6x=m6p;i6x+=z0v.M9U;i6x+=w0p;row=dt[i6x](__dtjqId(rowId));}catch(e){row=dt;}if(!row[x4e]()){row=dt[n5j](function(rowIdx,rowData,rowNode){var d6x=T6p;d6x+=x6p;z0v.h0v();return rowId == __dataSources[F7p][d6x][T8p](that,rowData);});}if(row[J6x]()){var N6x=F4p;N6x+=t8p;var v6x=r3p;v6x+=w0p;v6x+=H4e;v6x+=Y6p;var m6x=m6p;m6x+=m4e;m6x+=r5j;var H6x=x6p;H6x+=z0v.C6p;H6x+=J2p;H6x+=z0v.C6p;var x6x=v4e;x6x+=V2p;var w6x=z0v.M9U;w6x+=X1e;w6x+=T6p;var X6x=V1j;X6x+=W4j;X6x+=H2p;X6x+=N4e;var extender=$[c7p][X6x][w6x][x6x];var toSave=extender({},row[Q0p](),d5p);toSave=extender(toSave,data,d5p);row[H6x](toSave);var idx=$[b6j](rowId,store[m6x]);store[v6x][N6x](idx,k9U);}else {row=dt[n5j][O8p](data);}__dtHighlight(row[L6W]());}},remove:function(identifier,fields,store){var o4e="can";var A4e="ws";var Y4e="ry";var q4e="cell";var A6x=T1j;A6x+=G6p;A6x+=m4p;A6x+=P7j;var q6x=o4e;q6x+=q4e;q6x+=c8j;var o6x=W4j;o6x+=L5j;var that=this;z0v.h0v();var dt=__dtApi(this[Y6p][o6x]);var cancelled=store[q6x];if(cancelled[A6x] === g9U){var Y6x=r3p;Y6x+=A4e;dt[Y6x](identifier)[s4j]();}else {var f6x=m6p;f6x+=l3e;var s6x=q6p;s6x+=D3W;s6x+=Y4e;var indexes=[];dt[U3p](identifier)[s6x](function(){var s4e="inAr";var b6x=s4e;b6x+=Y9j;var G6x=x6p;G6x+=W4e;var W6x=Z2e;z0v.F0v();W6x+=T1j;var id=__dataSources[W6x][l0p][T8p](that,this[G6x]());if($[b6x](id,cancelled) === -k9U){var S6x=T6p;S6x+=G6p;S6x+=x6p;S6x+=S4W;var u6x=G4e;u6x+=r7p;indexes[u6x](this[S6x]());}});dt[f6x](indexes)[s4j]();}},prep:function(action,identifier,submit,json,store){var l4e="cancell";var u4e="celled";var b4e="rowI";var z4e="canc";var Z6x=k1j;Z6x+=z0v.M9U;Z6x+=d6p;Z6x+=q6p;var l6x=c8j;l6x+=l0j;if(action === l6x){var y6x=x6p;y6x+=z0v.C6p;y6x+=W4j;var e6x=w2p;e6x+=z0v.C6p;e6x+=y2p;var F6x=b4e;F6x+=r5j;var z6x=n1p;z6x+=z0v.C6p;z6x+=G6p;z6x+=u4e;var cancelled=json[z6x] || [];store[F6x]=$[e6x](submit[y6x],function(val,key){var f4e="tyObject";var S4e="isEmp";var P6x=x6p;P6x+=R0j;z0v.F0v();P6x+=z0v.C6p;var Q6x=S4e;Q6x+=f4e;return !$[Q6x](submit[P6x][key]) && $[b6j](key,cancelled) === -k9U?key:undefined;});}else if(action === Z6x){var L6x=l4e;L6x+=c8j;var t6x=z4e;t6x+=q6p;t6x+=C8W;t6x+=c8j;store[t6x]=json[L6x] || [];}},commit:function(action,identifier,data,store){var y4e="rverS";var P4e="ny";var Q4e="tti";z0v.h0v();var e4e="bSe";var F4e="rowIds";var O6x=q6p;O6x+=g1p;O6x+=J2p;O6x+=J4e;var c6x=s2p;c6x+=g3p;c6x+=m4p;c6x+=P7j;var T6x=r3p;T6x+=w0p;T6x+=i1j;var that=this;var dt=__dtApi(this[Y6p][Q5j]);if(!__dtIsSsp(dt,this) && action === z2W && store[T6x][c6x]){var ids=store[F4e];var row;var compare=function(id){z0v.F0v();return function(rowIdx,rowData,rowNode){var M6x=T6p;M6x+=x6p;var h6x=X4e;h6x+=j8p;h6x+=q6p;return id == __dataSources[h6x][M6x][T8p](that,rowData);};};for(var i=g9U,ien=ids[K5p];i < ien;i++){var p6x=e4e;p6x+=y4e;p6x+=T6p;p6x+=t2p;var j6x=J4j;j6x+=Q4e;j6x+=Q3e;var a6x=z0v.C6p;a6x+=P4e;var n6x=z0v.C6p;n6x+=G6p;n6x+=W2p;try{row=dt[n5j](__dtjqId(ids[i]));}catch(e){row=dt;}if(!row[n6x]()){var E6x=r3p;E6x+=w0p;row=dt[E6x](compare(ids[i]));}if(row[a6x]() && !dt[j6x]()[g9U][L2e][p6x]){var r6x=A7p;r6x+=d9p;row[r6x]();}}}var drawType=this[Y6p][O6x][A3e];if(drawType !== C6j){var R6x=x6p;R6x+=m6p;R6x+=z0v.C6p;R6x+=w0p;dt[R6x](drawType);}}};function __html_id(identifier){var t4e="ength";var c4e="d an element with `dat";var h4e="a-editor-id` or `id` of: ";var T4e="Could not fin";z0v.h0v();var L4e='[data-editor-id="';var context=document;if(identifier !== Z4e){var U6x=s2p;U6x+=t4e;context=$(L4e + identifier + a7p);if(context[U6x] === g9U){var I1x=V7W;I1x+=V5j;context=typeof identifier === I1x?$(__dtjqId(identifier)):$(identifier);}if(context[K5p] === g9U){var V1x=T4e;V1x+=c4e;V1x+=h4e;throw V1x + identifier;}}return context;}function __html_el(identifier,name){var M4e="[d";var E4e="r-field=\"";z0v.F0v();var n4e="ata-edito";var C1x=M4e;C1x+=n4e;C1x+=E4e;var context=__html_id(identifier);return $(C1x + name + a7p,context);}function __html_els(identifier,names){var out=$();z0v.h0v();for(var i=g9U,ien=names[K5p];i < ien;i++){var D1x=z0v.C6p;D1x+=x6p;D1x+=x6p;out=out[D1x](__html_el(identifier,names[i]));}return out;}function __html_get(identifier,dataSrc){var a4e="editor-value";var O4e="alue]";var j4e="[data";var p4e="-ed";var r4e="itor-v";var B1x=n7p;B1x+=a4e;var k1x=r8j;k1x+=c1j;k1x+=p7p;var g1x=j4e;g1x+=p4e;g1x+=r4e;g1x+=O4e;var el=__html_el(identifier,dataSrc);return el[R4e](g1x)[k1x]?el[Q9j](B1x):el[g6j]();}function __html_set(identifier,fields,data){z0v.F0v();$[y8p](fields,function(name,field){var I7e="rom";var C7e="r-value]";z0v.h0v();var U4e="valF";var k7e="itor-value";var V7e="[data-";var D7e="taSrc";var g7e="data-ed";var K1x=U4e;K1x+=I7e;K1x+=Q6p;K1x+=W4e;var val=field[K1x](data);if(val !== undefined){var J1x=F9p;J1x+=J2p;J1x+=p7p;var d1x=V7e;d1x+=s6p;d1x+=C7e;var i1x=x6p;i1x+=z0v.C6p;i1x+=D7e;var el=__html_el(identifier,field[i1x]());if(el[R4e](d1x)[J1x]){var X1x=g7e;X1x+=k7e;el[Q9j](X1x,val);}else {var m1x=p7p;m1x+=J2p;m1x+=w2p;m1x+=s2p;var w1x=q6p;w1x+=j7p;w1x+=p7p;el[w1x](function(){var B7e="childNodes";var i7e="eChild";var K7e="ov";var d7e="firstChild";var x1x=T1j;z0v.h0v();x1x+=G6p;x1x+=a5j;while(this[B7e][x1x]){var H1x=m6p;H1x+=O5W;H1x+=K7e;H1x+=i7e;this[H1x](this[d7e]);}})[m1x](val);}}});}__dataSources[g6j]={id:function(data){var v1x=o0p;v1x+=y2p;v1x+=T6p;var idFn=DataTable[I2p][v1x][Z0p](this[Y6p][t1e]);return idFn(data);},initField:function(cfg){var J7e='[data-editor-label="';var A1x=s2p;A1x+=z0v.C6p;A1x+=z0v.D6p;A1x+=b1p;var q1x=S5p;q1x+=b8W;var o1x=d0p;o1x+=q6p;z0v.F0v();var N1x=V1j;N1x+=J2p;N1x+=z0v.C6p;var label=$(J7e + (cfg[N1x] || cfg[o1x]) + q1x);if(!cfg[A1x] && label[K5p]){var Y1x=s2p;Y1x+=l4W;Y1x+=q6p;Y1x+=s2p;cfg[Y1x]=label[g6j]();}},individual:function(identifier,fieldNames){var x7e='[data-editor-id]';var w7e='data-editor-field';var X7e="ddBack";var m7e="keyle";var v7e='Cannot automatically determine field name from data source';var H7e='editor-id';var e1x=z0v.R9U;e1x+=T6p;e1x+=i6W;var F1x=h9j;F1x+=C8W;var z1x=A0p;z1x+=r5j;var l1x=K3j;l1x+=w2p;l1x+=s2p;var s1x=L6W;s1x+=G2p;s1x+=D5p;s1x+=q6p;var attachEl;if(identifier instanceof $ || identifier[s1x]){var S1x=V1j;S1x+=W4j;var u1x=y2p;u1x+=M6W;u1x+=g3p;u1x+=F6p;var b1x=z0v.C6p;b1x+=X7e;var G1x=z0v.R9U;G1x+=G6p;attachEl=identifier;if(!fieldNames){var W1x=z0v.C6p;W1x+=J2p;W1x+=J2p;W1x+=m6p;fieldNames=[$(identifier)[W1x](w7e)];}var back=$[G1x][b1x]?Z2W:t2W;identifier=$(identifier)[u1x](x7e)[back]()[S1x](H7e);}if(!identifier){var f1x=m7e;f1x+=a1p;identifier=f1x;}if(fieldNames && !$[s6W](fieldNames)){fieldNames=[fieldNames];}if(!fieldNames || fieldNames[K5p] === g9U){throw v7e;}var out=__dataSources[l1x][z1x][F1x](this,identifier);var fields=this[Y6p][e1x];var forceFields={};$[y8p](fieldNames,function(i,name){forceFields[name]=fields[name];});$[y8p](out,function(id,set){var o7e='cell';var q7e="toArray";var N7e="displayFi";var Q1x=N7e;Q1x+=i6W;var y1x=J2p;y1x+=B3p;set[y1x]=o7e;set[P5j]=attachEl?$(attachEl):__html_els(identifier,fieldNames)[q7e]();set[C0j]=fields;z0v.h0v();set[Q1x]=forceFields;});return out;},fields:function(identifier){var A7e="yl";var T1x=m6p;T1x+=z0v.M9U;T1x+=w0p;var t1x=z0v.R9U;t1x+=f1p;t1x+=Y6p;var out={};var self=__dataSources[g6j];if($[s6W](identifier)){for(var i=g9U,ien=identifier[K5p];i < ien;i++){var Z1x=n1p;Z1x+=z0v.C6p;Z1x+=s2p;Z1x+=s2p;var P1x=r9j;P1x+=q6p;P1x+=r4p;P1x+=Y6p;var res=self[P1x][Z1x](this,identifier[i]);out[identifier[i]]=res[identifier[i]];}return out;}var data={};var fields=this[Y6p][t1x];if(!identifier){var L1x=L9j;L1x+=A7e;L1x+=S9j;identifier=L1x;}$[y8p](fields,function(name,field){var Y7e="dataSrc";var s7e="valToData";var val=__html_get(identifier,field[Y7e]());field[s7e](data,val === w8p?undefined:val);});out[identifier]={idSrc:identifier,data:data,node:document,fields:fields,type:T1x};return out;},create:function(fields,data){z0v.F0v();if(data){var c1x=K3j;c1x+=u1j;var id=__dataSources[c1x][l0p][T8p](this,data);try{if(__html_id(id)[K5p]){__html_set(id,fields,data);}}catch(e){;}}},edit:function(identifier,fields,data){var h1x=n1p;h1x+=z0v.C6p;h1x+=s2p;z0v.F0v();h1x+=s2p;var id=__dataSources[g6j][l0p][h1x](this,data) || Z4e;__html_set(id,fields,data);},remove:function(identifier,fields){var M1x=k1j;M1x+=z0v.M9U;z0v.F0v();M1x+=D3W;__html_id(identifier)[M1x]();}};})();Editor[n1x]={"wrapper":E1x,"processing":{"indicator":W7e,"active":a1x},"header":{"wrapper":j1x,"content":G7e},"body":{"wrapper":b7e,"content":u7e},"footer":{"wrapper":h3j,"content":p1x},"form":{"wrapper":r1x,"content":O1x,"tag":z0v.g6p,"info":R1x,"error":U1x,"buttons":S7e,"button":f7e,"buttonInternal":I2x},"field":{"wrapper":V2x,"typePrefix":l7e,"namePrefix":z7e,"label":C2x,"input":D2x,"inputControl":F7e,"error":g2x,"msg-label":e7e,"msg-error":y7e,"msg-message":k2x,"msg-info":B2x,"multiValue":K2x,"multiInfo":i2x,"multiRestore":d2x,"multiNoEdit":Q7e,"disabled":J2x,"processing":X2x},"actions":{"create":P7e,"edit":Z7e,"remove":w2x},"inline":{"wrapper":t7e,"liner":x2x,"buttons":H2x},"bubble":{"wrapper":L7e,"liner":T7e,"table":m2x,"close":c7e,"pointer":v2x,"bg":N2x}};(function(){var g5e="editor";var K5e="select_single";var U7e="TableTools";var I5e="or_r";var D5e="8n";var b5e='buttons-create';var a5e="editSingle";var B5e="editor_edit";var j7e="veSing";var E7e="removeS";var f5e="formTitle";var k5e="formButtons";var P5e="cessing";var V5e="eate";var M7e="dSingl";var r7e="edSingl";var h5e='buttons-remove';var N5e="firm";var a7e="gle";var z5e='buttons-edit';var R7e="utt";var g4x=h7e;g4x+=t6p;g4x+=M7e;g4x+=q6p;var D4x=S4W;D4x+=n7e;var C4x=E7e;C4x+=T6p;C4x+=G6p;C4x+=a7e;var V4x=B4W;V4x+=j7e;V4x+=T1j;var I4x=p7e;I4x+=r7e;I4x+=q6p;var l3x=m6p;l3x+=l3e;var J3x=Y6p;J3x+=b1p;J3x+=q6p;J3x+=O7e;var R2x=z0v.D6p;R2x+=R7e;R2x+=O6p;if(DataTable[U7e]){var l2x=q6p;l2x+=Z6p;l2x+=t6p;l2x+=L6p;var f2x=q1W;f2x+=I5e;f2x+=o0W;f2x+=q6p;var b2x=S4W;b2x+=J2p;b2x+=g3p;b2x+=x6p;var q2x=S4W;q2x+=t6p;q2x+=G6p;q2x+=x6p;var o2x=s6p;o2x+=m6p;o2x+=u3p;o2x+=V5e;var ttButtons=DataTable[U7e][U5W];var ttButtonBase={sButtonText:w8p,editor:w8p,formTitle:w8p};ttButtons[o2x]=$[q2x](d5p,ttButtons[I2j],ttButtonBase,{formButtons:[{label:w8p,fn:function(e){z0v.h0v();this[J1j]();}}],fnClick:function(button,config){var C5e="reat";z0v.h0v();var G2x=J2p;G2x+=a5p;G2x+=q6p;var W2x=n1p;W2x+=W5p;W2x+=J2p;W2x+=q6p;var Y2x=n1p;Y2x+=C5e;Y2x+=q6p;var A2x=T6p;A2x+=B6p;A2x+=D5e;var editor=config[g5e];var i18nCreate=editor[A2x][Y2x];var buttons=config[k5e];if(!buttons[g9U][k0p]){var s2x=E1p;s2x+=z0v.D6p;s2x+=q6p;s2x+=s2p;buttons[g9U][s2x]=i18nCreate[J1j];}editor[W2x]({title:i18nCreate[G2x],buttons:buttons});}});ttButtons[B5e]=$[b2x](d5p,ttButtons[K5e],ttButtonBase,{formButtons:[{label:w8p,fn:function(e){var u2x=Q9W;u2x+=T6p;u2x+=J2p;this[u2x]();}}],fnClick:function(button,config){var i5e="fnGetSelectedIndexes";var selected=this[i5e]();if(selected[K5p] !== k9U){return;}var editor=config[g5e];var i18nEdit=editor[E1j][q1W];var buttons=config[k5e];if(!buttons[g9U][k0p]){var S2x=B6j;S2x+=b1p;buttons[g9U][S2x]=i18nEdit[J1j];}editor[q1W](selected[g9U],{title:i18nEdit[t8j],buttons:buttons});}});ttButtons[f2x]=$[l2x](d5p,ttButtons[p7e],ttButtonBase,{question:w8p,formButtons:[{label:w8p,fn:function(e){var that=this;this[J1j](function(json){var w5e="fnGe";var J5e="ectNon";var H5e="stance";var X5e="ataTab";var v5e="aTable";var m5e="TableToo";var x5e="In";var d5e="fnSel";var t2x=d5e;t2x+=J5e;t2x+=q6p;var Z2x=J2p;Z2x+=z0v.C6p;Z2x+=z0v.D6p;Z2x+=T1j;var P2x=Q6p;P2x+=X5e;P2x+=T1j;var Q2x=J2p;Q2x+=z0v.C6p;Q2x+=c5j;Q2x+=q6p;var y2x=w5e;y2x+=J2p;y2x+=x5e;y2x+=H5e;var e2x=m5e;e2x+=k2p;var F2x=x6p;F2x+=z0v.C6p;F2x+=J2p;F2x+=v5e;var z2x=z0v.R9U;z2x+=G6p;var tt=$[z2x][F2x][e2x][y2x]($(that[Y6p][Q2x])[P2x]()[Z2x]()[L6W]());tt[t2x]();});}}],fnClick:function(button,config){var o5e="ring";var A5e="Sel";var Y5e="ectedIndexes";var q5e="fnGet";var O2x=u6p;O2x+=J2p;O2x+=s2p;O2x+=q6p;var r2x=A7p;r2x+=P6j;r2x+=n1p;r2x+=q6p;var p2x=A7p;p2x+=w2p;p2x+=z0v.M9U;p2x+=D3W;var a2x=T1j;a2x+=G6p;a2x+=c1j;a2x+=p7p;var E2x=f7j;E2x+=N5e;var n2x=s2p;n2x+=q6p;n2x+=j1W;var M2x=Y4p;z0v.F0v();M2x+=o5e;var h2x=v0W;h2x+=q6p;var c2x=g4W;c2x+=D5e;var T2x=q1W;T2x+=z0v.M9U;T2x+=m6p;var L2x=q5e;L2x+=A5e;L2x+=Y5e;var rows=this[L2x]();if(rows[K5p] === g9U){return;}var editor=config[T2x];var i18nRemove=editor[c2x][h2x];var buttons=config[k5e];var question=typeof i18nRemove[K4W] === M2x?i18nRemove[K4W]:i18nRemove[K4W][rows[n2x]]?i18nRemove[E2x][rows[a2x]]:i18nRemove[K4W][O2p];if(!buttons[g9U][k0p]){var j2x=s2p;j2x+=z0v.C6p;j2x+=s5e;j2x+=s2p;buttons[g9U][j2x]=i18nRemove[J1j];}editor[p2x](rows,{message:question[r2x](/%d/g,rows[K5p]),title:i18nRemove[O2x],buttons:buttons});}});}var _buttons=DataTable[I2p][R2x];$[f0p](_buttons,{create:{text:function(dt,node,config){var G5e="tons.creat";var W5e="ton";var V3x=u2W;V3x+=W5e;var I3x=q6p;I3x+=x6p;I3x+=H6p;I3x+=m6p;z0v.h0v();var U2x=u2W;U2x+=G5e;U2x+=q6p;return dt[E1j](U2x,config[I3x][E1j][U9j][V3x]);},className:b5e,editor:w8p,formButtons:{text:function(editor){var C3x=T6p;C3x+=B6p;C3x+=z0v.O9U;C3x+=G6p;return editor[C3x][U9j][J1j];},action:function(e){var D3x=Y6p;D3x+=f0j;z0v.h0v();D3x+=T6p;D3x+=J2p;this[D3x]();}},formMessage:w8p,formTitle:w8p,action:function(e,dt,node,config){var S5e="formMessage";var d3x=n1p;d3x+=m6p;d3x+=V5e;var i3x=T6p;i3x+=m8j;i3x+=G6p;var K3x=T6p;K3x+=B6p;K3x+=D5e;var B3x=X4W;B3x+=V5e;var g3x=x8p;g3x+=b6W;g3x+=y2p;g3x+=g3p;var that=this;var editor=config[g5e];this[J8p](d5p);editor[k3W](g3x,function(){var u5e="essi";var k3x=y2p;k3x+=l6W;k3x+=u5e;k3x+=V5j;that[k3x](i5p);})[B3x]({buttons:config[k5e],message:config[S5e] || editor[K3x][U9j][i3p],title:config[f5e] || editor[i3x][d3x][t8j]});}},edit:{extend:J3x,text:function(dt,node,config){var l5e="s.edit";var w3x=z0v.D6p;w3x+=Q3W;var X3x=V2j;X3x+=l5e;return dt[E1j](X3x,config[g5e][E1j][q1W][w3x]);},className:z5e,editor:w8p,formButtons:{text:function(editor){var H3x=Y6p;H3x+=m2p;z0v.h0v();H3x+=U2p;var x3x=g4W;x3x+=D5e;return editor[x3x][q1W][H3x];},action:function(e){z0v.h0v();this[J1j]();}},formMessage:w8p,formTitle:w8p,action:function(e,dt,node,config){var Q5e="age";var y5e="formM";var e5e="sage";var Z5e='preOpen';var F5e="rmTi";var f3x=J2p;f3x+=l0j;f3x+=T1j;var S3x=T6p;S3x+=B6p;S3x+=z0v.O9U;S3x+=G6p;var u3x=X1p;u3x+=F5e;u3x+=k4W;u3x+=q6p;var b3x=v3p;b3x+=e5e;var G3x=q6p;G3x+=x6p;G3x+=T6p;G3x+=J2p;var W3x=y5e;W3x+=S9j;W3x+=Q5e;var Y3x=z0v.M9U;Y3x+=o9p;var A3x=v6p;A3x+=z0v.M9U;A3x+=P5e;var q3x=s2p;q3x+=C9j;q3x+=P7j;var o3x=T6p;o3x+=f3e;var N3x=n1p;N3x+=q6p;N3x+=C8W;N3x+=Y6p;var v3x=m6p;v3x+=z0v.M9U;v3x+=w0p;v3x+=Y6p;var m3x=c8j;m3x+=l0j;m3x+=L3p;var that=this;var editor=config[m3x];var rows=dt[v3x]({selected:d5p})[j3e]();var columns=dt[i4e]({selected:d5p})[j3e]();var cells=dt[N3x]({selected:d5p})[o3x]();var items=columns[q3x] || cells[K5p]?{rows:rows,columns:columns,cells:cells}:rows;this[A3x](d5p);editor[Y3x](Z5e,function(){var t5e="proces";var s3x=t5e;s3x+=Y6p;s3x+=M1p;that[s3x](i5p);})[q1W](items,{buttons:config[k5e],message:config[W3x] || editor[E1j][G3x][b3x],title:config[u3x] || editor[S3x][q1W][f3x]});}},remove:{extend:L5e,limitTo:[l3x],text:function(dt,node,config){var c5e="ons.remove";var P3x=z0v.D6p;P3x+=m2p;P3x+=T5e;P3x+=G6p;var Q3x=A7p;Q3x+=X4p;Q3x+=D3W;var y3x=T6p;y3x+=B6p;y3x+=z0v.O9U;y3x+=G6p;var e3x=c8j;e3x+=T6p;e3x+=V7p;var F3x=u4p;F3x+=J2p;F3x+=J2p;F3x+=c5e;var z3x=g4W;z0v.F0v();z3x+=z0v.O9U;z3x+=G6p;return dt[z3x](F3x,config[e3x][y3x][Q3x][P3x]);},className:h5e,editor:w8p,formButtons:{text:function(editor){var t3x=Y6p;t3x+=B4p;t3x+=K4p;t3x+=J2p;var Z3x=T6p;Z3x+=m8j;Z3x+=G6p;return editor[Z3x][s4j][t3x];},action:function(e){this[J1j]();}},formMessage:function(editor,dt){var M5e="strin";var n3x=r8j;n3x+=c1j;n3x+=p7p;var M3x=Z9p;M3x+=G6p;M3x+=N5e;var h3x=f7j;h3x+=r9j;h3x+=Z1p;var c3x=M5e;c3x+=m4p;var T3x=k1j;T3x+=B1j;var L3x=T6p;L3x+=B6p;L3x+=z0v.O9U;L3x+=G6p;z0v.h0v();var rows=dt[U3p]({selected:d5p})[j3e]();var i18n=editor[L3x][T3x];var question=typeof i18n[K4W] === c3x?i18n[h3x]:i18n[K4W][rows[K5p]]?i18n[K4W][rows[K5p]]:i18n[M3x][O2p];return question[T6j](/%d/g,rows[n3x]);},formTitle:w8p,action:function(e,dt,node,config){var n5e="Message";var E5e="dexe";var U3x=A7p;U3x+=d9p;var R3x=T6p;R3x+=B6p;R3x+=z0v.O9U;R3x+=G6p;var O3x=C8j;z0v.F0v();O3x+=w2p;O3x+=n5e;var r3x=T6p;r3x+=G6p;r3x+=E5e;r3x+=Y6p;var j3x=v6p;j3x+=q6p;j3x+=U6e;j3x+=G6p;var a3x=z0v.M9U;a3x+=G6p;a3x+=q6p;var E3x=q6p;E3x+=g1p;E3x+=J2p;E3x+=L3p;var that=this;var editor=config[E3x];this[J8p](d5p);editor[a3x](j3x,function(){var p3x=p2p;p3x+=P5e;z0v.F0v();that[p3x](i5p);})[s4j](dt[U3p]({selected:d5p})[r3x](),{buttons:config[k5e],message:config[O3x],title:config[f5e] || editor[R3x][U3x][t8j]});}}});_buttons[a5e]=$[f0p]({},_buttons[q1W]);z0v.h0v();_buttons[a5e][f0p]=I4x;_buttons[V4x]=$[f0p]({},_buttons[s4j]);_buttons[C4x][D4x]=g4x;})();Editor[k4x]={};Editor[j5e]=function(input,opts){var K0e="-seconds\"></d";var o0e="ct>";var u0e="onLe";var R5e="xO";var C8e='-title';var g8e=/[YMD]|L(?!T)|l/;var Q0e="Editor datetime: Without momentjs only the format 'YYYY-MM-DD' can be used";var p5e="_constr";var V0e="editor-d";var U0e='-minutes"></div>';var R0e='-time">';var C0e="atei";var W0e="utton>";var b0e="-ic";var O5e="inde";var w0e="v cl";var A0e="l\">";var B8e=/[Hhm]|LT|LTS/;var D0e="me-";var s0e="/b";var k8e="match";var k0e="endar";var G0e="previo";var M0e='<button>';var E0e='-iconRight">';var r0e='-month"></select>';var D8e='-error';var X0e="\"></";var r5e="uctor";var J8e="calendar";var h0e='-date">';var N0e="-year\"></sele";var m0e="div clas";var I0e="_ins";var V8e='-date';var K8e=/[haA]/;var Y0e="v class=\"";var j0e='<span></span>';var l0e="itle\">";var I8e='-error"></div>';var v0e="</di";var S0e="ft\">";var O0e='-calendar"></div>';var p0e='<select class="';var q0e="-la";var g0e="-cal";var a0e='-label">';var D7x=p5e;D7x+=r5e;var C7x=s2j;C7x+=q6p;C7x+=L6p;var V7x=u6p;V7x+=J2p;V7x+=s2p;V7x+=q6p;var I7x=z0v.C6p;I7x+=W5j;I7x+=G6p;I7x+=x6p;var U4x=x6p;U4x+=z0v.M9U;U4x+=w2p;var R4x=q6p;R4x+=m6p;R4x+=m6p;R4x+=L3p;var O4x=x0p;O4x+=y2p;O4x+=V2p;var r4x=x6p;r4x+=a4p;var p4x=x0p;p4x+=y2p;p4x+=q6p;p4x+=L6p;var j4x=Q2p;j4x+=q6p;var a4x=w2p;a4x+=R0j;a4x+=t3W;var E4x=O5e;E4x+=R5e;E4x+=z0v.R9U;var n4x=z0v.R9U;n4x+=i5W;n4x+=z0v.C6p;n4x+=J2p;var M4x=Y7p;M4x+=U5e;M4x+=p7p;var h4x=I0e;h4x+=W4j;h4x+=G6p;h4x+=N2p;var c4x=e6p;c4x+=y6p;var T4x=V0e;T4x+=C0e;T4x+=D0e;var L4x=z0v.R9U;L4x+=T6p;L4x+=L6p;var t4x=K1p;t4x+=J2p;t4x+=l6p;t4x+=q6p;var Z4x=g0e;Z4x+=k0e;var P4x=x6p;P4x+=a4p;var Q4x=F5p;Q4x+=x8j;Q4x+=t5p;var y4x=c5p;y4x+=X2W;y4x+=z5p;var e4x=F5p;e4x+=B0e;var F4x=K0e;F4x+=E5p;F4x+=f5p;var z4x=F5p;z4x+=g1p;z4x+=d6p;z4x+=i0e;var l4x=d0e;l4x+=J0e;l4x+=X0e;l4x+=H8j;var f4x=F5p;f4x+=g1p;f4x+=w0e;f4x+=x0e;var S4x=H0e;S4x+=H8j;var u4x=F5p;u4x+=m0e;u4x+=Y6p;u4x+=o8j;var b4x=v0e;b4x+=y5p;var G4x=N0e;G4x+=o0e;var W4x=q0e;W4x+=s5e;W4x+=A0e;var s4x=F5p;s4x+=g1p;s4x+=Y0e;var Y4x=F5p;Y4x+=s0e;Y4x+=Q3W;Y4x+=f5p;var A4x=G6p;A4x+=S4W;A4x+=J2p;var q4x=C2e;q4x+=W0e;var o4x=n5p;o4x+=t5p;var N4x=G0e;N4x+=e4p;var v4x=b0e;v4x+=u0e;v4x+=S0e;var m4x=v8j;m4x+=l9j;m4x+=D0p;var H4x=f0e;H4x+=l0e;var x4x=S5p;x4x+=f5p;var w4x=P4j;w4x+=P4p;w4x+=P3p;w4x+=o8j;var i4x=z0e;i4x+=q6p;i4x+=G6p;i4x+=J2p;var K4x=x6p;K4x+=a9p;K4x+=G0p;K4x+=Y6p;var B4x=e6p;B4x+=R7W;B4x+=T6p;B4x+=S6p;this[n1p]=$[f0p](d5p,{},Editor[B4x][K4x],opts);var classPrefix=this[n1p][F0e];var i18n=this[n1p][E1j];if(!window[i4x] && this[n1p][e0e] !== y0e){throw Q0e;}var timeBlock=function(type){z0v.h0v();var t0e='-timeblock">';var Z0e="v ";var J4x=H0e;J4x+=x6p;J4x+=t5p;var d4x=P0e;d4x+=Z0e;d4x+=n1p;d4x+=z5p;return d4x + classPrefix + t0e + J4x;};var gap=function(){var T0e="an>:</";var c0e="span>";var X4x=L0e;X4x+=T0e;X4x+=c0e;return X4x;};var structure=$(w4x + classPrefix + x4x + L0p + classPrefix + h0e + L0p + classPrefix + H4x + m4x + classPrefix + v4x + M0e + i18n[N4x] + n0e + o4x + L0p + classPrefix + E0e + q4x + i18n[A4x] + Y4x + p0p + L0p + classPrefix + a0e + j0e + p0e + classPrefix + r0e + p0p + s4x + classPrefix + W4x + j0e + p0e + classPrefix + G4x + b4x + p0p + u4x + classPrefix + O0e + S4x + L0p + classPrefix + R0e + f4x + classPrefix + l4x + L0p + classPrefix + U0e + z4x + classPrefix + F4x + e4x + y4x + classPrefix + I8e + Q4x);this[P4x]={container:structure,date:structure[E6W](b2W + classPrefix + V8e),title:structure[E6W](b2W + classPrefix + C8e),calendar:structure[E6W](b2W + classPrefix + Z4x),time:structure[E6W](b2W + classPrefix + t4x),error:structure[L4x](b2W + classPrefix + D8e),input:$(input)};this[Y6p]={d:w8p,display:w8p,minutesRange:w8p,secondsRange:w8p,namespace:T4x + Editor[c4x][h4x]++,parts:{date:this[n1p][e0e][M4x](g8e) !== w8p,time:this[n1p][n4x][k8e](B8e) !== w8p,seconds:this[n1p][e0e][E4x](z7p) !== -k9U,hours12:this[n1p][e0e][a4x](K8e) !== w8p}};this[o8p][U8p][k6j](this[o8p][j4x])[p4x](this[r4x][i8e])[O4x](this[o8p][R4x]);this[U4x][d8e][I7x](this[o8p][V7x])[C7x](this[o8p][J8e]);this[D7x]();};$[g7x](Editor[k7x][L8p],{destroy:function(){var x8e="taine";var w8e="-date";var X8e=".editor";var J7x=X8e;J7x+=w8e;J7x+=i8e;var d7x=T6p;d7x+=G6p;d7x+=G4e;d7x+=J2p;var i7x=x6p;i7x+=z0v.M9U;i7x+=w2p;var K7x=O5W;K7x+=y2p;K7x+=X5p;var B7x=f7j;B7x+=x8e;B7x+=m6p;this[z2j]();this[o8p][B7x][d4j]()[K7x]();this[i7x][d7x][d4j](J7x);},errorMsg:function(msg){z0v.h0v();var X7x=x6p;X7x+=z0v.M9U;X7x+=w2p;var error=this[X7x][z1W];if(msg){var w7x=p7p;w7x+=J2p;w7x+=u1j;error[w7x](msg);}else {var x7x=q6p;x7x+=M3W;x7x+=J2p;x7x+=W2p;error[x7x]();}},hide:function(){z0v.F0v();this[z2j]();},max:function(date){var H7x=w2p;H7x+=A0j;H7x+=e6p;H7x+=q6p;this[n1p][H7x]=date;this[H8e]();this[m8e]();},min:function(date){var N8e="lan";var m7x=v8e;m7x+=q5j;m7x+=N8e;m7x+=L8j;this[n1p][o8e]=date;z0v.F0v();this[H8e]();this[m7x]();},owns:function(node){var q8e="lter";var v7x=r9j;z0v.F0v();v7x+=q8e;return $(node)[L2W]()[v7x](this[o8p][U8p])[K5p] > g9U;},val:function(set,write){var Z8e="_date";var Y8e="etT";var f8e="utc";var S8e="Val";var W8e="toStri";var e8e=/(\d{4})\-(\d{2})\-(\d{2})/;var A8e="_s";var t8e="Ut";var F8e="mat";var G8e="ToU";var b8e='--now';var S7x=A8e;S7x+=Y8e;S7x+=s8e;var u7x=x6p;u7x+=a8p;u7x+=N8p;u7x+=M2p;var b7x=W8e;b7x+=V5j;if(set === undefined){return this[Y6p][x6p];}if(set instanceof Date){var N7x=A1W;N7x+=q6p;N7x+=G8e;N7x+=U5e;this[Y6p][x6p]=this[N7x](set);}else if(set === w8p || set === l7p){this[Y6p][x6p]=w8p;}else if(set === b8e){this[Y6p][x6p]=new Date();}else if(typeof set === Z6j){if(window[u8e]){var A7x=J2p;A7x+=z0v.M9U;A7x+=Q6p;A7x+=b6p;var q7x=T6p;q7x+=Y6p;q7x+=S8e;q7x+=l0p;var o7x=z0e;o7x+=q6p;o7x+=G6p;o7x+=J2p;var m=window[o7x][f8e](set,this[n1p][e0e],this[n1p][l8e],this[n1p][z8e]);this[Y6p][x6p]=m[q7x]()?m[A7x]():w8p;}else {var Y7x=F8e;Y7x+=t3W;var match=set[Y7x](e8e);this[Y6p][x6p]=match?new Date(Date[y8e](match[k9U],match[B9U] - k9U,match[K9U])):w8p;}}if(write || write === undefined){if(this[Y6p][x6p]){var s7x=Q8e;s7x+=U5p;s7x+=G4e;s7x+=J2p;this[s7x]();}else {var W7x=d6p;W7x+=Q0j;this[o8p][P8e][W7x](set);}}if(!this[Y6p][x6p]){var G7x=Z8e;G7x+=N4j;G7x+=t8e;G7x+=n1p;this[Y6p][x6p]=this[G7x](new Date());}this[Y6p][O9p]=new Date(this[Y6p][x6p][b7x]());this[Y6p][u7x][L8e](k9U);this[T8e]();this[m8e]();this[S7x]();},_constructor:function(){var h9e="_wri";var p8e="dre";var c8e="att";var R8e='autocomplete';var P9e="_setTime";var b9e="_se";var U8e='focus.editor-datetime click.editor-datetime';var k9e='keyup.editor-datetime';var Z9e="_writeOutput";var r8e='-seconds';var i9e='select';var u9e="tle";var h5x=U0j;h5x+=n1p;h5x+=M1j;var c5x=z0v.M9U;c5x+=G6p;var x5x=Z9p;x5x+=t9p;x5x+=R5p;x5x+=J6p;var K5x=z0v.M9U;K5x+=G6p;var R7x=z0v.M9U;R7x+=G6p;var O7x=z0v.M9U;O7x+=z0v.R9U;O7x+=z0v.R9U;var r7x=c8e;r7x+=m6p;var p7x=l9p;p7x+=w2p;var c7x=J4j;c7x+=n1p;c7x+=h8e;var L7x=J2p;L7x+=T6p;L7x+=S6p;z0v.F0v();var Z7x=V1j;Z7x+=t6p;var f7x=M8e;f7x+=q7W;f7x+=n8e;var that=this;var classPrefix=this[n1p][f7x];var onChange=function(){var a8e="nCha";var P7x=T6p;P7x+=E8e;var Q7x=x6p;Q7x+=z0v.M9U;Q7x+=w2p;var y7x=d6p;y7x+=Q0j;var e7x=L9p;e7x+=J2p;var F7x=x6p;F7x+=a4p;var z7x=n1p;z7x+=z0v.C6p;z7x+=s2p;z7x+=s2p;var l7x=z0v.M9U;z0v.F0v();l7x+=a8e;l7x+=G6p;l7x+=H4p;that[n1p][l7x][z7x](that,that[F7x][e7x][y7x](),that[Y6p][x6p],that[Q7x][P7x]);};if(!this[Y6p][j8e][Z7x]){var t7x=x6p;t7x+=R0j;t7x+=q6p;this[o8p][t7x][K9p](f6j,C6j);}if(!this[Y6p][j8e][L7x]){var T7x=x6p;T7x+=z0v.M9U;T7x+=w2p;this[T7x][i8e][K9p](f6j,C6j);}if(!this[Y6p][j8e][c7x]){var j7x=n1p;j7x+=K8j;var a7x=x6p;a7x+=z0v.M9U;a7x+=w2p;var E7x=x6p;E7x+=T6p;E7x+=d6p;E7x+=K6p;var n7x=o4j;n7x+=p8e;n7x+=G6p;var M7x=u6p;M7x+=w2p;M7x+=q6p;var h7x=x6p;h7x+=z0v.M9U;h7x+=w2p;this[h7x][M7x][n7x](E7x + classPrefix + r8e)[s4j]();this[a7x][i8e][j7x](O8e)[Q8j](k9U)[s4j]();}this[H8e]();this[p7x][P8e][r7x](R8e,O7x)[R7x](U8e,function(){var C9e="visi";var g9e=':disabled';var I9e="sho";var B5x=O2p;B5x+=I9e;B5x+=w0p;var k5x=l9p;k5x+=w2p;var g5x=V9e;g5x+=U5p;var D5x=x6p;D5x+=z0v.M9U;D5x+=w2p;var C5x=J2e;C5x+=C9e;C5x+=z0v.D6p;C5x+=T1j;var V5x=T6p;V5x+=Y6p;var I5x=Z9p;I5x+=G6p;I5x+=D9e;var U7x=x6p;U7x+=z0v.M9U;U7x+=w2p;if(that[U7x][I5x][V5x](C5x) || that[D5x][g5x][a8p](g9e)){return;}that[H1p](that[k5x][P8e][H1p](),i5p);that[B5x]();})[K5x](k9e,function(){var B9e=':visible';var d5x=P9p;d5x+=J6p;var i5x=x6p;i5x+=z0v.M9U;z0v.F0v();i5x+=w2p;if(that[i5x][d5x][a8p](B9e)){var w5x=d6p;w5x+=z0v.C6p;w5x+=s2p;var X5x=V9e;X5x+=U5p;var J5x=x6p;J5x+=a4p;that[H1p](that[J5x][X5x][w5x](),i5p);}});this[o8p][x5x][W8p](K9e,i9e,function(){var e9e="our";var l9e='-ampm';var x9e="-hou";var G9e="_setCalan";var X9e="focu";var S9e="setUTCFul";var J9e="ition";var v9e="sClass";var M9e="teOu";var Y9e="ala";var t9e='-minutes';var H9e="hasC";var s9e="nder";var q9e="sClas";var W9e="_correctMonth";var F9e="ampm";var w9e="-s";z0v.F0v();var n9e="setSeconds";var f9e="lYear";var y9e="ain";var c9e="etUTCMinutes";var N9e="-m";var L9e="tp";var A9e="setC";var d9e="_pos";var T5x=d9e;T5x+=J9e;var L5x=X9e;L5x+=Y6p;var Z5x=w9e;Z5x+=q6p;Z5x+=f7j;Z5x+=r5j;var P5x=Q9p;P5x+=z0v.C6p;P5x+=a1p;var b5x=m9p;b5x+=v9p;b5x+=f9p;var G5x=x9e;G5x+=h3p;var W5x=H9e;W5x+=f9p;var q5x=K1p;q5x+=m9e;var o5x=m9p;o5x+=v9e;var v5x=N9e;v5x+=o9e;v5x+=p7p;var m5x=m9p;m5x+=q9e;m5x+=Y6p;var H5x=d6p;H5x+=z0v.C6p;H5x+=s2p;var select=$(this);var val=select[H5x]();if(select[m5x](classPrefix + v5x)){var N5x=O2p;N5x+=A9e;N5x+=Y9e;N5x+=s9e;that[W9e](that[Y6p][O9p],val);that[T8e]();that[N5x]();}else if(select[o5x](classPrefix + q5x)){var s5x=G9e;s5x+=L8j;var Y5x=b9e;Y5x+=J2p;Y5x+=k7p;Y5x+=u9e;var A5x=S9e;A5x+=f9e;that[Y6p][O9p][A5x](val);that[Y5x]();that[s5x]();}else if(select[W5x](classPrefix + G5x) || select[b5x](classPrefix + l9e)){if(that[Y6p][j8e][z9e]){var F5x=K1p;F5x+=F9e;var z5x=r9j;z5x+=G6p;z5x+=x6p;var l5x=x6p;l5x+=z0v.M9U;l5x+=w2p;var f5x=d0e;f5x+=e9e;f5x+=Y6p;var S5x=r9j;S5x+=L6p;var u5x=Z9p;u5x+=g9p;u5x+=y9e;u5x+=J6p;var hours=$(that[o8p][u5x])[S5x](b2W + classPrefix + f5x)[H1p]() * k9U;var pm=$(that[l5x][U8p])[z5x](b2W + classPrefix + F5x)[H1p]() === v3e;that[Y6p][x6p][Q9e](hours === H9U && !pm?g9U:pm && hours !== H9U?hours + H9U:hours);}else {that[Y6p][x6p][Q9e](val);}that[P9e]();that[Z9e](d5p);onChange();}else if(select[l8p](classPrefix + t9e)){var Q5x=Q8e;Q5x+=m2p;Q5x+=L9e;Q5x+=U5p;var y5x=v8e;y5x+=T9e;var e5x=Y6p;e5x+=c9e;that[Y6p][x6p][e5x](val);that[y5x]();that[Q5x](d5p);onChange();}else if(select[P5x](classPrefix + Z5x)){var t5x=h9e;t5x+=M9e;t5x+=L9e;t5x+=U5p;that[Y6p][x6p][n9e](val);that[P9e]();that[t5x](d5p);onChange();}that[o8p][P8e][L5x]();that[T5x]();})[c5x](h5x,function(e){var C6D="-i";var g6D="asC";var t6D="TCDate";var R9e="toLowerCase";var A6D="seco";var D6D="conLeft";var r9e="paren";var l6D="getUTCHours";var K6D="_setCa";var B6D='range';var s6D="hasClas";var Y6D="inute";var X6D="CMon";var d6D="_setTi";var F6D='setSeconds';var T6D='year';var O9e="tN";var p9e="Case";var E9e="Pro";var c6D="tCa";var P6D="etUTCFu";var j9e="toLower";var m6D="_correctMo";var z6D='setUTCMinutes';var S6D="secondsRange";var h6D="land";var H6D="_setCala";var b6D="inutesRange";var I6D="Right";var e6D="Out";var W6D="setT";var i6D="lander";var U9e="-icon";var a9e="pagation";var V6D="asCl";var r5x=u4p;r5x+=T5e;r5x+=G6p;var p5x=Y6p;p5x+=a7j;p5x+=E9e;p5x+=a9e;var j5x=h7e;j5x+=J2p;var a5x=j9e;a5x+=p9e;var E5x=r9e;E5x+=O9e;E5x+=s5p;E5x+=q6p;var n5x=W4j;n5x+=f3p;n5x+=q6p;n5x+=J2p;var M5x=J2p;M5x+=M6W;M5x+=H4p;M5x+=J2p;var d=that[Y6p][x6p];var nodeName=e[M5x][n3e][R9e]();var target=nodeName === O8e?e[n5x][E5x]:e[s3j];nodeName=target[n3e][a5x]();if(nodeName === j5x){return;}e[p5x]();if(nodeName === r5x){var A0x=F9p;A0x+=P7j;var q0x=f0e;q0x+=s8e;var o0x=r9e;o0x+=F6p;var w0x=U9e;w0x+=I6D;var X0x=p7p;X0x+=V6D;X0x+=l9j;X0x+=Y6p;var V0x=C6D;V0x+=D6D;var U5x=p7p;U5x+=g6D;U5x+=f9p;var R5x=v8p;R5x+=k6D;var O5x=r9e;O5x+=J2p;var button=$(target);var parent=button[O5x]();if(parent[l8p](R5x) && !parent[U5x](B6D)){var I0x=z0v.D6p;I0x+=F4W;I0x+=m6p;button[I0x]();return;}if(parent[l8p](classPrefix + V0x)){var J0x=m3W;J0x+=e4p;var d0x=V9e;d0x+=m2p;d0x+=J2p;var i0x=x6p;i0x+=z0v.M9U;i0x+=w2p;var K0x=K6D;K0x+=i6D;var B0x=d6D;B0x+=u9e;var k0x=m4p;k0x+=J6D;k0x+=X6D;k0x+=P7j;var g0x=x6p;g0x+=C9p;g0x+=E1p;g0x+=W2p;var D0x=U6j;D0x+=w6D;D0x+=z0v.M9U;D0x+=x6D;var C0x=x6p;C0x+=T6p;C0x+=o4p;C0x+=M2p;that[Y6p][C0x][D0x](that[Y6p][g0x][k0x]() - k9U);that[B0x]();that[K0x]();that[i0x][d0x][J0x]();}else if(parent[X0x](classPrefix + w0x)){var N0x=z0v.R9U;N0x+=k2W;N0x+=m2p;N0x+=Y6p;var v0x=V9e;v0x+=U5p;var m0x=H6D;m0x+=L6p;m0x+=J6p;var H0x=g1p;H0x+=w0W;var x0x=m6D;x0x+=x6D;that[x0x](that[Y6p][O9p],that[Y6p][H0x][v6D]() + k9U);that[T8e]();that[m0x]();that[o8p][v0x][N0x]();}else if(button[o0x](b2W + classPrefix + q0x)[A0x]){var e0x=w2p;e0x+=N6D;var F0x=o6D;F0x+=H2p;F0x+=q6D;F0x+=J0e;var z0x=p7p;z0x+=z0v.M9U;z0x+=K8W;z0x+=Y6p;var l0x=A6D;l0x+=G6p;l0x+=x6p;l0x+=Y6p;var W0x=w2p;W0x+=Y6D;W0x+=Y6p;var s0x=m2p;s0x+=G6p;s0x+=l0j;var Y0x=Q2p;Y0x+=z0v.C6p;var val=button[Y0x](f4W);var unit=button[Q0p](s0x);if(unit === W0x){var u0x=m6p;u0x+=z0v.C6p;u0x+=G6p;u0x+=H4p;var b0x=s6D;b0x+=Y6p;var G0x=x1W;G0x+=x6p;if(parent[l8p](G0x) && parent[b0x](u0x)){var S0x=O2p;S0x+=W6D;S0x+=s8e;that[Y6p][G6D]=val;that[S0x]();return;}else {var f0x=w2p;f0x+=b6D;that[Y6p][f0x]=w8p;}}if(unit === l0x){if(parent[l8p](u6D) && parent[l8p](B6D)){that[Y6p][S6D]=val;that[P9e]();return;}else {that[Y6p][S6D]=w8p;}}if(val === f6D){if(d[l6D]() >= H9U){val=d[l6D]() - H9U;}else {return;}}else if(val === v3e){if(d[l6D]() < H9U){val=d[l6D]() + H9U;}else {return;}}var set=unit === z0x?F0x:unit === e0x?z6D:F6D;d[set](val);that[P9e]();that[Z9e](d5p);onChange();}else {var c0x=J2p;c0x+=T6p;c0x+=S6p;var T0x=h9e;T0x+=t6p;T0x+=e6D;T0x+=y6D;var L0x=V1j;L0x+=W2p;var t0x=w2p;t0x+=o9e;t0x+=p7p;var Z0x=x6p;Z0x+=W4e;var P0x=J4j;P0x+=J2p;P0x+=w6D;P0x+=Q6D;var Q0x=Y6p;Q0x+=P6D;Q0x+=C8W;Q0x+=Z6D;var y0x=o6D;y0x+=t6D;if(!d){d=that[L6D](new Date());}d[y0x](k9U);d[Q0x](button[Q0p](T6D));d[P0x](button[Z0x](t0x));d[L8e](button[Q0p](L0x));that[T0x](d5p);if(!that[Y6p][j8e][c0x]){setTimeout(function(){var h0x=O2p;h0x+=T1W;that[h0x]();},w9U);}else {var M0x=b9e;M0x+=c6D;M0x+=h6D;M0x+=J6p;that[M0x]();}onChange();}}else {var n0x=X1p;n0x+=n1p;n0x+=m2p;n0x+=Y6p;that[o8p][P8e][n0x]();}});},_compareDates:function(a,b){var E6D="_dateToUtcString";var M6D="_dateToU";var n6D="tcStrin";var E0x=M6D;E0x+=n6D;z0v.F0v();E0x+=m4p;return this[E0x](a) === this[E6D](b);},_correctMonth:function(date,month){var p6D="_days";var a6D="UT";var R6D="setUTCMonth";var r6D="nMonth";var j0x=n6W;j0x+=a6D;j0x+=R8p;j0x+=j6D;var a0x=p6D;a0x+=U3W;a0x+=r6D;var days=this[a0x](date[O6D](),month);var correctDays=date[j0x]() > days;date[R6D](month);if(correctDays){var p0x=U6j;p0x+=y8e;p0x+=i2p;p0x+=Q6D;date[L8e](days);date[p0x](month);}},_daysInMonth:function(year,month){z0v.F0v();var G9U=29;var W9U=28;var u9U=31;var b9U=30;var isLeap=year % i9U === g9U && (year % e9U !== g9U || year % Q9U === g9U);var months=[u9U,isLeap?G9U:W9U,u9U,b9U,u9U,b9U,u9U,u9U,b9U,u9U,b9U,u9U];return months[month];},_dateToUtc:function(s){var U6D="getM";var k1D="getSeconds";var I1D="nutes";var C1D="tMo";var V1D="getHou";var U0x=U6D;U0x+=T6p;U0x+=I1D;var R0x=V1D;R0x+=h3p;var O0x=m4p;O0x+=q6p;O0x+=C1D;O0x+=x6D;var r0x=D1D;r0x+=C8W;r0x+=Z6D;return new Date(Date[y8e](s[r0x](),s[O0x](),s[g1D](),s[R0x](),s[U0x](),s[k1D]()));},_dateToUtcString:function(d){var K1D="Full";var C8x=m4p;C8x+=v4p;C8x+=y8e;C8x+=j6D;var V8x=p0j;V8x+=p5j;var I8x=m4p;I8x+=B1D;I8x+=K1D;I8x+=Z6D;return d[I8x]() + Y3W + this[V8x](d[v6D]() + k9U) + Y3W + this[i1D](d[C8x]());},_hide:function(){var J1D="l.";var X1D="scro";var d1D="scrol";var w1D="ll.";var J8x=P4p;J8x+=T6p;J8x+=b1j;J8x+=K6p;var d8x=d1D;d8x+=J1D;var i8x=X1D;i8x+=w1D;var K8x=z0v.M9U;K8x+=z0v.R9U;K8x+=z0v.R9U;var B8x=x6p;B8x+=v4p;B8x+=Z3W;var k8x=Z9p;k8x+=G6p;k8x+=D9e;var g8x=x6p;g8x+=z0v.M9U;g8x+=w2p;var D8x=F0p;D8x+=F4p;D8x+=j7p;D8x+=q6p;var namespace=this[Y6p][D8x];this[g8x][k8x][B8x]();$(window)[K8x](b2W + namespace);$(document)[d4j](x1D + namespace);$(H1D)[d4j](i8x + namespace);$(U3j)[d4j](d8x + namespace);$(B9p)[d4j](J8x + namespace);},_hours24To12:function(val){return val === g9U?H9U:val > H9U?val - H9U:val;},_htmlDay:function(day){var z1D='-day" type="button" ';var s1D="<td class=\"emp";var F1D='" data-month="';var e1D="month";var N1D="-b";var l1D="day";var u1D='now';var Y1D="tabl";var q1D="on ";var P1D='</td>';var A1D="joi";var v1D="a-year";var f1D='<td data-day="';var y1D='" data-day="';var b1D="today";var G1D="td>";var W1D="ty\"></";var W8x=F5p;W8x+=b5p;W8x+=m1D;W8x+=f5p;var s8x=x6p;s8x+=z0v.C6p;s8x+=W2p;var Y8x=V1j;Y8x+=J2p;Y8x+=v1D;Y8x+=o8j;var A8x=N1D;A8x+=m2p;A8x+=v9W;A8x+=q7p;var q8x=o1D;q8x+=q1D;q8x+=O5p;q8x+=S5p;var o8x=S5p;o8x+=f5p;var N8x=A1D;N8x+=G6p;var v8x=C0p;v8x+=Y6p;v8x+=o8j;var w8x=h7e;w8x+=Y1D;w8x+=q6p;if(day[G9j]){var X8x=s1D;X8x+=W1D;X8x+=G1D;return X8x;}var classes=[w8x];var classPrefix=this[n1p][F0e];if(day[I9p]){var x8x=y2p;x8x+=X2e;classes[x8x](u6D);}if(day[b1D]){var H8x=G4e;H8x+=Y6p;H8x+=p7p;classes[H8x](u1D);}if(day[S1D]){var m8x=J4j;m8x+=T1j;m8x+=O7e;classes[X0j](m8x);}return f1D + day[l1D] + v8x + classes[N8x](T0p) + o8x + q8x + classPrefix + A8x + classPrefix + z1D + Y8x + day[m9e] + F1D + day[e1D] + y1D + day[l1D] + M0p + Q1D + day[s8x] + W8x + n0e + P1D;},_htmlMonth:function(year,month){var x2D="ekNum";var p1D="TC";var q2D=" week";var r1D="_daysInMonth";var H2D="ber";var M1D="ek";var w2D="showWe";var N2D='</tr>';var n1D="Number";var q9U=23;var t1D="e>";var d2D="_compareDates";var v2D="_htmlWeekOfYear";var R1D="firstDay";var T1D="<th";var m2D="shi";var K2D="getUTC";var s2D='-iconLeft';var b2D="_htmlMonthHead";var J2D="disableDays";var V2D="ec";var A2D="Nu";var S2D='</tbody>';var i2D="pareDates";var E1D="lassPrefix";var D2D="econ";var O1D="getUTCDay";var L1D="head>";var W2D='-iconRight';var I2D="setS";var h1D="howWe";var C2D="TCMinute";var g2D="setUTCMinutes";var c1D="ad>";var B2D="Day";var Y2D="mber";var g9x=Z1D;g9x+=z0v.C6p;g9x+=c5j;g9x+=t1D;var D9x=H0e;D9x+=J2p;D9x+=L1D;var C9x=T1D;C9x+=q6p;C9x+=c1D;var h8x=Y6p;h8x+=h1D;h8x+=M1D;h8x+=n1D;var c8x=n1p;c8x+=E1D;var b8x=z0v.R9U;b8x+=a1D;b8x+=j1D;b8x+=M2p;var G8x=e2p;G8x+=p1D;var now=this[L6D](new Date()),days=this[r1D](year,month),before=new Date(Date[G8x](year,month,k9U))[O1D](),data=[],row=[];if(this[n1p][b8x] > g9U){before-=this[n1p][R1D];if(before < g9U){before+=J9U;}}var cells=days + before,after=cells;while(after > J9U){after-=J9U;}cells+=J9U - after;var minDate=this[n1p][o8e];var maxDate=this[n1p][U1D];if(minDate){var S8x=I2D;S8x+=V2D;S8x+=h8e;var u8x=o6D;u8x+=C2D;u8x+=Y6p;minDate[Q9e](g9U);minDate[u8x](g9U);minDate[S8x](g9U);}if(maxDate){var l8x=I2D;l8x+=D2D;l8x+=x6p;l8x+=Y6p;var f8x=Y6p;f8x+=J6D;f8x+=q6D;f8x+=J0e;maxDate[f8x](q9U);maxDate[g2D](z9U);maxDate[l8x](z9U);}for(var i=g9U,r=g9U;i < cells;i++){var P8x=k2D;P8x+=J2p;P8x+=u1j;P8x+=B2D;var Q8x=y2p;Q8x+=X2e;var y8x=Q8p;y8x+=b0W;var e8x=K2D;e8x+=Q6p;e8x+=M2p;var F8x=R5p;F8x+=A9j;F8x+=Y9j;var z8x=I8j;z8x+=a4p;z8x+=i2D;var day=new Date(Date[y8e](year,month,k9U + (i - before))),selected=this[Y6p][x6p]?this[d2D](day,this[Y6p][x6p]):i5p,today=this[z8x](day,now),empty=i < before || i >= days + before,disabled=minDate && day < minDate || maxDate && day > maxDate;var disableDays=this[n1p][J2D];if($[s6W](disableDays) && $[F8x](day[e8x](),disableDays) !== -k9U){disabled=d5p;}else if(typeof disableDays === y8x && disableDays(day) === d5p){disabled=d5p;}var dayConfig={day:k9U + (i - before),month:month,year:year,selected:selected,today:today,disabled:disabled,empty:empty};row[Q8x](this[P8x](dayConfig));if(++r === J9U){var T8x=X2D;T8x+=D2e;var L8x=y2p;L8x+=m2p;L8x+=Y6p;L8x+=p7p;var Z8x=w2D;Z8x+=x2D;Z8x+=H2D;if(this[n1p][Z8x]){var t8x=k4j;t8x+=m2D;t8x+=x0j;row[t8x](this[v2D](i - before,month,year));}data[L8x](T8x + row[s3W](l7p) + N2D);row=[];r=g9U;}}var classPrefix=this[n1p][c8x];var className=classPrefix + o2D;if(this[n1p][h8x]){var M8x=q2D;M8x+=A2D;M8x+=Y2D;className+=M8x;}if(minDate){var p8x=G6p;p8x+=k3W;var j8x=x6p;j8x+=T6p;j8x+=F4p;j8x+=e7j;var a8x=r9j;a8x+=L6p;var E8x=u6p;E8x+=J2p;E8x+=s2p;E8x+=q6p;var n8x=x6p;n8x+=z0v.M9U;n8x+=w2p;var underMin=minDate >= new Date(Date[y8e](year,month,k9U,g9U,g9U,g9U));this[n8x][E8x][a8x](f2W + classPrefix + s2D)[K9p](j8x,underMin?p8x:l6j);}if(maxDate){var V9x=G6p;V9x+=k3W;var I9x=v8p;I9x+=N8p;I9x+=z0v.C6p;I9x+=W2p;var U8x=n1p;U8x+=a1p;var R8x=r9j;R8x+=G6p;R8x+=x6p;var O8x=x6p;O8x+=z0v.M9U;O8x+=w2p;var r8x=e2p;r8x+=H2p;r8x+=R8p;var overMax=maxDate < new Date(Date[r8x](year,month + k9U,k9U,g9U,g9U,g9U));this[O8x][t8j][R8x](f2W + classPrefix + W2D)[U8x](I9x,overMax?V9x:l6j);}return G2D + className + M0p + C9x + this[b2D]() + D9x + u2D + data[s3W](l7p) + S2D + g9x;},_htmlMonthHead:function(){var Q2D='</th>';z0v.F0v();var e2D="h></";var f2D="fir";var F2D="showWeekNumber";var l2D="stDay";var y2D="th>";var k9x=f2D;k9x+=l2D;var a=[];var firstDay=this[n1p][k9x];var i18n=this[n1p][E1j];var dayName=function(day){var z2D="weekdays";z0v.F0v();day+=firstDay;while(day >= J9U){day-=J9U;}return i18n[z2D][day];};if(this[n1p][F2D]){var B9x=X2D;B9x+=e2D;B9x+=y2D;a[X0j](B9x);}for(var i=g9U;i < J9U;i++){var K9x=F5p;K9x+=J2p;K9x+=p7p;K9x+=f5p;a[X0j](K9x + dayName(i) + Q2D);}return a[s3W](l7p);},_htmlWeekOfYear:function(d,m,y){var c9U=86400000;var L2D='-week">';var t2D="setDate";var P2D="<td";z0v.F0v();var Z2D="eil";var X9x=Z1D;X9x+=x6p;X9x+=f5p;var J9x=P2D;J9x+=i0e;var d9x=n1p;d9x+=Z2D;var i9x=m4p;i9x+=q6p;i9x+=j1D;i9x+=M2p;var date=new Date(y,m,d,g9U,g9U,g9U,g9U);date[t2D](date[g1D]() + i9U - (date[i9x]() || J9U));var oneJan=new Date(y,g9U,k9U);var weekNum=Math[d9x](((date - oneJan) / c9U + k9U) / J9U);return J9x + this[n1p][F0e] + L2D + weekNum + X9x;},_options:function(selector,values,labels){var n2D="ion>";var j2D="lue=\"";var a2D="on va";var T2D="pty";var E2D="<opt";var h2D="</o";var H9x=s2p;H9x+=q6p;H9x+=V5j;H9x+=P7j;var x9x=q6p;x9x+=w2p;x9x+=T2D;var w9x=x6p;w9x+=a4p;if(!labels){labels=values;}var select=this[w9x][U8p][E6W](c2D + this[n1p][F0e] + Y3W + selector);select[x9x]();z0v.F0v();for(var i=g9U,ien=values[H9x];i < ien;i++){var v9x=h2D;v9x+=M2D;v9x+=n2D;var m9x=E2D;m9x+=T6p;m9x+=a2D;m9x+=j2D;select[k6j](m9x + values[i] + M0p + labels[i] + v9x);}},_optionSet:function(selector,val){var I3D="unknown";var r2D="childre";var p2D="tion:";var O2D="Prefix";var U2D="iner";var u9x=T6p;u9x+=m8j;u9x+=G6p;var b9x=F9p;b9x+=P7j;var G9x=p7p;G9x+=J2p;G9x+=w2p;G9x+=s2p;var W9x=f8p;W9x+=p2D;W9x+=S1D;var s9x=d6p;s9x+=z0v.C6p;s9x+=s2p;var Y9x=r2D;Y9x+=G6p;var A9x=M8e;A9x+=O2D;var q9x=z0v.R9U;q9x+=R2D;var o9x=Z9p;o9x+=g9p;o9x+=z0v.C6p;o9x+=U2D;var N9x=x6p;N9x+=z0v.M9U;N9x+=w2p;var select=this[N9x][o9x][q9x](c2D + this[n1p][A9x] + Y3W + selector);var span=select[N1j]()[Y9x](O8e);select[s9x](val);var selected=select[E6W](W9x);span[G9x](selected[b9x] !== g9U?selected[I2j]():this[n1p][u9x][I3D]);},_optionsTime:function(unit,count,val,allowed,range){var Y3D="/tr";var o3D='<tr>';var G3D="floor";var S3D='</table>';var W3D='-nospace"><tbody>';var D3D="ssPre";var A3D="</tr";var b3D='<thead><tr><th colspan="';var q3D="amPm";var N3D="mP";var C3D="body>";var s3D='</tbody></thead><table class="';var V3D="/t";var g3D="classP";var u3D='</th></tr></thead>';var d9U=6;var R9x=F5p;R9x+=V3D;R9x+=C3D;var O9x=S5p;O9x+=f5p;var e9x=T6p;e9x+=B6p;e9x+=z0v.O9U;e9x+=G6p;var F9x=s9p;F9x+=D3D;F9x+=X0p;var z9x=O2p;z9x+=y2p;z9x+=p5j;var l9x=z0v.R9U;l9x+=T6p;l9x+=G6p;l9x+=x6p;var f9x=x6p;f9x+=z0v.M9U;f9x+=w2p;var S9x=g3D;S9x+=m6p;S9x+=n8e;var classPrefix=this[n1p][S9x];var container=this[f9x][U8p][l9x](f2W + classPrefix + Y3W + unit);var i,j;var render=count === H9U?function(i){z0v.F0v();return i;}:this[z9x];var classPrefix=this[n1p][F9x];var className=classPrefix + o2D;var i18n=this[n1p][e9x];if(!container[K5p]){return;}var a=l7p;var span=w9U;var button=function(value,label,className){var k3D="/td>";var J3D=" data-u";var B3D="<s";var i3D="-day\" type=\"b";var x3D=' disabled';var m3D='-button ';var d3D="utton\"";var K3D="pan>";var v3D='" data-value="';var H3D='<td class="selectable ';var w3D="<button cl";var X3D="nit=\"";var t9x=F5p;t9x+=k3D;var Z9x=B3D;Z9x+=K3D;var P9x=i3D;P9x+=d3D;P9x+=J3D;z0v.h0v();P9x+=X3D;var Q9x=w3D;Q9x+=x0e;var y9x=S5p;y9x+=f5p;if(count === H9U && val >= H9U && typeof value === J6W){value+=H9U;}var selected=val === value || value === f6D && val < H9U || value === v3e && val >= H9U?L5e:l7p;if(allowed && $[b6j](value,allowed) === -k9U){selected+=x3D;}if(className){selected+=T0p + className;}return H3D + selected + y9x + Q9x + classPrefix + m3D + classPrefix + P9x + unit + v3D + value + M0p + Z9x + label + D8p + n0e + t9x;};if(count === H9U){var M9x=F5p;M9x+=e5p;M9x+=J2p;M9x+=D2e;var h9x=z0v.C6p;h9x+=N3D;h9x+=w2p;var c9x=F5p;c9x+=J2p;c9x+=m6p;c9x+=f5p;var T9x=Z1D;T9x+=m6p;T9x+=f5p;var L9x=z0v.C6p;L9x+=w2p;a+=o3D;for(i=k9U;i <= d9U;i++){a+=button(i,render(i));}a+=button(L9x,i18n[q3D][g9U]);a+=T9x;a+=c9x;for(i=J9U;i <= H9U;i++){a+=button(i,render(i));}a+=button(v3e,i18n[h9x][k9U]);a+=M9x;span=J9U;}else if(count === A9U){var c=g9U;for(j=g9U;j < i9U;j++){var E9x=A3D;E9x+=f5p;var n9x=X2D;n9x+=D2e;a+=n9x;for(i=g9U;i < d9U;i++){a+=button(c,render(c));c++;}a+=E9x;}span=d9U;}else {var r9x=F5p;r9x+=Y3D;r9x+=f5p;var p9x=F5p;p9x+=J2p;p9x+=m6p;p9x+=f5p;var j9x=H0e;j9x+=J2p;j9x+=D2e;a+=o3D;for(j=g9U;j < F9U;j+=w9U){var a9x=R2W;a9x+=G6p;a9x+=H4p;a+=button(j,render(j),a9x);}a+=j9x;a+=s3D + className + T0p + className + W3D;var start=range !== w8p?range:Math[G3D](val / w9U) * w9U;a+=p9x;for(j=start + k9U;j < start + w9U;j++){a+=button(j,render(j));}a+=r9x;span=d9U;}container[G9j]()[k6j](G2D + className + O9x + b3D + span + M0p + i18n[unit] + u3D + u2D + a + R9x + S3D);},_optionsTitle:function(){var L3D="llYe";var M3D="months";var e3D="etF";var Q3D="arRan";var t3D="Ye";var f3D="range";var c3D="getFullYear";var y3D="ullYea";var z3D="yearRa";var P3D="getF";var T3D="minD";var Z3D="ull";var F3D="nge";var l3D="ran";var i6U=O2p;i6U+=f3D;var K6U=W2p;K6U+=q6p;K6U+=M6W;var B6U=O2p;B6U+=l3D;B6U+=m4p;B6U+=q6p;var k6U=X4p;k6U+=G6p;k6U+=P7j;var g6U=z3D;g6U+=F3D;var D6U=m4p;D6U+=e3D;D6U+=y3D;D6U+=m6p;var C6U=S6e;C6U+=Q3D;C6U+=H4p;var V6U=P3D;V6U+=Z3D;V6U+=t3D;V6U+=M6W;var I6U=D1D;I6U+=L3D;I6U+=M6W;var U9x=T3D;U9x+=b6p;var i18n=this[n1p][E1j];var min=this[n1p][U9x];var max=this[n1p][U1D];var minYear=min?min[I6U]():w8p;var maxYear=max?max[V6U]():w8p;var i=minYear !== w8p?minYear:new Date()[c3D]() - this[n1p][C6U];var j=maxYear !== w8p?maxYear:new Date()[D6U]() + this[n1p][g6U];this[h3D](k6U,this[B6U](g9U,x9U),i18n[M3D]);this[h3D](K6U,this[i6U](i,j));},_pad:function(i){var n3D='0';return i < w9U?n3D + i:i;},_position:function(){var E3D="scr";var j3D="terWidth";var D4D="hori";var p3D="outerH";var g4D="z";var K4D="wid";var a3D="Top";var B4D='horizontal';var V4D="fse";var r3D="eight";var R3D="out";var O3D="rts";var I4D="igh";var k4D="ddCl";var U3D="erHe";var S6U=s2p;S6U+=q6p;S6U+=x0j;var W6U=E3D;W6U+=z0v.M9U;W6U+=C8W;W6U+=a3D;var s6U=I7j;s6U+=j3D;var Y6U=p3D;Y6U+=r3D;var A6U=B5j;A6U+=W2p;var q6U=s2p;q6U+=a9p;q6U+=J2p;var o6U=J2p;o6U+=z0v.M9U;o6U+=y2p;var N6U=n1p;N6U+=Y6p;N6U+=Y6p;var H6U=R8j;H6U+=x6p;H6U+=P7j;var x6U=x6p;x6U+=z0v.C6p;x6U+=J2p;x6U+=q6p;var w6U=D9p;w6U+=O3D;var X6U=R3D;X6U+=U3D;X6U+=I4D;X6U+=J2p;var J6U=J9j;J6U+=V4D;J6U+=J2p;var d6U=T6p;d6U+=C4D;d6U+=m2p;d6U+=J2p;var offset=this[o8p][d6U][J6U]();var container=this[o8p][U8p];var inputHeight=this[o8p][P8e][X6U]();if(this[Y6p][w6U][x6U] && this[Y6p][j8e][i8e] && $(window)[H6U]() > Z9U){var v6U=D4D;v6U+=g4D;v6U+=o9e;v6U+=Q0j;var m6U=z0v.C6p;m6U+=k4D;m6U+=P3p;container[m6U](v6U);}else {container[N9j](B4D);}container[N6U]({top:offset[o6U] + inputHeight,left:offset[q6U]})[q3j](A6U);var calHeight=container[Y6U]();var calWidth=container[s6U]();var scrollTop=$(window)[W6U]();if(offset[a7j] + inputHeight + calHeight - scrollTop > $(window)[M7j]()){var u6U=J2p;u6U+=z0v.M9U;u6U+=y2p;var b6U=n1p;b6U+=Y6p;b6U+=Y6p;var G6U=Z7j;G6U+=y2p;var newTop=offset[G6U] - calHeight;container[b6U](u6U,newTop < g9U?g9U:newTop);}if(calWidth + offset[S6U] > $(window)[W2W]()){var l6U=s2p;l6U+=a9p;l6U+=J2p;var f6U=K4D;f6U+=P7j;var newLeft=$(window)[f6U]() - calWidth;container[K9p](l6U,newLeft < g9U?g9U:newLeft);}},_range:function(start,end,inc){var a=[];if(!inc){inc=k9U;}z0v.h0v();for(var i=start;i <= end;i+=inc){var z6U=y2p;z6U+=m2p;z6U+=Y6p;z6U+=p7p;a[z6U](i);}return a;},_setCalander:function(){z0v.h0v();var d4D="cal";var J4D="_htmlMonth";if(this[Y6p][O9p]){var Q6U=v8p;Q6U+=N8p;Q6U+=M2p;var y6U=z0v.C6p;y6U+=i4D;y6U+=q6p;y6U+=L6p;var e6U=q6p;e6U+=w2p;e6U+=y2p;e6U+=X5p;var F6U=d4D;F6U+=V2p;F6U+=z0v.C6p;F6U+=m6p;this[o8p][F6U][e6U]()[y6U](this[J4D](this[Y6p][Q6U][O6D](),this[Y6p][O9p][v6D]()));}},_setTitle:function(){var w4D="_optionSet";var X4D="yea";var L6U=z4j;L6U+=e7j;var t6U=X4D;t6U+=m6p;var Z6U=n6W;Z6U+=w6D;Z6U+=z0v.M9U;Z6U+=x6D;var P6U=X4p;P6U+=G6p;P6U+=P7j;this[w4D](P6U,this[Y6p][O9p][Z6U]());z0v.F0v();this[w4D](t6U,this[Y6p][L6U][O6D]());},_setTime:function(){var x4D="econdsR";var o4D="nut";var A4D="getUTCHou";var u4D="hoursAvailable";var S4D="_optionsTime";var N4D="secon";var q4D="part";var H4D="sec";var b4D='hours';var v4D="econds";var m4D="tS";var R6U=Y6p;R6U+=x4D;R6U+=m1D;R6U+=H4p;var O6U=H4D;O6U+=W8p;O6U+=r5j;var r6U=H4p;r6U+=m4D;r6U+=v4D;var p6U=N4D;p6U+=r5j;var j6U=h3D;j6U+=T9e;var a6U=K4p;a6U+=o4D;a6U+=q6p;a6U+=Y6p;var E6U=m4p;E6U+=B1D;E6U+=i2p;E6U+=N6D;var n6U=w2p;n6U+=N6D;var M6U=q4D;M6U+=Y6p;var h6U=O2p;h6U+=G6e;h6U+=T9e;var T6U=A4D;T6U+=h3p;var that=this;var d=this[Y6p][x6p];var hours=d?d[T6U]():g9U;var allowed=function(prop){var s4D='Available';var Y4D="Avail";var G4D='Increment';var W4D="_range";var c6U=Y4D;c6U+=w4e;return that[n1p][prop + c6U]?that[n1p][prop + s4D]:that[W4D](g9U,z9U,that[n1p][prop + G4D]);};this[h6U](b4D,this[Y6p][M6U][z9e]?H9U:A9U,hours,this[n1p][u4D]);this[S4D](n6U,F9U,d?d[E6U]():g9U,allowed(a6U),this[Y6p][G6D]);this[j6U](p6U,F9U,d?d[r6U]():g9U,allowed(O6U),this[Y6p][R6U]);},_show:function(){var z4D="E_";var Q4D="namespace";var y4D="ze.";var P4D="_position";var l4D="div.DT";var F4D="y_Content";var f4D="oll.";var e4D=" resi";var Z4D='scroll.';var B1U=z0v.M9U;B1U+=G6p;var k1U=d6e;k1U+=m6p;k1U+=f4D;var g1U=z0v.M9U;g1U+=G6p;var D1U=z0v.M9U;D1U+=G6p;var C1U=l4D;C1U+=z4D;C1U+=Y0W;C1U+=F4D;var I1U=e4D;I1U+=y4D;var U6U=z0v.M9U;U6U+=G6p;var that=this;var namespace=this[Y6p][Q4D];this[P4D]();$(window)[U6U](Z4D + namespace + I1U + namespace,function(){var V1U=O2p;z0v.h0v();V1U+=p1j;V1U+=x6p;V1U+=q6p;that[V1U]();});$(C1U)[D1U](Z4D + namespace,function(){that[z2j]();});$(H1D)[g1U](k1U + namespace,function(){z0v.F0v();that[z2j]();});$(document)[B1U](x1D + namespace,function(e){var L4D="key";var t4D="keyC";var i1U=t4D;i1U+=s5p;i1U+=q6p;z0v.F0v();var K1U=L4D;K1U+=T9j;K1U+=q6p;if(e[K1U] === X9U || e[i1U] === s9U || e[t9j] === m9U){var d1U=k2D;d1U+=T4D;that[d1U]();}});setTimeout(function(){var c4D="ck.";var X1U=U0j;X1U+=c4D;var J1U=z0v.M9U;J1U+=G6p;$(B9p)[J1U](X1U + namespace,function(e){var h4D="tar";var m1U=h4D;m1U+=n6W;var H1U=T1j;H1U+=V5j;H1U+=P7j;var x1U=l9p;x1U+=w2p;var w1U=r9j;w1U+=M8p;w1U+=J6p;var parents=$(e[s3j])[L2W]();if(!parents[w1U](that[x1U][U8p])[H1U] && e[m1U] !== that[o8p][P8e][g9U]){var v1U=O2p;v1U+=p7p;v1U+=T4D;that[v1U]();}});},w9U);},_writeOutput:function(focus){var E4D="TCMonth";var n4D="tU";var M4D="UTCD";var j4D="ome";var b1U=n1p;b1U+=m9p;b1U+=G6p;b1U+=H4p;var G1U=d6p;G1U+=Q0j;var W1U=x6p;W1U+=z0v.M9U;W1U+=w2p;var s1U=m4p;s1U+=v4p;s1U+=M4D;s1U+=b6p;var Y1U=H4p;Y1U+=n4D;Y1U+=E4D;var A1U=O2p;A1U+=y2p;A1U+=p5j;var q1U=m2p;q1U+=J2p;q1U+=n1p;var o1U=a4D;o1U+=g9p;var N1U=w2p;N1U+=j4D;N1U+=G6p;N1U+=J2p;var date=this[Y6p][x6p];var out=window[N1U]?window[o1U][q1U](date,undefined,this[n1p][l8e],this[n1p][z8e])[e0e](this[n1p][e0e]):date[O6D]() + Y3W + this[A1U](date[Y1U]() + k9U) + Y3W + this[i1D](date[s1U]());this[W1U][P8e][G1U](out)[p4D](b1U,{write:date});if(focus){var u1U=z0v.R9U;u1U+=z0v.M9U;u1U+=j6e;u1U+=Y6p;this[o8p][P8e][u1U]();}}});Editor[j5e][r4D]=g9U;Editor[S1U][f1U]={classPrefix:l1U,disableDays:w8p,firstDay:k9U,format:y0e,hoursAvailable:w8p,i18n:Editor[F5W][E1j][z1U],maxDate:w8p,minDate:w8p,minutesAvailable:w8p,minutesIncrement:k9U,momentStrict:d5p,momentLocale:F1U,onChange:function(){},secondsAvailable:w8p,secondsIncrement:k9U,showWeekNumber:i5p,yearRange:Y9U};(function(){var O4D="oa";var o0D="separator";var S8D="disabl";var p5D="_editor_val";var F5D="eId";var V7D="adonl";var l5D='text';var h0D='_';var U4D="pas";var q0D="_inpu";var I7D="swor";var l9D="wireFormat";var z5D="saf";var h7D="_enabled";var b5D="_val";var i6l="nabled";var W5D="hidden";var q5D="_inp";var g0D="_lastSet";var z0D='input';var y0D="_editor_v";var J9D="datetime";var l0D="checkbox";var d8D="radio";var R4D="extar";var G8D='input:checked';var J6l="uploadMany";var c8D="icker";var E9D="_va";var k8D="checked";var k0D="_addOptions";var s5D="prop";var o9D="_picker";var n0D="ut:l";var A5D="_input";var C7D="odels";var J0D="lti";var W8D="_preChecked";var f0D="_in";var D6l="eTe";var g7D="_i";var V9D="datepicker";var S5D='<input/>';var M0D='input:last';var o5D="fieldType";var n0U=q6p;n0U+=N3W;var v0U=c3e;v0U+=x6p;var m0U=j4W;m0U+=s2p;m0U+=O4D;m0U+=x6p;var g7U=q6p;g7U+=T0j;g7U+=x6p;var b3U=J2p;b3U+=R4D;b3U+=i1W;var v3U=U4D;v3U+=I7D;v3U+=x6p;var J3U=S4W;J3U+=t6p;J3U+=L6p;var d3U=J2p;d3U+=I2p;var D3U=I2p;D3U+=g3p;D3U+=x6p;var C3U=m6p;C3U+=q6p;C3U+=V7D;C3U+=W2p;var a2U=w2p;a2U+=C7D;var e1U=A0p;e1U+=x6p;e1U+=D7D;var fieldTypes=Editor[e1U];function _buttonText(conf,text){var d7D='div.upload button';var K7D="..";var k7D="Cho";var i7D="ploadText";var B7D="ose file";var Z1U=p7p;Z1U+=o1j;var P1U=g7D;P1U+=E8e;if(text === w8p || text === undefined){var Q1U=k7D;Q1U+=B7D;Q1U+=K7D;Q1U+=K6p;var y1U=m2p;y1U+=i7D;text=conf[y1U] || Q1U;}conf[P1U][E6W](d7D)[Z1U](text);}function _commonUpload(editor,conf,dropCallback,multiple){var q7D="ss=\"row second\">";var Y7D="<button class=";var U7D="Drag and drop a file here to upload";var a7D="FileReader";var G7D=" t";var C5D="_enab";var x5D="noDro";var n7D="put[type=file]";var R7D='div.drop span';var y7D="s=\"eu_t";var s7D="<div class=\"cell clearValue";var S7D="on class=";var l7D="=\"cell upload ";var B5D='dragover';var w5D="dered";var W7D="<input";var T7D='<div class="cell limitHide">';var O7D="opTex";var J7D="put[typ";var I5D='div.drop';var f7D="<div class";var N7D="<div class=\"dro";var H5D="dd";var x7D="agDrop";var X5D=".ren";var v5D='div.clearValue button';var e7D="<div clas";var v7D="></div>";var P7D="buttonInternal";var u7D="ile\" ";var Q7D="able\"";var F7D="v class=\"row\">";var E7D='input[type=file]';var c7D='<div class="cell">';var J5D="div";var M7D="feI";var t7D='"></button>';var H7D="lass=\"rende";var m7D="red\"";z0v.h0v();var o7D="p\"><span></span></div>";var b7D="ype=\"f";var X7D="e=file]";var L7D='multiple';var m5D="Clas";var V5D='drop';var j7D="dragle";var p7D="ave dragexi";var r7D="dragDr";var w7D="fin";var Z7D='<div class="editor_upload">';var k5D='over';var z7D="mitHide\">";var A7D="></b";var h2U=z0v.M9U;h2U+=G6p;var c2U=R5p;c2U+=J7D;c2U+=X7D;var Q2U=P4p;Q2U+=e2W;var y2U=w7D;y2U+=x6p;var J2U=M2e;J2U+=x7D;var D2U=O2p;D2U+=V9e;D2U+=U5p;var C2U=H0e;C2U+=g1p;C2U+=y5p;var V2U=H0e;V2U+=H8j;var I2U=J2j;I2U+=H7D;I2U+=m7D;I2U+=v7D;var U1U=H0e;U1U+=x6p;U1U+=E5p;U1U+=f5p;var R1U=N7D;R1U+=o7D;var O1U=q5W;O1U+=q7D;var r1U=F5p;r1U+=B0e;var p1U=H0e;p1U+=H8j;var j1U=S5p;j1U+=A7D;j1U+=Q3W;j1U+=f5p;var a1U=Y7D;a1U+=S5p;var E1U=s7D;E1U+=d8j;var n1U=e5p;n1U+=f5p;var M1U=W7D;M1U+=G7D;M1U+=b7D;M1U+=u7D;var h1U=o1D;h1U+=S7D;h1U+=S5p;var c1U=f7D;c1U+=l7D;c1U+=B2j;c1U+=z7D;var T1U=P0e;T1U+=F7D;var L1U=e7D;L1U+=y7D;L1U+=Q7D;L1U+=f5p;var t1U=s9p;t1U+=a1p;t1U+=j1p;var btnClass=editor[t1U][Z0j][P7D];var container=$(Z7D + L1U + T1U + c1U + h1U + btnClass + t7D + M1U + (multiple?L7D:l7p) + n1U + p0p + E1U + a1U + btnClass + j1U + p1U + r1U + O1U + T7D + R1U + U1U + c7D + I2U + p0p + V2U + p0p + C2U);conf[D2U]=container;conf[h7D]=d5p;if(conf[l0p]){var B2U=T6p;B2U+=x6p;var k2U=x4p;k2U+=M7D;k2U+=x6p;var g2U=T6p;g2U+=G6p;g2U+=n7D;container[E6W](g2U)[Q9j](o2e,Editor[k2U](conf[B2U]));}if(conf[Q9j]){var d2U=z0v.C6p;d2U+=J2p;d2U+=q7j;var i2U=R0j;i2U+=J2p;i2U+=m6p;var K2U=r9j;K2U+=L6p;container[K2U](E7D)[i2U](conf[d2U]);}_buttonText(conf);if(window[a7D] && conf[J2U] !== i5p){var b2U=n1p;b2U+=Q4p;b2U+=Y6p;b2U+=q6p;var G2U=z0v.M9U;G2U+=G6p;var s2U=z0v.M9U;s2U+=y2p;s2U+=g3p;var Y2U=z0v.M9U;Y2U+=G6p;var q2U=z0v.M9U;q2U+=G6p;var N2U=j7D;N2U+=p7D;N2U+=J2p;var H2U=z0v.M9U;H2U+=G6p;var x2U=z0v.R9U;x2U+=T6p;x2U+=L6p;var w2U=r7D;w2U+=O7D;w2U+=J2p;var X2U=J2p;X2U+=I2p;container[E6W](R7D)[X2U](conf[w2U] || U7D);var dragDrop=container[x2U](I5D);dragDrop[H2U](V5D,function(e){var g5D="dataTransfer";var D5D="originalEvent";var m2U=C5D;m2U+=T1j;m2U+=x6p;if(conf[m2U]){var v2U=m2p;v2U+=N8p;v2U+=z0v.M9U;v2U+=p5j;Editor[v2U](editor,conf,e[D5D][g5D][I5p],_buttonText,dropCallback);dragDrop[N9j](k5D);}return i5p;})[W8p](N2U,function(e){if(conf[h7D]){var o2U=B1j;o2U+=m6p;dragDrop[N9j](o2U);}return i5p;})[q2U](B5D,function(e){var A2U=O2p;A2U+=g3p;A2U+=w4e;A2U+=x6p;z0v.h0v();if(conf[A2U]){dragDrop[u9p](k5D);}return i5p;});editor[Y2U](s2U,function(){var K5D='dragover.DTE_Upload drop.DTE_Upload';z0v.h0v();var W2U=z0v.D6p;W2U+=z0v.M9U;W2U+=x6p;W2U+=W2p;$(W2U)[W8p](K5D,function(e){return i5p;});})[G2U](b2U,function(){var d5D="Upload";var i5D="agover.DTE_Upload drop.DTE_";var f2U=M2e;f2U+=i5D;f2U+=d5D;var S2U=z0v.M9U;S2U+=D1W;var u2U=z0v.D6p;u2U+=z0v.M9U;u2U+=c2j;$(u2U)[S2U](f2U);});}else {var e2U=J5D;e2U+=X5D;e2U+=w5D;var F2U=x0p;F2U+=w3p;F2U+=G6p;F2U+=x6p;var z2U=x5D;z2U+=y2p;var l2U=z0v.C6p;l2U+=H5D;l2U+=m5D;l2U+=Y6p;container[l2U](z2U);container[F2U](container[E6W](e2U));}container[y2U](v5D)[W8p](Q2U,function(e){var P2U=C5D;P2U+=s2p;P2U+=c8j;e[c9j]();if(conf[P2U]){var T2U=n1p;T2U+=z0v.C6p;T2U+=s2p;T2U+=s2p;var L2U=Y6p;L2U+=q6p;L2U+=J2p;var t2U=m2p;t2U+=T3p;var Z2U=u6W;Z2U+=s2p;Z2U+=x6p;Z2U+=D7D;Editor[Z2U][t2U][L2U][T2U](editor,conf,l7p);}});container[E6W](c2U)[h2U](K9e,function(){var M2U=G7W;M2U+=z0v.M9U;z0v.F0v();M2U+=z0v.C6p;M2U+=x6p;Editor[M2U](editor,conf,this[I5p],_buttonText,function(ids){var n2U=n1p;n2U+=j6W;dropCallback[n2U](editor,ids);container[E6W](E7D)[H1p](l7p);});});return container;}function _triggerChange(input){z0v.F0v();setTimeout(function(){var N5D="ang";var E2U=n1p;E2U+=p7p;E2U+=N5D;E2U+=q6p;input[p4D](E2U,{editor:d5p,editorSet:d5p});;},g9U);}var baseFieldType=$[f0p](d5p,{},Editor[a2U][o5D],{get:function(conf){var p2U=d6p;z0v.h0v();p2U+=Q0j;var j2U=O2p;j2U+=T6p;j2U+=E8e;return conf[j2U][p2U]();},set:function(conf,val){var r2U=q5D;r2U+=m2p;r2U+=J2p;conf[A5D][H1p](val);z0v.F0v();_triggerChange(conf[r2U]);},enable:function(conf){var Y5D="isa";z0v.F0v();var O2U=x6p;O2U+=Y5D;O2U+=c5j;O2U+=c8j;conf[A5D][s5D](O2U,i5p);},disable:function(conf){var U2U=v8p;U2U+=l4W;U2U+=T1j;U2U+=x6p;var R2U=v6p;z0v.h0v();R2U+=f8p;conf[A5D][R2U](U2U,d5p);},canReturnSubmit:function(conf,node){z0v.F0v();return d5p;}});fieldTypes[W5D]={create:function(conf){z0v.h0v();var G5D="valu";var V3U=G5D;V3U+=q6p;var I3U=O2p;I3U+=d6p;I3U+=Q0j;conf[I3U]=conf[V3U];return w8p;},get:function(conf){return conf[b5D];},set:function(conf,val){conf[b5D]=val;}};fieldTypes[C3U]=$[D3U](d5p,{},baseFieldType,{create:function(conf){var u5D="reado";var i3U=u5D;i3U+=p1W;i3U+=W2p;var K3U=J2p;K3U+=q6p;K3U+=Z6p;K3U+=J2p;var B3U=T6p;B3U+=x6p;var k3U=I2p;k3U+=V2p;var g3U=z0v.C6p;g3U+=O2j;conf[A5D]=$(S5D)[g3U]($[k3U]({id:Editor[E0p](conf[B3U]),type:K3U,readonly:i3U},conf[Q9j] || ({})));return conf[A5D][g9U];}});fieldTypes[d3U]=$[J3U](d5p,{},baseFieldType,{create:function(conf){var f5D="feId";var m3U=O2p;m3U+=P8e;var H3U=z0v.C6p;H3U+=J2p;H3U+=q7j;var x3U=Y6p;x3U+=z0v.C6p;x3U+=f5D;var w3U=c3e;w3U+=x6p;var X3U=g7D;X3U+=G6p;X3U+=G4e;X3U+=J2p;conf[X3U]=$(S5D)[Q9j]($[w3U]({id:Editor[x3U](conf[l0p]),type:l5D},conf[H3U] || ({})));z0v.F0v();return conf[m3U][g9U];}});fieldTypes[v3U]=$[f0p](d5p,{},baseFieldType,{create:function(conf){var y5D="t/>";var Q5D='password';var e5D="<inpu";var G3U=O2p;G3U+=P8e;var W3U=z0v.C6p;W3U+=J2p;W3U+=J2p;W3U+=m6p;z0v.h0v();var s3U=T6p;s3U+=x6p;var Y3U=z5D;Y3U+=F5D;var A3U=q6p;A3U+=T0j;A3U+=x6p;var q3U=z0v.C6p;q3U+=J2p;q3U+=J2p;q3U+=m6p;var o3U=e5D;o3U+=y5D;var N3U=O2p;N3U+=P8e;conf[N3U]=$(o3U)[q3U]($[A3U]({id:Editor[Y3U](conf[s3U]),type:Q5D},conf[W3U] || ({})));return conf[G3U][g9U];}});fieldTypes[b3U]=$[f0p](d5p,{},baseFieldType,{create:function(conf){var Z5D='<textarea></textarea>';var P5D="af";var f3U=T6p;f3U+=x6p;var S3U=Y6p;S3U+=P5D;S3U+=q6p;S3U+=H4e;var u3U=I2p;u3U+=V2p;conf[A5D]=$(Z5D)[Q9j]($[u3U]({id:Editor[S3U](conf[f3U])},conf[Q9j] || ({})));return conf[A5D][g9U];},canReturnSubmit:function(conf,node){z0v.F0v();return i5p;}});fieldTypes[p7e]=$[f0p](d5p,{},baseFieldType,{_addOptions:function(conf,opts,append){var a5D="erValue";var T5D="placehold";var n5D="ceholderValue";var t5D="placeholde";var h5D="placeho";z0v.F0v();var c5D="erDis";var M5D="lder";var r5D="Pai";var O5D="pairs";var L5D="disab";var E5D="cehol";var j5D="placeholderDisabled";var l3U=F6j;l3U+=L0j;l3U+=w0j;var elOpts=conf[A5D][g9U][l3U];var countOffset=g9U;if(!append){var z3U=t5D;z3U+=m6p;elOpts[K5p]=g9U;if(conf[z3U] !== undefined){var P3U=L5D;P3U+=T1j;P3U+=x6p;var Q3U=T5D;Q3U+=c5D;Q3U+=k6D;var y3U=h5D;y3U+=M5D;var e3U=y2p;e3U+=E1p;e3U+=n5D;var F3U=P6j;F3U+=E5D;F3U+=x6p;F3U+=a5D;var placeholderValue=conf[F3U] !== undefined?conf[e3U]:l7p;countOffset+=k9U;elOpts[g9U]=new Option(conf[y3U],placeholderValue);var disabled=conf[Q3U] !== undefined?conf[j5D]:d5p;elOpts[g9U][W5D]=disabled;elOpts[g9U][P3U]=disabled;elOpts[g9U][p5D]=placeholderValue;}}else {countOffset=elOpts[K5p];}if(opts){var Z3U=F6j;Z3U+=Y5W;Z3U+=r5D;Z3U+=m6p;Editor[O5D](opts,conf[Z3U],function(val,label,i,attr){var R5D="ditor_";var t3U=O2p;t3U+=q6p;t3U+=R5D;t3U+=H1p;z0v.h0v();var option=new Option(label,val);option[t3U]=val;if(attr){var L3U=z0v.C6p;L3U+=J2p;L3U+=J2p;L3U+=m6p;$(option)[L3U](attr);}elOpts[i + countOffset]=option;});}},create:function(conf){var U5D="<select><";var V0D="multiple";var I0D="/select";var C0D='change.dte';var B0D="ipOpts";var E3U=g7D;E3U+=G6p;E3U+=G4e;E3U+=J2p;var n3U=F6j;n3U+=Y5W;var h3U=z0v.C6p;h3U+=y3W;h3U+=m6p;z0v.h0v();var c3U=S4W;c3U+=n7e;var T3U=U5D;T3U+=I0D;T3U+=f5p;conf[A5D]=$(T3U)[Q9j]($[c3U]({id:Editor[E0p](conf[l0p]),multiple:conf[V0D] === d5p},conf[h3U] || ({})))[W8p](C0D,function(e,d){var D0D="dito";var M3U=q6p;M3U+=D0D;M3U+=m6p;z0v.F0v();if(!d || !d[M3U]){conf[g0D]=fieldTypes[p7e][n6W](conf);}});fieldTypes[p7e][k0D](conf,conf[n3U] || conf[B0D]);return conf[E3U][g9U];},update:function(conf,options,append){var d0D="ddO";var i0D="Set";var K0D="_last";z0v.F0v();var j3U=K0D;j3U+=i0D;var a3U=B4j;a3U+=d0D;a3U+=y2p;a3U+=U1p;fieldTypes[p7e][a3U](conf,options,append);var lastSet=conf[j3U];if(lastSet !== undefined){var p3U=Y6p;p3U+=q6p;p3U+=J2p;fieldTypes[p7e][p3U](conf,lastSet,d5p);}_triggerChange(conf[A5D]);},get:function(conf){var m0D="jo";var w0D="toAr";var v0D="separ";var X0D="ple";var H0D="lected";var N0D="ator";var x0D="option:se";var g4U=F9p;g4U+=P7j;var V4U=w2p;V4U+=m2p;V4U+=J0D;V4U+=X0D;var I4U=w0D;I4U+=m6p;I4U+=z0v.C6p;z0v.h0v();I4U+=W2p;var U3U=w2p;U3U+=z0v.C6p;U3U+=y2p;var R3U=x0D;R3U+=H0D;var O3U=z0v.R9U;O3U+=T6p;O3U+=G6p;O3U+=x6p;var r3U=O2p;r3U+=R5p;r3U+=y6D;var val=conf[r3U][O3U](R3U)[U3U](function(){return this[p5D];})[I4U]();if(conf[V4U]){var D4U=m0D;D4U+=T6p;D4U+=G6p;var C4U=v0D;C4U+=N0D;return conf[C4U]?val[D4U](conf[o0D]):val;}return val[g4U]?val[g9U]:w8p;},set:function(conf,val,localUpdate){var G0D='option';var u0D="placeholder";var A0D="isArra";var s0D="ltiple";var W0D="arato";var Y0D="parato";var H4U=w1p;H4U+=J0D;H4U+=y2p;H4U+=T1j;var X4U=O2p;X4U+=R5p;X4U+=G4e;X4U+=J2p;var J4U=q0D;J4U+=J2p;var K4U=A0D;K4U+=W2p;var B4U=J4j;B4U+=Y0D;B4U+=m6p;var k4U=w1p;k4U+=s0D;if(!localUpdate){conf[g0D]=val;}if(conf[k4U] && conf[B4U] && !$[K4U](val)){var d4U=J4j;d4U+=y2p;d4U+=W0D;d4U+=m6p;var i4U=D1j;i4U+=T6p;i4U+=V5j;val=typeof val === i4U?val[n0W](conf[d4U]):[];}else if(!$[s6W](val)){val=[val];}var i,len=val[K5p],found,allFound=i5p;var options=conf[J4U][E6W](G0D);conf[X4U][E6W](G0D)[y8p](function(){var b0D="or_";var x4U=h7e;z0v.F0v();x4U+=t6p;x4U+=x6p;found=i5p;for(i=g9U;i < len;i++){var w4U=j0j;w4U+=b0D;w4U+=H1p;if(this[w4U] == val[i]){found=d5p;allFound=d5p;break;}}this[x4U]=found;});if(conf[u0D] && !allFound && !conf[H4U] && options[K5p]){options[g9U][S1D]=d5p;}if(!localUpdate){var m4U=g7D;m4U+=C4D;m4U+=m2p;m4U+=J2p;_triggerChange(conf[m4U]);}return allFound;},destroy:function(conf){var S0D="hange.dt";z0v.F0v();var o4U=n1p;o4U+=S0D;o4U+=q6p;var N4U=z0v.M9U;N4U+=D1W;var v4U=f0D;v4U+=y6D;conf[v4U][N4U](o4U);}});fieldTypes[l0D]=$[f0p](d5p,{},baseFieldType,{_addOptions:function(conf,opts,append){var F0D="pai";var e0D="optionsPair";var val,label;var jqInput=conf[A5D];var offset=g9U;if(!append){jqInput[G9j]();}else {var q4U=T1j;q4U+=j1W;offset=$(z0D,jqInput)[q4U];}if(opts){var A4U=F0D;A4U+=h3p;Editor[A4U](opts,conf[e0D],function(val,label,i,attr){var P0D=" for=\"";var t0D="box\" />";var T0D='<div>';var L0D="afe";var Z0D="\" type=\"check";z0v.F0v();var Q0D="<label";var c0D='<input id="';var l4U=y0D;l4U+=z0v.C6p;l4U+=s2p;var f4U=z0v.C6p;f4U+=J2p;f4U+=q7j;var S4U=T6p;S4U+=x6p;var u4U=z5D;u4U+=F5D;var b4U=Q0D;b4U+=P0D;var G4U=Z0D;G4U+=t0D;var W4U=T6p;W4U+=x6p;var s4U=Y6p;s4U+=L0D;s4U+=U3W;s4U+=x6p;var Y4U=z0v.C6p;Y4U+=y2p;Y4U+=V3p;Y4U+=x6p;jqInput[Y4U](T0D + c0D + Editor[s4U](conf[W4U]) + h0D + (i + offset) + G4U + b4U + Editor[u4U](conf[S4U]) + h0D + (i + offset) + M0p + label + r0p + p0p);$(M0D,jqInput)[f4U](f4W,val)[g9U][l4U]=val;if(attr){var F4U=z0v.C6p;F4U+=J2p;F4U+=q7j;var z4U=V9e;z4U+=n0D;z4U+=l9j;z4U+=J2p;$(z4U,jqInput)[F4U](attr);}});}},create:function(conf){var j0D='<div></div>';var E0D="ip";var a0D="Op";var Q4U=O2p;Q4U+=R5p;Q4U+=G4e;Q4U+=J2p;var y4U=E0D;y4U+=a0D;y4U+=J2p;y4U+=Y6p;var e4U=z0v.M9U;e4U+=y2p;e4U+=u6p;z0v.F0v();e4U+=O6p;conf[A5D]=$(j0D);fieldTypes[l0D][k0D](conf,conf[e4U] || conf[y4U]);return conf[Q4U][g9U];},get:function(conf){var C8D="Value";var R0D=":ch";var I8D="unselectedValue";var O0D="parat";var U0D="ecked";var p0D="sepa";var V8D="unselected";var r0D="rator";var M4U=p0D;z0v.h0v();M4U+=r0D;var h4U=J4j;h4U+=O0D;h4U+=z0v.M9U;h4U+=m6p;var Z4U=s2p;Z4U+=p9W;Z4U+=p7p;var P4U=T6p;P4U+=E8e;P4U+=R0D;P4U+=U0D;var out=[];var selected=conf[A5D][E6W](P4U);if(selected[Z4U]){var t4U=q6p;t4U+=z0v.C6p;t4U+=n1p;t4U+=p7p;selected[t4U](function(){var L4U=V4W;z0v.F0v();L4U+=O2p;L4U+=H1p;out[X0j](this[L4U]);});}else if(conf[I8D] !== undefined){var c4U=V8D;c4U+=C8D;var T4U=y2p;T4U+=X2e;out[T4U](conf[c4U]);}return conf[h4U] === undefined || conf[M4U] === w8p?out:out[s3W](conf[o0D]);},set:function(conf,val){var D8D="sep";var g8D='|';var j4U=T6p;j4U+=Y6p;j4U+=C4p;j4U+=u4W;var n4U=O2p;n4U+=P8e;var jqInputs=conf[n4U][E6W](z0D);if(!$[s6W](val) && typeof val === Z6j){var a4U=D8D;a4U+=z0v.C6p;a4U+=R2W;a4U+=V7p;var E4U=F4p;E4U+=s2p;E4U+=l0j;val=val[E4U](conf[a4U] || g8D);}else if(!$[j4U](val)){val=[val];}var i,len=val[K5p],found;z0v.h0v();jqInputs[y8p](function(){found=i5p;for(i=g9U;i < len;i++){if(this[p5D] == val[i]){found=d5p;break;}}this[k8D]=found;});_triggerChange(jqInputs);},enable:function(conf){var O4U=R5p;O4U+=y2p;O4U+=m2p;O4U+=J2p;var r4U=z0v.R9U;r4U+=T6p;r4U+=L6p;var p4U=O2p;p4U+=T6p;p4U+=M9p;p4U+=J2p;conf[p4U][r4U](O4U)[s5D](u6D,i5p);},disable:function(conf){var B8D="isab";var U4U=x6p;U4U+=B8D;U4U+=u8p;var R4U=z0v.R9U;R4U+=T6p;R4U+=G6p;R4U+=x6p;z0v.h0v();conf[A5D][R4U](z0D)[s5D](U4U,d5p);},update:function(conf,options,append){var K8D="Optio";var i8D="heckb";var D7U=Y6p;D7U+=q6p;D7U+=J2p;var C7U=O2p;z0v.F0v();C7U+=O8p;C7U+=K8D;C7U+=w0j;var V7U=m4p;V7U+=v4p;var I7U=n1p;I7U+=i8D;I7U+=M2j;var checkbox=fieldTypes[I7U];var currVal=checkbox[V7U](conf);checkbox[C7U](conf,options,append);checkbox[D7U](conf,currVal);}});fieldTypes[d8D]=$[g7U](d5p,{},baseFieldType,{_addOptions:function(conf,opts,append){var X8D="sPair";var J8D="opti";var k7U=f0D;k7U+=G4e;k7U+=J2p;var val,label;var jqInput=conf[k7U];var offset=g9U;if(!append){jqInput[G9j]();}else {offset=$(z0D,jqInput)[K5p];}z0v.F0v();if(opts){var K7U=J8D;K7U+=W8p;K7U+=X8D;var B7U=D9p;B7U+=a1D;Editor[B7U](opts,conf[K7U],function(val,label,i,attr){var o8D="id=";var x8D="<label f";var N8D="<input ";var H8D="or=\"";var v8D="\" type=\"radio\" name";var w8D="ast";var m8D="\" ";var q7U=R5p;q7U+=y2p;q7U+=n0D;q7U+=w8D;var o7U=H0e;o7U+=x6p;o7U+=E5p;o7U+=f5p;var N7U=H0e;N7U+=B6j;N7U+=b1p;N7U+=f5p;var v7U=S5p;v7U+=f5p;var m7U=x8D;m7U+=H8D;var H7U=m8D;H7U+=e5p;H7U+=f5p;var x7U=G6p;x7U+=z0v.C6p;x7U+=w2p;x7U+=q6p;var w7U=v8D;w7U+=w8j;w7U+=S5p;var X7U=T6p;X7U+=x6p;var J7U=N8D;J7U+=o8D;J7U+=S5p;var d7U=F5p;d7U+=x6p;d7U+=t5p;var i7U=t7j;i7U+=L6p;jqInput[i7U](d7U + J7U + Editor[E0p](conf[X7U]) + h0D + (i + offset) + w7U + conf[x7U] + H7U + m7U + Editor[E0p](conf[l0p]) + h0D + (i + offset) + v7U + label + N7U + o7U);$(q7U,jqInput)[Q9j](f4W,val)[g9U][p5D]=val;if(attr){var A7U=R0j;A7U+=q7j;$(M0D,jqInput)[A7U](attr);}});}},create:function(conf){var A8D="_addOpti";var Y8D="adio";var s8D="iv />";var q8D="option";var u7U=T6p;u7U+=y2p;u7U+=b6W;u7U+=C1j;var b7U=q8D;b7U+=Y6p;var G7U=A8D;G7U+=O6p;var W7U=m6p;W7U+=Y8D;var s7U=F5p;s7U+=x6p;s7U+=s8D;var Y7U=g7D;Y7U+=M9p;Y7U+=J2p;conf[Y7U]=$(s7U);fieldTypes[W7U][G7U](conf,conf[b7U] || conf[u7U]);this[W8p](p6e,function(){z0v.F0v();var f7U=z0v.R9U;f7U+=T6p;f7U+=L6p;var S7U=O2p;S7U+=T6p;S7U+=M9p;S7U+=J2p;conf[S7U][f7U](z0D)[y8p](function(){z0v.F0v();if(this[W8D]){this[k8D]=d5p;}});});return conf[A5D][g9U];},get:function(conf){var F7U=y0D;F7U+=Q0j;var z7U=s2p;z7U+=g3p;z7U+=c1j;z7U+=p7p;var l7U=O2p;l7U+=T6p;l7U+=C4D;l7U+=U5p;var el=conf[l7U][E6W](G8D);return el[z7U]?el[g9U][F7U]:undefined;},set:function(conf,val){var P7U=r9j;P7U+=L6p;var y7U=c1W;y7U+=p7p;var e7U=R5p;e7U+=G4e;e7U+=J2p;z0v.F0v();var that=this;conf[A5D][E6W](e7U)[y7U](function(){var b8D="reChec";var u8D="ked";this[W8D]=i5p;if(this[p5D] == val){var Q7U=p0j;Q7U+=b8D;Q7U+=u8D;this[k8D]=d5p;this[Q7U]=d5p;}else {this[k8D]=i5p;this[W8D]=i5p;}});_triggerChange(conf[A5D][P7U](G8D));},enable:function(conf){var T7U=S8D;T7U+=c8j;var L7U=v6p;z0v.F0v();L7U+=f8p;var t7U=T6p;t7U+=M9p;t7U+=J2p;var Z7U=z0v.R9U;Z7U+=R5p;Z7U+=x6p;conf[A5D][Z7U](t7U)[L7U](T7U,i5p);},disable:function(conf){var f8D="isabled";var M7U=x6p;M7U+=f8D;var h7U=R5p;h7U+=y2p;h7U+=m2p;h7U+=J2p;var c7U=O2p;c7U+=V9e;c7U+=m2p;c7U+=J2p;z0v.h0v();conf[c7U][E6W](h7U)[s5D](M7U,d5p);},update:function(conf,options,append){var l8D='[value="';var R7U=z4W;R7U+=s2p;R7U+=m2p;R7U+=q6p;var O7U=R0j;O7U+=q7j;var r7U=s2p;r7U+=p9W;r7U+=p7p;var p7U=S5p;p7U+=b8W;var j7U=z0v.R9U;j7U+=T6p;j7U+=G6p;j7U+=x6p;var a7U=O2p;a7U+=P8e;var E7U=H4p;E7U+=J2p;var n7U=m6p;n7U+=z0v.C6p;z0v.F0v();n7U+=x6p;n7U+=L0j;var radio=fieldTypes[n7U];var currVal=radio[E7U](conf);radio[k0D](conf,options,append);var inputs=conf[a7U][j7U](z0D);radio[U6j](conf,inputs[R4e](l8D + currVal + p7U)[r7U]?currVal:inputs[Q8j](g9U)[O7U](R7U));}});fieldTypes[d8e]=$[f0p](d5p,{},baseFieldType,{create:function(conf){var t8D="2";var F8D="<inp";var L8D="822";var h8D="Format";var p8D='type';var e8D=" />";var r8D='date';var T8D="datep";var P8D="ui";var z8D="tepicker";var y8D="dateFor";var Q8D="jquery";var Z8D="RFC_";var H5U=O2p;H5U+=P8e;var D5U=V1j;D5U+=z8D;var C5U=R0j;C5U+=J2p;C5U+=m6p;var V5U=z5D;V5U+=F5D;var I5U=z0v.C6p;I5U+=J2p;I5U+=J2p;I5U+=m6p;var U7U=F8D;U7U+=U5p;U7U+=e8D;conf[A5D]=$(U7U)[I5U]($[f0p]({id:Editor[V5U](conf[l0p]),type:l5D},conf[C5U]));if($[D5U]){var k5U=y8D;k5U+=Y7p;k5U+=J2p;var g5U=Q8D;g5U+=P8D;conf[A5D][u9p](g5U);if(!conf[k5U]){var i5U=Z8D;i5U+=t8D;i5U+=L8D;var K5U=T8D;K5U+=c8D;var B5U=d8e;B5U+=h8D;conf[B5U]=$[K5U][i5U];}setTimeout(function(){var j8D="dateImage";var n8D="epicker-di";var E8D="tep";var M8D="#ui-dat";var a8D="dateFormat";var w5U=M8D;w5U+=n8D;w5U+=d6p;var X5U=z0v.M9U;X5U+=y2p;X5U+=J2p;X5U+=Y6p;var J5U=S4W;J5U+=J2p;J5U+=V2p;var d5U=V1j;d5U+=E8D;d5U+=c8D;$(conf[A5D])[d5U]($[J5U]({dateFormat:conf[a8D],buttonImage:conf[j8D],buttonImageOnly:d5p,onSelect:function(){conf[A5D][F8p]()[D4j]();}},conf[X5U]));$(w5U)[K9p](f6j,C6j);},w9U);}else {var x5U=O2p;x5U+=P8e;conf[x5U][Q9j](p8D,r8D);}return conf[H5U][g9U];},set:function(conf,val){var O8D="hasDatepi";var U8D="cha";var R8D="epicker";var I9D="setDa";var v5U=O8D;v5U+=b1j;v5U+=J6p;var m5U=Q2p;m5U+=R8D;if($[m5U] && conf[A5D][l8p](v5U)){var o5U=U8D;o5U+=G6p;o5U+=H4p;var N5U=I9D;N5U+=J2p;N5U+=q6p;conf[A5D][V9D](N5U,val)[o5U]();}else {var A5U=d6p;A5U+=Q0j;var q5U=q5D;q5U+=U5p;$(conf[q5U])[A5U](val);}},enable:function(conf){var C9D="epi";var D9D="ker";var g9D="epick";var Y5U=Q2p;z0v.h0v();Y5U+=C9D;Y5U+=n1p;Y5U+=D9D;if($[Y5U]){var W5U=Q2p;W5U+=g9D;W5U+=J6p;var s5U=O2p;s5U+=T6p;s5U+=C4D;s5U+=U5p;conf[s5U][W5U](f1W);}else {var G5U=v6p;G5U+=f8p;$(conf[A5D])[G5U](u6D,i5p);}},disable:function(conf){var B9D="datepicke";var k9D="disa";if($[V9D]){var S5U=k9D;S5U+=c5j;S5U+=q6p;var u5U=B9D;u5U+=m6p;var b5U=q0D;b5U+=J2p;conf[b5U][u5U](S5U);}else {var f5U=y2p;f5U+=r3p;f5U+=y2p;$(conf[A5D])[f5U](u6D,d5p);}},owns:function(conf,node){var d9D='div.ui-datepicker';z0v.h0v();var K9D="v.ui-datepicker";var i9D="-header";var F5U=s2p;F5U+=q6p;F5U+=H6j;F5U+=p7p;var z5U=g1p;z5U+=K9D;z5U+=i9D;var l5U=I1j;l5U+=v2W;return $(node)[L2W](d9D)[K5p] || $(node)[l5U](z5U)[F5U]?d5p:i5p;}});fieldTypes[J9D]=$[f0p](d5p,{},baseFieldType,{create:function(conf){var w9D="etim";var W9D="_closeFn";var H9D="pic";var N9D="displayFormat";var x9D="DateT";var m9D="afeId";var A9D="yd";var X9D="eF";var v9D='<input />';var q9D="keyInput";var R5U=O2p;R5U+=R5p;R5U+=y2p;R5U+=U5p;var O5U=n1p;O5U+=Q4p;O5U+=Y6p;O5U+=q6p;var E5U=R9j;E5U+=Y6p;E5U+=X9D;E5U+=G6p;var n5U=f8p;n5U+=F6p;var M5U=V1j;M5U+=J2p;M5U+=w9D;M5U+=q6p;var h5U=T6p;h5U+=B6p;h5U+=z0v.O9U;h5U+=G6p;var c5U=z0v.R9U;c5U+=L3p;c5U+=w2p;c5U+=R0j;var T5U=S4W;T5U+=J2p;T5U+=g3p;T5U+=x6p;var L5U=O2p;L5U+=T6p;L5U+=E8e;var t5U=x9D;t5U+=s8e;var Z5U=O2p;Z5U+=H9D;Z5U+=L9j;Z5U+=m6p;var P5U=J2p;P5U+=S4W;P5U+=J2p;var Q5U=T6p;Q5U+=x6p;z0v.h0v();var y5U=Y6p;y5U+=m9D;var e5U=R0j;e5U+=J2p;e5U+=m6p;conf[A5D]=$(v9D)[e5U]($[f0p](d5p,{id:Editor[y5U](conf[Q5U]),type:P5U},conf[Q9j]));conf[Z5U]=new Editor[t5U](conf[L5U],$[T5U]({format:conf[N9D] || conf[c5U],i18n:this[h5U][M5U]},conf[n5U]));conf[E5U]=function(){var a5U=p7p;a5U+=T6p;a5U+=t2p;z0v.F0v();conf[o9D][a5U]();};if(conf[q9D] === i5p){var p5U=L9j;p5U+=A9D;p5U+=z0v.M9U;p5U+=Y1j;var j5U=q0D;j5U+=J2p;conf[j5U][W8p](p5U,function(e){var s9D="tDefault";z0v.h0v();var Y9D="preven";var r5U=Y9D;r5U+=s9D;e[r5U]();});}this[W8p](O5U,conf[W9D]);return conf[R5U][g9U];},get:function(conf){var G9D="ntSt";var f9D="forma";var S9D="ocale";var b9D="ict";var u9D="tL";var C0U=a4D;C0U+=G9D;C0U+=m6p;C0U+=b9D;var V0U=a4D;V0U+=G6p;V0U+=u9D;V0U+=S9D;var I0U=f9D;I0U+=J2p;var U5U=O2p;U5U+=y2p;U5U+=c8D;var val=conf[A5D][H1p]();var inst=conf[U5U][n1p];return val && conf[l9D] && moment?moment(val,inst[I0U],inst[V0U],inst[C0U])[e0e](conf[l9D]):val;},set:function(conf,val){var F9D="momen";var e9D="tSt";var Q9D="Locale";var P9D="_pi";var y9D="rict";var Z9D="cke";var z9D="rmat";var B0U=z0v.R9U;B0U+=z0v.M9U;B0U+=z9D;var k0U=F9D;k0U+=e9D;k0U+=y9D;var g0U=u8e;g0U+=Q9D;var D0U=P9D;D0U+=Z9D;D0U+=m6p;var inst=conf[o9D][n1p];conf[D0U][H1p](val && conf[l9D] && moment?moment(val,conf[l9D],inst[g0U],inst[k0U])[B0U](inst[e0e]):val);_triggerChange(conf[A5D]);},owns:function(conf,node){var t9D="own";var L9D="_pick";var i0U=t9D;i0U+=Y6p;var K0U=L9D;K0U+=q6p;K0U+=m6p;z0v.h0v();return conf[K0U][i0U](node);},errorMessage:function(conf,msg){var T9D="errorMsg";var d0U=p0j;d0U+=e2W;d0U+=J6p;conf[d0U][T9D](msg);},destroy:function(conf){var c9D="loseF";z0v.h0v();var w0U=I8j;w0U+=c9D;w0U+=G6p;var X0U=P4p;X0U+=Y2j;X0U+=q6p;var J0U=z0v.M9U;J0U+=D1W;this[J0U](X0U,conf[w0U]);conf[A5D][d4j](h9W);conf[o9D][X1W]();},minDate:function(conf,min){var h9D="min";z0v.h0v();conf[o9D][h9D](min);},maxDate:function(conf,max){var M9D="picker";var H0U=w2p;H0U+=z0v.C6p;H0U+=Z6p;var x0U=O2p;x0U+=M9D;conf[x0U][H0U](max);}});fieldTypes[m0U]=$[v0U](d5p,{},baseFieldType,{create:function(conf){var editor=this;z0v.F0v();var container=_commonUpload(editor,conf,function(val){var n9D='postUpload';var N0U=G6p;N0U+=z0v.C6p;N0U+=w2p;N0U+=q6p;Editor[u0p][U4W][U6j][T8p](editor,conf,val[g9U]);editor[T3W](n9D,[conf[N0U],val[g9U]]);});return container;},get:function(conf){return conf[b5D];},set:function(conf,val){var B6l='noClear';var j9D="ditor";var U9D="lue button";var k6l="earText";var I6l='div.rendered';var V6l="ispla";var O9D="Tex";var K6l="noCle";var p9D="iggerHandle";var a9D="upload.";var g6l='No file';var C6l="noFil";var r9D="cle";var R9D="div.clearVa";var P0U=E9D;P0U+=s2p;var Q0U=a9D;Q0U+=q6p;Q0U+=j9D;var y0U=q7j;y0U+=p9D;y0U+=m6p;var e0U=T6p;e0U+=C4D;e0U+=m2p;e0U+=J2p;var F0U=g7D;F0U+=G6p;F0U+=G4e;F0U+=J2p;var f0U=r9D;f0U+=M6W;f0U+=O9D;f0U+=J2p;var S0U=R9D;S0U+=U9D;var u0U=z0v.R9U;u0U+=R2D;var q0U=g7D;q0U+=C4D;q0U+=m2p;q0U+=J2p;var o0U=E9D;o0U+=s2p;conf[o0U]=val;var container=conf[q0U];if(conf[O9p]){var A0U=z0v.R9U;A0U+=T6p;A0U+=G6p;A0U+=x6p;var rendered=container[A0U](I6l);if(conf[b5D]){var s0U=x6p;s0U+=V6l;s0U+=W2p;var Y0U=p7p;Y0U+=J2p;Y0U+=w2p;Y0U+=s2p;rendered[Y0U](conf[s0U](conf[b5D]));}else {var b0U=C6l;b0U+=D6l;b0U+=Z6p;b0U+=J2p;var G0U=z0v.C6p;G0U+=W5j;G0U+=L6p;var W0U=q6p;W0U+=w2p;W0U+=M2D;W0U+=W2p;rendered[W0U]()[G0U](Q1D + (conf[b0U] || g6l) + D8p);}}var button=container[u0U](S0U);if(val && conf[f0U]){var l0U=n1p;l0U+=s2p;l0U+=k6l;button[g6j](conf[l0U]);container[N9j](B6l);}else {var z0U=K6l;z0U+=M6W;container[u9p](z0U);}conf[F0U][E6W](e0U)[y0U](Q0U,[conf[P0U]]);},enable:function(conf){var d6l="bled";var c0U=O2p;c0U+=q6p;c0U+=i6l;var T0U=x6p;z0v.h0v();T0U+=a8p;T0U+=z0v.C6p;T0U+=d6l;var L0U=v6p;L0U+=f8p;var t0U=R5p;t0U+=y6D;var Z0U=O2p;Z0U+=T6p;Z0U+=M9p;Z0U+=J2p;conf[Z0U][E6W](t0U)[L0U](T0U,i5p);conf[c0U]=d5p;},disable:function(conf){var M0U=x6p;M0U+=a8p;M0U+=k6D;var h0U=T6p;h0U+=G6p;h0U+=G4e;h0U+=J2p;conf[A5D][E6W](h0U)[s5D](M0U,d5p);conf[h7D]=i5p;},canReturnSubmit:function(conf,node){return i5p;}});fieldTypes[J6l]=$[n0U](d5p,{},baseFieldType,{_showHide:function(conf){z0v.h0v();var m6l="limit";var w6l="itLeft";var H6l="_container";var X6l="_lim";var x6l="limitHide";var U0U=X6l;U0U+=w6l;var R0U=V9p;R0U+=G6p;R0U+=q6p;var O0U=B2j;O0U+=w2p;O0U+=T6p;O0U+=J2p;var r0U=T1j;r0U+=G6p;r0U+=c1j;r0U+=p7p;var p0U=n1j;p0U+=Y6p;var j0U=c3j;j0U+=x6l;var a0U=z0v.R9U;a0U+=T6p;a0U+=L6p;var E0U=s2p;E0U+=T6p;E0U+=P2e;if(!conf[E0U]){return;}conf[H6l][a0U](j0U)[p0U](f6j,conf[b5D][r0U] >= conf[O0U]?R0U:l6j);conf[U0U]=conf[m6l] - conf[b5D][K5p];},create:function(conf){var A6l='button.remove';var q6l='multi';var H8U=O2p;H8U+=m2W;H8U+=c3p;H8U+=w9p;var B8U=z0v.M9U;B8U+=G6p;var k8U=O8p;k8U+=J9p;var editor=this;var container=_commonUpload(editor,conf,function(val){var v6l="load";var N6l="uploadM";var o6l="concat";var g8U=O2p;g8U+=d6p;g8U+=z0v.C6p;g8U+=s2p;var D8U=q0p;D8U+=S6p;var C8U=A2e;C8U+=Y4p;C8U+=W1j;C8U+=v6l;var V8U=N6l;V8U+=x4e;var I8U=O2p;I8U+=H1p;conf[b5D]=conf[I8U][o6l](val);z0v.h0v();Editor[u0p][V8U][U6j][T8p](editor,conf,conf[b5D]);editor[T3W](C8U,[conf[D8U],conf[g8U]]);},d5p);container[k8U](q6l)[B8U](G8p,A6l,function(e){var s6l="dM";var Y6l="stopPropagation";var K8U=O2p;K8U+=q6p;K8U+=i6l;e[Y6l]();if(conf[K8U]){var x8U=O2p;x8U+=d6p;x8U+=z0v.C6p;x8U+=s2p;var w8U=h9j;w8U+=C8W;var X8U=G7W;X8U+=O4D;X8U+=s6l;X8U+=x4e;var J8U=O2p;J8U+=d6p;J8U+=z0v.C6p;J8U+=s2p;var d8U=T6p;d8U+=x6p;d8U+=Z6p;var i8U=x6p;i8U+=z0v.C6p;i8U+=W4j;var idx=$(this)[i8U](d8U);conf[J8U][N0j](idx,k9U);Editor[u0p][X8U][U6j][w8U](editor,conf,conf[x8U]);}});conf[H8U]=container;return container;},get:function(conf){return conf[b5D];},set:function(conf,val){var L6l="</s";var b6l="dType";var T6l="pan";var c6l="No ";var f6l="v.rendered";var z6l="l>";var W6l="iggerHandl";var u6l="Upload collections must hav";var h6l="oFil";var M6l='upload.editor';var l6l="<ul></u";var G6l="_showH";var S6l="e an array as a value";var L8U=E9D;L8U+=s2p;var t8U=q7j;t8U+=W6l;z0v.F0v();t8U+=J6p;var Z8U=z0v.R9U;Z8U+=T6p;Z8U+=G6p;Z8U+=x6p;var P8U=q0D;P8U+=J2p;var Q8U=G6l;Q8U+=T4D;var y8U=A0p;y8U+=b6l;y8U+=Y6p;var N8U=O2p;N8U+=d6p;N8U+=z0v.C6p;N8U+=s2p;var m8U=T6p;m8U+=Y6p;m8U+=C4p;m8U+=u4W;if(!val){val=[];}if(!$[m8U](val)){var v8U=u6l;v8U+=S6l;throw v8U;}conf[N8U]=val;var that=this;var container=conf[A5D];if(conf[O9p]){var o8U=g1p;o8U+=f6l;var rendered=container[E6W](o8U)[G9j]();if(val[K5p]){var A8U=c1W;A8U+=p7p;var q8U=l6l;q8U+=z6l;var list=$(q8U)[q3j](rendered);$[A8U](val,function(i,file){var e6l="button>";var Z6l=' <button class="';var y6l=" remov";var t6l='</li>';var P6l="<li";var F6l=">&times;<";var Q6l="e\" data-idx=\"";var S8U=S5p;S8U+=F6l;S8U+=e5p;S8U+=e6l;var u8U=y6l;u8U+=Q6l;var b8U=u4p;b8U+=T5e;b8U+=G6p;var G8U=z0v.R9U;G8U+=z0v.M9U;G8U+=m6p;G8U+=w2p;var W8U=v8p;W8U+=P6j;W8U+=W2p;var s8U=P6l;s8U+=f5p;var Y8U=z0v.C6p;Y8U+=i4D;Y8U+=g3p;Y8U+=x6p;list[Y8U](s8U + conf[W8U](file,i) + Z6l + that[x9p][G8U][b8U] + u8U + i + S8U + t6l);});}else {var e8U=L6l;e8U+=T6l;e8U+=f5p;var F8U=c6l;F8U+=I5p;var z8U=G6p;z8U+=h6l;z8U+=D6l;z8U+=I4W;var l8U=L0e;l8U+=z0v.C6p;l8U+=G6p;l8U+=f5p;var f8U=s2j;f8U+=q6p;f8U+=G6p;f8U+=x6p;rendered[f8U](l8U + (conf[z8U] || F8U) + e8U);}}Editor[y8U][J6l][Q8U](conf);conf[P8U][Z8U](z0D)[t8U](M6l,[conf[L8U]]);},enable:function(conf){var h8U=x6p;h8U+=a8p;h8U+=k6D;var c8U=z0v.R9U;c8U+=T6p;c8U+=G6p;c8U+=x6p;var T8U=q0D;T8U+=J2p;conf[T8U][c8U](z0D)[s5D](h8U,i5p);conf[h7D]=d5p;},disable:function(conf){var a8U=S8D;a8U+=c8j;var E8U=V9e;E8U+=m2p;E8U+=J2p;var n8U=r9j;n8U+=G6p;n8U+=x6p;var M8U=f0D;M8U+=y2p;M8U+=U5p;conf[M8U][n8U](E8U)[s5D](a8U,d5p);conf[h7D]=i5p;},canReturnSubmit:function(conf,node){return i5p;}});})();if(DataTable[I2p][n6l]){var O8U=E6l;O8U+=s2p;O8U+=r5j;var r8U=q6p;r8U+=I4W;var p8U=z0v.R9U;p8U+=n9j;p8U+=x6p;p8U+=D7D;var j8U=b0p;j8U+=L6p;$[j8U](Editor[p8U],DataTable[r8U][O8U]);}DataTable[I2p][R8U]=Editor[u0p];Editor[U8U]={};Editor[I9U][a6l]=V9U;Editor[C9U]=D9U;return Editor;});

/*! Bootstrap integration for DataTables' Editor
 * ©2015 SpryMedia Ltd - datatables.net/license
 */

(function( factory ){
	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( ['jquery', 'datatables.net-bs4', 'datatables.net-editor'], function ( $ ) {
			return factory( $, window, document );
		} );
	}
	else if ( typeof exports === 'object' ) {
		// CommonJS
		module.exports = function (root, $) {
			if ( ! root ) {
				root = window;
			}

			if ( ! $ || ! $.fn.dataTable ) {
				$ = require('datatables.net-bs4')(root, $).$;
			}

			if ( ! $.fn.dataTable.Editor ) {
				require('datatables.net-editor')(root, $);
			}

			return factory( $, root, root.document );
		};
	}
	else {
		// Browser
		factory( jQuery, window, document );
	}
}(function( $, window, document, undefined ) {
'use strict';
var DataTable = $.fn.dataTable;


/*
 * Set the default display controller to be our bootstrap control 
 */
DataTable.Editor.defaults.display = "bootstrap";


/*
 * Alter the buttons that Editor adds to TableTools so they are suitable for bootstrap
 */
var i18nDefaults = DataTable.Editor.defaults.i18n;
i18nDefaults.create.title = '<h5 class="modal-title">'+i18nDefaults.create.title+'</h5>';
i18nDefaults.edit.title = '<h5 class="modal-title">'+i18nDefaults.edit.title+'</h5>';
i18nDefaults.remove.title = '<h5 class="modal-title">'+i18nDefaults.remove.title+'</h5>';

var tt = DataTable.TableTools;
if ( tt ) {
	tt.BUTTONS.editor_create.formButtons[0].className = "btn btn-primary";
	tt.BUTTONS.editor_edit.formButtons[0].className = "btn btn-primary";
	tt.BUTTONS.editor_remove.formButtons[0].className = "btn btn-danger";
}


/*
 * Change the default classes from Editor to be classes for Bootstrap
 */
$.extend( true, $.fn.dataTable.Editor.classes, {
	"header": {
		"wrapper": "DTE_Header modal-header"
	},
	"body": {
		"wrapper": "DTE_Body modal-body"
	},
	"footer": {
		"wrapper": "DTE_Footer modal-footer"
	},
	"form": {
		"tag": "form-horizontal",
		"button": "btn",
		"buttonInternal": "btn btn-outline-secondary"
	},
	"field": {
		"wrapper": "DTE_Field form-group row",
		"label":   "col-lg-4 col-form-label",
		"input":   "col-lg-8",
		"error":   "error is-invalid",
		"msg-labelInfo": "form-text text-secondary small",
		"msg-info":      "form-text text-secondary small",
		"msg-message":   "form-text text-secondary small",
		"msg-error":     "form-text text-danger small",
		"multiValue":    "card multi-value",
		"multiInfo":     "small",
		"multiRestore":  "card multi-restore"
	}
} );

$.extend( true, DataTable.ext.buttons, {
	create: {
		formButtons: {
			className: 'btn-primary'
		}
	},
	edit: {
		formButtons: {
			className: 'btn-primary'
		}
	},
	remove: {
		formButtons: {
			className: 'btn-danger'
		}
	}
} );


/*
 * Bootstrap display controller - this is effectively a proxy to the Bootstrap
 * modal control.
 */

DataTable.Editor.display.bootstrap = $.extend( true, {}, DataTable.Editor.models.displayController, {
	/*
	 * API methods
	 */
	"init": function ( dte ) {
		var conf = {
			// Note that `modal-dialog-scrollable` is BS4.3+ only. It has no effect on 4.0-4.2
			content: $(
				'<div class="modal fade DTED">'+
					'<div class="modal-dialog modal-dialog-scrollable"></div>'+
				'</div>'
			),
			close: $('<button class="close">&times;</div>')
				.attr('title', dte.i18n.close)
				.on('click', function () {
					dte.close('icon');
				}),
			shown: false,
			fullyShow: false
		}

		// This is a bit horrible, but if you mousedown and then drag out of the modal container, we don't
		// want to trigger a background action.
		var allowBackgroundClick = false;
		$(document).on('mousedown', 'div.modal', function (e) {
			allowBackgroundClick = $(e.target).hasClass('modal') && conf.shown
				? true
				: false;
		} );

		$(document).on('click', 'div.modal', function (e) {
			if ( $(e.target).hasClass('modal') && allowBackgroundClick ) {
				dte.background();
			}
		} );

		// Add `form-control` to required elements
		dte.on( 'displayOrder.dtebs', function ( e, display, action, form ) {
			$.each( dte.s.fields, function ( key, field ) {
				$('input:not([type=checkbox]):not([type=radio]), select, textarea', field.node() )
					.addClass( 'form-control' );
			} );
		} );

		dte._bootstrapDisplay = conf;

		return DataTable.Editor.display.bootstrap;
	},

	"open": function ( dte, append, callback ) {
		var conf = dte._bootstrapDisplay;

		$(append).addClass('modal-content');

		if ( conf._shown ) {
			// Modal already up, so just draw in the new content
			var content = conf.content.find('div.modal-dialog');
			content.children().detach();
			content.append( append );

			if ( callback ) {
				callback();
			}
			return;
		}

		conf.shown = true;
		conf.fullyDisplayed = false;

		var content = conf.content.find('div.modal-dialog');
		content.children().detach();
		content.append( append );

		$('div.modal-header', append).append( conf.close );

		$(conf.content)
			.one('shown.bs.modal', function () {
				// Can only give elements focus when shown
				if ( dte.s.setFocus ) {
					dte.s.setFocus.focus();
				}

				conf.fullyDisplayed = true;

				if ( callback ) {
					callback();
				}
			})
			.one('hidden', function () {
				conf.shown = false;
			})
			.appendTo( 'body' )
			.modal( {
				backdrop: "static",
				keyboard: false
			} );
	},

	"close": function ( dte, callback ) {
		var conf = dte._bootstrapDisplay;

		if ( !conf.shown ) {
			if ( callback ) {
				callback();
			}
			return;
		}

		// Check if actually displayed or not before hiding. BS4 doesn't like `hide`
		// before it has been fully displayed
		if ( ! conf.fullyDisplayed ) {
			$(conf.content)
				.one('shown.bs.modal', function () {
					conf.close( dte, callback );
				} );

			return;
		}

		$(conf.content)
			.one( 'hidden.bs.modal', function () {
				$(this).detach();
			} )
			.modal('hide');

		conf.shown = false;
		conf.fullyDisplayed = false;

		if ( callback ) {
			callback();
		}
	},

	node: function ( dte ) {
		return dte._bootstrapDisplay.content[0];
	}
} );


return DataTable.Editor;
}));


