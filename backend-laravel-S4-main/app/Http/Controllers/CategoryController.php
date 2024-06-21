<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::with('products')->get();
        return response()->json($categories, 200); // Return categories with products as JSON
    }

    public function store(Request $request)
{
    $request->validate([
        'name' => 'required|string|max:255|unique:categories,name_category', // Unique category name
        'description' => 'required|string|max:1000',
        'img' => 'nullable|mimes:png,jpg,jpeg|max:10240', // Validate file type and size (adjust the max size as per your requirement)
    ]);

    $category = new Category();
    $category->name_category = $request->name;
    $category->description_category = $request->description;

    if ($request->hasFile('img')) {
        $file = $request->file('img');
        $fileName = time().'.'.$file->getClientOriginalExtension();
        $file->move(resource_path('images'), $fileName);
        $category->img_category = 'images/'.$fileName;
    }

    $category->save();

    return response()->json([
        'message' => 'Category created successfully!',
        'category' => $category,
    ], 201); // Created
}


    public function show(Category $category)
    {
        $category->load('products'); // Load products relationship
        return response()->json($category, 200); // Return specific category details with products
    }

    public function update(Request $request, Category $category)
    {
        $request->validate([
            'name' => 'required|string|max:255',  // Unique excluding current category
            'description' => 'required|string|max:1000',
            'img' => 'nullable|string|max:255', // Optional image path
        ]);

        $category->update([
            'name_category' => $request->name,
            'description_category' => $request->description,
            'img_category' => $request->img,
        ]);

        return response()->json([
            'message' => 'Category updated successfully!',
            'category' => $category,
        ], 200); // OK
    }

    public function destroy(Category $category)
    {
        $category->delete();

        return response()->json([
            'message' => 'Category deleted successfully!',
        ], 200); // OK
    }
}
