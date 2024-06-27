<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\OrderItem;

class OrderItemController extends Controller
{
    public function index()
    {
        $orderItems = OrderItem::with(['order', 'product'])->get();
        return response()->json($orderItems, 200);
    }

    public function show($id)
    {
        $orderItem = OrderItem::with(['order', 'product'])->findOrFail($id);
        return response()->json($orderItem, 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'order_id' => 'required|exists:orders,id_order',
            'product_id' => 'required|exists:products,id_product',
            'quantity_orderitem' => 'required|integer',
            'price_orderitem' => 'required|numeric',
            'total_orderitem' => 'required|numeric',
        ]);

        $orderItem = OrderItem::create($request->all());

        return response()->json(['message' => 'Order item created successfully', 'orderItem' => $orderItem], 201);
    }

    public function update(Request $request, $id)
    {
        $orderItem = OrderItem::findOrFail($id);

        $request->validate([
            'quantity_orderitem' => 'sometimes|required|integer',
            'total_orderitem' => 'sometimes|required|numeric',
            'price_orderitem' => 'sometimes|required|numeric',
            'order_id' => 'sometimes|required|exists:orders,id_order',
            'product_id' => 'sometimes|required|exists:products,id_product',
        ]);

        $orderItem->update($request->all());

        return response()->json([
            'message' => 'Order item updated successfully!',
            'orderItem' => $orderItem,
        ], 200);
    }

    public function destroy($id)
    {
        $orderItem = OrderItem::findOrFail($id);
        $orderItem->delete();

        return response()->json([
            'message' => 'Order item deleted successfully!',
        ], 200);
    }
}