<?php

namespace App\Http\Controllers;
use Illuminate\Routing\Controller as BaseController;
use App\Models\User;
use App\Models\Booking;
use Session;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;


class BookingController extends BaseController
{
       public function check_flight(Request $request)
        {
            if(!Session::get('user_id')){
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

    public function show_bookings()
{
    if (!Session::get('user_id')) {
        return response()->json(['error' => 'Unauthorized'], 401);
    }

    $user_id = Session::get('user_id');
    $bookings = Booking::where('user_id', $user_id)
                        ->get(['flight_id', 'price']);

    return response()->json($bookings);
}

public function delete_booking(Request $request)
{
    if (!Session::get('user_id')) {
        return response()->json(['error' => 'Unauthorized'], 401);
    }

    $request->validate(['flight_id' => 'required|string']);
    $user_id = Session::get('user_id');
    $flightId = $request->input('flight_id');

    Log::info('Attempting to delete booking', [
        'user_id' => $user_id,
        'flight_id' => $flightId
    ]);

    $deleted = Booking::where('user_id', $user_id)
                      ->where('flight_id', $flightId)
                      ->delete();

    if ($deleted) {
        Log::info('Booking deleted successfully');
        return response()->json(['success' => true]);
    } else {
        Log::warning('Booking not found for deletion', [
            'user_id' => $user_id,
            'flight_id' => $flightId
        ]);
        return response()->json(['error' => 'Booking not found'], 404);
    }   
}

}