<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Http\Request;
use Session;

class SignupController extends BaseController
{
    public function signup_form()
    {
        if (Session::get('user_id')){
            return redirect('home');
        }
        $error = Session::get('error');
        Session::forget('error');
        return view('signup')->with('error', $error);
    }


    public function do_signup()
    {

        if (Session::get('user_id')){
            return redirect('home');
        }

        if (
            strlen(request('username')) == 0 ||
            strlen(request('email')) == 0 ||
            strlen(request('password')) == 0 ||
            strlen(request('password_confirmation')) == 0
        ) {
            Session::put('error', 'empty_fields');
            return redirect('signup')->withInput();
        } 
        else if (request('password') !== request('password_confirmation')) 
        {
            Session::put('error', 'bad_passwords');
            return redirect('signup')->withInput();
        } 
        else if (User::where('username', request('username'))->first()) {
            Session::put('error', 'existing');
            return redirect('signup')->withInput();
        } 
        else if (User::where('email', request('email'))->first()) {
            Session::put('error', 'existing_email');
            return redirect('signup')->withInput();
        } 
        else if (strlen(request('password')) < 8) {
            Session::put('error', 'short_password');
            return redirect('signup')->withInput();
        }
        else if (!preg_match('/^[a-zA-Z0-9_]{1,15}$/', request('username'))) {
            Session::put('error', 'invalid_username');
            return redirect('signup')->withInput();
        }
        else if (
            !preg_match('/[A-Z]/', request('password')) ||
            !preg_match('/[0-9]/', request('password')) ||
            !preg_match('/[!@#$%^&*]/', request('password'))
        ) {
            Session::put('error', 'incomplete_password');
            return redirect('signup')->withInput();
        } 
        else if (!request()->has('allow')) {
            Session::put('error', 'unaccepted_terms');
            return redirect('signup')->withInput();
        }

        $user = new User();
        $user->username = request('username');
        $user->email = strtolower(request('email'));
        $user->password = Hash::make(request('password'));
        $user->save();

        Session::put('user_id', $user->id);
        return redirect('home');
    }

    public function logout(){
        Session::flush();
        return redirect('login');
    }

    public function check_username(Request $request){
        $username = request('username');
        $exists = User::where('username', $username)->exists();
        return response()->json(['exists' => $exists]);
    }

    public function check_email(Request $request){
        $email = request('email');
        $exists = User::where('email', $email)->exists();
        return response()->json(['exists' => $exists]);
    }


}
