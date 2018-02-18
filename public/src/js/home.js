let $ = require('jquery'); //86kb
let dataTables = require( 'datatables.net' );



$( document ).ready( function () {

	$('table.balance').DataTable({
		"columnDefs": [
			{ "orderable": false, "targets": 'nosort' }
		],
		"autoWidth": false,
		"paging": false,
		"initComplete": function () {}
	});

});