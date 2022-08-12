<?php

namespace App\Models;

use App\Models\Customer;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Invoice extends Model
{
    use HasFactory;

    protected $fillable = [
        'total',
        'sub_total',
        'customer_id',
        'date',
        'due_date',
        'refrence',
        'dicount',
        'number',
        'terms_and_conditions',
    ];

    public function customer(){
        return $this->belongsTo(Customer::class);
    }

    public function invoice_items(){
        return $this->hasMany(InvoiceItem::class);
    }
}
