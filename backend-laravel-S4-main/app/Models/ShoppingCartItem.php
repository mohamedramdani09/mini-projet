<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\ShoppingCart;
use App\Models\Product;

class ShoppingCartItem extends Model
{
    use HasFactory;
    protected $table = 'shopping_carts_items';

    protected $primaryKey = 'id_shopping_cart_item';
    protected $fillable = ['shopping_cart_id', 'product_id', 'quantity_cart_item', 'total_price_cart_item'];

    public function cart()
    {
        return $this->belongsTo(ShoppingCart::class, 'shopping_cart_id');
    }

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }
}
