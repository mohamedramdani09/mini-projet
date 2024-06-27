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
        return response()->json($categories, 200);
    }

    public function store(Request $request)
{
    $request->validate([
        'name' => 'required|string|max:255|unique:categories,name_category', 
        'description' => 'required|string|max:1000',
        'img' => 'nullable|mimes:png,jpg,jpeg|max:10240',
    ]);

    $category = new Category();
    $category->name_category = $request->name;
    $category->description_category = $request->description;

    if ($request->hasFile('img')) {
        $file = $request->file('img');
        $fileName = $file->getClientOriginalName();
        $file->move(resource_path('images'), $fileName);
        $category->img_category = $fileName;
    }
    

    $category->save();

    return response()->json([
        'message' => 'Category created successfully!',
        'category' => $category,
    ], 201);
}


    public function show(Category $category)
    {
        $category->load('products');
        return response()->json($category, 200);
    }

    public function update(Request $request, Category $category)
    {
        $request->validate([
            'name_category' => 'required|string|max:255',
            'description_category' => 'required|string|max:1000',
            'img_category' => 'nullable|string|max:255',
        ]);

        $category->update([
            'name_category' => $request->name_category,
            'description_category' => $request->description_category,
            'img_category' => $request->img_category,
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
        ], 200);
    }
}
