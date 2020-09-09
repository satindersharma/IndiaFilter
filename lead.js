function split( val ) {
	return val.split( /,\s*/ );
}

function extractLast( term ) {
	return split( term ).pop();
}


function citiesListByDistrict(districtName) {
	$.ajax({
		url: $('#cities_url').html()+'/'+districtName+'/lead',
		context: document.body
	}).done(function(data) {
		$("#citiesList").html(data);
		if( $("#chooseCity").val() == '' ) {
			$("#pincodeList").html('<label>Pincode</label><div class="input text"><input type="text" name="l_pincode" id="choosePincode" class="form-control"></div>');
		}
	});	
}

function initdatepicker(){
	$( '.datepicker' ).datepicker({
		format: 'yyyy-mm-dd',		
		autoclose: true,
		todayHighlight: true,
	});
}

jQuery(document).ready(function() {
	
	jQuery(document).on('change', '#chooseCity', function() {
		$.ajax({
			url: $('#pincode_url').html()+'/'+$(this).val()+'/l_pincode',
			context: document.body
		}).done(function(data) {
			$("#pincodeList").html(data);
			
		});	
	});
	
	$(document).ready(function() {
		
		$('#leadsListTable').DataTable( {
			"processing": true,
			"serverSide": true,
			"order": [[ 0, "desc" ]],
			"ajax": $('#datatables_url').html()			
		});
		
		$('#leadsFollowupListTable').DataTable({
			ajax: $('#followup_datatable_url').html()+'/'+$('#lead-id').html(),
			processing: true,
			serverSide: true,
			responsive: true,
			paging : false,
			info: false,
			searching: false,
		}).order( [ 0, 'desc' ] )
		.draw();
		
	});
	
	jQuery(document).on('click', '#addModal', function() {
		$('#load-modal-title').html('Add Lead');
		$('.modal-footer-body').html('<div class="modal-body"><div class="card-body">Content Loading.....</div></div>');
		jQuery.ajax({
			url: jQuery("#add_form").html(),
			success: function (response) {
				jQuery('.modal-footer-body').html(response);
				initdatepicker();
				
				$("#chooseDistrict")
					.on("keydown", function(event) { // don't navigate away from the field on tab when selecting an item
						if (event.keyCode === $.ui.keyCode.TAB &&
							$(this).autocomplete("instance").menu.active) {
							event.preventDefault();
						}
					})
					.autocomplete({
						source: function(request, response) {
							$.getJSON(jQuery("#districts_url").html()+'/'+request.term, {
								
							}, response);
						},
						search: function() {
							
							var term = extractLast(this.value);
							if (term.length < 1) {
								return false;
							}
						},
						select: function(event, ui) {
							var values = ui.item.value.split(',');
							this.value = values[0];
							$("#chooseState").val(values[1]);
							
							citiesListByDistrict(values[0]);
							
							return false;
						},
						response: function( event, ui ) {
							
						}
					});
				$( "#chooseDistrict" ).autocomplete( "option", "appendTo", "#add_lead" );
				
				
			}
		});
	});
	
	jQuery(document).on('click', '#createit', function(){
		var addOptions = {			
			url: $('#add_lead').attr('action'),
			dataType:  'json',
			beforeSubmit: function() {
				//$('#editit').prop('disabled', true);
			},
			success: function(data) {
				if(data['response'] == 'error') {
					var count = Object.keys(data).length;
					
					var messageStr = '';
					
					for(var i = 0; i < (count-1); i++) {
						messageStr = messageStr + '<div>'+data[i]+'</div>';
					}
					
					setMessage('danger', messageStr, 5000);
					
				} else {
					
					$("#defaultModel").modal("hide");
					
					$('#leadsListTable').DataTable().ajax.reload();
					
					resetForm(true, 'add_lead');
					
					setMessage('success', 'Record Save successfully', 1000);
					
				}
				//$('#editit').delay(3000).prop('disabled', false);				
			}
		};		
		jQuery('#add_lead').ajaxForm(addOptions);
	});
	
	jQuery(document).on('click', '.edit-modified-icon', function(){		
		$('.modal-footer-body').html('<div class="modal-body"><div class="card-body">Content Loading.....</div></div>');
		$('#load-modal-title').html('Edit Lead');
		
		jQuery.ajax({
			url: jQuery("#edit_form").html()+'/'+$(this).attr('id'),
			type: "get",
			success: function (response) {				
				jQuery('.modal-footer-body').html(response);
				initdatepicker();
			}
		});
		
	});
	
	jQuery(document).on('click', '#editit', function(){
		
		var editOptions = {
			url: $('#edit_lead').attr('action'),
			dataType:  'json',
			beforeSubmit: function() { 
				//$('#editit').prop('disabled', true);
			},
			success: function(data) {
				
				if(data['response'] == 'error') {
					var count = Object.keys(data).length;
					
					var messageStr = '';
					
					for(var i = 0; i < (count-1); i++) {
						messageStr = messageStr + '<div>'+data[i]+'</div>';
					}
					
					setMessage('danger', messageStr, 3000);
					
					
				} else {
					
					$("#defaultModel").modal("hide");
					
					$('#leadsListTable').DataTable().ajax.reload();
					
					resetForm(true, 'edit_lead');
					
					setMessage('success', 'Record Save successfully', 1000);
					
				}				
				//$('#editit').delay(3000).prop('disabled', false);				
			}
		};
		
		jQuery('#edit_lead').ajaxForm(editOptions);
		
	});
	
	
	jQuery(document).on('click', '.trigger-followup-icon', function(){		
		$('.modal-footer-body').html('<div class="modal-body"><div class="card-body">Content Loading.....</div></div>');
		$('#load-modal-title').html('Follow Up');
		
		jQuery.ajax({
			url: jQuery("#followup_url").html()+'/'+$(this).attr('id'),
			type: "get",
			success: function (response) {				
				jQuery('.modal-footer-body').html(response);
				initdatepicker();
			}
		});
		
	});
	
	jQuery(document).on('click', '#createFollowup', function(){
		
		var addOptions = {			
			url: $('#add_followup').attr('action'),
			dataType:  'json',
			beforeSubmit: function() {
				//$('#editit').prop('disabled', true);
			},
			success: function(data) {
				if(data['response'] == 'error') {
					var count = Object.keys(data).length;
					
					var messageStr = '';
					
					for(var i = 0; i < (count-1); i++) {
						messageStr = messageStr + '<div>'+data[i]+'</div>';
					}
					
					setMessage('danger', messageStr, 5000);
					
				} else {
					
					$("#defaultModel").modal("hide");
					
					$('#leadsListTable').DataTable().ajax.reload();
					
					setMessage('success', 'Record Save successfully', 1000);
					
				}
				//$('#editit').delay(3000).prop('disabled', false);				
			}
		};		
		jQuery('#add_followup').ajaxForm(addOptions);
	});

	
	$(document).on('click', '.trigger-followup-view-icon', function () {
		window.location.href = jQuery('#view_followup_url').html()+'/'+$(this).attr('id');
	});
	
	
	$(document).on('click', '.delete-trash-icon', function () {
		var save = '<button id="'+$(this).attr('id')+'" type="button" data-dismiss="modal" class="btn btn-primary confirm-delete">Confirm</button>';
		var close = '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>';
		
		$('.modal-footer').html(save+close);
	});
	
	$(document).on('click', '.confirm-delete', function () {
		
		var deleteURL = $('#delete_url').html()+'/'+$(this).attr('id');
		
		$.get( deleteURL, function( data ) {
			
			$('#categoriesListTable').DataTable().ajax.reload();
			
			setMessage('success', 'Record delete successfully.', 1000);
			
		});
	});
	
});