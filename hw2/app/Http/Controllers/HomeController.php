<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use App\Models\User;
use App\Models\Article;
use App\Models\Like; 
use Session;
use Illuminate\Http\Request;


class HomeController extends BaseController
{
    public function home()
    {
        if(!Session::get('user_id')){
            return redirect('login');
        }    

        $user = User::find(Session::get('user_id'));

        return view('home')->with('username', $user->username);
    }

    public function list(){

        if(!Session::get('user_id')){
            return [];
        }  

        $topArticles = Article::withCount('likes')
                            ->orderBy('likes_count', 'desc')
                            ->take(4)
                            ->get();
        return $topArticles;
    }

}