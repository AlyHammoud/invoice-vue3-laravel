<?php

namespace App\Http\Controllers;

use App\Models\Counter;
use App\Models\Invoice;
use App\Models\InvoiceItem;
use Illuminate\Http\Request;
use PHPUnit\Framework\Constraint\Count;

class InvoiceController extends Controller
{
    public function get_all_invoices()
    {
        $invoice = Invoice::with('customer')->latest()->paginate(5);

        return response()->json(['invoices' => $invoice], 200);
    }

    public function search_invoice(Request $request)
    {
        $search = $request->query('s');

        if ($search != null) {
            $invoices = Invoice::with('customer')
                ->where('id', 'LIKE', "$search")
                ->paginate(5);

            return response()->json([
                'invoices' => $invoices
            ]);
        } else {
            return $this->get_all_invoices();
        }
    }

    public function create_invoice(Request $request)
    {
        $counter = Counter::where('key', 'invoices')->first();
        $random = Counter::where('key', 'invoices')->first();

        $invoice = Invoice::orderBy('id', 'desc')->first();
        if ($invoice) {
            $invoice = $invoice->id + 1;
            $counters = $counter->value + $invoice;
        } else {
            $counters = $counter->value;
        }

        $formData = [
            'number' => $counter->prefix . $counters,
            'customer_id' => null,
            'customer' => null,
            'date' => date('Y-m-d'),
            'due_date' => null,
            'reference' => null,
            'discount' => 0,
            'terms_and_conditions' => 'Default Terms and Conditions',
            'items' => [
                'prduct_id' => null,
                'product' => null,
                'unit_price' => 0,
                'quantity' => 1,
            ]
        ];

        return response()->json($formData);
    }

    public function saveInvoice(Request $request)
    {
        // return response(['a' => $request->form]);
        $invoice = Invoice::create([
            'sub_total' => $request->form['sub_total'],
            'total' => $request->form['total'],
            'customer_id' => $request->customer_id,
            'number' => $request->form['number'],
            'date' => $request->form['date'],
            'due_date' => $request->form['due_date'],
            'discount' => $request->form['discount'],
            'refrence' => $request->form['reference'],
            'terms_and_conditions' => $request->form['terms_and_conditions'],
        ]);

        foreach ($request->listCart as $item) {
            // return response(['a' => $item]);

            InvoiceItem::create([
                'product_id' => $item['id'],
                'invoice_id' => $invoice->id,
                'quantity' => $item['quantity'],
                'unit_price' => $item['unit_price'],
            ]);
        }
    }

    public function show_invoice($id)
    {
        $invoice = Invoice::with(['customer','invoice_items.product'])->find($id);

        return response()->json(
            [
                'invoice' => $invoice
            ],
            200
        );
    }
}
