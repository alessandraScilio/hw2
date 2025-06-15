<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use App\Models\User;
use App\Models\Article;
use App\Models\Like; 
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
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($articles);
    }

    public function show($id)
    {
        if (!Session::get('user_id')) {
            return redirect('login');
        }

        $user = User::find(Session::get('user_id'));        
        $article = Article::findOrFail($id);
        $article->content = str_replace('\\n', "\n", $article->content);
        return view('article_detail', ['article' => $article])->with('username', $user->username);;
    }

    public function status(Request $request)
    {
        if (!Session::get('user_id')) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $request->validate([
        'article_id' => 'required|integer|exists:articles,id',
        ]);

        $articleId = $request->input('article_id');
        $userId = Session::get('user_id');

        $likeExists = Like::where('article_id', $articleId)
                        ->where('user_id', $userId)
                        ->exists();

        return response()->json(['liked' => $likeExists]);
    }

    public function like(Request $request)
    {
        if (!Session::get('user_id')) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $request->validate([
            'article_id' => 'required|integer|exists:articles,id',
        ]);

        $articleId = $request->input('article_id');
        $userId = Session::get('user_id');

        $like = new Like;
        $like->article_id = $articleId;
        $like->user_id = $userId;
        $like->save();
        return response()->json(['liked' => true, 'article_id' => $articleId]);
    }

    public function unlike(Request $request)
    {
        if (!Session::get('user_id')) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $request->validate([
            'article_id' => 'required|integer|exists:articles,id',
        ]);

        $articleId = $request->input('article_id');
        $userId = Session::get('user_id');

        Like::where('article_id', $articleId)
            ->where('user_id', $userId)
            ->delete();

        return response()->json(['unliked' => true, 'article_id' => $articleId]);
    }


    

}