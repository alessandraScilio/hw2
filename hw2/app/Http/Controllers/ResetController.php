<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Session;

class ResetController extends BaseController
{
    public function reset_form()
    {
        $error = Session::get('error');
        Session::forget('error');
        return view('reset')->with('error', $error);
    }

    public function do_reset()
    {
        if (
            strlen(request('email')) == 0 ||
            strlen(request('password')) == 0 ||
            strlen(request('password_confirmation')) == 0
        ) {
            Session::put('error', 'empty_fields');
            return redirect('reset')->withInput();
        } 
        else if (request('password') !== request('password_confirmation')) 
        {
            Session::put('error', 'bad_passwords');
            return redirect('reset')->withInput();
        } 
        else if (!User::where('email', request('email'))->first()) {
            Session::put('error', 'non_existing_email');
            return redirect('reset')->withInput();
        } 
       else if (
        !preg_match('/[A-Z]/', request('password')) ||     
        !preg_match('/[0-9]/', request('password')) ||     
        !preg_match('/[!@#$%^&*]/', request('password')) || 
        strlen(request('password')) < 8                    
        ) 
        {
            Session::put('error', 'incomplete_password');
            return redirect('reset')->withInput();
}

        $user = User::where('email', strtolower(request('email')))->first();

        if ($user) {
        $user->password = Hash::make(request('password'));
        $user->save();
        Session::put('user_id', $user->id);
        return redirect('home');
    }

        
    }

    
}
