<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/*
| -------------------------------------------------------------------------
| URI ROUTING
| -------------------------------------------------------------------------
| This file lets you re-map URI requests to specific controller functions.
|
| Typically there is a one-to-one relationship between a URL string
| and its corresponding controller class/method. The segments in a
| URL normally follow this pattern:
|
|	example.com/class/method/id/
|
| In some instances, however, you may want to remap this relationship
| so that a different class/function is called than the one
| corresponding to the URL.
|
| Please see the user guide for complete details:
|
|	https://codeigniter.com/userguide3/general/routing.html
|
| -------------------------------------------------------------------------
| RESERVED ROUTES
| -------------------------------------------------------------------------
|
| There are three reserved routes:
|
|	$route['default_controller'] = 'welcome';
|
| This route indicates which controller class should be loaded if the
| URI contains no data. In the above example, the "welcome" class
| would be loaded.
|
|	$route['404_override'] = 'errors/page_missing';
|
| This route will tell the Router which controller/method to use if those
| provided in the URL cannot be matched to a valid route.
|
|	$route['translate_uri_dashes'] = FALSE;
|
| This is not exactly a route, but allows you to automatically route
| controller and method names that contain dashes. '-' isn't a valid
| class or method name character, so it requires translation.
| When you set this option to TRUE, it will replace ALL dashes with
| underscores in the controller and method URI segments.
|
| Examples:	my-controller/index	-> my_controller/index
|		my-controller/my-method	-> my_controller/my_method
*/
$route['default_controller'] = 'admin';
$route['translate_uri_dashes'] = FALSE;

// ===========================
// ADMIN ROUTES
// ===========================

// Login (POST)
$route['admin/login'] = 'admin/login';

// Get all admins (GET)
$route['admin'] = 'admin/index';

// Create new admin (POST)
$route['admin/create'] = 'admin/create';

// Get admin by ID (GET)
$route['admin/(:num)'] = 'admin/get_admin/$1';

// Update admin by ID (POST)
$route['admin/update/(:num)'] = 'admin/update/$1';

// Delete admin by ID (DELETE or POST)
$route['admin/delete/(:num)'] = 'admin/delete/$1';

// ===========================
// PRODUCT ROUTES
// ===========================

// Get all products or by ID (GET)
$route['admin/products'] = 'admin/products';
$route['admin/products/(:num)'] = 'admin/products/$1';

// Add new product (POST)
$route['admin/products/add'] = 'admin/add_product';

// Upload images to a product (POST)
$route['admin/products/upload-images/(:num)/(:any)'] = 'admin/upload_images/$1/$2';

// Delete image from product (DELETE or POST)
$route['admin/products/delete-image/(:num)/(:num)'] = 'admin/delete_image/$1/$2';

// Update product by ID (POST)
$route['admin/products/update/(:num)'] = 'admin/update_product/$1';

// Get stock info of a product (GET)
$route['admin/products/stock/(:num)'] = 'admin/get_product_stock/$1';

// Get product by name (GET)
$route['admin/products/name/(:any)'] = 'admin/get_product_by_name/$1';

// Delete product by ID (DELETE)
$route['admin/products/delete/(:num)'] = 'admin/delete_product/$1';

// ===========================
// ERROR HANDLING
// ===========================

// Custom 404 handler
$route['404_override'] = 'admin/not_found404';

