<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::with('category')->get();
        return response()->json($products, 200);
    }

    public function store(Request $request)
    {
        // Validate incoming request data
        $vqlidqte  = Validator::make($request->all(),[
            'name' => 'required|string|max:255|unique:products,name_product', 
            'description' => 'required|string',
            'img' => 'required|mimes:png,jpg,jpeg|max:2048', // Adjust file size limit as needed
            'price' => 'required|numeric',
            'brand' => 'required|string|max:255',
            'quantity' => 'required|integer',
            'category_id' => 'required|exists:categories,id_category',]);
             // Ensure category exists
             if($vqlidqte->fails())
             {
                return response()->json([
                    'errors'=> $vqlidqte->errors(),
                ],200);
             }

        // Handle image upload
        if ($request->hasFile('img')) {
            $image = $request->file('img');
            $imageName = time().'.'.$image->getClientOriginalExtension();
            $image->move(resource_path('images'), $imageName);
            $imgPath = '/images/'.$imageName;
        } else {
            $imgPath = null;
        }
    
        // Create new product instance
        $product = Product::create([
            'name_product' => $request->name,
            'description_product' => $request->description,
            'img_product' => $imgPath,
            'price_product' => $request->price,
            'stock_product' => 0,
            'brand_product' => $request->brand,
            'quantity_product' => $request->quantity,
            'category_id' => $request->category_id,
        ]);

        // Return response
        return response()->json([
            'message' => 'Product created successfully!',
            'product' => $product,
        ], 201);
    }

    public function show(Product $product)
    {
        $product->load('category');
        return response()->json($product, 200);
    }

    public function update(Request $request, Product $product)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'img' => 'nullable|string|max:255',
            'price' => 'required|numeric',
            'stock' => 'required|integer',
            'brand' => 'required|string|max:255',
            'doc' => 'required|date',
            'quantity' => 'required|integer',
            'favorite' => 'nullable|boolean',
            'category_id' => 'required|exists:categories,id',
        ]);        

        $product->update([
            'name_product' => $request->name,
            'description_product' => $request->description,
            'img_product' => $request->img,
            'price_product' => $request->price,
            'stock_product' => $request->stock,
            'brand_product' => $request->brand,
            'doc_product' => $request->doc,
            'quantity_product' => $request->quantity,
            'favorite_product' => $request->favorite ?? 0,
            'category_id' => $request->category_id,
        ]);

        return response()->json([
            'message' => 'Product updated successfully!',
            'product' => $product,
            
        ], 200);
    }

    public function destroy(Product $product)
    {
        $product->delete();

        return response()->json([
            'message' => 'Product deleted successfully!',
        ], 200);
    }
}
