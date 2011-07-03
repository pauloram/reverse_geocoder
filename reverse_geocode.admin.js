jQuery(document).ready(function(){
	reverse_geocode_admin_handler_filter();
});

function reverse_geocode_admin_handler_filter() {
  var field = jQuery('#edit-instance-widget-settings-reverse-geocode-field').val();
  var field_type = Drupal.settings.reverse_geocode_widget_settings.types[field];
  var valid_handlers = Drupal.settings.reverse_geocode_widget_settings.handlers[field_type];
  
  // Filter the options list to ones that are valid for this field
  jQuery('#edit-instance-widget-settings-reverse-geocode-handler option').each(function() {
  	handler_type = jQuery(this).val();
  	if (reverse_geocode_admin_handler_in_array(handler_type,valid_handlers)) {
  	  jQuery(this).css('display','inline');
  	}
  	else {
  		jQuery(this).css('display','none');
  	}
  });
  
  // If the currently selected handler is not valid, set it to the first valid handler
  if (!reverse_geocode_admin_handler_in_array(jQuery('#edit-instance-widget-settings-reverse-geocode-handler').val(),valid_handlers)) {
  	jQuery('#edit-instance-widget-settings-reverse-geocode-handler').val(valid_handlers[0]);
  }
}

function reverse_geocode_admin_handler_in_array(needle, haystack) {
  var length = haystack.length;
  for(var i = 0; i < length; i++) {
    if(haystack[i] == needle) return true;
  }
  return false;
}