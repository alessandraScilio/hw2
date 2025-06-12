<?php

namespace App\Http\Controllers;
use Illuminate\Routing\Controller as BaseController;
use App\Models\User;
use App\Models\Booking;
use Session;
use Illuminate\Http\Request;

class BookingController extends BaseController
{
       public function check_flight(Request $request)
        {
        if (!Session::get('user_id')) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $request->validate(['flight_id' => 'required|string']);

        $user_id = Session::get('user_id');

        $alreadyBooked = Booking::where('flight_id', $request->input('flight_id'))
                                ->where('user_id', $user_id)
                                ->exists();

        return response()->json(['success' => !$alreadyBooked]);
    }



    public function book_flight(Request $request)
        {
            if(!Session::get('user_id')){
            return response()->json(['error' => 'Unauthorized'], 401);
            }

            $request->validate([
            'price' => 'required|numeric' 
            ]);

            $booking = new Booking;
            $booking->flight_id = $request->input('flight_id');
            $booking->user_id = Session::get('user_id');
            $booking->price = $request->input('price');
            $booking ->save();
            
            if ($booking) {
                return response()->json(['success' => true]);
            } else {
                return response()->json(['error' => 'Insert failed'], 500);
            }
    }
        

}