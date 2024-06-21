<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Category;
use App\Models\Order;
use App\Models\ShoppingCartItem;

class Product extends Model
{
    use HasFactory;

    protected $primaryKey = 'id_product';

    protected $fillable = [
        'name_product',
        'description_product',
        'img_product',
        'price_product',
        'stock_product',
        'brand_product',
        'doc_product',
        'quantity_product',
        'favorite_product',
        'category_id'
    ];

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function orders()
    {
        return $this->belongsToMany(Order::class, 'order_items', 'product_id', 'order_id')
                    ->withPivot('quantity_orderitem', 'total_orderitem', 'price_orderitem')
                    ->withTimestamps();
    }

    public function shoppingCartItems()
    {
        return $this->hasMany(ShoppingCartItem::class);
    }

    public function wishlistedBy()
    {
        return $this->hasMany(Wishlist::class, 'product_id');
    }
}
