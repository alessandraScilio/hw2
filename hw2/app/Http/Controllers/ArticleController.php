<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use App\Models\User;
use App\Models\Article;
use App\Models\Like; 
use App\Models\Comment; 
use Session;
use Illuminate\Http\Request;


class ArticleController extends BaseController
{
    public function article()
    {
        if(!Session::get('user_id')){
            return redirect('login');
        }    

        $user = User::find(Session::get('user_id'));
        return view('article')->with('username', $user->username);
    }

    public function search(Request $request)
    {
        if (!Session::get('user_id')) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $articles = Article::query()
            ->searchText($request->input('smart-search'))
            ->withLikeStatus(Session::get('user_id'))
            ->withCounts()
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($articles);
    }


}