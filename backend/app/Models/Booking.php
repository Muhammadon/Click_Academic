<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Booking extends Model
{
    use HasFactory;


    protected $guarded = [];
    protected $fillable = ['student_id', 'mentoring_id', 'order_id', 'status', 'snap_token'];

    // Relasi: Setiap booking memiliki/merujuk ke satu mentoring
    public function mentoring(): BelongsTo
    {
        return $this->belongsTo(Mentoring::class, 'mentoring_id');
    }
}
