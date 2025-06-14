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


}