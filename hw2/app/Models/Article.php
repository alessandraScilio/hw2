<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Article extends Model
{
    public $timestamps = false;
    protected $fillable = ['title', 'content', 'image_url', 'continent', 'country', 'city'];

    public function likes(): HasMany
    {
        return $this->hasMany(Like::class);
    }

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }

    public function scopeSearchText($query, string $searchTerm)
    {
        return $query->where(function($q) use ($searchTerm) {
            $q->where('continent', 'LIKE', "%$searchTerm%")
            ->orWhere('country', 'LIKE', "%$searchTerm%")
            ->orWhere('city', 'LIKE', "%$searchTerm%");
        });
    }

}
