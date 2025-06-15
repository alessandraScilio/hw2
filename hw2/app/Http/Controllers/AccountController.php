<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use App\Models\User;
use App\Models\Article;
use App\Models\Like; 
use Session;
use Illuminate\Http\Request;


class AccountController extends BaseController{

    public function account()
    {
        if (!Session::get('user_id')) {
            return redirect('login');
        }

        $user = User::find(Session::get('user_id'));
        $email = $user->email;
        return view('account')->with([
        'username' => $user->username,
        'email' => $email,
        ]);     
}

    public function favs(Request $request)
    {
        if (!Session::get('user_id')) {
            return redirect('login');
        }

        $userId = Session::get('user_id');
        $favourites = Like::join('articles', 'likes.article_id', '=', 'articles.id')
            ->where('likes.user_id', $userId)
            ->select('articles.id', 'articles.title', 'articles.image_url')
            ->get();

        return response()->json($favourites);
    }

    public function logout()
    {
        Session::flush();
        return redirect('index');
    }

}