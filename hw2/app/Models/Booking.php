<?php


use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Booking extends Model
{
    protected $fillable = ['flight_id', 'user_id', 'price'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
