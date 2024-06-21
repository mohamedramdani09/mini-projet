<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\ShoppingCartItem;
use App\Models\User;

class ShoppingCart extends Model
{
    use HasFactory;

    protected $primaryKey = 'id_shopping_cart';
    protected $fillable = ['user_id'];

    public function items()
    {
        return $this->hasMany(ShoppingCartItem::class, 'shopping_cart_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
