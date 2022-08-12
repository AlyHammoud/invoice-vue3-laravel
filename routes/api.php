<?php

use App\Http\Controllers\CustomerController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\ProductController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('/get_all_invoices', [InvoiceController::class, 'get_all_invoices']);
Route::get('/search_invoice', [InvoiceController::class, 'search_invoice']);
Route::post('/create_invoice', [InvoiceController::class, 'create_invoice']);
Route::get('/customers', [CustomerController::class, 'all_customers']);
Route::get('/products', [ProductController::class, 'all_products']);
Route::post('/saveInvoice', [InvoiceController::class, 'saveInvoice']);

Route::get('/show_invoice/{id}', [InvoiceController::class, 'show_invoice']);
Route::get('/edit_invoice/{id}', [InvoiceController::class, 'edit_invoice']);
