<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\OrderItemController;
use App\Http\Controllers\ShoppingCartController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\WishlistController;
use App\Http\Controllers\StatisticsController;

// Authentication routes
Route::post('/login', [AuthController::class, 'login'])->name('auth.login');
Route::post('/register', [UserController::class, 'store'])->name('auth.register');

// Protected routes
// Route::middleware('auth:sanctum')->group(function () {
    // User specific routes
    Route::prefix('users')->group(function () {
        Route::get('/', [UserController::class, 'index'])->name('users.index');
        Route::get('/{user}/edit', [UserController::class, 'edit'])->name('users.edit');
        Route::put('/{user}', [UserController::class, 'update'])->name('users.update');
        Route::delete('/{user}', [UserController::class, 'destroy'])->name('users.destroy');
        // Optional route for changing password
        Route::put('/{user}/change-password', [UserController::class, 'changePassword'])->name('users.changePassword');
    });

    // Category specific routes
    Route::prefix('categories')->group(function () {
        Route::get('/', [CategoryController::class, 'index'])->name('categories.index');
        Route::post('/create', [CategoryController::class, 'store'])->name('categories.store');
        Route::get('/{category}', [CategoryController::class, 'show'])->name('categories.show');
        Route::put('/{category}', [CategoryController::class, 'update'])->name('categories.update');
        Route::delete('/{category}', [CategoryController::class, 'destroy'])->name('categories.destroy');
        });
        
    // Product specific routes
    
    Route::prefix('products')->group(function () {
        Route::get('/', [ProductController::class, 'index'])->name('products.index');
        Route::post('/create', [ProductController::class, 'store'])->name('products.store');
        Route::get('/{product}', [ProductController::class, 'show'])->name('products.show');
        Route::put('/{product}', [ProductController::class, 'update'])->name('products.update');
        Route::delete('/{product}', [ProductController::class, 'destroy'])->name('products.destroy');
    });

    // Shopping Cart specific routes
    Route::prefix('cart')->group(function () {
        Route::post('/add', [ShoppingCartController::class, 'addToCart'])->name('cart.add');
        Route::post('/remove', [ShoppingCartController::class, 'removeFromCart'])->name('cart.remove');
        Route::put('/update', [ShoppingCartController::class, 'updateCartItem'])->name('cart.update');
        Route::get('/view/{user_id}', [ShoppingCartController::class, 'viewCart'])->name('cart.view');
    });

    // Payment specific routes
    Route::post('/payment', [PaymentController::class, 'processPayment'])->name('payment.process');
    Route::get('/payment/index', [PaymentController::class, 'index'])->name('payment.index');

    // Order specific routes
    Route::prefix('orders')->group(function () {
        Route::get('/', [OrderController::class, 'index'])->name('orders.index');
        Route::get('/{id}', [OrderController::class, 'show'])->name('orders.show');
        Route::post('/update/{id}', [OrderController::class, 'updateStatus'])->name('orders.updateStatus');
        Route::delete('/{order}', [OrderController::class, 'destroy'])->name('orders.destroy');
        Route::get('/{orderId}/products', [OrderController::class, 'getOrderProducts']);
    });

    // Wishlist specific routes
    Route::prefix('wishlist')->group(function () {
        Route::get('/', [WishlistController::class, 'index'])->name('wishlist.index');
        Route::post('/add', [WishlistController::class, 'store'])->name('wishlist.store');
        Route::delete('/remove/{id}', [WishlistController::class, 'destroy'])->name('wishlist.destroy');
    });

    // General logout route 
        Route::post('/logout', [AuthController::class, 'logout']);

    // });
    
    Route::get('/admin/create', [AuthController::class, 'createAdmin']);
    Route::post('/admin/login', [AuthController::class, 'loginAdmin']);


Route::get('/statistics', [StatisticsController::class, 'index']);