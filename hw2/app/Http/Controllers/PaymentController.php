<?php

namespace App\Http\Controllers;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Log;
use App\Models\User;
use App\Models\Booking;
use Stripe\Stripe;
use Stripe\Charge;

use Session;
use Illuminate\Http\Request;


class PaymentController extends BaseController
{
    public function payment()
    {
        if (!Session::get('user_id')) { 
            $error = Session::get('error');
            Session::forget('error');
            return view('login')->with('error', $error);
        }

        return redirect('payment_form');
    }

    public function payment_form()
    {
        return view('payment');
    }

    public function count(){
        $user_id = Session::get('user_id');
        $total = Booking::where('user_id', $user_id)->sum('price');
        return response()->json(['total' => $total]);
    }


       public function do_payment(Request $request)
    {
        Stripe::setApiKey(env('STRIPE_SECRET'));
        $user_id = Session::get('user_id');

        if (!$user_id) {
            return response()->json(['success' => false, 'message' => 'Utente non loggato'], 401);
        }

        $amount = (int) Booking::where('user_id', $user_id)->sum('price') * 100;

        if ($amount <= 0) {
            return response()->json(['success' => false, 'message' => 'Importo non valido'], 400);
        }

            $charge = Charge::create([
                'amount' => $amount,
                'currency' => 'eur',
                'source' => 'tok_visa',
                'description' => 'Pagamento simulato per utente ID: ' . $user_id,
            ]);

            Booking::where('user_id', $user_id)->delete();

            return response()->json([
                'success' => true,
                'message' => 'Pagamento eseguito con successo!',
                'charge_id' => $charge->id,
            ]);
        
    }

    public function thanks(){
          return view('thanks');
    }


}