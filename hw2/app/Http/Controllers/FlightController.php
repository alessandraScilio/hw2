<?php

namespace App\Http\Controllers;
use Illuminate\Routing\Controller as BaseController;
use App\Models\User;
use Session;
use Illuminate\Http\Request;

class FlightController extends BaseController
{
    public function flight()
    {
        if(!Session::get('user_id')){
            return redirect('login');
        }    

        $user = User::find(Session::get('user_id'));
        return view('flight')->with('username', $user->username);
    }

    private function get_token($client_id, $client_secret)
    {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, 'https://test.api.amadeus.com/v1/security/oauth2/token');
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, 'grant_type=client_credentials');
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Authorization: Basic ' . base64_encode($client_id . ':' . $client_secret),
            'Content-Type: application/x-www-form-urlencoded'
        ]);
        $response = curl_exec($ch);

        if(curl_errno($ch)) {
            curl_close($ch);
            return null;
        }

        curl_close($ch);
        $decoded = json_decode($response, true);
        return $decoded['access_token'] ?? null;
    }

    private function get_IATA_code($cityName, $accessToken) 
    {
        $url = 'https://test.api.amadeus.com/v1/reference-data/locations?subType=CITY&keyword=' . urlencode($cityName) . '&page[limit]=1';
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, ['Authorization: Bearer ' . $accessToken]);

        $response = curl_exec($ch);
        curl_close($ch);
        $decoded = json_decode($response, true);
        return $decoded['data'][0]['iataCode'] ?? null;
    }

    private function searchFlights($originIATA, $destinationIATA, $departureDate, $returnDate, $accessToken, $adults) 
    {
        $queryString = 
            'originLocationCode=' . urlencode($originIATA) .
            '&destinationLocationCode=' . urlencode($destinationIATA) .
            '&departureDate=' . urlencode($departureDate) .
            '&returnDate=' . urlencode($returnDate) .
            '&adults=' . intval($adults) .
            '&max=5';

        $url = 'https://test.api.amadeus.com/v2/shopping/flight-offers?' . $queryString;
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, ['Authorization: Bearer ' . $accessToken]);

        $response = curl_exec($ch);
        curl_close($ch);
        $decoded = json_decode($response, true);

        if (!empty($decoded['data'])) {
            return $decoded['data'];
        } elseif (!empty($decoded['errors'])) {
            return ['error' => $decoded['errors'][0]['detail'] ?? 'General error'];
        }
        
        return ['error' => 'No answer from API'];
    }

    public function search(Request $request) 
    {
        if(!Session::get('user_id')){
            return response()->json(['error' => 'Unauthorized'], 401);
        }  

        $client_id = env("CLIENT_ID"); 
        $client_secret = env("CLIENT_SECRET"); 

        $accessToken = $this->get_token($client_id, $client_secret);
        if (!$accessToken) {
            return response()->json(['error' => 'Impossibile ottenere token da Amadeus'], 500);
        }

        $departureCity = $request->input('departure_city');
        $destinationCity = $request->input('destination_city');
        $departureDate = $request->input('departure_date');
        $returnDate = $request->input('return_date');
        $passengers = $request->input('passengers');

        if ($departureDate >= $returnDate) {
        return response()->json([
            'error' => 'La data di ritorno deve essere successiva alla data di partenza', ], 400);
        }

        $departureIATA = $this->get_IATA_code($departureCity, $accessToken);
        $destinationIATA = $this->get_IATA_code($destinationCity, $accessToken);

        if (!$departureIATA || !$destinationIATA) {
            return response()->json(['error' => 'IATA codes not found.'], 400);
        } 

        $flights = $this->searchFlights($departureIATA, $destinationIATA, $departureDate, $returnDate, $accessToken, $passengers);
        return response()->json($flights);
    }

}