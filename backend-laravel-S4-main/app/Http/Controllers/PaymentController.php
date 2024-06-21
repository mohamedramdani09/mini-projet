<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ShoppingCart;
use App\Models\ShoppingCartItem;
use App\Models\Payment;
use App\Models\Order;

class PaymentController extends Controller
{

    public function index()
    {
        $payment = Payment::with('order')->get();
        return response()->json($payment, 200);
    }

    public function processPayment(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,user_id',
            'method' => 'required|string'
        ]);

        $cart = ShoppingCart::where('user_id', $request->user_id)->with('items.product')->firstOrFail();

        $totalAmount = $cart->items->sum(function($item) {
            return $item->total_price_cart_item;
        });

        $payment = Payment::create([
            'shopping_cart_id' => $cart->id_shopping_cart,
            'amount_payment' => $totalAmount,
            'method_payment' => $request->method
        ]);

        $order = Order::create([
            'user_id' => $request->user_id,
            'payment_id' => $payment->id_payment,
            'total_amount_order' => $totalAmount,
            'status_order' => 'processing'
        ]);

        foreach ($cart->items as $cartItem) {
            $order->items()->create([
                'product_id' => $cartItem->product_id,
                'quantity_order_item' => $cartItem->quantity_cart_item,
                'price_order_item' => $cartItem->total_price_cart_item
            ]);
        }

        // إفراغ عربة التسوق بعد الدفع
        $cart->items()->delete();

        return response()->json([
            'message' => 'Payment processed and order created successfully!',
            'order' => $order->load('items.product'),
            'payment' => $payment
        ], 201);
    }

    //     $request->validate([
    //         'user_id' => 'required|exists:users,user_id',
    //         'amount' => 'required|numeric',
    //         'method' => 'required|string'
    //     ]);

    //     $cart = ShoppingCart::where('user_id', $request->user_id)->with('items.product')->firstOrFail();
    //     $payment = Payment::create([
    //         'shopping_cart_id' => $cart->id_shopping_cart,
    //         'amount_payment' => $request->amount,
    //         'method_payment' => $request->method
    //     ]);

    //     $order = Order::create([
    //         'user_id' => $request->user_id,
    //         'payment_id' => $payment->id_payment,
    //         'total_amount_order' => $request->amount,
    //         'status_order' => 'processing'
    //     ]);

    //     foreach ($cart->items as $cartItem) {
    //         $order->items()->create([
    //             'product_id' => $cartItem->product_id,
    //             'quantity_order_item' => $cartItem->quantity_cart_item,
    //             'price_order_item' => $cartItem->total_price_cart_item
    //         ]);
    //     }

    //     // Clear the shopping cart after payment
    //     $cart->items()->delete();

    //     return response()->json([
    //         'message' => 'Payment processed and order created successfully!',
    //         'order' => $order->load('items.product'),
    //         'payment' => $payment
    //     ], 201);
    // }
}
