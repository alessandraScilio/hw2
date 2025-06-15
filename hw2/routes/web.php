<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\IndexController;
use App\Http\Controllers\SignupController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\ResetController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\AccountController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\FlightController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\PaymentController;

Route::get('/index', [IndexController::class, 'index'])->name('index');

Route::get('/login', [LoginController::class, 'login_form'])->name('login.form');
Route::post('/login', [LoginController::class, 'do_login'])->name('do_login.form');

Route::get('/signup', [SignupController::class, 'signup_form'])->name('signup.form');
Route::post('/signup', [SignupController::class, 'do_signup'])->name('do.form');

Route::get('/reset', [ResetController::class, 'reset_form'])->name('reset.form');
Route::post('/reset', [ResetController::class, 'do_reset'])->name('do_reset.form');

Route::get('/home', [HomeController::class, 'home'])->name('home');
Route::get('list', [HomeController::class, 'list']);

Route::get('/flight', [FlightController::class, 'flight'])->name('flight');
Route::post('/search', [FlightController::class, 'search']);

Route::post('/check_flight', [BookingController::class, 'check_flight']);
Route::post('/book_flight', [BookingController::class, 'book_flight']);
Route::get('/show_bookings',  [BookingController::class, 'show_bookings'] );
Route::post('/delete_booking', [BookingController::class, 'delete_booking']);

Route::get('/payment', [PaymentController::class, 'payment'])->name('payment');
Route::get('payment_form', [PaymentController::class, 'payment_form']);
Route::post('/do_payment', [PaymentController::class, 'do_payment'])->name('do_payment');
Route::get('thanks', [PaymentController::class, 'thanks'])->name('thanks');
Route::get('/count', [PaymentController::class, 'count']);

Route::get('/article', [ArticleController::class, 'article'])->name('article');
Route::post('/search_article', [ArticleController::class, 'search_article']);
Route::get('/article/{id}', [ArticleController::class, 'show']);
Route::post('/status', [ArticleController::class, 'status']);
Route::post('/like', [ArticleController::class, 'like']);
Route::post('/unlike', [ArticleController::class, 'unlike']);

Route::get('/account', [AccountController::class, 'account'])->name('account');
Route::post('/favs', [AccountController::class, 'favs']);

Route::get('logout', [SignupController::class, 'logout'])->name('logout');
