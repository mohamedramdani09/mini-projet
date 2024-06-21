<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ShoppingCart;
use App\Models\ShoppingCartItem;
use App\Models\Product;

class ShoppingCartController extends Controller
{
    
    public function addToCart(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,user_id',
            'product_id' => 'required|exists:products,id_product',
            'quantity' => 'required|integer|min:1'
        ]);

        $cart = ShoppingCart::firstOrCreate(['user_id' => $request->user_id]);

        $product = Product::find($request->product_id);

        $cartItem = $cart->items()->updateOrCreate(
            ['product_id' => $product->id_product],
            [
                'quantity_cart_item' => $request->quantity,
                'total_price_cart_item' => $product->price_product * $request->quantity
            ]
        );

        return response()->json([
            'message' => 'Product added to cart successfully!',
            'cart' => $cart->load('items.product')
        ], 201);
    }

    public function removeFromCart(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,user_id',
            'product_id' => 'required|exists:products,id_product'
        ]);

        $cart = ShoppingCart::where('user_id', $request->user_id)->firstOrFail();
        $cart->items()->where('product_id', $request->product_id)->delete();

        return response()->json([
            'message' => 'Product removed from cart successfully!',
            'cart' => $cart->load('items.product')
        ], 200);
    }

    public function updateCartItem(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,user_id',
            'product_id' => 'required|exists:products,id_product',
            'quantity' => 'required|integer|min:1'
        ]);

        $cart = ShoppingCart::where('user_id', $request->user_id)->firstOrFail();
        $product = Product::find($request->product_id);

        $cartItem = $cart->items()->where('product_id', $request->product_id)->firstOrFail();
        $cartItem->quantity_cart_item = $request->quantity;
        $cartItem->total_price_cart_item = $product->price_product * $request->quantity;
        $cartItem->save();

        return response()->json([
            'message' => 'Cart item updated successfully!',
            'cart' => $cart->load('items.product')
        ], 200);
    }

    public function viewCart($user_id)
    {
        $cart = ShoppingCart::where('user_id', $user_id)->with('items.product')->firstOrFail();
        return response()->json($cart, 200);
    }
}