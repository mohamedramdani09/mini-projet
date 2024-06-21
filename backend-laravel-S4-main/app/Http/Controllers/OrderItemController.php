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

















// class OrderItemController extends Controller
// {
//      // إرجاع جميع الطلبات مع المنتجات المرتبطة بها
//     public function index()
//     {
//         $orders = Order::with('products')->get();
//         return response()->json($orders, 200);
//     }

//     // إضافة منتجات إلى طلب موجود
//     public function addProductsToOrder(Request $request, $orderId)
//     {
//         $request->validate([
//             'products' => 'required|array',
//             'products.*.id' => 'required|exists:products,id_product',
//             'products.*.quantity' => 'required|integer',
//             'products.*.price' => 'required|numeric',
//         ]);

//         $order = Order::findOrFail($orderId);

//         foreach ($request->products as $product) {
//             $order->products()->attach($product['id'], [
//                 'quantity' => $product['quantity'],
//                 'price' => $product['price']
//             ]);
//         }

//         return response()->json([
//             'message' => 'Products added to order successfully!',
//             'order' => $order->load('products'),
//         ], 201);
//     }

//     // تحديث تفاصيل منتج في طلب معين
//     public function updateProductInOrder(Request $request, $orderId, $productId)
//     {
//         $request->validate([
//             'quantity' => 'required|integer',
//             'price' => 'required|numeric',
//         ]);

//         $order = Order::findOrFail($orderId);
//         $order->products()->updateExistingPivot($productId, [
//             'quantity' => $request->quantity,
//             'price' => $request->price,
//         ]);

//         return response()->json([
//             'message' => 'Product in order updated successfully!',
//             'order' => $order->load('products'),
//         ], 200);
//     }

//     // إزالة منتج من طلب معين
//     public function removeProductFromOrder($orderId, $productId)
//     {
//         $order = Order::findOrFail($orderId);
//         $order->products()->detach($productId);

//         return response()->json([
//             'message' => 'Product removed from order successfully!',
//             'order' => $order->load('products'),
//         ], 200);
//     }
// }
