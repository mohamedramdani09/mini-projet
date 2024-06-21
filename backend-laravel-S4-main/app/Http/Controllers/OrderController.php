<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::with('items.product')->get();
        return response()->json($orders, 200);
    }

    public function show($id)
    {
        $order = Order::with('items.product', 'payment')->findOrFail($id);
        return response()->json($order, 200);
    }

    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|string'
        ]);

        $order = Order::findOrFail($id);
        $order->status_order = $request->status;
        $order->save();

        return response()->json([
            'message' => 'Order status updated successfully!',
            'order' => $order
        ], 200);
    }

    public function destroy(Order $order)
    {
        $order->delete();

        return response()->json([
            'message' => 'Category deleted successfully!',
        ], 200);
    }

    public function getOrderProducts($id)
    {
        $order = Order::with('items.product')->findOrFail($id);
        $products = $order->items->map(function($item) {
            return [
                'product_id' => $item->product->id,
                'product_name' => $item->product->name,
                'product_price' => $item->product->price,
                'product_quantity' => $item->quantity,
            ];
        });

        return response()->json($products, 200);
    }
}