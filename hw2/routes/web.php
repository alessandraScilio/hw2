<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\IndexController;
use App\Http\Controllers\SignupController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\ResetController;



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


Route::get('logout', [SignupController::class, 'logout'])->name('logout');
