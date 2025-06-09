<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Session;

class LoginController extends BaseController
{
    public function login_form()
    {
        if (Session::get('user_id')){
            return redirect('home');
        }
        $error = Session::get('error');
        Session::forget('error');
        return view('login')->with('error', $error);
    }

    public function do_login()
    {

        if (Session::get('user_id')){
            return redirect('home');
        }

        if (
            strlen(request('email')) == 0 || strlen(request('password')) == 0) 
            {
            Session::put('error', 'empty_fields');
            return redirect('login')->withInput();
        } 

        $user = User::where('email', request('email'))->first();

        if(!$user || !password_verify(request('password'), $user->password)){
            Session::put('error', 'wrong_credentials');
            return redirect('login')->withInput();
        }

        Session::put('user_id', $user->id);
        return redirect('home');
    }

    public function logout(){
        Session::flush();
        return redirect('login');
    }

}
