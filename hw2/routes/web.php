<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\IndexController;
use App\Http\Controllers\SignupController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\ResetController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\FlightController;
use App\Http\Controllers\BookingController;



// Homepage
Route::get('/index', [IndexController::class, 'index'])->name('index');

// Login
Route::get('/login', [LoginController::class, 'login_form'])->name('login.form');
Route::post('/login', [LoginController::class, 'do_login'])->name('do_login.form');


// Signup
Route::get('/signup', [SignupController::class, 'signup_form'])->name('signup.form');
Route::post('/signup', [SignupController::class, 'do_signup'])->name('do.form');

//Reset
Route::get('/reset', [ResetController::class, 'reset_form'])->name('reset.form');
Route::post('/reset', [ResetController::class, 'do_reset'])->name('do_reset.form');

// Home page
Route::get('/home', [HomeController::class, 'home'])->name('home');
Route::get('list', [HomeController::class, 'list']);

// Flights
Route::get('/flight', [FlightController::class, 'flight'])->name('flight');
Route::post('/search', [FlightController::class, 'search']);

// Bookings
Route::post('/check_flight', [BookingController::class, 'check_flight']);
Route::post('/book_flight', [BookingController::class, 'book_flight']);



// Articles
Route::get('/article', [ArticleController::class, 'article'])->name('article');


// Logout : aggiungilo nell'account
Route::get('logout', [SignupController::class, 'logout'])->name('logout');
