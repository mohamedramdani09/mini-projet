<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Category;
use App\Models\Product;
use App\Models\Order;

class StatisticsController extends Controller
{
    public function index()
    {
        $statistics = [
            'users' => User::count(),
            'category' => Category::count(),
            'product' => Product::count(),
            'orders' => Order::count(),
        ];

        return response()->json($statistics);
    }
}
