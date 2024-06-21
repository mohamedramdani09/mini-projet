<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    protected $primaryKey = 'id_payment';
    protected $fillable = ['shopping_cart_id', 'amount_payment', 'method_payment'];

    public function cart()
    {
        return $this->belongsTo(ShoppingCart::class, 'shopping_cart_id');
    }

    public function order()
    {
        return $this->hasOne(Order::class, 'payment_id');
    }
}
