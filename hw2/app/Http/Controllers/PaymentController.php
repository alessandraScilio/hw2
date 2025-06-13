<?php

namespace App\Http\Controllers;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Log;
use App\Models\User;
use Session;

class PaymentController extends BaseController
{
    public function payment()
    {
        Log::info('PaymentController@payment called.');

        if (!Session::get('user_id')) {
            Log::warning('Accesso negato a payment: utente non loggato.');
            
            $error = Session::get('error');
            Session::forget('error');
            return view('login')->with('error', $error);
        }

        Log::info('Utente loggato, caricamento pagina payment.');
        return view('payment');
    }
}
