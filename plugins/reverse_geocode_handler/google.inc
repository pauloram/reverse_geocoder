<?php
// $Id$

/**
 * @file
 * Plugin to provide a google geocoder.
 */

/**
 * Plugins are described by creating a $plugin array which will be used
 * by the system that includes this file.
 */
$plugin = array(
  'title' => t("Reverse Google Geocoder"),
  'description' => t('Reverse geocodes via google geocoder'),
  'callback' => 'reverse_geocode_google',
  'field_types' => array('geofield'),
  'field_callback' => 'reverse_geocode_google_field',
);

/**
 * Process Markup
 */
function reverse_geocode_google($latitude, $longitude) {
  
  reverse_geocode_load_geophp();

  $point = new Point($longitude,$latitude);
  $googlegeocoder = new GoogleGeocode();

  $location = $googlegeocoder->write($point,'array');
  
  $levels = array('administrative_area_level_3', 'locality', 'country');
  foreach ($levels as $level){
    // Look for the first location marked as a set level
    foreach($location as $loc){
      if (in_array($level, $loc->types)){return $loc->short_name;}
    }
  }
}

function reverse_geocode_google_field($field, $field_item) {
  return reverse_geocode_google($field_item['lat'], $field_item['lon']);
}