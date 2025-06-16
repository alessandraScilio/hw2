<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;


class User extends Model
{
    public $timestamps = false;
    protected $fillable = ['username', 'email', 'password'];

    public function likes(): HasMany
    {
        return $this->hasMany(Like::class);
    }


    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class);
    }

}
