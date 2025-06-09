<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use Session;

use Illuminate\Http\Request;

class IndexController extends BaseController
{
    public function index()
    {
        return view('index'); 
    }

    

}