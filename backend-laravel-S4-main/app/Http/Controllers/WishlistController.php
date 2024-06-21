<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Wishlist;

class WishlistController extends Controller
{
    public function index(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,user_id',
        ]);

        $wishlists = Wishlist::where('user_id', $request->user_id)->with('product')->get();
        return response()->json($wishlists, 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,user_id',
            'product_id' => 'required|exists:products,id_product',
        ]);

        // تحقق مما إذا كان المنتج موجودًا بالفعل في قائمة الأمنيات للمستخدم
        $existingWishlistItem = Wishlist::where('user_id', $request->user_id)
            ->where('product_id', $request->product_id)
            ->first();

        if ($existingWishlistItem) {
            return response()->json([
                'message' => 'Product is already in your wishlist!'
            ], 400);
        }

        $wishlist = Wishlist::create([
            'user_id' => $request->user_id,
            'product_id' => $request->product_id,
        ]);

        return response()->json([
            'message' => 'Product added to wishlist successfully!',
            'wishlist' => $wishlist
        ], 201);
    }

    public function destroy($id)
    {
        $wishlist = Wishlist::where('user_id', auth()->id())->where('id_wishlist', $id)->firstOrFail();
        $wishlist->delete();

        return response()->json([
            'message' => 'Product removed from wishlist successfully!'
        ], 200);
    }
}
